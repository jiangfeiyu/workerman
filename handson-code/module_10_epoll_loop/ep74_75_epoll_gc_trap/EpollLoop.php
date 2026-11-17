<?php
declare(strict_types=1);

class EventHandle
{
    public static int $destroyed = 0;

    public function __construct(public readonly int $fd) {}

    public function __destruct()
    {
        self::$destroyed++;
    }
}

class EpollLoop
{
    /** @var array<int, EventHandle> 必须强引用保活，否则 PHP GC 当场销毁回调! */
    private array $allEvents = [];

    public function addUnsafe(int $fd): void
    {
        $ev = new EventHandle($fd); // 局部引用离开函数立刻归零 __destruct!
    }

    public function addSafe(int $fd): void
    {
        $ev = new EventHandle($fd);
        $this->allEvents[$fd] = $ev; // 存入常驻数组保活!
    }

    public function del(int $fd): void
    {
        unset($this->allEvents[$fd]);
    }

    public function count(): int
    {
        return count($this->allEvents);
    }
}
