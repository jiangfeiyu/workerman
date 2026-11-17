<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep16_select_loop_repeat/SelectLoopWithRepeat.php';

$port = getenv('PORT') ?: '9017';
$timeoutSec = (float)(getenv('IDLE_TIMEOUT') ?: '0.35');
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);

$loop = new SelectLoopWithRepeat();
/** @var array<int, array{fd: resource, lastActive: float}> */
$clients = [];

$loop->onReadable($server, function ($srv) use ($loop, &$clients): void {
    $conn = @stream_socket_accept($srv, 0);
    if (!$conn) return;
    stream_set_blocking($conn, false);
    $id = (int)$conn;
    $clients[$id] = ['fd' => $conn, 'lastActive' => microtime(true)];
    echo "[Server] 新客入座 fd={$id}\n";

    $loop->onReadable($conn, function ($c) use ($loop, &$clients, $id): void {
        $data = @fread($c, 1024);
        if ($data === '' || $data === false) {
            echo "[Server] 客人主动离开 fd={$id}\n";
            $loop->offReadable($c);
            unset($clients[$id]);
            fclose($c);
            return;
        }
        $clients[$id]['lastActive'] = microtime(true);
        fwrite($c, "Pong: " . $data);
    });
});

$loop->repeat(0.10, function () use ($loop, &$clients, $timeoutSec): void {
    $now = microtime(true);
    foreach ($clients as $id => $info) {
        if ($now - $info['lastActive'] >= $timeoutSec) {
            echo "[心跳巡检] fd={$id} 超时未说话，强制踢出！\n";
            @fwrite($info['fd'], "BYE: heartbeat timeout\n");
            $loop->offReadable($info['fd']);
            fclose($info['fd']);
            unset($clients[$id]);
        }
    }
});

echo "[Server] 心跳踢人服务器启动 (超时阈值={$timeoutSec}s)\n";
$loop->run();
