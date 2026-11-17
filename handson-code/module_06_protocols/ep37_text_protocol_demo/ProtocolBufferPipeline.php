<?php
declare(strict_types=1);

require_once __DIR__ . '/../ProtocolInterface.php';
require_once __DIR__ . '/../TextProtocol.php';

// 演示将 ProtocolInterface 插槽接进 TcpConnection::baseRead()
class ProtocolBufferPipeline
{
    private string $recvBuffer = '';

    /** @param class-string<ProtocolInterface> $protocol */
    public function __construct(
        private string $protocol,
        private \Closure $onMessage,
        private \Closure $onProtocolError,
    ) {}

    public function feed(string $chunk): void
    {
        $this->recvBuffer .= $chunk;
        while ($this->recvBuffer !== '') {
            try {
                $len = ($this->protocol)::input($this->recvBuffer);
            } catch (\Throwable $e) {
                ($this->onProtocolError)($e);
                $this->recvBuffer = '';
                return;
            }
            if ($len === 0) {
                return; // 半包：留在蓄水池，等下一次 fread
            }
            $package = substr($this->recvBuffer, 0, $len);
            $this->recvBuffer = substr($this->recvBuffer, $len);
            ($this->onMessage)(($this->protocol)::decode($package));
        }
    }

    public function pack(mixed $data): string
    {
        return ($this->protocol)::encode($data);
    }
}
