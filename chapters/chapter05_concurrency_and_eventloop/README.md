# 第 5 章：并发大危机 —— 为什么第 2 个客人进不来？（从阻塞一步步推导出 `SelectLoop` 事件循环）

> **本章核心灵魂**：这是从“单打独斗的玩具脚本”迈向“工业级高并发网络服务器”最惊心动魄的一跃！
> 我们绝不直接抛出晦涩的 `stream_select` 或 Reactor 模式，而是先用最朴素的双层嵌套循环接客，亲眼见证第 2 个客人被晾在门外的车祸现场 $\rightarrow$ 尝试开启非阻塞 $\rightarrow$ 遭遇 CPU 100% 暴走风扇狂转惨案 $\rightarrow$ 祖师爷被逼到绝境，最终推导出 I/O 多路复用、花名册机制与事件循环引擎 `SelectLoop`！

---

## 🟢 第一幕（关卡 5.1 ~ 5.3）：并发车祸现场 —— 为什么第 2 个客人像被施了定身咒？

### 💬 师徒苏格拉底对话录 1：为了持续聊天，嵌套一个 while 循环！
- **🤔 祖师爷的困境**：
  在第 4 章里，我们的简易 Web 服务器虽然通了网，但每个请求读完一句 `fread`，就立马执行 `fclose($conn)` 把客人赶走了。
  但现实生活中，很多场景必须是**长连接持续对话**（如 WebSocket 聊天室、在线联机游戏、RPC 内部通信）。
  初学者面对“既想持续跟老客人聊、又想接待新客人”的需求，最直接的直觉就是：**写一个双层循环！**
  - **外层循环**：`while (true)` 调用 `stream_socket_accept($server)`，在大门口接新客人。
  - **内层循环**：`while (true)` 调用 `fread($conn)`，专职服务员陪这个客人一直聊，直到客人挂断电话（`fread` 返回空或 `false`），再退出内层回到外层接下一位。

