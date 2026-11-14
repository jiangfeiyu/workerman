<?php
// 服务端：故意忘记 fclose，制造生产环境臭名昭著的 CLOSE_WAIT 泄露
$server = stream_socket_server('tcp://127.0.0.1:9999', $errno, $errstr, context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
echo "[服务端] 监听 9999 端口...\n";

$conn = stream_socket_accept($server);
echo "[服务端] 收到客户端连接！等待客户端主动断开...\n";

// 读取客户端的数据。当客户端关闭连接时，fread 会返回空字符串 "" (EOF)
$data = fread($conn, 1024);
echo "[服务端] 读到了 EOF (客户端已断开)，但我们故意【不执行 fclose(\$conn)】！\n";
echo "[服务端] 保持进程存活 60 秒，方便观察内核状态...\n";

sleep(60);
