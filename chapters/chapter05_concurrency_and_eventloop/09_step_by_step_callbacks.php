<?php
// 关卡 5.12 铺垫台阶：不用任何面向对象类，先用一个普通的 $callbacks 数组消灭所有 if-else！
$server = stream_socket_server("tcp://0.0.0.0:8080");

$readFds = [(int)$server => $server];
$callbacks = [];

// 1. 给大门绑定它的专属函数：有动静就接客！
$callbacks[(int)$server] = function ($server) use (&$readFds, &$callbacks) {
    $conn = stream_socket_accept($server);
    if (!$conn) return;
    $fd = (int)$conn;
    echo "【大门专属回调触发】新客人进门: FD $fd\n";

    // 2. 给新客人绑定他的专属函数：有动静就读消息！
    $readFds[$fd] = $conn;
    $callbacks[$fd] = function ($conn) use (&$readFds, &$callbacks, $fd) {
        $msg = fread($conn, 1024);
        if ($msg === '' || $msg === false) {
            echo "【客人专属回调触发】FD $fd 挂断离开！\n";
            fclose($conn);
            unset($readFds[$fd], $callbacks[$fd]);
            return;
        }
        echo "【客人专属回调触发】FD $fd 说话: " . trim($msg) . "\n";
        fwrite($conn, "服务端回复: " . trim($msg) . "\n");
    };
};

echo "=== 铺垫台阶启动 (PID: " . posix_getpid() . ")：没有 class，纯数组消灭 if-else ===\n";

// 3. 主循环只做一件事：查表执行！
$count = 0;
while (true) {
    $read = $readFds;
    $write = $except = null;
    if (stream_select($read, $write, $except, null) <= 0) continue;

    foreach ($read as $socket) {
        $fd = (int)$socket;
        // 🌟 神来之笔：不需要写 if ($socket === $server)，查表直接调！
        $callbacks[$fd]($socket);
    }
}
