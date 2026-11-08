<?php
// 关卡 6.6 【招式演进 v1.1】：基于最小堆 SplPriorityQueue 打造的高性能 SelectLoop

class SelectLoop {
    protected array $readFds = [];
    protected array $readCallbacks = [];

    // 优先队列调度器（最小堆）
    protected SplPriorityQueue $scheduler;
    // 闹钟任务详情表 [timer_id => [callable, is_repeat, interval]]
    protected array $timerTasks = [];
    protected int $timerId = 1;

    public function __construct() {
        $this->scheduler = new SplPriorityQueue();
        // 设置提取标志：提取时同时返回数据和优先级
        $this->scheduler->setExtractFlags(SplPriorityQueue::EXTR_BOTH);
    }

    public function addRead($stream, callable $callback): void {
        $fd = (int)$stream;
        $this->readFds[$fd] = $stream;
        $this->readCallbacks[$fd] = $callback;
    }

    public function delRead($stream): void {
        $fd = (int)$stream;
        unset($this->readFds[$fd], $this->readCallbacks[$fd]);
    }

    /**
     * 注册一次性延迟闹钟
     */
    public function after(float $delay, callable $callback): int {
        $id = $this->timerId++;
        $runTime = microtime(true) + $delay;
        
        // 核心技巧：利用负数时间戳 (-$runTime)，把大顶堆变成最小堆！
        $this->scheduler->insert($id, -$runTime);
        $this->timerTasks[$id] = ['callback' => $callback, 'repeat' => false, 'interval' => $delay];
        return $id;
    }

    /**
     * 注册周期性循环定时器（每隔 $interval 秒响一次）
     */
    public function repeat(float $interval, callable $callback): int {
        $id = $this->timerId++;
        $runTime = microtime(true) + $interval;
        $this->scheduler->insert($id, -$runTime);
        $this->timerTasks[$id] = ['callback' => $callback, 'repeat' => true, 'interval' => $interval];
        return $id;
    }

    /**
     * 取消闹钟
     */
    public function delTimer(int $timerId): void {
        unset($this->timerTasks[$timerId]);
    }

    public function loop(): void {
        while (true) {
            // 1. 光速获取下一个最近要响的闹钟（O(1) 复杂度！）
            $timeout = null;
            while (!$this->scheduler->isEmpty()) {
                $top = $this->scheduler->top();
                $id = $top['data'];
                // 如果这个闹钟已经被业务取消删除了，弹出并丢弃
                if (!isset($this->timerTasks[$id])) {
                    $this->scheduler->extract();
                    continue;
                }
                // 还原出真正的未来时间戳（去掉负号）
                $nextRunTime = -$top['priority'];
                // 计算当前还能睡几秒
                $timeout = max(0, $nextRunTime - microtime(true));
                break;
            }

            // 2. 委托内核保安盯梢
            $read = $this->readFds;
            $write = $except = null;
            if ($timeout === null) {
                @stream_select($read, $write, $except, null);
            } else {
                $sec = (int)$timeout;
                $usec = (int)(($timeout - $sec) * 1000000);
                @stream_select($read, $write, $except, $sec, $usec);
            }

            // 3. 处理网络就绪的 FD
            foreach ($read as $stream) {
                $fd = (int)$stream;
                if (isset($this->readCallbacks[$fd])) {
                    ($this->readCallbacks[$fd])($stream);
                }
            }

            // 4. 处理到期的定时器（只看堆顶！）
            $now = microtime(true);
            while (!$this->scheduler->isEmpty()) {
                $top = $this->scheduler->top();
                $nextRunTime = -$top['priority'];

                // 🌟 核心逻辑：如果最顶层的闹钟都还没到期，后面的肯定更没到期，立刻退出！
                if ($nextRunTime > $now) {
                    break;
                }

                // 堆顶闹钟到期，弹出执行！
                $this->scheduler->extract();
                $id = $top['data'];

                if (isset($this->timerTasks[$id])) {
                    $task = $this->timerTasks[$id];
                    ($task['callback'])();

                    // 如果是周期性闹钟，算好下一次时间，重新塞回堆里！
                    if ($task['repeat']) {
                        $nextTime = microtime(true) + $task['interval'];
                        $this->scheduler->insert($id, -$nextTime);
                    } else {
                        unset($this->timerTasks[$id]);
                    }
                }
            }
        }
    }
}
