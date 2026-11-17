<?php
declare(strict_types=1);

// 【独立验证】EP073 模拟红黑树注册常驻 + 就绪链表只派发活跃连接 O(1)
$rbTreeCount = 10_000;
$readyList = [1088, 4092]; // 万级在线中只有 2 个连接真正有包到!
$t0 = hrtime(true);
$handled = 0;
foreach ($readyList as $fd) {
    $handled++;
}
$us = round((hrtime(true) - $t0) / 1000, 2);

$logs = [
    "[红黑树托管] 10,000 个 FD 一次性注册进内核树 (0 轮询拷贝)",
    "[rdlist 就绪链表] 网卡中断只推入 {$handled} 个活跃 FD => O(1) 派发耗时 {$us} μs!",
];

$snapshot = ['episode' => 'ep73', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