- **🧪 实验代码（[`01_naive_multiclient.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/01_naive_multiclient.php)）**：
  ```php
  <?php
  // 关卡 5.1 【笨办法演进】：为了能持续接待客人，我们在 accept 里再套一层 while(true)
  $server = stream_socket_server("tcp://0.0.0.0:8080");
  echo "=== 服务器启动 (PID: " . posix_getpid() . ")，监听 0.0.0.0:8080 ===\n";

  while (true) {
      // 1. 外层循环：迎宾员在门口接新客
      $conn = stream_socket_accept($server);
      echo "【大门】接待了一位新客人！\n";

      // 2. 内层循环：专职服务员陪这个客人一直聊，直到客人断开
      while (true) {
          $msg = fread($conn, 1024);
          if ($msg === false || $msg === '') {
              echo "【包厢】客人挂断离开了。\n";
              fclose($conn);
              break; // 退出内层，回到外层大门口接下一位客人
          }
          echo "【收到客人消息】: " . trim($msg) . "\n";
          fwrite($conn, "服务端回复: " . trim($msg) . "\n");
      }
  }
  ```

---

### 💥 关卡 5.2：撞墙大车祸！两个终端（客人 A 与客人 B）同时连入
- **实验场景设计**：
  1. 客人 A 连入服务器，发送了一句 `"你好"`，然后**保持连接，不去挂断**（就像客人进包厢坐下了，喝茶看菜单，暂时不说话）。
  2. 此时客人 B 急冲冲跑来连入服务器，疯狂喊叫：`"有人吗？救命！"`。
- **终端现场真实输出**：
  ```text
  === 服务器启动 (PID: 420)，监听 0.0.0.0:8080 ===
  【大门】接待了一位新客人！
  【收到客人消息】: 你好
  
  [此时客人 B 连入并发送 "有人吗？救命！"]
  ...... (服务端死一般的寂静，客人 B 连个标点符号都收不到！) ......
  
  [直到客人 A 喝完茶主动挂断离开...]
  【包厢】客人挂断离开了。
  【大门】接待了一位新客人！
  【收到客人消息】: 有人吗？救命！
  服务端回复: 有人吗？救命！
  ```

---


---

## 🟢 第二幕（关卡 5.3 ~ 5.6）：从阻塞破案到“接线员自救”，以及惨烈的 CPU 100% 惨案

### 💬 师徒苏格拉底对话录 2：接线员的直觉与内功破案
- **🤔 导师提问**：
  > 1. “在客人 A 挂机喝茶的这几秒里，我们的 PHP 进程究竟卡在代码的哪一行睡大觉？为什么回不去大门口接客人 B？”
  > 2. “既然罪魁祸首是管子里没新消息时进程被催眠，你觉得最理想的自救思路是什么？”
- **🎯 你的思考与回答**：
  > **1. “我觉得应该 stdin，就是等待用户输入的系统调用。”**
  > **2. “想象接线员：如果 A 没说话，这时候 B 响了，我就去接待 B，同时把 A 挂起等待。”**
- **👏 深度复盘（神级接线员直觉）**：
  1. **一语中的！** 在第 2 章中，等待键盘输入是 `read(0, ...)`（0 号是 `STDIN`）。而在网络服务器里，内核分配给客人 A 的是一个 Socket FD（比如 4 号），底层触发的系统调用是 **`read(4, ...)`**！因为默认是**阻塞 I/O**，客人 A 不发下一句话，`read(4)` 就会把唯一的进程打入内核的睡眠等待队列 `S`（Sleeping），代码死死停在内层的 `$msg = fread($conn, 1024);`，根本出不来！
  2. **这就是网络通信史上最经典的“接线员模型”！** 接线员绝不能傻傻守着不说话的 A 睡觉，而是必须有能力查巡所有人！

---

### 🧪 关卡 5.4 & 5.5：自救演进 v0.8 —— 非阻塞 I/O + 接线员花名册！
要实现你所说的“如果 A 没说话就去接 B”，必须让 Linux 内核遵守一条新军规：
**“管子里要是现在没水，你别让我睡觉，立刻给我返回 `false`（底层 `EAGAIN`），让我去干别的事！”**
在 PHP 中，这就是：
```php
stream_set_blocking($stream, false); // 告诉内核开启非阻塞模式！
```

我们按照你的“接线员花名册”思路，把代码演进为了单循环结构（[`02_nonblocking_polling.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/02_nonblocking_polling.php)）：
```php
<?php
// 关卡 5.4 & 5.5 【自救演进 v0.8】：开启非阻塞 I/O + 单循环接线员轮询
$server = stream_socket_server("tcp://0.0.0.0:8080");
stream_set_blocking($server, false); // 1. 迎宾员设为非阻塞

// 接线员的花名册：保存所有连接
$connections = [];

while (true) {
    // 2. 问大门口：有新客吗？（timeout 设为 0，没新客瞬间返回 false 绝不睡觉）
    $conn = @stream_socket_accept($server, 0);
    if ($conn) {
        stream_set_blocking($conn, false);
        $id = (int)$conn;
        $connections[$id] = $conn; // 记入花名册
    }

    // 3. 轮流问花名册里的每一个老客人：你说话了吗？
    foreach ($connections as $id => $conn) {
        $msg = fread($conn, 1024);
        if ($msg === false || $msg === '') {
            if (feof($conn)) { // 确认对方挂断
                fclose($conn);
                unset($connections[$id]); // 划掉花名册
            }
            continue; // 没说话就直接问下一位！
        }
        // 收到消息，处理并回复！
        fwrite($conn, "服务端回复: " . trim($msg) . "\n");
    }
}
```

---

### 💥 关卡 5.6：乐极生悲！CPU 100% 惨案现场
表面上看，上面的代码极其漂亮：客人 A 和客人 B 即使同时连入，也能互不干扰、丝滑聊天！
但我们立刻用 `top` 命令给运行中的进程做了一次性能体检：

```text
=== 采样 CPU 占用率 ===
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    650 jiangfei  20   0   48000  22048  16528 R 100.0   0.3   0:02.20 php
```

**😱 恐怖现场**：
明明此时**没有任何一个人在发消息**，甚至大门口连半个客人都还没有！
但你的 PHP 进程 CPU 占用率直接飙到了 **100.0%**！进程状态从原先的休眠 `S` 变成了疯跑的 **`R`（Running）**！笔记本风扇瞬间起飞狂啸！

#### 为什么会发生 CPU 100% 惨案？
因为所有 FD 都不阻塞了，`while (true)` 变成了一个**没有任何刹车装置的疯狗循环（忙轮询 Busy Polling）**！
接线员在 1 秒钟之内在桌子前狂奔了几百万圈：
> *“大门有客吗？没！A说话了吗？没！B说话了吗？没！大门有客吗？没！A说话了吗？没！...”*

CPU 的运算核心每秒几十亿次时钟周期，全被浪费在这种毫无意义的空转询问上！


---

## 🟢 第三幕（关卡 5.7 ~ 5.9）：请内核保安盯梢 —— I/O 多路复用诞生与 `stream_select` 涂改液陷阱

