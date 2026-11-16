import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, CpuGauge, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
  WaterTankBar,
} from '../../components/StagePrimitives';

export const Stage07_01: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({
    frame: Math.max(0, localFrame - 12),
    fps,
    config: SPRING_POP,
  });

  if (visual === 'resource-pain') {
    return (
      <StageContainer
        banner="原生句柄痛点：PHP resource 不是对象，无法挂载 $conn->uid 等任何业务属性！"
        conceptPill="resource 句柄局限"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="痛点演示"
            width={580}
            lines={[
              '$worker->onMessage = function($conn, $msg) {',
              '    // var_dump($conn) -> resource(5) of type (stream)',
              '    $conn->uid = 10086; // 💥 报错!',
              '};',
            ]}
            activeLine={2}
          />
          <TerminalPanel
            title="PHP 运行时报错"
            width={540}
            localFrame={localFrame}
            stepFrames={22}
            lines={[
              { text: 'php 01_raw_socket.php', tone: 'cmd' },
              { text: 'Warning: Attempt to assign property "uid" on resource', tone: 'err' },
              { text: '而且业务代码被迫到处直接调底层 fwrite($conn, ...)', tone: 'warn' },
              { text: '-> 一旦跨网络分包、发大文件立刻全盘崩溃！', tone: 'err' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'wrapper-box') {
    return (
      <StageContainer
        banner="面向对象封装：造一个 TcpConnection 包装盒，把丑陋的 Socket 藏在肚子里！"
        conceptPill="TcpConnection 包装盒"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            transform: `scale(${0.95 + 0.05 * pop})`,
            opacity: enter,
          }}
        >
          <BoxCard
            title="class TcpConnection"
            subtitle="每个连上的客人独享一个对象管家"
            accent="green"
            width={620}
            minHeight={390}
            badge="Object Wrapper"
          >
            <CodeBlockPanel
              width={570}
              lines={[
                'class TcpConnection {',
                '    public int $id;',
                '    private $_socket;           // 藏起原生 resource',
                '    private string $_sendBuffer = "";',
                '    public function send($data) { ... }',
                '    public function close()     { ... }',
                '}',
              ]}
              activeLine={2}
            />
          </BoxCard>
          <BoxCard
            title="业务侧瞬间优雅"
            accent="blue"
            width={500}
            minHeight={390}
          >
            <div style={{ fontSize: 21, lineHeight: 1.8 }}>
              <div>✓ <code style={{ fontFamily: THEME.fontMono }}>$conn-&gt;uid = 10086;</code> 随意挂属性</div>
              <div>✓ <code style={{ fontFamily: THEME.fontMono }}>$conn-&gt;send("hello");</code> 语义清晰</div>
              <div>✓ <code style={{ fontFamily: THEME.fontMono }}>$conn-&gt;getRemoteIp();</code> 一应俱全</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'iron-triangle') {
    return (
      <StageContainer
        banner="Workerman 架构铁三角各司其职：Worker 迎宾 · SelectLoop 门铃 · TcpConnection 管家"
        conceptPill="Workerman 铁三角"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 24,
            opacity: enter,
          }}
        >
          <BoxCard title="Worker (总管)" accent="blue" width={360} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• listen 监听端口</div>
              <div>• 收到新客人 accept 后，new TcpConnection() 并存进 $connections 池</div>
            </div>
            <CodeHint text="只管迎宾与生命周期汇总" />
          </BoxCard>
          <BoxCard title="SelectLoop (门铃引擎)" accent="orange" width={360} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• 只管监听可读/可写与定时器</div>
              <div>• 不懂 HTTP，也不碰业务数据</div>
            </div>
            <CodeHint text="纯粹的事件复用反应堆" />
          </BoxCard>
          <BoxCard title="TcpConnection (连接管家)" accent="green" width={380} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• 构造时自己调用 $loop-&gt;addRead($socket, [$this, 'baseRead'])</div>
              <div>• 全权承包单个客人的读写、缓冲、协议解包与关闭</div>
            </div>
            <CodeHint text="高内聚低耦合核心！" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === '5mb-disaster') {
    const sentMB = '5,242,880 B (5.0 MB)';
    const recved = '65,536 B (64 KB)';
    return (
      <StageContainer
        banner="5MB 丢包血案：fwrite($socket, 5MB) 竟然直接截断丢弃了 4.9MB 数据！"
        conceptPill="非阻塞短写截断"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard title="服务端调用发送" accent="blue" width={340} minHeight={340}>
            <div style={{ fontSize: 24, fontWeight: 800, color: THEME.blue }}>{sentMB}</div>
            <CodeHint text="$len = @fwrite($socket, $data5MB);" highlight />
          </BoxCard>
          <AnimatedFlowArrow width={220} label="被截断!" color={THEME.red} progress={pop} blocked />
          <BoxCard
            title="客户端实际收到"
            subtitle="4.93 MB 凭空蒸发！"
            accent="red"
            width={560}
            minHeight={340}
            badge="严重丢包事故"
          >
            <div style={{ fontSize: 28, fontWeight: 800, color: THEME.red }}>{recved}</div>
            <div style={{ fontSize: 21, lineHeight: 1.7, marginTop: 12 }}>
              非阻塞模式下，fwrite 返回的 <code style={{ fontFamily: THEME.fontMono }}>$len = 65536</code> 远小于 <code style={{ fontFamily: THEME.fontMono }}>strlen($data)</code>，如果你不检查返回值，剩下的 5,177,344 字节当场蒸发！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'so-sndbuf') {
    const fill = Math.min(100, Math.round(interpolate(localFrame, [10, 80], [20, 100])));
    return (
      <StageContainer
        banner="物理真相：fwrite 只是往内核小水缸 SO_SNDBUF 倒水，装满立刻“短写”返回！"
        conceptPill="SO_SNDBUF 物理上限"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            opacity: enter,
          }}
        >
          <WaterTankBar
            title="内核发送缓冲区 SO_SNDBUF"
            subtitle="非阻塞模式：绝不干等，能装多少算多少"
            fillPercent={fill}
            fillColor={fill >= 95 ? THEME.red : THEME.orange}
            capacityLabel="已满！仅写进 65,536 B"
            width={440}
            height={280}
          />
          <BoxCard
            title="阻塞 vs 非阻塞 fwrite 对比"
            accent="blue"
            width={640}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• <b>阻塞模式</b>：死等网线慢慢发完 5MB 才 return → 全服所有其他客人卡死！</div>
              <div style={{ marginTop: 10 }}>
                • <b style={{ color: THEME.green }}>非阻塞模式</b>：能塞进水缸多少先塞多少，立刻返回实写字节数 <code style={{ fontFamily: THEME.fontMono }}>$len</code>，不拖累别人！
              </div>
              <CodeHint text="正因如此，应用层必须亲自接管没塞进去的余下数据！" highlight />
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'app-sendbuffer') {
    const bufferFill = Math.min(82, Math.round(interpolate(localFrame, [15, 90], [0, 82])));
    return (
      <StageContainer
        banner="自建应用层大蓄水池 $_sendBuffer：没写完的尾巴 substr 暂存，一字节都不许丢！"
        conceptPill="应用层发送缓冲区"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="TcpConnection::send()"
            width={680}
            lines={[
              '$len = @fwrite($this->_socket, $send_buffer);',
              'if ($len === strlen($send_buffer)) {',
              '    return true; // 全部直接倒进内核，收工！',
              '}',
              '// 没发完！把剩下的尾巴存进应用层大水库：',
              'if ($len > 0) {',
              '    $this->_sendBuffer = substr($send_buffer, $len);',
              '} else {',
              '    $this->_sendBuffer = $send_buffer;',
              '}',
              '$this->_loop->addWrite($this->_socket, [$this, "baseWrite"]);',
            ]}
            activeLine={6}
          />
          <WaterTankBar
            title="PHP $this->_sendBuffer"
            subtitle="存余下 4.93 MB 待续传"
            fillPercent={bufferFill}
            fillColor={THEME.blue}
            capacityLabel="4,934,400 B 排队中"
            width={420}
            height={280}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'add-write') {
    const drainPercent = Math.max(0, Math.round(interpolate(localFrame, [20, 140], [85, 0])));
    return (
      <StageContainer
        banner="stream_select 第 2 参数「可写监听」：内核池子一腾出空位，自动唤醒 baseWrite 续传！"
        conceptPill="addWrite + baseWrite"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            opacity: enter,
          }}
        >
          <WaterTankBar
            title="$this->_sendBuffer (PHP 内存)"
            subtitle="分批异步倒向内核"
            fillPercent={drainPercent}
            fillColor={THEME.blue}
            capacityLabel={`${Math.round((drainPercent / 100) * 5.0 * 10) / 10} MB 待发`}
            width={360}
            height={260}
          />
          <AnimatedFlowArrow
            width={220}
            label="baseWrite() 续传"
            color={THEME.green}
            progress={pop}
            pulse={((localFrame % 40) / 40)}
          />
          <CodeBlockPanel
            title="baseWrite() 排空逻辑"
            width={540}
            lines={[
              'public function baseWrite() {',
              '    $len = @fwrite($this->_socket, $this->_sendBuffer);',
              '    if ($len === strlen($this->_sendBuffer)) {',
              '        $this->_loop->delWrite($this->_socket);',
              '        $this->_sendBuffer = "";',
              '    } else if ($len > 0) {',
              '        $this->_sendBuffer = substr($this->_sendBuffer, $len);',
              '    }',
              '}',
            ]}
            activeLine={3}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'del-write-trap') {
    return (
      <StageContainer
        banner="致命陷阱：发空缓冲后若忘了 delWrite，内核池子平时永远可写 → CPU 瞬间 100%！"
        conceptPill="按需监听可写事件"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard
            title="为什么千万不能长期开着 EV_WRITE？"
            accent="red"
            width={720}
            minHeight={360}
            badge="经典面试压轴题"
          >
            <div style={{ fontSize: 22, lineHeight: 1.8 }}>
              <div>1. 99.9% 的空闲时刻，内核发送缓冲 SO_SNDBUF 都是空的！</div>
              <div>2. 对 select 而言，“缓冲区有空位” = <b style={{ color: THEME.red }}>永远处于可写就绪状态</b>！</div>
              <div>3. 若不执行 <code style={{ fontFamily: THEME.fontMono }}>delWrite</code>，stream_select 0 微秒立即返回可写，主循环每秒空转百万次！</div>
              <CodeHint text="铁律：平时绝不挂 EV_WRITE；有积压才 addWrite；一排空立刻 delWrite！" highlight />
            </div>
          </BoxCard>
          <CpuGauge
            percent="100%"
            stateLabel="漏写 delWrite 的下场"
            mode="busy"
            localFrame={localFrame}
          />
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="发送顺序铁律：只要 $_sendBuffer 还有排队数据，新消息严禁插队直写 fwrite！"
      conceptPill="FIFO 字节流保序"
      conceptColor={"#8e44ad"}
      localFrame={localFrame}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          opacity: enter,
        }}
      >
        <CodeBlockPanel
          title="正确的 send() 入口判断"
          width={680}
          lines={[
            'public function send($send_buffer) {',
            '    // 只要前面还有没排完的老货，新消息必须乖乖排到队尾！',
            '    if ($this->_sendBuffer !== "") {',
            '        $this->_sendBuffer .= $send_buffer;',
            '        return null;',
            '    }',
            '    // 缓冲为空时，才允许直接尝试一次 fwrite...',
            '}',
          ]}
          activeLine={2}
        />
        <BoxCard
          title="万一插队会发生什么？"
          accent="red"
          width={440}
          minHeight={340}
        >
          <div style={{ fontSize: 21, lineHeight: 1.7 }}>
            如果老消息 A 只发了一半，这时直接 fwrite 新消息 B 并恰好塞进去 100 字节，对端收到的 TCP 流就彻底错乱粘连损毁！
          </div>
          <CodeHint text="FIFO：先来先写，绝不插队" highlight />
        </BoxCard>
      </div>
    </StageContainer>
  );
};
