<?php
declare(strict_types=1);

require_once __DIR__ . '/WebsocketProtocol.php';

$logs = [];

// 1. 测试 RFC 6455 标准握手暗号
$req = "GET /chat HTTP/1.1\r\nUpgrade: websocket\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n\r\n";
$resp = WebsocketProtocol::handshakeResponse($req);
preg_match('/Sec-WebSocket-Accept:\s*(.+)/i', $resp, $m);
$logs[] = '[101 握手校验] Sec-WebSocket-Accept = ' . trim($m[1]);

// 2. 构造一帧浏览器发来的带 4 字节 Masking Key 的 WebSocket 文本帧 ("Hi Workerman!")
$msg = 'Hi Workerman!';
$mask = "\x12\x34\x56\x78";
$maskedPayload = '';
for ($i = 0; $i < strlen($msg); $i++) {
    $maskedPayload .= $msg[$i] ^ $mask[$i % 4];
}
$clientFrame = chr(0x81) . chr(0x80 | strlen($msg)) . $mask . $maskedPayload;

$pkgLen = WebsocketProtocol::input($clientFrame);
$decoded = WebsocketProtocol::decode(substr($clientFrame, 0, $pkgLen));
$logs[] = "[Mask 异或解密帧] input={$pkgLen}B, decode => {$decoded}";

// 3. 服务端主动推送编码（不加 Mask）
$serverFrame = WebsocketProtocol::encode('Welcome to ModernWorker WS!');
$logs[] = '[服务端推送封包] totalBytes=' . strlen($serverFrame) . ', firstByte=0x' . strtoupper(bin2hex($serverFrame[0]));

$snapshot = ['episode' => 'ep47_54', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
