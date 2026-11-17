<?php
declare(strict_types=1);

// EP101: GatewayProtocol 内部二进制协议 (4B总长 + 1B cmd + 20B client_id + Body)
const CMD_SEND_TO_ONE = 2;

function encodePacket(int $cmd, string $cid, string $body): string
{
    $payload = pack('Ca20', $cmd, $cid) . $body;
    return pack('N', 4 + strlen($payload)) . $payload;
}

function decodePacket(string $pkg): array
{
    $meta = unpack('NtotalLen/Ccmd/a20cid', $pkg);
    return [
        'totalLen' => $meta['totalLen'],
        'cmd'      => $meta['cmd'],
        'cid'      => $meta['cid'],
        'body'     => substr($pkg, 25),
    ];
}

$cid = '0a000008205a0000002a';
$pkt = encodePacket(CMD_SEND_TO_ONE, $cid, 'Hello Gateway!');
$res = decodePacket($pkt);

$snapshot = [
    'episode' => 'ep101',
    'output'  => [
        '[二进制封包] header=25B (4B len + 1B cmd + 20B cid) | totalBytes=' . strlen($pkt) . 'B',
        "[二进制解包] cmd={$res['cmd']} | cid={$res['cid']} | body=\"{$res['body']}\"",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
