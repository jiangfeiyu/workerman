# 第 7 章：苏格拉底架构推导（二） —— 从“发大文件丢包”推导出 `TcpConnection` 与异步发送缓冲区

> **本章核心灵魂**：为什么在 Workerman 官方源码里，最核心、代码量最庞大的类不是 `Worker`，而是 `TcpConnection`？
> 这一章我们将经历从“语法憋屈”到“生产级核爆事故”的双重洗礼：
> 试图挂载 `$conn->uid` 直接引发 PHP 崩溃 $\rightarrow$ 诞生包装盒 `TcpConnection` 并实现职责下放 $\rightarrow$ 紧接着遭遇 10MB 大文件惨遭吞噬 7MB 的丢包血案 $\rightarrow$ 一步步被逼着推导出 Linux 内核 `SO_SNDBUF`、应用层异步发送缓冲区、以及 `stream_select` 的可写事件（`$write`）！

---

## 🟢 第一幕（关卡 7.1 ~ 7.3）：从语法憋屈到“包装盒”与职责下放

### 💬 师徒苏格拉底对话录 1：裸句柄的尴尬与包装盒的诞生
- **🤔 祖师爷的困境**：
  在前面的章节里，`stream_socket_accept()` 返回的 `$conn` 一直是一个原生的 PHP 资源类型（`resource (stream)`）。
  现在业务开发提出了非常朴素的需求：
  1. *“客人张三登录成功了，我想把他的用户 ID 挂在连接上：`$conn->uid = 10086;`，方便后续识别他是谁。”*
  2. *“给客人发消息，每次都要写原生的 `fwrite($conn, $data)`，太底层、太丑陋了，能不能直接 `$conn->send($data)`？”*

- **🧪 实验 1：给裸 resource 挂属性引发的血案（[`01_raw_resource_error.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/01_raw_resource_error.php)）**：
  ```php
  $conn = stream_socket_accept($server); // 返回 resource (stream)
  $conn->uid = 10086; // 试图挂属性！
  ```
- **终端现场输出**：
  ```text
  ❌ 触发 PHP 致命崩溃: Error -> Attempt to assign property "uid" on resource
  ```
  在 PHP 中，资源类型是一个纯底层的 C 语言指针包装，**根本不是面向对象里的 object 对象，严禁添加任何动态属性！**

---

### 📦 关卡 7.2：包装盒诞生 —— `TcpConnection`
既然裸句柄挂不了属性，最直白的解决方案就是**造一个面向对象的收纳盒，把裸句柄藏在收纳盒肚子里**（见 [`02_tcp_connection_box.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/02_tcp_connection_box.php)）！
并在类上打上 PHP 8.2+ 的属性注解 `#[AllowDynamicProperties]`：
```php
#[\AllowDynamicProperties]
class TcpConnection {
    public int $id;
    public $socket;

    public function __construct($socket) {
        $this->socket = $socket;
        $this->id = (int)$socket;
    }

    public function send(string $data): int|false {
        return @fwrite($this->socket, $data);
    }

    public function close(): void {
        @fclose($this->socket);
    }
}
```
从此，业务代码拿到的再也不是冷冰冰的裸句柄，而是尊贵的对象：
```php
$conn->uid = 10086;          // 动态挂属性完全合法！
$conn->send("你好张三！");     // 语义优雅清晰！
```

---

### 🚚 关卡 7.3：职责大搬家 —— `TcpConnection` 自治管理
- **架构反思**：
  在旧版中，`Worker` 类既要负责大门监听接客，又要管具体连接怎么读消息（`baseRead`）、怎么处理挂断。
  既然每个客人已经是一个独立的 `TcpConnection` 对象了，**为什么不把“怎么读消息、怎么关闭”这套苦力活，直接交给 `TcpConnection` 自己管？**
