<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep15_select_loop_delay_del/SelectLoop.php';

// 【加餐过渡】先不用 repeat()，用普通函数 + delay() 手动“响完再订下一单”
$loop = new SelectLoop();
$t0 = microtime(true);
$ticks = 0;

function heartbeat(SelectLoop $loop, float $t0, int &$ticks): void
{
    $ticks++;
    $ms = (int)round((microtime(true) - $t0) * 1000);
    echo "[第{$ticks}次] +{$ms}ms 滴答！\n";

    if ($ticks < 3) {
        // 本次执行完，顺手往堆里订下一次 60ms 的闹钟，然后立刻 return 清空调用栈！
        $loop->delay(0.06, function () use ($loop, $t0, &$ticks): void {
            heartbeat($loop, $t0, $ticks);
        });
    } else {
        echo "[结束] 满 3 次，不再续订！\n";
    }
}

$loop->delay(0.06, function () use ($loop, $t0, &$ticks): void {
    heartbeat($loop, $t0, $ticks);
});

$loop->run();
