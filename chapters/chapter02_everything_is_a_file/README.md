# 第 2 章：一切皆文件 —— 从“怎么读写五花八门的硬件”推导出文件描述符 FD

> **本章核心灵魂**：如果让你设计操作系统，硬盘要用一套函数、键盘要用一套函数、显示器要用一套函数、网卡又要用一套函数，程序员非得疯掉不可！看 Unix/Linux 祖师爷如何用 **FD（文件描述符，从 0 开始的排队数字）** 一统江湖！并由此破解 Workerman 源码中著名的 `resetStd()` 黑魔法与 `Worker::lock()` 文件锁机制！

---

## 🟢 第一幕（关卡 2.1）：娘胎里自带的三根管子 (`0, 1, 2`)

### 🤔 回顾：那个神秘的数字 `1` 到底是谁？
还记得在第 0 章关卡 0.3 里，我们用 `strace` 透视镜偷看 `echo "Hello Linux!\n"` 时，抓到的 Linux 内核系统调用吗：
```c
write(1, "Hello Linux!\n", 13) = 13
```
当时我们心中升起了一个巨大的问号：**我们在代码里根本没有调用 `fopen` 打开任何文件，为什么 `write` 的第一个参数是数字 `1`？这个 `1` 是从哪冒出来的？为什么往 `1` 里面写字，黑窗口屏幕就会亮起像素？**

### 🧪 4 行代码钻进进程肚子里探秘（[`01_born_with_three_fds.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/01_born_with_three_fds.php)）
让 PHP 自己去扫描自己的 `/proc/PID/fd` 文件夹（`fd` 是 File Descriptor 文件描述符的缩写）：
```php
<?php
$pid = posix_getpid();
foreach (scandir("/proc/$pid/fd") as $fd) {
    if ($fd !== '.' && $fd !== '..') {
        echo "肚子里自带的 FD [$fd] ---> 指向: " . @readlink("/proc/$pid/fd/$fd") . "\n";
    }
}
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/01_born_with_three_fds.php
```
#### 终端真实输出：
```text
肚子里自带的 FD [0] ---> 指向: /dev/pts/0
肚子里自带的 FD [1] ---> 指向: /dev/pts/0
肚子里自带的 FD [2] ---> 指向: /dev/pts/0
```
#### 💡 顿悟：
原来任何一个 Linux 进程刚从娘胎出生时，根本不是空手而来的，内核就已经默认给它**插好了三根编号固定的管子**：
- **`0` 号管子 (`STDIN` 标准输入)**：默认插在你的**键盘**上（`/dev/pts/0` 终端输入设备），负责吸收敲击数据；
- **`1` 号管子 (`STDOUT` 标准输出)**：默认插在你的**黑窗口屏幕**上（`/dev/pts/0` 终端输出设备），PHP 里的 `echo` 底层就是 `write(1, ...)`；
- **`2` 号管子 (`STDERR` 标准错误)**：默认**也插在黑窗口屏幕**上！

---

## 🟢 第二幕（关卡 2.2 ~ 2.3）：为什么要有 2 号管子？黑客魔术：隔空往 1 号管子倒水！

### 💬 师徒苏格拉底对话录 1：为什么屏幕要插 `1` 号和 `2` 号两根管子？
- **🤔 导师提问**：
  > “既然 **`1` 号管子（`STDOUT`）** 已经插在屏幕上了，屏幕上都能打印字了，Linux 祖师爷为什么要多此一举，再插一根 **`2` 号管子（`STDERR` 报错输出）** 也连到同一个屏幕上？
  > 如果只有 `1` 号一根管子，平时我们在终端用 `php export_bill.php > 账单.txt` 把输出存进文件时，会发生什么灾难？”
- **🎯 你的思考与回答**：
  > **“我觉得是到时候要有一个能汇总写，同时要有一个 stderr。”**
