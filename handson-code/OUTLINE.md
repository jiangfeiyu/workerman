# 《手把手从 0 到 1 写一个 Workerman（ModernWorker）》112 集实战总纲

> **核心方法论**：**分而治之 + 递归拼装**  
> - **每一集**：1 个原子问题 + 1 个小主线 + 10~25 行真实代码增量（2~4 分钟）  
> - **每个模块（3~8 集）**：先铺垫底层现象 → 再写最小过渡原型 → 最后抽象进框架并【合拢验收】  
> - **7 大篇递归组装**：从 10 行阻塞脚本长成 `ModernWorker`（PHP 8.2+ / Fiber 协程 / Epoll / TLS）+ `ModernGateway` 分布式网关 + 实战项目

---

## 全景组装树

```text
ModernWorker + ModernGateway 实战项目（第 7 篇 EP107-112）
 ├── 第 1 篇：网络地基与事件发动机（EP01-21） ──▶ SelectLoop + Timer + Worker v0.1
 ├── 第 2 篇：全双工连接层（EP22-33）        ──▶ TcpConnection（异步发送/背压/优雅关流）
 ├── 第 3 篇：可插拔协议层（EP34-54）        ──▶ ProtocolInterface + Text/Frame/HTTP/WebSocket
 ├── 第 4 篇：多进程与守护层（EP55-76）      ──▶ Master 监工 + Reload + Status + EpollLoop
 ├── 第 5 篇：协程与安全防线（EP77-93）      ──▶ Fiber 调度 + 协程 Redis 连接池 + TLS(HTTPS/WSS)
 └── 第 6 篇：分布式网关集群（EP94-106）     ──▶ Channel + Register + Gateway + BusinessWorker
```

---

## 分篇目录

### 第 1 篇：网络地基与事件发动机（EP01 - EP21）
- **1.1 Socket 与 I/O 破冰（EP01-EP05）**：阻塞 Server 卡死 → 非阻塞空转 → `【铺垫】` `stream_select` 传引用陷阱 → 监听 `$server` → 多客户端并发
- **1.2 从过程式过渡到 `SelectLoop`（EP06-EP11 + EP06B/EP09B 过渡）**：`【铺垫】` 回调数组 → `【过渡】` `EP06B` 登记与触发时机 → `【过渡】` 平铺查表代替 `if-else` → `EventLoopInterface` → `SelectLoop` 读监听 → `【过渡】` `EP09B` 塞满写缓冲区 → `onWritable` / 退出
- **1.3 微秒级定时器 `Timer`（EP12-EP17 + EP15B 过渡）**：`【铺垫】` `timeout` 微秒睡眠 → `【铺垫】` `SplPriorityQueue` 负权重最小堆 → `【过渡】` 动态睡眠公式 → `delay` → `【过渡】` `EP15B` 普通函数接力续订 → `repeat` / 5s 心跳踢人
- **1.4 模块合拢：`Worker v0.1`（EP18-EP21）**：组装 `Worker` → 三大钩子 → 异常兜底 → `【合拢】` 广播聊天室

### 第 2 篇：全双工连接层 `TcpConnection`（EP22 - EP33）
- **2.1 对象化与状态机（EP22-EP24 + EP21B 过渡）**：`【过渡】` `EP21B` 裸 resource 踩坑与 `ConnBox` → `TcpConnection` 包装 + `ConnectionStatus` 枚举 + 零泄漏销毁
- **2.2 异步发送缓冲与背压（EP25-EP30 + EP25B/EP29B 过渡）**：`【踩坑】` 10MB 丢 7MB → `【过渡】` `EP25B` `while` 死磕 `fwrite` 卡死 → `【过渡】` `$pending` 续传 → `【踩坑】` 忘卸 `onWritable` CPU 100% → `$sendBuffer` / `baseWrite` → `【过渡】` `EP29B` 红绿灯刹车联动 → 水位线
- **2.3 优雅断连与合拢（EP31-EP33 + EP31B 过渡）**：`close()` vs `destroy()` → `【过渡】` `EP31B` `while` 读空误杀活人 → `baseRead()` (`feof`) → `【合拢】` 10MB 并发 0 丢包压测

