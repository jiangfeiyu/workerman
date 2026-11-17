<?php
declare(strict_types=1);

require_once __DIR__ . '/EventLoopInterface.php';

$ref = new ReflectionClass(EventLoopInterface::class);
$methods = array_map(
    fn (ReflectionMethod $m): string => $m->getName() . '(' . implode(', ', array_map(fn ($p) => '$' . $p->getName(), $m->getParameters())) . ')',
    $ref->getMethods()
);

$snapshot = [
    'episode' => 'ep08',
    'interface' => $ref->getName(),
    'methods' => $methods,
];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
