<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【踩坑】如果发完缓冲区后忘了调 offWritable()，stream_select 会陷入 CPU 100% 死循环！
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($w, false);

$loop = new SelectLoopWithRepeat();
$pending = "Hello\n";
$emptyTriggers = 0;

$loop->onWritable($w, function ($sock) use ($loop, &$pending, &$emptyTriggers): void {
    if ($pending !== '') {
        $n = (int)@fwrite($sock, $pending);
        $pending = substr($pending, $n);
        echo "[onWritable] 数据已写完，故意忘记调用 offWritable()...\n";
        return;
    }

    // 哪怕 $pending 已经是空的，只要不 offWritable，内核每微秒都疯狂叫醒！
    $emptyTriggers++;
    if ($emptyTriggers >= 50_000) {
        echo sprintf("[CPU 100%% 死循环实测] 缓冲区早已清空，onWritable 仍被狂刷 %s 次！赶紧 offWritable()\n", number_format($emptyTriggers));
        $loop->offWritable($sock);
        $loop->stop();
    }
});

$loop->run();
fclose($r);
fclose($w);
