<?php
// 关卡 7.10 显微镜实验：连接状态机与优雅关闭（Graceful Close）
require_once __DIR__ . '/07_async_send_buffer.php';

class GracefulConnection extends TcpConnection {
    // 🌟 1. 连接状态常量
    public const STATUS_ESTABLISHED = 1; // 正常通信中
    public const STATUS_CLOSING = 2;     // 待销毁（等缓冲区排空）
    public const STATUS_CLOSED = 3;      // 已彻底销毁

    public int $status = self::STATUS_ESTABLISHED;

    /**
     * 🌟 2. 状态机驱动的优雅 close
     */
    public function close(): void {
        // 避免重复关闭
        if ($this->status === self::STATUS_CLOSING || $this->status === self::STATUS_CLOSED) {
            return;
        }

        echo "   [close() 被调用] 业务层请求关闭连接...\n";

        // 如果缓冲区是空的，说明没有积压，立即就地正法！
        if ($this->sendBuffer === '') {
            echo "   [立即关闭] 当前无积压数据，立即 destroy() 销毁！\n";
            $this->destroy();
            return;
        }

        // 🌟 肚子里还有货！绝不能掐断！给它贴上“待处决”标签！
        echo "   [延迟关闭] 缓冲区仍积压 " . strlen($this->sendBuffer) . " 字节！标记状态为 STATUS_CLOSING，等待排空！\n";
        $this->status = self::STATUS_CLOSING;
    }

    /**
     * 🌟 3. baseWrite 冲刷完毕后执行“迟到的死刑”
     */
    public function baseWrite($socket): void {
        $len = @fwrite($socket, $this->sendBuffer);
        if ($len === false) $len = 0;

        $this->sendBuffer = substr($this->sendBuffer, $len);

        if ($this->sendBuffer === '') {
            $this->loop->delWrite($this->socket);
            echo "   [排空触发] 积压数据终于全部倒进内核了！\n";

            // 检查身上是否有“待处决”标签
            if ($this->status === self::STATUS_CLOSING) {
                echo "   [使命达成] 侦测到状态为 STATUS_CLOSING，现在正式执行 destroy() 关闭！\n";
                $this->destroy();
            }
        }
    }

    public function destroy(): void {
        if ($this->status === self::STATUS_CLOSED) {
            return;
        }
        $this->status = self::STATUS_CLOSED;
        $this->loop->delRead($this->socket);
        $this->loop->delWrite($this->socket);
        @fclose($this->socket);
        $this->sendBuffer = '';
    }
}

// =================== 独立实验运行代码 ===================
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    echo "=== 关卡 7.10 连接状态机与优雅关闭演示 (PID: " . posix_getpid() . ") ===\n\n";

    $loop = new AdvancedSelectLoop();
    $server = stream_socket_server("tcp://127.0.0.1:8083", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
    stream_set_blocking($server, false);

    $loop->addRead($server, function ($server) use ($loop) {
        $socket = stream_socket_accept($server);
        stream_set_blocking($socket, false);
        $conn = new GracefulConnection($socket, $loop);

        $conn->onMessage = function ($c, $msg) {
            if (trim($msg) === 'get_gift') {
                echo "\n1. [业务层] 客人索要 5MB 离线大礼包！\n";
                $gift = str_repeat("G", 5000000); // 500 万字节！
                
                // 经典场景：连续调用 send() 和 close()
                $c->send($gift);
                echo "2. [业务层] 紧接着下一行代码立即调用 close()...\n";
                $c->close();
            }
        };
    });

    // 客户端连入并索要礼包
    $client = stream_socket_client("tcp://127.0.0.1:8083");
    fwrite($client, "get_gift\n");

    // 客户端开始接收
    $receivedTotal = 0;
    $loop->addRead($client, function ($client) use (&$receivedTotal, $loop) {
        $data = fread($client, 65535);
        if ($data === '' || $data === false) {
            echo "\n3. [客户端] 收到 EOF，服务端已断开连接！\n";
            echo "   -> 最终累计接收: $receivedTotal 字节 (目标: 5000000 字节)\n";
            if ($receivedTotal === 5000000) {
                echo "   🎉 大获全胜！500 万字节一个不少，且随后连接优雅关闭！\n\n";
            } else {
                echo "   ❌ 惨败！丢包了！\n\n";
            }
            exit(0);
        }
        $receivedTotal += strlen($data);
    });

    $loop->loop();
}
