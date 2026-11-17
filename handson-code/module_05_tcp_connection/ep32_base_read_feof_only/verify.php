<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep28_33_tcp_connection/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】baseRead() 循环读空 200KB + feof() 精准区分“读空”和“真断开”
$port = '19322';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$loop = new SelectLoopWithRepeat();
$totalRead = 0;
$chunks = 0;
$logs = [];

$loop->onReadable($server, function ($srv) use ($loop, &$totalRead, &$chunks, &$logs): void {
    $sock = @stream_socket_accept($srv, 0);
    if (!$sock) return;
    $conn = new TcpConnection($sock, $loop);
    $conn->onMessage = function (TcpConnection $c, string $data) use (&$totalRead, &$chunks): void {
        $chunks++;
        $totalRead += strlen($data);
    };
    $conn->onClose = function (TcpConnection $c) use (&$logs, &$totalRead, &$chunks, $loop, $srv): void {
        $logs[] = "[onClose] 客户端真断开了 (feof===true)，累计读完 {$totalRead} B (分 {$chunks} 块)";
        $loop->offReadable($srv);
        $loop->stop();
    };
});

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
fwrite($client, str_repeat('R', 200 * 1024));
$loop->delay(0.06, function () use (&$logs, &$totalRead, $client): void {
    $logs[] = "[60ms 巡检] 200KB 已读完 ({$totalRead} B)，feof=false 连接依然稳稳存活！";
    fclose($client); // 现在才真正关闭客户端
});

$loop->run();
fclose($server);

$snapshot = ['episode' => 'ep32', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
