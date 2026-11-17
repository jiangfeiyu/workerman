<?php
declare(strict_types=1);

// EP065-066: master.pid 文件锁防重启动 + CommandRunner CLI 解析器
class CommandRunner
{
    public static function parse(array $argv): array
    {
        $cmd    = $argv[1] ?? 'help';
        $flags  = array_slice($argv, 2);
        $daemon = in_array('-d', $flags, true);
        $grace  = in_array('-g', $flags, true);
        return ['cmd' => $cmd, 'daemon' => $daemon, 'graceful' => $grace];
    }

    public static function acquirePidLock(string $pidFile): mixed
    {
        $fp = fopen($pidFile, 'c+');
        if (!flock($fp, LOCK_EX | LOCK_NB)) {
            fclose($fp);
            return false;
        }
        ftruncate($fp, 0);
        fwrite($fp, (string)getmypid());
        fflush($fp);
        return $fp;
    }
}

$pidFile = sys_get_temp_dir() . '/mw_master_test.pid';
$logs = [];

$lock1 = CommandRunner::acquirePidLock($pidFile);
$logs[] = '[第1次启动 flock] 抢占 master.pid 排他锁 => ACQUIRED (pid=' . getmypid() . ')';

$lock2 = CommandRunner::acquirePidLock($pidFile);
$logs[] = '[第2次误重复启动] flock(LOCK_EX|LOCK_NB) => ' . ($lock2 === false ? 'BLOCKED! (已拒绝重复启动)' : 'OK');

flock($lock1, LOCK_UN);
fclose($lock1);
@unlink($pidFile);

$parsed1 = CommandRunner::parse(['worker.php', 'start', '-d']);
$parsed2 = CommandRunner::parse(['worker.php', 'stop', '-g']);
$logs[] = '[CLI 解析] `start -d` => cmd=' . $parsed1['cmd'] . ', daemon=' . ($parsed1['daemon'] ? 'true' : 'false');
$logs[] = '[CLI 解析] `stop -g`  => cmd=' . $parsed2['cmd'] . ', graceful=' . ($parsed2['graceful'] ? 'true' : 'false');

$snapshot = ['episode' => 'ep65_66_cli', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
