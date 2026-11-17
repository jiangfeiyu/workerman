<?php
declare(strict_types=1);

$port = '19001';
$serverCmd = sprintf('PORT=%s %s %s', $port, PHP_BINARY, __DIR__ . '/server.php');
$proc = proc_open($serverCmd, [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
], $pipes);

stream_set_blocking($pipes[1], false);
usleep(250_000);

// 终端2：客人 A 连进来，但不发数据也不断开，故意霸占店员
$clientA = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
usleep(150_000);

// 终端3：客人 B 尝试连进来发消息并等待回音（设 1.2 秒超时）
$t0 = microtime(true);
$clientB = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
fwrite($clientB, "hello from B\n");
stream_set_timeout($clientB, 1, 200_000);
$replyB = fgets($clientB);
$metaB = stream_get_meta_data($clientB);
$waitMs = (int)round((microtime(true) - $t0) * 1000);

// 客人 A 终于说了一句话，把阻塞链条释放
fwrite($clientA, "hi from A\n");
$replyA = fgets($clientA);
usleep(150_000);

// 此时客人 B 才拿到迟到的回复
$replyBAfter = $replyB !== false ? $replyB : fgets($clientB);
usleep(150_000);

$serverLog = stream_get_contents($pipes[1]);
proc_terminate($proc);
proc_close($proc);

$snapshot = [
    'episode' => 'ep01',
    'port' => $port,
    'serverOutput' => array_values(array_filter(explode("\n", trim($serverLog)))),
    'clientA' => [
        'connect' => 'Connected to 127.0.0.1:' . $port,
        'idleAction' => '(连上后发呆 1.2s 不发数据)',
        'send' => 'hi from A',
        'reply' => trim((string)$replyA),
    ],
    'clientB' => [
        'connect' => 'Connected to 127.0.0.1:' . $port,
        'send' => 'hello from B',
        'timedOutWhileAIdle' => $metaB['timed_out'],
        'blockedWaitMs' => $waitMs,
        'delayedReplyAfterAFinished' => trim((string)$replyBAfter),
    ],
];

file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
