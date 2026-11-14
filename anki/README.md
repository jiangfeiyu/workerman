# 🗂️ Linux 系统编程 & Workerman 源码修炼 —— Anki 闪卡全量题库

> **为终生记忆与高频复习而生**！本目录下的闪卡严格遵循认知科学中的“原子化知识原则（Minimum Information Principle）”，将课程中推导出的**底层内功、系统调用、踩坑陷阱、命令实操以及 Workerman 源码真迹**提炼成问答卡片，可一键导入 Anki 进行间隔重复（Spaced Repetition）复习。

---

## 🚀 30 秒极速导入 Anki 教程

本文件采用了 Anki 官方标准的文件头自适应指令（`#separator:tab`、`#html:true`、`#deck:...`），**导入时 100% 自动识别，无需任何手动字段映射！**

### 📥 导入步骤（Anki 电脑端 / Mac / Windows / Linux 通用）：
1. 打开 **Anki 软件**；
2. 点击顶部菜单栏的 **【文件】(File)** $\rightarrow$ **【导入】(Import)**（或者直接快捷键 `Ctrl + I`）；
3. 浏览并选中本项目的文件：
   👉 **[`d:/Workerman/anki/workerman_anki_cards.txt`](file:///d:/Workerman/anki/workerman_anki_cards.txt)**
4. 此时 Anki 会弹窗显示导入预览，由于内置了指令，你会看到：
   - **牌组 (Deck)**：已自动填充为 `Linux系统编程与Workerman源码`
   - **字段分隔符**：已自动识别为 `制表符 (Tab)`
   - **允许在字段中使用 HTML**：已自动勾选为 `是`
   - **标签**：已自动映射到第 3 列
5. 直接点击右下角的 **【导入】(Import)** 按钮！
6. 🎉 **完成！** 目前第 0～8 章全套 **99 张** 高密度深度问答卡已收齐，瞬间入库即可开始每天艾宾浩斯复习！

> [!TIP]
> **后续章节增量更新怎么导？**
> 当我们学完新章节并生成了更多卡片后，你只需要再次点击【导入】同一个文件，Anki 会极其智能地：
> - **已有卡片保留复习进度**（绝不会重置你的记忆周期）；
> - **仅增量导入最新卡片**，无缝衔接！

---

## 📂 闪卡文件结构

| 文件路径 | 作用说明 | 卡片数量 |
| :--- | :--- | :--- |
| **[`d:/Workerman/anki/workerman_anki_cards.txt`](file:///d:/Workerman/anki/workerman_anki_cards.txt)** | **【全量主文件】** 包含第 0～8 章全部章节的汇总卡片（支持按 `tag:ChapterXX` 抽取），日常导入首选 | **99 张** |
| [`chapters/chapter00_kernel_and_process/anki_cards.txt`](file:///d:/Workerman/chapters/chapter00_kernel_and_process/anki_cards.txt) | 第 0 章早期独立备份（已 100% 同步入全量主文件） | 8 张 |
| [`chapters/chapter01_process_identity/anki_cards.txt`](file:///d:/Workerman/chapters/chapter01_process_identity/anki_cards.txt) | 第 1 章早期独立备份（已 100% 同步入全量主文件） | 17 张 |
| [`chapters/chapter02_everything_is_a_file/anki_cards.txt`](file:///d:/Workerman/chapters/chapter02_everything_is_a_file/anki_cards.txt) | 第 2 章早期独立备份（已 100% 同步入全量主文件） | 12 张 |
| [`chapters/chapter03_socratic_onmessage/anki_cards.txt`](file:///d:/Workerman/chapters/chapter03_socratic_onmessage/anki_cards.txt) | 第 3 章早期独立备份（已 100% 同步入全量主文件） | 9 张 |

> **第 4～8 章卡片组织说明**：从第 4 章起不再维护分散备份文件，所有新增章节卡片统一沉淀至全量主文件 [`workerman_anki_cards.txt`](file:///d:/Workerman/anki/workerman_anki_cards.txt)，通过第 3 列标签 `Chapter04` ~ `Chapter08` 精准区分（各章分布：Ch00=8、Ch01=17、Ch02=12、Ch03=9、Ch04=10、Ch05=13、Ch06=8、Ch07=12、Ch08=10）。

---

## 📋 已收录知识点卡片清单（前 3 章共 32 题）

### 🟢 第 0 章：基地点火 —— 系统调用与进程（8 题）
- **KP-00-01**：【Linux 架构内功】为什么操作系统严禁应用程序直接操作显卡/内存？用户态与内核态权限划分
- **KP-00-02**：【Linux 架构内功】什么是系统调用（Syscall）？为什么 PHP 的 `echo` 本身不会点亮显示器？
- **KP-00-03**：【Linux 性能内功】为什么纯算术计算（如 `$a = 1 + 1;`）不会触发任何系统调用？寄存器草稿纸
- **KP-00-04**：【Linux 调试神器】如何用 `strace` 命令透视 PHP 脚本底层的系统调用？如何过滤指定系统调用？
- **KP-00-05**：【Linux 底层拆解】解读 `write(1, "Hello Linux!\n", 13) = 13` 各参数与返回值
- **KP-00-06**：【操作系统生命周期】硬盘上的静态代码文件（Program）与内存中的活体进程（Process）本质区别
- **KP-00-07**：【Linux 调度内功】正在执行 `sleep(60);` 的进程会消耗 CPU 算力吗？睡眠等待队列与 `S` 状态
- **KP-00-08**：【Linux 进程管理】如果同时运行 3 个一模一样的 `php worker.php`，内核保安如何区分它们？PID

### 🟢 第 1 章：解剖进程户口本 —— PID, PPID, 改名, /proc, 权限降级, 退出码（12 题）
- **KP-01-01**：【Linux 进程身份】PHP 进程自身如何在代码中获取自己的 PID 和父进程 PPID？终端老爹是谁？
- **KP-01-02**：【Workerman 运维工程】为什么高并发常驻多进程服务启动时一定要修改进程名称？`cli_set_process_title`
- **KP-01-03**：【Workerman 源码精读】`Worker::setProcessTitle()` 为什么必须用 `set_error_handler` 包裹防报错？
- **KP-01-04**：【Linux 设计哲学】Linux 的 `/proc` 目录存放在哪块物理硬盘上？为什么被称为伪文件系统？
- **KP-01-05**：【Linux 进程探秘】`/proc/$PID/cmdline` 和 `/proc/$PID/status` 分别记录什么？改名改的是哪一个？
- **KP-01-06**：【Linux 进程环境】为什么后台守护进程用相对路径 `fopen("./data.txt")` 时容易报错？`cwd` 与 `chdir`
- **KP-01-07**：【Linux 安全机制】为什么监听 80/443 端口必须具有 `root` 权限？但为什么绝对不能长期以 `root` 运行业务？
- **KP-01-08**：【Linux 系统编程死穴】root 进程降权为平民时，为什么必须先调 `setgid` 最后再调 `setuid`？顺序颠倒的严重后果
- **KP-01-09**：【Workerman 源码精读】在 `Worker::setUserAndGroup()` 中，大师是如何实现权限降级的？
- **KP-01-10**：【Linux 进程规范】子进程退出状态码（Exit Code）取值范围与含义？命令行如何读取？
- **KP-01-11**：【PHP 核心特性】常驻进程因致命错误 Fatal Error 崩溃暴毙时，如何利用 `register_shutdown_function` 记录死因？
- **KP-01-12**：【Workerman 源码精读】`Worker::checkErrors()` 配合 `exit(250)` 的高可用守护机制与意义

### 🟢 第 2 章：“一切皆文件” —— 文件描述符 FD, 抢座原则与 resetStd（12 题）
- **KP-02-01**：【Linux 核心哲学】为什么 Unix/Linux 坚持“一切皆文件”？什么是文件描述符（FD）？
- **KP-02-02**：【Linux 基础内功】任何 Linux 进程一出生，内核就默认在其内部插好了哪 3 根管子（0, 1, 2）？
- **KP-02-03**：【Linux 架构设计】既然 1 号管子（STDOUT）已连屏幕，为什么还要多插一根 2 号管子（STDERR）到同一个屏幕？
- **KP-02-04**：【Linux 内核分配机制】进程打开资源时，内核发号码牌遵循什么铁律？最小可用 FD 原则
- **KP-02-05**：【PHP 踩坑认知】PHP 变量 `(int)$fp` Resource ID 与在 `/proc/$PID/fd` 中看到的内核真实 FD 的区别
- **KP-02-06**：【生产环境事故】守护进程断开终端后，为什么代码里的 `echo` 会引发进程异常甚至阵亡？
- **KP-02-07**：【Workerman 源码精读】`Worker::resetStd()` 是如何只用 `fclose` 和 `fopen` 就让 `echo` 自动流进日志文件的？
- **KP-02-08**：【PHP 垃圾回收 GC 陷阱】`Worker::resetStd()` 中，为什么 `fopen` 句柄必须存入静态属性 `static::$outputStream`？
- **KP-02-09**：【高并发排障】什么是文件描述符泄漏（FD Leak）？会导致什么报错？常见诱因是什么？
- **KP-02-10**：【Linux 运维调优】在部署高并发服务前，为什么运维第一件事就是调大 `ulimit -n`？默认是多少？
- **KP-02-11**：【Linux I/O 模型】执行 `fread(STDIN, 1024)` 读取键盘管子为什么会卡住？阻塞 I/O 的本质与局限
- **KP-02-12**：【Linux 文件并发】两个进程同时向同一个文件执行 `fwrite` 为什么内容会错乱？`flock` 与 `O_APPEND` 原子写
