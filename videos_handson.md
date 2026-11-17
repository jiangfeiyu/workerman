# 🛠️ 《手把手从 0 到 1 写一个 Workerman（ModernWorker）》112 集实战视频课

> 全系列 **112 集正片（含第 1 篇专项铺垫共 126 支成品视频，总时长 117.1 分钟）** 已全部制作并验证完毕，配套完整 PHP 8.5 可运行源码见 [`handson-code/`](handson-code/README.md)。点击任意集数即可在顶部播放器播放；手机端支持**双击画面暂停/继续**、倍速调节与自动连播。

<div class="video-card ep-player-card" id="ep-player-card">
  <div class="video-card-header">
    <span id="ep-current-title">🎬 EP001｜10 行代码写最简阻塞 TCP Server</span>
    <div class="ep-player-actions">
      <button type="button" class="ep-nav-btn ep-play-btn" id="ep-play-btn">▶ 播放</button>
      <button type="button" class="ep-nav-btn" id="ep-speed-btn">1x</button>
      <button type="button" class="ep-nav-btn" id="ep-prev-btn">⬅ 上一集</button>
      <button type="button" class="ep-nav-btn" id="ep-next-btn">下一集 ➡</button>
      <label class="ep-autoplay-label"><input type="checkbox" id="ep-autoplay" checked /> 连播</label>
      <a class="ep-raw-link" id="ep-download-link" href="handson-video/out/EP001_10行代码写最简阻塞TCP_Server.mp4" target="_blank" rel="noopener">新窗口/下载</a>
    </div>
  </div>
  <div class="ep-video-stage">
    <video id="ep-player" controls preload="metadata" playsinline webkit-playsinline x5-playsinline src="handson-video/out/EP001_10行代码写最简阻塞TCP_Server.mp4"></video>
    <div class="ep-gesture-toast" aria-hidden="true"></div>
  </div>
</div>

## 第 1 篇：网络地基与事件发动机（EP001 - EP021）

