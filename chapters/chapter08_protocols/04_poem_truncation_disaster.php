<?php
// 关卡 8.9 痛点复现：换行符 Text 协议在多行诗歌与图片二进制下的“腰斩惨案”
require_once __DIR__ . '/03_protocol_interface_slot.php';

echo "=== 关卡 8.9 换行符协议撞车惨案 (PID: " . posix_getpid() . ") ===\n\n";

$loop = new AdvancedSelectLoop();
$server = stream_socket_server("tcp://127.0.0.1:8087");
stream_set_blocking($server, false);

$triggerCount = 0;

$loop->addRead($server, function ($server) use ($loop, &$triggerCount) {
    $socket = stream_socket_accept($server);
    stream_set_blocking($socket, false);
    $conn = new ProtocolConnection($socket, $loop);
    // 依然使用换行符 Text 协议
    $conn->protocol = TextProtocol::class;

    $conn->onMessage = function ($c, $msg) use (&$triggerCount) {
        $triggerCount++;
        echo "🚨 [服务端 onMessage 触发第 $triggerCount 次] 内容: \"$msg\"\n";
    };
});

// 客户端发送一首 4 行的李白古诗（中间包含 3 个换行符）
$client = stream_socket_client("tcp://127.0.0.1:8087");

$loop->after(0.05, function () use ($client) {
    echo "1. [客户端] 一次性发送一首完整的 4 行李白诗歌《静夜思》...\n";
    $poem = "床前明月光\n疑是地上霜\n举头望明月\n低头思故乡\n";
    fwrite($client, $poem);
});

$loop->after(0.15, function () {
    echo "\n=== 惨案复盘完毕 ===\n";
    exit(0);
});

$loop->loop();
