<?php
declare(strict_types=1);

// 【加餐过渡】WebSocket 帧布局与 pack('n') / pack('J') / unpack(...)[1] 速通
$len2B = pack('n', 300);            // 'n' = 2 字节大端序 (0..65535)
$len8B = pack('J', 70000);          // 'J' = 8 字节大端序 (超过 64KB)

// 为什么 unpack('n', ...) 要写 [1]？因为没起别名时，PHP 默认从下标 1 开始返回数组！
$unpacked2 = unpack('n', $len2B);
$unpacked8 = unpack('J', $len8B);

$logs = [
    "[pack('n', 300) 2字节] 字节数=" . strlen($len2B) . " | unpack('n')[1] = " . $unpacked2[1],
    "[pack('J', 70000) 8字节] 字节数=" . strlen($len8B) . " | unpack('J')[1] = " . $unpacked8[1],
    "[帧头顺序] [B0][B1] → [ExtLen: 0/2/8B] → [MaskKey: 0/4B] → [Payload]",
];

$snapshot = ['episode' => 'ep50b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
