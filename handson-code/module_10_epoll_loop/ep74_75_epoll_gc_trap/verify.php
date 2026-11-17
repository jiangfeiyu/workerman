<?php
declare(strict_types=1);

require_once __DIR__ . '/EpollLoop.php';

$loop = new EpollLoop();
$logs = [];

// 1. 错误示范：不把事件句柄存进 $this->allEvents
$loop->addUnsafe(101);
$logs[] = '[忘记存 $allEvents] 函数一返回 refcount=0 -> __destruct 触发次数=' . EventHandle::$destroyed . ' (回调直接蒸发!)';

// 2. 正确示范：存入 $this->allEvents 强引用保活
$before = EventHandle::$destroyed;
$loop->addSafe(102);
$logs[] = '[存入 $this->allEvents[102]] activeEvents=' . $loop->count() . ', destroyedDelta=' . (EventHandle::$destroyed - $before) . ' (稳如泰山!)';

// 3. 连接关闭调用 del() 精准释放内存
$loop->del(102);
$logs[] = '[del(102) unset 释放] activeEvents=' . $loop->count() . ', destroyedTotal=' . EventHandle::$destroyed . ' (零内存泄漏!)';

$snapshot = ['episode' => 'ep74_75_epoll', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
