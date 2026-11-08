<?php
// 客户端：接收 10MB 数据并统计总字节数
$client = stream_socket_client("tcp://127.0.0.1:8080");
fwrite($client, "get_big\n");

$receivedTotal = 0;
$start = microtime(true);

while (!feof($client)) {
    $chunk = fread($client, 65536);
    if ($chunk === false || $chunk === '') {
        // 等待一点网络缓冲
        usleep(1000);
        continue;
    }
    $receivedTotal += strlen($chunk);
    if ($receivedTotal >= 10000000) {
        break;
    }
}

$cost = round(microtime(true) - $start, 3);
echo "=== 客户端接收完毕 ===\n";
echo "实际累计收到: $receivedTotal 字节 (计划: 10000000 字节)\n";
echo "传输耗时: $cost 秒\n";
if ($receivedTotal === 10000000) {
    echo "🎉 100% 完整接收，0 字节丢失！大获全胜！\n";
} else {
    echo "❌ 丢包了！\n";
}
fclose($client);
