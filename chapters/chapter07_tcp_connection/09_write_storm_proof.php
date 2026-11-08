<?php
// 关卡 7.8 显微镜实验：写事件风暴（Write Storm）与“用完即拆”铁律
require_once __DIR__ . '/07_async_send_buffer.php';

echo "=== 实验：透视写事件不注销导致的‘空转风暴’ ===\n";

$loop = new AdvancedSelectLoop();
$server = stream_socket_server("tcp://127.0.0.1:8081");
$client = stream_socket_client("tcp://127.0.0.1:8081");
$conn = stream_socket_accept($server);

$fireCount = 0;
$startTime = microtime(true);

// 注册写事件，但故意【不注销】它！
$loop->addWrite($conn, function ($socket) use (&$fireCount, $startTime, $loop) {
    $fireCount++;
    // 每 50,000 次打印一次
    if ($fireCount % 50000 === 0) {
        $cost = microtime(true) - $startTime;
        echo "   [警告！疯狂唤醒中...] 已触发 $fireCount 次！耗时 " . round($cost, 3) . " 秒\n";
    }

    // 运行 0.2 秒后强制自杀退出，展示其惊人的唤醒频率
    if (microtime(true) - $startTime >= 0.2) {
        echo "   [紧急停止] 仅仅 0.2 秒内，内核就轰炸唤醒了 $fireCount 次！\n";
        echo "   结论：只要内核发送缓冲区有空间，select 就会永无休止地返回可写！\n";
        echo "   铁律：写事件绝不能常驻，必须在数据排空后立刻 delWrite()！\n";
        exit(0);
    }
});

echo "1. 客户端已连接，内核发送缓冲区是空的（处于极度可写状态）。\n";
echo "2. 注册写事件且故意不注销，启动事件循环 0.2 秒...\n\n";

$loop->loop();
