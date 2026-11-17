<?php
declare(strict_types=1);

// EP105: 会话持久化与 Gateway::bindUid / sendToUid (由 Gateway 集群托管 uid -> cid 映射，支持多端在线)
$encodeCid = static fn (string $ip, int $port, int $connId): string => bin2hex(pack('NnN', ip2long($ip), $port, $connId));

// 两台 Gateway 各自维护本机在线用户的 uid => cid[] 索引表
$gateways = [
    'gw-1(10.0.0.8:2901)' => ['uidMap' => []],
    'gw-2(10.0.0.9:2901)' => ['uidMap' => []],
];

$cidPhone = $encodeCid('10.0.0.8', 2901, 7);
$cidPc    = $encodeCid('10.0.0.9', 2901, 12);

// bindUid 指令精准发送到所属 Gateway 登记
$gateways['gw-1(10.0.0.8:2901)']['uidMap']['uid_888'][] = $cidPhone;
$gateways['gw-2(10.0.0.9:2901)']['uidMap']['uid_888'][] = $cidPc;

// sendToUid('uid_888', $msg)：下发 CMD_SEND_TO_UID，各 Gateway 查找本机映射并推送
$delivered = [];
foreach ($gateways as $gwName => $state) {
    foreach ($state['uidMap']['uid_888'] ?? [] as $cid) {
        $delivered[] = "{$gwName}=>{$cid}";
    }
}

$snapshot = [
    'episode' => 'ep105',
    'output'  => [
        "[bindUid 跨网关绑定] uid_888 已分别登记手机({$cidPhone}) + PC({$cidPc})",
        '[sendToUid 多端同达] 共精准触达 ' . count($delivered) . ' 台设备: ' . implode(' | ', $delivered),
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
