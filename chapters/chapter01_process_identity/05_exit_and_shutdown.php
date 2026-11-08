<?php
register_shutdown_function(function () {
    $err = error_get_last();
    echo "[临终遗言] 进程 (PID=" . posix_getpid() . ") 即将咽气！最后错误: " . ($err['message'] ?? '无致命错误，主动退出') . "\n";
});

echo "进程正在干活，突然决定带着状态码 250 退出...\n";
exit(250);
