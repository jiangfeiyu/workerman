<?php
declare(strict_types=1);

// EP095: ChannelServer + ChannelClient 内部邮局 Pub/Sub 跨进程总线
$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr   = stream_socket_get_name($server, false);

$w1 = stream_socket_client("tcp://{$addr}", $e1, $s1, 2);
$srv1 = stream_socket_accept($server, 2);
$w2 = stream_socket_client("tcp://{$addr}", $e2, $s2, 2);
$srv2 = stream_socket_accept($server, 2);

// 两个孤立进程连上邮局并订阅 'broadcast' 频道
$topics = [];
foreach ([[$w1, $srv1], [$w2, $srv2]] as [$cli, $srvConn]) {
    fwrite($cli, json_encode(['cmd' => 'subscribe', 'channel' => 'broadcast']) . "\n");
    $subReq = json_decode(trim((string)fgets($srvConn)), true);
    $topics[$subReq['channel']][] = $srvConn;
}

// Worker#1 发布广播消息到 ChannelServer
fwrite($w1, json_encode(['cmd' => 'publish', 'channel' => 'broadcast', 'data' => '全服红包来了!']) . "\n");
$pub = json_decode(trim((string)fgets($srv1)), true);
foreach ($topics[$pub['channel']] ?? [] as $sub) {
    fwrite($sub, json_encode(['channel' => $pub['channel'], 'data' => $pub['data']]) . "\n");
}

$got1 = json_decode(trim((string)fgets($w1)), true);
$got2 = json_decode(trim((string)fgets($w2)), true);
fclose($w1); fclose($w2); fclose($srv1); fclose($srv2); fclose($server);

$snapshot = [
    'episode' => 'ep95',
    'output'  => [
        "[ChannelServer] 'broadcast' 频道已登记订阅者=" . count($topics['broadcast']) . ' 个 Worker',
        "[ChannelClient 投递] Worker#1 收到={$got1['data']} | Worker#2 收到={$got2['data']}",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