<ul class="ep-grid">
  <li><a class="ep-item active" href="handson-video/out/EP001_10行代码写最简阻塞TCP_Server.mp4" data-ep="EP001" data-title="EP001｜10 行代码写最简阻塞 TCP Server (125s)"><span class="ep-badge">EP001</span> <span class="ep-title">10 行代码写最简阻塞 TCP Server</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP002_关闭阻塞开关与CPU空转惨案.mp4" data-ep="EP002" data-title="EP002｜关闭阻塞开关与 CPU 100% 空转惨案 (137s)"><span class="ep-badge">EP002</span> <span class="ep-title">关闭阻塞开关与 CPU 100% 空转惨案</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP003_铺垫_stream_select传引用改写数组陷阱.mp4" data-ep="EP003" data-title="EP003｜【铺垫】stream_select 传引用改写数组陷阱 (138s)"><span class="ep-badge">EP003</span> <span class="ep-title">【铺垫】stream_select 传引用改写数组陷阱</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP004_用stream_select守护接待门.mp4" data-ep="EP004" data-title="EP004｜用 stream_select 守护接待门 (66s)"><span class="ep-badge">EP004</span> <span class="ep-title">用 stream_select 守护接待门</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP005_合拢_单进程多路复用服务器诞生.mp4" data-ep="EP005" data-title="EP005｜【合拢】单进程多路复用服务器诞生 (142s)"><span class="ep-badge">EP005</span> <span class="ep-title">【合拢】单进程多路复用服务器诞生</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP006_铺垫_把函数放进数组_callable回调表.mp4" data-ep="EP006" data-title="EP006｜【铺垫】把函数放进数组：callable 回调表 (58s)"><span class="ep-badge">EP006</span> <span class="ep-title">【铺垫】把函数放进数组：callable 回调表</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP006B_加餐过渡_看懂回调登记与触发时机.mp4" data-ep="EP006B" data-title="EP006B｜看懂回调：登记时刻 vs 触发时刻 (69s)"><span class="ep-badge">EP006B</span> <span class="ep-title">看懂回调：登记时刻 vs 触发时刻</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP007_过渡_用回调表消灭主循环if_else.mp4" data-ep="EP007" data-title="EP007｜【过渡】不建类！用回调表消灭主循环 if-else (90s)"><span class="ep-badge">EP007</span> <span class="ep-title">【过渡】不建类！用回调表消灭主循环 if-else</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP008_定义发动机契约_EventLoopInterface.mp4" data-ep="EP008" data-title="EP008｜定义发动机契约：EventLoopInterface (56s)"><span class="ep-badge">EP008</span> <span class="ep-title">定义发动机契约：EventLoopInterface</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP009_封装SelectLoop读监听与EINTR容错.mp4" data-ep="EP009" data-title="EP009｜封装 SelectLoop 读监听与 EINTR 容错 (74s)"><span class="ep-badge">EP009</span> <span class="ep-title">封装 SelectLoop 读监听与 EINTR 容错</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP009B_加餐过渡_10行代码塞满内核写缓冲区.mp4" data-ep="EP009B" data-title="EP009B｜10行代码塞爆写缓冲区！看懂发件柜 (77s)"><span class="ep-badge">EP009B</span> <span class="ep-title">10行代码塞爆写缓冲区！看懂发件柜</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP010_加上onWritable写监听与可写死循环大坑.mp4" data-ep="EP010" data-title="EP010｜加上 onWritable 写监听与可写死循环大坑 (79s)"><span class="ep-badge">EP010</span> <span class="ep-title">加上 onWritable 写监听与可写死循环大坑</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP011_合拢_实现SelectLoop_stop与安全退出.mp4" data-ep="EP011" data-title="EP011｜【合拢】实现 SelectLoop::stop() 与安全退出 (56s)"><span class="ep-badge">EP011</span> <span class="ep-title">【合拢】实现 SelectLoop::stop() 与安全退出</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP012_铺垫_用stream_select超时实现精准睡眠.mp4" data-ep="EP012" data-title="EP012｜【铺垫】用 stream_select 超时实现精准睡眠 (42s)"><span class="ep-badge">EP012</span> <span class="ep-title">【铺垫】用 stream_select 超时实现精准睡眠</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP013_铺垫_SplPriorityQueue负权重变最小堆.mp4" data-ep="EP013" data-title="EP013｜【铺垫】SplPriorityQueue 负权重变最小堆 (83s)"><span class="ep-badge">EP013</span> <span class="ep-title">【铺垫】SplPriorityQueue 负权重变最小堆</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP014_过渡_推导stream_select动态睡眠公式.mp4" data-ep="EP014" data-title="EP014｜【过渡】推导 stream_select 动态睡眠公式 (54s)"><span class="ep-badge">EP014</span> <span class="ep-title">【过渡】推导 stream_select 动态睡眠公式</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP015_把最小堆装进SelectLoop_delay与懒惰删除.mp4" data-ep="EP015" data-title="EP015｜把最小堆装进 SelectLoop：delay 与懒惰删除 (70s)"><span class="ep-badge">EP015</span> <span class="ep-title">把最小堆装进 SelectLoop：delay 与懒惰删除</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP015B_加餐过渡_先别套娃_用普通函数看懂delay续订.mp4" data-ep="EP015B" data-title="EP015B｜先别套娃！普通函数看懂 delay 续订 (68s)"><span class="ep-badge">EP015B</span> <span class="ep-title">先别套娃！普通函数看懂 delay 续订</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP016_用delay递归套娃实现repeat循环定时器.mp4" data-ep="EP016" data-title="EP016｜把 delay 接力封装成 repeat() 循环定时器 (53s)"><span class="ep-badge">EP016</span> <span class="ep-title">把 delay 接力封装成 repeat() 循环定时器</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP017_合拢_心跳超时踢人服务器实战.mp4" data-ep="EP017" data-title="EP017｜【合拢】心跳超时踢人服务器实战 (51s)"><span class="ep-badge">EP017</span> <span class="ep-title">【合拢】心跳超时踢人服务器实战</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP018_组装Worker类_封装监听与SelectLoop.mp4" data-ep="EP018" data-title="EP018｜组装 Worker 类：封装监听与 SelectLoop (36s)"><span class="ep-badge">EP018</span> <span class="ep-title">组装 Worker 类：封装监听与 SelectLoop</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP019_注入三大生命周期钩子_Connect_Message_Close.mp4" data-ep="EP019" data-title="EP019｜注入三大生命周期钩子：Connect / Message / Close (64s)"><span class="ep-badge">EP019</span> <span class="ep-title">注入三大生命周期钩子：Connect / Message / Close</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP020_踩坑_回调抛异常防崩溃_safeCall安全兜底.mp4" data-ep="EP020" data-title="EP020｜【踩坑】回调抛异常防崩溃：safeCall 安全兜底 (68s)"><span class="ep-badge">EP020</span> <span class="ep-title">【踩坑】回调抛异常防崩溃：safeCall 安全兜底</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP021_第1篇合拢_8行代码写高并发广播聊天室.mp4" data-ep="EP021" data-title="EP021｜【第 1 篇合拢】8 行代码写高并发广播聊天室 (67s)"><span class="ep-badge">EP021</span> <span class="ep-title">【第 1 篇合拢】8 行代码写高并发广播聊天室</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP021B_加餐过渡_为什么裸连接玩不转_最小包装盒.mp4" data-ep="EP021B" data-title="EP021B｜为什么裸连接玩不转？先用最小包装盒收拢 (78s)"><span class="ep-badge">EP021B</span> <span class="ep-title">为什么裸连接玩不转？先用最小包装盒收拢</span></a></li>
</ul>

