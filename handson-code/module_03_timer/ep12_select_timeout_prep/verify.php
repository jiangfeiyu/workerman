<?php
declare(strict_types=1);

$out = shell_exec(PHP_BINARY . ' ' . __DIR__ . '/demo.php');
$snapshot = [
    'episode' => 'ep12',
    'output' => array_values(array_filter(explode("\n", trim((string)$out)))),
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
