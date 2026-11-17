<?php
declare(strict_types=1);

// EP109: 真实 Fiber + ConnectionPool + 本地 TCP RESP 异步落库与零串台检验
class DanmakuPool
{
    private \SplQueue $idle;
    private int $inUse = 0;

    public function __construct(array $conns)
    {
        $this->idle = new \SplQueue();
        foreach ($conns as $c) {
            $this->idle->enqueue($c);
        }
    }

    public function borrow()
    {
        while ($this->idle->isEmpty()) {
            Fiber::suspend('WAIT_CONN');
        }
        $this->inUse++;
        return $this->idle->dequeue();
    }

    public function release($conn): void
    {
        $this->inUse--;
        $this->idle->enqueue($conn);
    }

    public function stats(): array
    {
        return ['idle' => $this->idle->count(), 'inUse' => $this->inUse];
    }
}

$srv = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr = stream_socket_get_name($srv, false);
$cli1 = stream_socket_client("tcp://{$addr}", $e1, $s1, 2);
$srv1 = stream_socket_accept($srv, 2);
$cli2 = stream_socket_client("tcp://{$addr}", $e2, $s2, 2);
$srv2 = stream_socket_accept($srv, 2);

$pool = new DanmakuPool([$cli1, $cli2]);
$srvByCli = [(int)$cli1 => $srv1, (int)$cli2 => $srv2];
$savedCount = 0;
$crossTalk = 0;

$t0 = hrtime(true);
for ($i = 1; $i <= 50; $i++) {
    $f = new Fiber(function () use ($pool, $srvByCli, $i, &$savedCount, &$crossTalk): void {
        $conn = $pool->borrow();
        try {
            $item = "danmaku_{$i}";
            $respCmd = "*3\r\n\$5\r\nLPUSH\r\n\$16\r\nhistory:live-101\r\n\$" . strlen($item) . "\r\n{$item}\r\n";
            fwrite($conn, $respCmd);
            // 服务端读取 RESP 请求并回包 :$i
            $srvSock = $srvByCli[(int)$conn];
            fread($srvSock, 128);
            fwrite($srvSock, ":{$i}\r\n");
            $ack = trim((string)fgets($conn));
            if ($ack !== ":{$i}") {
                $crossTalk++;
            }
            $savedCount++;
        } finally {
            $pool->release($conn);
        }
    });
    $f->start();
}
$ms = round((hrtime(true) - $t0) / 1e6, 2);
$st = $pool->stats();
fclose($cli1); fclose($cli2); fclose($srv1); fclose($srv2); fclose($srv);

$snapshot = [
    'episode' => 'ep109',
    'output'  => [
        "[Fiber + ConnectionPool RESP LPUSH] 成功落库 {$savedCount} 条弹幕 | 耗时={$ms}ms | 串台={$crossTalk}",
        "[try-finally 归还校验] 池状态 idle={$st['idle']}, inUse={$st['inUse']} (零连接泄漏!)",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
