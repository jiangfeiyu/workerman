<?php
$pid = posix_getpid();
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd !== '.' && $fd !== '..') {
        echo "管子编号 FD [$fd] ---> 指向: " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}
