<?php
declare(strict_types=1);

// 【加餐过渡】彻底拆平回调：先搞懂“登记时刻”和“触发时刻”，不套任何嵌套闭包！
$readCallbacks = [];

// 1. 先写出两个普通函数（各干各的，互不嵌套）
function onGateRing(int $fd, array &$callbacks): void
{
    echo "  [触发时刻] {$fd} 号门铃响了 -> 迎客并给 6 号客人登记便条\n";
    $callbacks[6] = 'onGuestSpeak';
}

function onGuestSpeak(int $fd, array &$callbacks): void
{
    echo "  [触发时刻] {$fd} 号客人说话了 -> 读消息并回复 Echo!\n";
}

// 2. 登记时刻：只把函数名放进数组抽屉，此时函数体一行都不执行！
echo "[登记时刻] 把 'onGateRing' 放进 5 号抽屉（注意：函数还没运行！）\n";
$readCallbacks[5] = 'onGateRing';

// 3. 模拟事件循环叫号触发
echo "[事件到达] 5 号就绪，查表取出函数加括号触发:\n";
($readCallbacks[5])(5, $readCallbacks);

echo "[事件到达] 6 号就绪，查表取出新登记的函数加括号触发:\n";
($readCallbacks[6])(6, $readCallbacks);
