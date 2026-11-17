<?php
declare(strict_types=1);

class Response
{
    /** @param array<string, string> $headers */
    public function __construct(
        public int $status = 200,
        public array $headers = ['Content-Type' => 'text/html; charset=utf-8'],
        public string $body = '',
    ) {}

    public static function json(mixed $data, int $status = 200): self
    {
        return new self(
            status: $status,
            headers: ['Content-Type' => 'application/json; charset=utf-8'],
            body: json_encode($data, JSON_UNESCAPED_UNICODE) ?: '{}',
        );
    }
}
