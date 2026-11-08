# 第 4 章：破壳通网 —— 把 0 号文件换成 3 号 Socket 文件，你的 `Worker` 瞬间变成网络服务器！

> **本章核心灵魂**：网络编程到底有多难？一点都不难！因为在 Linux 眼里，网络套接字（Socket）无非也是一个普通的文件描述符 FD。我们一步一步推导：从只有大门口迎宾员（监听 Socket）到分配专属服务员（连接 Socket），亲身撞上闭包回不了话的绝境从而推导出 `$onMessage($conn, $msg)`，顺手手写出第一个 Web 服务器，并彻底剖析 TCP 的三次握手、四次挥手与 `SO_REUSEADDR`！

---

## 🟢 第一幕（关卡 4.1 ~ 4.3）：网络 Socket 只是另一个 3 号文件！

### 💬 师徒苏格拉底对话录 1：从本地文件到网线插口
- **🤔 祖师爷的困境**：
  在第 2 章我们知道了：键盘是 `0` 号文件，屏幕是 `1` 号文件，打开本地文本是 `3` 号文件。那如果我想给远在千里之外的另一台电脑发消息，Linux 的“一切皆文件”哲学怎么做？
  **答案是：把网线插口也变成一个文件描述符 FD！** 这个网线插座文件就叫 **Socket**。
