<?php
declare(strict_types=1);

require_once __DIR__ . '/../Worker.php';

$port = getenv('PORT') ?: '9019';
$worker = new WorkerV01("tcp://127.0.0.1:{$port}");

$worker->onConnect = function ($conn): void {
    echo "[onConnect] 欢迎客人 fd=" . (int)$conn . "\n";
    fwrite($conn, "Welcome fd=" . (int)$conn . "\n");
};

$worker->onMessage = function ($conn, string $msg): void {
    echo "[onMessage] fd=" . (int)$conn . " 说: " . trim($msg) . "\n";
    fwrite($conn, "Got: " . $msg);
};

$worker->onClose = function ($conn): void {
    echo "[onClose] 送别客人 fd=" . (int)$conn . "\n";
};

echo "[WorkerV01] 三大生命周期钩子就位 tcp://127.0.0.1:{$port}\n";
$worker->start();
