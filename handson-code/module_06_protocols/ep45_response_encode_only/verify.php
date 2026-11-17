<?php
declare(strict_types=1);

require_once __DIR__ . '/../http/HttpProtocol.php';

// 【独立验证】EP045 Response::json() 与 HttpProtocol::encode()
$resp = Response::json(['ok' => true, 'msg' => 'hello http']);
$wire = HttpProtocol::encode($resp);
$lines = explode("\r\n", $wire);

$logs = [
    '[状态行] ' . $lines[0],
    '[自动补齐头] ' . $lines[1] . ' | ' . $lines[2],
    '[响应 Body] ' . end($lines),
];

$snapshot = ['episode' => 'ep45', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
