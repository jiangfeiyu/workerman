<?php
declare(strict_types=1);

// EP096: 模块 6.1 合拢——打破单进程孤岛，全服 100% 精准跨进程广播
$worker1Local = ['Alice(fd=5)'];
$worker2Local = ['Bob(fd=6)'];

$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr   = stream_socket_get_name($server, false);
$w1 = stream_socket_client("tcp://{$addr}", $e1, $s1, 2);
$srv1 = stream_socket_accept($server, 2);
$w2 = stream_socket_client("tcp://{$addr}", $e2, $s2, 2);
$srv2 = stream_socket_accept($server, 2);

$subscribers = [$srv1, $srv2];
fwrite($w1, json_encode(['cmd' => 'publish', 'channel' => 'broadcast', 'data' => '全服红包来了!']) . "\n");
$pkt = json_decode(trim((string)fgets($srv1)), true);
foreach ($subscribers as $sub) {
    fwrite($sub, json_encode(['channel' => $pkt['channel'], 'data' => $pkt['data']]) . "\n");
}
$got1 = json_decode(trim((string)fgets($w1)), true);
$got2 = json_decode(trim((string)fgets($w2)), true);
fclose($w1); fclose($w2); fclose($srv1); fclose($srv2); fclose($server);

$snapshot = [
    'episode' => 'ep96',
    'output'  => [
        '[Before 本地孤岛] Worker#1 仅触达: ' . implode(',', $worker1Local) . ' (漏掉 ' . implode(',', $worker2Local) . ')',
        "[After Channel 邮局] Worker#1 收到={$got1['data']} | Worker#2 收到={$got2['data']} (全服 100% 触达!)",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
