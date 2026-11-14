<?php
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
$pid = posix_getpid();
echo "1. 饭店开门（\$server 是门口迎宾员），等待客人上门（阻塞在这里）...\n";

// stream_socket_accept 会阻塞卡住，直到有客户端连上来！
$conn = stream_socket_accept($server);

echo "2. 客人进门接通了！我们看一下 /proc/$pid/fd 里的号码牌:\n";
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd >= 3) {
        echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}

// 听客人说话并回复
$msg = fread($conn, 1024);
echo "3. 专职服务员收到客人说: $msg";
fwrite($conn, "服务端回复: 已经收到您的信息!\n");

fclose($conn); // 客人离开
fclose($server);
