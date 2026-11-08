<?php
// 关卡 7.2 & 7.3 核心代码细节显微镜：逐行透视语法、指针与内存机制

echo "=== 核心代码细节显微镜实验 ===\n\n";

// ==================== 细节 1：[$this, 'baseRead'] 到底是什么语法？ ====================
class DemoServer {
    public function myCallback($data) {
        echo "   -> myCallback 成功被调用！收到参数: $data\n";
    }
}

$serverObj = new DemoServer();
// 在 PHP 中，[$对象, '方法名'] 是一个标准的 Callable（可调用数组）！
$callable = [$serverObj, 'myCallback'];

echo "1. 验证 Callable 数组语法:\n";
echo "   is_callable(\$callable) 结果: " . (is_callable($callable) ? 'true (合法)' : 'false') . "\n";
echo "   调用 \$callable('测试数据'):\n";
$callable("测试数据");
echo "\n";


// ==================== 细节 2：为什么 Worker 必须写 $this->connections[$id] = $conn？ ====================
echo "2. 验证引用计数与垃圾回收（GC 机制）:\n";

class DisposableConnection {
    public function __construct(public int $id) {
        echo "   [构造函数] 连接对象 (ID: $id) 被分配内存创建！\n";
    }
    public function __destruct() {
        echo "   [析构函数] 💥 连接对象 (ID: {$this->id}) 引用计数归零，被 PHP 垃圾回收销毁！\n";
    }
}

// 模拟局部变量：如果不存入数组
function simulateWithoutHolding() {
    echo "   --- 开始 simulateWithoutHolding --- \n";
    $conn = new DisposableConnection(1);
    echo "   --- 函数即将结束退出局部作用域 --- \n";
}
simulateWithoutHolding(); // 函数一结束，$conn 立即被析构！

echo "\n   --- 开始放入数组常驻保持引用 --- \n";
$connectionsPool = [];
$conn2 = new DisposableConnection(2);
$connectionsPool[2] = $conn2; // 放入数组，产生强引用！
echo "   局部变量离开，但 \$connectionsPool[2] 依然抓着它，绝不触发析构！\n";

echo "   执行 unset(\$connectionsPool[2]):\n";
unset($connectionsPool[2]); // 引用计数归零，此时才触发析构！
echo "\n";


// ==================== 细节 3：接力棒传递 —— ($this->onMessage)($this, $data) 是如何对接外部的？ ====================
echo "3. 验证回调接力棒传递流程:\n";

class FakeTcpConnection {
    public $onMessage = null; // 存放外部闭包的属性插座

    public function fakeDataArrived(string $rawBytes) {
        echo "   [FakeTcpConnection 内部] 收到原始字节: '$rawBytes'\n";
        echo "   [FakeTcpConnection 内部] 准备将自身 (\$this) 和 数据 (\$rawBytes) 递给 onMessage...\n";
        if ($this->onMessage) {
            // 🌟 这一行是全场核心：
            // 第一个实参是 $this（当前 FakeTcpConnection 对象）
            // 第二个实参是 $rawBytes（字符串数据）
            ($this->onMessage)($this, $rawBytes);
        }
    }
}

$fakeConn = new FakeTcpConnection();

// 外部业务程序员写的闭包函数：
$fakeConn->onMessage = function ($c, $msg) {
    echo "   [外部业务闭包执行] 第一个形参 \$c 的真实类型是: " . get_class($c) . "\n";
    echo "   [外部业务闭包执行] 第二个形参 \$msg 的内容是: '$msg'\n";
};

// 模拟底层数据到达
$fakeConn->fakeDataArrived("Hello World");
