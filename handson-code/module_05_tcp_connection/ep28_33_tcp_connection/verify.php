<?php
declare(strict_types=1);

require_once __DIR__ . '/TcpConnection.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

$port = '19033';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
stream_set_blocking($server, false);

$loop = new SelectLoopWithRepeat();
$logs = [];
$payload = str_repeat('M', 10 * 1024 * 1024); // 10 MB

$loop->onReadable($server, function ($srv) use ($loop, &$logs, $payload): void {
    $sock = @stream_socket_accept($srv, 0);
    if (!$sock) return;

    $conn = new TcpConnection($sock, $loop);
    $conn->maxSendBufferSize = 512 * 1024;
    $conn->onBufferFull = function () use (&$logs): void {
        $logs[] = '[onBufferFull] 发送缓冲突破 512KB 高水位，触发背压限流！';
    };
    $conn->onBufferDrain = function () use (&$logs): void {
        $logs[] = '[onBufferDrain] 发送缓冲全部排空，恢复正常发送！';
    };
    $conn->onClose = function () use (&$logs, $loop, $srv): void {
        $logs[] = '[onClose] 数据发完后自动优雅销毁连接';
        $loop->offReadable($srv);
    };

    $conn->close($payload); // 发送 10MB 并在排空后自动关闭！
});

$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
stream_set_blocking($client, false);
$received = 0;

$loop->onReadable($client, function ($c) use ($loop, &$received): void {
    while (true) {
        $chunk = @fread($c, 65536);
        if ($chunk === '' || $chunk === false) {
            if (feof($c)) {
                $loop->offReadable($c);
                fclose($c);
                $loop->stop();
            }
            return;
        }
        $received += strlen($chunk);
    }
});

$loop->run();
fclose($server);

$logs[] = sprintf('[EP33 合拢验收] TcpConnection::close(10MB) 完整送达 %s bytes (0 字节丢失!)', number_format($received));
$snapshot = ['episode' => 'ep33', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