## 第 2 篇：全双工连接层 TcpConnection（EP022 - EP033）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP022_封装TcpConnection_告别裸resource资源句柄.mp4" data-ep="EP022" data-title="EP022｜封装 TcpConnection：把读监听收进连接对象 (55s)"><span class="ep-badge">EP022</span> <span class="ep-title">封装 TcpConnection：把读监听收进连接对象</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP023_用PHP8枚举定义连接状态机ConnectionStatus.mp4" data-ep="EP023" data-title="EP023｜用 PHP 8 Enum 定义连接状态机 ConnectionStatus (49s)"><span class="ep-badge">EP023</span> <span class="ep-title">用 PHP 8 Enum 定义连接状态机 ConnectionStatus</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP024_实现getRemoteAddress与零泄漏destroy.mp4" data-ep="EP024" data-title="EP024｜实现 getRemoteAddress 与零泄漏 destroy() (49s)"><span class="ep-badge">EP024</span> <span class="ep-title">实现 getRemoteAddress 与零泄漏 destroy()</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP025_踩坑_10MB发包丢96_9惨案_非阻塞fwrite真相.mp4" data-ep="EP025" data-title="EP025｜【踩坑】10MB 发包丢 96.9% 惨案：非阻塞 fwrite 真相 (72s)"><span class="ep-badge">EP025</span> <span class="ep-title">【踩坑】10MB 发包丢 96.9% 惨案：非阻塞 fwrite 真相</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP025B_加餐过渡_为什么不能while死磕fwrite.mp4" data-ep="EP025B" data-title="EP025B｜为什么不能 while 死磕 fwrite()？ (69s)"><span class="ep-badge">EP025B</span> <span class="ep-title">为什么不能 while 死磕 fwrite()？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP026_过渡_全局pending与substr跑通10MB零丢失.mp4" data-ep="EP026" data-title="EP026｜【过渡】用全局 $pending + substr 跑通 10MB 零丢失 (66s)"><span class="ep-badge">EP026</span> <span class="ep-title">【过渡】用全局 $pending + substr 跑通 10MB 零丢失</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP027_踩坑_忘卸offWritable狂刷5万次CPU100%.mp4" data-ep="EP027" data-title="EP027｜【踩坑】忘卸 offWritable() 狂刷 5 万次 CPU 100% (58s)"><span class="ep-badge">EP027</span> <span class="ep-title">【踩坑】忘卸 offWritable() 狂刷 5 万次 CPU 100%</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP028_封装TcpConnection_send与快速路径直写.mp4" data-ep="EP028" data-title="EP028｜封装 TcpConnection::send() 与防插队保序 (52s)"><span class="ep-badge">EP028</span> <span class="ep-title">封装 TcpConnection::send() 与防插队保序</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP029_实现baseWrite排空缓冲区并卸载写监听.mp4" data-ep="EP029" data-title="EP029｜实现 baseWrite() 排空缓冲区并卸载写监听 (45s)"><span class="ep-badge">EP029</span> <span class="ep-title">实现 baseWrite() 排空缓冲区并卸载写监听</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP029B_加餐过渡_onBufferFull不会自己刹车_背压联动.mp4" data-ep="EP029B" data-title="EP029B｜onBufferFull 不会自己刹车！看懂背压联动 (52s)"><span class="ep-badge">EP029B</span> <span class="ep-title">onBufferFull 不会自己刹车！看懂背压联动</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP030_防内存爆炸水位线_onBufferFull与onBufferDrain.mp4" data-ep="EP030" data-title="EP030｜防内存爆炸水位线：onBufferFull 与 onBufferDrain (55s)"><span class="ep-badge">EP030</span> <span class="ep-title">防内存爆炸水位线：onBufferFull 与 onBufferDrain</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP031_优雅断连close与强行拔线destroy.mp4" data-ep="EP031" data-title="EP031｜优雅断连 close($data) vs 强行拔线 destroy() (47s)"><span class="ep-badge">EP031</span> <span class="ep-title">优雅断连 close($data) vs 强行拔线 destroy()</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP031B_加餐过渡_while循环读误杀活着客户端惨案.mp4" data-ep="EP031B" data-title="EP031B｜加了 while 读 200KB，为什么活着的连接被误杀？ (64s)"><span class="ep-badge">EP031B</span> <span class="ep-title">加了 while 读 200KB，为什么活着的连接被误杀？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP032_完善baseRead_64KB循环读取与精准判死.mp4" data-ep="EP032" data-title="EP032｜完善 baseRead()：循环读空与 feof() 精准判死 (46s)"><span class="ep-badge">EP032</span> <span class="ep-title">完善 baseRead()：循环读空与 feof() 精准判死</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP033_第2篇合拢_10MB背压与零丢包完整实测.mp4" data-ep="EP033" data-title="EP033｜【第 2 篇合拢】10MB 背压与零丢包完整实测 (55s)"><span class="ep-badge">EP033</span> <span class="ep-title">【第 2 篇合拢】10MB 背压与零丢包完整实测</span></a></li>
</ul>