### 💬 师徒苏格拉底对话录 3：从累吐血的忙轮询到委托内核保安
- **🤔 导师提问**：
  > 1. “如果接线员把手里这堆号码牌 `[3, 4, 5]` 打包成一张名单递给内核保安，接线员会对保安提什么要求？在什么情况下保安才把接线员叫醒？”
  > 2. “在没有任何人说话的那几秒钟里，我们的接线员在干什么？CPU 占用率会变成多少？”
- **🎯 你的思考与回答**：
  > **1. “这个名单上的人，有人说话了叫我，跟我说是几号。”**
  > **2. “接线员就坐着休息就好了。”**
- **👏 深度复盘（I/O 多路复用的神圣诞生）**：
  **全中！这就是现代高并发网络编程的基石 —— I/O 多路复用（I/O Multiplexing）！**
  1. **委托保安盯梢**：我们不再自己在用户态 `while` 跑圈，而是通过系统调用把一揽子文件描述符名单一次性打包丢给 Linux 内核；
  2. **安心休眠让出 CPU**：在没人说话时，内核把我们的进程挂起（状态为 `S`），**CPU 占用率是极其优雅的 0.0%**！
  3. **谁响唤醒谁**：只要名单里**任何一个人哪怕只是咳嗽一声**，内核保安立刻精准踹醒接线员，并清清楚楚报告：“是几号说话了”！
  在 Linux 历史长河中，第一代完成这项重任的保安，名字就叫 **`select`**（在 PHP 中封装为系统函数 **`stream_select`**）！

---

### 🧪 关卡 5.8：实战验证 `stream_select()` 的神仙效果（[`03_stream_select_demo.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/03_stream_select_demo.php)）
```php
<?php
$server = stream_socket_server("tcp://0.0.0.0:8080");
$read = [$server];
$write = $except = null;

echo "【接线员】把名单交给内核 select 保安，开始坐着休息（让出 CPU）...\n";
// 传入 null 表示：只要没人来敲门，就一直睡，绝不空转！
$num = stream_select($read, $write, $except, null);

echo "【接线员】被保安拍醒了！有动静的通道数量: $num\n";
```

#### 终端现场真实实测：
```text
=== 查看休眠中的接线员 CPU 状态 ===
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    774 jiangfei  20   0   48000  22244  16728 S   0.0   0.3   0:00.01 php
=== 模拟客人敲门连入 8080 ===
【接线员】被保安拍醒了！有动静的通道数量: 1
  -> 亮灯有动静的 Socket: 5
```
**神仙体感**：
- 没人敲门时，`top` 监测到 **`%CPU` 是 0.0%**，状态是休眠 `S`！
- 客户端一旦连入，0.0001 秒之内进程瞬间被唤醒！

---

### 💥 关卡 5.9：内功细节大撞墙 —— 消失的 3 号大门！
既然 `stream_select` 这么神，我们马上准备把它应用到多个连接上。
但很多初学者在这里会撞上一堵诡异的高墙（[`04_select_reference_trap.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/04_select_reference_trap.php)）：
接线员手里明明有 2 个 Socket：`3号迎宾员`（监听端口）和 `4号专职通道`（客人 A）。
接线员把名单 `$read = [$server, $conn]` 交给了保安。
此时客人 A 发了一句消息，保安叫醒了接线员：

```text
【调用 stream_select 之前】接线员递给内核保安的名单:
  - 句柄编号 (FD): 5 (3号大门迎宾员)
  - 句柄编号 (FD): 7 (客人专职通道)

【调用 stream_select 之后】接线员被叫醒，低头看自己手中的 $read 名单:
  - 句柄编号 (FD): 7 (客人专职通道)
```

**😱 灵异事件发生了**：
原本名单里的 **5 号大门迎宾员凭空蒸发了！**
如果直接把这个 `$read` 带入下一次循环，大门口将彻底失联，任何新客人都再也进不来了！


---

## 🟢 第四幕（关卡 5.10 ~ 5.11）：总花名册防涂改机制，与 Ctrl+C 挂断引发的空消息风暴！

### 💬 师徒苏格拉底对话录 4：原始电话本与复印件
- **🤔 导师提问**：
  > 1. “保安为了向你汇报到底是谁在说话，对你递上去的那张 `$read` 纸条做了什么手脚？”
  > 2. “为了保证大门迎宾员和每一个老客人永远不走丢，我们在代码中应该如何管理名单？”
- **🎯 你的思考与回答**：
  > **1. “只把有说话的客人，写在字条上了。”**
  > **2. “需要记录一个原始电话本。”**
- **👏 深度复盘（防涂改铁律）**：
  **太精准了！这就是为什么 `stream_select` 的参数是 `&$read` 引用传参！**
  - 内核保安为了告诉你“谁响了”，**直接用涂改液把你交上去的纸条改了**：把没出声的 FD 全部抹杀，只留下有动静的 FD 还给你！
  - 因此，你提出来的**“原始电话本（总花名册 `$allSockets`）”**是网络编程绝对不可动摇的底线！每一轮调用 `stream_select` 之前，必须从原始电话本复印一份临时名单 `$read = $allSockets` 送去安检！

---

### 🧪 关卡 5.10：招式演进 v0.9 —— 正式把 `stream_select` 封装进 `Worker::run()`！
我们在 [`05_worker_select_v09.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/05_worker_select_v09.php) 中正式将这套机制组装成了现代 Worker 类：