- **重构进化（[`03_responsibility_refactor.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/03_responsibility_refactor.php)）**：
  ```php
  class TcpConnection {
      public function __construct(public $socket, protected SelectLoop $loop) {
          $this->id = (int)$socket;
          // 🌟 职责搬家：连接自己向事件循环注册自己的读取方法！
          $this->loop->addRead($this->socket, [$this, 'baseRead']);
      }

      public function baseRead($socket): void {
          $data = @fread($socket, 65535);
          if ($data === '' || $data === false) { // 挂断离开
              $this->destroy();
              if ($this->onClose) ($this->onClose)($this);
              return;
          }
          if ($this->onMessage) ($this->onMessage)($this, $data);
      }

      public function destroy(): void {
          $this->loop->delRead($this->socket);
          @fclose($this->socket);
      }
  }
  ```
  **架构收益**：`Worker` 瞬间极致瘦身！`Worker` 只管在门口守着，来一个客人就 `new TcpConnection($socket, $this->loop)`，剩下的所有交互全由 `TcpConnection` 自身搞定！

---

## 🟢 第二幕（关卡 7.4 ~ 7.5）：核爆级丢包惨案 —— 吞掉 7MB 数据的 `fwrite`！

### 💥 关卡 7.4：发送 10MB 大数据车祸现场（[`04_big_packet_loss_bug.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/04_big_packet_loss_bug.php)）
现在我们以为有了 `TcpConnection->send()` 就可以高枕无忧了。
业务要在聊天室里发一张 10MB 的高清大图（`str_repeat("A", 10000000)`）：
```php
$conn->send($bigData);
```

#### 终端现场实测输出：
```text
=== 大数据丢包测试服务器启动 (PID: 3358) ===
1. 服务端准备发送 10,000,000 字节的大数据...
2. fwrite 执行完毕！实际成功写入内核缓冲区的字节数: 2634240 字节
3. 丢弃/丢失未发送的字节数: 7365760 字节 (约 7.02 MB)！
```

**😱 恐怖惊魂现场**：
整整 **7.02 MB 的数据凭空蒸发了！** 客户端收到的图片直接变成了损坏文件！


---

## 🟢 第三幕（架构演进深度透视）：为什么需要“铁三角”？（Worker、SelectLoop、TcpConnection）

### 💡 核心痛点反思：第 5 章里的“上帝类”反模式
在第 5 章中，我们的 `Worker` 类一个人干了全店所有的脏活累活：
1. 它自己负责大门监听（`stream_socket_server`）；
2. 它自己负责大门接客（`stream_socket_accept`）；
3. 它自己直接去读客人的裸管子（`fread($socket)`）；
4. 它自己去判断客人有没有退房（`EOF`）；
5. 它自己直接往管子里写数据（`fwrite($socket)`）；
6. 它还负责驱动事件循环引擎（`SelectLoop`）。

**💥 为什么这种“上帝类”架构在真实工业界会彻底崩溃？**
因为一个真实的 TCP 长连接远不止是一个数字号码牌（FD）那么简单！每一个长连接都有自己的：
- **生命周期状态**：连接中？已建立？正在关闭？已关闭？
- **专属业务上下文**：用户的 `uid`、登录 Token、权限角色、购物车；
- **协议解析状态**：HTTP 头读完了吗？WebSocket 握手成功了吗？（阶段 8 & 9）
- **专属发送缓冲区**：未发完的数据积压在谁的名下？（关卡 7.6）

如果把这成千上万个连接的状态全塞在 `Worker` 里，`Worker` 内部就得维护 10 几个巨大的散列表：
`$worker->uids[$fd] = 10086;`  
`$worker->sendBuffers[$fd] = '...';`  
`$worker->states[$fd] = ...;`  
代码将迅速演变成难以维护的意大利面条，稍微漏写一个 `unset` 就会引发全服内存泄漏！

---

### 🏛️ 铁三角协同模型：三大核心角色的终极职责划分

面向对象的终极精髓，就是**把属于一个连接的数据与行为，打包在一起（高内聚、低耦合）**！
由此，现代高并发服务器演进出了教科书级的**“铁三角协作架构”**：

