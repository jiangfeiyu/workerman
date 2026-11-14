<?php
// 关卡 8.11 显微镜实验：二进制 pack / unpack 与固定 4 字节大端网络序

echo "=== 关卡 8.11 显微镜实验：为什么必须用二进制 pack / unpack？ ===\n\n";

echo "1. 为什么不能用普通的字符串表示长度？\n";
$num1 = 5;
$num2 = 100000;
echo "   数字 5 转字符串: '" . (string)$num1 . "'，占用 " . strlen((string)$num1) . " 个字节\n";
echo "   数字 100000 转字符串: '" . (string)$num2 . "'，占用 " . strlen((string)$num2) . " 个字节\n";
echo "   ❌ 痛点：长度本身也是变长的！接收方根本不知道包头占几个字节！\n\n";

echo "2. 二进制的神仙效果：固定 4 字节（32 位无符号整数）！\n";
// 'N' 代表无符号长整型（32位），大端网络字节序（Big-Endian）
$bin1 = pack('N', 5);
$bin2 = pack('N', 100000);
$bin3 = pack('N', 4000000000); // 40 亿！

echo "   pack('N', 5) 二进制长度: " . strlen($bin1) . " 字节 (十六进制: " . bin2hex($bin1) . ")\n";
echo "   pack('N', 100000) 二进制长度: " . strlen($bin2) . " 字节 (十六进制: " . bin2hex($bin2) . ")\n";
echo "   pack('N', 4000000000) 二进制长度: " . strlen($bin3) . " 字节 (十六进制: " . bin2hex($bin3) . ")\n";
echo "   🎉 奇迹：无论数值多大多小（0 ~ 42亿），在内存中永远死死钉在【4 个字节】！\n\n";

echo "3. 反向解包 unpack：从固定 4 字节还原真实整数！\n";
$unpacked1 = unpack('Nlength', $bin1);
$unpacked2 = unpack('Nlength', $bin2);

echo "   从 4 字节二进制还原数字 1: " . $unpacked1['length'] . "\n";
echo "   从 4 字节二进制还原数字 2: " . $unpacked2['length'] . "\n";
echo "\n=== 显微镜实验结束 ===\n";
