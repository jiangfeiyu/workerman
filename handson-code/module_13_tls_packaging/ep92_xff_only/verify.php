<?php
declare(strict_types=1);

// 【独立验证】EP092 受信任代理白名单 vs 伪造 X-Forwarded-For 拦截
function resolveRealIp(string $remoteIp, string $xffHeader, array $trustedProxies): string
{
    if (!in_array($remoteIp, $trustedProxies, true)) {
        return $remoteIp; // 不在白名单，无视伪造 XFF 头
    }
    $parts = array_filter(array_map('trim', explode(',', $xffHeader)));
    return $parts[0] ?? $remoteIp;
}

$trusted = ['127.0.0.1', '10.0.0.1'];
$ip1 = resolveRealIp('10.0.0.1', '203.0.113.88, 10.0.0.1', $trusted);
$ip2 = resolveRealIp('198.51.100.7', '8.8.8.8', $trusted);

$logs = [
    "[受信任 Nginx(10.0.0.1) 透传] XFF=203.0.113.88 => 采信真实 IP: {$ip1}",
    "[黑客直连伪造 XFF(8.8.8.8)] 198.51.100.7 不在白名单 => 锁定直连 IP: {$ip2}",
];

$snapshot = ['episode' => 'ep92', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
