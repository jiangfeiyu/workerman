<?php
// 关卡 7.1 💥 痛点 1（语法憋屈）：原生 resource 句柄为什么不能绑定业务属性？

$server = stream_socket_server("tcp://0.0.0.0:8080");
echo "=== 服务器启动 (PID: " . posix_getpid() . ")，等待客户端连入... ===\n";

// 模拟客户端连入
$client = stream_socket_client("tcp://127.0.0.1:8080");
$conn = stream_socket_accept($server);

echo "1. 此时 \$conn 的类型是: " . get_debug_type($conn) . " (Resource 裸句柄)\n";

echo "2. 业务场景：客人张三登录成功了，我想把 uid 挂在连接上: \$conn->uid = 10086;\n";

try {
    // 💥 致命报错：试图给资源类型添加动态属性！
    $conn->uid = 10086;
    echo "挂载成功！UID: " . $conn->uid . "\n";
} catch (\Throwable $e) {
    echo "❌ 触发 PHP 致命崩溃: " . get_class($e) . " -> " . $e->getMessage() . "\n";
}

fclose($client);
fclose($conn);
fclose($server);
