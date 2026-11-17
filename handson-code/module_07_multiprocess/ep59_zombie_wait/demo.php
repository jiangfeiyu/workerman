<?php
declare(strict_types=1);

// EP059: 僵尸进程回收实验 (pcntl_waitpid 替子进程收尸)
$pid = pcntl_fork();
if ($pid === 0) {
    exit(42); // 子进程立刻退出，变成短暂等待回收的“僵尸”
}

usleep(30_000); // 等 30ms 让子进程已死但父进程尚未 wait
$reaped = pcntl_waitpid($pid, $status);
$exitCode = pcntl_wexitstatus($status);

$logs = [
    "[子进程 pid={$pid} 先行退出] 若父进程不调用 pcntl_waitpid()，PID 表项永远残留为僵尸 (Z)!",
    "[Master 调用 pcntl_waitpid({$pid})] 回收 pid={$reaped} | normalExit=" . (pcntl_wifexited($status) ? 'true' : 'false') . " | exitCode={$exitCode}",
];

$snapshot = ['episode' => 'ep59_zombie', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
