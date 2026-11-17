<?php
declare(strict_types=1);

// 【独立验证】EP050 拆解帧头第 1 字节：FIN 与 Opcode
$samples = [
    ['byte' => 0x81, 'desc' => '完整文本帧'],
    ['byte' => 0x88, 'desc' => 'Close 断开帧'],
    ['byte' => 0x89, 'desc' => 'Ping 心跳帧'],
];
$logs = [];
foreach ($samples as $s) {
    $b = $s['byte'];
    $fin = ($b >> 7) & 1;
    $opcode = $b & 0x0f;
    $logs[] = sprintf('[0x%02X (%s)] FIN=%d, Opcode=0x%X', $b, $s['desc'], $fin, $opcode);
}

$snapshot = ['episode' => 'ep50', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
