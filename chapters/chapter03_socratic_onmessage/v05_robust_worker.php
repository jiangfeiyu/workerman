<?php
/**
 * v0.5 工业级健壮版 Worker：
 * 1. 上下文注入：触发回调时传入 $this（让闭包拿到 Worker 实例）
 * 2. 异常防护网：用 try...catch(\Throwable) 包裹回调，防止业务 Bug 导致整个服务器进程暴毙！
 * 3. 严格校验：使用 is_callable() 防御非法回调
 * 4. 支持面向对象方法回调：[$controller, 'action']
 */

class Worker {
    public string $name = 'ChatRobotWorker';
    public $onWorkerStart = null;
    public $onMessage = null;
    public $onError = null;

    public function run(): void {
        // 1. 服务初始化：注入 $this 上下文
        if (is_callable($this->onWorkerStart)) {
            try {
                ($this->onWorkerStart)($this);
            } catch (\Throwable $e) {
                $this->triggerError($e);
            }
        }

        // 2. 消息事件循环泵
        while (($msg = fgets(STDIN)) !== false) {
            $msg = trim($msg);
            if ($msg === '') continue;

            if (is_callable($this->onMessage)) {
                // 工业级防护核心：绝不允许用户业务代码抛出的异常杀死常驻进程！
                try {
                    ($this->onMessage)($msg);
                } catch (\Throwable $e) {
                    $this->triggerError($e);
                }
            }
        }
    }

    protected function triggerError(\Throwable $e): void {
        if (is_callable($this->onError)) {
            ($this->onError)($e);
        } else {
            echo "⚠️ [Worker 安全网拦截] 业务代码发生异常，但底座已被保护不崩溃: " . $e->getMessage() . "\n";
        }
    }
}

// 模拟业务对象
class CustomerService {
    public function reply(string $msg): void {
        if ($msg === 'bomb') {
            // 模拟业务逻辑中意外抛出了未捕获的严重异常！
            throw new \RuntimeException("💥 数据库连接超时！");
        }
        echo "【客服回复】您发送的消息是: $msg\n";
    }
}

$worker = new Worker();

// 细节 1：闭包参数接收注入进来的 $w (即 Worker 实例本身)
$worker->onWorkerStart = function (Worker $w) {
    echo "=== {$w->name} (PID: " . posix_getpid() . ") 启动成功，准备接客！===\n";
};

// 细节 2：面向对象数组语法传递回调 [$bot, 'reply']
$bot = new CustomerService();
$worker->onMessage = [$bot, 'reply'];

$worker->run();
