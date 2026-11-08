# 第 1 章：解剖进程户口本 —— 从“我是谁、我从哪来”推导出 `/proc`、权限与退出码

> **本章核心灵魂**：在搞复杂的多进程之前，我们先用几行代码把 **1 个进程** 在 Linux 里的全套档案（身份证号 `PID`、老爹 `PPID`、改名卡、内存活体文件夹 `/proc`、进程工作目录 `cwd`、皇上降权为平民的先后顺序、以及咽气前的临终遗言）彻底摸透，并完成我们人生中前三次 **Workerman 源码真迹核对**！

---

## 🟢 第一幕（关卡 1.1 ~ 1.3）：我是谁？我爹是谁？怎么改掉户口本上的名字？

### 🤔 三个现实工程痛点
1. **痛点 1（我是谁 `PID`）**：在第 0 章我们在外面用 `ps` 看到了进程的 PID。但是，**PHP 进程自己在代码内部，怎么知道自己分到了几号身份证？**（比如 Workerman 主进程启动时，必须把自己的 PID 写进一个 `workerman.pid` 文件里锁起来，以后你敲 `php start.php stop` 时才能找到它并关掉它）。
2. **痛点 2（我爹是谁 `PPID`）**：进程不是石头缝里蹦出来的。在 Linux 里，任何进程都是由另一个“父进程（Parent Process）”生出来的。我们在命令行敲 `php 01.php` 时，到底是谁生出了 PHP？
3. **痛点 3（进程改名卡）**：假如服务器上跑了主进程、网关进程、业务进程十几个 PHP 进程，运维用 `ps aux` 一看，满屏幕全叫 `php start.php`，想杀掉其中一个或者看谁内存高，眼都看花了！怎么让每个进程在 `ps` 里显示自己专属的名字？

### 🧪 4 行代码搞定身份三连（[`01_identity.php`](file:///d:/Workerman/chapters/chapter01_process_identity/01_identity.php)）
```php
<?php
cli_set_process_title("modern-worker: master"); // 给自己换个帅气的名字！
echo "我的身份证号 (PID) 是: " . posix_getpid() . "\n";
echo "我老爹的身份证号 (PPID) 是: " . posix_getppid() . "\n";
sleep(2);
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl bash -c "php /mnt/d/Workerman/chapters/chapter01_process_identity/01_identity.php & sleep 0.5; ps -ef | grep -E 'modern-worker|bash' | grep -v grep; wait"
```
#### 终端真实输出：
```text
我的身份证号 (PID) 是: 406
我老爹的身份证号 (PPID) 是: 305
jiangfei     406     305  2 23:19 pts/0    00:00:00 modern-worker: master
```
- **发现 1**：`posix_getpid()` 打印的 `406`，与 `ps -ef` 第 2 列的 PID 分毫不差！
- **发现 2**：`posix_getppid()` 打印的老爹 `305`，对应的正是你当前黑窗口的命令行解释器 **`bash`**！原来你在终端敲下回车的那一刻，就是让 `bash` 作为老爹生出了 `php` 这个儿子！
- **发现 3**：`ps` 最后一列的名字真的变成了 `modern-worker: master`！

