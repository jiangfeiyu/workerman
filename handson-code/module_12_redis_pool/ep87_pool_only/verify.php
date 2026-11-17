<?php
declare(strict_types=1);

// 【独立验证】EP087 ConnectionPool 容量=1 隔离与接力验证
class MiniPool
{
    private SplQueue $idle;
    private SplQueue $waiters;
    public function __construct() {
        $this->idle = new SplQueue();
        $this->waiters = new SplQueue();
        $this->idle->enqueue('Conn#1');
    }
    public function borrow(): string {
        if (!$this->idle->isEmpty()) return $this->idle->dequeue();
        $this->waiters->enqueue(Fiber::getCurrent());
        return Fiber::suspend();
    }
    public function release(string $conn): void {
        if (!$this->waiters->isEmpty()) {
            $this->waiters->dequeue()->resume($conn);
            return;
        }
        $this->idle->enqueue($conn);
    }
}

$pool = new MiniPool();
$logs = [];

$f1 = new Fiber(function () use ($pool, &$logs): void {
    $c = $pool->borrow();
    $logs[] = "[Fiber #1] 借走独占 {$c}";
    Fiber::suspend(); // 模拟做异步 I/O
    $logs[] = "[Fiber #1] 用完归还 {$c} → 唤醒排队者";
    $pool->release($c);
});

$f2 = new Fiber(function () use ($pool, &$logs): void {
    $c = $pool->borrow(); // 池空，自动 suspend 等 f1 交棒！
    $logs[] = "[Fiber #2] 接力拿到独占 {$c} (0 串台!)";
    $pool->release($c);
});

$f1->start();
$f2->start();
$f1->resume();

$snapshot = ['episode' => 'ep87', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
