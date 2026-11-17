<?php
declare(strict_types=1);

require_once __DIR__ . '/../FrameProtocol.php';

// 模拟两包黏在一起 + 半包截断 + 恶意超大包熔断
$rawStream = FrameProtocol::encode('Packet-1') . FrameProtocol::encode("Line1\nLine2(带换行也不怕!)");
$half = substr($rawStream, 0, 10); // 先只到达前 10 字节
$rest = substr($rawStream, 10);

$recvBuffer = $half;
$logs = [];
$logs[] = '[收到前10字节] input() 返回 = ' . FrameProtocol::input($recvBuffer) . ' (继续蓄水等待)';

$recvBuffer .= $rest;
while (($len = FrameProtocol::input($recvBuffer)) > 0) {
    $pkg = substr($recvBuffer, 0, $len);
    $recvBuffer = substr($recvBuffer, $len);
    $logs[] = '[切出完整帧 len=' . $len . '] decode => ' . str_replace("\n", '\\n', FrameProtocol::decode($pkg));
}

try {
    FrameProtocol::input(pack('N', 99 * 1024 * 1024));
} catch (\LengthException $e) {
    $logs[] = '[恶意超大包拦截] ' . $e->getMessage();
}

$snapshot = ['episode' => 'ep39_40', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