### 第 3 篇：可插拔协议层 `Protocols`（EP34 - EP54）
- **3.1 粘包破局与二进制基础（EP34-EP40 + EP36B 过渡）**：粘包半包复现 → `$recvBuffer` 蓄水池 → `ProtocolInterface` → `【过渡】` `EP36B` 静态契约与 `($cls)::input()` → `TextProtocol` → `【铺垫】` 二进制大端序 → `FrameProtocol` → 防超大包
- **3.2 手写 HTTP/1.1 协议（EP41-EP46）**：原生报文认脸 → `HttpProtocol::input`（头/体） → `Request` → `Response` → `Keep-Alive`
- **3.3 手写 WebSocket 协议（EP47-EP54 + EP50B 过渡）**：`101` 握手 → 协议热切换 → `【铺垫】` 位运算灯泡课 → `FIN/Opcode` → `【过渡】` `EP50B` 帧地图与 `pack('n')/'J'` → 阶梯长度 → `Mask` 异或解密 → `【合拢】` 网页聊天室

### 第 4 篇：多进程、守护化与 Epoll 核动力（EP55 - EP76）
- **4.1 多进程与监工（EP55-EP61）**：`fork` 返回两次 → COW 隔离 → 16 进程乌龙 → 共享 3 号 FD → 孤儿/僵尸 → `Master` 拉起 → 降权与 `SO_REUSEPORT`
- **4.2 守护进程与 CLI（EP62-EP66 + EP62B 过渡）**：`SIGHUP` 灭门 → `【过渡】` `EP62B` 进程组长 `setsid` 失败 → 两次 `fork` + `setsid` → `0/1/2` 重定向 → PID 文件锁 → `CommandRunner`
- **4.3 信号、热更新与看板（EP67-EP71 + EP66B 过渡）**：`【过渡】` `EP66B` `async_signals` vs `dispatch` → 异步信号 → 类重定义惨案 → `reload` → `stop -g` 优雅排空 → `status` 看板
- **4.4 Epoll 核动力（EP72-EP76）**：`select` 1024 崩溃 → `strace` 看 `epoll` → `EpollLoop` → `$_allEvents` 防 GC → `【合拢】` `wrk` 压测对比

### 第 5 篇：PHP Fiber 协程化与 TLS 加密（EP77 - EP93）
- **5.1 Fiber 协程调度（EP77-EP83）**：`Fiber` 冻结 → 双向传值接力 → `EP78B` (`Fiber::getCurrent` 与 `spawn` 过渡) → `Coroutine::sleep` → 请求自动协程化 → `ASYNC_CONNECT` 铺垫 → `AsyncTcpClient`
- **5.2 协程 Redis 与连接池（EP84-EP87）**：RESP 协议 → `RedisClient` → 并发串台灾难 → `ConnectionPool`
- **5.3 TLS 加密与总装（EP88-EP93）**：自签名证书 → `EP88B` (为什么不用 `ssl://` 直接监听过渡) → 非阻塞握手返回 `0` → `doSslHandshake` (`https/wss`) → Slowloris 防护 → `X-Forwarded-For` → PSR-4 + Composer 总装

### 第 6 篇：跨进程通信与分布式网关 `ModernGateway`（EP94 - EP106）
- **6.1 `Channel` 内部邮局（EP94-EP96）**：4 进程聊天室失灵 → `ChannelServer/Client` → 全服广播
- **6.2 网关与业务分离（EP97-EP106）**：十万连接 `reload` 雪崩推演 → 硬编码双进程原型 → 业务热更新零断线实测 → `client_id` → `GatewayProtocol` → `Register` → `Gateway` → `BusinessWorker` → `EP104B` (无状态与 `$_SESSION` 托管过渡) → `bindUid`/`sendToUid` → `【合拢】` 多节点集群

### 第 7 篇：收官综合项目与压测（EP107 - EP112）
- `EP107` ~ `EP112`：实时弹幕系统骨架 → 房间推送与在线统计 → 协程 Redis 落库 → 异常/日志/`systemd` → 压测读数指南 → `Select` vs `Epoll` vs 原版 Workerman 万级并发横评
