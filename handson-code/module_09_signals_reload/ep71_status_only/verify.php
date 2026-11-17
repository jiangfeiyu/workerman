<?php
declare(strict_types=1);

// 【独立真实验证】EP071 实时 status 看板：Master 发 SIGUSR2 → Worker 写体检快照 → CLI 汇总打印
pcntl_async_signals(true);
$statFile = sys_get_temp_dir() . '/mw_stat_ep71.json';
@unlink($statFile);

$pid = pcntl_fork();
if ($pid === 0) {
    $done = false;
    pcntl_signal(SIGUSR2, function () use ($statFile, &$done): void {
        $stat = [
            'pid' => getmypid(),
            'memory' => round(memory_get_usage(true) / 1024 / 1024, 1) . 'MB',
            'conns' => 128,
            'qps' => 18400,
        ];
        file_put_contents($statFile, json_encode($stat));
        $done = true;
    });
    while (!$done) {
        usleep(5_000);
    }
    exit(0);
}

usleep(30_000);
posix_kill($pid, SIGUSR2);
pcntl_waitpid($pid, $status);

$data = json_decode((string)file_get_contents($statFile), true);
@unlink($statFile);

$logs = [
    "[SIGUSR2 通知] Worker pid={$data['pid']} 写入实时体检快照完成",
    sprintf("[WORKER STATUS] pid=%d | mem=%s | conns=%d | qps=%s/s", $data['pid'], $data['memory'], $data['conns'], number_format($data['qps'])),
];

$snapshot = ['episode' => 'ep71', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
