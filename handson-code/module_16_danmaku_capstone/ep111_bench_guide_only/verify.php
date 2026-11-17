<?php
declare(strict_types=1);

// EP111: 压测读数指南：计算 P50 / P99 尾延迟与识破“假高并发”陷阱
$latencies = array_fill(0, 990, 0.8);
$latencies = array_merge($latencies, array_fill(0, 10, 420.0)); // 1% 尾延迟毛刺
sort($latencies);

$avg = round(array_sum($latencies) / count($latencies), 2);
$p50 = $latencies[(int)(count($latencies) * 0.50)];
$p99 = $latencies[(int)(count($latencies) * 0.99)];

// 识破 404/500 假 QPS：有效 2xx 才计入真实吞吐
$rawQps = 100_000;
$non2xx = 99_500;
$validQps = $rawQps - $non2xx;

$snapshot = [
    'episode' => 'ep111',
    'output'  => [
        "[尾延迟真相] P50={$p50}ms | Avg={$avg}ms (看起来很美) -> P99={$p99}ms (1%用户卡死!)",
        "[假高并发识破] 总QPS={$rawQps} 但 Non-2xx={$non2xx} => 真实有效 QPS={$validQps} (必须检查错误率与 ulimit!)",
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
