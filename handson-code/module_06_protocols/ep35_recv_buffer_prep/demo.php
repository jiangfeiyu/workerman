<?php
declare(strict_types=1);

// 【铺垫】先不写 Protocol 类，用 15 行理解 $recvBuffer 蓄水池 + while 循环切包！
$chunks = [
    '{"id":1,"msg":"hi"}' . "\n" . '{"id":2,"m', // 第1次 fread：1条完整 + 第2条半截！
    'sg":"ok"}' . "\n" . '{"id":3,"msg":"yo"}' . "\n", // 第2次 fread：补齐第2条 + 第3条！
];

$recvBuffer = '';
foreach ($chunks as $round => $chunk) {
    $recvBuffer .= $chunk; // 1. 新到达字节先倒进蓄水池
    echo "[第" . ($round + 1) . "次收到 chunk] 当前蓄水池长度 = " . strlen($recvBuffer) . "\n";

    // 2. 用 while 循环尽可能切出所有完整消息（以 \n 为边界）
    while (($pos = strpos($recvBuffer, "\n")) !== false) {
        $onePacket = substr($recvBuffer, 0, $pos);
        $recvBuffer = substr($recvBuffer, $pos + 1); // 切掉已消费部分！
        echo "  -> [切出完整包] {$onePacket} (池中剩余 " . strlen($recvBuffer) . "B)\n";
    }
}
