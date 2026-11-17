<?php
declare(strict_types=1);

// 【加餐过渡】EP078B Fiber::getCurrent() 与 Coroutine::spawn()：协程在函数深处如何找到“自己”？
$outside = Fiber::getCurrent(); // 在普通主线程里调，返回 null

class MiniCoroutine
{
    public static function spawn(callable $fn): Fiber
    {
        $fiber = new Fiber($fn);
        $fiber->start();
        return $fiber;
    }
}

$capturedId = null;
$f = MiniCoroutine::spawn(function () use (&$capturedId): void {
    $me = Fiber::getCurrent(); // 在协程内任意深处都能拿到当前 Fiber 实例！
    $capturedId = spl_object_id($me);
    Fiber::suspend('PAUSED');
});

$logs = [
    '[主线程调用 Fiber::getCurrent()] => ' . ($outside === null ? 'null (不在任何协程内)' : 'Fiber'),
    '[Coroutine::spawn 内部] Fiber::getCurrent() 精准抓到自身对象 id=' . $capturedId . ' (与返回值同对象=' . ($capturedId === spl_object_id($f) ? 'true' : 'false') . ')',
];

$snapshot = ['episode' => 'ep78b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
