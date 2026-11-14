<?php
// 关卡 7.6 & 7.7 【招式演进】：应用层异步发送缓冲区完整实现

require_once __DIR__ . '/../chapter06_timer_and_heap/14_select_loop_with_heap.php';

// 我们需要先给 SelectLoop 加上 addWrite 和 delWrite 方法！
// 扩展 SelectLoop 增加写事件支持
class AdvancedSelectLoop extends SelectLoop {
    protected array $writeFds = [];
    protected array $writeCallbacks = [];

    public function addWrite($stream, callable $callback): void {
        $fd = (int)$stream;
        $this->writeFds[$fd] = $stream;
        $this->writeCallbacks[$fd] = $callback;
    }

    public function delWrite($stream): void {
        $fd = (int)$stream;
        unset($this->writeFds[$fd], $this->writeCallbacks[$fd]);
    }

    public function loop(): void {
        while (true) {
            // 1. 获取定时器打盹时间
            $timeout = null;
            while (!$this->scheduler->isEmpty()) {
                $top = $this->scheduler->top();
                $id = $top['data'];
                if (!isset($this->timerTasks[$id])) {
                    $this->scheduler->extract();
                    continue;
                }
                $nextRunTime = -$top['priority'];
                $timeout = max(0, $nextRunTime - microtime(true));
                break;
            }

            // 2. 🌟 核心变化：同时复印 $readFds 和 $writeFds 交给保安！
            $read = $this->readFds;
            $write = $this->writeFds;
            $except = null;

            if ($timeout === null) {
                @stream_select($read, $write, $except, null);
            } else {
                $sec = (int)$timeout;
                $usec = (int)(($timeout - $sec) * 1000000);
                @stream_select($read, $write, $except, $sec, $usec);
            }

            // 3. 处理读就绪
            foreach ($read as $stream) {
                $fd = (int)$stream;
                if (isset($this->readCallbacks[$fd])) {
                    ($this->readCallbacks[$fd])($stream);
                }
            }

            // 4. 🌟 处理写就绪：内核通知“发送缓冲区有空位了，快来写！”
            foreach ($write as $stream) {
                $fd = (int)$stream;
                if (isset($this->writeCallbacks[$fd])) {
                    ($this->writeCallbacks[$fd])($stream);
                }
            }

            // 5. 处理定时器
            $now = microtime(true);
            while (!$this->scheduler->isEmpty()) {
                $top = $this->scheduler->top();
                $nextRunTime = -$top['priority'];
                if ($nextRunTime > $now) break;
                $this->scheduler->extract();
                $id = $top['data'];
                if (isset($this->timerTasks[$id])) {
                    $task = $this->timerTasks[$id];
                    ($task['callback'])();
                    if ($task['repeat']) {
                        $this->scheduler->insert($id, -(microtime(true) + $task['interval']));
                    } else {
                        unset($this->timerTasks[$id]);
                    }
                }
            }
        }
    }
}

#[\AllowDynamicProperties]
class TcpConnection {
    public int $id;
    public $onMessage = null;
    public $onClose = null;

    // 🌟 核心发明：应用层发送缓冲区（蓄水池）
    protected string $sendBuffer = '';

    public function __construct(
        public $socket,
        protected AdvancedSelectLoop $loop
    ) {
        $this->id = (int)$socket;
        $this->loop->addRead($this->socket, [$this, 'baseRead']);
    }

    public function baseRead($socket): void {
        $data = @fread($socket, 65535);
        if ($data === '' || $data === false) {
            $this->destroy();
            if ($this->onClose) ($this->onClose)($this);
            return;
        }
        if ($this->onMessage) ($this->onMessage)($this, $data);
    }

    public function getSendBufferSize(): int {
        return strlen($this->sendBuffer);
    }

    /**
     * 🌟 工业级 send 方法：永不丢包！
     */
    public function send(string $data): bool|null {
        // 如果之前已经有积压在排队了，新来的数据绝不能插队，必须追加在尾巴上！
        if ($this->sendBuffer !== '') {
            $this->sendBuffer .= $data;
            return null;
        }

        // 尝试直接往内核写一次
        $len = @fwrite($this->socket, $data);
        if ($len === false) $len = 0;

        echo "   [第一次直写] 计划发送 " . strlen($data) . " 字节，内核吃下 $len 字节\n";

        // 如果一次性写完了，圆满成功！
        if ($len === strlen($data)) {
            return true;
        }

        // 💥 没写完！剩下的尾巴存入应用层发送缓冲区！
        $this->sendBuffer = substr($data, $len);
        echo "   [积压触发] 剩余 " . strlen($this->sendBuffer) . " 字节存入 \$sendBuffer，挂载可写监听！\n";

        // 🌟 告诉事件循环：一旦内核池子腾出空位，立刻调我的 baseWrite 接着倒水！
        $this->loop->addWrite($this->socket, [$this, 'baseWrite']);
        return null;
    }

    /**
     * 🌟 异步冲刷剩余数据
     */
    public function baseWrite($socket): void {
        // 尝试冲刷剩余积压数据
        $len = @fwrite($socket, $this->sendBuffer);
        if ($len === false) $len = 0;

        echo "   [baseWrite 唤醒冲刷] 成功冲刷写入 $len 字节，还剩 " . (strlen($this->sendBuffer) - $len) . " 字节\n";

        // 裁切掉已经发送成功的头部
        $this->sendBuffer = substr($this->sendBuffer, $len);

        // 🌟 生死线：如果全部排空了，必须立刻注销可写监听！防止 CPU 100% 暴走！
        if ($this->sendBuffer === '') {
            echo "   [排空注销] 数据全部发送完毕！立刻从 SelectLoop 卸载可写监听！\n";
            $this->loop->delWrite($this->socket);
        }
    }

    public function destroy(): void {
        $this->loop->delRead($this->socket);
        $this->loop->delWrite($this->socket);
        @fclose($this->socket);
        $this->sendBuffer = '';
    }
}

// =================== 测试验证服务端 ===================
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    $loop = new AdvancedSelectLoop();
    $server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
    stream_set_blocking($server, false);

    $loop->addRead($server, function ($server) use ($loop) {
        $socket = stream_socket_accept($server);
        stream_set_blocking($socket, false);
        $conn = new TcpConnection($socket, $loop);

        $conn->onMessage = function ($c, $msg) {
            if (trim($msg) === 'get_big') {
                echo "\n=== 客人索要 10MB 大数据 ===\n";
                $bigData = str_repeat("X", 10000000); // 1000 万字节！
                $c->send($bigData);
            }
        };
    });

    echo "=== 永不丢包的异步发送服务器启动 (PID: " . posix_getpid() . ") ===\n";
    $loop->loop();
}
