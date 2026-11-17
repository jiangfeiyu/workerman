<?php
declare(strict_types=1);

// EP068 【踩坑】: Master 提前 require 业务类导致 reload 失效 / Cannot redeclare class
$bizFile = sys_get_temp_dir() . '/mw_biz_reload_test.php';
file_put_contents($bizFile, "<?php\nclass BizHandler { public static string \$ver = 'v1.0'; }\n");

// 错误演示：Master 在 fork 之前提前加载了 BizHandler
require_once $bizFile;

// 此时磁盘升级到了 v2.0
file_put_contents($bizFile, "<?php\nclass BizHandler { public static string \$ver = 'v2.0'; }\n");

[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
$pid = pcntl_fork();
if ($pid === 0) {
    fclose($r);
    // 即使新拉起的 Worker，因为 COW 继承了 Master 里的 v1.0，磁盘新代码完全不生效！
    $already = class_exists('BizHandler', false);
    fwrite($w, json_encode(['alreadyLoaded' => $already, 'ver' => BizHandler::$ver]));
    fclose($w);
    exit(0);
}

fclose($w);
pcntl_waitpid($pid, $st);
$childInfo = json_decode((string)stream_get_contents($r), true);
fclose($r);
@unlink($bizFile);

$logs = [
    "[错误姿势: Master 提前 require] 磁盘已更新 v2.0，但 Worker 里 class_exists=" . ($childInfo['alreadyLoaded'] ? 'true' : 'false') . "，版本仍卡死在 {$childInfo['ver']}!",
    "[反复 require 会直接 Fatal Error] Cannot declare class BizHandler, because the name is already in use",
    "[正确解法: onWorkerStart 懒加载] Master 严禁加载业务代码 -> 每次 reload 新 Worker 从空白进程读出最新 v2.0!",
];

$snapshot = ['episode' => 'ep68_reload_trap', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
