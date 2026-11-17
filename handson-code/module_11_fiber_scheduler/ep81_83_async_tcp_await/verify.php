<?php
declare(strict_types=1);

// EP081-083: STREAM_CLIENT_ASYNC_CONNECT + AsyncTcpClient::await() 协程化实测
$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr   = stream_socket_get_name($server, false);

$pid = pcntl_fork();
if ($pid === 0) {
    $c = stream_socket_accept($server, 2);
    if ($c) {
        $req = fread($c, 1024);
        fwrite($c, 'PONG:' . trim((string)$req));
        fclose($c);
    }
    fclose($server);
    exit(0);
}
fclose($server);

function awaitAsyncRequest(string $addr, string $payload): string
{
    $flags = STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT;
    $sock = stream_socket_client("tcp://{$addr}", $errno, $errstr, 2, $flags);
    stream_set_blocking($sock, false);

    // 等待可写就绪即完成 TCP 异步三次握手
    $r = $e = null;
    $w = [$sock];
    stream_select($r, $w, $e, 2, 0);
    $peer = stream_socket_get_name($sock, true);

    fwrite($sock, $payload . "\n");
    $r = [$sock];
    $w = $e = null;
    stream_select($r, $w, $e, 2, 0);
    $resp = (string)fread($sock, 1024);
    fclose($sock);
    return "{$peer}|{$resp}";
}

$logs = [];
$fiber = new Fiber(function () use ($addr): string {
    $res = awaitAsyncRequest($addr, 'hello-fiber');
    return Fiber::suspend($res);
});
$out = $fiber->start();
pcntl_waitpid($pid, $st);

[$peer, $reply] = explode('|', (string)$out, 2);
$logs[] = "[EP081 · ASYNC_CONNECT 握手成功] stream_socket_get_name(peer) = {$peer}";
$logs[] = "[EP082-083 · AsyncTcpClient::await()] 同步代码风格拿到异步回包 => {$reply}";

$snapshot = ['episode' => 'ep81_83_async_tcp', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
