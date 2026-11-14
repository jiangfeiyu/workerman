<?php
// 关卡 5.9 💥【内功细节撞墙】：消失的 3 号大门！
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));

// 模拟连入一个客户端
$client = stream_socket_client("tcp://127.0.0.1:8080");
$conn = stream_socket_accept($server);

// 此时接线员手里有 2 个 Socket：迎宾员 $server 和 客人 $conn
$read = [$server, $conn];
$write = null;
$except = null;

echo "【调用 stream_select 之前】接线员递给内核保安的名单:\n";
foreach ($read as $s) {
    echo "  - 句柄编号 (FD): " . (int)$s . ($s === $server ? " (3号大门迎宾员)" : " (客人专职通道)") . "\n";
}

// 模拟客人发送了一句话，大门没有人来
fwrite($client, "客人说了一句话\n");
usleep(20000); // 稍等网络数据到达缓冲区

// 把名单交给保安
stream_select($read, $write, $except, null);

echo "\n【调用 stream_select 之后】接线员被叫醒，低头看自己手中的 \$read 名单:\n";
foreach ($read as $s) {
    echo "  - 句柄编号 (FD): " . (int)$s . ($s === $server ? " (3号大门迎宾员)" : " (客人专职通道)") . "\n";
}

fclose($client);
fclose($conn);
fclose($server);
