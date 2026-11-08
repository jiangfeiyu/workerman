<?php
// 查看当前 Linux 允许一个进程最多打开多少根 FD 管子 (ulimit -n)
echo "当前进程允许打开的最大 FD 数量上限 (ulimit -n): " . trim(shell_exec("ulimit -n")) . "\n";

$files = [];
for ($i = 0; $i < 10; $i++) {
    $files[] = fopen("/dev/null", "r"); // 只打开不关闭，存进数组导致句柄泄漏！
}
echo "连续打开 10 个文件不关闭后，当前进程肚子里的 FD 总数已涨到: " . (count(scandir("/proc/" . posix_getpid() . "/fd")) - 2) . " 个！\n";
