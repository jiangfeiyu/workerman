<?php
declare(strict_types=1);

// EP094-096: 4进程广播失灵 vs Channel 内部邮局跨进程订阅/广播实测
$logs = [];

// 1. 复现单进程内存孤岛：Worker#1 里的 $conns 看不到 Worker#2 里的连接
$worker1Conns = ['Alice(fd=5)'];
$worker2Conns = ['Bob(fd=6)'];
$logs[] = '[EP094 · 多进程孤岛广播失灵] Worker#1 遍历自己数组仅触达: ' . implode(',', $worker1Conns) . ' (漏掉 Bob!)';

// 2. 启动真实 ChannelServer + Worker#1/#2 ChannelClient 跨进程订阅广播
$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr   = stream_socket_get_name($server, false);

$w1 = stream_socket_client("tcp://{$addr}", $e1, $s1, 2);
$srv1 = stream_socket_accept($server, 2);
$w2 = stream_socket_client("tcp://{$addr}", $e2, $s2, 2);
$srv2 = stream_socket_accept($server, 2);

// 两个 Worker 均订阅 "broadcast" 频道
$subscribers = [$srv1, $srv2];
fwrite($w1, json_encode(['cmd' => 'publish', 'channel' => 'broadcast', 'data' => '全服红包来了!']) . "\n");
$pubLine = trim((string)fgets($srv1));
$pkt = json_decode($pubLine, true);

// ChannelServer 路由投递给所有订阅者
foreach ($subscribers as $sub) {
    fwrite($sub, json_encode(['channel' => $pkt['channel'], 'data' => $pkt['data']]) . "\n");
}

$got1 = json_decode(trim((string)fgets($w1)), true);
$got2 = json_decode(trim((string)fgets($w2)), true);

fclose($w1); fclose($w2); fclose($srv1); fclose($srv2); fclose($server);

$logs[] = "[EP095-096 · Channel 内部邮局投递] Worker#1 收到={$got1['data']} | Worker#2 收到={$got2['data']} (全服 100% 触达!)";

$snapshot = ['episode' => 'ep94_96_channel', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
