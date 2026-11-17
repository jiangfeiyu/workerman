<?php
declare(strict_types=1);

$port = '19005';
$proc = proc_open(sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php'), [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);
stream_set_blocking($pipes[1], false);
usleep(250_000);

// 客人 A 连上不说话，客人 B 连上后秒发两条消息并立刻拿到回复！
$cA = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
$cB = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
usleep(100_000);

fwrite($cB, "B says 1\n");
$replyB1 = fgets($cB);
fwrite($cA, "A finally speaks\n");
$replyA = fgets($cA);
fwrite($cB, "B says 2\n");
$replyB2 = fgets($cB);

fclose($cA);
fclose($cB);
usleep(150_000);

$log = stream_get_contents($pipes[1]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep05',
    'port' => $port,
    'serverOutput' => array_values(array_filter(explode("\n", trim($log)))),
    'clientBReplies' => [trim((string)$replyB1), trim((string)$replyB2)],
    'clientAReply' => trim((string)$replyA),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
