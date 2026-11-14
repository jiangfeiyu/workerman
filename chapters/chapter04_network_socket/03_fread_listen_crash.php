<?php
// 4.4 撞墙实验：为什么不能直接对“门卫迎宾句柄 ($server)”调用 fread() 读业务数据？
// 1) 对处于 LISTEN 状态的监听 Socket 调用 fread() 不会读取客户端数据（阻塞模式会死锁，非阻塞模式返回 false 并触发内核 ENOTCONN）；
// 2) 必须先用 stream_socket_accept($server) 接客，生出专职连接句柄 $conn 后，才能用 fread($conn, 1024) 读数据！

$server = stream_socket_server("tcp://127.0.0.1:8080", $errno, $errstr, context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
if (!$server) {
    exit("启动监听失败: [$errno] $errstr\n");
}

$pid = posix_getpid();
echo "=== 1. 监听已启动 (PID: $pid)，查看 /proc/$pid/fd ===\n";
$fds = scandir("/proc/$pid/fd");
foreach ($fds as $fd) {
    if (ctype_digit($fd) && (int)$fd >= 3 && file_exists("/proc/$pid/fd/$fd")) {
        $link = @readlink("/proc/$pid/fd/$fd");
        if ($link !== false) {
            echo "  内核 FD [$fd] -> $link\n";
        }
    }
}

// 模拟一个本地客户端立刻连上来并发送 "hello\n"
$client = stream_socket_client("tcp://127.0.0.1:8080", $cErrNo, $cErrStr);
fwrite($client, "hello\n");
echo "\n=== 2. 客户端已连接并发送了 6 字节 \"hello\\n\" ===\n";

// 将 $server 改为非阻塞避免永久死等，并清除历史错误，直接对 $server 调用 fread()
stream_set_blocking($server, false);
error_clear_last();
echo "错误尝试：直接调用 fread(\$server, 1024)...\n";
$wrongRead = fread($server, 1024);
$lastErr = error_get_last()['message'] ?? '内核 recv 返回 -1 (ENOTCONN: Transport endpoint is not connected)';
echo "  -> 返回值: " . var_export($wrongRead, true) . "\n";
echo "  -> 内核态度: $lastErr\n";

// 正确做法：先让门卫 $server 接客，生成专职服务员 $conn
stream_set_blocking($server, true);
$conn = stream_socket_accept($server);
$msg = fread($conn, 1024);
echo "\n=== 3. 正确做法：经 stream_socket_accept(\$server) 拿到 \$conn 后再 fread(\$conn) ===\n";
echo "  -> 成功读到客户端消息: " . json_encode($msg) . "\n";

fclose($client);
fclose($conn);
fclose($server);
