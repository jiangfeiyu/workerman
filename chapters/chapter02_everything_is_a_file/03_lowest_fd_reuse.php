<?php
$pid = posix_getpid();
$f1 = fopen("/tmp/a.txt", "w+");
$f2 = fopen("/tmp/b.txt", "w+");
echo "=== 第一步：打开 a.txt 和 b.txt 后，看内核 /proc/$pid/fd 里的真实号码牌 ===\n";
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd >= 3) echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
}

fclose($f1); // 关掉 a.txt，3号位置空出来了！
$f3 = fopen("/tmp/c.txt", "w+");
echo "\n=== 第二步：关掉 a.txt 再打开 c.txt 后，看 c.txt 抢到了几号座位 ===\n";
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd >= 3) echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
}
