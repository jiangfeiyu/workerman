<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立真实验证】EP070 优雅停机 stop -g：$isStopping=true 防死循环拉起 + offReadable + 等发送排空 + stop()
pcntl_async_signals(true);
$isStopping = false;
$logs = [];

$loop = new SelectLoopWithRepeat();
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($r, false);
stream_set_blocking($w, false);

$pending = str_repeat('G', 1024);
$loop->onWritable($w, function ($pipe) use ($loop, &$pending, &$logs): void {
    $n = (int)@fwrite($pipe, $pending);
    if ($n > 0) $pending = substr($pending, $n);
    if ($pending === '') {
        $loop->offWritable($pipe);
        $logs[] = '[Worker] 待发队列已排空 (pending=0) → 调用 $loop->stop() 安全退场!';
        $loop->stop();
    }
});

// 模拟收到 SIGTERM (stop -g)
$isStopping = true;
$logs[] = '[Master/Worker 收到 stop -g] $isStopping=true (锁死自愈开关) + offReadable 停止接新客';
$loop->onReadable($r, function ($pipe) use ($loop): void {
    @fread($pipe, 4096);
    $loop->offReadable($pipe);
});
$loop->run();

fclose($r);
fclose($w);

$snapshot = ['episode' => 'ep70', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
