<?php
declare(strict_types=1);

// 【加餐过渡】为什么不能用 while 循环死磕 fwrite() 把 10MB 写完？
$port = '19252';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2); // 慢客户端：一直不读
$conn = @stream_socket_accept($server, 1);
stream_set_blocking($conn, false);

$pending = str_repeat('A', 2 * 1024 * 1024); // 2 MB
$spinCount = 0;
$zeroWrites = 0;

while ($pending !== '') {
    $spinCount++;
    $written = (int)@fwrite($conn, $pending);
    if ($written > 0) {
        $pending = substr($pending, $written);
        echo "[第{$spinCount}轮] 塞进 {$written} 字节，剩余 " . strlen($pending) . " 字节\n";
    } else {
        $zeroWrites++;
        if ($zeroWrites >= 10000) {
            echo "[卡死警报] 内核已满！while 空转了 {$zeroWrites} 次全返回 0，整个服务器被彻底堵死！\n";
            break;
        }
    }
}

fclose($client);
fclose($conn);
fclose($server);
