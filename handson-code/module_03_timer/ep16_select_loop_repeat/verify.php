<?php
declare(strict_types=1);

require_once __DIR__ . '/SelectLoopWithRepeat.php';

$loop = new SelectLoopWithRepeat();
$t0 = microtime(true);
$ticks = 0;
$logs = [];

$repeatId = 0;
$repeatId = $loop->repeat(0.06, function () use ($loop, &$ticks, &$repeatId, $t0, &$logs): void {
    $ticks++;
    $logs[] = sprintf('[repeat 第%d次] +%dms', $ticks, (int)round((microtime(true) - $t0) * 1000));
    if ($ticks >= 3) {
        $loop->cancelRepeat($repeatId);
        $logs[] = '[cancelRepeat] 达到 3 次，停止续订！';
    }
});

$loop->run();

$snapshot = ['episode' => 'ep16', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
