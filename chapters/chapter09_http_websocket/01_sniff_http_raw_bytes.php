<?php
// 关卡 9.1 【内功探秘】不挂任何协议，裸奔抓取浏览器/curl 塞进 TCP FD 的原始 HTTP 字节流
require_once __DIR__ . '/../chapter08_protocols/03_protocol_interface_slot.php';

if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    $loop = new AdvancedSelectLoop();
    $context = stream_context_create(['socket' => ['so_reuseaddr' => true]]);
    $server = stream_socket_server("tcp://0.0.0.0:8080", $errno, $errstr, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $context);
    if (!$server) {
        exit("启动监听失败: {$errstr}\n");
    }
    stream_set_blocking($server, false);

    echo "=== 关卡 9.1 HTTP 原始字节探照灯已启动 (PID: " . getmypid() . ") ===\n";
    echo "正在监听 tcp://0.0.0.0:8080 （未挂载任何协议，按 Ctrl+C 退出）...\n\n";

    $loop->addRead($server, function ($server) use ($loop) {
        $socket = @stream_socket_accept($server);
        if (!$socket) {
            return;
        }
        stream_set_blocking($socket, false);

        $conn = new ProtocolConnection($socket, $loop);
        // 故意设为 null：不装协议芯片，原汁原味展示 4 号/5 号 FD 读到的原始字节！
        $conn->protocol = null;

        $conn->onMessage = function ($c, string $raw) {
            $fd = (int)$c->socket;
            echo "📥 [FD #{$fd} 收到原始字节流，总计 " . strlen($raw) . " 字节]\n";
            echo "---------------- 原文直出 ----------------\n";
            echo $raw;
            echo "---------------- 转义显微镜 (看清 \\r 和 \\n) ----------------\n";
            echo str_replace(["\r", "\n"], ["\\r", "\\n\n"], $raw);
            echo "========================================\n\n";
        };
    });

    $loop->loop();
}
