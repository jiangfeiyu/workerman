<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_02_select_loop/ep08_event_loop_interface/EventLoopInterface.php';

class TcpConnection
{
    private static int $idRecorder = 0;
    public readonly int $id;
    public ?int $uid = null;

    /** @var resource */
    private $socket;
    private EventLoopInterface $loop;
    public ?\Closure $onMessage = null;

    public function __construct($socket, EventLoopInterface $loop)
    {
        $this->id = ++self::$idRecorder;
        $this->socket = $socket;
        $this->loop = $loop;

        // 把原来 Worker 替每个连接干的“读监听”收进连接对象自己管！
        stream_set_blocking($this->socket, false);
        $this->loop->onReadable($this->socket, fn () => $this->baseRead());
    }

    private function baseRead(): void
    {
        $data = @fread($this->socket, 65535);
        if ($data === '' || $data === false) {
            $this->loop->offReadable($this->socket);
            @fclose($this->socket);
            return;
        }
        if ($this->onMessage) {
            ($this->onMessage)($this, $data);
        }
    }
}
