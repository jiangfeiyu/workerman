<?php
// v0.1 最笨直觉版：把“读取管子”和“业务处理”死死焊在一起
while (($msg = fgets(STDIN)) !== false) {
    $msg = trim($msg);
    echo "【客服机器人回复】您刚才说的是: " . $msg . "\n";
}
