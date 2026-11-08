# -*- coding: utf-8 -*-
"""
Workerman & Linux 系统编程 - Anki 闪卡生成器
用于将课程中的知识点自动编译为可以直接导入 Anki 的标准化制表符分隔文本（TSV）。
"""

import os
import sys

CARDS = [
    # =========================================================================
    # 第 0 章：基地点火 —— 系统调用与进程 (Chapter 00)
    # =========================================================================
    {
        "id": "KP-00-01",
        "chapter": "Chapter00",
        "front": "【Linux 架构内功】为什么操作系统严禁应用程序（如 PHP、Python、Nginx）直接操作显卡、物理内存条等硬件？如何进行权限划分？",
        "back": (
            "<b>1. 根本原因</b>：<br>"
            "防止程序意外或恶意覆盖物理内存、越权窥探其他进程数据（如微信记录或银行密码）或损坏硬件设备。<br><br>"
            "<b>2. 权限划分</b>：<br>"
            "• <b>用户态（User Space）</b>：普通程序运行的受限安全房间，绝对禁止直接触碰硬件和执行特权指令；<br>"
            "• <b>内核态（Kernel Space）</b>：操作系统内核独占的特权区域，全权管理所有硬件资源（CPU 调度、显卡、网卡、物理内存分配）。"
        ),
        "tags": ["Linux基础", "内核架构", "用户态与内核态", "Chapter00"]
    },
    {
        "id": "KP-00-02",
        "chapter": "Chapter00",
        "front": "【Linux 架构内功】什么是“系统调用（System Call，简称 Syscall）”？为什么 PHP 的 <code>echo &quot;Hello\\n&quot;;</code> 本身根本不会点亮显示器？",
        "back": (
            "<b>1. 系统调用的本质</b>：<br>"
            "系统调用是<b>用户态程序请求内核代为执行特权操作的受控入口（API / 办事申请单）</b>。<br><br>"
            "<b>2. echo 的底层真相</b>：<br>"
            "用户态的 PHP 没有任何权限直接操作显卡硬件。当执行 <code>echo</code> 时，PHP 只是在向内核递交一张叫 <code>write</code> 的申请表（触发系统调用切入内核态），由内核保安代为将字符推向终端屏幕并点亮像素。"
        ),
        "tags": ["Linux基础", "系统调用", "Syscall", "echo", "write", "Chapter00"]
    },
    {
        "id": "KP-00-03",
        "chapter": "Chapter00",
        "front": "【Linux 性能内功】为什么纯算术计算（如 <code>$a = 1 + 1;</code> 或 10,000 次 for 循环累加）不会触发任何系统调用？",
        "back": (
            "<b>1. 计算位置</b>：<br>"
            "纯算术计算是在当前分配给进程的 <b>CPU 通用算术寄存器（如 RAX/RBX）</b> 与进程自身私有内存中完成的。<br><br>"
            "<b>2. 为什么不用找内核</b>：<br>"
            "CPU 寄存器是进程私有的“草稿纸”，即使算错也绝不会伤害其他进程或破坏系统硬件；<br><br>"
            "<b>3. 性能收益</b>：<br>"
            "避免了从用户态切换到内核态的高昂特权级上下文切换（Context Switch）开销，执行速度极快（纳秒级）。"
        ),
        "tags": ["Linux性能", "CPU寄存器", "系统调用开销", "Chapter00"]
    },
    {
        "id": "KP-00-04",
        "chapter": "Chapter00",
        "front": "【Linux 调试神器】如何用 <code>strace</code> 命令透视 PHP 脚本底层的系统调用？如何仅过滤追踪指定的系统调用（如 write 和 nanosleep）？",
        "back": (
            "<b>1. 基本透视命令</b>：<br>"
            "<code>strace php script.php</code><br><br>"
            "<b>2. 过滤特定系统调用（强烈推荐，避免噪音）</b>：<br>"
            "<code>strace -e trace=write,clock_nanosleep php script.php</code><br><br>"
            "<b>3. 作用</b>：<br>"
            "能够抓捕进程向 Linux 内核递交的一切“办事申请表”，是底层性能分析与疑难排障的第一神器。"
        ),
        "tags": ["Linux命令", "调试排障", "strace", "Chapter00"]
    },
    {
        "id": "KP-00-05",
        "chapter": "Chapter00",
        "front": "【Linux 底层拆解】解读在 <code>strace</code> 中捕获的系统调用：<br><code>write(1, &quot;Hello Linux!\\n&quot;, 13) = 13</code> 各参数与返回值代表什么？",
        "back": (
            "• <code>write(...)</code>：Linux 内核提供的写文件/管道/设备系统调用接口；<br>"
            "• <code>1</code>：目标文件描述符 FD（1 号代表标准输出 <code>STDOUT</code>，默认指向当前终端屏幕）；<br>"
            "• <code>&quot;Hello Linux!\\n&quot;</code>：待写入的实际字符数据；<br>"
            "• <code>13</code>：请求写入的字节长度（包含末尾的换行符 <code>\\n</code>）；<br>"
            "• <code>= 13</code>：内核返回结果，表示成功写入了 13 个字节。"
        ),
        "tags": ["Linux底层", "系统调用", "write", "文件描述符", "Chapter00"]
    },
    {
        "id": "KP-00-06",
        "chapter": "Chapter00",
        "front": "【操作系统生命周期】硬盘上的静态代码文件（Program）与内存中的活体进程（Process）有何本质区别？",
        "back": (
            "<b>1. 程序（Program）</b>：<br>"
            "躺在硬盘上的静态二进制文件或脚本文本，是“施工图纸”，不消耗 CPU 与内存，没有生命周期；<br><br>"
            "<b>2. 进程（Process）</b>：<br>"
            "被操作系统加载进内存中、被分配了独立 PID、内存地址空间、文件描述符表等资源的“活体执行打工人”；<br><br>"
            "<b>3. 现象</b>：<br>"
            "如果脚本几毫秒就执行完毕退出，进程即被内核销毁，在 <code>ps</code> 列表中将瞬间找不到。"
        ),
        "tags": ["Linux概念", "进程与程序", "生命周期", "Chapter00"]
    },
    {
        "id": "KP-00-07",
        "chapter": "Chapter00",
        "front": "【Linux 调度内功】正在执行 <code>sleep(60);</code> 的进程会消耗 CPU 算力吗？为什么？在 <code>ps aux</code> 中其状态（STAT）是什么？",
        "back": (
            "<b>1. CPU 占用率</b>：<br>"
            "<b>0.0%</b>，完全不消耗任何 CPU 算力。<br><br>"
            "<b>2. 内核行为</b>：<br>"
            "调用 <code>clock_nanosleep</code> 后，内核将该进程移出 CPU 调度队列，放入<b>睡眠等待队列（Wait Queue）</b>挂起，直至定时器到期才重新调度唤醒；<br><br>"
            "<b>3. 状态标识（STAT 列）</b>：<br>"
            "显示为 <b><code>S</code>（Sleeping，可中断睡眠态）</b>，而非 <code>R</code>（Running，正在运行或就绪运行）。"
        ),
        "tags": ["Linux调度", "sleep", "进程状态", "ps", "Chapter00"]
    },
    {
        "id": "KP-00-08",
        "chapter": "Chapter00",
        "front": "【Linux 进程管理】如果同时在终端运行 3 个一模一样的 <code>php worker.php</code>，内核保安如何区分它们？",
        "back": (
            "<b>机制</b>：<br>"
            "通过分配全系统唯一的正整数身份证号 —— <b>PID（Process ID，进程标识符）</b>。<br><br>"
            "<b>作用</b>：<br>"
            "即使多个进程的命令名、源代码、执行用户完全一致，内核调度器、信号机制（如 <code>kill -9 $PID</code>）以及运维人员均依靠唯一的 PID 进行精准控制与跟踪。"
        ),
        "tags": ["Linux基础", "进程管理", "PID", "Chapter00"]
    },

    # =========================================================================
    # 第 1 章：解剖进程户口本 —— PID, PPID, 改名, /proc, 权限降级, 退出码 (Chapter 01)
    # =========================================================================
    {
        "id": "KP-01-01",
        "chapter": "Chapter01",
        "front": "【Linux 进程身份】PHP 进程自身如何在代码中获取自己的 PID 和父进程 PPID？在命令行直接敲 <code>php script.php</code> 时，父进程通常是谁？",
        "back": (
            "<b>1. 获取自身 PID</b>：<br>"
            "<code>posix_getpid()</code>（底层触发 <code>getpid()</code> 系统调用）；<br><br>"
            "<b>2. 获取父进程 PPID</b>：<br>"
            "<code>posix_getppid()</code>（底层触发 <code>getppid()</code> 系统调用）；<br><br>"
            "<b>3. 终端命令行下的老爹</b>：<br>"
            "通常是当前终端的命令行解释器（如 <b><code>bash</code> 或 <code>zsh</code></b>）。敲下回车即命令 bash 派生（fork）出子进程去运行 php。"
        ),
        "tags": ["Linux基础", "进程身份", "PID", "PPID", "posix扩展", "Chapter01"]
    },
    {
        "id": "KP-01-02",
        "chapter": "Chapter01",
        "front": "【Workerman 运维工程】为什么高并发常驻多进程服务（如 Workerman）启动时一定要修改进程名称？PHP 使用什么函数？",
        "back": (
            "<b>1. 修改原因</b>：<br>"
            "避免在 <code>ps aux</code>、<code>top</code> 中所有子进程全叫毫无辨识度的 <code>php start.php</code>。改名后运维能一眼分辨出 <b>Master 监控主进程、Gateway 网关进程、BusinessWorker 业务进程</b>，方便故障排查与精确定向重启；<br><br>"
            "<b>2. PHP 函数</b>：<br>"
            "<code>cli_set_process_title(&quot;modern-worker: master&quot;);</code>"
        ),
        "tags": ["Workerman", "进程改名", "cli_set_process_title", "运维排障", "Chapter01"]
    },
    {
        "id": "KP-01-03",
        "chapter": "Chapter01",
        "front": "【Workerman 源码精读】Workerman 在调用 <code>cli_set_process_title</code> 时，为什么必须用 <code>set_error_handler</code> 把它包裹起来？<br><code>set_error_handler(static fn (...$args): bool => true);<br>cli_set_process_title($title);<br>restore_error_handler();</code>",
        "back": (
            "<b>1. 根本原因</b>：<br>"
            "在某些旧版 macOS、特殊的无特权 Docker 容器或特定宿主环境下，系统内核限制普通进程覆写 <code>cmdline</code> 内存区，调用 <code>cli_set_process_title()</code> 会直接抛出 PHP Warning 警告；<br><br>"
            "<b>2. 框架设计哲学</b>：<br>"
            "进程改名属于辅助展示功能，绝不能因为系统不支持而导致整个服务器启动崩溃。通过注册一个吞掉报错的匿名错误处理器，保证框架在任何极端环境下都能静默优雅降级。"
        ),
        "tags": ["Workerman源码", "setProcessTitle", "容错设计", "Chapter01"]
    },
    {
        "id": "KP-01-04",
        "chapter": "Chapter01",
        "front": "【Linux 设计哲学】Linux 的 <code>/proc</code> 目录到底存放在哪块物理硬盘上？为什么被称为“海市蜃楼（伪文件系统 procfs）”？",
        "back": (
            "<b>1. 存储位置</b>：<br>"
            "<b>完全不在任何硬盘上！它只存在于内核内存中（procfs）</b>。<br><br>"
            "<b>2. 设计哲学（一切皆文件）</b>：<br>"
            "为了让管理员无需专门编写一套专有调试 API，Linux 将内核中的进程控制块（PCB）、内存占用、打开的文件描述符等数据，动态投射为文件夹与文本文件。用最普通的 <code>cat</code> 和 <code>ls</code> 即可看穿进程内部；<br><br>"
            "<b>3. 动态特性</b>：<br>"
            "进程存活时 <code>/proc/$PID/</code> 实时可见；进程一旦退出，该目录瞬间凭空蒸发。"
        ),
        "tags": ["Linux内核", "procfs", "伪文件系统", "设计哲学", "Chapter01"]
    },
    {
        "id": "KP-01-05",
        "chapter": "Chapter01",
        "front": "【Linux 进程探秘】<code>/proc/$PID/cmdline</code> 和 <code>/proc/$PID/status</code> 分别记录什么信息？<code>cli_set_process_title</code> 涂改的是哪一个？",
        "back": (
            "• <b><code>/proc/$PID/cmdline</code></b>：记录进程启动时的完整命令行参数与自定义进程标题。<code>cli_set_process_title()</code> 改写的就是这里的内存内容，因此改变了 <code>ps aux</code> 最后一列的名字；<br><br>"
            "• <b><code>/proc/$PID/status</code></b>：以可读文本格式记录进程全套档案（如 <code>Name</code> 原始短名、<code>State</code> 运行状态 R/S、<code>VmRSS</code> 真实占用的物理内存、<code>Uid/Gid</code> 权限等）。"
        ),
        "tags": ["Linux命令", "proc", "cmdline", "status", "进程监控", "Chapter01"]
    },
    {
        "id": "KP-01-06",
        "chapter": "Chapter01",
        "front": "【Linux 进程环境】为什么后台守护进程用相对路径 <code>fopen(&quot;./data.txt&quot;)</code> 时容易报错找不到文件？如何解决？",
        "back": (
            "<b>1. 踩坑原因</b>：<br>"
            "每个进程都有一个“当前工作目录（cwd, Current Working Directory）”，可在 <code>/proc/$PID/cwd</code> 查到。常驻后台运行或系统服务启动时，cwd 可能被重设为根目录 <code>/</code> 或系统目录，导致相对路径断裂；<br><br>"
            "<b>2. 规范解决方案</b>：<br>"
            "• 一律使用魔术常量拼接绝对路径：<code>__DIR__ . '/data.txt'</code>；<br>"
            "• 或在入口脚本显式锁定工作基准目录：<code>chdir(__DIR__);</code>"
        ),
        "tags": ["Linux进程环境", "cwd", "chdir", "相对路径陷阱", "Chapter01"]
    },
    {
        "id": "KP-01-07",
        "chapter": "Chapter01",
        "front": "【Linux 安全机制】为什么监听 80/443 端口必须具有 <code>root</code> 权限？但为什么绝对不能长期以 <code>root</code> 身份运行 PHP 业务代码？",
        "back": (
            "<b>1. 特权端口机制</b>：<br>"
            "Linux 规定 1~1023 号端口为特权保留端口，只有 UID=0（root）才有资格调用 <code>bind()</code> 监听，防止普通用户恶意截获系统核心服务流量；<br><br>"
            "<b>2. 长期以 root 运行的致命危机</b>：<br>"
            "PHP 业务代码庞大，一旦存在文件上传漏洞、SQL 注入提权或任意命令执行（RCE），黑客便直接拥有 root 最高特权，可执行 <code>rm -rf /</code> 删库或完全接管整台服务器。"
        ),
        "tags": ["Linux安全", "特权端口", "权限隔离", "Chapter01"]
    },
    {
        "id": "KP-01-08",
        "chapter": "Chapter01",
        "front": "【Linux 系统编程死穴】root 进程降权为平民（如 www-data, UID=33, GID=33）时，为什么必须<b>先调 <code>posix_setgid(33)</code>，最后再调 <code>posix_setuid(33)</code></b>？顺序反了会怎样？",
        "back": (
            "<b>1. 铁律顺序</b>：<br>"
            "<b>先改组（GID），最后改用户（UID）！</b><br><br>"
            "<b>2. 致命陷阱</b>：<br>"
            "内核检查你是否有特权修改组别，看的是你当前的 <code>UID</code> 是否为 0（root 皇上）。<br><br>"
            "<b>3. 颠倒顺序的后果</b>：<br>"
            "若先调用 <code>posix_setuid(33)</code>，你当场就变成了普通平民；下一行再试图执行 <code>posix_setgid(33)</code> 时，内核会以“平民无权修改组别”为由报错（Permission denied）！导致进程虽变成了平民用户，却依旧保留在 root 贵族组中，留下了重大安全后门！"
        ),
        "tags": ["Linux安全", "权限降级", "setuid", "setgid", "生死陷阱", "Chapter01"]
    },
    {
        "id": "KP-01-09",
        "chapter": "Chapter01",
        "front": "【Workerman 源码精读】在 <code>Worker::setUserAndGroup()</code> 中，大师是如何实现权限降级的？",
        "back": (
            "Workerman 原版源码片段：<br>"
            "<code>if (!posix_setgid($gid) || !posix_initgroups($userInfo['name'], $gid) || !posix_setuid($uid)) {<br>"
            "&nbsp;&nbsp;&nbsp;&nbsp;static::log(&quot;Warning: change gid or uid fail.&quot;);<br>"
            "}</code><br><br>"
            "<b>逐行解析顺序</b>：<br>"
            "1. <code>posix_setgid($gid)</code>：先降主部门（主组）；<br>"
            "2. <code>posix_initgroups(...)</code>：降附加部门（附加组）；<br>"
            "3. <b>最后压轴调用</b> <code>posix_setuid($uid)</code>：彻底完成降权放弃皇上特权！"
        ),
        "tags": ["Workerman源码", "setUserAndGroup", "权限降级", "Chapter01"]
    },
    {
        "id": "KP-01-10",
        "chapter": "Chapter01",
        "front": "【Linux 进程规范】子进程退出状态码（Exit Code）的取值范围是多少？0 与非 0 分别代表什么含义？在命令行如何读取上一个命令的退出码？",
        "back": (
            "<b>1. 取值范围</b>：<br>"
            "<b>0 ~ 255</b>（底层为一个无符号 8 位单字节数值）；<br><br>"
            "<b>2. 含义规范</b>：<br>"
            "• <b><code>0</code></b>：成功，圆满执行完毕退出（Success）；<br>"
            "• <b>非 0（如 1, 250, 255）</b>：异常、错误中断，不同数字代表不同具体原因；<br><br>"
            "<b>3. 命令行读取</b>：<br>"
            "• Linux Bash / WSL：<code>echo $?</code><br>"
            "• Windows PowerShell：<code>$LASTEXITCODE</code>"
        ),
        "tags": ["Linux基础", "退出码", "ExitCode", "进程管理", "Chapter01"]
    },
    {
        "id": "KP-01-11",
        "chapter": "Chapter01",
        "front": "【PHP 核心特性】当常驻进程因致命错误（Fatal Error）瞬间崩溃暴毙时，普通 try-catch 无法捕获，如何确保在咽气前记录下错误原因？",
        "back": (
            "<b>1. 临终遗嘱函数</b>：<br>"
            "<code>register_shutdown_function(callable $callback);</code><br><br>"
            "<b>2. 错误死因提取</b>：<br>"
            "在回调中配合调用 <code>error_get_last()</code>，能抓取到导致进程崩溃的错误类型、错误信息、出错文件与行号；<br><br>"
            "<b>3. 触发时机</b>：<br>"
            "无论是正常执行结束、代码中主动 <code>exit()</code>，还是遭遇致命错误 Fatal Error 暴毙，PHP 在彻底释放进程内存前必定执行该钩子函数！"
        ),
        "tags": ["PHP核心", "register_shutdown_function", "错误处理", "Chapter01"]
    },
    {
        "id": "KP-01-12",
        "chapter": "Chapter01",
        "front": "【Workerman 源码精读】Workerman 子进程在启动时注册了 <code>register_shutdown_function(static::checkErrors(...))</code>，并在事件循环末尾写了 <code>exit(250)</code>。这套机制的作用是什么？",
        "back": (
            "<b>1. 临终日志记录</b>：<br>"
            "在子进程崩溃的最后关头，<code>checkErrors()</code> 抓取 <code>error_get_last()</code> 并格式化写入主日志文件，避免毫无动静地死掉；<br><br>"
            "<b>2. exit(250) 的妙用</b>：<br>"
            "<b>250</b> 是 Workerman 约定的特殊退出状态码。Master 主进程通过 <code>pcntl_wait</code> 监听到子进程带着 250 死亡时，能准确识别出“这是非正常阵亡（非人为 stop/reload）”，立刻发出告警并重新 fork 补生一个新子进程，保障高可用！"
        ),
        "tags": ["Workerman源码", "checkErrors", "exit250", "高可用守护", "Chapter01"]
    },

    # =========================================================================
    # 第 2 章：“一切皆文件” —— 文件描述符 FD, 抢座原则与 resetStd (Chapter 02)
    # =========================================================================
    {
        "id": "KP-02-01",
        "chapter": "Chapter02",
        "front": "【Linux 核心哲学】为什么 Unix/Linux 坚持“一切皆文件（Everything is a file）”？什么是文件描述符（FD）？",
        "back": (
            "<b>1. 统一接口</b>：<br>"
            "避免针对键盘、屏幕、磁盘、网卡套接字各搞一套繁琐读写 API。Linux 将所有 I/O 抽象为流，统一使用 <code>read/write/close</code> 操作；<br><br>"
            "<b>2. FD 的本质</b>：<br>"
            "内核为每个进程维护的“打开文件表”的<b>整数下标索引（从 0 开始排队的非负整数）</b>；<br><br>"
            "<b>3. 生活比喻</b>：<br>"
            "就像在银行办业务时领到的排队挂号小纸条，手握号码牌就能操作对应资源。"
        ),
        "tags": ["Linux哲学", "一切皆文件", "FD", "文件描述符", "Chapter02"]
    },
    {
        "id": "KP-02-02",
        "chapter": "Chapter02",
        "front": "【Linux 基础内功】任何 Linux 进程一出生（即使代码是空的），内核就默认在它肚子里插好了哪 3 根管子（3 个 FD）？它们默认分别指向哪里？",
        "back": (
            "• <b><code>FD 0 (STDIN)</code> 标准输入</b>：默认连接在<b>键盘</b>（用来吸取用户输入）；<br>"
            "• <b><code>FD 1 (STDOUT)</code> 标准输出</b>：默认连接在<b>终端屏幕</b>（用于打印普通业务日志与 echo 输出）；<br>"
            "• <b><code>FD 2 (STDERR)</code> 标准错误</b>：默认<b>同样连接在终端屏幕</b>（用于打印警告和致命错误报错）。"
        ),
        "tags": ["Linux基础", "STDIN", "STDOUT", "STDERR", "FD012", "Chapter02"]
    },
    {
        "id": "KP-02-03",
        "chapter": "Chapter02",
        "front": "【Linux 架构设计】既然 1 号管子（STDOUT）已经指向终端屏幕，为什么 Linux 还要多此一举插一根 2 号管子（STDERR）到同一个屏幕上？",
        "back": (
            "<b>1. 核心目的</b>：<br>"
            "<b>实现“正常业务数据流”与“异常报警流”的彻底解耦与隔离</b>；<br><br>"
            "<b>2. 重定向场景（关键威力）</b>：<br>"
            "当执行 <code>php export.php > bill.txt</code> 导出账单时，重定向符号 <code>></code> 默认<b>只把 1 号管子拔下接到文本文件</b>；<br><br>"
            "<b>3. 价值</b>：<br>"
            "一旦脚本中途发生数据库连接慢等 Warning，2 号管子输出的报错依然直接弹在屏幕上提醒管理员，而绝不会混入并污染导出的 <code>bill.txt</code> 账单数据！"
        ),
        "tags": ["Linux架构", "重定向", "STDERR", "管道隔离", "Chapter02"]
    },
    {
        "id": "KP-02-04",
        "chapter": "Chapter02",
        "front": "【Linux 内核分配机制】进程打开文件或网络 Socket 时，Linux 内核分配 FD 号码牌遵循什么铁律？（最小可用 FD 原则）",
        "back": (
            "<b>1. 铁律名称</b>：<br>"
            "<b>【最小可用编号原则（Lowest Available FD）】</b>；<br><br>"
            "<b>2. 分配行为</b>：<br>"
            "内核从 0 开始扫描进程的 FD 表，<b>一旦发现某个槽位处于空闲状态，立刻将这个最小的空位号码发给新打开的资源</b>；<br><br>"
            "<b>3. 实例验证</b>：<br>"
            "若进程已占用 0,1,2,3,4 号；调用 <code>fclose(3)</code> 关掉 3 号后，紧接着下一行 <code>fopen(&quot;c.txt&quot;)</code>，内核必定将刚刚空出的 <b>3 号</b> 分配给 <code>c.txt</code>，绝不会分配 5 号！"
        ),
        "tags": ["Linux内核", "FD分配", "抢座规则", "Chapter02"]
    },
    {
        "id": "KP-02-05",
        "chapter": "Chapter02",
        "front": "【PHP 踩坑认知】在 PHP 中对一个文件流句柄强制转为整数 <code>(int)$fp</code> 打印出的数字，与在 <code>/proc/$PID/fd</code> 中看到的内核真实 FD 是一回事吗？",
        "back": (
            "<b>不是一回事！</b><br><br>"
            "• <b><code>(int)$fp</code></b>：是 PHP 虚拟机（Zend 引擎）内部为该 Resource 资源变量分配的<b>自增流水号 ID</b>，即使旧文件关闭后新打开文件，这个 ID 也会一直单调递增；<br><br>"
            "• <b>内核真实 FD</b>：必须通过 <code>/proc/$PID/fd</code> 或专用系统调用查看，它严格遵循内核的“退座抢座与最小空位复用”机制。"
        ),
        "tags": ["PHP底层", "资源句柄", "ResourceID", "内核FD", "Chapter02"]
    },
    {
        "id": "KP-02-06",
        "chapter": "Chapter02",
        "front": "【生产环境事故】常驻进程若开启守护进程（Daemon）在后台运行，当管理员断开 SSH 黑窗口后，为什么代码里的 <code>echo</code> 会引发诡异异常？",
        "back": (
            "<b>1. 断开危机</b>：<br>"
            "SSH 终端关闭后，原先 <code>0, 1, 2</code> 号 FD 所绑定的虚拟终端设备文件（如 <code>/dev/pts/0</code>）直接被操作系统注销销毁；<br><br>"
            "<b>2. 写入失败</b>：<br>"
            "此时代码若执行 <code>echo</code>，底层 <code>write(1, ...)</code> 会因目标设备已不存在而报错（<code>EBADF</code> 或 <code>EIO</code>），甚至可能触发 <code>SIGPIPE</code> 信号导致后台进程瞬间非正常死亡！"
        ),
        "tags": ["守护进程", "Daemon", "SIGPIPE", "标准输出异常", "Chapter02"]
    },
    {
        "id": "KP-02-07",
        "chapter": "Chapter02",
        "front": "【Workerman 源码精读】Workerman 在 <code>Worker::resetStd()</code> 中是如何只用 <code>fclose</code> 和 <code>fopen</code>，就让全项目后续所有 <code>echo</code> 自动静默流进日志文件的？",
        "back": (
            "<b>1. 巧妙步骤</b>：<br>"
            "• 先调用 <code>@fclose(STDOUT); @fclose(STDERR);</code> 关闭 1 号和 2 号管子，腾出 1 和 2 号空位；<br>"
            "• 紧接着执行 <code>$stdOutStream = fopen(static::$stdoutFile, 'a');</code>；<br><br>"
            "<b>2. 内核抢座原理</b>：<br>"
            "依据“最小可用 FD 原则”，新打开的日志文件被内核精准分配到刚空出来的 <b>1 号槽位（FD 1）</b>！<br><br>"
            "<b>3. 最终结果</b>：<br>"
            "PHP 底层的 <code>echo</code> 是个死脑筋，依然习惯性地往 1 号写，但此时 1 号已偷天换日指向了日志文件，从而神不知鬼不觉地完成了重定向！"
        ),
        "tags": ["Workerman源码", "resetStd", "重定向", "黑魔法", "Chapter02"]
    },
    {
        "id": "KP-02-08",
        "chapter": "Chapter02",
        "front": "【PHP 垃圾回收 GC 陷阱】在 Workerman 的 <code>resetStd()</code> 中，为什么 <code>fopen</code> 返回的句柄必须存入 <code>static::$outputStream</code> 静态属性，而不能用普通局部变量？",
        "back": (
            "<b>1. 致命陷阱</b>：<br>"
            "<b>PHP 引用计数垃圾回收机制（GC）</b>！<br><br>"
            "<b>2. 局部变量的灾难</b>：<br>"
            "如果只用局部变量 <code>$stdOutStream</code> 接收，当 <code>resetStd()</code> 函数执行完毕退出时，局部变量引用计数归零被 GC 销毁，PHP 会自动触发析构调用 <code>fclose</code> 将刚刚抢到的 1 号管子又给关了！<br><br>"
            "<b>3. 破解之道</b>：<br>"
            "赋值给类的常驻静态属性 <code>static::$outputStream</code>，保持全局强引用，死死攥住 1 号管子不让 GC 回收。"
        ),
        "tags": ["PHP核心", "垃圾回收", "GC", "引用计数", "Workerman源码", "Chapter02"]
    },
    {
        "id": "KP-02-09",
        "chapter": "Chapter02",
        "front": "【高并发排障】什么是文件描述符泄漏（FD Leak）？会导致什么报错？在高并发网络服务器中通常是由什么代码引起的？",
        "back": (
            "<b>1. 本质定义</b>：<br>"
            "打开了文件、Socket 连接或管道后，未能及时执行 <code>fclose/stream_socket_shutdown</code> 关闭释放，导致进程占用的 FD 数量只增不减；<br><br>"
            "<b>2. 致命报错</b>：<br>"
            "当占满单进程上限时，系统调用抛出 <b><code>Too many open files</code></b>，服务器瘫痪无法再接受任何新连接；<br><br>"
            "<b>3. 常见诱因</b>：<br>"
            "连接在异常分支提前 return 未执行 close、或者连接对象被全局数组引用导致对象无法析构。"
        ),
        "tags": ["高并发故障", "FD泄漏", "TooManyOpenFiles", "稳定性", "Chapter02"]
    },
    {
        "id": "KP-02-10",
        "chapter": "Chapter02",
        "front": "【Linux 运维调优】在部署高并发常驻服务（如 Workerman、Swoole、Nginx）前，为什么运维第一件事就是检查并调大 <code>ulimit -n</code>？",
        "back": (
            "<b>1. 系统默认限制</b>：<br>"
            "大多数 Linux 发行版默认单进程允许打开的最大 FD 数量仅为 <b>1024</b>；<br><br>"
            "<b>2. 并发致命瓶颈</b>：<br>"
            "在 Linux 网络编程中，每个接入的 TCP 连接都必须独占一个 FD。上限为 1024 意味着即便内存 CPU 极其富余，扣除系统自带文件后最多只能维持约 1020 个并发长连接！<br><br>"
            "<b>3. 生产标准</b>：<br>"
            "上线前必须调高至 <code>ulimit -n 102400</code>（10万+）甚至百万级别，才能发挥高并发服务器的真正威力。"
        ),
        "tags": ["Linux调优", "ulimit", "高并发", "TCP连接数", "Chapter02"]
    },
    {
        "id": "KP-02-11",
        "chapter": "Chapter02",
        "front": "【Linux I/O 模型】执行 <code>fread(STDIN, 1024)</code> 读取 0 号键盘管子时，为什么代码会停滞卡住不动？什么是阻塞 I/O？",
        "back": (
            "<b>1. 卡住原因</b>：<br>"
            "键盘管道当前没有数据输入，内核缓冲区为空；<br><br>"
            "<b>2. 阻塞（Blocking I/O）本质</b>：<br>"
            "当请求的资源尚未就绪时，操作系统会让调用者进程<b>立刻交出 CPU 调度权并进入挂起睡眠等待状态</b>，直至硬件产生输入中断、数据写入缓冲区后才重新唤醒进程；<br><br>"
            "<b>3. 局限性</b>：<br>"
            "阻塞期间进程无法响应任何其他任务，这就是为什么单进程处理海量连接必须走向多路复用（select/epoll）或非阻塞 I/O。"
        ),
        "tags": ["Linux网络", "阻塞IO", "IO模型", "STDIN", "Chapter02"]
    },
    {
        "id": "KP-02-12",
        "chapter": "Chapter02",
        "front": "【Linux 文件并发】当两个不同的 PHP 进程同时向同一个 <code>log.txt</code> 执行 <code>fwrite</code> 时，为什么内容会穿插错乱？如何解决？",
        "back": (
            "<b>1. 错乱原因</b>：<br>"
            "多个进程各自持有独立的写偏移量，操作系统的时间片调度交错切换，发生<b>竞态条件（Race Condition）</b>；<br><br>"
            "<b>2. 解决方案（文件锁）</b>：<br>"
            "使用 <code>flock($fp, LOCK_EX)</code>（排他互斥锁）。写入前加锁排队，写完后调用 <code>flock($fp, LOCK_UN)</code> 释放；<br><br>"
            "<b>3. 高效替代</b>：<br>"
            "以追加模式 <code>fopen(..., 'a')</code> 打开（内核底层置位 <code>O_APPEND</code>），在小块写入（低于 Linux PIPE_BUF 4KB）时由内核在驱动层保证单次写入原子性。"
        ),
        "tags": ["Linux并发", "flock", "文件锁", "竞态条件", "原子写入", "Chapter02"]
    },
    # =========================================================================
    # 第 3 章：苏格拉底架构推导（一） —— 事件驱动与回调解耦 (Chapter 03)
    # =========================================================================
    {
        "id": "KP-03-01",
        "chapter": "Chapter03",
        "front": "【软件架构演进】为什么在设计服务器框架时，严禁把业务逻辑直接写死在 <code>while(true)</code> 读取循环中？什么是“控制反转（IoC）与回调（Callback）”？",
        "back": (
            "<b>1. 耦合痛点</b>：<br>"
            "底层 I/O 读写管子的苦力活（如 <code>fgets(STDIN)</code>）与上层具体业务逻辑（如客服问答、订单处理）混在一起，导致框架底座无法复用；<br><br>"
            "<b>2. 控制反转（IoC）本质</b>：<br>"
            "将业务调用的<b>控制权由底座剥离反转给上层调用者</b>。底座只负责抓取数据，拿到数据后调用外部注入的函数变量 <code>$callback($data)</code>；<br><br>"
            "<b>3. 架构收益</b>：<br>"
            "底座一行代码不改，即可支撑客服部、财务部等任意不同业务场景。"
        ),
        "tags": ["软件工程", "架构设计", "IoC", "控制反转", "回调函数", "Chapter03"]
    },
    {
        "id": "KP-03-02",
        "chapter": "Chapter03",
        "front": "【面向对象架构】为什么 Workerman 不使用带有一长串参数的 <code>runServer($onStart, $onMessage, $onClose, ...)</code>，而选择用 <code>class Worker</code> 的公开属性作为“插座”？",
        "back": (
            "<b>1. 消灭参数泥潭</b>：<br>"
            "多生命周期事件下，普通函数传参必须严格对齐顺序。如果只想监听第 5 个事件，前面必须传一堆恶心的 <code>null</code> 占位，极易错位；<br><br>"
            "<b>2. 属性插座模型</b>：<br>"
            "在 <code>class Worker</code> 中定义 <code>public $onMessage = null;</code> 等属性插座，用户按需插拔、给哪个属性赋值就监听哪个事件，语义极其清晰且完全解耦。"
        ),
        "tags": ["面向对象", "框架设计", "Worker类", "插座模型", "Chapter03"]
    },
    {
        "id": "KP-03-03",
        "chapter": "Chapter03",
        "front": "【框架设计精髓】在触发 <code>$worker->onWorkerStart</code> 等生命周期钩子时，为什么框架底座必须执行 <code>($this->onWorkerStart)($this)</code> 把 <code>$this</code> 传给用户？",
        "back": (
            "<b>1. 上下文注入（Context Injection）</b>：<br>"
            "把当前 Worker 实例主动注入给用户的匿名函数 <code>function(Worker $worker) { ... }</code>；<br><br>"
            "<b>2. 避免闭包陷阱</b>：<br>"
            "如果底座不传 <code>$this</code>，用户在闭包内就必须显式写 <code>use ($worker)</code>，在动态循环生成多个 Worker 实例时极易造成变量引用混淆或循环引用内存泄漏；<br><br>"
            "<b>3. 获得掌控力</b>：<br>"
            "用户在回调内部可直接通过参数访问 <code>$worker->id</code>、<code>$worker->name</code> 或调用框架方法。"
        ),
        "tags": ["PHP核心", "闭包传参", "上下文注入", "Workerman源码", "Chapter03"]
    },
    {
        "id": "KP-03-04",
        "chapter": "Chapter03",
        "front": "【常驻内存排障】在 Workerman 等常驻进程服务中，为什么调用用户业务回调时<b>必须用 <code>try...catch(\\Throwable $e)</code> 包裹</b>？与传统 PHP-FPM 有何本质区别？",
        "back": (
            "<b>1. PHP-FPM 运行模型</b>：<br>"
            "短生命周期（请求级）。业务代码抛出未捕获异常只会导致当前请求返回 500，进程清理内存后迎接下一个请求，服务整体不挂；<br><br>"
            "<b>2. Workerman 运行模型</b>：<br>"
            "长生命周期（常驻事件循环）。如果一次 <code>$onMessage</code> 中业务抛出未捕获的 Exception/Error，<b>整个 Worker 进程将当场暴毙退出</b>，导致并发中的其他连接全部被切断；<br><br>"
            "<b>3. 工业级安全网</b>：<br>"
            "必须使用顶层基类 <code>\\Throwable</code>（捕获所有异常和 Fatal Error），拦截报错并记录日志，誓死捍卫主循环不崩溃。"
        ),
        "tags": ["高可用", "异常处理", "Throwable", "常驻内存", "PHP-FPM对比", "Chapter03"]
    },
    {
        "id": "KP-03-05",
        "chapter": "Chapter03",
        "front": "【PHP 语法深度】给 <code>$worker->onMessage</code> 赋值时，在 PHP 中合法支持哪 4 种传参形态？框架底座应该如何严格校验？",
        "back": (
            "<b>1. 4 种合法形态</b>：<br>"
            "• <b>匿名函数/闭包</b>：<code>function($msg) { ... }</code>；<br>"
            "• <b>箭头函数</b>：<code>fn($msg) => ...</code>；<br>"
            "• <b>对象方法数组（常见于 MVC 控制器）</b>：<code>[$this, 'onMessage']</code> 或 <code>[$bot, 'reply']</code>；<br>"
            "• <b>静态类方法</b>：<code>[Controller::class, 'handle']</code> 或 <code>'MyClass::handle'</code>；<br><br>"
            "<b>2. 底座严格校验</b>：<br>"
            "严禁用简单的 <code>if ($this->onMessage)</code>（无法防范传错成整数或拼错方法名的字符串）；必须使用 <b><code>is_callable($this->onMessage)</code></b>。"
        ),
        "tags": ["PHP语法", "Callable", "回调形态", "is_callable", "防御性编程", "Chapter03"]
    },
    {
        "id": "KP-03-06",
        "chapter": "Chapter03",
        "front": "【架构演进伏笔】为什么第 3 章终端机器人的 <code>$onMessage($msg)</code> 只有 1 个参数，而第 4 章网络服务器必须升级为 2 个参数 <code>$onMessage($connection, $data)</code>？",
        "back": (
            "<b>1. 单通道 vs 万级多通道</b>：<br>"
            "在第 3 章（0 号键盘文件），输入通道只有 1 个（终端键盘），输出也只有 1 个（终端屏幕），因此框架只需递交内容 <code>$msg</code>；<br><br>"
            "<b>2. 网络世界的寻址危机</b>：<br>"
            "在网络服务器中，同时有 10,000 个客户端 TCP 保持连接。当收到一段数据时，如果框架不告诉你<b>“这是哪位客人发过来的”</b>，你就根本无法把响应寄回给正确的客户端！<br><br>"
            "<b>3. 演进必然</b>：<br>"
            "框架必须同时递交<b>客人的网络连接对象 <code>$connection</code>（代表客人专属的 Socket FD）</b>与收到的数据 <code>$data</code>。"
        ),
        "tags": ["架构推导", "Socket", "网络编程", "TcpConnection", "Chapter03"]
    }
]