## 第 3 篇：可插拔协议层 Protocols（EP034 - EP054）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP034_踩坑_粘包与半包双惨案.mp4" data-ep="EP034" data-title="EP034｜【踩坑】粘包与半包双惨案：TCP 是一条自来水管 (79s)"><span class="ep-badge">EP034</span> <span class="ep-title">【踩坑】粘包与半包双惨案：TCP 是一条自来水管</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP035_铺垫_recvBuffer蓄水池与while循环切包.mp4" data-ep="EP035" data-title="EP035｜【铺垫】$recvBuffer 蓄水池与 while 循环切包 (72s)"><span class="ep-badge">EP035</span> <span class="ep-title">【铺垫】$recvBuffer 蓄水池与 while 循环切包</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP036_定义万能协议插槽_ProtocolInterface三大契约.mp4" data-ep="EP036" data-title="EP036｜定义万能协议插槽：ProtocolInterface 三大契约 (41s)"><span class="ep-badge">EP036</span> <span class="ep-title">定义万能协议插槽：ProtocolInterface 三大契约</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP036B_加餐过渡_为什么协议用静态方法与动态类名调用.mp4" data-ep="EP036B" data-title="EP036B｜为什么用静态方法？看懂 ($this-&gt;protocol)::input() (65s)"><span class="ep-badge">EP036B</span> <span class="ep-title">为什么用静态方法？看懂 ($this-&gt;protocol)::input()</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP037_实现TextProtocol并接入连接蓄水池管道.mp4" data-ep="EP037" data-title="EP037｜实现 TextProtocol 并接入连接蓄水池管道 (38s)"><span class="ep-badge">EP037</span> <span class="ep-title">实现 TextProtocol 并接入连接蓄水池管道</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP038_铺垫_零基础二进制课_pack与大端序显微镜.mp4" data-ep="EP038" data-title="EP038｜【铺垫】零基础二进制课：pack(&#x27;N&#x27;) 与大端序显微镜 (51s)"><span class="ep-badge">EP038</span> <span class="ep-title">【铺垫】零基础二进制课：pack(&#x27;N&#x27;) 与大端序显微镜</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP039_FrameProtocol_4B长度头与二进制Body.mp4" data-ep="EP039" data-title="EP039｜FrameProtocol：4B 长度头 + 二进制 Body (53s)"><span class="ep-badge">EP039</span> <span class="ep-title">FrameProtocol：4B 长度头 + 二进制 Body</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP040_踩坑_防恶意超大包攻击_maxPackageSize熔断.mp4" data-ep="EP040" data-title="EP040｜【踩坑】防恶意超大包攻击：maxPackageSize 熔断 (39s)"><span class="ep-badge">EP040</span> <span class="ep-title">【踩坑】防恶意超大包攻击：maxPackageSize 熔断</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP041_铺垫_原生HTTP请求报文逐行认脸.mp4" data-ep="EP041" data-title="EP041｜【铺垫】脱掉 HTTP 神秘外衣：原生请求报文认脸 (54s)"><span class="ep-badge">EP041</span> <span class="ep-title">【铺垫】脱掉 HTTP 神秘外衣：原生请求报文认脸</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP042_HttpProtocol_input上篇_切分GET请求头.mp4" data-ep="EP042" data-title="EP042｜HttpProtocol::input() 上篇：用 \r\n\r\n 切分 GET 头 (43s)"><span class="ep-badge">EP042</span> <span class="ep-title">HttpProtocol::input() 上篇：用 \r\n\r\n 切分 GET 头</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP043_HttpProtocol_input下篇_处理POST半包.mp4" data-ep="EP043" data-title="EP043｜HttpProtocol::input() 下篇：Content-Length 处理 POST 半包 (43s)"><span class="ep-badge">EP043</span> <span class="ep-title">HttpProtocol::input() 下篇：Content-Length 处理 POST 半包</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP044_手写不可变Request类.mp4" data-ep="EP044" data-title="EP044｜手写不可变 Request 类：拆出 Method / Query / Headers (46s)"><span class="ep-badge">EP044</span> <span class="ep-title">手写不可变 Request 类：拆出 Method / Query / Headers</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP045_手写Response与HttpProtocol_encode.mp4" data-ep="EP045" data-title="EP045｜手写 Response 与 HttpProtocol::encode() 响应编码 (33s)"><span class="ep-badge">EP045</span> <span class="ep-title">手写 Response 与 HttpProtocol::encode() 响应编码</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP046_合拢_支持HTTP_KeepAlive长连接复用.mp4" data-ep="EP046" data-title="EP046｜【合拢】支持 HTTP Keep-Alive 长连接复用 (44s)"><span class="ep-badge">EP046</span> <span class="ep-title">【合拢】支持 HTTP Keep-Alive 长连接复用</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP047_WebSocket_101握手暗号_GUID_SHA1_Base64.mp4" data-ep="EP047" data-title="EP047｜WebSocket 101 握手暗号：GUID + SHA1 + Base64 (54s)"><span class="ep-badge">EP047</span> <span class="ep-title">WebSocket 101 握手暗号：GUID + SHA1 + Base64</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP048_协议热切换_为什么需要握手期状态位.mp4" data-ep="EP048" data-title="EP048｜协议热切换：为什么需要握手期状态位 (48s)"><span class="ep-badge">EP048</span> <span class="ep-title">协议热切换：为什么需要握手期状态位</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP049_铺垫_零基础位运算灯泡课_右移_与_异或.mp4" data-ep="EP049" data-title="EP049｜【铺垫】零基础位运算灯泡课：&gt;&gt;、&amp; 与 ^ 异或 (81s)"><span class="ep-badge">EP049</span> <span class="ep-title">【铺垫】零基础位运算灯泡课：&gt;&gt;、&amp; 与 ^ 异或</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP050_解析帧头第1字节_FIN分片与Opcode帧类型.mp4" data-ep="EP050" data-title="EP050｜解析帧头第 1 字节：FIN 分片与 Opcode 帧类型 (48s)"><span class="ep-badge">EP050</span> <span class="ep-title">解析帧头第 1 字节：FIN 分片与 Opcode 帧类型</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP050B_加餐过渡_WS二进制帧布局与pack_n_J速通.mp4" data-ep="EP050B" data-title="EP050B｜WS 二进制帧地图：pack(&#x27;n&#x27;) / &#x27;J&#x27; 与字节布局 (71s)"><span class="ep-badge">EP050B</span> <span class="ep-title">WS 二进制帧地图：pack(&#x27;n&#x27;) / &#x27;J&#x27; 与字节布局</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP051_阶梯长度编码_7bit_126_127与input边界.mp4" data-ep="EP051" data-title="EP051｜阶梯长度编码：7-bit vs 126 (2B) vs 127 (8B) (78s)"><span class="ep-badge">EP051</span> <span class="ep-title">阶梯长度编码：7-bit vs 126 (2B) vs 127 (8B)</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP052_Mask掩码异或解密_为什么浏览器发包必须加密.mp4" data-ep="EP052" data-title="EP052｜Mask 掩码异或解密：为什么浏览器发包必须加密 (53s)"><span class="ep-badge">EP052</span> <span class="ep-title">Mask 掩码异或解密：为什么浏览器发包必须加密</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP053_服务端推送encode_什么时候不加Mask.mp4" data-ep="EP053" data-title="EP053｜服务端推送 encode：什么时候不加 Mask (54s)"><span class="ep-badge">EP053</span> <span class="ep-title">服务端推送 encode：什么时候不加 Mask</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP054_合拢_第3篇终极验收_手写原生WebSocket聊天室.mp4" data-ep="EP054" data-title="EP054｜【合拢】第 3 篇终极验收：手写原生 WebSocket 聊天室 (74s)"><span class="ep-badge">EP054</span> <span class="ep-title">【合拢】第 3 篇终极验收：手写原生 WebSocket 聊天室</span></a></li>
</ul>

