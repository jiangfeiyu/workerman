<?php
declare(strict_types=1);

require_once __DIR__ . '/../ProtocolInterface.php';

// 【独立验证】验证 ProtocolInterface 三大静态契约（不剧透 TextProtocol）
$ref = new ReflectionClass(ProtocolInterface::class);
$methods = array_map(fn ($m) => $m->getName() . ($m->isStatic() ? ' (static)' : ''), $ref->getMethods());

$logs = [
    '[接口契约校验] ProtocolInterface 方法: ' . implode(' | ', $methods),
    '[返回值约定] input() => 0(半包继续等) | >0(完整包字节数)',
];

$snapshot = ['episode' => 'ep36', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
