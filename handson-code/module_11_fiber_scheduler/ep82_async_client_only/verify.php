<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】EP082 AsyncTcpClient 使用标准 EventLoopInterface (onWritable -> offWritable -> onReadable)
$port = '19822';
$srv = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($srv, false);

$loop = new SelectLoopWithRepeat();
$logs = [];

$loop->onReadable($srv, function ($s) use ($loop): void {
    $c = @stream_socket_accept($s, 0);
    if (!$c) return;
    stream_set_blocking($c, false);
    $loop->onReadable($c, function ($cli) use ($loop): void {
        $d = @fread($cli, 1024);
        if ($d === '' || $d === false) { $loop->offReadable($cli); fclose($cli); return; }
        fwrite($cli, 'PONG:' . trim($d));
    });
});

$flags = STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT;
$sock = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2, $flags);
stream_set_blocking($sock, false);

$loop->onWritable($sock, function ($fd) use ($loop, $srv, &$logs): void {
    $loop->offWritable($fd); // 握手成功，立刻卸载写监听！
    $logs[] = '[onConnect] 可写就绪 → 摘掉 onWritable 并发送 PING';
    fwrite($fd, "hello-async\n");
    $loop->onReadable($fd, function ($f) use ($loop, $srv, &$logs): void {
        $reply = @fread($f, 1024);
        $logs[] = "[onMessage] 收到上游回包 => {$reply}";
        $loop->offReadable($f);
        $loop->offReadable($srv);
        $loop->stop();
        fclose($f);
    });
});

$loop->run();
fclose($srv);

$snapshot = ['episode' => 'ep82', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
