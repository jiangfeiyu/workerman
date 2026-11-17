<?php
declare(strict_types=1);

// EP103: Gateway 接入层核心：取模路由给 BusinessWorker & 按 connId O(1) 原路回递
const CMD_SEND_TO_ONE = 2;
$encodeCid = static fn (string $ip, int $port, int $connId): string => bin2hex(pack('NnN', ip2long($ip), $port, $connId));
$decodeCid = static function (string $cid): array {
    $u = unpack('Nip/nport/NconnId', hex2bin($cid));
    return ['ip' => long2ip($u['ip']), 'port' => $u['port'], 'connId' => $u['connId']];
};
$encodePacket = static fn (int $cmd, string $cid, string $body): string => pack('N', 4 + 21 + strlen($body)) . pack('Ca20', $cmd, $cid) . $body;
$decodePacket = static function (string $pkg): array {
    $meta = unpack('NtotalLen/Ccmd/a20cid', $pkg);
    return ['totalLen' => $meta['totalLen'], 'cmd' => $meta['cmd'], 'cid' => $meta['cid'], 'body' => substr($pkg, 25)];
};

$clientConns = [7 => 'UserConn#7(alice)', 8 => 'UserConn#8(bob)'];
$workerNames = ['BizWorker#0', 'BizWorker#1', 'BizWorker#2', 'BizWorker#3'];

// 1. 上行：按 connId % count($workerNames) 取模选中固定业务进程
$connId = 7;
$pickedWorker = $workerNames[$connId % count($workerNames)];
$cid = $encodeCid('127.0.0.1', 2901, $connId);

// 2. 下行：收到 BusinessWorker 发来的 GatewayProtocol 包 -> decodeClientId -> O(1) 回写
$downPkt = $encodePacket(CMD_SEND_TO_ONE, $cid, 'Hello Alice!');
$parsed  = $decodePacket($downPkt);
$meta    = $decodeCid($parsed['cid']);
$target  = $clientConns[$meta['connId']] ?? 'NOT_FOUND';

$snapshot = [
    'episode' => 'ep103',
    'output'  => [
        "[Gateway 上行散列] connId={$connId} % 4 => 固定转发至 {$pickedWorker}",
        "[Gateway O(1) 原路回递] 拆出 connId={$meta['connId']} -> 命中 {$target} 写出: \"{$parsed['body']}\"",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
