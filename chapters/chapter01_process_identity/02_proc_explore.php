<?php
cli_set_process_title("modern-worker: master");
$pid = posix_getpid();

echo "1. 进程改名后，/proc/$pid/cmdline 的内容是: " . file_get_contents("/proc/$pid/cmdline") . "\n\n";
echo "2. /proc/$pid/status 里的户口本前 6 行:\n";
$lines = array_slice(file("/proc/$pid/status"), 0, 6);
echo implode("", $lines);