```php
// 每次循环前：复印一份临时名单送检
$read = $this->allSockets;
$write = $except = null;

// 委托保安盯梢，进程休眠
if (stream_select($read, $write, $except, null) <= 0) continue;

// 醒来后，只遍历保安留下的有动静 FD
foreach ($read as $socket) {
    if ($socket === $this->server) {
        // 大门口迎宾员亮灯 -> 接新客并登记入总电话本！
        $conn = stream_socket_accept($this->server);
        $this->allSockets[(int)$conn] = $conn;
    } else {
        // 老客人通道亮灯 -> 读消息并交由 onMessage 处理
        $msg = fread($socket, 1024);
        ...
    }
}
```

---

### 💥 关卡 5.11：现场大翻车！客户端断开连接引发的“空消息死循环风暴”！
很多人以为只要装上了 `stream_select` 就万事大吉了。
但如果我们在读客人消息时不加防备（如 [`06_disconnect_storm_bug.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/06_disconnect_storm_bug.php)）：
当客人连入后，在终端按下了 `Ctrl+C` 断开离开，诡异的惨案再次发生了：

#### 终端现场实测输出：
```text
=== 死循环风暴测试服务器启动 (PID: 894) ===
【大门】新客人进门: FD 6
--- 客户端挂断离开 ---
【第 1 次收到动静】收到消息内容: []
【第 2 次收到动静】收到消息内容: []
【第 3 次收到动静】收到消息内容: []
【第 4 次收到动静】收到消息内容: []
【第 5 次收到动静】收到消息内容: []
【第 6 次收到动静】收到消息内容: []
【第 7 次收到动静】收到消息内容: []
【第 8 次收到动静】收到消息内容: []
【第 9 次收到动静】收到消息内容: []
【第 10 次收到动静】收到消息内容: []
...... 停！仅仅 0.001 秒就狂触发了 10 次空消息！正在紧急止血终止程序！......
```

**😱 恐怖风暴**：
仅仅过了 0.001 秒，控制台狂印了无数条空消息！CPU 瞬间又被打到了 100%！

---


---

## 🟢 第五幕（关卡 5.12 ~ 5.14）：终极解耦 —— 铸造事件循环引擎 `SelectLoop` 与 Workerman 源码印证！

### 💬 师徒苏格拉底对话录 5：破案 TCP 断开与“挂断抹除”
- **🤔 导师提问**：
  > 1. “客人挂电话离开时，明明没说新话，为什么 Linux 内核还会认为这个 Socket‘有动静（可读事件就绪）’并唤醒我们？”
  > 2. “接线员此时读出来的结果是什么？必须对这个 Socket 和原始电话本执行什么操作，才能彻底平息风暴？”
- **🎯 你的思考与回答**：
  > **1. “不太理解，还没系统学 TCP。”**
  > **2. “挂断，并且抹除。”**
- **👏 深度复盘（万物皆文件之 EOF 绝美真理）**：
  1. **完全不需要死记 TCP 协议！只要抓住 Linux 的核心 ——“一切皆文件”：**
     - 想象你在读硬盘上的一个普通文本文件，当你读到最后一个字后面时，会发生什么？会撞上 **`EOF`（End of File，文件末尾）**！
     - 此时如果你再去调 `fread()`，它绝不会卡死睡觉，而是**瞬间返回 0 字节（PHP 里返回空字符串 `""`）**！
     - 网络 Socket 也完全一样！客人按 `Ctrl+C` 挂机（TCP 发送 `FIN` 挥手包），在内核看来就是：**“这个网络文件已经到头了（EOF）！”**
     - 内核必须通过唤醒“可读事件”来通知接线员，接线员一读发现是 `""`，才能恍然大悟：*“原来对方挂了！”*。如果内核不唤醒，接线员将永远不知道客人已经走了！
  2. **“挂断，并且抹除”是唯一的救命稻草：**
     - **挂断**：`fclose($socket)`，关闭文件释放 FD；
     - **抹除**：`unset($this->allSockets[$fd])`，从原始电话本中划掉，防止下一轮 `select` 再次被 EOF 反复唤醒引发 100% CPU 狂暴死循环；
     - **通知业务**：顺理成章触发经典生命周期回调 `($this->onClose)($conn)`！

---

### 🏛️ 关卡 5.12 & 5.13：架构解耦 —— 手写独立事件循环引擎 `SelectLoop`！
在第 3 章中，我们把“具体业务”从框架中抽离了出去。
现在，我们再把**“替我盯梢哪些 FD、哪个 FD 亮灯就调哪个函数”**的繁重苦力活，从 `Worker` 中剥离出来，抽成独立的事件循环发动机 —— **`SelectLoop`**（见 [`07_select_loop.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/07_select_loop.php)）！

