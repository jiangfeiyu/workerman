<?php
declare(strict_types=1);

// 【独立验证】EP066 读取 master.pid 并解析 CLI 子命令映射信号
$pidFile = sys_get_temp_dir() . '/mw_ep66.pid';
file_put_contents($pidFile, (string)getmypid());
$masterPid = (int)file_get_contents($pidFile);

$cases = [
    ['start', '-d'],
    ['stop', '-g'],
    ['reload', ''],
    ['status', ''],
];
$logs = ["[读取 master.pid] 定位到后台 Master PID={$masterPid}"];

foreach ($cases as [$cmd, $flag]) {
    $action = match ($cmd) {
        'start' => 'daemon=' . ($flag === '-d' ? 'true' : 'false'),
        'stop' => 'posix_kill(' . $masterPid . ', ' . ($flag === '-g' ? 'SIGTERM' : 'SIGKILL') . ')',
        'reload' => "posix_kill({$masterPid}, SIGUSR1)",
        'status' => "posix_kill({$masterPid}, SIGUSR2)",
    };
    $logs[] = "[CLI: {$cmd} {$flag}] => {$action}";
}
@unlink($pidFile);

$snapshot = ['episode' => 'ep66', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