- **👏 深度复盘（100% 直击要害！）**：
  想象一下：你写了一个脚本 `php 02_stdout_vs_stderr.php > bill.txt` 把结算账单导出发给老板。
  - 如果只有 `1` 号一根管子，那么数据库报的一个小警告 `Warning: 数据库重连中` 就会被一并混进 `bill.txt` 账单文件里，老板看到账单格式彻底坏掉了，当场发飙！
  - 祖师爷把管子分开：**`>` 重定向符默认只把 `1` 号管子（正常输出）导入 `bill.txt`；而 `2` 号管子（报错信息）依然留在屏幕上！** 这样导出的账单干干净净，报错信息也绝不会漏掉！

### 🧪 实验验证（[`02_stdout_vs_stderr.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/02_stdout_vs_stderr.php)）
```php
<?php
fwrite(STDOUT, "账单数据: 充值 +100 元\n"); // 往 1 号管子写
fwrite(STDERR, "⚠️ 警告: 数据库连接稍有波动，请注意！\n"); // 往 2 号管子写
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/02_stdout_vs_stderr.php > d:\Workerman\chapters\chapter02_everything_is_a_file\bill.txt
Get-Content d:\Workerman\chapters\chapter02_everything_is_a_file\bill.txt
```
#### 终端真实输出：
1. 终端屏幕上立即显示：`⚠️ 警告: 数据库连接稍有波动，请注意！`（2 号管子直奔屏幕！）
2. 查看 `bill.txt` 内容，只有干净的：`账单数据: 充值 +100 元`（1 号管子被分流进文件！）

---

### 🧪 关卡 2.3 【内功黑客魔术】：终端只是个文件，隔空往进程的 1 号管子倒水！（[`01b_ghost_terminal.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/01b_ghost_terminal.php)）
既然在 Linux 眼里，屏幕也只是一个文件（比如 `/dev/pts/0`），那我能不能从另一个进程，直接往这个进程的 `/proc/PID/fd/1` 塞一句话？
```php
<?php
$pid = posix_getpid();
echo "我是进程 A (PID: $pid)，1 号管子指向: " . @readlink("/proc/$pid/fd/1") . "\n";
echo "我马上闭嘴睡觉 2 秒钟（不执行任何 echo）...\n";
sleep(2);
echo "\n我是进程 A，我醒了！刚才屏幕上是不是凭空冒出了字？\n";
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl bash -c 'php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/01b_ghost_terminal.php & pid=$!; sleep 0.5; echo "👻 [来自外部进程的幽灵输入]：我直接把数据倒进了你的 1 号管子！" > /proc/$pid/fd/1; wait'
```
#### 终端真实输出：
```text
我是进程 A (PID: 444)！
我的 1 号管子 (STDOUT) 真实连接的硬件屏幕是: pipe:[7152]
我马上要闭嘴睡觉 2 秒钟（这段时间我不会执行任何 echo）...

👻 [来自外部进程的幽灵输入]：我直接把数据倒进了你的 1 号管子！

我是进程 A，我睡醒了，刚才屏幕上是不是凭空冒出了字？
```
> **💥 彻底顿悟**：在 Linux 里，根本没有什么“屏幕”的概念！所谓屏幕就是连接在 `1` 号 FD 上的文件！只要向 `/proc/PID/fd/1` 写入，文字就会当场在那个终端显灵！**一切皆文件！**

---

## 🟢 第三幕（关卡 2.4 ~ 2.5）：号码牌是怎么排队的？“最小可用编号原则”

### 💬 师徒苏格拉底对话录 2：文件编号（FD）的“退座与抢座”
- **🤔 导师提问**：
  > “既然 `0, 1, 2` 已经被占了：
  > 1. 如果我现在用 `$f1 = fopen("a.txt", "w+");` 和 `$f2 = fopen("b.txt", "w+");` 打开两个新文件，它们会拿到几号管子？
  > 2. 如果紧接着我写 `fclose($f1);` 把 `a.txt` 关掉了，然后立刻再写 `$f3 = fopen("c.txt", "w+");` 打开第 3 个文件。**你猜 `$f3` 会分到全新的 5 号，还是捡刚才退座空出来的号码牌？**”
- **🎯 你的思考与回答**：
  > **“f1、f2 应该是 3、4 管子，f3 应该是 3 号管子。”**
