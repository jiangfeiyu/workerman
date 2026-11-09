<?php
$pid = posix_getpid();
$pid = posix_getpid();
echo "当前进程 PID: $pid\n";
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd !== '.' && $fd !== '..') {
        echo "管子编号 FD [$fd] ---> 指向: " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}

$a = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

sleep(100);
