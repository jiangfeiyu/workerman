<?php
declare(strict_types=1);

// 【铺垫】函数也能像数字/字符串一样，放进数组里按编号随时触发！
$handlers = [];

$handlers[100] = function (string $msg): void {
    echo "[100号回调被触发] 收到: {$msg}\n";
};

$handlers[200] = function (string $msg): void {
    echo "[200号回调被触发] 转大写: " . strtoupper($msg) . "\n";
};

// 模拟事件来了：只需要查表 $handlers[$id]($data)，完全不需要 if / switch！
$events = [
    ['id' => 100, 'data' => 'hello worker'],
    ['id' => 200, 'data' => 'select loop'],
];

foreach ($events as $event) {
    $fn = $handlers[$event['id']] ?? null;
    if (is_callable($fn)) {
        $fn($event['data']);
    }
}
