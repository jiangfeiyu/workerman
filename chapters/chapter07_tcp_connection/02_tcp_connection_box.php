<?php
// 关卡 7.2 【第一次推导进化】：封装 TcpConnection 包装盒

#[\AllowDynamicProperties]
class TcpConnection {
    public int $id;
    public $socket;

    public function __construct($socket) {
        $this->socket = $socket;
        $this->id = (int)$socket;
    }

    public function send(string $data): int|false {
        return @fwrite($this->socket, $data);
    }

    public function close(): void {
        @fclose($this->socket);
    }
}

// 模拟测试
$server = stream_socket_server("tcp://0.0.0.0:8080");
$client = stream_socket_client("tcp://127.0.0.1:8080");
$rawSocket = stream_socket_accept($server);

// 用包装盒把裸 resource 包装起来！
$conn = new TcpConnection($rawSocket);

// 现在不仅可以方便地 send，还能随意绑定业务属性！
$conn->uid = 10086;
$conn->username = "张三";
echo "=== 包装盒验证成功 ===\n";
echo "连接 ID: " . $conn->id . "\n";
echo "挂载 UID: " . $conn->uid . "\n";
echo "挂载用户名: " . $conn->username . "\n";

$conn->send("你好张三！\n");
echo "客户端收到: " . trim(fread($client, 1024)) . "\n";

$conn->close();
fclose($client);
fclose($server);
