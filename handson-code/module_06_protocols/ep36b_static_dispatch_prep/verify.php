<?php
declare(strict_types=1);

require_once __DIR__ . '/../ProtocolInterface.php';

// 【加餐过渡】为什么用静态方法？5 行看懂 ($this->protocol)::input() 与接入 TcpConnection！
class DemoLineProtocol implements ProtocolInterface
{
    public static function input(string $buffer): int {
        $pos = strpos($buffer, "\n");
        return $pos === false ? 0 : $pos + 1;
    }
    public static function decode(string $package): string {
        return rtrim($package, "\r\n");
    }
    public static function encode(mixed $data): string {
        return (string)$data . "\n";
    }
}

class MiniConnection
{
    public string $recvBuffer = '';
    public function __construct(private string $protocol) {} // 只存类名字符串，10万连接 0 对象开销！

    public function feed(string $chunk): array
    {
        $this->recvBuffer .= $chunk;
        $msgs = [];
        while (($len = ($this->protocol)::input($this->recvBuffer)) > 0) {
            $pkg = substr($this->recvBuffer, 0, $len);
            $this->recvBuffer = substr($this->recvBuffer, $len);
            $msgs[] = ($this->protocol)::decode($pkg);
        }
        return $msgs;
    }
}

$conn = new MiniConnection(DemoLineProtocol::class);
$out1 = $conn->feed("hi\nwo");
$out2 = $conn->feed("rld\n");

$logs = [
    '[零对象开销] $protocol = "' . DemoLineProtocol::class . '" (仅存类名字符串)',
    '[第1次 feed("hi\\nwo")] 切出: ' . json_encode($out1) . ' (余 "wo" 留池)',
    '[第2次 feed("rld\\n")] 切出: ' . json_encode($out2) . ' (池已排空!)',
];
$snapshot = ['episode' => 'ep36b', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
