<?php
declare(strict_types=1);

require_once __DIR__ . '/../Worker.php';

$port = getenv('PORT') ?: '9018';
$worker = new WorkerV01("tcp://127.0.0.1:{$port}");

// EP18：先把底层的 stream_socket_server + SelectLoop 收进 Worker 类里
$worker->onMessage = function ($conn, string $msg): void {
    fwrite($conn, "WorkerV01 Echo: " . $msg);
};

echo "[WorkerV01] 最小封装启动 tcp://127.0.0.1:{$port}\n";
$worker->start();
