<?php
declare(strict_types=1);

// EP086-087 【踩坑 & 解决】: 单连接协程串台灾难 vs ConnectionPool 连接池隔离
$logs = [];

// 1. 复现单连接串台：同一个 $sharedConn 被 Fiber A 和 Fiber B 交替写入/读取
$queue = [];
$fA = new Fiber(function () use (&$queue): string {
    $queue[] = 'RES_FOR_A'; // A 发请求后挂起等 I/O
    $got = Fiber::suspend();
    return $got;
});
$fB = new Fiber(function () use (&$queue): string {
    // B 共用同一条 TCP，直接读走了队列头属于 A 的包!
    $stolen = array_shift($queue);
    return $stolen;
});

$fA->start();
$fB->start();
$bGot = $fB->getReturn(); // B 拿到了 RES_FOR_A！
$logs[] = "[EP086 · 共用单连接串台灾难] Fiber B 要查 B，结果错拿成 Fiber A 的响应: {$bGot} (线上数据大乱套!)";

// 2. ConnectionPool 连接池隔离：借用独占 + 归还 + 等待队列
class ConnectionPool
{
    private \SplQueue $idle;
    private \SplQueue $waiters;

    public function __construct(int $size)
    {
        $this->idle = new \SplQueue();
        $this->waiters = new \SplQueue();
        for ($i = 1; $i <= $size; $i++) {
            $this->idle->enqueue("Conn#{$i}");
        }
    }

    public function borrow(): string
    {
        if (!$this->idle->isEmpty()) {
            return $this->idle->dequeue();
        }
        $this->waiters->enqueue(Fiber::getCurrent());
        return Fiber::suspend();
    }

    public function release(string $conn): void
    {
        if (!$this->waiters->isEmpty()) {
            $nextFiber = $this->waiters->dequeue();
            $nextFiber->resume($conn);
            return;
        }
        $this->idle->enqueue($conn);
    }
}

$pool = new ConnectionPool(1); // 容量=1，逼迫两根协程排队
$results = [];
$p1 = new Fiber(function () use ($pool, &$results): void {
    $c = $pool->borrow();
    $results[] = "Fiber1 独占 {$c}";
    Fiber::suspend();
    $pool->release($c);
});
$p2 = new Fiber(function () use ($pool, &$results): void {
    $c = $pool->borrow(); // 池空自动挂起，等 Fiber1 归还瞬间唤醒!
    $results[] = "Fiber2 接力独占 {$c}";
    $pool->release($c);
});

$p1->start();
$p2->start();
$p1->resume();

$logs[] = '[EP087 · ConnectionPool 隔离实测] ' . implode(' -> ', $results) . ' (0 串台!)';

$snapshot = ['episode' => 'ep86_87_pool', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
