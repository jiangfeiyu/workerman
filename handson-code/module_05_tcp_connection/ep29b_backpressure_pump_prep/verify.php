<?php
declare(strict_types=1);

require __DIR__ . '/demo.php';

$snapshot = [
    'episode' => 'ep29b',
    'output' => $logs,
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
