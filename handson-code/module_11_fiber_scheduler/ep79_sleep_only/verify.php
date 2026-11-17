<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】EP079 直接复用第 1 篇 SelectLoop::delay() 实现非阻塞 Coroutine::sleep()!
$loop = new SelectLoopWithRepeat();
$t0 = microtime(true);
$logs = [];

$coSleep = function (float $seconds) use ($loop): void {
    $fiber = Fiber::getCurrent();
    $loop->delay($seconds, static fn () => $fiber->resume());
    Fiber::suspend();
};

(new Fiber(function () use ($coSleep, $t0, &$logs): void {
    $coSleep(0.06);
    $logs[] = sprintf('[Req#1 睡眠 60ms 醒来] +%dms (未阻塞 Req#2!)', (int)round((microtime(true) - $t0) * 1000));
}))->start();

(new Fiber(function () use ($coSleep, $t0, &$logs): void {
    $coSleep(0.02);
    $logs[] = sprintf('[Req#2 睡眠 20ms 先醒来] +%dms (并发插队完成!)', (int)round((microtime(true) - $t0) * 1000));
}))->start();

$loop->run();
$totalMs = round((microtime(true) - $t0) * 1000, 1);
$logs[] = "[并发调度总结] 两个协程共耗时 = {$totalMs}ms (复用第 1 篇 delay() 并发叠加!)";

$snapshot = ['episode' => 'ep79', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
