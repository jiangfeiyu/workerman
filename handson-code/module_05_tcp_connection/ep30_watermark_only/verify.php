<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep28_33_tcp_connection/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】高水位线防重触发 onBufferFull + 排空恢复 onBufferDrain
$port = '19302';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
stream_set_blocking($client, false);
$sock = @stream_socket_accept($server, 1);

$loop = new SelectLoopWithRepeat();
$conn = new TcpConnection($sock, $loop);
$conn->maxSendBufferSize = 512 * 1024;
$fullCount = 0;
$logs = [];

$conn->onBufferFull = function () use (&$fullCount, &$logs): void {
    $fullCount++;
    $logs[] = "[onBufferFull 第{$fullCount}次] 水位突破 512KB (布尔锁防重复报警)";
};
$conn->onBufferDrain = function () use (&$logs, $loop, $client): void {
    $logs[] = "[onBufferDrain] 发送缓冲彻底排空，触发绿灯恢复！";
    $loop->offReadable($client);
    $loop->stop();
};

// 连发 3 个 400KB 大包，测试只报 1 次 onBufferFull
$chunk = str_repeat('P', 400 * 1024);
$conn->send($chunk);
$conn->send($chunk);
$conn->send($chunk);
$logs[] = "[统计] 连发 1.2MB 后 onBufferFull 触发次数 = {$fullCount}";

$loop->onReadable($client, function ($c): void {
    while (true) {
        $d = @fread($c, 65536);
        if ($d === '' || $d === false) break;
    }
});

$loop->run();
fclose($client);
fclose($server);

$snapshot = ['episode' => 'ep30', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
