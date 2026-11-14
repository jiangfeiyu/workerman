<?php
$server = stream_socket_server("tcp://127.0.0.1:9999", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
$client = stream_socket_client("tcp://127.0.0.1:9999");
$conn = stream_socket_accept($server);

// 发送 5 个字节的 "hello"
fwrite($client, "hello");
