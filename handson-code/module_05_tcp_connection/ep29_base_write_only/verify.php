<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】纯净版 baseWrite()：排空 $sendBuffer 并立刻调用 offWritable()
$port = '19292';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
stream_set_blocking($client, false);
$sock = @stream_socket_accept($server, 1);
stream_set_blocking($sock, false);

$loop = new SelectLoopWithRepeat();
$sendBuffer = str_repeat('B', 2 * 1024 * 1024); // 2 MB
$writeCalls = 0;
$received = 0;
$logs = [];

$baseWrite = function () use ($sock, $loop, &$sendBuffer, &$writeCalls, &$logs): void {
    $writeCalls++;
    $written = (int)@fwrite($sock, $sendBuffer);
    if ($written > 0) {
        $sendBuffer = substr($sendBuffer, $written);
    }
    if ($sendBuffer === '') {
        $loop->offWritable($sock); // 排空立即卸载！
        $logs[] = "[baseWrite 第{$writeCalls}轮] \$sendBuffer 已排空，立刻调用 offWritable()";
    }
};

$loop->onWritable($sock, $baseWrite);
$loop->onReadable($client, function ($c) use ($loop, &$received, &$logs): void {
    while (true) {
        $chunk = @fread($c, 65536);
        if ($chunk === '' || $chunk === false) break;
        $received += strlen($chunk);
    }
    if ($received >= 2 * 1024 * 1024) {
        $logs[] = "[接收完毕] 完整收到 " . number_format($received) . " bytes，且无任何空转！";
        $loop->offReadable($c);
        $loop->stop();
    }
});

$loop->run();
fclose($client);
fclose($sock);
fclose($server);

$snapshot = ['episode' => 'ep29', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
