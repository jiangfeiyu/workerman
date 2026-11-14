<?php
// 关卡 7.9 显微镜实验：高低水位线背压机制（Backpressure）实测
require_once __DIR__ . '/07_async_send_buffer.php';

// 为 TcpConnection 增加水位线与背压机制
class BackpressureConnection extends TcpConnection {
    // 🌟 1. 高水位警戒线（设为 500KB）
    public int $maxSendBufferSize = 512000; // 500KB
    
    // 🌟 2. 两个工业级回调事件
    public $onBufferFull = null;  // 蓄水池爆满预警（高水位）
    public $onBufferDrain = null; // 蓄水池排空通畅（低水位）

    public function send(string $data): bool|null {
        // 如果池子已经爆了，拒绝继续膨胀并报警！
        if (strlen($this->sendBuffer) >= $this->maxSendBufferSize) {
            if ($this->onBufferFull) {
                ($this->onBufferFull)($this);
            }
            return false; // 丢弃或拒绝写入，保护服务器内存不 OOM！
        }

        // 如果之前已经有积压，追加到尾部
        if ($this->sendBuffer !== '') {
            $this->sendBuffer .= $data;
            if (strlen($this->sendBuffer) >= $this->maxSendBufferSize && $this->onBufferFull) {
                ($this->onBufferFull)($this);
            }
            return true;
        }

        // 尝试直写内核
        $len = @fwrite($this->socket, $data);
        if ($len === false) $len = 0;

        if ($len === strlen($data)) {
            return true;
        }

        // 没写完的存入缓冲区
        $this->sendBuffer = substr($data, $len);
        $this->loop->addWrite($this->socket, [$this, 'baseWrite']);

        if (strlen($this->sendBuffer) >= $this->maxSendBufferSize && $this->onBufferFull) {
            ($this->onBufferFull)($this);
        }

        return true;
    }

    public function baseWrite($socket): void {
        $len = @fwrite($socket, $this->sendBuffer);
        if ($len === false) $len = 0;

        $this->sendBuffer = substr($this->sendBuffer, $len);

        // 🌟 3. 排空时触发 onBufferDrain
        if ($this->sendBuffer === '') {
            $this->loop->delWrite($this->socket);
            if ($this->onBufferDrain) {
                ($this->onBufferDrain)($this);
            }
        }
    }
}

// =================== 独立实验运行代码 ===================
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    echo "=== 关卡 7.9 高低水位线背压机制演示 (PID: " . posix_getpid() . ") ===\n\n";

    $loop = new AdvancedSelectLoop();
    $server = stream_socket_server("tcp://127.0.0.1:8082", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
    stream_set_blocking($server, false);

    $loop->addRead($server, function ($server) use ($loop) {
        $socket = stream_socket_accept($server);
        stream_set_blocking($socket, false);
        $conn = new BackpressureConnection($socket, $loop);

        // 注册高水位报警
        $conn->onBufferFull = function ($c) {
            echo "   ⚠️ [高水位报警 onBufferFull] 缓冲区已积压 " . $c->getSendBufferSize() . " 字节（超过 500KB 上限），触发背压拦截！\n";
        };

        // 注册低水位排空通畅
        $conn->onBufferDrain = function ($c) {
            echo "   🌊 [低水位通知 onBufferDrain] 缓冲区数据已全部排空！恢复正常畅通！\n";
        };

        // 模拟给这个慢客户端狂发大包（每次 1MB，连发 5 次，总共 5MB）
        $chunk = str_repeat("D", 1000000); // 每次 1MB
        echo "1. 服务端尝试连续向客户端推送 5 次 1MB 数据 (共 5MB)...\n";
        for ($i = 1; $i <= 5; $i++) {
            $ok = $conn->send($chunk);
            echo "   -> 第 $i 次发送 1MB: " . ($ok ? "成功缓冲" : "❌ 被拒丢弃 (防 OOM 拦截)") . "，当前缓冲区大小: " . $conn->getSendBufferSize() . " 字节\n";
        }
    });

    // 客户端连入，但故意【只连不读】！
    $client = stream_socket_client("tcp://127.0.0.1:8082");
    stream_set_blocking($client, false);
    
    // 定时器：0.05 秒后让客户端开始喝水（读取数据）
    $loop->after(0.05, function () use ($client) {
        echo "\n2. [客户端觉醒] 客户端开始调用 fread 读取接收数据...\n";
        $total = 0;
        while (true) {
            $data = @fread($client, 65535);
            if ($data === false || $data === '') break;
            $total += strlen($data);
        }
        echo "   [客户端] 瞬间喝下了 $total 字节的数据！\n";
    });

    // 定时器：0.2 秒后结束实验
    $loop->after(0.2, function () {
        echo "\n=== 实验圆满结束 ===\n";
        exit(0);
    });

    $loop->loop();
}