```php
// 工业级极简事件循环引擎
class SelectLoop {
    protected array $readFds = [];
    protected array $readCallbacks = [];

    // 1. 注册监听：盯住这个 stream，亮灯就调 $callback
    public function addRead($stream, callable $callback): void {
        $fd = (int)$stream;
        $this->readFds[$fd] = $stream;
        $this->readCallbacks[$fd] = $callback;
    }

    // 2. 注销监听：从花名册划掉
    public function delRead($stream): void {
        $fd = (int)$stream;
        unset($this->readFds[$fd], $this->readCallbacks[$fd]);
    }

    // 3. 启动引擎：全自动循环盯梢与分发！
    public function loop(): void {
        while (true) {
            $read = $this->readFds;
            $write = $except = null;
            if (@stream_select($read, $write, $except, null) <= 0) continue;

            // 谁亮灯，全自动触发谁的回调！
            foreach ($read as $stream) {
                $fd = (int)$stream;
                if (isset($this->readCallbacks[$fd])) {
                    ($this->readCallbacks[$fd])($stream);
                }
            }
        }
    }
}
```

#### 组装后的 ModernWorker v1.0 架构：
```php
class Worker {
    protected SelectLoop $loop;
    public function __construct(public string $address) {
        $this->loop = new SelectLoop();
    }
    public function run(): void {
        $server = stream_socket_server($this->address);
        // 大门迎宾员：只要大门有动静，就调用 acceptConnection
        $this->loop->addRead($server, [$this, 'acceptConnection']);
        $this->loop->loop(); // 启动发动机！
    }
    public function acceptConnection($server): void {
        $conn = stream_socket_accept($server);
        // 新客人进门：只要客人开口说话，就调用 readFromClient
        $this->loop->addRead($conn, [$this, 'readFromClient']);
    }
    public function readFromClient($conn): void {
        $msg = fread($conn, 1024);
        if ($msg === '' || $msg === false) { // 挂断注销
            $this->loop->delRead($conn);
            fclose($conn);
            if ($this->onClose) ($this->onClose)($conn);
            return;
        }
        if ($this->onMessage) ($this->onMessage)($conn, $msg);
    }
}
```

#### 终端真实并发多连接测试输出：
```text
=== ModernWorker v1.0 启动成功，基于事件循环引擎 SelectLoop ===
【大门】新客人进门 (FD: 6)！
【收到业务数据】: 客人 A 第一句话
【大门】新客人进门 (FD: 7)！
【收到业务数据】: 客人 B 来了
【收到业务数据】: 客人 A 第二句话
【包厢】客人 (FD: 6) 挂断离开，注销事件监听。
【业务通知】连接已安全释放！
【收到业务数据】: 客人 B 还在
【包厢】客人 (FD: 7) 挂断离开，注销事件监听。
【业务通知】连接已安全释放！
```
**并发共存、长短连接、挂断回收，全部丝滑运转！**

---

### 📖 关卡 5.14：Workerman 官方源码真迹对照印证！

