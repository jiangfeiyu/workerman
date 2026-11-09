<?php
cli_set_process_title("modern-worker: master");
echo "我的身份证号 (PID) 是: " . posix_getpid() . "\n";
echo "我老爹的身份证号 (PPID) 是: " . posix_getppid() . "\n";
sleep(15);
cli_set_process_title("modern-worker: master (done)");
sleep(15);
