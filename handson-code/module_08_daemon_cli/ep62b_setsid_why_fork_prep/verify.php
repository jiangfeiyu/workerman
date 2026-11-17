<?php
declare(strict_types=1);

// 【加餐过渡】为什么不能直接调 posix_setsid()？因为进程组长不允许新建会话！
$tmp1 = __DIR__ . '/p1.tmp';
$tmp2 = __DIR__ . '/p2.tmp';
@unlink($tmp1);
@unlink($tmp2);

// 1. 模拟终端里作为“进程组长”运行的脚本，直接调 posix_setsid() 必返回 -1！
$leader = pcntl_fork();
if ($leader === 0) {
    posix_setpgid(0, 0); // 让自己成为自己进程组的组长 (pid === pgid)
    $pid = getmypid();
    $pgid = posix_getpgid($pid);
    $res = @posix_setsid();
    file_put_contents($tmp1, "[组长进程直接调 setsid()] pid={$pid}==pgid={$pgid} → 返回 {$res} (内核拒绝!)");

    // 2. 先 fork 出非组长子进程，再调 posix_setsid() 立刻成功！
    $child = pcntl_fork();
    if ($child === 0) {
        $newSid = posix_setsid();
        file_put_contents($tmp2, "[fork 后子进程再调 setsid()] myPid=" . getmypid() . " → 成功新建无终端会话 SID={$newSid}!");
        exit(0);
    }
    pcntl_waitpid($child, $s2);
    exit(0);
}
pcntl_waitpid($leader, $s1);

$logs = [
    trim((string)file_get_contents($tmp1)),
    trim((string)file_get_contents($tmp2)),
    '[结论] 第 1 次 fork 只为甩掉组长身份，第 2 次 fork 再甩掉会话首领资格！',
];
@unlink($tmp1);
@unlink($tmp2);

$snapshot = ['episode' => 'ep62b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
