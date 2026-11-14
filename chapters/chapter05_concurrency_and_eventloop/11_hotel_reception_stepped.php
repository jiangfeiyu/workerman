<?php
// 关卡 5.12 终极平缓阶梯：用两个普通独立函数彻底看清事件派发（无闭包嵌套，大白话版）

// 【第一部分：两张大白话表】
$sockets  = []; // 门铃表：记录有哪几个门铃（[FD编号 => Socket资源]）
$handlers = []; // 卡片表：记录每个门铃响了应该找谁（[FD编号 => 函数名]）

// 【第二部分：两个纯粹独立的办事员函数】

// 办事员 1：专职大门口迎宾接待
function handleNewGuest($server) {
    global $sockets, $handlers;
    
    // 1. 迎宾员开门接客
    $conn = stream_socket_accept($server);
    if (!$conn) return;

    $connId = (int)$conn;
    echo "🔔【大门门铃响了】接待新客人！分配了包厢号码牌 FD: $connId\n";

    // 2. 在两张表上同时登记这位新客人：
    $sockets[$connId]  = $conn;                  // 门铃表：挂上这位客人的门铃
    $handlers[$connId] = 'handleGuestMessage';  // 卡片表：写上“只要他说话，就找 handleGuestMessage 伺候”
}

// 办事员 2：专职包厢陪客人聊天
function handleGuestMessage($conn) {
    global $sockets, $handlers;
    $connId = (int)$conn;

    $msg = fread($conn, 1024);

    // 如果客人挂机退房离开
    if ($msg === '' || $msg === false) {
        echo "🚪【包厢退房】客人 FD $connId 挂机离开了！\n";
        fclose($conn);
        // 从两张表里彻底注销（挂断并抹除）
        unset($sockets[$connId], $handlers[$connId]);
        return;
    }

    echo "💬【包厢门铃响了】客人 FD $connId 说了话: " . trim($msg) . "\n";
    fwrite($conn, "服务端回复: " . trim($msg) . "\n");
}


// 【第三部分：饭店开门营业】
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
$serverId = (int)$server;

// 在两张表上登记大门迎宾员：
$sockets[$serverId]  = $server;
$handlers[$serverId] = 'handleNewGuest'; // 大门门铃一响，指定找 handleNewGuest 办事！

echo "=== 饭店开门营业 (PID: " . posix_getpid() . ")，监听 8080 端口 ===\n";
echo "当前门铃表已登记: FD $serverId (大门口)\n";
echo "当前卡片表已登记: FD $serverId -> handleNewGuest\n\n";

// 【第四部分：前台保安唯一的日常工作循环】
while (true) {
    // 1. 拿出当前所有的门铃，让内核保安盯梢
    $read = $sockets;
    $write = $except = null;
    if (stream_select($read, $write, $except, null) <= 0) continue;

    // 2. 谁的门铃响了，就翻出他的卡片，叫对应的办事员去干活！
    foreach ($read as $socket) {
        $id = (int)$socket;
        $workerName = $handlers[$id]; // 查卡片：该找哪个函数？
        
        // 这一行调用：相当于调用 handleNewGuest($socket) 或 handleGuestMessage($socket)
        $workerName($socket);
    }
}
