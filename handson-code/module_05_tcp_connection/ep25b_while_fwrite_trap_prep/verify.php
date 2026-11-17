<?php
declare(strict_types=1);

ob_start();
require __DIR__ . '/demo.php';
$out = trim((string)ob_get_clean());

$snapshot = [
    'episode' => 'ep25b',
    'output' => explode("\n", $out),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
