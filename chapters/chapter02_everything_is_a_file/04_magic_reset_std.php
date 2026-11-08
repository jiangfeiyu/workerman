<?php
fclose(STDOUT); // 1. 把 1 号座位上的屏幕赶走！
$log = fopen(__DIR__ . "/workerman.log", "w+"); // 2. 打开日志文件，它自动抢占了 1 号空座！

echo "【魔术见证】我明明写的是普通的 echo，但我没有出现在屏幕上，而是流进了 workerman.log！\n";
echo "不信你看我现在内核 1 号管子指着谁: " . @readlink("/proc/" . posix_getpid() . "/fd/1") . "\n";
