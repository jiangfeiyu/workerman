<?php
declare(strict_types=1);

$port = '19002';
$proc = proc_open(sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
usleep(600_000);

$c1 = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
$c2 = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
fwrite($c2, "msg from B\n");
usleep(100_000);
$reply2 = fgets($c2);
fwrite($c1, "msg from A\n");
$reply1 = fgets($c1);
usleep(550_000);

$log = stream_get_contents($pipes[1]);
fclose($c1);
fclose($c2);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep02',
    'port' => $port,
    'serverOutput' => array_values(array_filter(explode("\n", trim($log)))),
    'clientBReplyWhileAIdle' => trim((string)$reply2),
    'clientAReply' => trim((string)$reply1),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
