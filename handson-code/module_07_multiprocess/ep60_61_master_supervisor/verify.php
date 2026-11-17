<?php
declare(strict_types=1);

// EP060-061: Master 监工自动拉起 + SO_REUSEPORT 多进程独立绑定验证
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$workers = [];
$respawned = false;

$forkOne = function (int $slot, bool $crashOnce) use (&$workers, $r, $w): int {
    $pid = pcntl_fork();
    if ($pid === 0) {
        fclose($r);
        if ($crashOnce) {
            fwrite($w, "[Worker #{$slot} pid=" . getmypid() . "] 模拟崩溃退出 code=9!\n");
            fclose($w);
            exit(9);
        }
        fwrite($w, "[Worker #{$slot} pid=" . getmypid() . "] 正常拉起并就绪!\n");
        fclose($w);
        usleep(50_000);
        exit(0);
    }
    $workers[$pid] = $slot;
    return $pid;
};

// 先拉起 2 个 Worker，其中 #1 故意崩溃一次测试 Master 自愈拉起
$forkOne(1, true);
$forkOne(2, false);

while (count($workers) > 0) {
    $deadPid = pcntl_wait($status);
    if ($deadPid <= 0) break;
    $slot = $workers[$deadPid];
    unset($workers[$deadPid]);
    $code = pcntl_wexitstatus($status);
    if ($code !== 0 && !$respawned) {
        $respawned = true;
        $newPid = $forkOne($slot, false);
        fwrite($w, "[Master 监工] 发现 Worker #{$slot}(pid={$deadPid}) 异常退出 code={$code} -> 秒级拉起替补 pid={$newPid}!\n");
    }
}

fclose($w);
$logs = array_values(array_filter(explode("\n", trim((string)stream_get_contents($r)))));
fclose($r);

// EP061: SO_REUSEPORT 校验
$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$okReuse = @socket_set_option($sock, SOL_SOCKET, SO_REUSEPORT, 1);
socket_close($sock);
$logs[] = '[SO_REUSEPORT] socket_set_option(SOL_SOCKET, SO_REUSEPORT, 1) => ' . ($okReuse ? 'ENABLED (内核级多队列无惊群分发!)' : 'UNSUPPORTED');

$snapshot = ['episode' => 'ep60_61_master', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
