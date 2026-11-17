<?php
declare(strict_types=1);

// 用本地成对 Socket 管道模拟：不碰网络也能 10 秒看懂 stream_select 传引用陷阱
[$r1, $w1] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
[$r2, $w2] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

$allFds = ['pipe1' => $r1, 'pipe2' => $r2];
fwrite($w1, "hello-1\n");

// ❌ 错误写法：直接把 $allFds 传给 stream_select
$badPool = $allFds;
$write = $except = null;
stream_select($badPool, $write, $except, 1);
echo "[第1轮后] badPool 剩下的键: " . implode(', ', array_keys($badPool)) . "\n";

// 如果忘记恢复数组，第2轮再去等 pipe2 的消息，pipe2 已经被内核从数组里删掉了！
fwrite($w2, "hello-2\n");
$count = stream_select($badPool, $write, $except, 0, 100_000);
echo "[第2轮误用被改写的数组] 就绪数量 = {$count} (pipe2 彻底失联！)\n";

// ✅ 正确写法：每次都拷贝一份临时数组 $read = $allFds
$read = $allFds;
$countOk = stream_select($read, $write, $except, 0, 100_000);
echo "[第2轮拷贝新数组 \$read = \$allFds] 就绪数量 = {$countOk}, 键 = " . implode(', ', array_keys($read)) . "\n";
echo "[读取 pipe2] " . trim((string)fgets($read['pipe2'])) . "\n";
