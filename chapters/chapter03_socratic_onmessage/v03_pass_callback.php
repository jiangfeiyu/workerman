<?php
// v0.3 你的第二次重构：把函数名装进变量 $onMessage，作为参数传给公共底座 runWorker($callback)！
function handleMessage($msg) {
    echo "【客服机器人回复】您刚才说的是: " . $msg . "\n";
}

$onMessage = "handleMessage";

// 公共底座函数（从此彻底跟具体业务解绑！它根本不知道外面传进来的是客服函数还是订单函数！）
function runWorker($callback) {
    while (($msg = fgets(STDIN)) !== false) {
        $msg = trim($msg);
        $callback($msg); // ✅ 彻底解耦！传给我什么函数，我就调什么函数！
    }
}

runWorker($onMessage);
