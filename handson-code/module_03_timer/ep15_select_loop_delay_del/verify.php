<?php
declare(strict_types=1);

require_once __DIR__ . '/SelectLoop.php';

$loop = new SelectLoop();
$t0 = microtime(true);
$logs = [];

$idCancel = $loop->delay(0.08, function () use (&$logs): void {
    $logs[] = '[不该出现] 被取消的定时器居然触发了!';
});
$loop->delTimer($idCancel);
$logs[] = "[注册并立即取消] timer#{$idCancel}";

$loop->delay(0.15, function () use ($t0, &$logs): void {
    $logs[] = sprintf('[delay 150ms 触发] 耗时=%dms', (int)round((microtime(true) - $t0) * 1000));
});
$loop->delay(0.05, function () use ($t0, &$logs): void {
    $logs[] = sprintf('[delay 50ms 触发] 耗时=%dms', (int)round((microtime(true) - $t0) * 1000));
});

$loop->run();

$snapshot = ['episode' => 'ep15', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
