<?php
declare(strict_types=1);

$logs = [];

$byte1 = 0x81; // 二进制 1000 0001 -> FIN=1, Opcode=1(文本帧)
$fin    = ($byte1 >> 7) & 1;
$opcode = $byte1 & 0x0F;
$logs[] = sprintf('[第1字节 0x%02X = %08b] FIN=%d, Opcode=%d (文本帧)', $byte1, $byte1, $fin, $opcode);

$byte2 = 0x85; // 二进制 1000 0101 -> MASK=1, 长度=5
$masked  = ($byte2 >> 7) & 1;
$lenCode = $byte2 & 0x7F;
$logs[] = sprintf('[第2字节 0x%02X = %08b] MASK=%d, PayloadLen=%d', $byte2, $byte2, $masked, $lenCode);

// 异或加密再解密魔术：同一把密钥 XOR 两次必回原文
$plain = 'Hello';
$key   = "\x1A\x2B\x3C\x4D";
$cipher = '';
$back   = '';
for ($i = 0; $i < strlen($plain); $i++) {
    $cipher .= $plain[$i] ^ $key[$i % 4];
}
for ($i = 0; $i < strlen($cipher); $i++) {
    $back .= $cipher[$i] ^ $key[$i % 4];
}
$logs[] = sprintf('[XOR 两次还原] 原文=%s -> 密文HEX=%s -> 再异或=%s', $plain, bin2hex($cipher), $back);

$snapshot = ['episode' => 'ep49_bitwise', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
