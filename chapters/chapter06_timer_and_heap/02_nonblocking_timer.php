<?php
// 关卡 6.3 【招式演进】：在事件循环中手写你的第一个非阻塞闹钟！

class TimerWorker {
    protected array $readFds = [];
    protected array $handlers = [];

    // 闹钟本：记录要在哪个时间点执行哪个任务
    // 结构：[['time' => 目标执行时间戳, 'callback' => 回调函数], ...]
    protected array $timers = [];

    public function __construct(public string $address) {}

    /**
     * 注册一个在 $seconds 秒后执行的非阻塞闹钟
     */
    public function after(float $seconds, callable $callback): void {
        $runTime = microtime(true) + $seconds;
        $this->timers[] = [
            'time' => $runTime,
            'callback' => $callback,
        ];
        echo "⏰【设定闹钟成功】将在 $seconds 秒后（即 " . date('H:i:s', (int)$runTime) . "）执行！\n";
    }

    public function run(): void {
        $server = stream_socket_server($this->address, context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
        $serverId = (int)$server;
        $this->readFds[$serverId] = $server;
        $this->handlers[$serverId] = [$this, 'acceptConnection'];

        echo "=== 非阻塞定时器服务器已启动 (PID: " . posix_getpid() . ") ===\n";

        while (true) {
            // 1. 动态计算：接下来应该睡几秒？
            $timeout = null; // 默认：如果没有闹钟，就一直睡（null）

            if (!empty($this->timers)) {
                // 找到距离现在最近的一个闹钟时间
                $now = microtime(true);
                $minTime = PHP_FLOAT_MAX;
                foreach ($this->timers as $t) {
                    if ($t['time'] < $minTime) {
                        $minTime = $t['time'];
                    }
                }
                // 计算还需要等待的秒数（最多睡这么多，不能把闹钟睡过了！）
                $timeout = max(0, $minTime - $now);
            }

            // 2. 委托内核保安盯梢，传入动态计算的打盹上限时间！
            $read = $this->readFds;
            $write = $except = null;
            
            // stream_select 的第 4 参数是秒，第 5 参数是微秒
            if ($timeout === null) {
                @stream_select($read, $write, $except, null);
            } else {
                $sec = (int)$timeout;
                $usec = (int)(($timeout - $sec) * 1000000);
                @stream_select($read, $write, $except, $sec, $usec);
            }

            // 3. 检查是否有网络 I/O 事件就绪（有人按门铃）
            if (!empty($read)) {
                foreach ($read as $socket) {
                    $id = (int)$socket;
                    if (isset($this->handlers[$id])) {
                        ($this->handlers[$id])($socket);
                    }
                }
            }

            // 4. 检查是否有闹钟到期（时间到）
            $now = microtime(true);
            foreach ($this->timers as $index => $timer) {
                if ($now >= $timer['time']) {
                    // 时间到了！执行闹钟任务！
                    ($timer['callback'])();
                    // 任务执行完毕，从闹钟本中划掉！
                    unset($this->timers[$index]);
                }
            }
        }
    }

    public function acceptConnection($server): void {
        $conn = stream_socket_accept($server);
        if (!$conn) return;
        $fd = (int)$conn;
        $this->readFds[$fd] = $conn;
        $this->handlers[$fd] = [$this, 'readFromClient'];
        echo "🔔【大门】接待新客人 (FD $fd)\n";
    }

    public function readFromClient($conn): void {
        $msg = fread($conn, 1024);
        $fd = (int)$conn;
        if ($msg === '' || $msg === false) {
            echo "🚪【包厢】客人 (FD $fd) 离开\n";
            fclose($conn);
            unset($this->readFds[$fd], $this->handlers[$fd]);
            return;
        }

        echo "💬【收到客人 FD $fd 消息】: " . trim($msg) . "\n";

        // 🌟 核心分水岭：我们绝不 sleep！而是定一个 3 秒后的闹钟！
        echo "📝【接单】给客人 FD $fd 定一个 3 秒后上菜的闹钟，当前函数立刻毫秒级返回！\n";
        $this->after(3.0, function () use ($conn, $fd) {
            echo "🍲【闹钟响了！】3 秒做菜完毕，准时给客人 FD $fd 端上热腾腾的宫保鸡丁！\n";
            @fwrite($conn, "服务端回复 (3秒后): 您的菜做好了！\n");
        });
    }
}

// 启动服务器
$worker = new TimerWorker("tcp://0.0.0.0:8080");
$worker->run();
