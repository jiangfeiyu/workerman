<?php
declare(strict_types=1);

// 【加餐过渡】加了 while(true) 循环读 200KB，为什么活着的客户端反而被误杀？
$port = '19315';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $e, $s);
$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e2, $s2, 2);
$conn = @stream_socket_accept($server, 1);
stream_set_blocking($conn, false);

// 客户端发了 200KB，但故意不 fclose()，连接还活着！
fwrite($client, str_repeat('D', 200 * 1024));
usleep(50_000);

$round = 0;
$total = 0;
while (true) {
    $round++;
    $chunk = @fread($conn, 65535);
    if ($chunk === '' || $chunk === false) {
        echo "[第{$round}轮] fread 返回空串！误判客户端断开直接关闭！(其实还活着 feof=false)\n";
        break;
    }
    $total += strlen($chunk);
    if ($round === 1 || $total >= 200 * 1024) {
        echo "[第{$round}轮] 读到 " . strlen($chunk) . " B (累计={$total} B)\n";
    }
}

fclose($client);
fclose($conn);
fclose($server);