- **👏 深度复盘（神级精准推导！）**：
  完全命中！这正是 Linux 内核著名的 **最小可用编号原则（Lowest Available FD）**：
  - 内核维护着一个紧凑的 FD 数组，从 `0` 开始往后扫描，**永远挑当前最小的那个空位发给新打开的文件！**
  - 当你 `fclose($f1)` 时，`3` 号位置瞬间空出；下次 `fopen` 时，内核一眼相中 `3` 号，于是 `c.txt` 抢占了 `3` 号！

### 🧪 实验验证（[`03_lowest_fd_reuse.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/03_lowest_fd_reuse.php)）
```powershell
wsl php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/03_lowest_fd_reuse.php
```
验证结果与你的推导完全吻合！

---

## 🟢 第四幕（关卡 2.6）：句柄泄漏与 `ulimit -n` 天花板

### 1. 什么是句柄泄漏（FD Leak）与 `Too many open files`？
如果程序员只管 `fopen()` 打开文件（或者在网络编程中只管 `accept()` 接受客户端连接），却忘了 `fclose()`，FD 编号就会一路疯涨：`3, 4, 5... 1023`！
为了防止单个 Bug 进程把系统内存吃光，Linux 默认给每个进程设置了最大可打开文件数限制：
```powershell
ulimit -n  # 默认通常是 1024
```
一旦打开第 1024 个文件，系统当场暴毙报错：**`failed to open stream: Too many open files`**！
这也是为什么所有高并发服务器（包括 Workerman 和 Nginx）在生产部署前，第一件事就是把系统的 `ulimit -n` 调大到 100,000 以上！

### 🧪 实验验证（[`05_fd_leak_limit.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/05_fd_leak_limit.php)）
```powershell
wsl php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/05_fd_leak_limit.php
```

---

## 🟢 第五幕（关卡 2.7）：破译 Workerman 的 `resetStd()` 源码

### 💬 师徒苏格拉底对话录 3：守护进程脱离终端后，`echo` 去哪了？
- **🤔 痛点撞墙**：
  当我们的 Workerman 服务器以后在后台以守护进程（`-d`）模式默默运行时，启动它的黑窗口早已关闭销毁。此时原来的 `0, 1, 2` 指向的终端设备彻底不存在了！如果此时代码里写了一句 `echo "Hello"；`，往已经断开的 `1` 号管子吐数据，整个进程会直接崩掉！
  那怎么让代码里原有的成千上万句 `echo`、`var_dump`，不需要做任何修改，就能乖乖流进 `workerman.log` 日志文件里？
- **🎯 你的思考与回答**：
  > **“把 1 号管子直接改成文件指向？”**
- **👏 深度复盘（利用最小可用编号原则偷天换日！）**：
  1. `echo` 永远只认 **`1` 号 FD**（底层就是 `write(1, ...)`）；
  2. 我们先用 `fclose(STDOUT)` 把插在黑窗口上的 `1` 号管子强行拔掉，此时 `1` 号空位腾了出来！
  3. 我们立刻执行 `$log = fopen("workerman.log", "a")`。根据刚才学到的“最小可用编号原则”，内核发现 `1` 号正好空缺，就会把 `workerman.log` 精准分配到 **`1` 号管子**！
  4. 从此以后，所有业务代码里的 `echo`，全部自动重定向流进了 `workerman.log`！

