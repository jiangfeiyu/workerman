<?php
declare(strict_types=1);

require_once __DIR__ . '/SelectLoop.php';

$loop = new SelectLoop();
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($r, false);
stream_set_blocking($w, false);

$logs = [];
$loop->onWritable($w, function ($pipe) use ($loop, &$logs): void {
    fwrite($pipe, "write event ready!\n");
    $logs[] = '[onWritable] 管道可写并完成写入，立刻 offWritable 防止空转';
    $loop->offWritable($pipe);
});

$loop->onReadable($r, function ($pipe) use ($loop, &$logs): void {
    $msg = trim((string)fgets($pipe));
    $logs[] = "[onReadable] 收到: {$msg} -> 调用 loop->stop() 安全退出";
    $loop->offReadable($pipe);
    $loop->stop();
});

$loop->run();
$logs[] = '[run() 返回] SelectLoop 已优雅退出';

$snapshot = ['episode' => 'ep11', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
