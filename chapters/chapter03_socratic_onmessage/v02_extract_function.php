<?php
// v0.2 你的第一次重构：把业务逻辑抽成独立函数 handleMessage($msg)
function handleMessage($msg) {
    echo "【客服机器人回复】您刚才说的是: " . $msg . "\n";
}

while (($msg = fgets(STDIN)) !== false) {
    $msg = trim($msg);
    handleMessage($msg);
}
