<?php
declare(strict_types=1);

// EP055: fork 返回两次：一次进父进程拿子 PID，一次进子进程拿 0
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$parentPid = getmypid();

$pid = pcntl_fork();
if ($pid === -1) {
    exit(1);
} elseif ($pid === 0) {
    fclose($r);
    $myPid = getmypid();
    $ppid  = posix_getppid();
    fwrite($w, "[子进程视角] pcntl_fork() 返回=0 | myPid={$myPid} | ppid={$ppid}\n");
    fclose($w);
    exit(0);
}

fclose($w);
pcntl_waitpid($pid, $status);
$childMsg = trim((string)fread($r, 4096));
fclose($r);

$logs = [
    "[父进程视角] pcntl_fork() 返回子PID={$pid} | myPid={$parentPid}",
    $childMsg,
];

$snapshot = ['episode' => 'ep55_fork', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
