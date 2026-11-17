<?php
declare(strict_types=1);

// EP104: BusinessWorker 核心：直连全量 Gateway 集群并实现 Gateway::sendToClient / sendToAll
const CMD_SEND_TO_ONE = 2;
$encodeCid = static fn (string $ip, int $port, int $connId): string => bin2hex(pack('NnN', ip2long($ip), $port, $connId));
$decodeCid = static function (string $cid): array {
    $u = unpack('Nip/nport/NconnId', hex2bin($cid));
    return ['ip' => long2ip($u['ip']), 'port' => $u['port'], 'connId' => $u['connId']];
};
$encodePacket = static fn (int $cmd, string $cid, string $body): string => pack('N', 4 + 21 + strlen($body)) . pack('Ca20', $cmd, $cid) . $body;

$gatewayLinks = [
    '10.0.0.8:2901' => [],
    '10.0.0.9:2901' => [],
];

// 1. sendToClient($cid, $msg)：从 20 位 cid 解出目标 Gateway IP:Port，直投对应专线
$targetCid = $encodeCid('10.0.0.9', 2901, 15);
$meta      = $decodeCid($targetCid);
$lanAddr   = "{$meta['ip']}:{$meta['port']}";
$gatewayLinks[$lanAddr][] = $encodePacket(CMD_SEND_TO_ONE, $targetCid, 'DM to conn#15');

// 2. sendToAll($msg)：遍历全量 Gateway 专线群发
$allCount = 0;
foreach ($gatewayLinks as $addr => &$queue) {
    $queue[] = 'BROADCAST: 系统公告';
    $allCount++;
}
unset($queue);

$snapshot = [
    'episode' => 'ep104',
    'output'  => [
        "[sendToClient 定向专线] 解析 cid={$targetCid} -> 精准命中专线 {$lanAddr} 队列(+1帧)",
        "[sendToAll 全集群群发] 已沿 {$allCount} 条 Gateway 专线同步下发广播",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
