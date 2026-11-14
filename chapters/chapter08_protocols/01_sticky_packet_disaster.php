<?php
// 关卡 8.1 & 8.2 双重大车祸现场：TCP 粘包与半包血案复现
require_once __DIR__ . '/../chapter07_tcp_connection/07_async_send_buffer.php';

echo "=== 关卡 8.1 & 8.2 TCP 粘包与拆包车祸现场 (PID: " . posix_getpid() . ") ===\n\n";

$loop = new AdvancedSelectLoop();
$context = stream_context_create(['socket' => ['so_reuseaddr' => true]]);
$server = stream_socket_server("tcp://127.0.0.1:8084", $errno, $errstr, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $context);
stream_set_blocking($server, false);

$triggerCount = 0;

$loop->addRead($server, function ($server) use ($loop, &$triggerCount) {
    $socket = stream_socket_accept($server);
    stream_set_blocking($socket, false);
    $conn = new TcpConnection($socket, $loop);

    $conn->onMessage = function ($c, $msg) use (&$triggerCount) {
        $triggerCount++;
        echo "🚨 [服务端 onMessage 触发第 $triggerCount 次] 收到长度: " . strlen($msg) . " 字节\n";
        
        // 如果是短文本，打印内容
        if (strlen($msg) <= 100) {
            echo "   内容原文: \"$msg\"\n";
        } else {
            // 如果是大包，尝试 json_decode 解析
            echo "   [尝试 JSON 解析 100KB 数据]...\n";
            $res = json_decode($msg, true);
            if ($res === null) {
                echo "   ❌ 致命解析失败！json_decode 返回 null (语法错误：只有半截 JSON！)\n";
            } else {
                echo "   🎉 JSON 解析成功！\n";
            }
        }
    };
});

// ----------------- 客户端发起测试 -----------------
$client = stream_socket_client("tcp://127.0.0.1:8084");
stream_set_blocking($client, false);

// 💥 车祸 1：客户端快速循环 10 次调用 fwrite，每次发 "hello"
$loop->after(0.05, function () use ($client) {
    echo "1. [客户端] 连续调用 10 次 fwrite(\$client, 'hello')...\n";
    for ($i = 1; $i <= 10; $i++) {
        fwrite($client, "hello");
    }
    echo "   -> 客户端 10 次 fwrite 发送完毕！期待服务端 onMessage 触发 10 次！\n\n";
});

// 💥 车祸 2：客户端调用 1 次 fwrite，发送一个 100KB 的大 JSON 数组
$loop->after(0.15, function () use ($client) {
    echo "\n2. [客户端] 调用 1 次 fwrite 发送一条 100KB 的完整 JSON 数据...\n";
    $bigData = json_encode(['data' => str_repeat('X', 100000)]); // 约 100KB
    fwrite($client, $bigData);
    echo "   -> 客户端 1 次性发出了 " . strlen($bigData) . " 字节！期待服务端完整解析！\n\n";
});

// 结束实验
$loop->after(0.3, function () {
    echo "\n=== 实验现场复盘完毕 ===\n";
    exit(0);
});

$loop->loop();
