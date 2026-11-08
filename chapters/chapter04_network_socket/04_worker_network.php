<?php
// 第 4 章成果：我们的 Worker 正式通网，并支持给客户端回话！
class Worker {
    public $onWorkerStart = null;
    public $onMessage = null;
    
    public function __construct(public string $address) {}
    
    public function run() {
        if ($this->onWorkerStart) {
            ($this->onWorkerStart)();
        }

        // 1. 迎宾员在大门口监听端口
        $server = stream_socket_server($this->address);
        
        while (true) {
            // 2. 接客：生成专职服务员 $conn
            $conn = stream_socket_accept($server);
            
            // 3. 听客人说话
            $msg = fread($conn, 1024);
            
            // 4. 触发业务回调：把 $conn 和 $msg 同时递给业务！
            if ($this->onMessage) {
                ($this->onMessage)($conn, $msg);
            }
            
            // 5. 服务完毕挂断
            fclose($conn);
        }
    }
}

// =================== 业务使用代码 ===================
$worker = new Worker("tcp://0.0.0.0:8080");

$worker->onWorkerStart = function () {
    echo "=== 现代 Web 服务器启动成功，监听 0.0.0.0:8080 ===\n";
};

$worker->onMessage = function ($conn, $msg) {
    // 构建标准的 HTTP 协议响应
    $body = "<h1>恭喜！这是你自己亲手写的 Web 服务器！</h1><p>底层原理：从 0 号管子进化到网络 Socket！</p>";
    $response = "HTTP/1.1 200 OK\r\n" .
                "Content-Type: text/html; charset=utf-8\r\n" .
                "Content-Length: " . strlen($body) . "\r\n" .
                "Connection: close\r\n" .
                "\r\n" .
                $body;
    fwrite($conn, $response);
};

$worker->run();
