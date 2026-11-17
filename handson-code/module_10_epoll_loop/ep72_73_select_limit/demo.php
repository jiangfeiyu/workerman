<?php
declare(strict_types=1);

// EP072-073: 实测 stream_select() 随着 FD 数量增加的 O(N) 线性拷贝开销
function benchSelect(int $fdCount, int $ticks = 300): float
{
    $pairs = [];
    $read = [];
    for ($i = 0; $i < $fdCount; $i++) {
        $p = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);
        stream_set_blocking($p[0], false);
        $pairs[] = $p;
        $read[] = $p[0];
    }
    // 只有第 0 号管道有 1 字节可读数据，模拟高并发里绝大多数连接处于空闲态
    fwrite($pairs[0][1], 'x');

    $t0 = hrtime(true);
    for ($t = 0; $t < $ticks; $t++) {
        $r = $read;
        $w = $e = null;
        stream_select($r, $w, $e, 0, 0);
    }
    $ms = (hrtime(true) - $t0) / 1e6;

    foreach ($pairs as [$a, $b]) {
        fclose($a);
        fclose($b);
    }
    return $ms;
}

$ms50  = benchSelect(50);
$ms250 = benchSelect(250);
$ms500 = benchSelect(500);

$logs = [
    sprintf('[FD=50  实测 300 轮] stream_select O(N) 耗时 = %.2f ms', $ms50),
    sprintf('[FD=250 实测 300 轮] stream_select O(N) 耗时 = %.2f ms (线性膨胀)', $ms250),
    sprintf('[FD=500 实测 300 轮] stream_select O(N) 耗时 = %.2f ms | 硬上限 FD_SETSIZE=1024 超限即崩!', $ms500),
    '[epoll / kqueue 破局] 红黑树存注册 FD + 双向就绪链表只吐活跃事件 => 万级连接稳定 O(1)!',
];

$snapshot = ['episode' => 'ep72_73_select', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
