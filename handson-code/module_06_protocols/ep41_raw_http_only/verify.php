<?php
declare(strict_types=1);

// 【独立验证】EP041 原生 HTTP 请求报文四段结构解剖
$rawHttp = "POST /api/login?from=web HTTP/1.1\r\n"
    . "Host: localhost:8080\r\n"
    . "Content-Length: 11\r\n"
    . "\r\n"
    . "user=modern";

$sepPos = (int)strpos($rawHttp, "\r\n\r\n");
$headerPart = substr($rawHttp, 0, $sepPos);
$bodyPart = substr($rawHttp, $sepPos + 4);
$lines = explode("\r\n", $headerPart);

$logs = [
    '[1. 请求行] ' . $lines[0],
    '[2. Headers 行数] ' . (count($lines) - 1) . ' 行 (以 \\r\\n 分隔)',
    "[3. 空行分隔符] \\r\\n\\r\\n 出现在偏移 {$sepPos} (占 4 字节)",
    '[4. Body 正文] ' . $bodyPart . ' (共 ' . strlen($bodyPart) . ' 字节)',
];

$snapshot = ['episode' => 'ep41', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
