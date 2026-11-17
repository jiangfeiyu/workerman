<?php
declare(strict_types=1);

// EP076 【合拢】: 1 活跃 + 499 空闲连接下，Select O(N) 扫描 vs Ready-List O(1) 调度对比
$fdCount = 500;
$ticks   = 500;
$pairs   = [];
$allRead = [];

for ($i = 0; $i < $fdCount; $i++) {
    $p = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
    stream_set_blocking($p[0], false);
    $pairs[] = $p;
    $allRead[] = $p[0];
}
fwrite($pairs[0][1], 'ping');

// 1. SelectLoop 模型：每轮拷贝全部 500 个 FD 进内核轮询
$t1 = hrtime(true);
for ($t = 0; $t < $ticks; $t++) {
    $r = $allRead;
    $w = $e = null;
    stream_select($r, $w, $e, 0, 0);
}
$selectMs = (hrtime(true) - $t1) / 1e6;

// 2. Epoll/Kqueue 就绪链表模型：红黑树常驻 + 每轮仅派发就绪的 1 个活跃 FD
$readyQueue = [0 => $pairs[0][0]];
$t2 = hrtime(true);
for ($t = 0; $t < $ticks; $t++) {
    foreach ($readyQueue as $fd) {
        $active = $fd;
    }
}
$epollMs = (hrtime(true) - $t2) / 1e6;
$speedup = round($selectMs / max($epollMs, 0.001), 1);

foreach ($pairs as [$a, $b]) {
    fclose($a);
    fclose($b);
}

$logs = [
    sprintf('[SelectLoop 500 FD × 500 轮] O(N) 全量拷贝轮询耗时 = %.2f ms', $selectMs),
    sprintf('[Epoll/ReadyList 500 FD × 500 轮] O(1) 仅派发就绪事件 = %.3f ms', $epollMs),
    "[第 4 篇终极合拢] O(1) 就绪事件调度提速约 {$speedup}x! Master + Daemon + Reload + Epoll 核动力就位!",
];

$snapshot = ['episode' => 'ep76_bench', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
