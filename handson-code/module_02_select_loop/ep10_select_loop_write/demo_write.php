<?php
declare(strict_types=1);

require_once __DIR__ . '/SelectLoop.php';

[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($r, false);
stream_set_blocking($w, false);

$loop = new SelectLoop();
$ticks = 0;

$loop->onWritable($w, function ($pipe) use ($loop, &$ticks): void {
    $ticks++;
    if ($ticks === 1) {
        fwrite($pipe, "async-write-chunk\n");
        echo "[第1次 onWritable] 写入数据完毕 (暂不卸载，看看下一轮会怎样)\n";
        return;
    }
    echo "[第2次 onWritable] 警告！没数据要写但内核还是立刻触发了可写事件！赶紧 offWritable\n";
    $loop->offWritable($pipe);
});

$loop->onReadable($r, function ($pipe) use ($loop): void {
    echo "[onReadable] 收到: " . trim((string)fgets($pipe)) . "\n";
    $loop->offReadable($pipe);
});

$loop->run();
