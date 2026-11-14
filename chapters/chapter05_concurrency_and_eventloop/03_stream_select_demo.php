<?php
// 关卡 5.8 【体验 stream_select 的神仙效果】
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
echo "=== 服务器启动 (PID: " . posix_getpid() . ") ===\n";

$read = [$server];
$write = null;
$except = null;

echo "【接线员】把名单交给内核 select 保安，开始坐着休息（让出 CPU）...\n";
// 第 4 个参数为 null 表示：没人说话就一直睡，绝不空转！
$num = stream_select($read, $write, $except, null);

echo "【接线员】被保安拍醒了！有动静的通道数量: $num\n";
foreach ($read as $socket) {
    echo "  -> 亮灯有动静的 Socket: " . (int)$socket . "\n";
}
