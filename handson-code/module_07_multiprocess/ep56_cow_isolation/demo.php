<?php
declare(strict_types=1);

// EP056: 写时复制 (Copy-On-Write) 内存隔离实验
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$counter = 100;

$pid = pcntl_fork();
if ($pid === 0) {
    fclose($r);
    $counter += 50; // 触发 COW：内核给子进程单独拷贝这一页内存
    fwrite($w, "[子进程修改后] \$counter = {$counter} (只改自己的物理内存页)\n");
    fclose($w);
    exit(0);
}

fclose($w);
pcntl_waitpid($pid, $status);
$childLog = trim((string)fread($r, 4096));
fclose($r);

$logs = [
    "[fork 前共享初始值] \$counter = 100",
    $childLog,
    "[父进程同步查看] \$counter = {$counter} (丝毫不受子进程影响，必须靠 IPC 通信!)",
];

$snapshot = ['episode' => 'ep56_cow', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