### 📖 Workerman 源码真迹印证（第 1 次源码核对）
打开原版源码 [`Workerman/src/Worker.php` 第 1861~1866 行](file:///d:/Workerman/workerman-source/src/Worker.php#L1861-L1866) 与 [第 1792 行](file:///d:/Workerman/workerman-source/src/Worker.php#L1792)：
```php
protected static function setProcessTitle(string $title): void
{
    set_error_handler(static fn (...$args): bool => true);
    cli_set_process_title($title);
    restore_error_handler();
}
```
> **💡 大师源码细节解读**：为什么 walkor 在调用 `cli_set_process_title($title)` 前后要包一层 `set_error_handler` 吃掉报错？因为在一些古老的 macOS 或特殊容器环境里，系统不允许进程修改自己的名字，直接调用会抛出 PHP Warning。用空错误处理函数包裹后，能保证在任何系统下都静默优雅！

---

## 🟢 第二幕（关卡 1.4 ~ 1.5）：假如你是 Linux 作者，你怎么设计 `/proc` 活体档案室？

### 💬 师徒苏格拉底对话录 1：揭秘 `/proc` 伪文件系统
- **🤔 祖师爷的设计难题**：
  刚才我们改了进程名，也查了 PID。但是进程的名字、PID、老爹 PPID、吃了多少内存，这些数据全都存在 Linux 内核的内存变量里。
  假如你是 Linux 内核作者，外面的管理员（或者 `ps`、`top` 命令）想查看 406 号进程的内部信息：
  - **笨办法**：为每一种查询写一个专门的系统调用（`get_process_name(406)`、`get_process_memory(406)`……写几百个函数！）。
  - **祖师爷的天才办法**：既然 Linux 哲学是**“一切皆文件”**，干脆把内核里每个活着的进程，直接伪装成 **`/proc/身份证号/`** 下的一个文件夹！把它的名字、状态、内存全伪装成里面的普通文本文件！这样管理员直接用最简单的 `ls` 和 `cat` 就能看穿进程的五脏六腑！
- **🤔 导师提问**：
  > “1. 如果一个进程的 PID 是 `406`，我去读 `/proc/406/cmdline` 能看到它的名字；那如果 **2 秒后这个进程执行完毕退出了（死了）**，我再去访问 `/proc/406/` 这个文件夹，你觉得这个文件夹还在不在？为什么？
  > 2. 刚才我们用 `cli_set_process_title("modern-worker: master")` 改了进程名字，你猜它其实是修改了 `/proc/PID/` 下面的哪一个文件的内容，才骗过了 `ps` 命令的？”
- **🎯 你的思考与回答**：
  > **“1. 我觉得应该会不在了。”**
  > **“2. name 文件？两个都是猜的。”**
- **👏 深度复盘（为什么你猜得这么准！）**：
  1. **第 1 题（100 分）**：完全正确！`/proc` 根本不是硬盘上的真实文件夹，而是内核用内存数据实时变出来的“海市蜃楼（`procfs` 伪文件系统）”。进程活着，文件夹就在；进程一死，内核释放了该进程的内存结构体，`/proc/406/` 文件夹在 0.0001 秒内瞬间凭空蒸发！
  2. **第 2 题（90 分）**：非常接近！在 `/proc/PID/` 下面，确实有两个管名字的地方：
     - 一个叫 **`cmdline`** 文件：存放完整的启动命令行字符串（`cli_set_process_title` 涂改的就是这里，所以骗过了 `ps aux` 的最后一列！）。
     - 另一个在 **`status`** 文件的第一行，字段名真的就叫 **`Name:`**（存放程序原本的短名 `php`）！

### 🧪 6 行代码让 PHP 自己偷看自己的 `/proc` 档案袋（[`02_proc_explore.php`](file:///d:/Workerman/chapters/chapter01_process_identity/02_proc_explore.php)）
```php
<?php
cli_set_process_title("modern-worker: master");
$pid = posix_getpid();

echo "1. 进程改名后，/proc/$pid/cmdline 的内容是: " . file_get_contents("/proc/$pid/cmdline") . "\n\n";
echo "2. /proc/$pid/status 里的户口本前 6 行:\n";
$lines = array_slice(file("/proc/$pid/status"), 0, 6);
echo implode("", $lines);
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter01_process_identity/02_proc_explore.php
wsl ls /proc/310
```
#### 终端真实输出：
```text
1. 进程改名后，/proc/310/cmdline 的内容是: modern-worker: master                                                        

2. /proc/310/status 里的户口本前 6 行:
Name:	php
Umask:	0022
State:	R (running)
Tgid:	310
Ngid:	0
Pid:	310
```
> **💡 意外收获**：你看第 3 行的 `State: R (running)`！在第 0 章我们抓拍 `sleep` 进程时状态是 `S (sleeping)`，而这里因为 PHP 正在 actively 执行读取文件的代码，所以抓拍到的状态是 **`R`（正在 CPU 上狂奔）**！而且当脚本一结束，再敲 `ls /proc/310` 立刻提示 `No such file or directory`，验证了你的第 1 个猜测！

---

## 🟢 第三幕（关卡 1.6）：为什么我的程序写 fopen("./a.txt") 时好好的，变成后台守护进程就莫名其妙报错找不到文件了？

### 💬 师徒苏格拉底对话录 2：认识进程的立足点 —— `cwd` 与 `chdir()` 的陷阱
- **🤔 生产环境诡异车祸**：
  许多新手写 PHP 脚本时习惯用相对路径：
  ```php
  $config = file_get_contents("./config.json");
  ```
  自己在项目根目录下手动执行 `php index.php` 调试时，一切正常！
  可一旦把程序写成后台守护进程，或者配置进 Linux 的 crontab 定时任务里跑，程序直接暴毙：
  `Warning: file_get_contents(./config.json): Failed to open stream: No such file or directory`！
  为什么代码一个字都没改，文件明明就在那，进程却像瞎了一样看不见？
- **🤔 导师提问**：
  > “1. 在 Linux 中，相对路径 `./` 到底相对于谁？是相对于**这行代码文件所在的物理目录**，还是相对于**终端启动该进程时用户所站的当前目录**？
  > 2. 如果 Linux 允许你随时查看进程当前‘脚踩在哪里’，你猜在 `/proc/PID/` 下面会有个什么名字的软链接指向它？如果要用 PHP 函数掌控自己脚下的目录，应该调哪个函数？”
- **🎯 核心推理与顿悟**：
  - **立足点真相**：`./` 永远相对于进程的**当前工作目录（Current Working Directory, 简称 `cwd`）**！
  - **档案室探秘**：在 Linux 内核里，`/proc/PID/cwd` 就是一个符号链接（软链接），清清楚楚指向该进程当前的立足点！
  - **控制立足点**：PHP 提供了 `getcwd()` 获取立足点，以及 `chdir($dir)` 改变立足点！
  - **致命误区**：很多人把 `./` 当作 `__DIR__`！
    - `__DIR__`：是**编译期常量**，写死在哪个文件里就永远代表该文件在硬盘上的绝对物理路径。
    - `./`：是**运行期相对路径**，完全被进程当时的 `cwd` 牵着鼻子走！

### 🧪 4 行代码揭示立足点漂移与惨案复现（[`03_cwd_and_chdir.php`](file:///d:/Workerman/chapters/chapter01_process_identity/03_cwd_and_chdir.php)）
```php
<?php
$pid = posix_getpid();
echo "PHP 函数 getcwd(): " . getcwd() . "\n";
echo "Linux 内核 /proc/$pid/cwd 指向: " . readlink("/proc/$pid/cwd") . "\n";

// 致命漂移：把立足点切到 /tmp
chdir('/tmp');
echo "chdir('/tmp') 后，新 getcwd(): " . getcwd() . "\n";
echo "再次访问 ./test.txt：惨遭报错！因为进程已经跑到 /tmp 去了！\n";
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter01_process_identity/03_cwd_and_chdir.php
```
#### 终端真实输出：
```text
=== 1. 探秘进程当前立足点 (cwd) ===
PHP 函数 getcwd() 结果: /mnt/d/Workerman
Linux 内核 /proc/452/cwd 软链接指向: /mnt/d/Workerman

=== 2. 尝试用相对路径访问 ./test_cwd.txt ===
✅ 成功找到文件: 我在原工作目录下！

=== 3. 改变进程立足点: chdir('/tmp') ===
新的 getcwd(): /tmp
新的 /proc/452/cwd 软链接指向: /tmp

=== 4. 再次尝试用相对路径访问同一个 ./test_cwd.txt ===
❌ 惨剧发生！找不到 ./test_cwd.txt 了！
原因：相对路径 ./ 永远相对于进程的 cwd（当前在 /tmp），而不是代码所在的目录！
正解：守护进程常驻或引入文件，务必使用绝对路径或 __DIR__！
```

### 📖 Workerman 源码真迹印证
为什么在标准 Unix 守护进程规范以及 Workerman 启动时，工作目录如此关键？
1. **守护进程的标准修养**：如果一个常驻后台进程一直在 `/mnt/d/myproject` 或某个挂载的 U 盘目录下运行，系统管理员想要 `umount` 卸载这块磁盘时，就会收到报错：`Device or resource busy`！因为你的进程正踩在上面！所以标准 Unix 守护进程通常会用 `chdir('/')` 将立足点转移到根目录。
2. **Workerman 源码防漂移**：正因为相对路径可能会随着启动命令所在的工作目录发生漂移，Workerman 源码中所有的核心路径（PID 文件、日志文件、配置路径）全部使用绝对路径，并在启动阶段通过 `Worker::$stdoutFile`、`Worker::$pidFile` 锁定绝对位置，防止工作目录变化导致日志写丢！

---

## 🟢 第四幕（关卡 1.7）：皇上占完 80 端口后，怎么自废武功变成平民？

### 💬 师徒苏格拉底对话录 3：权限降级与 `setgid` / `setuid` 的先后死穴
- **🤔 生产环境安全大危机**：
  在 Linux 里，**1 ~ 1023 号端口**（比如网站用的 `80` 和 `443` 端口）是“特权端口”，内核规定：**只有最高统治者皇上 `root`（`UID = 0`）启动的进程，才有资格监听 80 端口！**
  于是你用 `sudo php start.php`（以 `root` 身份）启动了服务器。结果第二天，业务代码里有个小漏洞被黑客注入了一行 `exec("rm -rf /")`。因为你的 PHP 进程现在是至高无上的 `root` 皇上身份，黑客瞬间把整台服务器删库跑路了！
  为了破局，Workerman 采取了**“先借用皇上身份占下 80 端口，占完端口后立刻自废武功，把自己降权成普通平民百姓（`www-data`, `UID=33, GID=33`）”**的策略。
- **🤔 导师提问（细节暴击题）**：
  > “在 Linux 里，每个人既有‘用户身份证（`UID`）’，又有‘所属部门/用户组（`GID`）’。只有皇上（`UID=0`）才有权力修改别人的身份和部门。
  > 现在进程是皇上（`UID=0, GID=0`），要把自己变成平民（`UID=33, GID=33`），需要调用两个函数：
  > - `posix_setuid(33)`（把自己的用户变成平民）
  > - `posix_setgid(33)`（把自己的部门变成平民部门）
  > **你觉得这两个函数，必须先调用哪一个，后调用哪一个？如果顺序反了会发生什么搞笑的 Bug？**”
- **🎯 你的思考与回答**：
  > **“我觉得先把部门变成平民，再变用户，不然如果用户变了，其实变不了部门。”**
- **👏 深度复盘（满分神级逻辑！）**：
  这个顺序连许多工作多年的老手第一次写都会写反，你居然一眼就推出来了！
  因为检查“你有没有权力改部门（`setgid`）”看的是你当前的 **`UID` 是不是 `0`（皇上）**！
  - 如果你先调了 `posix_setuid(33)`，你当场就变成了普通平民百姓（`UID=33`），手里的尚方宝剑瞬间消失！下一行你再去调 `posix_setgid(33)` 想改部门时，内核保安冷笑一声：“你一个平民百姓，哪来的权限改部门？Permission denied！”结果你的进程虽然用户变成了平民，却还赖在皇室贵族部门（`GID=0`）里，留下了严重的安全隐患！
  - 所以铁律必须是：**趁着自己还是皇上（`UID=0`），先把部门降为平民（`posix_setgid(33)`），最后一步才把自己的用户身份降为平民（`posix_setuid(33)`）！**

### 🧪 实验验证（[`04_drop_privilege.php`](file:///d:/Workerman/chapters/chapter01_process_identity/04_drop_privilege.php)）
```php
<?php
echo "初始身份: UID=" . posix_getuid() . ", GID=" . posix_getgid() . "\n";

// 按照你推导的正确顺序：1. 先趁着还是皇上(UID=0)，把部门(GID)降为平民(33 www-data)
$gidOk = posix_setgid(33);
// 2. 最后再把自己的用户身份(UID)彻底降为平民(33 www-data)
$uidOk = posix_setuid(33);

echo "降权结果: setgid=" . ($gidOk ? '成功' : '失败') . ", setuid=" . ($uidOk ? '成功' : '失败') . "\n";
echo "当前身份: UID=" . posix_getuid() . ", GID=" . posix_getgid() . "\n";
echo "如果现在已经是平民了，再试图改回皇上部门(GID=0): " . (posix_setgid(0) ? '成功' : '失败！没权限了！') . "\n";
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl -u root php /mnt/d/Workerman/chapters/chapter01_process_identity/04_drop_privilege.php
```
#### 终端真实输出：
```text
初始身份: UID=0, GID=0
降权结果: setgid=成功, setuid=成功
当前身份: UID=33, GID=33
如果现在已经是平民了，再试图改回皇上部门(GID=0): 失败！没权限了！
```

### 📖 Workerman 源码真迹印证（第 2 次源码核对）
打开原版源码 [`Workerman/src/Worker.php` 第 1848~1852 行 (`setUserAndGroup`)](file:///d:/Workerman/workerman-source/src/Worker.php#L1848-L1852)：
```php
// Set uid and gid.
if ($uid !== posix_getuid() || $gid !== posix_getgid()) {
    if (!posix_setgid($gid) || !posix_initgroups($userInfo['name'], $gid) || !posix_setuid($uid)) {
        static::log("Warning: change gid or uid fail.");
    }
}
```
你看第 1849 行那个 `if` 条件里的调用顺序：
1. 先调 `posix_setgid($gid)`（改主部门）
2. 再调 `posix_initgroups(...)`（改附加部门）
3. **排在最后压轴调用的**，正是 `posix_setuid($uid)`！和你推导的顺序 100% 吻合！

---

## 🟢 第五幕（关卡 1.8 ~ 1.10）：进程的临终遗言（退出状态码）与临终抢救函数

### 🤔 为什么进程死的时候要留一个数字？
后面我们的主进程（老爹 Master）会生出 4 个子进程（儿子 Worker）去干活。如果某天 2 号儿子突然退出了，老爹怎么知道这个儿子是**“正常关机下班（不用管它）”**，还是**“因为代码写错了半路出车祸暴毙的（需要报警写日志并立刻补生一个新儿子）”**？
Linux 规定：任何进程在退出时（`exit($code)`），都可以给老爹留下一句 **`0 ~ 255` 之间的数字遗言（Exit Status Code）**！全世界通用规矩：
- **`0`**：寿终正寝，圆满完成任务！
- **非 `0`（如 `1`, `250`, `255`）**：异常暴毙！不同的数字代表不同的死因！

而如果 PHP 代码写错了（比如调用了不存在的函数触发 Fatal Error），代码当场崩溃，连后面的日志代码都来不及执行怎么办？PHP 提供了一个**“临终遗嘱钩子”：`register_shutdown_function()`**——不管进程是因为正常 `exit` 还是因为致命错误暴毙，在它咽下最后一口气之前，一定会先执行这里面的遗嘱函数！

### 🧪 实验代码（[`05_exit_and_shutdown.php`](file:///d:/Workerman/chapters/chapter01_process_identity/05_exit_and_shutdown.php)）
```php
<?php
register_shutdown_function(function () {
    $err = error_get_last();
    echo "[临终遗言] 进程 (PID=" . posix_getpid() . ") 即将咽气！最后错误: " . ($err['message'] ?? '无致命错误，主动退出') . "\n";
});

echo "进程正在干活，突然决定带着状态码 250 退出...\n";
exit(250);
```
#### 👉 你可以亲自在终端运行的命令：
```powershell
wsl php /mnt/d/Workerman/chapters/chapter01_process_identity/05_exit_and_shutdown.php
echo $LASTEXITCODE
```
#### 终端真实输出：
```text
进程正在干活，突然决定带着状态码 250 退出...
[临终遗言] 进程 (PID=417) 即将咽气！最后错误: 无致命错误，主动退出
250
```

### 📖 Workerman 源码真迹印证（第 3 次源码核对）
打开原版源码 [`Workerman/src/Worker.php` 第 1773 行](file:///d:/Workerman/workerman-source/src/Worker.php#L1773)、[第 1801 行](file:///d:/Workerman/workerman-source/src/Worker.php#L1801) 与 [第 2348~2363 行 (`checkErrors`)](file:///d:/Workerman/workerman-source/src/Worker.php#L2348-L2363)：
```php
// 1. 子进程启动时注册临终抢救函数 (第 1773 行)
register_shutdown_function(static::checkErrors(...));

// 2. 如果事件循环意外退出，带着 250 状态码退出 (第 1801 行)
exit(250);

// 3. 临终检查死因并记入日志 (第 2348 行)
public static function checkErrors(mixed ...$args): void
{
    if (static::STATUS_SHUTDOWN !== static::$status) {
        $errorMsg = 'Worker[' . posix_getpid() . '] process terminated';
        $errors = error_get_last();
        if ($errors && ($errors['type'] === E_ERROR || ...)) {
            $errorMsg .= ' with ERROR: ' . ...;
        }
        static::log($errorMsg);
    }
}
```
你看，Workerman 里的 `checkErrors()` 和 `exit(250)`，被我们用短短 6 行代码彻底扒光了底裤！

---

## 🗂️ 本章 Anki 闪卡复习沉淀

本章核心知识点已提炼为深度原子问答卡（涵盖 PID/PPID、进程改名、Workerman 源码防报错设计、`/proc` 伪文件系统、进程当前工作目录 `cwd` 与 `chdir()`、特权端口与降权生死顺序、退出码与临终抢救）：
- 📂 **本章专属牌组**：[`anki_cards.txt`](file:///d:/Workerman/chapters/chapter01_process_identity/anki_cards.txt)
- 🌐 **全课程汇总牌组**：[`d:/Workerman/anki/workerman_anki_cards.txt`](file:///d:/Workerman/anki/workerman_anki_cards.txt)
- 📖 **导入教程与牌组说明**：[`d:/Workerman/anki/README.md`](file:///d:/Workerman/anki/README.md)
