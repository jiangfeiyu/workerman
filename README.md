# 🚀 Linux 系统编程 & Workerman 源码修炼手册

> **从 0 到 1 纯手写打造工业级高并发异步网络框架**  
> 结合 **苏格拉底式启发推导**、**原子化微步实验**、**Workerman 官方源码逐行对照** 与 **艾宾浩斯 Anki 闪卡记忆**。

---

## 🧭 快速直达

| 核心入口 | 说明 | 快速跳转 |
| :--- | :--- | :--- |
| 🗺️ **180 关总路线图** | 完整的学习演进脉络与通关打勾清单 | [点击直达 路线图](roadmap.md) |
| 📜 **学习铁律与互动规范** | 双螺旋苏格拉底推导、微步代码实验等 8 大铁律 | [点击阅读 学习铁律](COURSE_RULES.md) |
| 🗂️ **Anki 闪卡全量题库** | 底层内功、系统调用与避坑闪卡，支持一键导入 | [查看 闪卡说明](anki/README.md) |

---

## 📚 已完成章节演进目录

点击下方链接即可进入对应章节的详细思考实录、实验代码分析与 Workerman 源码比对：

* **[第 0 章：基地点火 —— 系统调用与进程](chapters/chapter00_kernel_and_process/README.md)**
  * 用户态与内核态隔离、Ring 0 ~ Ring 3 权限
  * 系统调用（Syscall）本质、CPU 模式切换与上下文切换开销
  * `strace` 命令实战与 PHP 零系统调用计算探秘
* **[第 1 章：进程身份与权限降级 —— 安全基石](chapters/chapter01_process_identity/README.md)**
  * UID / GID / EUID / EGID 身份机制
  * Master 进程 80 端口特权监听与 Worker 进程降权防御
  * `/proc/<PID>/status` 实操与 `posix_setuid` 源码剖析
* **[第 2 章：一切皆文件与 FD 体系 —— 资源之眼](chapters/chapter02_everything_is_a_file/README.md)**
  * 文件描述符（FD）数组机制、0/1/2 标准流抢座
  * `dup2` 与重定向、FD 泄漏隐患与 `ulimit -n`
  * Workerman 守护进程化（Daemonize）关流防悬挂实录
* **[第 3 章：苏格拉底启发式推导 —— onMessage 的诞生](chapters/chapter03_socratic_onmessage/README.md)**
  * 从裸脚本到面向对象封装
  * PHP 回调机制与 `is_callable` 运行时绑定
  * 框架主循环与开发者业务逻辑解耦
* **[第 4 章：网络 Socket 编程入门 —— 建立连接之门](chapters/chapter04_network_socket/README.md)**
  * TCP Server 经典四步走：`socket` $\rightarrow$ `bind` $\rightarrow$ `listen` $\rightarrow$ `accept`
  * 阻抗匹配与半连接/全连接队列深度排查
  * PHP `stream_socket_server` 与原生内核 Socket 对照
* **[第 4 章补充：TCP 握手与挥手深度剖析 —— 协议内功](chapters/chapter04_extra_tcp_deep_dive/README.md)**
  * 三次握手与抓包验证（SYN, ACK, seq/ack 号流动）
  * 四次挥手状态机：`FIN_WAIT_1`, `FIN_WAIT_2`, `TIME_WAIT`, `CLOSE_WAIT`
  * 高并发服务端口耗尽陷阱与 `SO_REUSEADDR` 必选配置
* **[第 5 章：高并发与 EventLoop 事件循环 —— 突破 C10K 核心](chapters/chapter05_concurrency_and_eventloop/README.md)**
  * 阻塞 I/O 困境与多进程模型资源瓶颈
  * I/O 多路复用：`select` 轮询到 `epoll` 红黑树 + 就绪链表
  * 手写单线程非阻塞事件循环与高并发多连接同时保活
* **[第 6 章：定时器与时间轮/最小堆 —— 时间的度量衡](chapters/chapter06_timer_and_heap/README.md)**
  * EventLoop 超时时间与定时器的天作之合（`stream_select` 纳秒精度）
  * 最小堆（Min-Heap）与时间轮（Timing Wheel）算法推导
  * Workerman 定时器精准调度与心跳超时剔除实战
* **[第 7 章：TcpConnection 封装与异步发送缓冲区 —— 突破丢包血案](chapters/chapter07_tcp_connection/README.md)**
  * 原生 PHP resource 无法挂载业务属性与对象包装盒思想
  * 从 10MB 大文件吞噬 7MB 现场推导出内核发送缓冲区（`SO_SNDBUF`）
  * 应用层 `$sendBuffer` 缓存截断与事件循环 `$write` 可写事件排空机制

---

> [!TIP]
> 📖 **手机端阅读小贴士**：
> 点击左上角的侧边栏菜单（三条横线），可随时在各个章节和路线图之间自由切换！支持顶部搜索关键词快速定位知识点。
