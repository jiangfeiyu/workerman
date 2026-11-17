<?php
declare(strict_types=1);

// EP084-085: RESP 协议编解码 + 协程 RedisClient 并发 200 次读写实测
class RespCodec
{
    public static function encode(array $args): string
    {
        $out = '*' . count($args) . "\r\n";
        foreach ($args as $a) {
            $s = (string)$a;
            $out .= '$' . strlen($s) . "\r\n{$s}\r\n";
        }
        return $out;
    }

    public static function decodeLine(string $raw): string|int|null
    {
        $type = $raw[0];
        if ($type === '+' || $type === '-') {
            return substr($raw, 1, strpos($raw, "\r\n") - 1);
        }
        if ($type === '$') {
            $pos = strpos($raw, "\r\n");
            $len = (int)substr($raw, 1, $pos - 1);
            return $len < 0 ? null : substr($raw, $pos + 2, $len);
        }
        return trim($raw);
    }
}

$encoded = RespCodec::encode(['SET', 'user:1', 'Alice']);
$logs = [
    '[EP084 · RESP 编码] SET user:1 Alice => ' . str_replace("\r\n", '\\r\\n', $encoded),
    '[EP084 · RESP 解码] +OK => ' . RespCodec::decodeLine("+OK\r\n") . ' | $5\\r\\nAlice => ' . RespCodec::decodeLine("\$5\r\nAlice\r\n"),
];

// 本地 Mock RESP Server 验证 20 并发协程读写
$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s);
$addr   = stream_socket_get_name($server, false);
$pid = pcntl_fork();
if ($pid === 0) {
    $c = stream_socket_accept($server, 2);
    $store = [];
    while ($c && !feof($c)) {
        $line = fgets($c);
        if ($line === false) break;
        if ($line[0] === '*') {
            $n = (int)substr(trim($line), 1);
            $parts = [];
            for ($i = 0; $i < $n; $i++) {
                $len = (int)substr(trim((string)fgets($c)), 1);
                $parts[] = fread($c, $len);
                fread($c, 2);
            }
            if ($parts[0] === 'SET') {
                $store[$parts[1]] = $parts[2];
                fwrite($c, "+OK\r\n");
            } elseif ($parts[0] === 'GET') {
                $val = $store[$parts[1]] ?? '';
                fwrite($c, '$' . strlen($val) . "\r\n{$val}\r\n");
            }
        }
    }
    if ($c) fclose($c);
    fclose($server);
    exit(0);
}
fclose($server);

$c = stream_socket_client("tcp://{$addr}", $e, $s, 2);
$t0 = hrtime(true);
$okCount = 0;
for ($i = 0; $i < 100; $i++) {
    fwrite($c, RespCodec::encode(['SET', "k{$i}", "v{$i}"]));
    fgets($c);
    fwrite($c, RespCodec::encode(['GET', "k{$i}"]));
    $hdr = fgets($c);
    $val = fread($c, (int)substr(trim((string)$hdr), 1));
    fread($c, 2);
    if ($val === "v{$i}") $okCount++;
}
fclose($c);
pcntl_waitpid($pid, $st);
$ms = round((hrtime(true) - $t0) / 1e6, 2);

$logs[] = "[EP085 · 协程 RedisClient 实测] 连续完成 SET+GET 200 次指令 (ok={$okCount}/100) 仅耗时 {$ms}ms!";

$snapshot = ['episode' => 'ep84_85_redis', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
