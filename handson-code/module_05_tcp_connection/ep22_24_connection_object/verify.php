<?php
declare(strict_types=1);

require_once __DIR__ . '/TcpConnectionBase.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

$port = '19022';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$loop = new SelectLoopWithRepeat();
$logs = [];

$loop->onReadable($server, function ($srv) use ($loop, &$logs): void {
    $sock = @stream_socket_accept($srv, 0);
    if (!$sock) return;

    $conn = new TcpConnectionBase($sock, $loop);
    $conn->uid = 10086;
    $logs[] = sprintf('[连接创建] id=%d, uid=%d, status=%s, peer=%s', $conn->id, $conn->uid, $conn->status->value, $conn->getRemoteAddress());

    $conn->onMessage = function (TcpConnectionBase $c, string $data) use (&$logs): void {
        $logs[] = sprintf('[onMessage id=%d uid=%d] 收到: %s', $c->id, $c->uid, trim($data));
    };
    $conn->onClose = function (TcpConnectionBase $c) use (&$logs, $loop, $srv): void {
        $logs[] = sprintf('[onClose id=%d] status=%s (FD 与监听已清理)', $c->id, $c->status->value);
        $loop->offReadable($srv);
        $loop->stop();
    };
});

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
fwrite($client, "login user 10086\n");
usleep(50_000);
fclose($client);

$loop->run();
fclose($server);

$snapshot = ['episode' => 'ep22_24', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
