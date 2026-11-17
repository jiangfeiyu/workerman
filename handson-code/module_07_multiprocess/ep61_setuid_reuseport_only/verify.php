<?php
declare(strict_types=1);

// 【独立验证】EP061 安全降权概念 + SO_REUSEPORT 内核开启校验
$uid = posix_getuid();
$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$ok = @socket_set_option($sock, SOL_SOCKET, SO_REUSEPORT, 1);
@socket_bind($sock, '127.0.0.1', 0);
socket_getsockname($sock, $addr, $port);
socket_close($sock);

$logs = [
    "[安全降权] 当前运行 uid={$uid} (生产环境 root 绑低端口后立即 posix_setuid 降权为 www-data)",
    "[SO_REUSEPORT] 独立监听 127.0.0.1:{$port} => " . ($ok ? 'ENABLED (内核哈希分发，告别惊群!)' : 'UNAVAILABLE'),
];

$snapshot = ['episode' => 'ep61', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
