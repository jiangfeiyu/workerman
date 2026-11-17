<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep28_33_tcp_connection/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】close($data) 等发完尾包再优雅断开 vs destroy() 强行拔线
$port = '19312';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
stream_set_blocking($client, false);
$sock = @stream_socket_accept($server, 1);

$loop = new SelectLoopWithRepeat();
$conn = new TcpConnection($sock, $loop);
$logs = [];

$tailMsg = str_repeat('Z', 1024 * 1024) . "|BYE_OK"; // 1MB + 告别尾标
$conn->onClose = function (TcpConnection $c) use (&$logs): void {
    $logs[] = "[服务端 onClose] 缓冲排空，状态切换为 {$c->status->value} 后安全销毁";
};

// 调用 close($tailMsg)：立刻进入 Closing 并关读留写
$conn->close($tailMsg);
$logs[] = "[调用 close()] 立即进入半关闭态 status={$conn->status->value}，继续等写缓冲排空";

$received = '';
$loop->onReadable($client, function ($c) use ($loop, &$received, &$logs): void {
    while (true) {
        $d = @fread($c, 65536);
        if ($d === '' || $d === false) {
            if (feof($c)) {
                $logs[] = "[客户端收齐断线] 总字节=" . strlen($received) . "，末尾=" . substr($received, -6);
                $loop->offReadable($c);
                $loop->stop();
            }
            return;
        }
        $received .= $d;
    }
});

$loop->run();
fclose($client);
fclose($server);

$snapshot = ['episode' => 'ep31', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
