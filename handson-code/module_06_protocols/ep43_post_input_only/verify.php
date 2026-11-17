<?php
declare(strict_types=1);

require_once __DIR__ . '/../http/HttpProtocol.php';

// 【独立验证】EP043 POST 请求 Content-Length 半包判定
$head = "POST /api/login HTTP/1.1\r\nHost: localhost\r\nContent-Length: 11\r\n\r\n";
$halfPost = $head . "user=";
$fullPost = $head . "user=modern";

$logs = [
    '[POST 半包 (实到5B/应到11B)] input() = ' . HttpProtocol::input($halfPost) . ' (缺6字节，返回 0 等齐)',
    '[POST 收齐 (实到11B/应到11B)] input() = ' . HttpProtocol::input($fullPost) . ' (整包总长放行!)',
];

$snapshot = ['episode' => 'ep43', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
