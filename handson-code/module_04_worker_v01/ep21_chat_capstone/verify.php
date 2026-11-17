<?php
declare(strict_types=1);

$port = '19021';
$proc = proc_open(sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
usleep(250_000);

$alice = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
$bob = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
usleep(100_000);

fwrite($alice, "Hello Bob!\n");
$bobGot = fgets($bob);

fwrite($bob, "Hi Alice!\n");
$aliceGot = fgets($alice);

fclose($alice);
fclose($bob);
usleep(120_000);

$stdout = stream_get_contents($pipes[1]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep21',
    'serverOutput' => array_values(array_filter(explode("\n", trim($stdout)))),
    'bobReceived' => trim((string)$bobGot),
    'aliceReceived' => trim((string)$aliceGot),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
