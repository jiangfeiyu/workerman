# 第 4 章：网络 Socket 与 HTTP —— 从“本地终端水管”一步步推导出跨主机 TCP 服务与生命周期插座

> [!IMPORTANT]
> 本章打通阶段 4（关卡 `4.1 ~ 4.12`）：核心任务是把第 3 章只能在本地键盘敲字的 [`Worker`](file:///d:/Workerman/chapters/chapter03_socratic_onmessage/v05_robust_worker.php)，真正插上 Linux 内核网卡，推导出**门卫迎宾句柄 vs 专职服务员句柄**、TCP 三次握手/四次挥手、HTTP 报文边界、`onConnect`/`onMessage`/`onClose` 全生命周期，以及重启端口冲突救星 `SO_REUSEADDR`。

---

## 🟢 第一幕（关卡 4.1 ~ 4.4）：网络 Socket 也是文件描述符 FD！监听句柄为什么不能 `fread`？

### 💬 师徒苏格拉底对话录 1：从 `/dev/pts/0` 键盘管子到网卡 `socket:[inode]`

- **🤔 祖师爷的困境（关卡 4.1）**：第 3 章里我们的 `Worker` 只能用 `fgets(STDIN)` 陪自己玩。现实里用户都在千里之外的浏览器和手机上，难道为了读写网络，程序员又得另背一套跟 `fread` / `fwrite` 完全无关的网卡接口吗？
- **💡 苏格拉底引导**：还记得第 2 章“一切皆文件”的铁律吗？键盘是一根管子（`FD 0`），硬盘文件是一根管子（`FD 3`）。Linux 祖师爷同样把**网卡与网络连接**也做成了一根插在进程肚子里的“管子”，给它编个整数号 —— 它依然是个 **FD（文件描述符）**，只不过在 `/proc/PID/fd` 里显示为 `socket:[inode号]`！只要拿到这根管子，照样用最普通的 `fread` 收数据、`fwrite` 发数据！

![4.1 Socket与文件描述符](4.1_Socket与文件描述符.png)

### 📍 关卡 4.2 ~ 4.3：绑定三要素（协议 + 网卡 + 端口）与内核监听状态

打开普通文件只需要文件名 `fopen("a.txt")`；而打开一个网络插座文件 `stream_socket_server("tcp://0.0.0.0:8080")`，必须向内核交代清楚三件事：
1. **传输规矩（`tcp://`）**：选择面向连接的可靠字节流协议 TCP。
2. **监听哪张网卡（`0.0.0.0` vs `127.0.0.1`）**：`0.0.0.0` 代表绑定本机**所有网卡**（回环网卡 + 局域网/公网网卡）；如果写死 `127.0.0.1`，则只有本机自己能连，局域网和外网机器全会被拒之门外。
3. **监听哪间房号（端口 `8080`）**：一台服务器上同时跑着 Nginx、MySQL、Redis，IP 地址相同，内核靠 **16 位端口号（`0 ~ 65535`）** 才能分清网线飞来的包裹到底该扔进哪个进程的信箱。

![4.2 IP端口与监听地址](4.2_IP端口与监听地址.png)

在 [`01_socket_is_fd.php`](file:///d:/Workerman/chapters/chapter04_network_socket/01_socket_is_fd.php) 中，我们只写了 3 行核心代码并直接扒开 `/proc/$pid/fd` 验证：
```php
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]]));
$pid = posix_getpid();

foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd >= 3) {
        echo "  内核 FD [$fd] -> " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}
```
- **内核幕后三连击**：调用 `stream_socket_server()` 时，PHP 在 C 层依次发起 3 个系统调用：**`socket()`**（创建空白网络插口） → **`bind()`**（把 `0.0.0.0:8080` 门牌号钉死到该插口） → **`listen()`**（开启全连接/半连接队列，正式挂牌营业 `LISTEN`）。
- 用终端命令 `ss -tlnp | grep 8080` 查看，就能亲眼看到该端口进入 **`LISTEN`** 状态并关联到你的 PHP 进程与对应 `fd`！

![4.3 ss查看监听端口](4.3_ss查看监听端口.png)

### 💥 关卡 4.4 撞墙实验：既然 `$server` 是 FD，为什么不能直接 `fread($server)`？（[`03_fread_listen_crash.php`](file:///d:/Workerman/chapters/chapter04_network_socket/03_fread_listen_crash.php)）

- **🤔 导师提问**：
  > “既然我们已经证明 `$server` 只是内核里的 `FD 4`，而普通文件 `FD 3` 可以直接 `fread($fp, 1024)`，那现在客人连上 `8080` 发了一句 `hello\n`，我直接对 `$server` 调用 `fread($server, 1024)` 能读出消息吗？如果 1000 个客人同时发消息到这同一根管子里，会发生什么灾难？”
- **🎯 推演与大饭店铁律**：
  1. 张三喊“加鸡腿”、李四喊“结账”，如果全混在 `$server` 一根管子里，字节瞬间绞成一锅粥，回话也不知道该回给谁！
  2. 因此，饭店必须严格分工：**大门口迎宾员（`$server` 监听 Socket）永远只负责站在门口接待新客；每个客人进了店，都要单独分配一名专职包厢服务员（`$conn` 已连接 Socket）**！

在 [`03_fread_listen_crash.php`](file:///d:/Workerman/chapters/chapter04_network_socket/03_fread_listen_crash.php) 中，我们故意跳过 `accept` 直接对非阻塞 `$server` 执行 `fread($server, 1024)`：

```text
=== 1. 监听已启动 (PID: 440)，查看 /proc/440/fd ===
  内核 FD [3] -> /mnt/d/Workerman/chapters/chapter04_network_socket/03_fread_listen_crash.php
  内核 FD [4] -> socket:[9093]

=== 2. 客户端已连接并发送了 6 字节 "hello\n" ===
错误尝试：直接调用 fread($server, 1024)...
  -> 返回值: false
  -> 内核态度: 内核 recv 返回 -1 (ENOTCONN: Transport endpoint is not connected)

=== 3. 正确做法：经 stream_socket_accept($server) 拿到 $conn 后再 fread($conn) ===
  -> 成功读到客户端消息: "hello\n"
```

用 `strace -f -e trace=recvfrom,accept` 抓出来的内核铁证如下：
```text
recvfrom(4, ..., 8192, 0, NULL, NULL) = -1 ENOTCONN (Transport endpoint is not connected)
accept(4, {sa_family=AF_INET, sin_port=htons(43668), sin_addr=inet_addr("127.0.0.1")}, [128 => 16]) = 6
recvfrom(6, "hello\n", 8192, MSG_DONTWAIT, NULL, NULL) = 6
```
- **真相大白**：处于 `LISTEN` 状态的 `FD 4` 根本没有绑定对端连接，直接 `recvfrom(4, ...)` 只会得到内核冷冰冰的拒绝：**`ENOTCONN`（未连接传输端点）**；必须先经过 `accept(4)` 裂变出一根全新专职的 **`FD 6`（`$conn`）**，才能从中读出 `"hello\n"`！

![4.4 监听Socket不能读取业务数据](4.4_监听Socket不能读取业务数据.png)

> [!TIP]
> **【👉 本关亲手实操任务（第一幕：4.1 ~ 4.4）】**
> 1. **双终端抓取内核 FD 与 `LISTEN` 状态**：
>    - **终端 1**：`wsl php chapters/chapter04_network_socket/01_socket_is_fd.php`（可把脚本最后 `sleep(2)` 临时改为 `sleep(20)` 再运行）
>    - **终端 2**：趁它在睡，运行 `wsl ss -tlnp | grep 8080`
>    - **观察靶标**：终端 2 显示 `LISTEN` 与进程 `PID`、`fd=4`，与终端 1 打印的 `/proc/$pid/fd` 编号严丝合缝。
> 2. **用 `strace` 亲手抓获 `ENOTCONN` 报错**：
>    - **终端命令**：`wsl strace -f -e trace=recvfrom,accept php chapters/chapter04_network_socket/03_fread_listen_crash.php`
>    - **改错实验**：如果把 `03_fread_listen_crash.php` 里的 `stream_set_blocking($server, false);` 注释掉再跑一次，观察进程为什么会在 `fread($server, 1024)` 处彻底卡死（记得 `Ctrl+C` 退出并恢复该行）。

---

## 🟢 第二幕（关卡 4.5 ~ 4.8）：推导出 `accept` 迎宾分身术、三次握手与双向读写！

### 💬 师徒苏格拉底对话录 2：一个门卫 + N 个专职服务员

- **🤔 导师追问**：
  > “当终端 2 的客户端敲门连接 `8080` 时，服务端调用 `$conn = stream_socket_accept($server)` 到底在内核里干了一件什么事？为什么没有客户端连入时程序会一动不动，而客户端刚连上还没敲一个字母，`accept` 就瞬间返回了？”
- **💡 师父揭秘**：
  1. **关卡 4.5 `accept()` 阻塞等待**：无人上门时，进程睡在 `accept()`/`accept4()` 系统调用上让出 CPU（状态 `S+`）。
  2. **关卡 4.6 FD 裂变分身**：一旦有客人敲门完成握手，内核就会从**全连接队列（Accept Queue）**里抱出这个客人，并在当前进程的 FD 表中按“最小可用原则”新开一个句柄（比如 `FD 5`）返回给你作为 `$conn`：
     - **`$server`（`FD 4`）**：依然站在门口只干迎宾一件事；
     - **`$conn`（`FD 5`）**：1 对 1 绑定这唯一位客人的四元组 `(源IP, 源端口, 目标IP, 目标端口)`，专职陪他聊天！

![4.5 accept建立连接句柄](4.5_accept建立连接句柄.png)

### 🧪 关卡 4.5 ~ 4.8 实战代码拆解（[`02_accept_and_waiter.php`](file:///d:/Workerman/chapters/chapter04_network_socket/02_accept_and_waiter.php)）

```php
$server = stream_socket_server("tcp://0.0.0.0:8080", context: stream_context_create(['socket' => ['so_reuseaddr' => true]])); // 大门迎宾员 (FD 4)
$conn = stream_socket_accept($server);                // 阻塞等待并裂变出专职服务员 (FD 5)

$msg = fread($conn, 1024);                            // 只用专职服务员读取该客户的话
fwrite($conn, "服务端回复: 已经收到您的信息!\n");      // 同一根全双工水管写回给客户

fclose($conn);                                        // 挂断该客户，归还 FD 5
fclose($server);
```

![4.6 nc客户端与新增连接FD](4.6_nc客户端与新增连接FD.png)

- **关卡 4.7 TCP 三次握手内功**：为什么 `nc` 还没发一个字，`stream_socket_accept($server)` 就醒了？因为客户端与服务端内核在后台已经悄悄跑完了 **三次握手（`SYN` → `SYN+ACK` → `ACK`）**，把连接推进了全连接队列！具体十六进制报文、ISN 随机序号与四次挥手抓包剖析，详见番外篇：[TCP 协议栈深度抓包指南](file:///d:/Workerman/chapters/chapter04_extra_tcp_deep_dive/README.md)。

![4.7 TCP三次握手与抓包](4.7_TCP三次握手与抓包.png)

- **关卡 4.8 全双工管道与字节流伏笔**：同一根 `$conn` 句柄既能 `fread` 读、也能 `fwrite` 写（全双工 Full-Duplex）。但请记住一个伏笔：TCP 管子像自来水一样流淌字节，**没有天然消息边界**——写入两段字可能粘在一起，写一个大包也可能被拆成多片（第 8 章将用 `ProtocolInterface` 彻底攻克）。

![4.8 已连接Socket双向读写](4.8_已连接Socket双向读写.png)

![4.8 补充 TCP可靠字节流与消息边界](4.8_补充_TCP可靠字节流与消息边界.png)

> [!TIP]
> **【👉 本关亲手实操任务（第二幕：4.5 ~ 4.8）】**
> 1. **亲眼见证 FD 裂变与全双工收发**：
>    - **终端 1**：`wsl php chapters/chapter04_network_socket/02_accept_and_waiter.php`（此时阻塞在 `stream_socket_accept`）
>    - **终端 2**：`wsl nc 127.0.0.1 8080`，连上后先发呆 2 秒再输入 `hello` 回车。
>    - **观察靶标**：连上的瞬间终端 1 立刻醒来并打印两个不同的 Socket FD（例如 `FD [4]` 是监听，`FD [5]` 是专职服务员）；输入 `hello` 回车后，终端 2 收到服务端回复并结束。
> 2. **用 `tcpdump` 抓看一次真实三次握手（可选进阶）**：
>    - **终端 1（抓包）**：`wsl sudo tcpdump -i lo port 8080 -nn -S`
>    - **终端 2 & 3**：按上面步骤运行 `02_accept_and_waiter.php` 与 `nc 127.0.0.1 8080`。
>    - **观察靶标**：在抓包输出中找出 `[S]`（SYN）、`[S.]`（SYN+ACK）、`[.]`（ACK）三行握手帧。

---

## 🟢 第三幕（关卡 4.9 ~ 4.12）：组装网络版 `Worker`、HTTP 报文规范、全生命周期插座与 `SO_REUSEADDR`！

### 💬 师徒苏格拉底对话录 3：从 `STDIN` 接入网络，为什么要给 `$onMessage` 传双参数？

1. **关卡 4.9 浏览器为什么骂我？`ERR_INVALID_HTTP_RESPONSE`！**
   - **🤔 徒弟的疑惑**：我把第 3 章的 `Worker` 里的 `fgets(STDIN)` 换成 `stream_socket_server` + `fread($conn)` 后，用 `nc` 测试明明通了！为什么用 Chrome 浏览器打开 `http://127.0.0.1:8080`，浏览器却直接报错 `ERR_INVALID_HTTP_RESPONSE`？
   - **💡 师父点拨**：`nc` 是个憨厚的原始水管工，你发啥字节它直接原封不动印在屏幕上；而 Chrome 是位极其严谨的 **HTTP 翻译官**，它要求你回传的字节必须套上标准“快递面单”：
     ```text
     HTTP/1.1 200 OK\r\n                           <-- 状态行（协议版本 + 状态码 + 描述）
     Content-Type: text/html; charset=utf-8\r\n    <-- 响应头 1（告诉浏览器这是 UTF-8 HTML）
     Content-Length: 49\r\n                        <-- 响应头 2（正文精确占 49 字节！）
     Connection: close\r\n                         <-- 响应头 3（发完本次就断开）
     \r\n                                          <-- 必须有这个空行！劈开“信封”和“正文”
     <h1>Hello from My Tiny Workerman (Stage 4)!</h1>\n
     ```
     少写那个 `\r\n` 空行，或者 `Content-Length` 写大/写小了，浏览器都会当场翻脸报错或死等转圈！

![4.9 Worker从STDIN接入网络](4.9_Worker从STDIN接入网络.png)

![4.9 补充 HTTP响应结构与字节长度](4.9_补充_HTTP响应结构与字节长度.png)

2. **关卡 4.10 为什么 `$onMessage` 必须变成两个参数 `($conn, $msg)`？**
   - **🤔 导师追问**：
     > “第 3 章我们写的是 `($this->onMessage)($msg);` —— 只传 1 个参数 `$msg`。现在业务员在闭包里写：`$worker->onMessage = function($msg) { ... };`，他想回一句话给刚才提问的客人，突然傻眼了：他该怎么把话写回网线？为什么第 3 章 `echo` 一声就行，现在却不行了？”
   - **💡 核心顿悟**：第 3 章全世界只有一个本地终端屏幕（`echo` 默认往 `FD 1` 写）；现在线上可能同时连着几千个网络客人，每个客人是一根独立的 `$conn` FD，而 `$conn` 诞生在 `Worker::run()` 的肚子里面！
   - **改一行定乾坤**：在触发回调时，必须把专职服务员句柄作为第一个参数一起递出去：**`($this->onMessage)($conn, $msg)`**！从此你就彻底理解了为什么 Workerman 官网所有示例第一句永远是 `$worker->onMessage = function($connection, $data)`！

![4.10 onMessage连接与数据双参数](4.10_onMessage连接与数据双参数.png)

3. **关卡 4.11 全生命周期插座：`$onConnect` 与 `$onClose`**
   - 业务层不仅要在收到数据时做事，还需要在**客人刚推门进包厢那一刻**（记录 IP、欢迎语、初始化认证状态）以及**客人结账挂断离开那一刻**（从在线花名册删掉、释放资源）得到通知！于是我们的 `Worker` 长出了 5 大核心钩子：`onWorkerStart`、`onConnect`、`onMessage`、`onClose`、`onError`。

![4.11 onConnect与onClose生命周期](4.11_onConnect与onClose生命周期.png)

4. **关卡 4.12 为什么 `Ctrl+C` 重启立刻报错 `Address already in use`？**
   - **🤔 徒弟踩坑**：按 `Ctrl+C` 关掉刚接到请求的服务端，紧接着 1 秒后重新启动，PHP 突然报错 `Address already in use`！`ps` 里明明已经没有旧进程了，谁在占着 8080 端口？！
   - **💡 师父破案**：因为刚才服务端主动 `fclose($conn)` 挂断电话，按 TCP 四次挥手规矩，主动挥手方必须进入 **`TIME_WAIT`（持续 2MSL，Linux 下通常 60 秒）** 状态，守候在端口上防止迷途旧数据包干扰后续连接（用 `ss -tan | grep 8080` 立马抓现行！）。解决办法就是在 `stream_socket_server` 上下文里打开 **`so_reuseaddr => 1`**，允许新进程复用处于 `TIME_WAIT` 状态的端口！

![4.12 TIME_WAIT与SO_REUSEADDR](4.12_TIME_WAIT与SO_REUSEADDR.png)

![4.12 补充 四次挥手与半关闭](4.12_补充_四次挥手与半关闭.png)

---

### 🔬 关卡 4.9 ~ 4.12 核心代码逐行拆解（[`04_worker_network.php`](file:///d:/Workerman/chapters/chapter04_network_socket/04_worker_network.php)）

```php
// 1. 关卡 4.12：开启 SO_REUSEADDR，绕开 TIME_WAIT 端口占坑锁
$context = stream_context_create([
    'socket' => [
        'so_reuseaddr' => 1,
        'backlog'      => 1024,
    ],
]);
$server = stream_socket_server(
    $this->socketName,
    $errno,
    $errstr,
    STREAM_SERVER_BIND | STREAM_SERVER_LISTEN,
    $context
);

// 2. 关卡 4.10 ~ 4.11：全生命周期回调串联（accept -> onConnect -> fread -> onMessage -> fclose -> onClose）
$conn = @stream_socket_accept($server, -1, $remoteAddress);
if (is_callable($this->onConnect)) {
    try { ($this->onConnect)($conn, $remoteAddress); } catch (\Throwable $e) { $this->handleException($e); }
}

$msg = fread($conn, 65535);
if ($msg !== false && $msg !== '' && is_callable($this->onMessage)) {
    try { ($this->onMessage)($conn, $msg); } catch (\Throwable $e) { $this->handleException($e); }
}

fclose($conn);
if (is_callable($this->onClose)) {
    try { ($this->onClose)($conn, $remoteAddress); } catch (\Throwable $e) { $this->handleException($e); }
}
```

### 📖 Workerman 官方源码真迹对照

打开原版源码 [`workerman-source/src/Worker.php`](file:///d:/Workerman/workerman-source/src/Worker.php)：
1. **构造 `socketContext` 上下文与 `backlog`**：[`Worker.php#L583-L595`](file:///d:/Workerman/workerman-source/src/Worker.php#L583-L595) 创建并保存 `$this->socketContext = stream_context_create($socketContext)`。
2. **创建监听与设置底层选项**：[`Worker.php#L2485-L2538`](file:///d:/Workerman/workerman-source/src/Worker.php#L2485-L2538) 中的 `listen()` 调用 `stream_socket_server($localSocket, $errNo, $errMsg, $flags, $this->socketContext)`，并进一步开启 `SO_KEEPALIVE` 与 `TCP_NODELAY`（PHP 底层 `stream_socket_server` 在创建服务端 TCP Socket 时已默认注入 `SO_REUSEADDR`，而多进程争抢端口还可通过 `$this->reusePort` 设置 `so_reuseport`）。
3. **`acceptTcpConnection()` 与 `$onConnect` / `$onClose` 注入**：[`Worker.php#L2748-L2780`](file:///d:/Workerman/workerman-source/src/Worker.php#L2748-L2780) 中 `stream_socket_accept($socket, 0, $remoteAddress)` 拿到 `$newSocket` 后，把 `$this->onMessage`、`$this->onClose` 等回调插座转交给新建的连接对象，并在 `try { ($this->onConnect)($connection); } catch (Throwable $e)` 安全网内触发建连回调！

> [!TIP]
> **【👉 本关亲手实操任务（第三幕：4.9 ~ 4.12）】**
> 1. **用真实浏览器或 `curl` 触发 HTTP 与全生命周期**：
>    - **终端 1（服务端）**：`wsl php chapters/chapter04_network_socket/04_worker_network.php`
>    - **终端 2（客户端）**：`wsl curl -i http://127.0.0.1:8080`（或直接在 Windows 浏览器打开 `http://127.0.0.1:8080`）
>    - **观察靶标**：终端 1 严格按 `🚀 onWorkerStart` → `🟢 onConnect` → `📩 onMessage`（打印出真实 HTTP 请求头 `GET / HTTP/1.1...`）→ `🔴 onClose` 的顺序吐出日志；终端 2 收到完整 `HTTP/1.1 200 OK` 响应并正常退出。
> 2. **改错破坏实验（验证 HTTP `Content-Length` 边界铁律）**：
>    - 把 `04_worker_network.php` 里的 `"Content-Length: " . strlen($body)` 改成 `"Content-Length: 999"`（骗客户端后面还有 999 字节），重启服务端再用 `curl -v --max-time 3 http://127.0.0.1:8080` 访问，观察 `curl` 是如何因少收到字节而报错挂起的！验证完毕记得改回 `strlen($body)`。

---

## 🌉 承上启下：通往第 5 章并发风暴的伏笔

在第 4 章的 [`04_worker_network.php`](file:///d:/Workerman/chapters/chapter04_network_socket/04_worker_network.php) 里，有一个极其致命的隐患：
- **一次只能接待一个客人**！如果客人 A 用 `nc 127.0.0.1 8080` 连进来后一直不说话也不退出，我们的 `fread($conn, 65535)` 就会像木头人一样死等客人 A，客人 B、C、D 全都被拒之门外在门口罚站！
- 下一章（[第 5 章：并发大危机与事件循环](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/README.md)）我们将用**非阻塞 I/O + `stream_select()` 事件循环**彻底击碎单客阻塞瓶颈！

---

## 🗂️ 本章 Anki 闪卡复习沉淀

- 本章全部精华考点（Socket FD、门卫 vs 服务员、`ENOTCONN`、三次握手与 ISN、四次挥手与 `CLOSE_WAIT`/`TIME_WAIT`、`SO_REUSEADDR`、`onConnect`/`onClose`、Nagle 与 Delayed ACK 40ms 碰撞、TCP Keepalive 55 秒）已统一沉淀至总库：[workerman_anki_cards.txt](file:///d:/Workerman/anki/workerman_anki_cards.txt)。
- 导入 Anki 后，直接搜索 **`tag:Chapter04`** 即可精准抽取本章全套闪卡复习！
