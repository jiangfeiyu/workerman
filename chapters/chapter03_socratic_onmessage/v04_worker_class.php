<?php
// v0.4 终极推导成果：面向对象 Worker 雏形与生命周期事件解耦！
class Worker {
    public $onWorkerStart = null;
    public $onMessage = null;
    
    public function run() {
        // 1. 服务启动时，触发一次 onWorkerStart 回调
        if ($this->onWorkerStart) {
            ($this->onWorkerStart)();
        }

        // 2. 核心消息泵：死循环读取 0 号输入流管子
        while (($msg = fgets(STDIN)) !== false) {
            $msg = trim($msg);
            if ($this->onMessage) {
                ($this->onMessage)($msg);
            }
        }
    }
}

// =================== 外部业务使用代码 ===================
$worker = new Worker();

$worker->onWorkerStart = function () {
    echo "=== 机器人启动成功，准备接客！===\n";
};

$worker->onMessage = function ($msg) {
    echo "【客服机器人回复】您刚才说的是: " . $msg . "\n";
};

$worker->run();
