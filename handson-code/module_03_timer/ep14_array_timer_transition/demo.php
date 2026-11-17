<?php
declare(strict_types=1);

// 【过渡】不急着嵌入 SelectLoop，先用 10 行数组版闹钟搞懂超时公式：
// 下次睡眠时间 = max(0, 最早闹钟到期时间 - 当前时间)
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$now = microtime(true);

$timers = [
    ['at' => $now + 0.15, 'msg' => '闹钟 A (150ms)'],
    ['at' => $now + 0.05, 'msg' => '闹钟 B (50ms)'],
];

while ($timers !== []) {
    $nextAt = min(array_column($timers, 'at'));
    $waitSec = max(0.0, $nextAt - microtime(true));
    $sec = (int)$waitSec;
    $usec = (int)(($waitSec - $sec) * 1_000_000);

    $read = [$r];
    $write = $except = null;
    @stream_select($read, $write, $except, $sec, $usec);

    $cur = microtime(true);
    foreach ($timers as $k => $t) {
        if ($cur >= $t['at']) {
            echo sprintf("[到点触发 +%dms] %s\n", (int)round(($cur - $now) * 1000), $t['msg']);
            unset($timers[$k]);
        }
    }
}
