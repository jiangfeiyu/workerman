<?php
declare(strict_types=1);

// EP062 【踩坑】: 关掉 SSH 终端时，内核向控制终端组发送 SIGHUP 灭门信号
$pid = pcntl_fork();
if ($pid === 0) {
    // 恢复终端前台进程默认 SIGHUP 行为，并设 1s 安全上限防止死等
    pcntl_signal(SIGHUP, SIG_DFL);
    for ($i = 0; $i < 100; $i++) {
        usleep(10_000);
    }
    exit(0);
}

usleep(20_000);
// 模拟 SSH 断开：向子进程发送 SIGHUP (信号 1)
posix_kill($pid, SIGHUP);
pcntl_waitpid($pid, $status);

$logs = [
    "[模拟 SSH 窗口关闭] 终端销毁 -> 内核投递 SIGHUP(1) 给前台进程组 pid={$pid}",
    "[未做守护化惨状] signaled=" . (pcntl_wifsignaled($status) ? 'true' : 'false') . " | termSig=" . pcntl_wtermsig($status) . " (SIGHUP 当场杀全家!)",
];

$snapshot = ['episode' => 'ep62_sighup', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
