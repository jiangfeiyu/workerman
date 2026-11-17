<?php
declare(strict_types=1);

// 【独立验证】EP064 关闭 0/1/2 标准流并按最小空闲 FD 规律重定向到黑洞和日志
$logFile = sys_get_temp_dir() . '/mw_ep64_test.log';
@unlink($logFile);

$pid = pcntl_fork();
if ($pid === 0) {
    @fclose(STDIN);
    @fclose(STDOUT);
    @fclose(STDERR);

    $fd0 = fopen('/dev/null', 'r');
    $fd1 = fopen($logFile, 'a');
    $fd2 = fopen($logFile, 'a');

    echo "[STDOUT 重定向] echo 不会报错也不会卡 SSH，已自动落入日志!\n";
    file_put_contents('php://stderr', "[STDERR 重定向] php://stderr 同样稳稳落入日志!\n");
    fclose($fd0);
    fclose($fd1);
    fclose($fd2);
    exit(0);
}
pcntl_waitpid($pid, $status);

$lines = array_values(array_filter(explode("\n", trim((string)@file_get_contents($logFile)))));
@unlink($logFile);

$logs = array_merge(
    ['[关闭原 0/1/2 后依次重开] FD#0=/dev/null | FD#1=log | FD#2=log'],
    $lines
);
$snapshot = ['episode' => 'ep64', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
