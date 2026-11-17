<?php
declare(strict_types=1);

// 【加餐过渡】EP088B 为什么不能用 ssl:// 监听？因为 ssl:// accept 会阻塞等整个 TLS 握手，慢客会冻死全服！
$logs = [
    '[错误方案 ssl://] stream_socket_accept() 内部同步阻塞等 TLS 握手 → 1 个慢客户端卡死全服 10,000 人!',
    '[正确方案 tcp:// + 非阻塞握手] 先 0ms accept 拿到明文 TCP 句柄，再自己异步驱动 stream_socket_enable_crypto()!',
];

$snapshot = ['episode' => 'ep88b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
