<?php
// 关卡 6.5 极简实战：认识 PHP 内置算法神器 —— SplPriorityQueue（优先队列/堆）

// 1. 创建一个优先队列
$queue = new SplPriorityQueue();

// 告诉 PHP：我们要同时取出数据和它的优先级
$queue->setExtractFlags(SplPriorityQueue::EXTR_BOTH);

// 2. 假设现在有 3 个客人，在不同的时间点了菜：
// 客人 A：10 秒后上菜 (时间戳: 10)
// 客人 B：2 秒后上菜  (时间戳: 2)  <-- 最着急！
// 客人 C：5 秒后上菜  (时间戳: 5)

echo "=== 往堆里乱序塞入 3 个闹钟 ===\n";
echo "塞入: 客人 A (10秒后)\n";
$queue->insert("客人 A 的宫保鸡丁", -10); // 负数小黑魔法：-2 > -5 > -10

echo "塞入: 客人 B (2秒后)\n";
$queue->insert("客人 B 的西红柿炒蛋", -2);

echo "塞入: 客人 C (5秒后)\n";
$queue->insert("客人 C 的米饭", -5);

// 3. 见证奇迹：我们不用任何 foreach 循环排序，看看谁停在最顶层（top）？
$earliest = $queue->top();

echo "\n=== 瞬间光速拿出最顶层的元素 (O(1) 复杂度) ===\n";
echo "最先要响的闹钟: " . $earliest['data'] . "\n";
echo "它的对应时间戳: " . (-$earliest['priority']) . " 秒后！\n";
