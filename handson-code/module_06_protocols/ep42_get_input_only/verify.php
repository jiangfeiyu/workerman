<?php
declare(strict_types=1);

require_once __DIR__ . '/../http/HttpProtocol.php';

// 【独立验证】EP042 GET 请求头切分：没收到 \r\n\r\n 返回 0，收到后返回 $headerEnd + 4
$halfGet = "GET /ping HTTP/1.1\r\nHost: localhost\r\n";
$fullGet = $halfGet . "\r\n";

$logs = [
    '[未收齐请求头] input() = ' . HttpProtocol::input($halfGet) . ' (缺少空行 \\r\\n\\r\\n，继续等)',
    '[收齐 GET 请求] input() = ' . HttpProtocol::input($fullGet) . ' ($headerEnd + 4 = ' . strlen($fullGet) . ' 字节)',
];

$snapshot = ['episode' => 'ep42', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
