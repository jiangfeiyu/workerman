<?php
declare(strict_types=1);

require_once __DIR__ . '/../Worker.php';

$port = getenv('PORT') ?: '9020';
$worker = new WorkerV01("tcp://127.0.0.1:{$port}");

$worker->onMessage = function ($conn, string $msg): void {
    if (str_contains($msg, 'boom')) {
        throw new \RuntimeException('业务代码故意抛出的异常！');
    }
    fwrite($conn, "OK: " . $msg);
};

echo "[Worker] 异常兜底服务器启动 tcp://127.0.0.1:{$port}\n";
$worker->start();
