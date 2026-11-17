<?php
declare(strict_types=1);

// 【加餐过渡】为什么老代码信号没反应，开启 pcntl_async_signals(true) 立刻秒响应？
$hitWithoutAsync = false;
$hitWithAsync = false;

pcntl_signal(SIGUSR1, function () use (&$hitWithoutAsync): void {
    $hitWithoutAsync = true;
});
posix_kill(getmypid(), SIGUSR1);
$beforeDispatch = $hitWithoutAsync; // false！因为没调 dispatch() 且没开异步！
pcntl_signal_dispatch();
$afterDispatch = $hitWithoutAsync;  // true！

// 开启 PHP 7.1+ 异步信号后：
pcntl_async_signals(true);
pcntl_signal(SIGUSR2, function () use (&$hitWithAsync): void {
    $hitWithAsync = true;
});
posix_kill(getmypid(), SIGUSR2);

$logs = [
    '[未开 async_signals] 发信号后立刻检查 => hit=' . ($beforeDispatch ? 'true' : 'false') . ' (必须手调 dispatch 才触发!)',
    '[手调 dispatch() 后] hit=' . ($afterDispatch ? 'true' : 'false'),
    '[开启 async_signals(true)] 发 SIGUSR2 后无需轮询，当场触发 hit=' . ($hitWithAsync ? 'true' : 'false') . '!',
];
$snapshot = ['episode' => 'ep66b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
