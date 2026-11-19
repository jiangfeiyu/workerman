# 🟥 《Redis 7.2 源码剖析与手写 MiniRedis》主线视频课（已更 46 支）

> 当前已上线 **46 支 C 系列正式主线视频（总时长 172.9 分钟）**，覆盖 **C 语言与内存基石（C001–C022）**、**核心数据结构底层（C094–C102C、C121–C122）** 与 **Linux 系统编程进程内存（C139–C147）**。点击下方任意集数即可在顶部播放器播放；手机端支持**双击画面暂停/继续**、倍速调节与自动连播。

<div class="video-card ep-player-card" id="ep-player-card">
  <div class="video-card-header">
    <span id="ep-current-title">🎬 C001｜MiniRedis 的最终目标怎样拆成存储、命令、网络和恢复依赖？ (188s)</span>
    <div class="ep-player-actions">
      <button type="button" class="ep-nav-btn ep-play-btn" id="ep-play-btn">▶ 播放</button>
      <button type="button" class="ep-nav-btn" id="ep-speed-btn">1x</button>
      <button type="button" class="ep-nav-btn" id="ep-prev-btn">⬅ 上一集</button>
      <button type="button" class="ep-nav-btn" id="ep-next-btn">下一集 ➡</button>
      <label class="ep-autoplay-label"><input type="checkbox" id="ep-autoplay" checked /> 连播</label>
      <a class="ep-raw-link" id="ep-download-link" href="redis/out/C001-formal-v1.mp4" target="_blank" rel="noopener">新窗口/下载</a>
    </div>
  </div>
  <div class="ep-video-stage">
    <video id="ep-player" controls preload="metadata" playsinline webkit-playsinline x5-playsinline src="redis/out/C001-formal-v1.mp4"></video>
    <div class="ep-gesture-toast" aria-hidden="true"></div>
  </div>
</div>

## 第一阶段｜C 语言与内存基石（C001–C022）

### 模块 1：C 起点诊断与阅读工具（C001 - C008）

<ul class="ep-grid">
  <li><a class="ep-item active" href="redis/out/C001-formal-v1.mp4" data-ep="C001" data-title="C001｜MiniRedis 的最终目标怎样拆成存储、命令、网络和恢复依赖？ (188s)"><span class="ep-badge">C001</span> <span class="ep-title">MiniRedis 的最终目标怎样拆成存储、命令、网络和恢复依赖？</span></a></li>
  <li><a class="ep-item" href="redis/out/C002-formal-v1.mp4" data-ep="C002" data-title="C002｜用一个短函数诊断已会的变量、分支、循环和返回值。 (223s)"><span class="ep-badge">C002</span> <span class="ep-title">用一个短函数诊断已会的变量、分支、循环和返回值。</span></a></li>
  <li><a class="ep-item" href="redis/out/C003-formal-v1.mp4" data-ep="C003" data-title="C003｜编译错误、链接错误、运行失败，怎样区分发生在哪一层？ (221s)"><span class="ep-badge">C003</span> <span class="ep-title">编译错误、链接错误、运行失败，怎样区分发生在哪一层？</span></a></li>
  <li><a class="ep-item" href="redis/out/C004-formal-v1.mp4" data-ep="C004" data-title="C004｜.h 的声明和 .c 的实现，怎样约定同一个函数接口？ (200s)"><span class="ep-badge">C004</span> <span class="ep-title">.h 的声明和 .c 的实现，怎样约定同一个函数接口？</span></a></li>
  <li><a class="ep-item" href="redis/out/C005-formal-v1.mp4" data-ep="C005" data-title="C005｜两个 .c 文件怎样通过声明调用同一个函数？ (185s)"><span class="ep-badge">C005</span> <span class="ep-title">两个 .c 文件怎样通过声明调用同一个函数？</span></a></li>
  <li><a class="ep-item" href="redis/out/C006-formal-v1.mp4" data-ep="C006" data-title="C006｜编译警告为什么值得先解决，而不是用强制转换压掉？ (192s)"><span class="ep-badge">C006</span> <span class="ep-title">编译警告为什么值得先解决，而不是用强制转换压掉？</span></a></li>
  <li><a class="ep-item" href="redis/out/C007-formal-v1.mp4" data-ep="C007" data-title="C007｜断点、单步和调用栈，怎样定位一次值发生变化的位置？ (216s)"><span class="ep-badge">C007</span> <span class="ep-title">断点、单步和调用栈，怎样定位一次值发生变化的位置？</span></a></li>
  <li><a class="ep-item" href="redis/out/C008-formal-v1.mp4" data-ep="C008" data-title="C008｜合拢：对一个小函数完成修改、运行和失败定位。 (214s)"><span class="ep-badge">C008</span> <span class="ep-title">合拢：对一个小函数完成修改、运行和失败定位。</span></a></li>
