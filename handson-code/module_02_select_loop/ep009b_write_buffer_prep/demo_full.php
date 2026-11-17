<?php
declare(strict_types=1);

// 【加餐过渡】10 行代码亲手塞满内核写缓冲区！看懂“发件柜”和为什么平时一直“可写”
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
stream_set_blocking($r, false);
stream_set_blocking($w, false);

$chunk = str_repeat('A', 4096); // 每次尝试塞 4KB
$totalSent = 0;

for ($i = 1; $i <= 50; $i++) {
    $written = @fwrite($w, $chunk);
    if ($written === 0 || $written === false) {
        echo "[第{$i}次] fwrite 返回 0！内核发送缓冲区已塞满（累计={$totalSent} 字节）\n";
        break;
    }
    $totalSent += $written;
}

// 另一端读走 8KB，发件柜立刻腾出空位
$drained = fread($r, 8192);
echo "[收件端读走] " . strlen($drained) . " 字节，发件柜腾出空位！\n";

$retry = @fwrite($w, $chunk);
echo "[再次 fwrite] 成功塞入 {$retry} 字节！\n";
