<?php
declare(strict_types=1);

// 【独立验证】EP086 单连接多协程共用导致的张冠李戴串台灾难（不剧透 EP087 连接池）
$sharedQueue = [];
$gotB = null;

$fA = new Fiber(function () use (&$sharedQueue): string {
    $sharedQueue[] = 'RES_FOR_A'; // 协程 A 发出请求并让出
    return Fiber::suspend();
});

$fB = new Fiber(function () use (&$sharedQueue, &$gotB): void {
    // 协程 B 趁虚而入读取同一条共享连接，直接错拿了队列头属于 A 的回复！
    $gotB = array_shift($sharedQueue);
});

$fA->start();
$fB->start();

$logs = [
    '[Fiber A] 向共享连接发出请求 keyA，随即 suspend() 等回复',
    "[Fiber B 串台灾难] 读同一条共享连接错拿成 Fiber A 的响应: {$gotB} (线上数据大乱套!)",
];

$snapshot = ['episode' => 'ep86', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
