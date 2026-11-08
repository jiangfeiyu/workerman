<?php
// 关卡 5.15 加餐实验：亲手体验水平触发（Level-Triggered）
$server = stream_socket_server("tcp://0.0.0.0:8080");

echo "=== 水平触发实验启动 (PID: " . posix_getpid() . ") ===\n";

$client = stream_socket_client("tcp://127.0.0.1:8080");
$conn = stream_socket_accept($server);

// 客户端一次性发送 6 个字节: "ABCDEF"
fwrite($client, "ABCDEF");
usleep(20000); // 等待内核接收缓冲区填满

$readSockets = [(int)$conn => $conn];
$triggerCount = 0;

while (true) {
    $read = $readSockets;
    $write = $except = null;
    // 委托保安盯梢
    stream_select($read, $write, $except, null);

    $triggerCount++;
    // 每次我们极其抠门，故意只读 2 个字节！
    $chunk = fread($conn, 2);
    echo "【第 $triggerCount 次被 select 唤醒】只读取了 2 字节: [$chunk]\n";

    if ($chunk === '' || $chunk === false) {
        break;
    }

    if ($triggerCount >= 3) {
        echo "=== 6 个字节全部读完！===\n";
        break;
    }
}

fclose($client);
fclose($conn);
fclose($server);
