<?php
declare(strict_types=1);

// 【踩坑】非阻塞模式下用裸 fwrite() 一口气发 10MB 数据，为什么直接丢了大半？
$port = '19025';
$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);
stream_set_blocking($server, false);

// 慢速接收端：故意连进来先不读数据，让内核发送缓冲区迅速塞满
$client = stream_socket_client("tcp://127.0.0.1:{$port}", $e1, $s1, 2);
$conn = @stream_socket_accept($server, 1);
stream_set_blocking($conn, false);

$payload = str_repeat('A', 10 * 1024 * 1024); // 10 MB
$totalBytes = strlen($payload);
$written = @fwrite($conn, $payload);

$lostBytes = $totalBytes - (int)$written;
echo sprintf(
    "[10MB 裸写惨案] 计划发送 = %s bytes, fwrite 实际只写入 = %s bytes, 凭空丢失 = %s bytes (%.1f%%)!\n",
    number_format($totalBytes),
    number_format((int)$written),
    number_format($lostBytes),
    ($lostBytes / $totalBytes) * 100
);

fclose($client);
fclose($conn);
fclose($server);