- **🧪 实验代码（[`01_socket_is_fd.php`](file:///d:/Workerman/chapters/chapter04_network_socket/01_socket_is_fd.php)）**：
  ```php
  <?php
  $server = stream_socket_server("tcp://0.0.0.0:8080");
  $pid = posix_getpid();
  echo "=== 开启网络监听后，查看 /proc/$pid/fd 里的号码牌 ===\n";
  foreach (scandir("/proc/$pid/fd") as $fd) {
      if ($fd >= 3) echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
  }
  sleep(2);
  ```
- **终端真实输出**：
  ```text
  内核 FD [4] -> socket:[2696]
  LISTEN 0      32     0.0.0.0:8080     0.0.0.0:*   users:(("php",pid=391,fd=4))
  ```
  在内核眼里，它真真切切就是一个数字号码牌（FD 4，类型为 `socket`），而在网络监听表（`ss -tlnp`）里，它正处于 `LISTEN` 状态！

---

## 🟢 第二幕（关卡 4.4 ~ 4.7）：迎宾小姐接客，分配“包厢专职服务员 `$conn`”

### 💬 师徒苏格拉底对话录 2：为什么不能直接对 `$server` 执行 `fread()`？
- **🤔 导师提问**：
  > “既然 `$server` 已经是一个文件了，为什么不能直接对它调用 `fread($server, 1024)` 读客人的消息？大饭店的大门口应该怎么接客？”
- **🎯 你的思考与回答**：
  > **“不行啊，server 是我们自己创建出来的 FD。”**
- **👏 深度复盘（大饭店接客模型）**：
  太精准了！`$server` 只是我们在大门口立的一个“迎宾员/总机电话”，它连网线那头客人是谁都不知道，怎么能跟它聊天？
  大饭店的标准规矩必须是：
  1. **迎宾员（`$server`，监听 Socket）**：永远守在门口（`LISTEN`），一旦客人拨通电话，调用 `stream_socket_accept($server)`。
  2. **包厢服务员（`$conn`，传输 Socket）**：内核接通电话的瞬间，当场孵化出一个全新的专职服务员句柄 `$conn`！
  3. 接下来，迎宾员 `$server` 继续站在门口等李四、王五；而专职服务员 `$conn` 领着张三去包厢，对准 `$conn` 调用 `fread()` 听客人说话，调用 `fwrite()` 给客人回话！

### 🧪 实验验证（[`02_accept_and_waiter.php`](file:///d:/Workerman/chapters/chapter04_network_socket/02_accept_and_waiter.php)）
```php
<?php
$server = stream_socket_server("tcp://0.0.0.0:8080");
// 阻塞等待客户端连入
$conn = stream_socket_accept($server);

// 此时去 /proc/PID/fd 查看，同时并存着：
// FD [4] -> 迎宾员 $server
// FD [5] -> 刚刚分配给客人的专职服务员 $conn

$msg = fread($conn, 1024);
fwrite($conn, "服务端回复: 已经收到您的信息!\n");
fclose($conn);
fclose($server);
```

---

## 🟢 第三幕（关卡 4.8 ~ 4.11）：嫁接进 `Worker` 类，以及为什么 `$onMessage` 必须有两个参数！

### 💬 师徒苏格拉底对话录 3：闭包函数怎么回话给客户端？
- **💥 撞墙大危机**：
  在第 3 章我们写好的 `Worker` 类里，`$worker->onMessage = function($msg)` 只有一个参数 `$msg`。
  现在通了网络，业务程序员收到消息后想给客人回一句 `"收到啦"`，但给客人回话需要调 `fwrite($conn, "收到啦")`，而 `$conn` 被锁在框架 `Worker::run()` 的局部变量肚子里，闭包函数根本拿不到 `$conn`！
- **🤔 导师提问**：
  > “为了让业务程序员能给客户端回话，作为框架作者，在触发 `$onMessage` 那一行代码时，应该怎么改？外部业务代码该怎么接？”
- **🎯 你的思考与回答**：
  > **“`$worker->onMessage = function($conn, $msg)`”**
- **👏 深度复盘（揭开 Workerman 经典 API 的终极真相）**：
  一针见血！框架在触发回调时，必须写成：
  ```php
  ($this->onMessage)($conn, $msg);
  ```
  把专职服务员通道钥匙 `$conn` 一并递给外部业务闭包，业务程序员才能为所欲为地给客户端发数据！

### 🧪 终极成果：手写一个 Web 服务器（[`04_worker_network.php`](file:///d:/Workerman/chapters/chapter04_network_socket/04_worker_network.php)）
```php
<?php
class Worker {
    public $onWorkerStart = null;
    public $onMessage = null;
    public function __construct(public string $address) {}
    
    public function run() {
        if ($this->onWorkerStart) ($this->onWorkerStart)();
        $server = stream_socket_server($this->address);
        
        while (true) {
            $conn = stream_socket_accept($server);
            $msg = fread($conn, 1024);
            if ($this->onMessage) {
                ($this->onMessage)($conn, $msg); // ✅ 同时传入连接与数据！
            }
            fclose($conn);
        }
    }
}

// 业务代码：搭建 HTTP Web 服务器！
$worker = new Worker("tcp://0.0.0.0:8080");
$worker->onMessage = function ($conn, $msg) {
    $body = "<h1>恭喜！这是你自己亲手写的 Web 服务器！</h1><p>底层原理：从 0 号管子进化到网络 Socket！</p>";
    $response = "HTTP/1.1 200 OK\r\n" .
                "Content-Type: text/html; charset=utf-8\r\n" .
                "Content-Length: " . strlen($body) . "\r\n" .
                "Connection: close\r\n\r\n" . $body;
    fwrite($conn, $response);
};
$worker->run();
```
#### 👉 你可以亲自在终端运行体验：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter04_network_socket/04_worker_network.php
# 在另一个终端敲：
wsl curl -i http://127.0.0.1:8080
```

---

## 🟢 第四幕（关卡 4.12 深度加餐）：彻底吃透 TCP、三次握手、四次挥手与 `SO_REUSEADDR`

### 1. 什么是 TCP？为什么叫“自来水管（字节流）”？
- **物理世界不可靠**：网线会丢包、路由器会拥堵、网络小数据包（IP 包）会乱序到达。
- **UDP 的态度（平邮包裹）**：管杀不管埋，发出去就不管了，丢了不重发。
- **TCP 的态度（高精度双向虚拟水管）**：在两个电脑之间修一条透明管道。你在这一端倒进去 `"A"、"B"、"C"` 三滴水，那一端接出来绝对保证顺序是 `"A"、"B"、"C"`，一个字节都不会丢，丢了自动重发，乱了自动排序！

### 2. 为什么通网必须“三次握手”？（山里打电话模型）
- **第 1 次握手（客户端发）**：“喂，你能听到我说话吗？” *(我能发，但我不知道你能不能听)*
- **第 2 次握手（服务端回）**：“我能听到你！你能听到我说话吗？” *(我知道你能发、我也能听；但我不知道我发的话你能不能听)*
- **第 3 次握手（客户端回）**：“我也能听到你啦！我们开始聊吧！” *(双方确认：彼此的听筒和话筒全部完好！)*
> **为什么 2 次不行？** 如果只有 2 次，服务端回完那句后不知道客户端有没有听到。万一客户端在第 2 次握手时断电了，服务端却以为接通了，傻傻等一整天浪费服务器资源。

### 3. 为什么挂电话非要“四次挥手”？（双向独立水管模型）
因为 TCP 是全双工的（A 给 B 一根管子，B 给 A 一根管子）：
- **第 1 次挥手（客户端说）**：“我这边的话全说完了，我要挂了（发 FIN 包）。” *(关掉客户端往外的水管)*
- **第 2 次挥手（服务端回）**：“好的，我知道你说完了（回 ACK 包）。” *(💥 关键：此时服务端可能还有账单没给客户端发完，所以服务端的水管还在发数据……)*
- **第 3 次挥手（服务端算完账说）**：“好啦，我这边的数据也交代完了，我也挂了（发 FIN 包）！” *(关服务端往外的水管)*
- **第 4 次挥手（客户端回）**：“好的，拜拜（回 ACK 包）！”

### 4. 破案：什么是 `TIME_WAIT`？为什么重启会报 `Address already in use`？
看上面第 4 次挥手：客户端说了最后一句“好的，拜拜（ACK）”。
万一这句“拜拜”在半路上被路由器弄丢了，服务端没收到，服务端就会超时重发第 3 步的 FIN 包！
所以 Linux 规定：**主动挂断的那一方，发完最后一句“拜拜”后，必须在原地默默站岗等候 2MSL 时间（60 ~ 120 秒），这个状态就叫 `TIME_WAIT`！**
如果你在这 1~2 分钟内想重新启动服务器，内核会告诉你：这个端口还没过冷静期呢！报错：`Address already in use`！

### 5. 解药：`SO_REUSEADDR` 端口复用开关
为了不让程序员每次重启调试都干等 2 分钟，可以在创建服务端 Socket 时开启端口地址复用：
```php
$context = stream_context_create([
    'socket' => [
        'so_reuseaddr' => 1, // 允许立刻复用处于 TIME_WAIT 冷静期的端口！
    ]
]);
$server = stream_socket_server("tcp://0.0.0.0:8080", $errno, $errstr, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $context);
```

### 📖 Workerman 源码真迹印证
打开原版源码 [`Workerman/src/Worker.php` 第 910~925 行](file:///d:/Workerman/workerman-source/src/Worker.php#L910-L925)：
```php
if (DIRECTORY_SEPARATOR === '/') {
    // 默认开启端口地址复用！
    stream_context_set_option($context, 'socket', 'so_reuseaddr', 1);
}
```
完全验证了我们的底层剖析！
