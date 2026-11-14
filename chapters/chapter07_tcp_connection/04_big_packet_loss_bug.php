<?php
// 关卡 7.4 💥 痛点 2（核爆级丢包车祸）：发送 5MB 大数据，神秘消失 4.8MB！

$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
stream_set_blocking($server, false);

echo "=== 大数据丢包测试服务器启动 (PID: " . posix_getpid() . ") ===\n";

// 准备发送 10MB 的测试大报文 (10,000,000 字节)
$bigData = str_repeat("A", 10000000);
$totalLength = strlen($bigData);

$client = stream_socket_client("tcp://127.0.0.1:8080");
$conn = stream_socket_accept($server);
stream_set_blocking($conn, false); // 非阻塞模式！

echo "1. 服务端准备发送 5,000,000 字节的大数据...\n";

// 💥 致命一行：直接调用 fwrite 发送！
$written = fwrite($conn, $bigData);

echo "2. fwrite 执行完毕！实际成功写入内核缓冲区的字节数: " . var_export($written, true) . " 字节\n";
echo "3. 丢弃/丢失未发送的字节数: " . ($totalLength - $written) . " 字节 (约 " . round(($totalLength - $written) / 1024 / 1024, 2) . " MB)！\n";

fclose($client);
fclose($conn);
fclose($server);
