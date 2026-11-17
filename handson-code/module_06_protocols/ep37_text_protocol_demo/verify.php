<?php
declare(strict_types=1);

require_once __DIR__ . '/ProtocolBufferPipeline.php';

$logs = [];
$pipeline = new ProtocolBufferPipeline(
    TextProtocol::class,
    function (mixed $msg) use (&$logs): void {
        $logs[] = '[onMessage 收到完整文本] ' . $msg;
    },
    function (\Throwable $e) use (&$logs): void {
        $logs[] = '[协议异常销毁] ' . $e->getMessage();
    },
);

$wire = TextProtocol::encode('alpha') . TextProtocol::encode('beta');
$pipeline->feed(substr($wire, 0, 8)); // 连第2条的前半截一起喂入
$logs[] = '[第1次喂入8字节] 切出 alpha，beta 半截留在缓冲里';
$pipeline->feed(substr($wire, 8));

$snapshot = ['episode' => 'ep37', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
