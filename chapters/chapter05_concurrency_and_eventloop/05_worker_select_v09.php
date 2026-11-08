<?php
// 关卡 5.10 【招式演进 v0.9】：正式把 stream_select 与总花名册装入 Worker 类！
class Worker {
    public $onWorkerStart = null;
    public $onMessage = null;
    public $onClose = null;

    // 原始电话本（总花名册）：常驻保存所有的 Socket
    protected array $allSockets = [];
    protected $server;

    public function __construct(public string $address) {}

    public function run() {
        if ($this->onWorkerStart) ($this->onWorkerStart)();

        $this->server = stream_socket_server($this->address);
        // 把大门口迎宾员先录入总电话本
        $this->allSockets[(int)$this->server] = $this->server;

        echo "=== Worker (PID: " . posix_getpid() . ") 启动成功，基于 stream_select 事件驱动 ===\n";

        while (true) {
            // 1. 【防涂改铁律】：每次循环前，从原始电话本复印一份临时名单！
            $read = $this->allSockets;
            $write = $except = null;

            // 2. 递给保安，接线员安心睡觉（让出 CPU）
            if (stream_select($read, $write, $except, null) <= 0) {
                continue;
            }

            // 3. 保安把我们拍醒！此时 $read 里只有真正有动静的 FD！
            foreach ($read as $socket) {
                // 如果是大门口迎宾员有动静 -> 说明有新客人来了！
                if ($socket === $this->server) {
                    $conn = stream_socket_accept($this->server);
                    $fd = (int)$conn;
                    $this->allSockets[$fd] = $conn; // 把新客人登记到原始电话本！
                    echo "【迎宾员】新客人敲门进店，登记入册 (FD: $fd)！总连接数: " . count($this->allSockets) . "\n";
                } else {
                    // 否则是老客人说话了
                    $fd = (int)$socket;
                    $msg = fread($socket, 1024);

                    // 💥【关卡 5.11 伏笔】：如果客人挂断离开，fread 会返回什么？
                    if ($msg === '' || $msg === false) {
                        echo "【客人离开】FD $fd 挂断电话，从电话本划掉并关闭！\n";
                        fclose($socket);
                        unset($this->allSockets[$fd]); // 从原始电话本注销！
                        if ($this->onClose) ($this->onClose)($socket);
                        continue;
                    }

                    if ($this->onMessage) {
                        ($this->onMessage)($socket, $msg);
                    }
                }
            }
        }
    }
}

// 业务测试代码
$worker = new Worker("tcp://0.0.0.0:8080");
$worker->onMessage = function ($conn, $msg) {
    echo "【收到业务消息】" . trim($msg) . "\n";
    fwrite($conn, "服务端回复: " . trim($msg) . "\n");
};
$worker->onClose = function ($conn) {
    echo "【业务回调】触发 onClose 事件！\n";
};
$worker->run();
