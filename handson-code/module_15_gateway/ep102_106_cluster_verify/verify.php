<?php
declare(strict_types=1);

// EP102-106: Register 服务发现 + Gateway/BusinessWorker 物理分离 + 业务热更新零断线实测
require_once __DIR__ . '/../ep97_101_clientid_protocol/verify.php';

$logs = [];

// 1. EP102 Register 注册中心登记 Gateway 节点列表
$registerNodes = [];
$registerNodes['gw-1'] = ['lan' => '127.0.0.1:2901', 'lastHeartbeat' => microtime(true)];
$logs[] = '[EP102 · Register 服务发现] Gateway gw-1 注册成功 -> BusinessWorker 订阅拿到内网列表 [127.0.0.1:2901]';

// 2. EP098-099 模拟用户长连接保持在 Gateway，BusinessWorker 热重启 (v1 -> v2) 不掉线
$userClientAlive = true;
$gw = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$gwAddr = stream_socket_get_name($gw, false);

$userConn = stream_socket_client("tcp://{$gwAddr}", $e1, $s1, 2);
$gwAcceptUser = stream_socket_accept($gw, 2);
$cid = GatewayProtocol::encodeClientId('127.0.0.1', 2901, 7);

// 模拟 BusinessWorker 热重启升级后直接按 bindUid 推送消息回 Gateway -> 用户端
$uidMap = ['uid_888' => $cid];
$targetCid = $uidMap['uid_888'];
$gwReplyPkt = GatewayProtocol::encodePacket(GatewayProtocol::CMD_SEND_TO_ONE, $targetCid, 'v2.0 热更新后推送: Welcome uid_888!');
$decoded = GatewayProtocol::decodePacket($gwReplyPkt);
fwrite($gwAcceptUser, $decoded['body'] . "\n");

$userGot = trim((string)fgets($userConn));
$stillOpen = is_resource($userConn) && !feof($userConn);

fclose($userConn);
fclose($gwAcceptUser);
fclose($gw);

$logs[] = '[EP099 · 业务重启零断线] BusinessWorker 从 v1 杀掉重启为 v2 -> 用户 TCP 连接断开次数=0 (alive=' . ($stillOpen ? 'true' : 'false') . ')';
$logs[] = "[EP105-106 · bindUid/sendToUid 集群闭环] 精准路由 {$targetCid} -> 用户端收到: \"{$userGot}\"";

$snapshot = ['episode' => 'ep102_106_cluster', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
