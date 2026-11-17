<?php
declare(strict_types=1);

require_once __DIR__ . '/../http/HttpProtocol.php';

// 【独立验证】EP044 HttpProtocol::decode() 拆出只读 Request 对象
$raw = "POST /api/login?from=web HTTP/1.1\r\nHost: localhost\r\nContent-Length: 11\r\n\r\nuser=modern";
$req = HttpProtocol::decode($raw);

$logs = [
    "[Method & Path] method={$req->method}, path={$req->path}",
    '[Query & Body] from=' . ($req->query['from'] ?? '') . ', body=' . $req->body,
    '[Header 小写化] host=' . $req->header('Host'),
];

$snapshot = ['episode' => 'ep44', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
