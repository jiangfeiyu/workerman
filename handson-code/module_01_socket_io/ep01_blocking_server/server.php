<?php
declare(strict_types=1);

$port = getenv('PORT') ?: '9001';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
if (!$server) {
    exit("启动失败: {$errstr}\n");
}
echo "[Server] 监听 tcp://127.0.0.1:{$port} 成功，等待客人上门...\n";

while ($conn = @stream_socket_accept($server, -1)) {
    $peer = stream_socket_get_name($conn, true);
    echo "[Server] 接待新客人: {$peer}\n";

    // 死等这个客人发一行消息（没发回车前，程序卡死在这里！）
    $msg = fgets($conn);
    echo "[Server] 收到 {$peer} 消息: " . trim((string)$msg) . "\n";

    fwrite($conn, "Echo: " . $msg);
    fclose($conn);
    echo "[Server] 已送走 {$peer}\n";
}
