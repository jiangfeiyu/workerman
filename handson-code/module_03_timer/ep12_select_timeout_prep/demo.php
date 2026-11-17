<?php
declare(strict_types=1);

// 【铺垫】即使没有任何 FD 就绪，stream_select 的第 4 参数也能让进程按指定微秒精准醒来！
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

$t0 = microtime(true);
$read = [$r];
$write = $except = null;

// 传入 0 秒 + 200_000 微秒 (= 0.2 秒)
$count = @stream_select($read, $write, $except, 0, 200_000);
$elapsedMs = round((microtime(true) - $t0) * 1000, 1);

echo "[select 超时唤醒] 就绪数 = {$count}, 实际睡眠 = {$elapsedMs} ms (精准度极高，且期间 0% CPU！)\n";
