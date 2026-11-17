<?php
declare(strict_types=1);

require_once __DIR__ . '/../FrameProtocol.php';

// 【独立验证】EP039 纯净 FrameProtocol 切包（不提前剧透 EP040 超大包熔断）
$pkt1 = FrameProtocol::encode('Packet-1');
$pkt2 = FrameProtocol::encode("Line1\nLine2(带换行也不怕!)");
$stream = $pkt1 . $pkt2;

$logs = [];
// 先喂前 10 字节（Packet-1 总长=4+8=12 字节，故意差 2 字节）
$buf = substr($stream, 0, 10);
$logs[] = '[收到前10字节] input() = ' . FrameProtocol::input($buf) . ' (不够12B继续蓄水)';

// 补齐全部剩余字节，while 循环切出两帧
$buf .= substr($stream, 10);
while ($buf !== '' && ($len = FrameProtocol::input($buf)) > 0) {
    $pkg = substr($buf, 0, $len);
    $buf = substr($buf, $len);
    $logs[] = "[切出完整帧 len={$len}] decode => " . str_replace("\n", "\\n", FrameProtocol::decode($pkg));
}

$snapshot = ['episode' => 'ep39', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