```
                 ┌────────────────────────────────┐
                 │       1. SelectLoop (心脏)      │
                 │   只管底层系统调用与盯梢 FD     │
                 └───────────────┬────────────────┘
                                 │
                 向 Loop 注册    │    驱动 Loop 运转
                 大门读事件      │
                                 ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                       2. Worker (大堂经理)                   │
   │  只管大门迎宾（监听端口、accept 接客、孵化服务员 TcpConnection） │
   └─────────────────────────────┬────────────────────────────────┘
                                 │
                   来一个新客，  │ 
                   孵化一个专职  │ 
                   服务员对象    │
                                 ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                  3. TcpConnection (专职包厢服务员)            │
   │   全权负责单连接的一切（挂载自身读写、读写数据、维护缓冲区）    │
   └──────────────────────────────────────────────────────────────┘
```

#### 铁三角角色的具体职责分工：
1. **`SelectLoop`（纯粹的底层发动机）**：
   它根本不知道什么是 HTTP、什么是大门、什么是客人。它唯一的职责就是：**“谁的 FD 亮灯了，我就调用谁的回调函数”**。
2. **`Worker`（大堂经理 / 容器）**：
   它负责饭店的宏观管理：开门营业（监听端口）、迎客进门（`accept`）。每来一位新客人，它就分配一个专职服务员 `new TcpConnection($socket, $loop)`，然后大堂经理就去忙别的了！
3. **`TcpConnection`（专职包厢服务员）**：
   **它拥有自己所服务客人的完整档案与全部能力！**
   - 它自己找 `SelectLoop` 挂上自己的监听：`$loop->addRead($this->socket, [$this, 'baseRead'])`；
   - 它自己负责从管子里掏数据（`fread`）；
   - 它自己负责调用 `$conn->send()` 发送数据；
   - 它自己负责探测客户端是否断开，并在挂断时自己从 `SelectLoop` 卸载注销！

---

### 🏃‍♂️ 一个数据包在“铁三角”内部的完整旅行路线（沙盘还原）：

