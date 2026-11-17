<?php
declare(strict_types=1);

require_once __DIR__ . '/../ep15_select_loop_delay_del/SelectLoop.php';

class SelectLoopWithRepeat extends SelectLoop
{
    /** @var array<int, bool> */
    private array $repeating = [];

    public function repeat(float $interval, callable $callback): int
    {
        $repeatId = random_int(100000, 999999);
        $this->repeating[$repeatId] = true;
        $this->scheduleNext($repeatId, $interval, $callback);
        return $repeatId;
    }

    private function scheduleNext(int $repeatId, float $interval, callable $callback): void
    {
        $this->delay($interval, function () use ($repeatId, $interval, $callback): void {
            if (!isset($this->repeating[$repeatId])) {
                return;
            }
            $callback($repeatId);
            if (isset($this->repeating[$repeatId])) {
                $this->scheduleNext($repeatId, $interval, $callback);
            }
        });
    }

    public function cancelRepeat(int $repeatId): void
    {
        unset($this->repeating[$repeatId]);
    }
}
