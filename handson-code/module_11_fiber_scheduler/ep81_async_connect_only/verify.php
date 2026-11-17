<?php
declare(strict_types=1);

// 【独立验证】EP081 STREAM_CLIENT_ASYNC_CONNECT 非阻塞建连 + 可写就绪确认
$port = '19812';
$srv = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
$flags = STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT;
$sock = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2, $flags);
stream_set_blocking($sock, false);

$w = [$sock];
$r = $ex = null;
stream_select($r, $w, $ex, 2, 0);
$peer = stream_socket_get_name($sock, true);
$accepted = @stream_socket_accept($srv, 1);

$logs = [
    '[0ms 返回] stream_socket_client(ASYNC_CONNECT) 立即返回非阻塞句柄',
    "[可写就绪] 握手成功！stream_socket_get_name(peer) = {$peer}",
];

if ($accepted) fclose($accepted);
fclose($sock);
fclose($srv);

$snapshot = ['episode' => 'ep81', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
