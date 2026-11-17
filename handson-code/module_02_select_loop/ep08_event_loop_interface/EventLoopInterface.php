<?php
declare(strict_types=1);

/**
 * 统一事件发动机接口：
 * 今天用 SelectLoop 实现它，第 4 篇无缝切换 EpollLoop，上层代码一行不用改！
 */
interface EventLoopInterface
{
    /** @param resource $stream */
    public function onReadable($stream, callable $callback): void;

    /** @param resource $stream */
    public function offReadable($stream): void;

    /** @param resource $stream */
    public function onWritable($stream, callable $callback): void;

    /** @param resource $stream */
    public function offWritable($stream): void;

    public function run(): void;

    public function stop(): void;
}
