<?php
declare(strict_types=1);

$port = getenv('PORT') ?: '9005';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);
echo "[Server] 单进程多路复用服务器就绪 tcp://127.0.0.1:{$port}\n";

// 核心总花名册：把接待门 $server 和所有客人连接放在同一个池子里！
$allFds = [(int)$server => $server];

while (true) {
    $read = $allFds;
    $write = $except = null;

    if (@stream_select($read, $write, $except, null) <= 0) {
        continue;
    }

    foreach ($read as $fd) {
        if ($fd === $server) {
            // 1. 接待门响了：迎入新客人并登记进总花名册
            $conn = @stream_socket_accept($server, 0);
            if ($conn) {
                stream_set_blocking($conn, false);
                $allFds[(int)$conn] = $conn;
                echo "[Server] 新客入座 fd=" . (int)$conn . "\n";
            }
        } else {
            // 2. 老客人说话了：读出消息并精准回复
            $data = @fread($fd, 1024);
            if ($data === '' || $data === false) {
                echo "[Server] 客人离开 fd=" . (int)$fd . "\n";
                unset($allFds[(int)$fd]);
                fclose($fd);
                continue;
            }
            echo "[Server] 收到 fd=" . (int)$fd . ": " . trim($data) . "\n";
            fwrite($fd, "Echo[fd=" . (int)$fd . "]: " . $data);
        }
    }
}