### 🧪 5 行代码见证重定向奇迹（[`04_magic_reset_std.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/04_magic_reset_std.php)）
```php
<?php
fclose(STDOUT); // 1. 关掉 1 号管子
$log = fopen(__DIR__ . "/workerman.log", "w+"); // 2. 日志文件自动抢占 1 号位置

echo "这句普通的 echo，没有出现在屏幕上，而是写进了 workerman.log！\n";
```
#### 📖 Workerman 源码真迹印证
打开原版源码 [`Workerman/src/Worker.php` 第 1494~1525 行 (`resetStd`)](file:///d:/Workerman/workerman-source/src/Worker.php#L1494-L1525)：
```php
public static function resetStd(): void
{
    if (!static::$daemonize || DIRECTORY_SEPARATOR !== '/') {
        return;
    }
    // 1. 关闭 STDOUT (1号)
    if (defined('STDOUT') && is_resource(STDOUT) && get_resource_type(STDOUT) === 'stream') {
        try { @fclose(STDOUT); } catch (Throwable) {}
    }
    // 2. 关闭 STDERR (2号)
    if (defined('STDERR') && is_resource(STDERR) && get_resource_type(STDERR) === 'stream') {
        try { @fclose(STDERR); } catch (Throwable) {}
    }
    // 3. 重新打开 $stdoutFile，精准占领 1 号和 2 号位置！
    $stdOutStream = fopen(static::$stdoutFile, 'a');
    if ($stdOutStream !== false) {
        static::$outputStream = $stdOutStream; // 挂在静态属性上防止被 PHP GC 垃圾回收！
    }
}
```

---

## 🟢 第六幕（关卡 2.8）：读 0 号键盘文件：`fread(STDIN, 1024)` 为什么会让程序卡住不动？

### 🤔 认识阻塞（Blocking I/O）的脾气
现在我们来看 **`0` 号管子 (`STDIN` 标准输入)**。
如果我们执行：
```php
$data = fread(STDIN, 1024);
```
为什么程序停在那里一动不动，既不往下走，也不报错退出？

### 🧪 实验验证（[`04b_stdin_blocking.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/04b_stdin_blocking.php)）
```php
<?php
$pid = posix_getpid();
echo "即将执行: fread(STDIN, 1024)...\n";
$start = microtime(true);

// 阻塞在这里，等待内核缓冲区有数据
$input = fread(STDIN, 1024);

$cost = round(microtime(true) - $start, 3);
echo "🎉 拿到数据: [" . trim($input) . "]，共等待阻塞了 {$cost} 秒！\n";
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl bash -c '(sleep 1; echo "你好，我是键盘输入！") | php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/04b_stdin_blocking.php'
```
#### 终端真实输出：
```text
进程 (PID: 459) 启动，准备从 0 号管子 (STDIN) 读取数据...
当前 0 号管子指向: pipe:[7164]
即将执行: fread(STDIN, 1024)...
🎉 拿到数据: [你好，我是键盘输入！]，共等待阻塞了 0.988 秒！
顿悟：在数据到来前，内核把进程移出 CPU，放入睡眠等待队列（STAT 为 S+，CPU 占用 0.0%）！
```
#### 💡 核心内功推导：
- **阻塞（Blocking）**：你不敲回车，0 号管子里就没有水。内核发现缓冲区为空，就会把进程移出 CPU 运行队列，丢进“睡眠等待队列（`S+` 态）”。**“没拿到数据之前，死也不往下走一步”**！
- 这是我们后续**阶段 3 的键盘事件循环**与**阶段 5 非阻塞（Non-blocking I/O）+ epoll 事件轮询**的最核心伏笔！

---

## 🟢 第七幕（关卡 2.9 ~ 2.10）：多进程并发写日志为什么串了？推导出文件锁 `flock`

### 🤔 痛点撞墙：多进程并发写入的“踩踏与乱序”
在 Workerman 架构中，Master 会 fork 出 4 个 Worker 进程。这 4 个进程如果同时往同一个 `workerman.log` 写日志，或者同时写统计文件 `/tmp/status.txt`：
由于操作系统的 CPU 时间片轮转，进程 A 刚写了半句，时间片到了被切走；进程 B 抢上 CPU 写入另外半句；结果日志文件里的文字全穿插乱套了！甚至造成写入撕裂（Torn Write）！
怎么让多个进程在往同一个文件写数据时，**排好队，一个写完另一个再写**？

### 💡 救星诞生：Linux 文件锁 `flock()`
Linux 内核提供了 `flock` 系统调用（PHP 对应函数 `flock($fp, $operation)`）：
- **`LOCK_EX`（Exclusive Lock，排他锁/独占锁）**：只要我拿到了锁，别的进程谁也别想写，只能在门外排队等待！
- **`LOCK_UN`（Unlock，解锁）**：我写完了，开门放下一个排队的进程进去！
- **`LOCK_NB`（Non-blocking，非阻塞尝试）**：如果锁被人占了，我不要排队傻等，立刻返回 `false` 告诉我！

### 🧪 实验验证（[`06_flock_concurrency.php`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/06_flock_concurrency.php)）
```php
<?php
// 父子进程并发写日志，用 flock(LOCK_EX) 确保不穿插
$fp = fopen("test.log", "a+");
flock($fp, LOCK_EX); // 抢占独占锁
fwrite($fp, "进程 " . posix_getpid() . " 正在安全写入...\n");
flock($fp, LOCK_UN); // 释放锁
fclose($fp);
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter02_everything_is_a_file/06_flock_concurrency.php
```
#### 终端真实输出：
```text
=== 1. 验证文件独占锁 flock(LOCK_EX) 的排队保护 ===
[父进程 290] 尝试获取独占锁 (LOCK_EX)...
[父进程 290] 🔒 抢锁成功！开始写数据并保持持锁 1 秒...
  [子进程 403] 也来写日志，尝试获取锁...
[父进程 290] 🔓 释放锁 (LOCK_UN)
  [子进程 403] 终于排队等到了锁！(被阻塞挂起了 0.9 秒)

=== 最终日志文件内容 ===
===== 父进程开始写入 =====
===== 父进程写入完毕 =====
---- 子进程安全追加的一行 ----

=== 2. Workerman 源码精髓：非阻塞排他锁 LOCK_NB 实现单例启动 ===
第 1 次加锁 (Master 启动): ✅ 成功 (自己是唯一主进程)
第 2 次加锁 (另一个进程试图重复启动): ❌ 失败 (检测到已有 Master 在运行，立即报错退出！)
```

### 📖 Workerman 源码真迹印证
打开原版源码 [`Workerman/src/Worker.php` 第 843~862 行 (`lock`)](file:///d:/Workerman/workerman-source/src/Worker.php#L843-L862) 与 [第 2393 行 (`log`)](file:///d:/Workerman/workerman-source/src/Worker.php#L2393)：
```php
// 1. Worker::lock() 单例 Master 运行保护 (第 843 行)
protected static function lock(int $flag = LOCK_EX): void
{
    static $fd;
    if (DIRECTORY_SEPARATOR !== '/') {
        return;
    }
    $lockFile = static::$pidFile . '.lock';
    $fd = $fd ?: fopen($lockFile, 'a+');
    if ($fd) {
        flock($fd, $flag); // 用 flock 独占锁保证全系统只有一个 Master 主进程！
        if ($flag === LOCK_UN) {
            fclose($fd);
            $fd = null;
            if (is_file($lockFile)) {
                unlink($lockFile);
            }
        }
    }
}

// 2. Worker::log() 多 Worker 进程并发安全写入日志 (第 2393 行)
file_put_contents(static::$logFile, sprintf("%s pid:%d %s\n", date('Y-m-d H:i:s'), $pid, $msg), FILE_APPEND | LOCK_EX);
```
> **💡 大师源码神细节**：
> 1. Workerman 为什么在启动 Master 时要用 `Worker::lock()` 锁住 `workerman.pid.lock`？就是为了防止运维粗心，重复敲了两次 `php start.php start` 启动了两个 Master 造成冲突！
> 2. `file_put_contents` 自带的第三个参数 `FILE_APPEND | LOCK_EX`，底层调用的正是 `flock($fp, LOCK_EX)`！确保几百个 Worker 进程并发写入日志时分秒不乱！

---

## 🗂️ 本章总结与内功沉淀

在本章中，我们彻底打通了 Linux“一切皆文件”的核心内功：
1. **0, 1, 2 号文件描述符**：键盘(`0`)、屏幕输出(`1`)、屏幕报错(`2`)；
2. **最小可用编号原则**：掌握了内核的号码牌复用机制，破解了 Workerman `resetStd()` 重定向黑魔法；
3. **阻塞 I/O 的本质**：0 号文件没数据时进程睡眠（`S+` 态）；
4. **文件锁 `flock`**：掌握了 `LOCK_EX` 排队写入与 `LOCK_NB` 单例 Master 保护机制！
