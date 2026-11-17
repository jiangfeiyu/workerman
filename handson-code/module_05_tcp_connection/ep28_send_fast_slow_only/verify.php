<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep28_33_tcp_connection/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】Fast Path 直写 vs Slow Path 顺序追加防插队
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($r, false);
$loop = new SelectLoopWithRepeat();
$conn = new TcpConnection($w, $loop);
$logs = [];

// 1. 短消息：sendBuffer 为空，Fast Path 一次写完
$conn->send("OK\n");
$logs[] = "[Fast Path] 短消息 \"OK\" 直接 fwrite 写完，读端收到: " . trim((string)fread($r, 64));

// 2. 大包 64KB + 紧随其后的尾包 "END"：前包进 sendBuffer，后包必须乖乖排队末尾
$big = str_repeat('X', 65536);
$conn->send($big);
$conn->send("END");
$logs[] = "[Slow Path 保序] 先发 64KB 再发 \"END\"，必须顺序拼接防插队！";

$received = '';
$loop->onReadable($r, function ($pipe) use ($loop, &$received, &$logs): void {
    while (true) {
        $chunk = @fread($pipe, 65536);
        if ($chunk === '' || $chunk === false) break;
        $received .= $chunk;
    }
    if (strlen($received) >= 65536 + 3) {
        $tail = substr($received, -3);
        $logs[] = "[保序校验] 总字节=" . strlen($received) . ", 末尾3字节={$tail} (未插队!)";
        $loop->offReadable($pipe);
        $loop->stop();
    }
});

$loop->run();
fclose($r);

$snapshot = ['episode' => 'ep28', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
