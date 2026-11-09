<?php
// 关卡 7.11 显微镜实验：常驻内存抓鬼 —— 循环引用与引用计数泄露实测
require_once __DIR__ . '/07_async_send_buffer.php';

echo "=== 关卡 7.11 常驻内存泄露抓鬼实验 (PID: " . posix_getpid() . ") ===\n\n";

class LeakConnection {
    public int $id;
    public $onMessage = null;
    public $onClose = null;
    public string $bigData = '';

    public function __construct(public $socket, public AdvancedSelectLoop $loop) {
        $this->id = (int)$socket;
        // 挂载一个模拟 100KB 内存的属性
        $this->bigData = str_repeat("M", 102400); // 100KB
        $this->loop->addRead($this->socket, [$this, 'baseRead']);
    }

    public function baseRead($socket): void {}

    // ❌ 错误示范：半吊子清理（很多新手以为 fclose 就算销毁了）
    public function badDestroy(): void {
        @fclose($this->socket);
        // 💥 致命疏忽：没有从 $loop->readCallbacks 剔除，没有清空闭包！
    }

    //  正确示范：工业级外科手术切断一切引用链
    public function goodDestroy(): void {
        // 1. 彻底从事件循环注销监听（斩断 [$this, 'baseRead'] 闭包对本对象的引用）
        $this->loop->delRead($this->socket);
        $this->loop->delWrite($this->socket);
        
        // 2. 关闭底层句柄
        @fclose($this->socket);

        // 3. 释放自身携带的数据
        $this->bigData = '';

        // 4. 彻底置空所有可能捕获了 $this 的回调闭包
        $this->onMessage = null;
        $this->onClose = null;
    }
}

// ----------------- 对比实验 A：半吊子清理 -----------------
echo "【测试 A：半吊子销毁 (仅 fclose，未斩断回调引用链)】\n";
$loop = new AdvancedSelectLoop();
$memBefore = memory_get_usage();
echo "初始内存: " . round($memBefore / 1024 / 1024, 2) . " MB\n";

$poolA = [];
for ($i = 0; $i < 100; $i++) {
    // 模拟创建 100 个连接，每个连接携带 100KB 内存
    // 创建虚拟一对 socket
    $pair = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, STREAM_IPPROTO_IP);
    $conn = new LeakConnection($pair[0], $loop);
    $poolA[$conn->id] = $conn;
}

$memPeak = memory_get_usage();
echo "创建 100 个连接后内存: " . round($memPeak / 1024 / 1024, 2) . " MB (增长 " . round(($memPeak - $memBefore) / 1024 / 1024, 2) . " MB)\n";

// 客户端全部断开！
foreach ($poolA as $id => $conn) {
    $conn->badDestroy();
    unset($poolA[$id]); // 业务层自以为 unset 之后就全释放了
}
// 强制触发一次垃圾回收
gc_collect_cycles();

$memAfterBad = memory_get_usage();
echo "100 个连接断开并 unset 后内存: " . round($memAfterBad / 1024 / 1024, 2) . " MB\n";
echo "❌ 泄露量: " . round(($memAfterBad - $memBefore) / 1024 / 1024, 2) . " MB！(对象死死卡在内存里，无法释放！)\n\n";

// ----------------- 对比实验 B：工业级彻底切断 -----------------
echo "【测试 B：工业级 destroy() (彻底斩断一切引用链)】\n";
$loopB = new AdvancedSelectLoop();
$memBeforeB = memory_get_usage();
echo "初始内存: " . round($memBeforeB / 1024 / 1024, 2) . " MB\n";

$poolB = [];
for ($i = 0; $i < 100; $i++) {
    $pair = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, STREAM_IPPROTO_IP);
    $conn = new LeakConnection($pair[0], $loopB);
    $poolB[$conn->id] = $conn;
}

$memPeakB = memory_get_usage();
echo "创建 100 个连接后内存: " . round($memPeakB / 1024 / 1024, 2) . " MB\n";

// 客户端全部断开，使用标准 goodDestroy()
foreach ($poolB as $id => $conn) {
    $conn->goodDestroy();
    unset($poolB[$id]);
}
gc_collect_cycles();

$memAfterGood = memory_get_usage();
echo "100 个连接断开并 goodDestroy() 后内存: " . round($memAfterGood / 1024 / 1024, 2) . " MB\n";
echo "🎉 完美释放！泄露量: " . round(($memAfterGood - $memBeforeB) / 1024, 2) . " KB (几乎为 0，内存瞬间恢复！)\n";
