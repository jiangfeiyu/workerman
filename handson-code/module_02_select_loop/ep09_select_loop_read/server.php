<?php
declare(strict_types=1);

require_once __DIR__ . '/SelectLoop.php';

$port = getenv('PORT') ?: '9009';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);

$loop = new SelectLoop();

$loop->onReadable($server, function ($srv) use ($loop): void {
    $conn = @stream_socket_accept($srv, 0);
    if (!$conn) {
        return;
    }
    stream_set_blocking($conn, false);
    echo "[SelectLoop] 迎入新客人 fd=" . (int)$conn . "\n";

    $loop->onReadable($conn, function ($client) use ($loop): void {
        $data = @fread($client, 1024);
        if ($data === '' || $data === false) {
            echo "[SelectLoop] 客人离开 fd=" . (int)$client . "\n";
            $loop->offReadable($client);
            fclose($client);
            return;
        }
        fwrite($client, "Echo[SelectLoop]: " . $data);
    });
});

echo "[SelectLoop] 读监听引擎启动 tcp://127.0.0.1:{$port}\n";
$loop->run();
