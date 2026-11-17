<?php
declare(strict_types=1);

// EP077-078: Fiber 跨多层函数栈冻结 + 双向传值接力
function deepQuery(): string
{
    // 比 Generator 强的地方：在 3 层嵌套普通函数里也能直接 suspend 冻结整条调用栈！
    $row = Fiber::suspend('WAIT_DB_ROW');
    return "GOT: {$row}";
}

function serviceLayer(): string
{
    return deepQuery();
}

$fiber = new Fiber(function (): string {
    $res = serviceLayer();
    return "FINAL => {$res}";
});

$logs = [];
$signal = $fiber->start();
$logs[] = "[EP077 · 深层栈冻结] start() 停在 3 层调用栈内并抛出信号: {$signal} (isSuspended=" . ($fiber->isSuspended() ? 'true' : 'false') . ')';

$fiber->resume('user#42');
$logs[] = '[EP078 · 双向传值接力] resume("user#42") 唤醒深层函数并返回: ' . $fiber->getReturn();

$snapshot = ['episode' => 'ep77_78_fiber', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
