<?php
// 2.3 【内功魔术】终端屏幕只是个文件，隔空往进程的 1 号管子倒水！
$pid = posix_getpid();
$screen = @readlink("/proc/$pid/fd/1");

echo "我是进程 A (PID: $pid)！\n";
echo "我的 1 号管子 (STDOUT) 真实连接的硬件屏幕是: $screen\n";
echo "我马上要闭嘴睡觉 2 秒钟（这段时间我不会执行任何 echo）...\n\n";

sleep(2);

echo "\n我是进程 A，我睡醒了，刚才屏幕上是不是凭空冒出了字？\n";
