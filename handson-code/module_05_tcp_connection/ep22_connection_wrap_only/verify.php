<?php
declare(strict_types=1);

require_once __DIR__ . '/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

$port = '19022';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$loop = new SelectLoopWithRepeat();
$logs = [];

$loop->onReadable($server, function ($srv) use ($loop, &$logs): void {
    $sock = @stream_socket_accept($srv, 0);
    if (!$sock) return;

    $conn = new TcpConnection($sock, $loop);
    $conn->uid = 10086;
    $logs[] = "[连接创建] id={$conn->id}, uid={$conn->uid}";

    $conn->onMessage = function (TcpConnection $c, string $data) use (&$logs, $loop, $srv): void {
        $logs[] = "[onMessage id={$c->id} uid={$c->uid}] 收到: " . trim($data);
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

$snapshot = ['episode' => 'ep22', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