</ul>

### 模块 2：整数、字节与位标记（C009 - C019C）

<ul class="ep-grid">
  <li><a class="ep-item" href="redis/out/C009-formal-v1.mp4" data-ep="C009" data-title="C009｜本机一个字节有多少位，sizeof 返回的单位是什么？ (192s)"><span class="ep-badge">C009</span> <span class="ep-title">本机一个字节有多少位，sizeof 返回的单位是什么？</span></a></li>
  <li><a class="ep-item" href="redis/out/C010-formal-v1.mp4" data-ep="C010" data-title="C010｜int 的宽度和固定宽度整数类型，为什么要区分？ (200s)"><span class="ep-badge">C010</span> <span class="ep-title">int 的宽度和固定宽度整数类型，为什么要区分？</span></a></li>
  <li><a class="ep-item" href="redis/out/C011-formal-v1.mp4" data-ep="C011" data-title="C011｜signed 与 unsigned 比较时，负数为什么可能变成大数？ (204s)"><span class="ep-badge">C011</span> <span class="ep-title">signed 与 unsigned 比较时，负数为什么可能变成大数？</span></a></li>
  <li><a class="ep-item" href="redis/out/C012-formal-v1.mp4" data-ep="C012" data-title="C012｜size_t 表示长度时，怎样避免和负数混用？ (210s)"><span class="ep-badge">C012</span> <span class="ep-title">size_t 表示长度时，怎样避免和负数混用？</span></a></li>
  <li><a class="ep-item" href="redis/out/C013-formal-v1.mp4" data-ep="C013" data-title="C013｜二进制、十六进制与同一字节数值，怎样互相对应？ (217s)"><span class="ep-badge">C013</span> <span class="ep-title">二进制、十六进制与同一字节数值，怎样互相对应？</span></a></li>
  <li><a class="ep-item" href="redis/out/C014-formal-v1.mp4" data-ep="C014" data-title="C014｜按位与掩码怎样取出一组标志位？ (215s)"><span class="ep-badge">C014</span> <span class="ep-title">按位与掩码怎样取出一组标志位？</span></a></li>
  <li><a class="ep-item" href="redis/out/C015-formal-v1.mp4" data-ep="C015" data-title="C015｜左移、右移怎样移动标志，移位范围为什么要受限？ (220s)"><span class="ep-badge">C015</span> <span class="ep-title">左移、右移怎样移动标志，移位范围为什么要受限？</span></a></li>
  <li><a class="ep-item" href="redis/out/C016-formal-v1.mp4" data-ep="C016" data-title="C016｜按位或怎样把多个已定义标志组合起来？ (219s)"><span class="ep-badge">C016</span> <span class="ep-title">按位或怎样把多个已定义标志组合起来？</span></a></li>
  <li><a class="ep-item" href="redis/out/C017-formal-v1.mp4" data-ep="C017" data-title="C017｜逻辑非与按位取反，为什么会得到不同的位模式？ (225s)"><span class="ep-badge">C017</span> <span class="ep-title">逻辑非与按位取反，为什么会得到不同的位模式？</span></a></li>
  <li><a class="ep-item" href="redis/out/C018-formal-v1.mp4" data-ep="C018" data-title="C018｜多字节整数的字节序，和数字书写顺序有什么关系？ (231s)"><span class="ep-badge">C018</span> <span class="ep-title">多字节整数的字节序，和数字书写顺序有什么关系？</span></a></li>
  <li><a class="ep-item" href="redis/out/C019A-formal-v1.mp4" data-ep="C019A" data-title="C019A｜长度加法：先检查余量 (192s)"><span class="ep-badge">C019A</span> <span class="ep-title">长度加法：先检查余量</span></a></li>
  <li><a class="ep-item" href="redis/out/C019B-formal-v1.mp4" data-ep="C019B" data-title="C019B｜长度乘法：先分零再检查 (184s)"><span class="ep-badge">C019B</span> <span class="ep-title">长度乘法：先分零再检查</span></a></li>
  <li><a class="ep-item" href="redis/out/C019C-formal-v1.mp4" data-ep="C019C" data-title="C019C｜合拢：长度与flags (199s)"><span class="ep-badge">C019C</span> <span class="ep-title">合拢：长度与flags</span></a></li>
</ul>

### 模块 3：对象地址与一级指针（C020 - C022）

