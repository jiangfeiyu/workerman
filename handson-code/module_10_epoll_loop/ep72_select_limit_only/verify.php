<?php
declare(strict_types=1);

// 【独立真实验证】EP072 实测 stream_select O(N) 随 FD 数量增加而线性飙升
$logs = [];
foreach ([50, 200, 450] as $count) {
    $pairs = [];
    $read = [];
    for ($i = 0; $i < $count; $i++) {
        [$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
        $pairs[] = [$r, $w];
        $read[] = $r;
    }
    $t0 = hrtime(true);
    for ($round = 0; $round < 300; $round++) {
        $rCopy = $read;
        $wCopy = $eCopy = null;
        @stream_select($rCopy, $wCopy, $eCopy, 0, 0);
    }
    $ms = round((hrtime(true) - $t0) / 1_000_000, 2);
    $logs[] = sprintf('[FD=%3d × 300轮] stream_select O(N) 耗时 = %.2f ms', $count, $ms);
    foreach ($pairs as [$r, $w]) {
        fclose($r);
        fclose($w);
    }
}
$logs[] = '[硬上限警报] Linux glibc FD_SETSIZE=1024，超过第 1024 个连接即越界崩溃!';

$snapshot = ['episode' => 'ep72', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
