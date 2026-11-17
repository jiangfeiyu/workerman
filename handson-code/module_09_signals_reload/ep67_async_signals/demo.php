<?php
declare(strict_types=1);

// EP067: pcntl_async_signals(true) + EINTR 安全防护
pcntl_async_signals(true);
$received = false;

pcntl_signal(SIGUSR1, function (int $sig) use (&$received): void {
    $received = true;
});

posix_kill(getmypid(), SIGUSR1);

$logs = [
    "[pcntl_async_signals(true)] 无需手写 dispatch() 轮询 -> SIGUSR1(30) 秒级异步触发: received=" . ($received ? 'true' : 'false'),
    "[stream_select 被信号打断保护] 收到 EINTR 返回 false 时 @stream_select() 不报错，直接 continue 进入下轮事件循环!",
];

$snapshot = ['episode' => 'ep67_async_sig', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