<ul class="ep-grid">
  <li><a class="ep-item" href="redis/out/C020-formal-v1.mp4" data-ep="C020" data-title="C020｜一个 C 对象的值和它所在的地址，分别是什么？ (210s)"><span class="ep-badge">C020</span> <span class="ep-title">一个 C 对象的值和它所在的地址，分别是什么？</span></a></li>
  <li><a class="ep-item" href="redis/out/C021-formal-v1.mp4" data-ep="C021" data-title="C021｜指针变量自己的地址，与它保存的地址，为什么不是一回事？ (204s)"><span class="ep-badge">C021</span> <span class="ep-title">指针变量自己的地址，与它保存的地址，为什么不是一回事？</span></a></li>
  <li><a class="ep-item" href="redis/out/C022-formal-v1.mp4" data-ep="C022" data-title="C022｜取地址和解引用，怎样把变量与指针连接起来？ (212s)"><span class="ep-badge">C022</span> <span class="ep-title">取地址和解引用，怎样把变量与指针连接起来？</span></a></li>
</ul>

## 第二阶段｜核心数据结构底层（C094–C122）

### 模块 9：复杂度、连续数组与动态容量（C094 - C102C）

<ul class="ep-grid">
  <li><a class="ep-item" href="redis/out/C094-formal-v1.mp4" data-ep="C094" data-title="C094｜操作次数怎样随输入规模变化，为什么先分析量级？ (259s)"><span class="ep-badge">C094</span> <span class="ep-title">操作次数怎样随输入规模变化，为什么先分析量级？</span></a></li>
  <li><a class="ep-item" href="redis/out/C095-formal-v1.mp4" data-ep="C095" data-title="C095｜O(1) 与 O(n) 怎样描述操作量随输入规模变化？ (280s)"><span class="ep-badge">C095</span> <span class="ep-title">O(1) 与 O(n) 怎样描述操作量随输入规模变化？</span></a></li>
  <li><a class="ep-item" href="redis/out/C096-formal-v1.mp4" data-ep="C096" data-title="C096｜摊还成本为什么不能当作每一次操作的耗时上限？ (272s)"><span class="ep-badge">C096</span> <span class="ep-title">摊还成本为什么不能当作每一次操作的耗时上限？</span></a></li>
  <li><a class="ep-item" href="redis/out/C097-formal-v1.mp4" data-ep="C097" data-title="C097｜连续数组按下标访问时，怎样算出元素地址？ (245s)"><span class="ep-badge">C097</span> <span class="ep-title">连续数组按下标访问时，怎样算出元素地址？</span></a></li>
  <li><a class="ep-item" href="redis/out/C098-formal-v1.mp4" data-ep="C098" data-title="C098｜数组中间插入或删除，为什么需要移动后面的元素？ (276s)"><span class="ep-badge">C098</span> <span class="ep-title">数组中间插入或删除，为什么需要移动后面的元素？</span></a></li>
  <li><a class="ep-item" href="redis/out/C099-formal-v1.mp4" data-ep="C099" data-title="C099｜动态数组怎样区分已使用长度与可分配容量？ (271s)"><span class="ep-badge">C099</span> <span class="ep-title">动态数组怎样区分已使用长度与可分配容量？</span></a></li>
  <li><a class="ep-item" href="redis/out/C100-formal-v1.mp4" data-ep="C100" data-title="C100｜容量逐次加一，为什么会造成大量重复复制？ (265s)"><span class="ep-badge">C100</span> <span class="ep-title">容量逐次加一，为什么会造成大量重复复制？</span></a></li>
  <li><a class="ep-item" href="redis/out/C101-formal-v1.mp4" data-ep="C101" data-title="C101｜倍增扩容怎样分摊搬移成本，仍有哪些单次代价？ (274s)"><span class="ep-badge">C101</span> <span class="ep-title">倍增扩容怎样分摊搬移成本，仍有哪些单次代价？</span></a></li>
  <li><a class="ep-item" href="redis/out/C102A-formal-v1.mp4" data-ep="C102A" data-title="C102A｜合拢：实现带容量边界和失败保持的动态字节缓冲。 · A 容量准备 (274s)"><span class="ep-badge">C102A</span> <span class="ep-title">合拢：实现带容量边界和失败保持的动态字节缓冲。 · A 容量准备</span></a></li>
  <li><a class="ep-item" href="redis/out/C102B-formal-v1.mp4" data-ep="C102B" data-title="C102B｜合拢：实现带容量边界和失败保持的动态字节缓冲。 · B 追加与销毁 (259s)"><span class="ep-badge">C102B</span> <span class="ep-title">合拢：实现带容量边界和失败保持的动态字节缓冲。 · B 追加与销毁</span></a></li>
  <li><a class="ep-item" href="redis/out/C102C-formal-v1.mp4" data-ep="C102C" data-title="C102C｜合拢：实现带容量边界和失败保持的动态字节缓冲。 · C 完整入口 (289s)"><span class="ep-badge">C102C</span> <span class="ep-title">合拢：实现带容量边界和失败保持的动态字节缓冲。 · C 完整入口</span></a></li>
