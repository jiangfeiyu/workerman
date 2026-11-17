<?php
declare(strict_types=1);

// EP094: 4 进程广播失灵复现（独立验证：只呈现孤岛现象，不提前剧透 Channel 解法）
$worker1Conns = ['Alice(fd=5)', 'Charlie(fd=8)'];
$worker2Conns = ['Bob(fd=6)', 'David(fd=9)'];

// Worker#1 收到广播请求，只能遍历自己进程内的 $worker->connections
$delivered = [];
foreach ($worker1Conns as $conn) {
    $delivered[] = $conn;
}
$missed = count($worker2Conns);

$snapshot = [
    'episode' => 'ep94',
    'output'  => [
        '[Worker#1 本地广播] 遍历自家 $connections 仅触达: ' . implode(', ', $delivered),
        "[跨进程孤岛失灵] Worker#2 里的 {$missed} 位同房在线用户 (" . implode(', ', $worker2Conns) . ') 彻底漏发!',
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
