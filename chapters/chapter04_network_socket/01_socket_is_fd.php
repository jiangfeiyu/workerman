<?php
// 4.1 开启网络监听：创建一个 TCP 服务端 Socket
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
$pid = posix_getpid();

echo "=== 开启网络监听后，查看 /proc/$pid/fd 里的号码牌 ===\n";
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd >= 3) {
        echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}
sleep(2);
