<?php
declare(strict_types=1);

// 【铺垫】大端序二进制封包显微镜：把长度数字 300 变成 4 个字节！
$len = 300; // 0x0000012C = 1 * 256 + 44
$packed = pack('N', $len);

$bytesHex = [];
for ($i = 0; $i < strlen($packed); $i++) {
    $bytesHex[] = sprintf('0x%02X (%d)', ord($packed[$i]), ord($packed[$i]));
}

$unpacked = unpack('Nlen', $packed);
echo "[pack('N', 300) 4字节大端序] " . implode(' | ', $bytesHex) . "\n";
echo "[unpack('Nlen') 还原整数] len = " . $unpacked['len'] . "\n";