def generate_tsv(output_path):
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        # Anki 官方头部指令，导入时 100% 自动识别字段，零手动配置！
        f.write("#separator:tab\n")
        f.write("#html:true\n")
        f.write("#tags column:3\n")
        f.write("#deck:Linux系统编程与Workerman源码\n")
        
        for c in CARDS:
            front = c["front"].replace("\t", "    ").replace("\n", "")
            back = c["back"].replace("\t", "    ").replace("\n", "")
            tags = " ".join(c["tags"])
            f.write(f"{front}\t{back}\t{tags}\n")
    print(f"✅ Master Anki deck generated: {output_path} ({len(CARDS)} cards)")

def generate_chapter_tsv():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    chapter_map = {
        "Chapter00": os.path.join(base_dir, "chapters", "chapter00_kernel_and_process", "anki_cards.txt"),
        "Chapter01": os.path.join(base_dir, "chapters", "chapter01_process_identity", "anki_cards.txt"),
        "Chapter02": os.path.join(base_dir, "chapters", "chapter02_everything_is_a_file", "anki_cards.txt"),
        "Chapter03": os.path.join(base_dir, "chapters", "chapter03_socratic_onmessage", "anki_cards.txt"),
    }
    
    for ch_name, ch_path in chapter_map.items():
        ch_cards = [c for c in CARDS if c["chapter"] == ch_name]
        with open(ch_path, "w", encoding="utf-8") as f:
            f.write("#separator:tab\n")
            f.write("#html:true\n")
            f.write("#tags column:3\n")
            f.write(f"#deck:Linux系统编程与Workerman源码::{ch_name}\n")
            for c in ch_cards:
                front = c["front"].replace("\t", "    ").replace("\n", "")
                back = c["back"].replace("\t", "    ").replace("\n", "")
                tags = " ".join(c["tags"])
                f.write(f"{front}\t{back}\t{tags}\n")
        print(f"✅ Chapter deck generated: {ch_path} ({len(ch_cards)} cards)")

if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    master_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "workerman_anki_cards.txt")
    generate_tsv(master_path)
    generate_chapter_tsv()
