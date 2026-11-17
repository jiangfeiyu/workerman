<?php
declare(strict_types=1);

require_once __DIR__ . '/HttpProtocol.php';

$logs = [];

// 1. 半包 POST 报文测试（Content-Length: 11，但 body 只到了前 5 字节）
$postFull = "POST /api/login?from=web HTTP/1.1\r\nHost: localhost\r\nContent-Length: 11\r\n\r\nuser=modern";
$halfPost = substr($postFull, 0, strlen($postFull) - 6);
$logs[] = '[POST 半包阶段] input() = ' . HttpProtocol::input($halfPost) . ' (继续等待剩下 6 字节)';

$len = HttpProtocol::input($postFull);
$req = HttpProtocol::decode(substr($postFull, 0, $len));
$logs[] = sprintf('[POST 收齐解码] method=%s path=%s from=%s body=%s', $req->method, $req->path, $req->query['from'], $req->body);

// 2. Keep-Alive 长连接连续切分两条请求 + Response JSON 编码
$getReq = "GET /ping HTTP/1.1\r\nHost: localhost\r\nConnection: keep-alive\r\n\r\n";
$pipelined = $getReq . "GET /bye HTTP/1.1\r\nConnection: close\r\n\r\n";
$count = 0;
while (($l = HttpProtocol::input($pipelined)) > 0) {
    $count++;
    $r = HttpProtocol::decode(substr($pipelined, 0, $l));
    $pipelined = substr($pipelined, $l);
    $logs[] = sprintf('[Keep-Alive 第%d包] %s %s keepAlive=%s', $count, $r->method, $r->path, $r->isKeepAlive() ? 'true' : 'false');
}

$encodedResp = HttpProtocol::encode(Response::json(['ok' => true, 'engine' => 'ModernWorker']));
$logs[] = '[HTTP 响应头首行] ' . strtok($encodedResp, "\r\n");

$snapshot = ['episode' => 'ep41_46', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