</ul>

### 模块 12：哈希值、桶与冲突处理（C121 - C122）

<ul class="ep-grid">
  <li><a class="ep-item" href="redis/out/C121-formal-v1.mp4" data-ep="C121" data-title="C121｜线性查找为什么会比较大量无关的键？ (241s)"><span class="ep-badge">C121</span> <span class="ep-title">线性查找为什么会比较大量无关的键？</span></a></li>
  <li><a class="ep-item" href="redis/out/C122-formal-v1.mp4" data-ep="C122" data-title="C122｜哈希函数怎样把键字节映射成一个数值？ (258s)"><span class="ep-badge">C122</span> <span class="ep-title">哈希函数怎样把键字节映射成一个数值？</span></a></li>
</ul>

## 第三阶段｜Linux 系统编程与进程内存（C139–C147）

### 模块 14：进程、虚拟地址与内存映射（C139 - C147）

<ul class="ep-grid">
  <li><a class="ep-item" href="redis/out/C139-formal-v1.mp4" data-ep="C139" data-title="C139｜程序文件和运行中的进程，为什么不是同一件东西？ (211s)"><span class="ep-badge">C139</span> <span class="ep-title">程序文件和运行中的进程，为什么不是同一件东西？</span></a></li>
  <li><a class="ep-item" href="redis/out/C140-formal-v1.mp4" data-ep="C140" data-title="C140｜PID 怎样标识一次进程运行，为什么不是代码文件身份？ (225s)"><span class="ep-badge">C140</span> <span class="ep-title">PID 怎样标识一次进程运行，为什么不是代码文件身份？</span></a></li>
  <li><a class="ep-item" href="redis/out/C141-formal-v1.mp4" data-ep="C141" data-title="C141｜虚拟地址为什么不能直接当作物理内存位置？ (216s)"><span class="ep-badge">C141</span> <span class="ep-title">虚拟地址为什么不能直接当作物理内存位置？</span></a></li>
  <li><a class="ep-item" href="redis/out/C142-formal-v1.mp4" data-ep="C142" data-title="C142｜同一数值的地址出现在两个进程中，为什么未必指同一对象？ (218s)"><span class="ep-badge">C142</span> <span class="ep-title">同一数值的地址出现在两个进程中，为什么未必指同一对象？</span></a></li>
  <li><a class="ep-item" href="redis/out/C143-formal-v1.mp4" data-ep="C143" data-title="C143｜栈、堆和静态存储区，怎样对应已经学过的生命周期？ (235s)"><span class="ep-badge">C143</span> <span class="ep-title">栈、堆和静态存储区，怎样对应已经学过的生命周期？</span></a></li>
  <li><a class="ep-item" href="redis/out/C144-formal-v1.mp4" data-ep="C144" data-title="C144｜进程地址空间的映射范围，怎样帮助定位非法访问？ (227s)"><span class="ep-badge">C144</span> <span class="ep-title">进程地址空间的映射范围，怎样帮助定位非法访问？</span></a></li>
  <li><a class="ep-item" href="redis/out/C145-formal-v1.mp4" data-ep="C145" data-title="C145｜页面与页粒度映射，为什么不同于某个 C 对象的大小？ (203s)"><span class="ep-badge">C145</span> <span class="ep-title">页面与页粒度映射，为什么不同于某个 C 对象的大小？</span></a></li>
  <li><a class="ep-item" href="redis/out/C146-formal-v1.mp4" data-ep="C146" data-title="C146｜用户态和内核态，为什么通过系统调用边界交互？ (201s)"><span class="ep-badge">C146</span> <span class="ep-title">用户态和内核态，为什么通过系统调用边界交互？</span></a></li>
  <li><a class="ep-item" href="redis/out/C147-formal-v1.mp4" data-ep="C147" data-title="C147｜进程退出时，操作系统回收什么，应用又应主动清理什么？ (198s)"><span class="ep-badge">C147</span> <span class="ep-title">进程退出时，操作系统回收什么，应用又应主动清理什么？</span></a></li>
</ul>
