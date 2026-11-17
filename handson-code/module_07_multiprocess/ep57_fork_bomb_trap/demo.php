<?php
declare(strict_types=1);

// EP057 【踩坑】: 循环里忘记 exit(0) 会炸出 2^N = 16 个进程！
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$rootPid = getmypid();

for ($i = 0; $i < 4; $i++) {
    $pid = pcntl_fork();
    // 故意不判断 $pid === 0 并 exit(0)，于是子进程也接着跑剩下的循环！
    if ($pid > 0) {
        // 父进程记录等待回收，避免产生孤儿
    }
}

if (getmypid() === $rootPid) {
    fclose($w);
    // 等待所有子进程结束并统计报告总数
    while (pcntl_wait($status) > 0) {}
    $lines = array_filter(explode("\n", trim((string)stream_get_contents($r))));
    fclose($r);
    $total = 1 + count($lines);
    $logs = [
        "[错误写法: 忘记 exit(0)] 仅写 4 次 fork 循环 -> 实际产生总进程数 = {$total} (2^4=16!)",
        "[正确写法: if (\$pid === 0) exit(0);] 只在 Master 进程继续循环 -> 精准启动 4 个 Worker!",
    ];
    $snapshot = ['episode' => 'ep57_fork_bomb', 'output' => $logs];
    file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
    echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
} else {
    fclose($r);
    fwrite($w, getmypid() . "\n");
    fclose($w);
    while (pcntl_wait($status) > 0) {}
    exit(0);
}
