<?php
// 关卡 5.1 【笨办法演进】：为了能持续接待客人，我们在 accept 里再套一层 while(true)
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
echo "=== 服务器启动 (PID: " . posix_getpid() . ")，监听 0.0.0.0:8080 ===\n";

while (true) {
    // 1. 外层循环：迎宾员在门口接新客
    $conn = stream_socket_accept($server);
    echo "【大门】接待了一位新客人！\n";

    // 2. 内层循环：专职服务员陪这个客人一直聊，直到客人断开
    while (true) {
        $msg = fread($conn, 1024);
        if ($msg === false || $msg === '') {
            echo "【包厢】客人挂断离开了。\n";
            fclose($conn);
            break; // 退出内层，回到外层大门口接下一位客人
        }
        echo "【收到客人消息】: " . trim($msg) . "\n";
        fwrite($conn, "服务端回复: " . trim($msg) . "\n");
    }
}
