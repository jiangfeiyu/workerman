<?php
// 关卡 7.3 【第二次推导进化】：职责搬家 —— TcpConnection 自治管理

require_once __DIR__ . '/../chapter06_timer_and_heap/14_select_loop_with_heap.php';

#[\AllowDynamicProperties]
class TcpConnection {
    public int $id;
    public $onMessage = null;
    public $onClose = null;

    public function __construct(
        public $socket,
        protected SelectLoop $loop
    ) {
        $this->id = (int)$socket;
        // 🌟 职责搬家：连接自己向事件循环挂载自己的读事件！
        $this->loop->addRead($this->socket, [$this, 'baseRead']);
    }

    /**
     * 底层读数据方法
     */
    public function baseRead($socket): void {
        $data = @fread($socket, 65535);

        // 如果客户端挂断离开
        if ($data === '' || $data === false) {
            $this->destroy();
            if ($this->onClose) {
                ($this->onClose)($this);
            }
            return;
        }

        // 触发业务消息回调，注意：第一个参数是 $this 对象本身！
        if ($this->onMessage) {
            ($this->onMessage)($this, $data);
        }
    }

    public function send(string $data): int|false {
        return @fwrite($this->socket, $data);
    }

    public function destroy(): void {
        // 从事件循环中卸载读事件
        $this->loop->delRead($this->socket);
        @fclose($this->socket);
    }
}

// =================== Worker 极致瘦身 ===================
class Worker {
    public $onMessage = null;
    public $onClose = null;
    protected SelectLoop $loop;
    // 所有的活体连接表
    public array $connections = [];

    public function __construct(public string $address) {
        $this->loop = new SelectLoop();
    }

    public function run(): void {
        $server = stream_socket_server($this->address);
        stream_set_blocking($server, false);

        // Worker 此时只负责大门口迎宾！
        $this->loop->addRead($server, function ($server) {
            $socket = stream_socket_accept($server);
            if (!$socket) return;
            stream_set_blocking($socket, false);

            // 孵化出独立的 TcpConnection 对象！
            $connection = new TcpConnection($socket, $this->loop);
            $this->connections[$connection->id] = $connection;

            // 继承业务回调
            $connection->onMessage = $this->onMessage;
            $connection->onClose = function ($conn) {
                unset($this->connections[$conn->id]);
                if ($this->onClose) ($this->onClose)($conn);
            };

            echo "【大门】新客人进门，孵化 TcpConnection 对象 (ID: {$connection->id})！\n";
        });

        echo "=== Worker 瘦身成功，监听 8080 ===\n";
        $this->loop->loop();
    }
}

// 业务测试代码
$worker = new Worker("tcp://0.0.0.0:8080");
$worker->onMessage = function (TcpConnection $conn, $msg) {
    // 业务程序员可以极其优雅地挂属性！
    $conn->msgCount = ($conn->msgCount ?? 0) + 1;
    echo "【业务收到消息】[ID: {$conn->id}, 第 {$conn->msgCount} 次发话]: " . trim($msg) . "\n";
    $conn->send("服务端回复 (您已发话 {$conn->msgCount} 次): " . trim($msg) . "\n");
};

$worker->run();
