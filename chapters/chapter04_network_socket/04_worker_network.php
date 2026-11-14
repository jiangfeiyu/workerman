<?php
// 4.9 ~ 4.12 进化版 Worker：从 STDIN 迈向真实 TCP 网络，集成生命周期回调插座与 SO_REUSEADDR

class Worker
{
    public string $socketName = '';
    public $onWorkerStart = null;
    public $onConnect = null;
    public $onMessage = null;
    public $onClose = null;
    public $onError = null;

    public function __construct(string $socketName = '')
    {
        $this->socketName = $socketName;
    }

    public function run(): void
    {
        // 关卡 4.12：通过 stream_context_create 开启端口复用，避免进程重启撞上 TIME_WAIT 报 Address already in use
        $context = stream_context_create([
            'socket' => [
                'so_reuseaddr' => 1,
                'backlog'      => 1024,
            ],
        ]);

        // 1. 开启网络大门：创建监听 Socket
        $server = stream_socket_server(
            $this->socketName,
            $errno,
            $errstr,
            STREAM_SERVER_BIND | STREAM_SERVER_LISTEN,
            $context
        );
        if (!$server) {
            exit("❌ 启动监听失败: [$errno] $errstr\n");
        }

        // 2. 触发启动钩子（保持第 3 章的上下文注入规范：传入 $this）
        if (is_callable($this->onWorkerStart)) {
            try {
                ($this->onWorkerStart)($this);
            } catch (\Throwable $e) {
                $this->handleException($e);
            }
        }

        // 3. 开始接待访客循环（第 4 章仍为单客串行阻塞模型，下一章用 SelectLoop 解决并发）
        while (true) {
            $conn = @stream_socket_accept($server, -1, $remoteAddress);
            if (!$conn) {
                continue;
            }

            // 关卡 4.11：触发 onConnect 建连生命周期回调
            if (is_callable($this->onConnect)) {
                try {
                    ($this->onConnect)($conn, $remoteAddress);
                } catch (\Throwable $e) {
                    $this->handleException($e);
                }
            }

            // 读取客户请求数据
            $msg = fread($conn, 65535);
            if ($msg !== false && $msg !== '') {
                // 关卡 4.10：触发 onMessage 收到消息回调（双参数：$conn + $msg）
                if (is_callable($this->onMessage)) {
                    try {
                        ($this->onMessage)($conn, $msg);
                    } catch (\Throwable $e) {
                        $this->handleException($e);
                    }
                }
            }

            // 挂断并触发 onClose 断开生命周期回调（注意先关句柄再触发或通知上层清理）
            fclose($conn);
            if (is_callable($this->onClose)) {
                try {
                    ($this->onClose)($conn, $remoteAddress);
                } catch (\Throwable $e) {
                    $this->handleException($e);
                }
            }
        }
    }

    protected function handleException(\Throwable $e): void
    {
        if (is_callable($this->onError)) {
            ($this->onError)($e);
        } else {
            fwrite(STDERR, "⚠️ 未捕获业务异常: " . $e->getMessage() . "\n");
        }
    }
}

// ==================== 业务开发者的使用姿势（完全仿照 Workerman） ====================
$worker = new Worker("tcp://0.0.0.0:8080");

$worker->onWorkerStart = function (Worker $w) {
    echo "🚀 [onWorkerStart] Worker 已就位，监听地址: {$w->socketName} (PID: " . posix_getpid() . ")\n";
};

$worker->onConnect = function ($conn, string $remoteAddress) {
    echo "🟢 [onConnect] 新访客连入: $remoteAddress (资源标识: $conn)\n";
};

$worker->onMessage = function ($conn, string $data) {
    echo "📩 [onMessage] 收到请求前 40 字节: " . json_encode(substr($data, 0, 40)) . "\n";

    // 返回标准的 HTTP/1.1 响应报文，浏览器和 curl 都能直接看懂！
    $body = "<h1>Hello from My Tiny Workerman (Stage 4)!</h1>\n";
    $response = "HTTP/1.1 200 OK\r\n"
              . "Content-Type: text/html; charset=utf-8\r\n"
              . "Content-Length: " . strlen($body) . "\r\n"
              . "Connection: close\r\n"
              . "\r\n"
              . $body;
    fwrite($conn, $response);
};

$worker->onClose = function ($conn, string $remoteAddress) {
    echo "🔴 [onClose] 访客已断开清理: $remoteAddress\n\n";
};

$worker->run();
