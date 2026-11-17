<?php
declare(strict_types=1);

require_once __DIR__ . '/../websocket/WebsocketProtocol.php';

$logs = [];
$server = stream_socket_server('tcp://127.0.0.1:0', $errno, $errstr);
if (!$server) {
    fwrite(STDERR, "listen failed: $errstr\n");
    exit(1);
}
$addr = stream_socket_get_name($server, false);

// 两个模拟浏览器客户端连上服务端
$alice = stream_socket_client("tcp://{$addr}", $e1, $s1, 2);
$srvAlice = stream_socket_accept($server, 2);
$bob = stream_socket_client("tcp://{$addr}", $e2, $s2, 2);
$srvBob = stream_socket_accept($server, 2);

// 1. Alice 发起 HTTP Upgrade 握手，服务端热切换为 WebSocket
fwrite($alice, "GET /chat HTTP/1.1\r\nUpgrade: websocket\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n\r\n");
$handshakeReq = fread($srvAlice, 4096);
$resp101 = WebsocketProtocol::handshakeResponse($handshakeReq);
fwrite($srvAlice, $resp101);
$aliceReply = fread($alice, 4096);
$logs[] = '[Step 1 · 101 协议升级] ' . strtok($aliceReply, "\r\n") . ' (HTTP 通道已热切换为 WebSocket!)';

// 2. Alice 发送一条掩码加密聊天消息
$rawMsg = '大家好，我是 Alice!';
$mask = "\x37\xFA\x21\x3D";
$masked = '';
for ($i = 0; $i < strlen($rawMsg); $i++) {
    $masked .= $rawMsg[$i] ^ $mask[$i % 4];
}
$wsFrame = chr(0x81) . chr(0x80 | strlen($rawMsg)) . $mask . $masked;
fwrite($alice, $wsFrame);

$buf = fread($srvAlice, 4096);
$pkgLen = WebsocketProtocol::input($buf);
$text = WebsocketProtocol::decode(substr($buf, 0, $pkgLen));
$logs[] = "[Step 2 · 收到浏览器掩码帧] input={$pkgLen}B -> decode=\"{$text}\"";

// 3. 服务端用 WebsocketProtocol::encode 广播推送给 Bob（无掩码）
$broadcast = "[广播] Alice: {$text}";
fwrite($srvBob, WebsocketProtocol::encode($broadcast));
$bobBuf = fread($bob, 4096);
$bobLen = WebsocketProtocol::input($bobBuf);
$bobGot = WebsocketProtocol::decode(substr($bobBuf, 0, $bobLen));
$logs[] = "[Step 3 · 全服广播推送 Bob] total={$bobLen}B -> Bob 收到: \"{$bobGot}\"";

fclose($alice);
fclose($bob);
fclose($srvAlice);
fclose($srvBob);
fclose($server);

$snapshot = ['episode' => 'ep54_ws_chat', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
