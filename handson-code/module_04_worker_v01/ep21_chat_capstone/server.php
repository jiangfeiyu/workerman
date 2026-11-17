<?php
declare(strict_types=1);

require_once __DIR__ . '/../Worker.php';

$port = getenv('PORT') ?: '9021';
$worker = new WorkerV01("tcp://127.0.0.1:{$port}");

$worker->onConnect = fn ($conn) => print('[聊天室] 上线 fd=' . (int)$conn . "\n");
$worker->onClose = fn ($conn) => print('[聊天室] 下线 fd=' . (int)$conn . "\n");
$worker->onMessage = function ($sender, string $msg) use ($worker): void {
    foreach ($worker->connections as $conn) {
        if ($conn !== $sender) {
            fwrite($conn, '[来自 fd=' . (int)$sender . '] ' . $msg);
        }
    }
};

echo "[聊天室] 第 1 篇合拢验收启动 tcp://127.0.0.1:{$port}\n";
$worker->start();
