<?php
// 关卡 5.11 💥【内功捉虫】：当客人 Ctrl+C 断开连接时，为什么会引发 100% 空消息风暴？
$server = stream_socket_server("tcp://0.0.0.0:8080");
$allSockets = [(int)$server => $server];

echo "=== 死循环风暴测试服务器启动 (PID: " . posix_getpid() . ") ===\n";

$loopCount = 0;

while (true) {
    $read = $allSockets;
    $write = $except = null;
    stream_select($read, $write, $except, null);

    foreach ($read as $socket) {
        if ($socket === $server) {
            $conn = stream_socket_accept($server);
            $allSockets[(int)$conn] = $conn;
            echo "【大门】新客人进门: FD " . (int)$conn . "\n";
        } else {
            // ❌ 错误写法：以为只要 select 唤醒了就一定有真实内容，没判断断开 EOF！
            $msg = fread($socket, 1024);
            $loopCount++;
            echo "【第 $loopCount 次收到动静】收到消息内容: [" . $msg . "]\n";

            if ($loopCount >= 10) {
                echo "...... 停！仅仅 0.001 秒就狂触发了 10 次空消息！正在紧急止血终止程序！......\n";
                exit(0);
            }
        }
    }
}
