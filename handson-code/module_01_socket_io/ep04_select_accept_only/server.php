<?php
declare(strict_types=1);

$port = getenv('PORT') ?: '9004';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);
echo "[Server] 已用 stream_select 守护接待门 (CPU 0% 睡眠中)...\n";

while (true) {
    // 只把 $server 门卫放进监控数组，拷贝一份传给内核
    $read = [$server];
    $write = $except = null;

    // 没客人就安心睡眠，绝不空转！一旦有新客人敲门，内核立刻叫醒
    $ready = @stream_select($read, $write, $except, null);
    if ($ready > 0) {
        $conn = @stream_socket_accept($server, 0);
        if ($conn) {
            $peer = stream_socket_get_name($conn, true);
            echo "[Server] 内核叫醒！迎入新客人: {$peer}\n";
            fwrite($conn, "Welcome {$peer}\n");
            fclose($conn);
        }
    }
}
