<?php
declare(strict_types=1);

require_once __DIR__ . '/../ProtocolInterface.php';
require_once __DIR__ . '/Request.php';
require_once __DIR__ . '/Response.php';

class HttpProtocol implements ProtocolInterface
{
    private const array REASON_PHRASES = [
        200 => 'OK',
        400 => 'Bad Request',
        404 => 'Not Found',
        500 => 'Internal Server Error',
    ];

    public static function input(string $buffer): int
    {
        $headerEnd = strpos($buffer, "\r\n\r\n");
        if ($headerEnd === false) {
            return 0; // HTTP 请求头尚未收齐
        }
        $headerBlock = substr($buffer, 0, $headerEnd);
        $contentLen = 0;
        if (preg_match('/\r\nContent-Length:\s*(\d+)/i', $headerBlock, $m)) {
            $contentLen = (int)$m[1];
        }
        $totalLen = $headerEnd + 4 + $contentLen;
        return strlen($buffer) < $totalLen ? 0 : $totalLen;
    }

    public static function decode(string $package): Request
    {
        $headerEnd = (int)strpos($package, "\r\n\r\n");
        $rawHeader = substr($package, 0, $headerEnd);
        $body = substr($package, $headerEnd + 4);

        $lines = explode("\r\n", $rawHeader);
        [$method, $uri] = explode(' ', array_shift($lines), 3);
        $parts = parse_url($uri);
        $path = $parts['path'] ?? '/';
        $query = [];
        if (isset($parts['query'])) {
            parse_str($parts['query'], $query);
        }

        $headers = [];
        foreach ($lines as $line) {
            if (str_contains($line, ':')) {
                [$k, $v] = explode(':', $line, 2);
                $headers[strtolower(trim($k))] = trim($v);
            }
        }

        return new Request($method, $path, $query, $headers, $body);
    }

    public static function encode(mixed $data): string
    {
        $resp = $data instanceof Response ? $data : new Response(body: (string)$data);
        $reason = self::REASON_PHRASES[$resp->status] ?? 'OK';
        $headers = $resp->headers;
        $headers['Content-Length'] = (string)strlen($resp->body);
        $headers['Connection'] ??= 'keep-alive';

        $raw = "HTTP/1.1 {$resp->status} {$reason}\r\n";
        foreach ($headers as $k => $v) {
            $raw .= "{$k}: {$v}\r\n";
        }
        return $raw . "\r\n" . $resp->body;
    }
}
