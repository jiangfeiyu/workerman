<?php
declare(strict_types=1);

require_once __DIR__ . '/../ProtocolInterface.php';

class WebsocketProtocol implements ProtocolInterface
{
    public const string GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

    public static function handshakeResponse(string $httpHeader): string
    {
        if (!preg_match('/Sec-WebSocket-Key:\s*(.+?)\r\n/i', $httpHeader, $m)) {
            return "HTTP/1.1 400 Bad Request\r\n\r\n";
        }
        $accept = base64_encode(sha1(trim($m[1]) . self::GUID, true));
        return "HTTP/1.1 101 Switching Protocols\r\n"
            . "Upgrade: websocket\r\n"
            . "Connection: Upgrade\r\n"
            . "Sec-WebSocket-Accept: {$accept}\r\n\r\n";
    }

    public static function input(string $buffer): int
    {
        $recvLen = strlen($buffer);
        if ($recvLen < 2) {
            return 0;
        }
        $second = ord($buffer[1]);
        $masked = ($second >> 7) & 1;
        $dataLen = $second & 0x7f;
        $headLen = 2 + ($masked ? 4 : 0);

        if ($dataLen === 126) {
            if ($recvLen < $headLen + 2) return 0;
            $dataLen = unpack('n', substr($buffer, 2, 2))[1];
            $headLen += 2;
        } elseif ($dataLen === 127) {
            if ($recvLen < $headLen + 8) return 0;
            $dataLen = unpack('J', substr($buffer, 2, 8))[1];
            $headLen += 8;
        }

        $total = $headLen + $dataLen;
        return $recvLen < $total ? 0 : $total;
    }

    public static function decode(string $package): string
    {
        $second = ord($package[1]);
        $masked = ($second >> 7) & 1;
        $lenCode = $second & 0x7f;
        $offset = 2 + ($lenCode === 126 ? 2 : ($lenCode === 127 ? 8 : 0));

        if (!$masked) {
            return substr($package, $offset);
        }
        $maskKey = substr($package, $offset, 4);
        $payload = substr($package, $offset + 4);
        $decoded = '';
        $len = strlen($payload);
        for ($i = 0; $i < $len; $i++) {
            $decoded .= $payload[$i] ^ $maskKey[$i % 4];
        }
        return $decoded;
    }

    public static function encode(mixed $data): string
    {
        $payload = (string)$data;
        $len = strlen($payload);
        $first = chr(0x81); // FIN=1, Opcode=1 (Text frame)
        if ($len <= 125) {
            return $first . chr($len) . $payload;
        }
        if ($len <= 65535) {
            return $first . chr(126) . pack('n', $len) . $payload;
        }
        return $first . chr(127) . pack('J', $len) . $payload;
    }
}
