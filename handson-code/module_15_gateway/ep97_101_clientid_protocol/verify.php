<?php
declare(strict_types=1);

// EP097-101: client_id 全局无冲突编解码 + GatewayProtocol 二进制协议
class GatewayProtocol
{
    public const int CMD_ON_MESSAGE    = 1;
    public const int CMD_SEND_TO_ONE   = 2;

    public static function encodeClientId(string $ip, int $port, int $connId): string
    {
        return bin2hex(pack('NnN', ip2long($ip), $port, $connId));
    }

    public static function decodeClientId(string $cid): array
    {
        $u = unpack('Nip/nport/NconnId', hex2bin($cid));
        return ['ip' => long2ip($u['ip']), 'port' => $u['port'], 'connId' => $u['connId']];
    }

    public static function encodePacket(int $cmd, string $cid, string $body): string
    {
        $payload = pack('Ca20', $cmd, $cid) . $body;
        return pack('N', 4 + strlen($payload)) . $payload;
    }

    public static function decodePacket(string $pkg): array
    {
        $meta = unpack('NtotalLen/Ccmd/a20cid', $pkg);
        return [
            'cmd'  => $meta['cmd'],
            'cid'  => $meta['cid'],
            'body' => substr($pkg, 25),
        ];
    }
}

$cid = GatewayProtocol::encodeClientId('10.0.0.8', 8282, 42);
$decodedCid = GatewayProtocol::decodeClientId($cid);
$pkt = GatewayProtocol::encodePacket(GatewayProtocol::CMD_SEND_TO_ONE, $cid, 'Hello Gateway!');
$unpacked = GatewayProtocol::decodePacket($pkt);

$logs = [
    "[EP100 · 全局 client_id 编码] (10.0.0.8, 8282, conn=42) => {$cid} (20字符全球唯一!)",
    "[EP100 · 逆向秒级定位] decodeClientId => {$decodedCid['ip']}:{$decodedCid['port']} fd#{$decodedCid['connId']}",
    "[EP101 · GatewayProtocol 封包] totalBytes=" . strlen($pkt) . "B | cmd={$unpacked['cmd']} | body=\"{$unpacked['body']}\"",
];

$snapshot = ['episode' => 'ep97_101_gwproto', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
