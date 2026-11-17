<?php
declare(strict_types=1);

// EP104B【加餐过渡】: BusinessWorker 必须无状态——$_SESSION 与 uid 路由表究竟存哪？
// 验证：BusinessWorker v1 写入 Session 并下发给 Gateway 保管 -> v1 进程销毁 -> v2 仍收到完整会话!
$gatewayConnSession = [];

// 1. BusinessWorker v1 登录鉴权后修改 $_SESSION，Gateway 持久保存在对应连接上下文中
$cid = '7f0000010b5500000007';
$gatewayConnSession[$cid] = ['uid' => 'uid_888', 'vip' => true];

// 2. BusinessWorker v1 进程销毁（本地变量清空），新进程 v2 接管下一条消息
$bizV1LocalMemory = null; // v1 内存清零
$v2ReceivedSession = $gatewayConnSession[$cid]; // Gateway 随报文带回最新 $_SESSION

$snapshot = [
    'episode' => 'ep104b',
    'output'  => [
        '[误区警示] 若 $_SESSION/uidMap 放 BusinessWorker 进程内存 -> reload 即丢失且多 Worker 隔离!',
        '[正确存储] 会话与绑定表交由 Gateway(或共享存储)托管 -> v2 重启仍读出 uid=' . $v2ReceivedSession['uid'],
    ],
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