以 [`05_architecture_triangle.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/05_architecture_triangle.php) 为例，数据在内存中的接力过程如下：

```
【步骤 1：新客敲门】
客户端发起连接 ──> 内核通知 SelectLoop ──> 唤醒 Worker 迎宾 ──> accept 得到 $socket

【步骤 2：孵化服务员】
Worker 执行 new TcpConnection($socket, $loop) ──> TcpConnection 构造函数当场向 Loop 挂载自身的 baseRead！

【步骤 3：客人说话】
客户端发送 "你好" ──> 内核通知 SelectLoop ──> 自动唤醒 TcpConnection::baseRead 
              ──> baseRead 执行 fread() 掏出字节 
              ──> 关键接力棒：调用 ($this->onMessage)($this, $data) 递给业务代码！

【步骤 4：业务使用】
业务代码拿到 $conn 对象 ──> 自由挂载 $conn->loginUser = 'VIP' ──> 调用 $conn->send("回话")！
```

---


---

## 🟢 第四幕（显微镜级代码拆解）：`TcpConnection` 4 大关键语法与指针机制

### 🔬 细节 1：为什么写成 `[$this, 'baseRead']`？
看 `TcpConnection::__construct` 的第 17 行：
```php
$this->loop->addRead($this->socket, [$this, 'baseRead']);
```
- **语法原理**：在 PHP 中，如果要将“某个对象的某个方法”作为回调函数传参，不能只写函数名字符串，必须传一个两元素数组：
  ```php
  [$对象实例, '方法名字符串']
  ```
- **执行流**：当底层 `SelectLoop` 醒来调用这个回调 `$callback($socket)` 时，PHP 底层会自动转变为：
  ```php
  $this->baseRead($socket);
  ```
  这样 `baseRead` 内部就能通过 `$this` 直接访问当前连接专属的属性（如 `$this->id`、`$this->socket`）！

---

### 🔬 细节 2：为什么 `Worker` 必须写 `$this->connections[$id] = $connection`？（引用计数与 GC 生死线）
看 `Worker` 迎宾代码第 63 行：
```php
$connection = new TcpConnection($socket, $this->loop);
$this->connections[$connection->id] = $connection; // 🌟 生死线！
```
- **如果不写这一行会怎样？**  
  迎宾回调是一个匿名函数，里面的 `$connection` 是一个**局部变量**！  
  如果不用一个持久属性（`$this->connections` 数组）死死攥住它，当迎宾匿名函数执行完毕退出作用域的那一纳秒，**PHP 的引用计数垃圾回收机制（GC）发现没有任何人引用这个对象，就会当场触发 `__destruct` 把它给销毁释放掉！**
- **结论**：`$this->connections` 是连接在内存中的**锚点（强引用）**，客人在线多久，这个数组就抓着它多久！

---

### 🔬 细节 3：接力棒传递 —— `($this->onMessage)($this, $data)`
看 `TcpConnection::baseRead` 的第 36 行：
```php
if ($this->onMessage) {
    ($this->onMessage)($this, $data);
}
```
对照业务程序员写的使用代码：
```php
$worker->onMessage = function (TcpConnection $conn, string $msg) {
    ...
};
```
- **实参与形参绝对对齐**：
  - 实参 1 是 `$this`（当前 `TcpConnection` 对象本身） $\rightarrow$ 对应形参 1 的 `$conn`！
  - 实参 2 是 `$data`（`fread` 读出的原始字符串） $\rightarrow$ 对应形参 2 的 `$msg`！
  这就是为什么业务程序员在回调里可以直接写 `$conn->send(...)` 或 `$conn->uid = 10086`，因为拿到手的就是这个服务员对象本身！

---

### 🔬 细节 4：断开清理的“四步连环拔管”（消灭内存泄漏）
看客户端断开时的执行逻辑：
```php
// 1. 探测到 EOF（对方挂机）
if ($data === '' || $data === false) {
    // 2. 第一步：从 SelectLoop 注销 FD，保安不再叫醒它
    $this->loop->delRead($this->socket);
    // 3. 第二步：告诉操作系统内核关闭底层套接字，释放 FD 号码牌
    @fclose($this->socket);
    // 4. 第三步：触发 Worker 的 onClose 回调，从 $this->connections 数组中 unset 移除！
    if ($this->onClose) ($this->onClose)($this);
}
```
这一步执行完，`$this->connections` 对该对象的强引用被拔除，引用计数归零，PHP 彻底回收该连接占用的内存，整个生命周期丝丝入扣，零内存泄漏！


---

## 🟢 第五幕（关卡 7.5 ~ 7.8）：拯救丢包 —— 应用层异步发送缓冲区与可写事件的生死劫！

### 💬 师徒苏格拉底对话录 2：双层蓄水池与可写事件真相
- **🤔 导师提问**：
  > 1. “为什么不能怪 Linux 内核把数据弄丢了？`fwrite` 返回的数字究竟代表什么？数据到底写到了哪里？”
  > 2. “内核池子只有 2.6MB 装不下 10MB，我们应该在 `TcpConnection` 内部准备一个什么东西把尾巴暂存起来？”
  > 3. “把剩余数据存起来后，我们怎么知道内核池子什么时候腾出了空位？`stream_select` 的第二个参数是什么用的？”
- **🎯 你的思考与回答**：
  > **1. “应该是最大的传输空间就是 2,634,240，数据应该是写在的内核的某个内存区域内。”**
  > **2. “准备一块内存空间暂存起来。”**
  > **3. “write 参数看管子内还有没有在传输的内容。”**
- **👏 深度复盘（击中本质）**：
  **全中！这就是现代高并发网络底层“双层蓄水池模型”的核心真相！**

```
 ┌────────────────────────────────────────────────────────┐
 │ 1. 用户态 PHP 内存：$conn->send($bigData, 10,000,000 字节) │
 └───────────────────────────┬────────────────────────────┘
                             │
                  fwrite()   │ 第一次直写：
                  尝试拷贝   │ 内核池子小，只能吃下 2,919,936 字节！
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 2. Linux 内核套接字发送缓冲区 (SO_SNDBUF, 约 2.6MB)     │ ──> 网卡 DMA 慢慢往网线上发
 └───────────────────────────┬────────────────────────────┘
                             │
                    没塞进去 │ 剩下的 7,080,064 字节怎么办？
                    的尾巴   │ 绝不能丢！存入我们自己的大水库！
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 3. 应用层发送缓冲区：$this->sendBuffer                  │
 │    暂存剩余 7.08 MB 数据，并向 Loop 挂载 addWrite 监听！   │
 └────────────────────────────────────────────────────────┘
```

---

### 🔬 核心代码显微镜拆解（关卡 7.6 ~ 7.8）

#### 1. 灵魂发动机升级：为什么诞生了 `AdvancedSelectLoop`？
在第 6 章的 `SelectLoop` 中，我们的事件循环其实是一个**“半盲人”**：
```php
// 第 6 章 14_select_loop_with_heap.php 中的原版写法：
$read = $this->readFds;
$write = null; // 💥 看这里！第 2 个参数写死了 null！
$except = null;
stream_select($read, $write, $except, $sec, $usec);
```
- **第 6 章的盲区**：因为第 5、6 章我们发的数据极短（如 `"hello"`、心跳包），内核发送缓冲区永远塞不满，`fwrite` 每次都能瞬间返回成功，所以事件循环根本不需要管“可写事件”；
- **第 7 章的危机**：当一次性发送 10MB 大数据时，内核小池子（约 2.6MB）瞬间被撑爆！剩下的 7.4MB 被迫存入 `TcpConnection` 的应用层缓冲区 `$this->sendBuffer`；
- **核心追问**：**谁来通知 PHP“内核池子里的水被网卡抽走一部分了，又有空位可以接着倒水了”？**
  答案正是：Linux 内核 `select` 系统调用的第 2 个参数 —— **可写就绪描述符集合（`writefds`）**！
  因此，我们必须为 `SelectLoop` 进行核心器官升级，诞生了 **`AdvancedSelectLoop`**！

---

#### 2. `AdvancedSelectLoop` 逐行解剖镜

```php
class AdvancedSelectLoop extends SelectLoop {
    // 🌟 1. 新增写事件名册与回调名册（结构与读事件完全对称）
    protected array $writeFds = [];
    protected array $writeCallbacks = [];

    // 🌟 2. 挂载可写监听：将 Socket 资源与对应的冲刷回调关联
    public function addWrite($stream, callable $callback): void {
        $fd = (int)$stream; // 强转整数 FD（如 15），作为哈希表的 O(1) 索引
        $this->writeFds[$fd] = $stream;
        $this->writeCallbacks[$fd] = $callback;
    }

    // 🌟 3. 卸载可写监听：排空后必须立刻抹去，斩断内核就绪通知
    public function delWrite($stream): void {
        $fd = (int)$stream;
        unset($this->writeFds[$fd], $this->writeCallbacks[$fd]);
    }

    public function loop(): void {
        while (true) {
            // ... (省略定时器最小堆计算 $timeout 代码，逻辑完全保持第 6 章原貌) ...

            // 🌟 4. 解决“引用传参修改”陷阱：传给 select 之前必须复印一份！
            $read = $this->readFds;
            $write = $this->writeFds; // 拷贝临时副本给保安
            $except = null;

            // 🌟 5. 内核保安同时盯着读、写和闹钟！
            @stream_select($read, $write, $except, $sec, $usec);

            // 🌟 6. 遍历读就绪：有人说话了，触发 readCallbacks（即 TcpConnection::baseRead 或 Worker::accept）
            foreach ($read as $stream) {
                $fd = (int)$stream;
                if (isset($this->readCallbacks[$fd])) {
                    ($this->readCallbacks[$fd])($stream);
                }
            }

            // 🌟 7. 遍历写就绪：内核池子腾出空位了，触发 writeCallbacks（即 TcpConnection::baseWrite）
            foreach ($write as $stream) {
                $fd = (int)$stream;
                if (isset($this->writeCallbacks[$fd])) {
                    ($this->writeCallbacks[$fd])($stream);
                }
            }

            // ... (省略定时器任务遍历执行代码) ...
        }
    }
}
```

---

#### 3. 📖 Workerman 源码真迹印证：`Workerman\Events\Select`
打开 Workerman 官方源码 `workerman-source/src/Events/Select.php`，你会发现我们手写的 `AdvancedSelectLoop` 与工业级原版代码**完全 1:1 镜像对应**：

| 本地推导 `AdvancedSelectLoop` | Workerman 官方 `Events\Select.php` | 底层机制与作用 |
| :--- | :--- | :--- |
| `protected array $writeFds = [];` | `private array $writeFds = [];` (L78) | 保存所有待监听可写的原生资源指针 |
| `protected array $writeCallbacks = [];` | `private array $writeEvents = [];` | 保存写就绪后被触发的 PHP 回调闭包 |
| `public function addWrite($stream, $cb)` | `public function onWritable($stream, $func)` (L227) | 登记可写事件，将 FD 塞入名册 |
| `public function delWrite($stream)` | `public function offWritable($stream)` (L243) | 销毁可写事件，从名册中 `unset` 剔除 |
| `$write = $this->writeFds;` | `$write = $this->writeFds;` (L390) | 防篡改保护：复印副本传入 `stream_select` |
| `foreach ($write as $stream)` | `foreach ($write as $fd)` (L410) | 遍历内核涂改后留下的“有空位”的 FD 并执行回调 |

---

#### 4. 第一次直写与暂存尾巴（`TcpConnection::send()`）
```php
public function send(string $data): void {
    // 1. 如果之前已经有积压在排队了，新来的数据绝不能插队，必须追加到尾部！
    if ($this->sendBuffer !== '') {
        $this->sendBuffer .= $data;
        return;
    }

    // 2. 尝试往内核发送缓冲区塞一次
    $len = @fwrite($this->socket, $data);
    if ($len === false) $len = 0;

    // 3. 一次性全塞进去了，圆满成功！
    if ($len === strlen($data)) return;

    // 4. 塞不下了！把没倒进去的尾巴截取出来，存入应用层发送缓冲区！
    $this->sendBuffer = substr($data, $len);

    // 5. 挂载可写监听：通知内核“池子腾出空位时，叫我的 baseWrite 接着倒水！”
    $this->loop->addWrite($this->socket, [$this, 'baseWrite']);
}
```

#### 5. 异步冲刷与“生死注销”（`TcpConnection::baseWrite()`）
```php
public function baseWrite($socket): void {
    // 1. 趁内核池子有空位，赶紧继续往里塞！
    $len = @fwrite($socket, $this->sendBuffer);
    if ($len === false) $len = 0;

    // 2. 裁切掉刚才成功写入的头部
    $this->sendBuffer = substr($this->sendBuffer, $len);

    // 3. 🌟 生死线：全部发完排空时，必须立刻注销可写监听！
    if ($this->sendBuffer === '') {
        $this->loop->delWrite($this->socket);
    }
}
```

---

### 💥 关卡 7.8 深度透视：为什么发完数据必须立刻 `delWrite`？
- **致命陷阱**：在 Linux 底层，只要内核发送缓冲区**有哪怕 1 个字节的空位**，内核保安就判定该 Socket **“处于可写就绪态”**！
- 如果 `$sendBuffer` 已经排空变为了 `""`，而你忘了调用 `delWrite`：
  下一轮循环，内核保安一看：“池子是空的，完全可写！”，于是微秒级连续唤醒你；
  醒来后 `baseWrite` 发现没东西可写，又空手而归；
  一秒钟内这种死循环会重复几百万次，**CPU 瞬间再次飙死在 100% 暴走！**
- **铁律总结**：
  - **可读事件（Read）**：**常驻挂载**！只要连接活着，就必须一直监听客人有没有说话；
  - **可写事件（Write）**：**按需挂载，排空即卸**！有数据积压塞不下时才挂载，冲刷排空后立刻拔掉！

#### 🧪 实验验证 1：单独透视写事件的注册与卸载（[`08_loop_write_event_magnifier.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/08_loop_write_event_magnifier.php)）
```bash
wsl php chapters/chapter07_tcp_connection/08_loop_write_event_magnifier.php
```
```text
=== 单独透视 AdvancedSelectLoop 写事件机制 ===

1. 此时客户端已连入，内核 Socket 发送缓冲区是空的（即处于可写状态）。
2. 注册写事件: $loop->addWrite($conn, 回调函数)...
3. 启动事件循环 $loop->loop()，观察写事件是否瞬间被内核唤醒...
   [第 1 次写事件唤醒] 内核通知：当前 Socket 是可写的！
   [立即注销写事件] 执行 $loop->delWrite($socket)...
```

