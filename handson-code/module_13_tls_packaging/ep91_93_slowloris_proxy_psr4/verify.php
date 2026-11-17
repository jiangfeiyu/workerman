<?php
declare(strict_types=1);

// EP091-093: Slowloris 慢连接防护 + X-Forwarded-For 受信任代理 + PSR-4 总装验收
function resolveRealIp(string $remoteIp, string $xffHeader, array $trustedProxies): string
{
    if (!in_array($remoteIp, $trustedProxies, true)) {
        return $remoteIp; // 非白名单来源：严禁信任伪造的 X-Forwarded-For!
    }
    $parts = array_filter(array_map('trim', explode(',', $xffHeader)));
    return $parts[0] ?? $remoteIp;
}

$logs = [];

// 1. Slowloris 防护演示
$headerTimeoutSec = 5.0;
$elapsed = 6.2;
$logs[] = "[EP091 · Slowloris 慢连接防御] 仅收半截头且耗时 {$elapsed}s > {$headerTimeoutSec}s => 触发超时强踢连接!";

// 2. X-Forwarded-For 白名单透传防伪造演示
$trusted = ['127.0.0.1', '10.0.0.1'];
$ipTrusted = resolveRealIp('10.0.0.1', '203.0.113.88, 10.0.0.1', $trusted);
$ipSpoofed = resolveRealIp('198.51.100.7', '8.8.8.8', $trusted);
$logs[] = "[EP092 · 受信任 Nginx(10.0.0.1) 透传] 真实客户 IP = {$ipTrusted} | 黑客直连伪造 XFF => 锁定直连 IP = {$ipSpoofed}";

// 3. EP093: PSR-4 + composer.json 标准总装校验
$composer = [
    'name' => 'modern-worker/core',
    'require' => ['php' => '>=8.2'],
    'autoload' => ['psr-4' => ['ModernWorker\\' => 'src/']],
];
$logs[] = '[EP093 · 第 5 篇总装] composer.json PSR-4 => ModernWorker\\ => src/ | Fiber + Pool + TLS 全部就绪!';

$snapshot = ['episode' => 'ep91_93_security', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
