<?php
declare(strict_types=1);

// 【独立真实验证】EP069 优雅热更新 reload：Master 转发 SIGUSR1 → 老 Worker 停接新客退 → Master 拉起 v2
pcntl_async_signals(true);
$verFile = sys_get_temp_dir() . '/mw_ep69_ver.txt';
file_put_contents($verFile, 'v1.0');
$logs = [];

$spawnWorker = function (string $tag) use ($verFile): int {
    $pid = pcntl_fork();
    if ($pid === 0) {
        $ver = trim((string)file_get_contents($verFile));
        $gotReload = false;
        pcntl_signal(SIGUSR1, function () use (&$gotReload): void {
            $gotReload = true;
        });
        while (!$gotReload) {
            usleep(10_000);
        }
        // 老 Worker 排空手头请求后体面退出 (exit 0)
        exit(0);
    }
    return $pid;
};

$oldPid = $spawnWorker('old');
usleep(30_000);
// 模拟代码已升级到 v2.0，Admin 发 SIGUSR1
file_put_contents($verFile, 'v2.0');
posix_kill($oldPid, SIGUSR1);
$logs[] = "[Master 收到 reload] 向老 Worker pid={$oldPid} 转发 SIGUSR1";

pcntl_waitpid($oldPid, $status);
$logs[] = "[老 Worker {$oldPid}] 排空缓冲后体面 exit(" . pcntl_wexitstatus($status) . ")";

$newPid = $spawnWorker('new');
$newVer = trim((string)file_get_contents($verFile));
$logs[] = "[Master pcntl_wait] 秒拉新 Worker pid={$newPid} 加载新代码 ({$newVer})!";
posix_kill($newPid, SIGUSR1);
pcntl_waitpid($newPid, $s2);
@unlink($verFile);

$snapshot = ['episode' => 'ep69', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
