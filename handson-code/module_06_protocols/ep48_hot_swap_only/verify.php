<?php
declare(strict_types=1);

require_once __DIR__ . '/../websocket/WebsocketProtocol.php';

// 【独立验证】EP048 同一条连接上 $wsHandshake false -> true 原地热切换
$wsHandshake = false;
$httpUpgrade = "GET /ws HTTP/1.1\r\nHost: localhost\r\nUpgrade: websocket\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n\r\n";

// 模拟第 1 包是 HTTP Upgrade，紧接着第 2 包（无掩码简化演示或有掩码帧）无缝切入 WS
$logs = [];
if (!$wsHandshake && ($end = strpos($httpUpgrade, "\r\n\r\n")) !== false) {
    $resp = WebsocketProtocol::handshakeResponse(substr($httpUpgrade, 0, $end + 4));
    $wsHandshake = true;
    $logs[] = '[状态 false -> true] 收到 HTTP 头，回发 101 Switching Protocols 原地升级!';
}
$logs[] = '[状态检查] 当前 $wsHandshake = ' . ($wsHandshake ? 'true (后续所有字节全走 WebsocketProtocol)' : 'false');

$snapshot = ['episode' => 'ep48', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
