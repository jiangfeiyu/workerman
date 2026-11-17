<?php
declare(strict_types=1);

require_once __DIR__ . '/../ConnectionStatus.php';
require_once __DIR__ . '/../../module_02_select_loop/ep08_event_loop_interface/EventLoopInterface.php';

class TcpConnection
{
    private static int $idRecorder = 0;
    public readonly int $id;
    public ConnectionStatus $status = ConnectionStatus::Established;

    public ?int $uid = null;
    public int $maxSendBufferSize = 1024 * 1024; // 1MB 默认高水位线

    public ?\Closure $onMessage = null;
    public ?\Closure $onClose = null;
    public ?\Closure $onBufferFull = null;
    public ?\Closure $onBufferDrain = null;

    private string $sendBuffer = '';
    private bool $bufferFullTriggered = false;

    /** @param resource $socket */
    public function __construct(
        private $socket,
        private EventLoopInterface $loop,
    ) {
        $this->id = ++self::$idRecorder;
        stream_set_blocking($this->socket, false);
        $this->loop->onReadable($this->socket, fn () => $this->baseRead());
    }

    public function getRemoteAddress(): string
    {
        return (string)@stream_socket_get_name($this->socket, true);
    }

    public function send(string $data): bool
    {
        if ($this->status !== ConnectionStatus::Established) {
            return false;
        }
        if ($data === '') {
            return true;
        }

        // 如果当前没有排队待发数据，尝试直接写入内核缓冲区
        if ($this->sendBuffer === '') {
            $written = (int)@fwrite($this->socket, $data);
            if ($written === strlen($data)) {
                return true;
            }
            if ($written > 0) {
                $data = substr($data, $written);
            }
        }

        // 写不完或已有积压：追加到应用层发送缓冲，并挂载可写事件
        $this->sendBuffer .= $data;
        $this->loop->onWritable($this->socket, fn () => $this->baseWrite());

        if (!$this->bufferFullTriggered && strlen($this->sendBuffer) >= $this->maxSendBufferSize) {
            $this->bufferFullTriggered = true;
            if ($this->onBufferFull) {
                ($this->onBufferFull)($this);
            }
        }
        return true;
    }

    public function close(string $data = ''): void
    {
        if ($this->status === ConnectionStatus::Closing || $this->status === ConnectionStatus::Closed) {
            return;
        }
        if ($data !== '') {
            $this->send($data);
        }
        if ($this->sendBuffer === '') {
            $this->destroy();
            return;
        }
        // 还有缓冲区没发完：进入 Closing 状态并停止读新包，等 baseWrite 排空再 destroy
        $this->status = ConnectionStatus::Closing;
        $this->loop->offReadable($this->socket);
    }

    public function destroy(): void
    {
        if ($this->status === ConnectionStatus::Closed) {
            return;
        }
        $this->status = ConnectionStatus::Closed;
        $this->sendBuffer = '';
        $this->loop->offReadable($this->socket);
        $this->loop->offWritable($this->socket);
        @fclose($this->socket);
        if ($this->onClose) {
            ($this->onClose)($this);
        }
    }

    private function baseRead(): void
    {
        while (true) {
            $chunk = @fread($this->socket, 65535);
            if ($chunk === '' || $chunk === false) {
                if (feof($this->socket)) {
                    $this->destroy();
                }
                return;
            }
            if ($this->onMessage) {
                ($this->onMessage)($this, $chunk);
            }
        }
    }

    private function baseWrite(): void
    {
        if ($this->sendBuffer === '') {
            $this->loop->offWritable($this->socket);
            return;
        }

        $written = (int)@fwrite($this->socket, $this->sendBuffer);
        if ($written > 0) {
            $this->sendBuffer = substr($this->sendBuffer, $written);
        }

        if ($this->sendBuffer === '') {
            $this->loop->offWritable($this->socket);
            if ($this->bufferFullTriggered) {
                $this->bufferFullTriggered = false;
                if ($this->onBufferDrain) {
                    ($this->onBufferDrain)($this);
                }
            }
            if ($this->status === ConnectionStatus::Closing) {
                $this->destroy();
            }
        }
    }
}
