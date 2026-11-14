<?php
// 关卡 6.8 【小练习串联】：定时广播机器人 + 延迟任务
require_once __DIR__ . '/14_select_loop_with_heap.php';

$loop = new SelectLoop();
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
stream_set_blocking($server, false);

$clients = [];

// 1. 迎宾员
$loop->addRead($server, function ($server) use ($loop, &$clients) {
    $conn = stream_socket_accept($server);
    if (!$conn) return;
    $fd = (int)$conn;
    $clients[$fd] = $conn;
    echo "【大门】新客人进门: FD $fd\n";

    // 客人说话
    $loop->addRead($conn, function ($conn) use ($loop, &$clients, $fd) {
        $msg = fread($conn, 1024);
        if ($msg === '' || $msg === false) {
            echo "【包厢】客人 FD $fd 离开\n";
            $loop->delRead($conn);
            fclose($conn);
            unset($clients[$fd]);
            return;
        }

        echo "【收到 FD $fd 消息】: " . trim($msg) . "\n";
        // 延迟 3 秒给客人做菜
        $loop->after(3.0, function () use ($conn, $fd) {
            @fwrite($conn, "【厨师】FD $fd，您的热菜做好了！\n");
        });
    });
});

// 2. 🤖 定时广播机器人：每隔 2 秒自动向全场广播当前系统时间！
$loop->repeat(2.0, function () use (&$clients) {
    $count = count($clients);
    echo "🤖【定时广播机器人】叮！每 2 秒广播一次，当前在线人数: $count 人\n";
    foreach ($clients as $fd => $client) {
        @fwrite($client, "📢 广播: 服务器当前时间是 " . date('H:i:s') . "\n");
    }
});

echo "=== 定时广播服务器启动 (PID: " . posix_getpid() . ")，监听 8080 ===\n";
$loop->loop();
