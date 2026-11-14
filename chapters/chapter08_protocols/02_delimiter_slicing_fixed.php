<?php
// 关卡 8.4 & 8.5 招式演进：引入 $recvBuffer 与换行符切包循环
require_once __DIR__ . '/../chapter07_tcp_connection/07_async_send_buffer.php';

echo "=== 关卡 8.4 & 8.5 接收蓄水池 \$recvBuffer 与精准切包 (PID: " . posix_getpid() . ") ===\n\n";

class StreamSlicedConnection extends TcpConnection {
    // 🌟 核心进化：第二座大水库 —— 应用层接收蓄水池！
    protected string $recvBuffer = '';

    public function baseRead($socket): void {
        $data = @fread($socket, 65535);
        if ($data === '' || $data === false) {
            $this->destroy();
            if ($this->onClose) ($this->onClose)($this);
            return;
        }

        // 🌟 1. 无论是半包还是粘包，先无脑倒进接收大水盆！
        $this->recvBuffer .= $data;

        // 🌟 2. 切包循环：用 strpos 扫描换行符 \n
        while (($pos = strpos($this->recvBuffer, "\n")) !== false) {
            // 舀出一句完整的话
            $oneMessage = substr($this->recvBuffer, 0, $pos);
            // 将这句话连同 \n 从大水盆里舀走，剩下的留着
            $this->recvBuffer = substr($this->recvBuffer, $pos + 1);

            // 3. 此时这绝对是一句完整的话！安全触发 onMessage！
            if ($this->onMessage) {
                ($this->onMessage)($this, $oneMessage);
            }
        }
    }
}

// ----------------- 服务端启动 -----------------
$loop = new AdvancedSelectLoop();
$server = stream_socket_server("tcp://127.0.0.1:8085");
stream_set_blocking($server, false);

$triggerCount = 0;

$loop->addRead($server, function ($server) use ($loop, &$triggerCount) {
    $socket = stream_socket_accept($server);
    stream_set_blocking($socket, false);
    $conn = new StreamSlicedConnection($socket, $loop);

    $conn->onMessage = function ($c, $msg) use (&$triggerCount) {
        $triggerCount++;
        echo "🎉 [onMessage 触发第 $triggerCount 次] 收到独立消息: " . strlen($msg) . " 字节\n";
        
        if (strlen($msg) <= 50) {
            echo "   内容: \"$msg\"\n";
        } else {
            // 验证 100KB 大 JSON 解析
            $data = json_decode($msg, true);
            if ($data !== null) {
                echo "   ✨ 100KB JSON 完整拼装并成功解析！内含数据项: " . strlen($data['data']) . " 字节！\n";
            } else {
                echo "   ❌ 依然失败！\n";
            }
        }
    };
});

// ----------------- 客户端发送测试 -----------------
$client = stream_socket_client("tcp://127.0.0.1:8085");
stream_set_blocking($client, false);

// 1. 客户端快速连续发送 10 次 "hello\n"（粘包攻击）
$loop->after(0.05, function () use ($client) {
    echo "1. [客户端] 连续调用 10 次 fwrite(\$client, \"hello\\n\")...\n";
    for ($i = 1; $i <= 10; $i++) {
        fwrite($client, "hello\n");
    }
    echo "   -> 客户端发送完毕！\n\n";
});

// 2. 客户端发送 1 个 100KB 的 JSON（末尾带 \n，半包攻击）
$loop->after(0.15, function () use ($client) {
    echo "\n2. [客户端] 发送 100KB 包含 \\n 的大 JSON 数据...\n";
    $bigData = json_encode(['data' => str_repeat('Y', 100000)]) . "\n";
    fwrite($client, $bigData);
    echo "   -> 客户端发送完毕！\n\n";
});

// 结束实验
$loop->after(0.3, function () {
    echo "\n=== 实验圆满结束 ===\n";
    exit(0);
});

$loop->loop();