#### 🧪 实验验证 2：亲历未注销写事件导致的“空转风暴”（[`09_write_storm_proof.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/09_write_storm_proof.php)）
```bash
wsl php chapters/chapter07_tcp_connection/09_write_storm_proof.php
```
```text
=== 实验：透视写事件不注销导致的‘空转风暴’ ===
1. 客户端已连接，内核发送缓冲区是空的（处于极度可写状态）。
2. 注册写事件且故意不注销，启动事件循环 0.2 秒...

   [警告！疯狂唤醒中...] 已触发 50000 次！耗时 0.103 秒
   [紧急停止] 仅仅 0.2 秒内，内核就轰炸唤醒了 97554 次！
   结论：只要内核发送缓冲区有空间，select 就会永无休止地返回可写！
   铁律：写事件绝不能常驻，必须在数据排空后立刻 delWrite()！
```
**惊人铁证**：仅仅 0.2 秒内，内核由于“池子永远有空位”，整整唤醒了 PHP 97,554 次！如果不加 `delWrite()`，CPU 瞬间 100% 暴死！

---

### 🧪 关卡 7.7 实战验证：10MB 大数据 0 丢包传输！
我们在 [`07_async_send_buffer.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/07_async_send_buffer.php) 与 [`test_big_receive.php`](file:///d:/Workerman/chapters/chapter07_tcp_connection/test_big_receive.php) 中完成了测试：

#### 终端现场毫秒级实测输出：
```text
=== 永不丢包的异步发送服务器启动 (PID: 4994) ===

=== 客人索要 10MB 大数据 ===
   [第一次直写] 计划发送 10000000 字节，内核吃下 2919936 字节
   [积压触发] 剩余 7080064 字节存入 $sendBuffer，挂载可写监听！
   [baseWrite 唤醒冲刷] 成功冲刷写入 3339633 字节，还剩 3740431 字节
   [baseWrite 唤醒冲刷] 成功冲刷写入 3339633 字节，还剩 400798 字节
   [baseWrite 唤醒冲刷] 成功冲刷写入 400798 字节，还剩 0 字节
   [排空注销] 数据全部发送完毕！立刻从 SelectLoop 卸载可写监听！
=== 客户端接收完毕 ===
实际累计收到: 10000000 字节 (计划: 10000000 字节)
传输耗时: 0.022 秒
🎉 100% 完整接收，0 字节丢失！大获全胜！
```
**丢包隐患彻底消灭！整整 1000 万字节，分 4 次精准冲刷，耗时仅 0.022 秒，0 字节丢失！**
