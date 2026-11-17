<?php
declare(strict_types=1);

// EP110: 生产级兜底：Throwable 全局隔离捕获、JSON 结构化日志与 systemd 配置校验
$logs = [];
$processedOk = 0;

$handleReq = static function (array $req) use (&$processedOk): void {
    if (($req['bad'] ?? false) === true) {
        throw new \RuntimeException('Malformed danmaku payload');
    }
    $processedOk++;
};

foreach ([
    ['traceId' => 'tr-101', 'room' => 'live-101', 'bad' => true],
    ['traceId' => 'tr-102', 'room' => 'live-101', 'bad' => false],
] as $req) {
    try {
        $handleReq($req);
    } catch (\Throwable $e) {
        $logs[] = json_encode(['level' => 'ERR', 'traceId' => $req['traceId'], 'msg' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
    }
}

$systemdUnit = <<<UNIT
[Service]
ExecStart=/usr/bin/php /opt/app/server.php start
ExecReload=/usr/bin/php /opt/app/server.php reload
Restart=always
LimitNOFILE=1048576
UNIT;

$hasReload = str_contains($systemdUnit, 'ExecReload=') && str_contains($systemdUnit, 'LimitNOFILE=1048576');

$snapshot = [
    'episode' => 'ep110',
    'output'  => [
        "[Throwable 兜底日志] {$logs[0]} | 后续正常请求仍继续处理={$processedOk}",
        '[systemd 配置校验] Restart=always & LimitNOFILE=1048576 & ExecReload 就绪=' . ($hasReload ? 'true' : 'false'),
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
