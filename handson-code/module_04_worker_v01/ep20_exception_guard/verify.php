<?php
declare(strict_types=1);

$port = '19020';
$proc = proc_open(sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
stream_set_blocking($pipes[2], false);
usleep(250_000);

$c1 = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
fwrite($c1, "boom\n");
usleep(120_000);

// 关键验证：上一条消息触发异常后，Worker 进程依然健在，下一个请求照样秒回！
$c2 = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
fwrite($c2, "still alive?\n");
$reply2 = fgets($c2);

fclose($c1);
fclose($c2);
usleep(120_000);

$stdout = stream_get_contents($pipes[1]);
$stderr = stream_get_contents($pipes[2]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep20',
    'stdout' => array_values(array_filter(explode("\n", trim($stdout)))),
    'stderr' => array_values(array_filter(explode("\n", trim($stderr)))),
    'secondClientReply' => trim((string)$reply2),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
