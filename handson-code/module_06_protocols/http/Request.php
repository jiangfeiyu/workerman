<?php
declare(strict_types=1);

readonly class Request
{
    /** @param array<string, string> $headers */
    /** @param array<string, string> $query */
    public function __construct(
        public string $method,
        public string $path,
        public array $query,
        public array $headers,
        public string $body,
    ) {}

    public function header(string $name, string $default = ''): string
    {
        return $this->headers[strtolower($name)] ?? $default;
    }

    public function isKeepAlive(): bool
    {
        $conn = strtolower($this->header('connection'));
        return $conn !== 'close';
    }
}
