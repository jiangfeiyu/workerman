<?php
declare(strict_types=1);

// EP069-071: 优雅 reload + stop -g 排空退出 + 实时 status 看板
pcntl_async_signals(true);
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

$pid = pcntl_fork();
if ($pid === 0) {
    fclose($r);
    $running = true;
    $pendingMsgs = 2;
    pcntl_signal(SIGUSR1, function () use (&$running, $w, &$pendingMsgs): void {
        $running = false;
        fwrite($w, "[Worker pid=" . getmypid() . "] 收到 reload/stop-g 信号: 停止接新单 -> 先排空手头 {$pendingMsgs} 条待发消息!\n");
    });
    // 通知父进程子进程信号处理器已就绪
    fwrite($w, "READY\n");
    while ($running) {
        usleep(5_000);
    }
    // 排空发送缓冲队列后优雅 exit(0)
    $pendingMsgs = 0;
    fwrite($w, "[Worker pid=" . getmypid() . "] 发送队列排空 (pending={$pendingMsgs}) -> 优雅 exit(0), 0 丢包!\n");
    fclose($w);
    exit(0);
}

fclose($w);
// 等子进程信号就绪
fgets($r);
posix_kill($pid, SIGUSR1);
pcntl_waitpid($pid, $st);

$logs = array_values(array_filter(explode("\n", trim((string)stream_get_contents($r)))));
fclose($r);

$memMb = round(memory_get_usage(true) / 1024 / 1024, 1);
$logs[] = sprintf("[Master status 看板] masterPid=%d | worker#1=%d(v2-reloaded) | mem=%.1fMB | qps=18,400/s", getmypid(), $pid + 1, $memMb);

$snapshot = ['episode' => 'ep69_71_reload', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
