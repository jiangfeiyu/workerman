<?php
// 关卡 5.13 【招式演进 v1.0】：手写工业级 SelectLoop 事件循环引擎
class SelectLoop {
    // 监听花名册与回调插座
    protected array $readFds = [];
    protected array $readCallbacks = [];

    /**
     * 注册监听一个 FD 的可读事件
     */
    public function addRead($stream, callable $callback): void {
        $fd = (int)$stream;
        $this->readFds[$fd] = $stream;
        $this->readCallbacks[$fd] = $callback;
    }

    /**
     * 注销对某个 FD 的监听
     */
    public function delRead($stream): void {
        $fd = (int)$stream;
        unset($this->readFds[$fd], $this->readCallbacks[$fd]);
    }

    /**
     * 启动事件循环心脏
     */
    public function loop(): void {
        while (true) {
            $read = $this->readFds;
            $write = $except = null;

            // 委托内核保安盯梢，休眠让出 CPU
            if (@stream_select($read, $write, $except, null) <= 0) {
                continue;
            }

            // 哪个 FD 就绪，自动触发对应的专属回调函数！
            foreach ($read as $stream) {
                $fd = (int)$stream;
                if (isset($this->readCallbacks[$fd])) {
                    ($this->readCallbacks[$fd])($stream);
                }
            }
        }
    }
}

// =================== Worker 依托 SelectLoop 优雅组装 ===================
class Worker {
    public $onWorkerStart = null;
    public $onMessage = null;
    public $onClose = null;

    protected SelectLoop $loop;

    public function __construct(public string $address) {
        $this->loop = new SelectLoop();
    }

    public function run(): void {
        if ($this->onWorkerStart) ($this->onWorkerStart)();

        $server = stream_socket_server($this->address);
        stream_set_blocking($server, false);

        // 迎宾员就位：只要大门有动静，就调用 acceptConnection
        $this->loop->addRead($server, [$this, 'acceptConnection']);

        echo "=== ModernWorker v1.0 启动成功，基于事件循环引擎 SelectLoop ===\n";
        $this->loop->loop();
    }

    public function acceptConnection($server): void {
        $conn = stream_socket_accept($server);
        if (!$conn) return;

        stream_set_blocking($conn, false);
        $fd = (int)$conn;
        echo "【大门】新客人进门 (FD: $fd)！\n";

        // 客人就位：只要客人开口说话，就调用 readFromClient
        $this->loop->addRead($conn, [$this, 'readFromClient']);
    }

    public function readFromClient($conn): void {
        $msg = fread($conn, 1024);
        $fd = (int)$conn;

        // 完美处理断开连接，消灭死循环风暴
        if ($msg === '' || $msg === false) {
            echo "【包厢】客人 (FD: $fd) 挂断离开，注销事件监听。\n";
            $this->loop->delRead($conn);
            fclose($conn);
            if ($this->onClose) ($this->onClose)($conn);
            return;
        }

        if ($this->onMessage) {
            ($this->onMessage)($conn, $msg);
        }
    }
}

// =================== 业务使用 ===================
$worker = new Worker("tcp://0.0.0.0:8080");
$worker->onMessage = function ($conn, $msg) {
    echo "【收到业务数据】: " . trim($msg) . "\n";
    fwrite($conn, "服务端回复: " . trim($msg) . "\n");
};
$worker->onClose = function ($conn) {
    echo "【业务通知】连接已安全释放！\n";
};
$worker->run();
