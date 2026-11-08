<?php
// 关卡 5.4 & 5.5 【自救演进 v0.8】：开启非阻塞 I/O + 单循环接线员轮询
$server = stream_socket_server("tcp://0.0.0.0:8080");
// 1. 将大门口迎宾员设置为非阻塞模式！
stream_set_blocking($server, false);

echo "=== 非阻塞轮询服务器启动 (PID: " . posix_getpid() . ")，监听 0.0.0.0:8080 ===\n";

// 接线员的花名册：保存所有进来的客人
$connections = [];

while (true) {
    // 2. 问大门口：有新客人吗？（非阻塞：设置 timeout 为 0，没客人瞬间返回 false，绝不卡死睡觉）
    $conn = @stream_socket_accept($server, 0);
    if ($conn) {
        // 新客人进门，也必须设为非阻塞！
        stream_set_blocking($conn, false);
        $id = (int)$conn;
        $connections[$id] = $conn;
        echo "【大门】接待新客人 (FD: $id)，加入花名册！当前客人总数: " . count($connections) . "\n";
    }

    // 3. 轮流问花名册里的每一个老客人：你说话了吗？
    foreach ($connections as $id => $conn) {
        $msg = fread($conn, 1024);
        if ($msg === false || $msg === '') {
            // 注意：非阻塞模式下，没数据时 fread 会返回 false 或空字符串吗？
            // 稍等！在 PHP stream 里，非阻塞没有数据时 fread 会返回 ""（空字符串），
            // 那怎么区分是“客人没说话”还是“客人断开挂机了”？
            // 我们用 feof($conn) 来精确判断！
            if (feof($conn)) {
                echo "【包厢】客人 (FD: $id) 离开了，从花名册注销。\n";
                fclose($conn);
                unset($connections[$id]);
            }
            continue;
        }

        echo "【收到客人 (FD: $id) 消息】: " . trim($msg) . "\n";
        fwrite($conn, "服务端回复 (FD: $id): " . trim($msg) . "\n");
    }
}
