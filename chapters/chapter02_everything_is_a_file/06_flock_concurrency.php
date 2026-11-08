<?php
// 2.9 【内功推导 7】多进程并发写日志与文件锁 flock($fp, LOCK_EX)
$logFile = __DIR__ . "/test_flock.log";
@unlink($logFile);

echo "=== 1. 验证文件独占锁 flock(LOCK_EX) 的排队保护 ===\n";

$pid = pcntl_fork();
if ($pid == -1) {
    die("fork 失败\n");
}

if ($pid > 0) {
    // 父进程：加锁，写入，故意休眠 1 秒模拟大块写入，再解锁
    $fp = fopen($logFile, "a+");
    echo "[父进程 " . posix_getpid() . "] 尝试获取独占锁 (LOCK_EX)...\n";
    flock($fp, LOCK_EX); // 抢到锁
    echo "[父进程 " . posix_getpid() . "] 🔒 抢锁成功！开始写数据并保持持锁 1 秒...\n";
    
    fwrite($fp, "===== 父进程开始写入 =====\n");
    sleep(1);
    fwrite($fp, "===== 父进程写入完毕 =====\n");
    
    echo "[父进程 " . posix_getpid() . "] 🔓 释放锁 (LOCK_UN)\n";
    flock($fp, LOCK_UN);
    fclose($fp);
    
    pcntl_wait($status); // 等待子进程结束
    
    echo "\n=== 最终日志文件内容 ===\n";
    echo file_get_contents($logFile);
    @unlink($logFile);
    
    echo "\n=== 2. Workerman 源码精髓：非阻塞排他锁 LOCK_NB 实现单例启动 ===\n";
    $masterLock = fopen(__DIR__ . "/master.lock", "a+");
    $gotFirstLock = flock($masterLock, LOCK_EX | LOCK_NB);
    echo "第 1 次加锁 (Master 启动): " . ($gotFirstLock ? "✅ 成功 (自己是唯一主进程)" : "❌ 失败") . "\n";
    
    // 模拟启动第二个 Master 进程去抢同一个 lock
    $secondMasterLock = fopen(__DIR__ . "/master.lock", "a+");
    $gotSecondLock = flock($secondMasterLock, LOCK_EX | LOCK_NB);
    echo "第 2 次加锁 (另一个进程试图重复启动): " . ($gotSecondLock ? "✅ 成功" : "❌ 失败 (检测到已有 Master 在运行，立即报错退出！)") . "\n";
    
    flock($masterLock, LOCK_UN);
    fclose($masterLock);
    fclose($secondMasterLock);
    @unlink(__DIR__ . "/master.lock");
} else {
    // 子进程：稍微等 0.1 秒让父进程先拿到锁
    usleep(100000);
    $fp = fopen($logFile, "a+");
    echo "  [子进程 " . posix_getpid() . "] 也来写日志，尝试获取锁...\n";
    $startWait = microtime(true);
    
    flock($fp, LOCK_EX); // 这里会被内核自动阻塞挂起！直到父进程释放锁
    
    $waitCost = round(microtime(true) - $startWait, 2);
    echo "  [子进程 " . posix_getpid() . "] 终于排队等到了锁！(被阻塞挂起了 {$waitCost} 秒)\n";
    
    fwrite($fp, "---- 子进程安全追加的一行 ----\n");
    flock($fp, LOCK_UN);
    fclose($fp);
    exit(0);
}