## 第 4 篇：多进程、守护化与 Epoll 核动力（EP055 - EP076）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP055_fork返回两次_一次拿子PID一次拿0.mp4" data-ep="EP055" data-title="EP055｜fork() 返回两次：一次拿子 PID，一次拿 0 (54s)"><span class="ep-badge">EP055</span> <span class="ep-title">fork() 返回两次：一次拿子 PID，一次拿 0</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP056_COW写时复制内存隔离.mp4" data-ep="EP056" data-title="EP056｜写时复制 COW 内存隔离：为什么子进程改变量父进程看不见 (45s)"><span class="ep-badge">EP056</span> <span class="ep-title">写时复制 COW 内存隔离：为什么子进程改变量父进程看不见</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP057_踩坑_4次fork炸出16个进程.mp4" data-ep="EP057" data-title="EP057｜【踩坑】for 循环写 4 次 fork()，为什么炸出 16 个进程！ (66s)"><span class="ep-badge">EP057</span> <span class="ep-title">【踩坑】for 循环写 4 次 fork()，为什么炸出 16 个进程！</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP058_惊群前奏_多Worker共享监听FD.mp4" data-ep="EP058" data-title="EP058｜惊群效应前奏：多 Worker 共享同一个监听 FD (48s)"><span class="ep-badge">EP058</span> <span class="ep-title">惊群效应前奏：多 Worker 共享同一个监听 FD</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP059_孤儿与僵尸进程_pcntl_wait收尸.mp4" data-ep="EP059" data-title="EP059｜孤儿进程 vs 僵尸进程：pcntl_wait 替孩子收尸 (51s)"><span class="ep-badge">EP059</span> <span class="ep-title">孤儿进程 vs 僵尸进程：pcntl_wait 替孩子收尸</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP060_Master监工循环_Worker崩溃秒级拉起.mp4" data-ep="EP060" data-title="EP060｜编写 Master 监工循环：Worker 挂了秒级拉起 (47s)"><span class="ep-badge">EP060</span> <span class="ep-title">编写 Master 监工循环：Worker 挂了秒级拉起</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP061_安全降权与SO_REUSEPORT治惊群.mp4" data-ep="EP061" data-title="EP061｜安全降权 posix_setuid 与 SO_REUSEPORT 治惊群 (50s)"><span class="ep-badge">EP061</span> <span class="ep-title">安全降权 posix_setuid 与 SO_REUSEPORT 治惊群</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP062_踩坑_关掉SSH窗口服务跟着灭门_SIGHUP.mp4" data-ep="EP062" data-title="EP062｜【踩坑】为什么关掉 SSH 窗口，服务当场跟着灭门？ (44s)"><span class="ep-badge">EP062</span> <span class="ep-title">【踩坑】为什么关掉 SSH 窗口，服务当场跟着灭门？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP062B_加餐过渡_为什么不能直接调posix_setsid.mp4" data-ep="EP062B" data-title="EP062B｜为什么不能直接调 posix_setsid()？进程组长困境 (51s)"><span class="ep-badge">EP062B</span> <span class="ep-title">为什么不能直接调 posix_setsid()？进程组长困境</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP063_两次fork与posix_setsid彻底脱离终端.mp4" data-ep="EP063" data-title="EP063｜两次 fork() + posix_setsid()：彻底脱离终端成为幽灵 (67s)"><span class="ep-badge">EP063</span> <span class="ep-title">两次 fork() + posix_setsid()：彻底脱离终端成为幽灵</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP064_重定向012标准流到黑洞与日志.mp4" data-ep="EP064" data-title="EP064｜重定向 0/1/2 标准流：STDIN / STDOUT / STDERR 归宿 (48s)"><span class="ep-badge">EP064</span> <span class="ep-title">重定向 0/1/2 标准流：STDIN / STDOUT / STDERR 归宿</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP065_master_pid文件锁防重启动.mp4" data-ep="EP065" data-title="EP065｜master.pid 文件锁防重启动：flock + 存活探测 (48s)"><span class="ep-badge">EP065</span> <span class="ep-title">master.pid 文件锁防重启动：flock + 存活探测</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP066_合拢_CommandRunner_CLI控制台.mp4" data-ep="EP066" data-title="EP066｜【合拢】手写 CommandRunner：start -d / stop / reload / status (43s)"><span class="ep-badge">EP066</span> <span class="ep-title">【合拢】手写 CommandRunner：start -d / stop / reload / status</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP066B_加餐过渡_为什么需要pcntl_async_signals.mp4" data-ep="EP066B" data-title="EP066B｜信号怎么打断睡眠？async_signals 与 dispatch 对比 (52s)"><span class="ep-badge">EP066B</span> <span class="ep-title">信号怎么打断睡眠？async_signals 与 dispatch 对比</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP067_异步信号pcntl_async_signals与EINTR防护.mp4" data-ep="EP067" data-title="EP067｜pcntl_async_signals(true)：异步信号与 EINTR 防护 (49s)"><span class="ep-badge">EP067</span> <span class="ep-title">pcntl_async_signals(true)：异步信号与 EINTR 防护</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP068_踩坑_Master提前require业务类导致热更新失效.mp4" data-ep="EP068" data-title="EP068｜【踩坑】Master 提前 require 业务类：reload 失效与类重定义 (71s)"><span class="ep-badge">EP068</span> <span class="ep-title">【踩坑】Master 提前 require 业务类：reload 失效与类重定义</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP069_优雅热更新reload_老退新上零断线.mp4" data-ep="EP069" data-title="EP069｜优雅热更新 reload：老员工干完活退，新员工加载新代码上 (44s)"><span class="ep-badge">EP069</span> <span class="ep-title">优雅热更新 reload：老员工干完活退，新员工加载新代码上</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP070_优雅停机stop_g_先关大门排空0丢包.mp4" data-ep="EP070" data-title="EP070｜优雅停机 stop -g：先关大门再排空队列，0 丢包断电 (44s)"><span class="ep-badge">EP070</span> <span class="ep-title">优雅停机 stop -g：先关大门再排空队列，0 丢包断电</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP071_实时status看板_PID内存与QPS透视.mp4" data-ep="EP071" data-title="EP071｜ModernWorker 实时 status 看板：PID / 内存 / QPS 全透视 (43s)"><span class="ep-badge">EP071</span> <span class="ep-title">ModernWorker 实时 status 看板：PID / 内存 / QPS 全透视</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP072_踩坑_select超过1024个FD崩溃原因.mp4" data-ep="EP072" data-title="EP072｜【踩坑】stream_select() 超过 1024 连接当场崩溃的底层原因 (70s)"><span class="ep-badge">EP072</span> <span class="ep-title">【踩坑】stream_select() 超过 1024 连接当场崩溃的底层原因</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP073_红黑树与就绪链表_为什么Epoll万级连接O1.mp4" data-ep="EP073" data-title="EP073｜红黑树 + 就绪链表：为什么 Epoll 万级连接依然 O(1)？ (62s)"><span class="ep-badge">EP073</span> <span class="ep-title">红黑树 + 就绪链表：为什么 Epoll 万级连接依然 O(1)？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP074_编写EpollLoop_无缝替换EventLoopInterface引擎.mp4" data-ep="EP074" data-title="EP074｜编写 EpollLoop：零改动替换 EventLoopInterface 引擎 (48s)"><span class="ep-badge">EP074</span> <span class="ep-title">编写 EpollLoop：零改动替换 EventLoopInterface 引擎</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP075_踩坑_忘记存allEvents回调被GC销毁.mp4" data-ep="EP075" data-title="EP075｜【踩坑】忘记把事件存进 $allEvents，回调居然直接被 GC 销毁！ (60s)"><span class="ep-badge">EP075</span> <span class="ep-title">【踩坑】忘记把事件存进 $allEvents，回调居然直接被 GC 销毁！</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP076_合拢_Select与Epoll性能横评及第4篇收官.mp4" data-ep="EP076" data-title="EP076｜【合拢】Select vs Epoll 万级并发横评：第 4 篇完美收官 (65s)"><span class="ep-badge">EP076</span> <span class="ep-title">【合拢】Select vs Epoll 万级并发横评：第 4 篇完美收官</span></a></li>
</ul>

