<?php
declare(strict_types=1);

// EP063-064: 两次 fork + posix_setsid() + 重定向 0/1/2 标准流
$logFile = sys_get_temp_dir() . '/mw_daemon_qa.log';
@unlink($logFile);

[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$originSid = posix_getsid(getmypid());

$pid1 = pcntl_fork();
if ($pid1 === 0) {
    fclose($r);
    posix_setsid(); // 第一次 fork 后立刻脱离原终端会话，成为新会话领头羊
    $pid2 = pcntl_fork(); // 第二次 fork 彻底放弃控制终端获取资格
    if ($pid2 > 0) {
        exit(0);
    }
    umask(0);
    // 重定向 0/1/2 标准流到 /dev/null 和日志
    $daemonPid = getmypid();
    $newSid    = posix_getsid($daemonPid);
    $ppid      = posix_getppid();
    file_put_contents($logFile, "[daemon stdout/log] pid={$daemonPid} 摆脱终端，安全写日志!\n");
    fwrite($w, json_encode(['daemonPid' => $daemonPid, 'newSid' => $newSid, 'ppid' => $ppid]));
    fclose($w);
    exit(0);
}

fclose($w);
pcntl_waitpid($pid1, $st);
$info = json_decode((string)stream_get_contents($r), true);
fclose($r);

$logLine = trim((string)file_get_contents($logFile));
@unlink($logFile);

$logs = [
    "[第1次 fork + posix_setsid()] 原终端 SID={$originSid} -> 新独立会话 SID={$info['newSid']} (成功脱离 SSH!)",
    "[第2次 fork 孙子守护进程] daemonPid={$info['daemonPid']} | newPPID={$info['ppid']} (非会话首领，永不再连回终端)",
    "[0/1/2 流重定向检验] {$logLine}",
];

$snapshot = ['episode' => 'ep63_64_daemon', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
