<?php
declare(strict_types=1);

require_once __DIR__ . '/../../module_02_select_loop/ep08_event_loop_interface/EventLoopInterface.php';
require_once __DIR__ . '/../../module_03_timer/ep16_select_loop_repeat/SelectLoopWithRepeat.php';

// 【独立验证】EP074 校验 EventLoopInterface 统一契约与引擎工厂降级
class EpollLoopDemo implements EventLoopInterface
{
    public function onReadable($stream, callable $callback): void {}
    public function offReadable($stream): void {}
    public function onWritable($stream, callable $callback): void {}
    public function offWritable($stream): void {}
    public function stop(): void {}
    public function run(): void {}

    public static function createBestLoop(): EventLoopInterface
    {
        return extension_loaded('event') ? new self() : new SelectLoopWithRepeat();
    }
}

$best = EpollLoopDemo::createBestLoop();
$ref = new ReflectionClass(EpollLoopDemo::class);
$logs = [
    '[接口契约一致] EpollLoop 实现同款 6 大方法: ' . implode(', ', array_map(fn ($m) => $m->getName(), array_slice($ref->getMethods(), 0, 6))),
    '[自动引擎探测] 当前环境选定引擎 => ' . get_class($best) . ' (上层业务 0 行改动!)',
];

$snapshot = ['episode' => 'ep74', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
