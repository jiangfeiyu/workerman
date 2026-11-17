<?php
declare(strict_types=1);

// EP097: 单层 Worker reload 10万连接雪崩 vs 双层分离推演
$totalConns = 100_000;
$reloadsPerDay = 3;

// 单层架构：每次 reload 重启所有 Worker，全部客户端被强迫断开重连
$monolithDrops = $totalConns * $reloadsPerDay;

// Gateway + BusinessWorker 双层分离：Gateway 半年不重启，只重启 BusinessWorker
$gatewayDrops = 0;

$snapshot = [
    'episode' => 'ep97',
    'output'  => [
        "[单层 Worker reload] 100,000 连接日发版 {$reloadsPerDay} 次 => 累计掉线重连风暴=" . number_format($monolithDrops) . ' 次',
        "[双层分离架构] Gateway 保活不变 + BusinessWorker 热重启 => 客户断线数={$gatewayDrops} (雪崩归零!)",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
