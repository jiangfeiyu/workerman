<?php
declare(strict_types=1);

$port = getenv('PORT') ?: '9007';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);

// 【过渡】不建类，用 $readFds + $readCallbacks 两张表消灭 while 里的 if ($fd === $server)！
$readFds = [];
$readCallbacks = [];

function watchRead($stream, callable $cb): void
{
    global $readFds, $readCallbacks;
    $id = (int)$stream;
    $readFds[$id] = $stream;
    $readCallbacks[$id] = $cb;
}

function unwatchRead($stream): void
{
    global $readFds, $readCallbacks;
    $id = (int)$stream;
    unset($readFds[$id], $readCallbacks[$id]);
}

// 1. 先平铺写好“客人说话回调”（不嵌套在迎客逻辑里！）
$onClientRead = function ($client): void {
    $data = @fread($client, 1024);
    if ($data === '' || $data === false) {
        echo "[Server] 客人离开 fd=" . (int)$client . "\n";
        unwatchRead($client);
        fclose($client);
        return;
    }
    fwrite($client, "Echo[cb]: " . $data);
};

// 2. 再写“门卫迎客回调”，收到新客后把上面的 $onClientRead 绑给它
$onAccept = function ($srv) use ($onClientRead): void {
    $conn = @stream_socket_accept($srv, 0);
    if (!$conn) {
        return;
    }
    stream_set_blocking($conn, false);
    echo "[Server] 新客入座 fd=" . (int)$conn . "\n";
    watchRead($conn, $onClientRead);
};

watchRead($server, $onAccept);
echo "[Server] 回调表驱动服务器已启动 tcp://127.0.0.1:{$port}\n";

// 3. 主循环缩水成 6 行纯调度逻辑，彻底解耦！
while (true) {
    $read = $readFds;
    $write = $except = null;
    if (@stream_select($read, $write, $except, null) <= 0) {
        continue;
    }
    foreach ($read as $fd) {
        $cb = $readCallbacks[(int)$fd] ?? null;
        if ($cb) {
            $cb($fd);
        }
    }
}
