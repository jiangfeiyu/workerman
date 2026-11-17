<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_02_select_loop/ep08_event_loop_interface/EventLoopInterface.php';

class SelectLoop implements EventLoopInterface
{
    private array $readFds = [];
    private array $readCallbacks = [];
    private array $writeFds = [];
    private array $writeCallbacks = [];
    private bool $running = false;

    private \SplPriorityQueue $timers;
    private int $timerAutoId = 0;
    /** @var array<int, bool> */
    private array $activeTimers = [];

    public function __construct()
    {
        $this->timers = new \SplPriorityQueue();
        $this->timers->setExtractFlags(\SplPriorityQueue::EXTR_DATA);
    }

    public function onReadable($stream, callable $callback): void
    {
        $id = (int)$stream;
        $this->readFds[$id] = $stream;
        $this->readCallbacks[$id] = $callback;
    }

    public function offReadable($stream): void
    {
        $id = (int)$stream;
        unset($this->readFds[$id], $this->readCallbacks[$id]);
    }

    public function onWritable($stream, callable $callback): void
    {
        $id = (int)$stream;
        $this->writeFds[$id] = $stream;
        $this->writeCallbacks[$id] = $callback;
    }

    public function offWritable($stream): void
    {
        $id = (int)$stream;
        unset($this->writeFds[$id], $this->writeCallbacks[$id]);
    }

    public function delay(float $seconds, callable $callback): int
    {
        $id = ++$this->timerAutoId;
        $triggerAt = microtime(true) + $seconds;
        $this->activeTimers[$id] = true;
        $this->timers->insert(['id' => $id, 'at' => $triggerAt, 'cb' => $callback], -$triggerAt);
        return $id;
    }

    public function delTimer(int $timerId): void
    {
        unset($this->activeTimers[$timerId]);
    }

    public function stop(): void
    {
        $this->running = false;
    }

    private function getNextTimeoutUsec(): ?int
    {
        while (!$this->timers->isEmpty()) {
            $top = $this->timers->top();
            if (!isset($this->activeTimers[$top['id']])) {
                $this->timers->extract();
                continue;
            }
            $waitSec = max(0.0, $top['at'] - microtime(true));
            return (int)($waitSec * 1_000_000);
        }
        return null;
    }

    private function tickTimers(): void
    {
        $now = microtime(true);
        while (!$this->timers->isEmpty()) {
            $top = $this->timers->top();
            if (!isset($this->activeTimers[$top['id']])) {
                $this->timers->extract();
                continue;
            }
            if ($top['at'] > $now) {
                break;
            }
            $this->timers->extract();
            unset($this->activeTimers[$top['id']]);
            ($top['cb'])($top['id']);
        }
    }

    public function run(): void
    {
        $this->running = true;
        while ($this->running) {
            if ($this->readFds === [] && $this->writeFds === [] && $this->activeTimers === []) {
                break;
            }
            $timeoutUsec = $this->getNextTimeoutUsec();
            if ($this->readFds === [] && $this->writeFds === []) {
                if ($timeoutUsec !== null && $timeoutUsec > 0) {
                    usleep($timeoutUsec);
                }
                $this->tickTimers();
                continue;
            }
            $read = $this->readFds;
            $write = $this->writeFds;
            $except = null;
            $sec = $timeoutUsec === null ? null : intdiv($timeoutUsec, 1_000_000);
            $usec = $timeoutUsec === null ? null : $timeoutUsec % 1_000_000;

            $count = @stream_select($read, $write, $except, $sec, $usec);
            if ($count !== false && $count > 0) {
                foreach ($read as $fd) {
                    ($this->readCallbacks[(int)$fd] ?? static fn () => null)($fd);
                }
                foreach ($write as $fd) {
                    ($this->writeCallbacks[(int)$fd] ?? static fn () => null)($fd);
                }
            }
            $this->tickTimers();
        }
    }
}
