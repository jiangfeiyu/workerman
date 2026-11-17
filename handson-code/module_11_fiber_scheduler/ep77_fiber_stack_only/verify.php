<?php
declare(strict_types=1);

// 【独立验证】EP077 Fiber 在 3 层普通函数深处直接 suspend 冻结整条调用栈
function deepQuery(): string
{
    $row = Fiber::suspend('WAIT_DB_ROW');
    return "GOT: {$row}";
}

function serviceLayer(): string
{
    return deepQuery();
}

$fiber = new Fiber(fn () => 'FINAL => ' . serviceLayer());
$signal = $fiber->start();

$logs = [
    "[深层栈冻结] start() 停在 3 层调用栈内并抛出信号: {$signal}",
    '[状态检验] isSuspended=' . ($fiber->isSuspended() ? 'true' : 'false') . ' | isTerminated=' . ($fiber->isTerminated() ? 'true' : 'false'),
];

$snapshot = ['episode' => 'ep77', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
