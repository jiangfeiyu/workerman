<?php
declare(strict_types=1);

// EP079-080: 协程调度器 + Coroutine::sleep() 非阻塞并发验证
class Coroutine
{
    /** @var array<int, array{wakeAt: float, fiber: Fiber}> */
    private static array $sleepers = [];

    public static function spawn(callable $fn): void
    {
        $f = new Fiber($fn);
        $f->start();
    }

    public static function sleep(float $seconds): void
    {
        $fiber = Fiber::getCurrent();
        if (!$fiber) {
            usleep((int)($seconds * 1_000_000));
            return;
        }
        self::$sleepers[] = ['wakeAt' => microtime(true) + $seconds, 'fiber' => $fiber];
        Fiber::suspend();
    }

    public static function run(): void
    {
        while (count(self::$sleepers) > 0) {
            $now = microtime(true);
            foreach (self::$sleepers as $idx => $item) {
                if ($now >= $item['wakeAt']) {
                    unset(self::$sleepers[$idx]);
                    $item['fiber']->resume();
                }
            }
            usleep(2_000);
        }
    }
}

$logs = [];
$t0 = hrtime(true);

Coroutine::spawn(function () use (&$logs): void {
    Coroutine::sleep(0.06);
    $logs[] = '[Req#1 睡眠 60ms 醒来] 未阻塞 Req#2!';
});

Coroutine::spawn(function () use (&$logs): void {
    Coroutine::sleep(0.02);
    $logs[] = '[Req#2 睡眠 20ms 先醒来] 并发插队完成!';
});

Coroutine::run();
$totalMs = round((hrtime(true) - $t0) / 1e6, 1);
$logs[] = "[并发调度总结] 两个协程共耗时 = {$totalMs}ms (并行叠加 ~60ms，绝非串行 80ms!)";

$snapshot = ['episode' => 'ep79_80_sleep', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
