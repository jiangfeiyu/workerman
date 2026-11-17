<?php
declare(strict_types=1);

$port = '19019';
$proc = proc_open(sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
usleep(250_000);

$c = stream_socket_client("tcp://127.0.0.1:{$port}", $e, $s, 2);
$welcome = fgets($c);
fwrite($c, "ping hooks\n");
$reply = fgets($c);
fclose($c);
usleep(120_000);

$out = stream_get_contents($pipes[1]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep19',
    'serverOutput' => array_values(array_filter(explode("\n", trim($out)))),
    'welcome' => trim((string)$welcome),
    'reply' => trim((string)$reply),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
