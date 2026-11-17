<?php
declare(strict_types=1);

$port = getenv('PORT') ?: '9002';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
if (!$server) {
    exit("启动失败: {$errstr}\n");
}

// 关键改变：把接待门设为非阻塞！没客人立刻返回 false，不再死等
stream_set_blocking($server, false);
echo "[Server] 非阻塞监听 tcp://127.0.0.1:{$port} 已开启\n";

$clients = [];
$loops = 0;
$start = microtime(true);

while (true) {
    $loops++;
    $conn = @stream_socket_accept($server, 0);
    if ($conn) {
        stream_set_blocking($conn, false);
        $clients[] = $conn;
        echo "[Server] 新客人进入: " . stream_socket_get_name($conn, true) . "\n";
    }

    foreach ($clients as $i => $client) {
        $data = @fread($client, 1024);
        if ($data === '' && feof($client)) {
            fclose($client);
            unset($clients[$i]);
            continue;
        }
        if ($data !== false && $data !== '') {
            fwrite($client, "Echo: " . $data);
        }
    }

    // 每隔 0.5 秒汇报空转次数（模拟真实 CPU 空转现场）
    if (microtime(true) - $start >= 0.5) {
        echo sprintf("[CPU 警报] 0.5 秒空转了 %s 次 while 循环！\n", number_format($loops));
        $loops = 0;
        $start = microtime(true);
    }
}
