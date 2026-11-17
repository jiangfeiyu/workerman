<?php
declare(strict_types=1);

// EP107: 实时弹幕系统骨架：WSS WebSocket + Gateway + match 路由分发
$events = [];
$rooms  = [];

$onMessage = static function (string $cid, string $rawJson) use (&$rooms, &$events): void {
    $pkt = json_decode($rawJson, true);
    match ($pkt['type'] ?? '') {
        'join'    => $rooms[$pkt['room']][$cid] = true,
        'danmaku' => $events[] = "broadcast[{$pkt['room']}] => {$pkt['text']}",
        'ping'    => $events[] = "sendToClient({$cid}) => {\"type\":\"pong\"}",
        default   => $events[] = 'ignored',
    };
};

$onMessage('cid_01', '{"type":"join","room":"room:live-101"}');
$onMessage('cid_01', '{"type":"danmaku","room":"room:live-101","text":"666太丝滑了!"}');
$onMessage('cid_01', '{"type":"ping"}');

$snapshot = [
    'episode' => 'ep107',
    'output'  => [
        '[match 路由分发] join -> room:live-101 成员数=' . count($rooms['room:live-101']) . ' | ping => {"type":"pong"}',
        '[弹幕上行就绪] ' . $events[0],
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