## 第 5 篇：PHP Fiber 协程化与 TLS 加密（EP077 - EP093）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP077_Fiber冻结魔法_独立调用栈.mp4" data-ep="EP077" data-title="EP077｜Fiber 冻结魔法：比生成器 yield 强在哪？ (46s)"><span class="ep-badge">EP077</span> <span class="ep-title">Fiber 冻结魔法：比生成器 yield 强在哪？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP078_Fiber双向传值接力_suspend与resume.mp4" data-ep="EP078" data-title="EP078｜双向传值接力：Fiber::suspend() 与 $fiber-&gt;resume() (46s)"><span class="ep-badge">EP078</span> <span class="ep-title">双向传值接力：Fiber::suspend() 与 $fiber-&gt;resume()</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP078B_加餐过渡_Fiber_getCurrent与spawn原理.mp4" data-ep="EP078B" data-title="EP078B｜Fiber::getCurrent() 与 Coroutine::spawn() (46s)"><span class="ep-badge">EP078B</span> <span class="ep-title">Fiber::getCurrent() 与 Coroutine::spawn()</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP079_手写Coroutine_sleep不卡死事件循环.mp4" data-ep="EP079" data-title="EP079｜手写 Coroutine::sleep()：复用 delay() 实现非阻塞睡眠 (45s)"><span class="ep-badge">EP079</span> <span class="ep-title">手写 Coroutine::sleep()：复用 delay() 实现非阻塞睡眠</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP080_每请求自动包进Fiber告别回调地狱.mp4" data-ep="EP080" data-title="EP080｜每个请求自动包进 Fiber：告别回调地狱 (36s)"><span class="ep-badge">EP080</span> <span class="ep-title">每个请求自动包进 Fiber：告别回调地狱</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP081_铺垫_STREAM_CLIENT_ASYNC_CONNECT异步建连.mp4" data-ep="EP081" data-title="EP081｜【铺垫】STREAM_CLIENT_ASYNC_CONNECT：非阻塞异步建连 (42s)"><span class="ep-badge">EP081</span> <span class="ep-title">【铺垫】STREAM_CLIENT_ASYNC_CONNECT：非阻塞异步建连</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP082_手写AsyncTcpClient异步客户端.mp4" data-ep="EP082" data-title="EP082｜手写 AsyncTcpClient：事件驱动的异步上游客户端 (38s)"><span class="ep-badge">EP082</span> <span class="ep-title">手写 AsyncTcpClient：事件驱动的异步上游客户端</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP083_把AsyncTcpClient包装成协程await.mp4" data-ep="EP083" data-title="EP083｜把 AsyncTcpClient 包装成协程 await() API (38s)"><span class="ep-badge">EP083</span> <span class="ep-title">把 AsyncTcpClient 包装成协程 await() API</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP084_手写Redis_RESP协议编解码器.mp4" data-ep="EP084" data-title="EP084｜手写 Redis RESP 协议解析器：+OK / $len / *N (59s)"><span class="ep-badge">EP084</span> <span class="ep-title">手写 Redis RESP 协议解析器：+OK / $len / *N</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP085_协程RedisClient并发200次读写实测.mp4" data-ep="EP085" data-title="EP085｜协程 RedisClient：同步代码并发 200 次读写实测 (34s)"><span class="ep-badge">EP085</span> <span class="ep-title">协程 RedisClient：同步代码并发 200 次读写实测</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP086_踩坑_多协程共用1条连接张冠李戴串台.mp4" data-ep="EP086" data-title="EP086｜【踩坑】多协程共用 1 条 Redis 连接，为什么会张冠李戴串台！ (58s)"><span class="ep-badge">EP086</span> <span class="ep-title">【踩坑】多协程共用 1 条 Redis 连接，为什么会张冠李戴串台！</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP087_手写协程安全连接池ConnectionPool.mp4" data-ep="EP087" data-title="EP087｜手写协程连接池 ConnectionPool：借还闭环零串台 (54s)"><span class="ep-badge">EP087</span> <span class="ep-title">手写协程连接池 ConnectionPool：借还闭环零串台</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP088_TLS自签名证书与SSL上下文配置.mp4" data-ep="EP088" data-title="EP088｜TLS 自签名证书与 stream_context_create SSL 上下文 (42s)"><span class="ep-badge">EP088</span> <span class="ep-title">TLS 自签名证书与 stream_context_create SSL 上下文</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP088B_加餐过渡_为什么不用ssl直接监听.mp4" data-ep="EP088B" data-title="EP088B｜为什么不用 ssl:// 监听？看懂非阻塞 TLS 握手 (50s)"><span class="ep-badge">EP088B</span> <span class="ep-title">为什么不用 ssl:// 监听？看懂非阻塞 TLS 握手</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP089_铺垫_enable_crypto非阻塞返回值陷阱.mp4" data-ep="EP089" data-title="EP089｜【铺垫】stream_socket_enable_crypto() 非阻塞握手返回值陷阱 (59s)"><span class="ep-badge">EP089</span> <span class="ep-title">【铺垫】stream_socket_enable_crypto() 非阻塞握手返回值陷阱</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP090_实现doSslHandshake异步状态机_HTTPS与WSS.mp4" data-ep="EP090" data-title="EP090｜实现 doSslHandshake() 状态机：一键启用 HTTPS / WSS (44s)"><span class="ep-badge">EP090</span> <span class="ep-title">实现 doSslHandshake() 状态机：一键启用 HTTPS / WSS</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP091_慢连接攻击Slowloris与包头超时防御.mp4" data-ep="EP091" data-title="EP091｜慢连接攻击 Slowloris 防御：包头超时踢人机制 (39s)"><span class="ep-badge">EP091</span> <span class="ep-title">慢连接攻击 Slowloris 防御：包头超时踢人机制</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP092_反向代理真实IP透传与XFF防伪造.mp4" data-ep="EP092" data-title="EP092｜反向代理真实 IP 透传：X-Forwarded-For 与信任白名单 (45s)"><span class="ep-badge">EP092</span> <span class="ep-title">反向代理真实 IP 透传：X-Forwarded-For 与信任白名单</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP093_合拢_PSR4规范与composer总装验收.mp4" data-ep="EP093" data-title="EP093｜【合拢】PSR-4 + composer.json 规范总装：第 5 篇收官 (46s)"><span class="ep-badge">EP093</span> <span class="ep-title">【合拢】PSR-4 + composer.json 规范总装：第 5 篇收官</span></a></li>
</ul>

