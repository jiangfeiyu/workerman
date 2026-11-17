<?php
declare(strict_types=1);

// EP102: Register 注册中心：服务发现广播与心跳超时剔除
$gatewayNodes = [];
$now = 1000.0;

// 1. gw-1 / gw-2 注册上线
$gatewayNodes['10.0.0.8:2901'] = $now;
$gatewayNodes['10.0.0.9:2901'] = $now - 12.0; // 模拟 gw-2 已 12 秒没发心跳
$initialList = array_keys($gatewayNodes);

// 2. sweepDeadNodes(timeout=10s) 剔除失联节点并广播最新名单
$timeout = 10.0;
foreach ($gatewayNodes as $addr => $lastHb) {
    if ($now - $lastHb > $timeout) {
        unset($gatewayNodes[$addr]);
    }
}
$healthyList = array_keys($gatewayNodes);

$snapshot = [
    'episode' => 'ep102',
    'output'  => [
        '[Register 广播节点] 推送在线列表至全部 BusinessWorker: [' . implode(', ', $initialList) . ']',
        '[心跳超时剔除] 10.0.0.9:2901 超时>10s 被摘除 -> 剩余健康节点: [' . implode(', ', $healthyList) . ']',
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
