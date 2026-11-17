<?php
declare(strict_types=1);

require_once __DIR__ . '/ProtocolInterface.php';

class TextProtocol implements ProtocolInterface
{
    public static function input(string $buffer): int
    {
        $pos = strpos($buffer, "\n");
        return $pos === false ? 0 : $pos + 1;
    }

    public static function decode(string $package): string
    {
        return rtrim($package, "\r\n");
    }

    public static function encode(mixed $data): string
    {
        return (string)$data . "\n";
    }
}
