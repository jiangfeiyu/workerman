<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep08_event_loop_interface/EventLoopInterface.php';

class SelectLoop implements EventLoopInterface
{
    /** @var array<int, resource> */
    private array $readFds = [];

    /** @var array<int, callable> */
    private array $readCallbacks = [];

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

    public function onWritable($stream, callable $callback): void {}
    public function offWritable($stream): void {}
    public function stop(): void {}

    public function run(): void
    {
        while ($this->readFds !== []) {
            $read = $this->readFds;
            $write = $except = null;

            // 加 @ 抑制信号打断睡眠产生的 EINTR 警告
            $count = @stream_select($read, $write, $except, null);
            if ($count === false || $count === 0) {
                continue;
            }
            foreach ($read as $fd) {
                $cb = $this->readCallbacks[(int)$fd] ?? null;
                if ($cb) {
                    $cb($fd);
                }
            }
        }
    }
}
