<?php
// 关卡 7.6 显微镜实验：单独透视 AdvancedSelectLoop 的写事件机制（无复杂业务干扰）

require_once __DIR__ . '/07_async_send_buffer.php';

echo "=== 单独透视 AdvancedSelectLoop 写事件机制 ===\n\n";

$loop = new AdvancedSelectLoop();
$server = stream_socket_server("tcp://0.0.0.0:8080");

$client = stream_socket_client("tcp://127.0.0.1:8080");
$conn = stream_socket_accept($server);

echo "1. 此时客户端已连入，内核 Socket 发送缓冲区是空的（即处于可写状态）。\n";

$writeCount = 0;

// 🌟 核心实测：向 loop 注册一个写事件！
echo "2. 注册写事件: \$loop->addWrite(\$conn, 回调函数)...\n";
$loop->addWrite($conn, function ($socket) use ($loop, &$writeCount) {
    $writeCount++;
    echo "   [第 $writeCount 次写事件唤醒] 内核通知：当前 Socket 是可写的！\n";

    // 🌟 演示铁律：如果只写一次就排空了，必须立刻注销！
    echo "   [立即注销写事件] 执行 \$loop->delWrite(\$socket)...\n";
    $loop->delWrite($socket);

    // 终止主循环退出测试
    exit(0);
});

echo "3. 启动事件循环 \$loop->loop()，观察写事件是否瞬间被内核唤醒...\n";
$loop->loop();
