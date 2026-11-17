<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【过渡】不用 TcpConnection 类，先用全局变量 $pending + substr() 跑通 10MB 零丢失续传！
$port = '19026';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e, $s, 2);
stream_set_blocking($client, false);
$conn = @stream_socket_accept($server, 1);
stream_set_blocking($conn, false);

$payload = str_repeat('W', 10 * 1024 * 1024); // 10 MB
$pending = $payload;
$receivedTotal = 0;
$writeRounds = 0;

$loop = new SelectLoopWithRepeat();

// 接收端不断消费数据
$loop->onReadable($client, function ($c) use ($loop, &$receivedTotal, $payload): void {
    while (true) {
        $chunk = @fread($c, 65536);
        if ($chunk === '' || $chunk === false) {
            break;
        }
        $receivedTotal += strlen($chunk);
    }
    if ($receivedTotal >= strlen($payload)) {
        $loop->offReadable($c);
        $loop->stop();
    }
});

// 发送端分批续传：写不完的用 substr($pending, $written) 留待下次 onWritable
$loop->onWritable($conn, function ($s) use ($loop, &$pending, &$writeRounds): void {
    $writeRounds++;
    $written = (int)@fwrite($s, $pending);
    if ($written > 0) {
        $pending = substr($pending, $written);
    }
    if ($pending === '') {
        $loop->offWritable($s); // 排空必须立刻卸掉可写监听！
    }
});

$loop->run();

echo sprintf(
    "[10MB 全局过渡续传成功] 总共分 %d 轮 onWritable 写完, 接收端完整收到 %s bytes (0 字节丢失!)\n",
    $writeRounds,
    number_format($receivedTotal)
);

fclose($client);
fclose($conn);
fclose($server);
