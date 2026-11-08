<?php
// 关卡 6.3 显微镜实验：透视定时器的时间戳数学计算与内核参数转换

echo "=== 定时器数学与时间戳显微镜拆解 ===\n\n";

// 1. 模拟业务设定一个 2.75 秒后的闹钟
$seconds = 2.75;
$now = microtime(true);
$runTime = $now + $seconds;

echo "1. 设定闹钟:\n";
echo "   当前时间戳 (now):     " . sprintf("%.6f", $now) . " 秒\n";
echo "   计划延迟时间 (seconds): " . $seconds . " 秒\n";
echo "   目标执行时间 (runTime): " . sprintf("%.6f", $runTime) . " 秒\n\n";

// 2. 模拟 0.5 秒后，代码准备进入 stream_select 睡觉
usleep(500000); // 经过了 0.5 秒
$now2 = microtime(true);

echo "2. 准备进入 stream_select 睡觉前:\n";
echo "   经过 0.5 秒后时间戳:   " . sprintf("%.6f", $now2) . " 秒\n";

// 距离闹钟还剩多久？
$diff = $runTime - $now2;
echo "   剩余等待时间 (diff):    " . sprintf("%.6f", $diff) . " 秒\n";

// 边界防线：max(0, ...)
$timeout = max(0, $diff);
echo "   安全打盹时间 (timeout): " . sprintf("%.6f", $timeout) . " 秒\n\n";

// 3. 拆分为 Linux 内核 struct timeval 接受的整数秒与微秒
$sec = (int)$timeout;
$usec = (int)(($timeout - $sec) * 1000000);

echo "3. 转换为 Linux 内核系统调用参数 (struct timeval):\n";
echo "   第 4 参数 (秒 tv_sec):    $sec 秒\n";
echo "   第 5 参数 (微秒 tv_usec): $usec 微秒\n";
echo "   -> 最终内核打盹时间: $sec 秒 + $usec 微秒 = " . ($sec + $usec / 1000000) . " 秒！\n";