## 第 6 篇：跨进程通信与分布式网关 ModernGateway（EP094 - EP106）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP094_踩坑_4进程聊天室广播失灵惨案.mp4" data-ep="EP094" data-title="EP094｜【踩坑】4 进程聊天室广播失灵：为什么一半人收不到消息？ (47s)"><span class="ep-badge">EP094</span> <span class="ep-title">【踩坑】4 进程聊天室广播失灵：为什么一半人收不到消息？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP095_手写Channel内部邮局PubSub总线.mp4" data-ep="EP095" data-title="EP095｜手写 Channel 内部邮局：Pub/Sub 跨进程订阅总线 (35s)"><span class="ep-badge">EP095</span> <span class="ep-title">手写 Channel 内部邮局：Pub/Sub 跨进程订阅总线</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP096_合拢_Channel打破单进程壁垒全服广播.mp4" data-ep="EP096" data-title="EP096｜【合拢】用 Channel 打破单进程壁垒：全服跨进程精准广播 (37s)"><span class="ep-badge">EP096</span> <span class="ep-title">【合拢】用 Channel 打破单进程壁垒：全服跨进程精准广播</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP097_十万连接reload雪崩推演_网关业务分离.mp4" data-ep="EP097" data-title="EP097｜十万连接下 reload 雪崩推演：为什么要网关与业务分离？ (56s)"><span class="ep-badge">EP097</span> <span class="ep-title">十万连接下 reload 雪崩推演：为什么要网关与业务分离？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP098_硬编码双进程极简网关原型.mp4" data-ep="EP098" data-title="EP098｜硬编码双进程极简网关原型：Gateway 与 Business 首次握手 (37s)"><span class="ep-badge">EP098</span> <span class="ep-title">硬编码双进程极简网关原型：Gateway 与 Business 首次握手</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP099_业务热更新零断线实测.mp4" data-ep="EP099" data-title="EP099｜业务热更新零断线实测：杀掉 BusinessWorker 用户纹丝不动！ (38s)"><span class="ep-badge">EP099</span> <span class="ep-title">业务热更新零断线实测：杀掉 BusinessWorker 用户纹丝不动！</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP100_全局唯一client_id编解码_精准寻址.mp4" data-ep="EP100" data-title="EP100｜全局唯一 client_id 编解码：IP + Port + ConnId 精准寻址 (55s)"><span class="ep-badge">EP100</span> <span class="ep-title">全局唯一 client_id 编解码：IP + Port + ConnId 精准寻址</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP101_GatewayProtocol内部二进制协议.mp4" data-ep="EP101" data-title="EP101｜GatewayProtocol 内部二进制协议：4B总长 + cmd + client_id + Body (46s)"><span class="ep-badge">EP101</span> <span class="ep-title">GatewayProtocol 内部二进制协议：4B总长 + cmd + client_id + Body</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP102_Register注册中心服务发现与心跳剔除.mp4" data-ep="EP102" data-title="EP102｜Register 注册中心：集群服务发现与节点心跳剔除 (38s)"><span class="ep-badge">EP102</span> <span class="ep-title">Register 注册中心：集群服务发现与节点心跳剔除</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP103_Gateway接入层核心_持连接与原路回递.mp4" data-ep="EP103" data-title="EP103｜Gateway 接入层核心：扛连接、保心跳与按 client_id 原路回递 (39s)"><span class="ep-badge">EP103</span> <span class="ep-title">Gateway 接入层核心：扛连接、保心跳与按 client_id 原路回递</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP104_BusinessWorker核心_直连全量Gateway集群.mp4" data-ep="EP104" data-title="EP104｜BusinessWorker 核心：直连全量 Gateway 集群 (39s)"><span class="ep-badge">EP104</span> <span class="ep-title">BusinessWorker 核心：直连全量 Gateway 集群</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP104B_加餐过渡_BusinessWorker无状态与Session存储.mp4" data-ep="EP104B" data-title="EP104B｜BusinessWorker 无状态之谜：$_SESSION 与路由表存哪？ (48s)"><span class="ep-badge">EP104B</span> <span class="ep-title">BusinessWorker 无状态之谜：$_SESSION 与路由表存哪？</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP105_会话持久化与bindUid精准推送.mp4" data-ep="EP105" data-title="EP105｜会话持久化 $_SESSION 与 uid 绑定：Gateway::bindUid / sendToUid (47s)"><span class="ep-badge">EP105</span> <span class="ep-title">会话持久化 $_SESSION 与 uid 绑定：Gateway::bindUid / sendToUid</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP106_合拢_分布式网关集群验收及第6篇收官.mp4" data-ep="EP106" data-title="EP106｜【合拢】多节点分布网关集群验收：第 6 篇完美收官 (51s)"><span class="ep-badge">EP106</span> <span class="ep-title">【合拢】多节点分布网关集群验收：第 6 篇完美收官</span></a></li>
</ul>

