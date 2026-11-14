<?php
// 关卡 7.2 & 7.3 架构演进深度实操：铁三角模型 (Worker, SelectLoop, TcpConnection)

require_once __DIR__ . '/../chapter06_timer_and_heap/14_select_loop_with_heap.php';

echo "=== 铁三角架构演进教学与实操追踪 ===\n\n";

#[\AllowDynamicProperties]
class TcpConnection {
    public int $id;
    public $onMessage = null;
    public $onClose = null;

    // 专属的业务数据挂载槽
    public function __construct(
        public $socket,
        protected SelectLoop $loop
    ) {
        $this->id = (int)$socket;
        echo "   [TcpConnection 诞生] ID: {$this->id}。专职包厢服务员就位！\n";
        
        // 🌟 核心动作：自己把自己的读事件挂载到发动机上！
        // 这一步意味着：从此这个包厢的一切动静，由该专职服务员全权负责！
        echo "   [TcpConnection 动作] 向 SelectLoop 挂载自身的 baseRead 回调！\n";
        $this->loop->addRead($this->socket, [$this, 'baseRead']);
    }

    /**
     * 底层读数据方法：只有它自己最清楚怎么读自己负责的 Socket
     */
    public function baseRead($socket): void {
        echo "   [baseRead 触发] FD {$this->id} 的管子有水了，服务员开始读数据...\n";
        $data = @fread($socket, 65535);

        // 如果客户端挂断
        if ($data === '' || $data === false) {
            echo "   [baseRead 探测到 EOF] 客户端已断开，准备销毁连接...\n";
            $this->destroy();
            if ($this->onClose) {
                ($this->onClose)($this);
            }
            return;
        }

        echo "   [baseRead 读取完毕] 收到 " . strlen($data) . " 字节，准备递交给业务回调 onMessage...\n";
        // 🌟 关键接力：把 $this（包装对象本身）和 $data 递给外部业务闭包！
        if ($this->onMessage) {
            ($this->onMessage)($this, $data);
        }
    }

    public function send(string $data): int|false {
        echo "   [send 调用] 服务员正在给 FD {$this->id} 递回话: " . trim($data) . "\n";
        return @fwrite($this->socket, $data);
    }

    public function destroy(): void {
        echo "   [destroy 销毁] 从 SelectLoop 注销读事件，并关闭底层 FD {$this->id}！\n";
        $this->loop->delRead($this->socket);
        @fclose($this->socket);
    }
}

class Worker {
    public $onMessage = null;
    public $onClose = null;
    protected SelectLoop $loop;
    public array $connections = [];

    public function __construct(public string $address) {
        $this->loop = new SelectLoop();
    }

    public function run(): void {
        $server = stream_socket_server($this->address, context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
        stream_set_blocking($server, false);

        echo "【Worker 职责 1】大门迎宾员在 8080 就位，监听大门口...\n";
        
        // Worker 只干迎宾这件粗活：
        $this->loop->addRead($server, function ($server) {
            $socket = stream_socket_accept($server);
            if (!$socket) return;
            stream_set_blocking($socket, false);

            echo "\n🔔【大门门铃响了】有新客敲门进店！\n";
            
            // 迎宾员立刻为他分配一个专职服务员 TcpConnection！
            $connection = new TcpConnection($socket, $this->loop);
            $this->connections[$connection->id] = $connection;

            // 把业务关心的回调函数“接力”递给专职服务员：
            $connection->onMessage = $this->onMessage;
            $connection->onClose = function ($conn) {
                echo "【Worker 维护总账本】客人 ID {$conn->id} 离开，从总连接表移除！\n";
                unset($this->connections[$conn->id]);
                if ($this->onClose) ($this->onClose)($conn);
            };
        });

        echo "【Worker 职责 2】启动底层事件循环发动机 SelectLoop::loop()...\n\n";
        $this->loop->loop();
    }
}

// =================== 外部业务使用代码 ===================
$worker = new Worker("tcp://0.0.0.0:8080");

$worker->onMessage = function (TcpConnection $conn, $msg) {
    echo "🌟【业务层代码执行】业务程序员拿到了 \$conn 对象！\n";
    
    // 演示属性挂载：
    if (!isset($conn->loginUser)) {
        $conn->loginUser = "VIP会员_" . $conn->id;
        echo "   -> 业务代码成功在连接上挂载自定义属性: loginUser = '{$conn->loginUser}'\n";
    }

    $conn->send("您好 [{$conn->loginUser}]，已收到您的消息: " . trim($msg) . "\n");
};

$worker->run();
