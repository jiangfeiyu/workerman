<?php
declare(strict_types=1);

// EP100: 全局唯一 client_id 编解码 (IP + Port + ConnId = 20 位 HEX)
function encodeClientId(string $ip, int $port, int $connId): string
{
    return bin2hex(pack('NnN', ip2long($ip), $port, $connId));
}

function decodeClientId(string $cid): array
{
    $u = unpack('Nip/nport/NconnId', hex2bin($cid));
    return ['ip' => long2ip($u['ip']), 'port' => $u['port'], 'connId' => $u['connId']];
}

$cid = encodeClientId('10.0.0.8', 8282, 42);
$dec = decodeClientId($cid);

$snapshot = [
    'episode' => 'ep100',
    'output'  => [
        "[全局 client_id 编码] (10.0.0.8, 8282, conn=42) => {$cid} (" . strlen($cid) . '字符全球唯一!)',
        "[O(1) 逆向秒级定位] decodeClientId => {$dec['ip']}:{$dec['port']} fd#{$dec['connId']}",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
