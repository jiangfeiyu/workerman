<?php
declare(strict_types=1);

// 【加餐过渡】onBufferFull 自己不会刹车！看懂“上游推流泵 + 慢速消费端”背压联动
$maxWatermark = 512 * 1024; // 512 KB 安全线
$buffer = 0;
$paused = false;
$logs = [];

// 模拟：上游每次想推 256KB，慢客户端每次只能消化 64KB
for ($tick = 1; $tick <= 5; $tick++) {
    if (!$paused) {
        $buffer += 256 * 1024;
        if ($buffer >= $maxWatermark) {
            $paused = true; // 收到 onBufferFull 信号 -> 上游踩刹车！
            $logs[] = sprintf('[第%d轮] 水位达 %dKB >= 512KB → 触发 onBufferFull，上游踩刹车 ($paused=true)', $tick, $buffer / 1024);
        } else {
            $logs[] = sprintf('[第%d轮] 上游推流 +256KB → 当前水位 %dKB', $tick, $buffer / 1024);
        }
    } else {
        $buffer = max(0, $buffer - 256 * 1024); // 客户端慢慢消费腾出空间
        $logs[] = sprintf('[第%d轮] 暂停推流，慢客户端消化中 → 水位降至 %dKB', $tick, $buffer / 1024);
        if ($buffer === 0) {
            $paused = false; // 收到 onBufferDrain -> 松刹车恢复！
            $logs[] = "[第{$tick}轮] 排空触发 onBufferDrain → 恢复推流 (\$paused=false)";
        }
    }
}