请打开 Workerman 官方源码文件：[`d:/Workerman/workerman-source/src/Events/Select.php`](file:///d:/Workerman/workerman-source/src/Events/Select.php)！

#### 1. 属性定义与注册监听（第 71 行、第 198~222 行）：
```php
// Workerman 官方源码：
private array $readFds = [];
private array $readEvents = [];

public function onReadable($stream, callable $func): void {
    $fdKey = (int)$stream;
    $this->readEvents[$fdKey] = $func;
    $this->readFds[$fdKey] = $stream;
}

public function offReadable($stream): bool {
    $fdKey = (int)$stream;
    if (isset($this->readEvents[$fdKey])) {
        unset($this->readEvents[$fdKey], $this->readFds[$fdKey]);
        return true;
    }
    return false;
}
```
> **起鸡皮疙瘩的对照**：Workerman 的 `readFds`、`readEvents`、`(int)$stream` 转数字 key、以及 `unset` 移除，与我们刚才手写的 `SelectLoop` 一模一样！

#### 2. 事件循环分发引擎（第 388~408 行）：
```php
// Workerman 官方源码：
while ($this->running) {
    $read = $this->readFds;
    ...
    @stream_select($read, $write, $except, 0, $this->selectTimeout);
    
    foreach ($read as $fd) {
        $fdKey = (int)$fd;
        if (isset($this->readEvents[$fdKey])) {
            $this->readEvents[$fdKey]($fd);
        }
    }
}
```
从“为什么第 2 个人进不来”开始，撞车、破案、非阻塞、CPU 100% 惨案、I/O 多路复用、涂改液陷阱、到现在的独立引擎，**你亲手推导出的每一行代码，全部都在 Workerman 源码真迹里找到了完美的印证！**


---

## 🟢 第六幕（重磅加餐与平缓阶梯）：消灭认知跨度与 `stream_select` 四大隐藏内功！

### 💬 师徒苏格拉底对话录 6：消除“突然冒出 SelectLoop”的认知断层

- **🤔 学员痛点反馈**：
  > “从 `05_worker_select_v09.php` 突然跳到 `07_select_loop.php`，跨度感觉有点太大了！中间发生了什么？还有没有漏掉的核心底层知识点？”
- **👏 导师深度拆解（平缓阶梯）**：
  这个感觉非常敏锐！在上一版代码中，我们在 `Worker::run()` 里写了一段很别扭的硬编码判断：
  ```php
  foreach ($read as $socket) {
      if ($socket === $this->server) {
          // 接客...
      } else {
          // 读客人...
      }
  }
  ```
  **痛点思考**：
  1. 如果明天我们的服务器要同时监听两个端口（比如 80 端口跑 HTTP，8080 端口跑 WebSocket），代码是不是得写 `if ($socket === $server1 || $socket === $server2)`？
  2. 如果我们还想同时监听 0 号键盘输入 `STDIN`，是不是还得写 `else if ($socket === STDIN)`？
  3. 随着业务扩张，这个 `if-else` 会无限膨胀，变成无法维护的垃圾山！

---

### 🪜 铺垫台阶：不用任何面向对象，先用 2 个普通数组消灭一切 `if-else`！
在把代码抽象成类之前，我们先写一个最纯粹的中间态（见 [`09_step_by_step_callbacks.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/09_step_by_step_callbacks.php)）：
本质上，每一个 Socket 无非都需要**绑定一个它专属的回调函数**！
我们只需要在外面准备两个普通的关联数组：
1. **`$readFds = []`**：存放所有的 Socket 资源 `[(int)$fd => $stream]`；
2. **`$callbacks = []`**：存放每个 FD 专属的回调函数 `[(int)$fd => function($socket) { ... }]`！

```php
// 1. 给大门口 3 号迎宾员绑定专属函数：有动静就接客！
$callbacks[(int)$server] = function ($server) use (&$readFds, &$callbacks) {
    $conn = stream_socket_accept($server);
    $fd = (int)$conn;
    
    // 2. 给新客人 4 号绑定专属函数：有动静就读消息！
    $readFds[$fd] = $conn;
    $callbacks[$fd] = function ($conn) use (&$readFds, &$callbacks, $fd) {
        $msg = fread($conn, 1024);
        if ($msg === '' || $msg === false) { // 挂断抹除
            fclose($conn);
            unset($readFds[$fd], $callbacks[$fd]);
            return;
        }
        fwrite($conn, "服务端回复: " . trim($msg) . "\n");
    };
};

// 3. 事件循环极其纯粹：完全没有任何 if-else！
while (true) {
    $read = $readFds;
    $write = $except = null;
    if (stream_select($read, $write, $except, null) <= 0) continue;

    foreach ($read as $socket) {
        $fd = (int)$socket;
        // 🌟 神来之笔：不管你是大门、客人、还是键盘，查表一行直接调！
        $callbacks[$fd]($socket);
    }
}
```
> **豁然开朗的顿悟**：  
> 看明白了吗？`SelectLoop` 类**根本没有任何高深莫测的魔法**！它不过就是把上面的 `$readFds`、`$callbacks`、以及这个 `while(true)` 循环打包放进了一个名叫 `SelectLoop` 的盒子里，把操作数组的代码封装成了 `addRead()` 和 `delRead()` 两个方法而已！

---

### 🌊 隐藏内功 1：水平触发（Level-Triggered, LT）的本质实测！
- **🤔 祖师爷的困境**：
  如果客户端一次性发送了 6 个字节 `"ABCDEF"`，但我们的服务端每次调用 `fread($conn, 2)` **极其抠门，故意只读 2 个字节**，内核保安会怎么办？
- **🧪 实验验证（[`08_level_triggered_demo.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/08_level_triggered_demo.php)）**：
  ```text
  === 水平触发实验启动 (PID: 1339) ===
  【第 1 次被 select 唤醒】只读取了 2 字节: [AB]
  【第 2 次被 select 唤醒】只读取了 2 字节: [CD]
  【第 3 次被 select 唤醒】只读取了 2 字节: [EF]
  === 6 个字节全部读完！===
  ```
- **👏 内核真相**：
  Linux 的 `select` 默认是**水平触发（Level-Triggered）**！
  只要缓冲区里**还有残留的数据没读完（就像水位高于警戒线）**，每一次循环 `select` 都会不知疲倦地立刻把你唤醒，直到你把缓冲区彻底掏空为止！这就是为什么前面客户端断开时，EOF 状态一直存在导致它疯狂唤醒！

---

### ⛓️ 隐藏内功 2：1024 诅咒 —— 为什么 Workerman 会报 1024 告警？
翻看 `workerman-source/src/Events/Select.php` 第 200 行：
```php
if (count($this->readFds) >= 1024) {
    trigger_error("System call select exceeded the maximum number of connections 1024, please install event extension for more connections.", E_USER_WARNING);
}
```
- **底层原因**：
  Linux 的 `select` 系统调用在 C 语言底层使用的是一个固定长度的位图结构体：
  ```c
  #define FD_SETSIZE 1024
  typedef struct {
      unsigned long fds_bits[1024 / (8 * sizeof(long))];
  } fd_set;
  ```
  这个位图长度死死定格在 **1024 位**！也就是说，**`select` 天生被操作系统判了死刑：单个进程最多只能监控 1024 个 FD**！一旦超过 1024，就会发生内存越界或者严重 Bug。
  这也是为什么在后续的阶段 13，我们必须请出能撑起百万并发的终极杀器 —— **`Epoll`**！

---

### ✍️ 隐藏内功 3：为什么 `$write` 和 `$except` 绝大部分时间必须传 `null`？
- **致命陷阱**：
  很多人以为：既然有读事件，那是不是为了能给客户端发消息，我必须把 `$conn` 也放进 `$write` 监听？
  **千万不要！一旦你把 Socket 塞进 `$write`，你的 CPU 会瞬间被打到 100%！**
- **为什么？**
  因为 Socket 的发送缓冲区在绝大多数时候都是**空的、空闲的**！在 Linux 眼里，发送缓冲区有空间就代表“可写就绪”。
  如果你把 Socket 塞进 `$write`，`stream_select` 会觉得“它一直可写啊！”，于是每一微秒都把你叫醒一次，程序再次陷入空转风暴！
- **什么时候才用 `$write`？**
  只有当你发送几百兆的大文件时，网卡发不过来，内核发送缓冲区被塞满了（返回 `EAGAIN` 暂时写不进去了），此时你才临时把 Socket 塞进 `$write`，等内核把缓冲区发空一点通知你“可以继续写了”，你写完下一批数据后，**必须立刻把 Socket 从 `$write` 剔除**！

---

### ⏱️ 隐藏内功 4：超时参数（Timeout）的三种神态
`stream_select($read, $write, $except, $tv_sec, $tv_usec)` 的最后两个参数是控制时间的：
1. **`null`**：**永久休眠**。没有任何动静就一直睡，CPU 占用率 0.0%，靠网络中断唤醒；
2. **`0`**：**毫秒不睡，瞬间返回**。变成了非阻塞探测（忙轮询模式）；
3. **`> 0`（如 1 秒）**：**限时打盹**。如果在 1 秒内有人说话，立刻提前醒来；如果整整 1 秒都没人理你，1 秒钟一到保安也会把你叫醒！
   > 🌟 **为第 6 章埋下惊天伏笔**：这正是我们不需要 `sleep()` 也能实现**高精度非阻塞定时器（Timer）**的绝对核心原理！


---

## 🟢 第七幕（重中之重）：大白话拆解“门铃与岗位卡” —— 彻底理清事件派发机制

### 💡 核心痛点诊断：为什么上一节的闭包嵌套代码让人头皮发麻？
在上一节的过渡代码中，我们把闭包（匿名函数）嵌套在了另一个闭包内部，还带着一堆晦涩的 `use (&$readFds, &$callbacks, $fd)` 变量引用。这种写法在视觉上极易让人迷失时间线和数据流！

为了让你 100% 毫无门槛地看透本质，我们在 [`11_hotel_reception_stepped.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/11_hotel_reception_stepped.php) 中彻底消灭了所有闭包嵌套，换成**两个完全独立的、有名字的普通函数**！

---

### 🏨 大饭店前台模型：两张表 + 两个办事员

#### 1. 前台常备的两张表
- **门铃表 `$sockets`**：挂着所有需要监听的门铃 `[FD编号 => Socket资源]`；
- **岗位卡片表 `$handlers`**：记录每个门铃响了应该喊哪个办事员 `[FD编号 => 函数名]`！

#### 2. 两个职责分明的办事员函数
- **办事员 1（`handleNewGuest`，迎宾小姐）**：
  专职守在大门口。门铃响了她只做两件事：
  1. 调用 `accept` 把客人迎进店，拿到客人专属的包厢号码牌（如 FD 6）；
  2. 在两张表上同时登记客人：门铃表挂上 6 号门铃，卡片表写上：*“只要 6 号门铃响了，喊 handleGuestMessage（包厢服务员）伺候！”*
- **办事员 2（`handleGuestMessage`，包厢服务员）**：
  专职陪客人聊天。客人一说话他就 `fread` 听并记录；客人挂机退房离开，他就把 6 号门铃和卡片从两张表里彻底注销！

#### 3. 极简代码全景（[`11_hotel_reception_stepped.php`](file:///d:/Workerman/chapters/chapter05_concurrency_and_eventloop/11_hotel_reception_stepped.php)）
```php
// 表 1：门铃表；表 2：岗位卡片表
$sockets = [];
$handlers = [];

// 迎宾员
function handleNewGuest($server) {
    global $sockets, $handlers;
    $conn = stream_socket_accept($server);
    $connId = (int)$conn;
    echo "🔔【大门门铃响】接待客人进店，分配号码牌 FD: $connId\n";

    // 登记新客人：门铃表和卡片表各加一项！
    $sockets[$connId] = $conn;
    $handlers[$connId] = 'handleGuestMessage'; // 绑定聊天办事员！
}

// 包厢服务员
function handleGuestMessage($conn) {
    global $sockets, $handlers;
    $connId = (int)$conn;
    $msg = fread($conn, 1024);
    if ($msg === '' || $msg === false) { // 退房注销
        fclose($conn);
        unset($sockets[$connId], $handlers[$connId]); // 两张表同时划掉！
        return;
    }
    echo "💬【包厢门铃响】FD $connId 说: " . trim($msg) . "\n";
    fwrite($conn, "服务端回复: " . trim($msg) . "\n");
}

// 饭店开业：在两张表上登记大门
$server = stream_socket_server("tcp://0.0.0.0:8080");
$serverId = (int)$server;
$sockets[$serverId] = $server;
$handlers[$serverId] = 'handleNewGuest'; // 大门响了找迎宾员！

// 前台大堂经理的工作循环（极其简单！）
while (true) {
    $read = $sockets;
    $write = $except = null;
    if (stream_select($read, $write, $except, null) <= 0) continue;

    foreach ($read as $socket) {
        $id = (int)$socket;
        $workerName = $handlers[$id]; // 查卡片：该叫谁去？（'handleNewGuest' 还是 'handleGuestMessage'？）
        $workerName($socket);         // 直接喊该办事员去干活！
    }
}
```

---

### 🌉 从“门铃表”到面向对象 `SelectLoop` 的桥梁：
请对比上面这段大白话代码与面向对象架构：
| 面向过程（门铃表模型） | 面向对象（Workerman / ModernWorker 架构） |
| :--- | :--- |
| 门铃表 `$sockets` + 卡片表 `$handlers` | `SelectLoop` 类内部的 `$readFds` 和 `$readCallbacks` 属性 |
| 向两张表增加记录 | `SelectLoop::addRead($stream, $callback)` 方法 |
| 从两张表注销记录 | `SelectLoop::delRead($stream)` 方法 |
| `while(true)` 循环查表分发 | `SelectLoop::loop()` 方法 |
| 迎宾员函数 `handleNewGuest` | `Worker::acceptConnection()` 类方法 |
| 服务员函数 `handleGuestMessage` | `Worker::readFromClient()` 类方法 |
| 绑定函数 `'handleNewGuest'` | 绑定对象方法 `[$this, 'acceptConnection']` |

你看！面向对象不过是给上面的两个数组和两个函数穿上了一件工整的“西装”，骨子里的每一根血管和每一个动作，完全一模一样！
