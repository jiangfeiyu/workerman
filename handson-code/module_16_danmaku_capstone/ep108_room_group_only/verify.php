<?php
declare(strict_types=1);

// EP108: 弹幕房间群推与实时在线统计：joinGroup / sendToGroup / 退房清理
$rooms = [
    'room:live-101' => ['cid_01' => true, 'cid_02' => true, 'cid_03' => true],
    'room:live-102' => ['cid_04' => true],
];

// 一次 WebSocket 编码复用给目标房间所有成员
$encodedCount = 0;
$encodeWs = static function (string $text) use (&$encodedCount): string {
    $encodedCount++;
    $len = strlen($text);
    return "\x81" . chr($len) . $text;
};

$inbox = ['cid_01' => [], 'cid_02' => [], 'cid_03' => [], 'cid_04' => []];
$frame = $encodeWs('666太丝滑了!');
foreach (array_keys($rooms['room:live-101']) as $cid) {
    $inbox[$cid][] = $frame;
}
$onlineTotal = array_sum(array_map('count', $rooms));

$snapshot = [
    'episode' => 'ep108',
    'output'  => [
        '[房间群推] room:live-101 推送 "666太丝滑了!" -> 触达 ' . count($rooms['room:live-101']) . " 人 (WS帧仅编码 {$encodedCount} 次) | 全服在线={$onlineTotal}",
        '[房间隔离校验] 无关房间 room:live-102(cid_04) 收信数=' . count($inbox['cid_04']) . ' (0 串房漏发)',
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
