<?php
declare(strict_types=1);

// 【铺垫】PHP 内置的 SplPriorityQueue 默认是大顶堆（优先级数字越大越先出队）
$badHeap = new SplPriorityQueue();
$badHeap->insert('0.5秒后响', 0.5);
$badHeap->insert('0.1秒后响', 0.1);
$badHeap->insert('1.0秒后响', 1.0);
echo "[默认大顶堆队头] " . $badHeap->top() . " (最晚的反而先出，错了！)\n";

// ✅ 破解绝招：把时间戳取负数 -$triggerAt 当权重！最早的时间反而数字最大，稳坐堆顶！
$minHeap = new SplPriorityQueue();
$minHeap->insert('0.5秒后响', -0.5);
$minHeap->insert('0.1秒后响', -0.1);
$minHeap->insert('1.0秒后响', -1.0);

$order = [];
while (!$minHeap->isEmpty()) {
    $order[] = $minHeap->extract();
}
echo "[取负变最小堆后出队顺序] " . implode(' -> ', $order) . "\n";
