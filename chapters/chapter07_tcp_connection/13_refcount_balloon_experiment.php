<?php
// 关卡 7.11 显微镜实验：用气球与绳子，彻底看懂 PHP 引用计数与三种锁链

class Balloon {
    public function __construct(public string $name) {
        echo "🎈 [气球吹起] $this->name 被创建诞生了！\n";
    }

    public function fly(): void {}

    public function __destruct() {
        echo "💥 [气球爆炸销毁] $this->name 的所有绳子全断了，内存被 PHP 彻底回收！\n";
    }
}

echo "==================== 实验 1：正常情况，绳子放手立即销毁 ====================\n";
$balloon1 = new Balloon("气球 1 号");
echo "准备 unset(\$balloon1)...\n";
unset($balloon1); // 只有一根绳子，放手立即爆炸
echo "实验 1 结束。\n\n";

echo "==================== 实验 2：锁链 2 揭秘 —— [\$this, 'baseRead'] 抓住了什么？ ====================\n";
// 模拟事件循环的回调名册
$eventLoopCallbacks = [];

$balloon2 = new Balloon("气球 2 号");

// 🌟 重点来了：向事件循环登记 [$this, 'fly']
// 很多人以为这只是传了个名字，其实 [$balloon2, 'fly'] 是一个包含两个元素的普通数组：
// 它的 0 号位置放的就是 $balloon2 对象本身！
$eventLoopCallbacks['fd_15'] = [$balloon2, 'fly'];

echo "此时有两只手抓着气球 2 号：\n";
echo "  手 1: \$balloon2 变量\n";
echo "  手 2: \$eventLoopCallbacks['fd_15'][0] 数组元素\n\n";

echo "现在我们撒开手 1：执行 unset(\$balloon2)...\n";
unset($balloon2);
echo "👀 请看：控制台有没有打印【气球 2 号爆炸】？——【绝对没有！】\n";
echo "为什么？因为手 2 (\$eventLoopCallbacks) 还在死死拽着它！气球依然浮在内存中！\n\n";

echo "现在我们撒开手 2：执行 unset(\$eventLoopCallbacks['fd_15']) (相当于 loop->delRead)...\n";
unset($eventLoopCallbacks['fd_15']); // 最后一根绳子断了！
echo "实验 2 结束。\n\n";

echo "==================== 实验 3：锁链 3 揭秘 —— 闭包自咬尾巴（循环引用） ====================\n";
class CircleBalloon {
    public $onAction = null;
    public function __construct(public string $name) {
        echo "🎈 [气球吹起] $this->name 被创建！\n";
    }
    public function __destruct() {
        echo "💥 [气球爆炸销毁] $this->name 内存彻底回收！\n";
    }
}

$balloon3 = new CircleBalloon("气球 3 号");
// 闭包通过 use 捕获了 $balloon3，而这个闭包又赋值给了 $balloon3 自己的属性！
$balloon3->onAction = function() use ($balloon3) {
    // 闭包肚子里装着 $balloon3
};

echo "现在我们撒开外部变量：执行 unset(\$balloon3)...\n";
unset($balloon3);
echo "👀 请看：气球 3 号同样没有爆炸！\n";
echo "为什么？因为气球自己的属性里的闭包，反过来抓着气球自己！蛇咬尾巴，形成死结！\n";
echo "必须把属性赋为 null (\$balloon3->onAction = null)，才能解开死结！\n";
