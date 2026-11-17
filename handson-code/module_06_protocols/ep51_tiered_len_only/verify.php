<?php
declare(strict_types=1);

require_once __DIR__ . '/../websocket/WebsocketProtocol.php';

// 【独立验证】EP051 三级阶梯长度实测（<=125 / 126+2B / 127+8B）与半包拦截
$f1 = WebsocketProtocol::encode(str_repeat('a', 13));    // 13 <= 125 -> 2 + 13 = 15B
$f2 = WebsocketProtocol::encode(str_repeat('b', 300));   // 300 -> 126 + 2B -> 4 + 300 = 304B
$f3 = WebsocketProtocol::encode(str_repeat('c', 70000)); // 70000 -> 127 + 8B -> 10 + 70000 = 70010B

$logs = [
    '[1档 lenCode=13 (≤125)] input()=' . WebsocketProtocol::input($f1) . 'B (2B头 + 13B)',
    '[2档 lenCode=126 (+2B)] input()=' . WebsocketProtocol::input($f2) . 'B (4B头 + 300B) | 半包3B=>' . WebsocketProtocol::input(substr($f2, 0, 3)),
    '[3档 lenCode=127 (+8B)] input()=' . WebsocketProtocol::input($f3) . 'B (10B头 + 70000B)',
];

$snapshot = ['episode' => 'ep51', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
