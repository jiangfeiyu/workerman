<?php
declare(strict_types=1);

$port = '19017';
$proc = proc_open(sprintf('PORT=%s IDLE_TIMEOUT=0.35 %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
usleep(200_000);

$cIdle = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
$cActive = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);

usleep(180_000);
fwrite($cActive, "ping\n");
$activeReply = fgets($cActive);

usleep(300_000); // 此时发呆连接已超过 0.35s，活跃连接刚续过命！
$idleMsg = fgets($cIdle);
fclose($cActive);
@fclose($cIdle);
usleep(150_000);

$log = stream_get_contents($pipes[1]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep17',
    'port' => $port,
    'serverOutput' => array_values(array_filter(explode("\n", trim($log)))),
    'activeReply' => trim((string)$activeReply),
    'idleKickedMsg' => trim((string)$idleMsg),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
