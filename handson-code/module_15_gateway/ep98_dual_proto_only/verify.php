<?php
declare(strict_types=1);

// EP098: 硬编码双进程极简网关原型（仅用基础 connId + 文本 JSON 转发，不提前剧透 GatewayProtocol）
$publicSrv = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$innerSrv  = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$pubAddr   = stream_socket_get_name($publicSrv, false);
$inAddr    = stream_socket_get_name($innerSrv, false);

// 1. 客户连上公网 8282（模拟），后端 BusinessWorker 主动连入内网 2901（模拟）
$client   = stream_socket_client("tcp://{$pubAddr}", $e1, $s1, 2);
$gwClient = stream_socket_accept($publicSrv, 2);
$biz      = stream_socket_client("tcp://{$inAddr}", $e2, $s2, 2);
$gwInner  = stream_socket_accept($innerSrv, 2);

$connId = (int)$gwClient;
$publicMap[$connId] = $gwClient;

// 2. 客户发消息 -> Gateway 打上 connId 转发内网 -> BusinessWorker 回包 -> Gateway 按 FD 写回公网
fwrite($client, "Hi Gateway!\n");
$userMsg = trim((string)fgets($gwClient));
fwrite($gwInner, json_encode(['connId' => $connId, 'msg' => $userMsg]) . "\n");

$inReq = json_decode(trim((string)fgets($biz)), true);
fwrite($biz, json_encode(['connId' => $inReq['connId'], 'reply' => 'Echo:' . $inReq['msg']]) . "\n");

$inRes = json_decode(trim((string)fgets($gwInner)), true);
fwrite($publicMap[$inRes['connId']], $inRes['reply'] . "\n");
$clientGot = trim((string)fgets($client));

fclose($client); fclose($gwClient); fclose($biz); fclose($gwInner); fclose($publicSrv); fclose($innerSrv);

$snapshot = [
    'episode' => 'ep98',
    'output'  => [
        "[Gateway 双端转发] 公网收=\"{$userMsg}\" -> 附带 connId={$connId} 转交内网 BusinessWorker",
        "[原路写出公网] 收到内网回包并写回 client -> 用户收到=\"{$clientGot}\"",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
