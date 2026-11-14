<?php
// 关卡 8.7 招式演进：推导可插拔的协议接口 ProtocolInterface
require_once __DIR__ . '/../chapter07_tcp_connection/07_async_send_buffer.php';

// 🌟 1. 协议芯片插槽标准（定义契约）
interface ProtocolInterface {
    /**
     * 问：水库里的水够不够一个完整包？这一个包占几个字节？
     * 返回 0 表示数据不够（半包），继续等；返回 > 0 表示该包的长度！
     */
    public static function input(string $buffer, $connection): int;

    /**
     * 解包：把切下来的字节串，转换成业务层友好的数据（如剥去换行符，或 json_decode）
     */
    public static function decode(string $buffer, $connection): mixed;

    /**
     * 打包：在业务层发送数据前，自动套上协议外壳（如末尾追加 \n，或 json_encode）
     */
    public static function encode(mixed $data, $connection): string;
}

// 🌟 2. 协议芯片 A：换行符 Text 协议
class TextProtocol implements ProtocolInterface {
    public static function input(string $buffer, $connection): int {
        $pos = strpos($buffer, "\n");
        if ($pos === false) {
            return 0; // 半包，不够一句话，继续等！
        }
        return $pos + 1; // 够了！包含 \n 在内的总字节数！
    }

    public static function decode(string $buffer, $connection): mixed {
        return rtrim($buffer, "\r\n"); // 剥掉换行符，还给业务干净文本
    }

    public static function encode(mixed $data, $connection): string {
        return $data . "\n"; // 自动在末尾打上换行符
    }
}

// 🌟 3. 协议芯片 B：JSON-RPC 协议（全自动 JSON 序列化）
class JsonProtocol implements ProtocolInterface {
    public static function input(string $buffer, $connection): int {
        $pos = strpos($buffer, "\n");
        if ($pos === false) {
            return 0; // 半包，继续等
        }
        return $pos + 1;
    }

    public static function decode(string $buffer, $connection): mixed {
        // 自动把原始文本解码为 PHP 关联数组！
        return json_decode(rtrim($buffer, "\r\n"), true);
    }

    public static function encode(mixed $data, $connection): string {
        // 自动将 PHP 数组编码为 JSON 字符串并附带换行符
        return json_encode($data) . "\n";
    }
}

// 🌟 4. 通用连接类：肚子里没有任何协议硬编码！它只认识 ProtocolInterface！
class ProtocolConnection extends TcpConnection {
    protected string $recvBuffer = '';
    public ?string $protocol = null; // 插槽！插入哪个协议类名，就跑哪个协议！
    public int $maxPackageSize = 10485760; // 默认单包上限 10MB，防恶意伪造包头撑爆内存

    public function baseRead($socket): void {
        $data = @fread($socket, 65535);
        if ($data === '' || $data === false) {
            $this->destroy();
            if ($this->onClose) ($this->onClose)($this);
            return;
        }

        $this->recvBuffer .= $data;

        // 如果没有插任何协议卡，退化为原始流传输
        if ($this->protocol === null) {
            if ($this->onMessage) {
                ($this->onMessage)($this, $this->recvBuffer);
            }
            $this->recvBuffer = '';
            return;
        }

        // 🌟 核心通用切包循环：向协议芯片连发三问！
        while ($this->recvBuffer !== '') {
            // 一问协议芯片：水库里的水够一个包吗？长度是多少？
            try {
                $pkgLen = ($this->protocol)::input($this->recvBuffer, $this);
            } catch (\Throwable $e) {
                $pkgLen = -1;
            }

            if ($pkgLen === 0) {
                // 长度还未知的半包，立刻 break 跳出循环，等下一次网卡来水！
                break;
            }

            if ($pkgLen < 0 || $pkgLen > $this->maxPackageSize) {
                // 错误包或恶意超大包：立即切断连接，防止内存暴涨或死循环
                echo "   ⚠️ [协议安全拦截] 非法或超限包长 ($pkgLen 字节)，立即销毁连接！\n";
                $this->destroy();
                if ($this->onClose) ($this->onClose)($this);
                return;
            }

            if ($pkgLen > strlen($this->recvBuffer)) {
                // 已知目标总长（如 FrameProtocol 已读出 4 字节头），但包体尚未收齐，继续等后续碎片！
                break;
            }

            // 舀出完整的这一个包
            $onePkg = substr($this->recvBuffer, 0, $pkgLen);
            // 从水库中减去
            $this->recvBuffer = substr($this->recvBuffer, $pkgLen);

            // 二问协议芯片：请帮我解包！
            $msg = ($this->protocol)::decode($onePkg, $this);

            // 交付业务层！
            if ($this->onMessage) {
                ($this->onMessage)($this, $msg);
            }
        }
    }

    // 重写 send：发消息前向协议芯片三问
    public function send(string $data): bool|null {
        if ($this->protocol !== null) {
            // 三问协议芯片：请帮我打包！
            $data = ($this->protocol)::encode($data, $this);
        }
        return parent::send($data);
    }
}

// =================== 验证实验：插入 JsonProtocol 协议芯片 ===================
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    $loop = new AdvancedSelectLoop();
    $context = stream_context_create(['socket' => ['so_reuseaddr' => true]]);
    $server = stream_socket_server("tcp://127.0.0.1:8086", $errno, $errstr, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $context);
    stream_set_blocking($server, false);

    $loop->addRead($server, function ($server) use ($loop) {
        $socket = stream_socket_accept($server);
        stream_set_blocking($socket, false);
        $conn = new ProtocolConnection($socket, $loop);
        
        // 🌟 核心精髓：像插卡一样，插入 JsonProtocol 协议！
        $conn->protocol = JsonProtocol::class;

        $conn->onMessage = function ($c, $data) {
            echo "🎉 [业务层 onMessage 收到消息] 类型: " . gettype($data) . "\n";
            echo "   自动解析为 PHP 数组内容: " . json_encode($data, JSON_UNESCAPED_UNICODE) . "\n";
            echo "   访问数组字段: 用户名={$data['user']}, 动作={$data['action']}\n\n";
        };
    });

    // 客户端连入并发送两条粘在一起的 JSON 消息
    $client = stream_socket_client("tcp://127.0.0.1:8086");
    $rawPayload = json_encode(['user' => '张三', 'action' => 'login']) . "\n" .
                  json_encode(['user' => '李四', 'action' => 'pay', 'amount' => 100]) . "\n";

    echo "1. [客户端] 一次性向服务端发送两条粘在一起的 JSON 报文...\n\n";
    fwrite($client, $rawPayload);

    $loop->after(0.1, function () {
        echo "=== 实验圆满成功 ===\n";
        exit(0);
    });

    $loop->loop();
}
