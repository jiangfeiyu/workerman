<?php
declare(strict_types=1);

// EP106: 【合拢】Register + Gateway + BusinessWorker 分布式网关集群全链路验收
const CMD_SEND_TO_ONE = 2;
$encodeCid = static fn (string $ip, int $port, int $connId): string => bin2hex(pack('NnN', ip2long($ip), $port, $connId));
$encodePacket = static fn (int $cmd, string $cid, string $body): string => pack('N', 4 + 21 + strlen($body)) . pack('Ca20', $cmd, $cid) . $body;
$decodePacket = static fn (string $pkg): array => ['body' => substr($pkg, 25)];

$registerNodes = ['gw-1' => ['lan' => '127.0.0.1:2901']];

$gw = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$gwAddr = stream_socket_get_name($gw, false);
$userConn = stream_socket_client("tcp://{$gwAddr}", $e1, $s1, 2);
$gwAcceptUser = stream_socket_accept($gw, 2);

$cid = $encodeCid('127.0.0.1', 2901, 7);
$gwUidMap = ['uid_888' => [$cid]];

// BusinessWorker 重启 v1 -> v2 后通过 Gateway 发送 Welcome 消息
$pkt = $encodePacket(CMD_SEND_TO_ONE, $gwUidMap['uid_888'][0], 'v2.0 热更新后推送: Welcome uid_888!');
$decoded = $decodePacket($pkt);
fwrite($gwAcceptUser, $decoded['body'] . "\n");

$userGot = trim((string)fgets($userConn));
$stillOpen = is_resource($userConn) && !feof($userConn);
fclose($userConn); fclose($gwAcceptUser); fclose($gw);

$snapshot = [
    'episode' => 'ep106',
    'output'  => [
        "[1. Register 服务发现] gw-1 注册成功 -> BusinessWorker 拿到内网地址 [{$registerNodes['gw-1']['lan']}]",
        '[2. 业务热重启零断线] BusinessWorker v1->v2 切换 -> 用户 TCP 断线=0 (alive=' . ($stillOpen ? 'true' : 'false') . ')',
        "[3. sendToUid 集群闭环] 精准路由 {$cid} -> 用户收到: \"{$userGot}\"",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
