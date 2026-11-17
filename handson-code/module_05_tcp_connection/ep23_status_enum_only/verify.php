<?php
declare(strict_types=1);

require_once __DIR__ . '/../ConnectionStatus.php';

// 【独立验证】演示 ConnectionStatus 四态流转与状态守卫
$status = ConnectionStatus::Connecting;
$logs = ["[状态初始化] 异步拨号阶段: {$status->value}"];

$status = ConnectionStatus::Established;
$logs[] = "[握手完成] 进入可收发状态: {$status->value}";

// 模拟调用 close() 进入 Closing 半关闭状态
$status = ConnectionStatus::Closing;
$canSend = ($status === ConnectionStatus::Established);
$logs[] = "[进入 Closing] 尝试 send() 被状态守卫拦截: allowed=" . ($canSend ? 'true' : 'false');

// 模拟 destroy() 幂等防重
$destroyCount = 0;
$destroy = function () use (&$status, &$destroyCount, &$logs): void {
    if ($status === ConnectionStatus::Closed) {
        $logs[] = "[幂等拦截] 当前已是 closed，忽略重复 destroy()";
        return;
    }
    $status = ConnectionStatus::Closed;
    $destroyCount++;
    $logs[] = "[执行销毁] 状态切换为 {$status->value} (第 {$destroyCount} 次清理)";
};

$destroy();
$destroy(); // 故意重复调一次，验证幂等

$snapshot = ['episode' => 'ep23', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
