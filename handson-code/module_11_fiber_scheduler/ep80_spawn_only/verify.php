<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】EP080 框架在 onMessage 入口自动包入 Coroutine::spawn()，业务同步写法并发执行
$loop = new SelectLoopWithRepeat();
$logs = [];

$spawn = static function (callable $fn): void {
    (new Fiber($fn))->start();
};

$onMessage = function (string $req) use ($loop, $spawn, &$logs): void {
    $spawn(function () use ($req, $loop, &$logs): void {
        $fiber = Fiber::getCurrent();
        $delay = $req === 'REQ_A' ? 0.04 : 0.01;
        $loop->delay($delay, static fn () => $fiber->resume("OK:{$req}"));
        $res = Fiber::suspend(); // 业务代码看似同步顺序执行！
        $logs[] = "[{$req} 协程返回] 同步拿到 {$res}";
    });
};

$onMessage('REQ_A');
$onMessage('REQ_B');
$loop->run();

$snapshot = ['episode' => 'ep80', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
