<?php
declare(strict_types=1);

// EP058: 多个 Worker 共享父进程创建的同一份 3 号监听 FD
$server = stream_socket_server('tcp://127.0.0.1:0', $errno, $errstr);
$addr   = stream_socket_get_name($server, false);
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

$pids = [];
for ($i = 1; $i <= 2; $i++) {
    $pid = pcntl_fork();
    if ($pid === 0) {
        fclose($r);
        $conn = @stream_socket_accept($server, 2);
        $msg  = $conn ? trim((string)fread($conn, 64)) : 'timeout';
        if ($conn) fclose($conn);
        fwrite($w, "[Worker #{$i} pid=" . getmypid() . "] 共享监听 {$addr} -> 抢到连接: {$msg}\n");
        fclose($w);
        exit(0);
    }
    $pids[] = $pid;
}

fclose($w);
// 模拟两个客户端连入同一个端口，由两个 Worker 抢单
foreach (['Client-A', 'Client-B'] as $name) {
    $c = stream_socket_client("tcp://{$addr}", $e, $s, 2);
    fwrite($c, "{$name}\n");
    fclose($c);
}
foreach ($pids as $pid) {
    pcntl_waitpid($pid, $st);
}
$logs = array_values(array_filter(explode("\n", trim((string)stream_get_contents($r)))));
sort($logs);
fclose($r);
fclose($server);

$snapshot = ['episode' => 'ep58_shared_fd', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
