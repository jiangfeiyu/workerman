<?php
declare(strict_types=1);

// 【独立验证】EP084 Redis RESP 编解码器（不剧透 EP085 压测）
$encode = static function (array $args): string {
    $out = '*' . count($args) . "\r\n";
    foreach ($args as $a) {
        $s = (string)$a;
        $out .= '$' . strlen($s) . "\r\n{$s}\r\n";
    }
    return $out;
};

$decodeLine = static function (string $raw): string|null {
    if ($raw[0] === '+') return substr($raw, 1, strpos($raw, "\r\n") - 1);
    if ($raw[0] === '$') {
        $p = strpos($raw, "\r\n");
        $len = (int)substr($raw, 1, $p - 1);
        return $len < 0 ? null : substr($raw, $p + 2, $len);
    }
    return trim($raw);
};

$encoded = str_replace("\r\n", "\\r\\n", $encode(['SET', 'user:1', 'Alice']));
$logs = [
    "[RESP 编码] SET user:1 Alice => {$encoded}",
    '[RESP 解码] +OK => ' . $decodeLine("+OK\r\n") . ' | $5\\r\\nAlice => ' . $decodeLine("\$5\r\nAlice\r\n"),
];

$snapshot = ['episode' => 'ep84', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
