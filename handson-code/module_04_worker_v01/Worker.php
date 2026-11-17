<?php
declare(strict_types=1);

require_once __DIR__ . '/../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

class WorkerV01
{
    public ?\Closure $onConnect = null;
    public ?\Closure $onMessage = null;
    public ?\Closure $onClose = null;
    public ?\Closure $onError = null;

    /** @var array<int, resource> */
    public array $connections = [];

    private SelectLoopWithRepeat $loop;
    /** @var resource|null */
    private $server = null;

    public function __construct(private string $listenAddress)
    {
        $this->loop = new SelectLoopWithRepeat();
    }

    public function getLoop(): SelectLoopWithRepeat
    {
        return $this->loop;
    }

    public function start(): void
    {
        $this->server = stream_socket_server($this->listenAddress, $errno, $errstr);
        if (!$this->server) {
            throw new \RuntimeException("Listen failed: {$errstr}");
        }
        stream_set_blocking($this->server, false);

        $this->loop->onReadable($this->server, function ($srv): void {
            $conn = @stream_socket_accept($srv, 0);
            if (!$conn) {
                return;
            }
            stream_set_blocking($conn, false);
            $id = (int)$conn;
            $this->connections[$id] = $conn;
            $this->safeCall($this->onConnect, $conn);

            $this->loop->onReadable($conn, function ($client) use ($id): void {
                $data = @fread($client, 65535);
                if ($data === '' || $data === false) {
                    $this->loop->offReadable($client);
                    unset($this->connections[$id]);
                    fclose($client);
                    $this->safeCall($this->onClose, $client);
                    return;
                }
                $this->safeCall($this->onMessage, $client, $data);
            });
        });

        $this->loop->run();
    }

    private function safeCall(?\Closure $fn, mixed ...$args): void
    {
        if (!$fn) {
            return;
        }
        try {
            $fn(...$args);
        } catch (\Throwable $e) {
            if ($this->onError) {
                ($this->onError)($e);
            } else {
                fwrite(STDERR, "[Worker 捕获异常防崩溃] {$e->getMessage()}\n");
            }
        }
    }
}
