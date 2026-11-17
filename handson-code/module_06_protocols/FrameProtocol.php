<?php
declare(strict_types=1);

require_once __DIR__ . '/ProtocolInterface.php';

class FrameProtocol implements ProtocolInterface
{
    public const int MAX_PACKAGE_SIZE = 10 * 1024 * 1024; // 10MB 熔断防线

    public static function input(string $buffer): int
    {
        if (strlen($buffer) < 4) {
            return 0; // 连 4 字节包头都没收齐，继续等
        }
        $meta = unpack('NtotalLen', $buffer);
        $totalLen = (int)$meta['totalLen'];
        if ($totalLen < 4 || $totalLen > self::MAX_PACKAGE_SIZE) {
            throw new \LengthException("非法超大包长度: {$totalLen}");
        }
        return strlen($buffer) < $totalLen ? 0 : $totalLen;
    }

    public static function decode(string $package): string
    {
        return substr($package, 4);
    }

    public static function encode(mixed $data): string
    {
        $body = (string)$data;
        return pack('N', 4 + strlen($body)) . $body;
    }
}
