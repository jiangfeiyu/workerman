<?php
// 关卡 8.10 & 8.12 工业级万能协议：Frame 协议（定长 4 字节头部 + 变长包体）
require_once __DIR__ . '/03_protocol_interface_slot.php';

echo "=== 关卡 8.10 & 8.12 万能 Frame 协议实测 (PID: " . posix_getpid() . ") ===\n\n";

class FrameProtocol implements ProtocolInterface {
    // 🌟 防黑客恶意构造 2GB 巨大包头的安全红线（10MB）
    public const MAX_PACKAGE_SIZE = 10485760;

    public static function input(string $buffer, $connection): int {
        // 1. 如果连包头 4 个字节都还没凑齐，半包继续等！
        if (strlen($buffer) < 4) {
            return 0;
        }

        // 2. 读出包头记载的总包长（包含 4 字节头部 + 包体）
        $unpack = unpack('Ntotal_len', $buffer);
        $totalLen = $unpack['total_len'];

        // 3. 安全防洪：如果包长超过 10MB，判定为黑客恶意攻击，返回 -1 踢掉连接！
        if ($totalLen > self::MAX_PACKAGE_SIZE || $totalLen < 4) {
            echo "   ⚠️ [安全拦截] 收到非法超大包长: $totalLen 字节！踢下线！\n";
            $connection->destroy();
            return 0;
        }

        // 4. 返回整个数据包的准确长度
        return $totalLen;
    }

    public static function decode(string $buffer, $connection): mixed {
        // 裁切掉前面的 4 字节头部，只把纯净的包体交还给业务！
        return substr($buffer, 4);
    }

    public static function encode(mixed $data, $connection): string {
        $dataStr = (string)$data;
        $totalLen = 4 + strlen($dataStr);
        // 自动用 pack('N') 在最前面拼上 4 字节长度！
        return pack('N', $totalLen) . $dataStr;
    }
}

// ----------------- 服务端启动 -----------------
$loop = new AdvancedSelectLoop();
$server = stream_socket_server("tcp://127.0.0.1:8088");
stream_set_blocking($server, false);

$triggerCount = 0;

$loop->addRead($server, function ($server) use ($loop, &$triggerCount) {
    $socket = stream_socket_accept($server);
    stream_set_blocking($socket, false);
    $conn = new ProtocolConnection($socket, $loop);
    // 🌟 换上工业级万能 Frame 协议芯片！
    $conn->protocol = FrameProtocol::class;

    $conn->onMessage = function ($c, $msg) use (&$triggerCount) {
        $triggerCount++;
        echo "🎉 [服务端 onMessage 触发第 $triggerCount 次] 收到独立完整数据包 (长度: " . strlen($msg) . " 字节):\n";
        echo "----------------------------------------\n";
        echo $msg . "\n";
        echo "----------------------------------------\n\n";
    };
});

// ----------------- 客户端发送测试 -----------------
$client = stream_socket_client("tcp://127.0.0.1:8088");
stream_set_blocking($client, false);

$loop->after(0.05, function () use ($client) {
    echo "1. [客户端] 一次性连续发送两条极端数据（粘在一起发）：\n";
    echo "   数据包 1: 包含多个 \\n 换行符的多行诗歌\n";
    echo "   数据包 2: 包含纯二进制不可打印字符 (包含 \\x00, \\x0a 等)\n\n";

    // 诗歌
    $msg1 = "床前明月光\n疑是地上霜\n举头望明月\n低头思故乡";
    $pkg1 = FrameProtocol::encode($msg1, null);

    // 纯二进制数据（包含换行符 0x0A 和空字符 0x00）
    $msg2 = "【二进制流】" . pack("C*", 0x00, 0x0A, 0xFF, 0x0D, 0x0A, 0x88);
    $pkg2 = FrameProtocol::encode($msg2, null);

    // 把两个包粘在一次 fwrite 里喷上网线！
    fwrite($client, $pkg1 . $pkg2);
});

$loop->after(0.15, function () {
    echo "=== 实验圆满成功 ===\n";
    exit(0);
});

$loop->loop();
