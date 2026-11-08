<?php
$server = stream_socket_server("tcp://127.0.0.1:9999");
$client = stream_socket_client("tcp://127.0.0.1:9999");
$conn = stream_socket_accept($server);

// 发送 5 个字节的 "hello"
fwrite($client, "hello");