## 第 7 篇：实时弹幕综合实战与万级并发压测（EP107 - EP112）

<ul class="ep-grid">
  <li><a class="ep-item" href="handson-video/out/EP107_实时弹幕系统骨架搭建.mp4" data-ep="EP107" data-title="EP107｜实时弹幕系统骨架：WebSocket + Gateway + 路由分发 (39s)"><span class="ep-badge">EP107</span> <span class="ep-title">实时弹幕系统骨架：WebSocket + Gateway + 路由分发</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP108_弹幕房间群推与在线统计.mp4" data-ep="EP108" data-title="EP108｜弹幕房间群推与实时在线统计：joinGroup / sendToGroup (42s)"><span class="ep-badge">EP108</span> <span class="ep-title">弹幕房间群推与实时在线统计：joinGroup / sendToGroup</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP109_弹幕协程Redis异步落库与连接池.mp4" data-ep="EP109" data-title="EP109｜协程 Redis 异步落库：连接池限流与零串台入库 (37s)"><span class="ep-badge">EP109</span> <span class="ep-title">协程 Redis 异步落库：连接池限流与零串台入库</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP110_生产兜底_异常日志与systemd托管.mp4" data-ep="EP110" data-title="EP110｜生产级兜底：异常捕获、JSON 日志与 systemd 守护托管 (41s)"><span class="ep-badge">EP110</span> <span class="ep-title">生产级兜底：异常捕获、JSON 日志与 systemd 守护托管</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP111_压测读数指南_QPS与P99尾延迟.mp4" data-ep="EP111" data-title="EP111｜压测读数指南：QPS、P99 尾延迟与“假高并发”识破 (48s)"><span class="ep-badge">EP111</span> <span class="ep-title">压测读数指南：QPS、P99 尾延迟与“假高并发”识破</span></a></li>
  <li><a class="ep-item" href="handson-video/out/EP112_终极收官_万级并发横评与112集毕业.mp4" data-ep="EP112" data-title="EP112｜【终极收官】Select vs Epoll vs 原版 Workerman 万级并发横评（112 集圆满毕业！） (76s)"><span class="ep-badge">EP112</span> <span class="ep-title">【终极收官】Select vs Epoll vs 原版 Workerman 万级并发横评（112 集圆满毕业！）</span></a></li>
</ul>
