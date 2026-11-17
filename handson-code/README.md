# 从 0 到 1 手写 Workerman（ModernWorker）实战代码库

> **分而治之 · 递归拼装**：112 集原子实战视频配套真实可运行 PHP 代码库。  
> 每一集对应一个独立目录，包含当集增量源码与自动化验证脚本（生成真实终端快照 `snapshot.json`）。

## 环境要求

- PHP >= 8.2（CLI 模式，开启 `pcntl`、`posix`、`sockets` 扩展）
- 本地已验证环境：`PHP 8.5.10` (`/opt/homebrew/bin/php`)

## 当前已完成模块

### 第 1 篇｜模块 1.1：Socket 与 I/O 破冰（EP01 - EP05）

| 集数 | 目录 | 核心主线 | 手动运行 |
| :--- | :--- | :--- | :--- |
| EP01 | `module_01_socket_io/ep01_blocking_server` | 10 行阻塞 TCP Server 与第 2 人卡死现场 | `php server.php` |
| EP02 | `module_01_socket_io/ep02_nonblocking_busy_loop` | `stream_set_blocking(false)` 与 CPU 空转 | `php server.php` |
| EP03 | `module_01_socket_io/ep03_select_reference_trap` | 【铺垫】`stream_select` 传引用改写数组陷阱 | `php demo.php` |
| EP04 | `module_01_socket_io/ep04_select_accept_only` | `stream_select` 监听 `$server` 新客到达 | `php server.php` |
| EP05 | `module_01_socket_io/ep05_select_multi_client` | 把 `$clients[]` 接入 `stream_select` 多人并发 | `php server.php` |

运行任意一集的自动化验证并生成终端快照：

```bash
php module_01_socket_io/ep01_blocking_server/verify.php
```
