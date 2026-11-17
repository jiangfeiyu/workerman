<?php
declare(strict_types=1);

require_once __DIR__ . '/../ConnectionStatus.php';
require_once __DIR__ . '/../../module_02_select_loop/ep08_event_loop_interface/EventLoopInterface.php';

class TcpConnectionBase
{
    private static int $idRecorder = 0;
    public readonly int $id;
    public ConnectionStatus $status = ConnectionStatus::Established;

    /** 动态挂载业务属性（如登录后的用户 UID） */
    public ?int $uid = null;

    /** @var resource */
    protected $socket;
    protected EventLoopInterface $loop;
    public ?\Closure $onMessage = null;
    public ?\Closure $onClose = null;

    /** @param resource $socket */
    public function __construct($socket, EventLoopInterface $loop)
    {
        $this->id = ++self::$idRecorder;
        $this->socket = $socket;
        $this->loop = $loop;
        stream_set_blocking($this->socket, false);
        $this->loop->onReadable($this->socket, fn () => $this->baseRead());
    }

    public function getRemoteAddress(): string
    {
        return (string)@stream_socket_get_name($this->socket, true);
    }

    protected function baseRead(): void
    {
        $data = @fread($this->socket, 65535);
        if ($data === '' || $data === false) {
            $this->destroy();
            return;
        }
        if ($this->onMessage) {
            ($this->onMessage)($this, $data);
        }
    }

    public function destroy(): void
    {
        if ($this->status === ConnectionStatus::Closed) {
            return;
        }
        $this->status = ConnectionStatus::Closed;
        $this->loop->offReadable($this->socket);
        $this->loop->offWritable($this->socket);
        @fclose($this->socket);
        if ($this->onClose) {
            ($this->onClose)($this);
        }
    }
}
