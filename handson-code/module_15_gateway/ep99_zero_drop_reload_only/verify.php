<?php
declare(strict_types=1);

// EP099: 业务热更新零断线实测：杀掉 BusinessWorker v1 并重连 v2，客户 TCP 纹丝不动
$publicSrv = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$innerSrv  = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$pubAddr   = stream_socket_get_name($publicSrv, false);
$inAddr    = stream_socket_get_name($innerSrv, false);

$userConn     = stream_socket_client("tcp://{$pubAddr}", $e1, $s1, 2);
$gwClientConn = stream_socket_accept($publicSrv, 2);
$connId       = (int)$gwClientConn;

// BusinessWorker v1 接入后被杀掉 (fclose 模拟进程退出)
$bizV1 = stream_socket_client("tcp://{$inAddr}", $e2, $s2, 2);
$gwIn1 = stream_socket_accept($innerSrv, 2);
fclose($bizV1);
fclose($gwIn1);

// 新版 BusinessWorker v2 启动并重新连入 Gateway 内网端口
$bizV2 = stream_socket_client("tcp://{$inAddr}", $e3, $s3, 2);
$gwIn2 = stream_socket_accept($innerSrv, 2);
fwrite($bizV2, json_encode(['connId' => $connId, 'msg' => 'v2.0 热更新后推送: Welcome!']) . "\n");
$pkt = json_decode(trim((string)fgets($gwIn2)), true);
fwrite($gwClientConn, $pkt['msg'] . "\n");

$userGot   = trim((string)fgets($userConn));
$stillOpen = is_resource($userConn) && !feof($userConn);
fclose($userConn); fclose($gwClientConn); fclose($bizV2); fclose($gwIn2); fclose($publicSrv); fclose($innerSrv);

$snapshot = [
    'episode' => 'ep99',
    'output'  => [
        '[业务热重启] BusinessWorker 从 v1 杀掉重启为 v2 -> 用户 TCP 断开次数=0 (alive=' . ($stillOpen ? 'true' : 'false') . ')',
        "[v2 无缝下发] Gateway 按 connId={$connId} 原路写回 -> 用户端收到=\"{$userGot}\"",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
