<?php
// 关卡 6.1 💥 撞墙血案：在事件循环中误用 sleep(3) 导致全服所有客人被施定身法定住！

class SimpleWorker {
    public array $readFds = [];
    public $onMessage = null;

    public function __construct(public string $address) {}

    public function run() {
        $server = stream_socket_server($this->address, context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
        $this->readFds[(int)$server] = $server;
        echo "=== 服务器已启动 (PID: " . posix_getpid() . ")，监听 0.0.0.0:8080 ===\n";

        while (true) {
            $read = $this->readFds;
            $write = $except = null;
            if (@stream_select($read, $write, $except, null) <= 0) continue;

            foreach ($read as $socket) {
                if ($socket === $server) {
                    $conn = stream_socket_accept($server);
                    $this->readFds[(int)$conn] = $conn;
                    echo "【大门】新客人进门: FD " . (int)$conn . "\n";
                } else {
                    $msg = fread($socket, 1024);
                    if ($msg === '' || $msg === false) {
                        fclose($socket);
                        unset($this->readFds[(int)$socket]);
                        continue;
                    }

                    // 触发业务逻辑
                    if ($this->onMessage) {
                        ($this->onMessage)($socket, $msg);
                    }
                }
            }
        }
    }
}

// =================== 业务使用 ===================
$worker = new SimpleWorker("tcp://0.0.0.0:8080");

$worker->onMessage = function ($conn, $msg) {
    echo "【业务收到客人 (FD " . (int)$conn . ") 消息】: " . trim($msg) . "\n";
    echo "【业务开始做耗时操作】模拟需要 3 秒钟做菜，准备 sleep(3)...\n";

    // 💥 致命毒药：在单进程事件循环里写 sleep！
    sleep(3);

    echo "【业务耗时结束】3 秒做菜完毕，给客人 (FD " . (int)$conn . ") 上菜！\n";
    fwrite($conn, "服务端回复: 您的菜做好了！\n");
};

$worker->run();
