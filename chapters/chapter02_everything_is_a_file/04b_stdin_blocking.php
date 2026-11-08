<?php
// 2.8 【内功推导 6】读 0 号键盘文件：fread(STDIN, 1024) 为什么会让程序卡住不动？
$pid = posix_getpid();
echo "进程 (PID: $pid) 启动，准备从 0 号管子 (STDIN) 读取数据...\n";
echo "当前 0 号管子指向: " . @readlink("/proc/$pid/fd/0") . "\n";
echo "即将执行: fread(STDIN, 1024)...\n";

$start = microtime(true);
// 此时会陷入阻塞（Blocking）：等待内核缓冲区有数据
$input = fread(STDIN, 1024);
$cost = round(microtime(true) - $start, 3);

echo "🎉 拿到数据: [" . trim($input) . "]，共等待阻塞了 {$cost} 秒！\n";
echo "顿悟：在数据到来前，内核把进程移出 CPU，放入睡眠等待队列（STAT 为 S+，CPU 占用 0.0%）！\n";
