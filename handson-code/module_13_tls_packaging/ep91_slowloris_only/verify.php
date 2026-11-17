<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立真实验证】EP091 Slowloris 慢连接攻击防御：$loop->delay() 超时未收齐首包即强踢
$loop = new SelectLoopWithRepeat();
$firstPkgDone = false;
$kicked = false;
$logs = [];

$loop->delay(0.05, function () use (&$firstPkgDone, &$kicked, &$logs): void {
    if (!$firstPkgDone) {
        $kicked = true;
        $logs[] = '[Slowloris 定时器触发] 超过阈值仍未收齐完整 HTTP 头 (firstPkgDone=false) → 立刻 destroy() 强踢释放 FD!';
    }
});

$logs[] = '[Recv 半截请求] GET / HTTP/1.1\\r\\n (黑客故意不发结尾 \\r\\n\\r\\n)';
$loop->run();

$snapshot = ['episode' => 'ep91', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
