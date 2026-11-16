import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
  WaterTankBar,
} from '../../components/StagePrimitives';

export const Stage07_02: React.FC<StageProps> = ({
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

  if (visual === 'slow-client') {
    const oomSize = Math.min(2048, Math.round(interpolate(localFrame, [15, 130], [16, 2048])));
    const pct = Math.min(100, Math.round((oomSize / 1024) * 100));
    return (
      <StageContainer
        banner="慢客户端灾难：对方不收包或网线慢，服务端狂 send 导致 $_sendBuffer 涨到 OOM！"
        conceptPill="内存无底洞 OOM"
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
          <WaterTankBar
            title="PHP 应用层 $this->_sendBuffer"
            subtitle="业务不断往里倒视频/推送流"
            fillPercent={pct}
            fillColor={THEME.red}
            capacityLabel={`${oomSize} MB (⚠️ 内存即将撑爆!)`}
            watermarkPercent={50}
            width={440}
            height={290}
          />
          <BoxCard
            title="慢消费者效应"
            subtitle="TCP 滑动窗口通告 Win=0"
            accent="red"
            width={680}
            minHeight={360}
            badge="Allowed memory size exhausted"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>1. 恶意客户端连上来故意不调用 recv() 读数据</div>
              <div>2. 服务端内核 SO_SNDBUF 迅速塞满，再也倒不进 1 个字节</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                3. 业务如果不管三七二十一继续调 $conn-&gt;send()，全都会滞留在 PHP 进程堆内存里，几秒钟拖垮整个 Worker！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'watermark') {
    const wave = Math.round(62 + 34 * Math.sin(localFrame / 18));
    const full = wave >= 80;
    return (
      <StageContainer
        banner="高低水位背压机制：触及 $maxSendBufferSize 触发 onBufferFull 暂停，排空触发 onBufferDrain 恢复！"
        conceptPill="WaterMark 背压保护"
        conceptColor={full ? THEME.orange : THEME.green}
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
          <WaterTankBar
            title="带警戒水位线的发送缓冲"
            subtitle={`当前水位: ${wave}% (红线 = 1MB maxSendBufferSize)`}
            fillPercent={wave}
            fillColor={full ? THEME.red : THEME.green}
            capacityLabel={full ? '触发 onBufferFull 通知暂停！' : '安全排空，触发 onBufferDrain'}
            watermarkPercent={80}
            width={440}
            height={290}
          />
          <CodeBlockPanel
            title="生产级背压协作（如文件/代理转发）"
            width={680}
            lines={[
              '// 当缓冲积压 >= $conn->maxSendBufferSize (默认 1MB)：',
              '$conn->onBufferFull = function($conn) {',
              '    $upstreamConn->pauseRecv(); // 上游别再收了，等下游消化！',
              '};',
              '// 当 baseWrite() 把积压全部排空为 "" 时：',
              '$conn->onBufferDrain = function($conn) {',
              '    $upstreamConn->resumeRecv(); // 通知上游恢复灌水！',
              '};',
            ]}
            activeLine={full ? 2 : 6}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'close-hijack') {
    return (
      <StageContainer
        banner="截胡血案：发完大礼包立刻调 close()，粗暴 fclose 会把还在路上的 $_sendBuffer 全扔掉！"
        conceptPill="close() 截胡丢失"
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
            title="极其常见的业务写法"
            width={560}
            lines={[
              '$worker->onMessage = function($conn, $req) {',
              '    $conn->send($bigHttpResponse); // 写进缓冲',
              '    $conn->close();                // 希望发完就断！',
              '};',
            ]}
            activeLine={2}
          />
          <BoxCard
            title="如果 close() 直接调 fclose()..."
            accent="red"
            width={560}
            minHeight={340}
            badge="数据半途而废"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>1. send() 刚把 5MB 响应存进 $_sendBuffer，内核还没来得及发</div>
              <div>2. 下一微秒 close() 若无脑调用 destroy()/fclose()</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                3. 客人收到半截 HTTP 响应就莫名断开！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'state-machine') {
    const phase = Math.floor(localFrame / 50) % 3;
    return (
      <StageContainer
        banner="优雅关闭状态机：close() 遇缓冲未空先转 STATUS_CLOSING，等 baseWrite 发完末字节再真关！"
        conceptPill="TcpConnection 状态机"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            opacity: enter,
          }}
        >
          <BoxCard
            title="1. ESTABLISHED"
            accent={phase === 0 ? 'green' : 'default'}
            width={340}
            minHeight={320}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              正常读写态。<br />收到 <code style={{ fontFamily: THEME.fontMono }}>close()</code> 时检查：<br />$_sendBuffer 是否为空？
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={80} label="" color={THEME.orange} progress={pop} />
          <BoxCard
            title="2. CLOSING"
            subtitle="半关闭待清仓"
            accent={phase === 1 ? 'orange' : 'default'}
            width={360}
            minHeight={320}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• 拒收后续 send() 新数据</div>
              <div>• delRead 停收新请求</div>
              <div>• 静静等待 baseWrite() 排空余货</div>
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={80} label="" color={THEME.red} progress={pop} />
          <BoxCard
            title="3. CLOSED"
            accent={phase === 2 ? 'red' : 'default'}
            width={320}
            minHeight={320}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              baseWrite() 发完最后 1 字节，看到 STATUS_CLOSING 才调用 destroy()！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'mem-leak') {
    const rss = Math.min(82, Math.round(interpolate(localFrame, [15, 130], [18, 82])));
    return (
      <StageContainer
        banner="常驻进程最隐蔽幽灵：1 万个连接全都断开了，PHP 进程 RSS 内存却一路涨到 80MB 不回落！"
        conceptPill="常驻进程内存泄漏"
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
          <TerminalPanel
            title="压力测试回落监控"
            width={620}
            localFrame={localFrame}
            stepFrames={20}
            lines={[
              { text: '# 第 1 轮: 2000 客户端连接 -> 全部断开', tone: 'cmd' },
              { text: '[Mem] connections=0, memory_get_usage = 24.5 MB', tone: 'warn' },
              { text: '# 第 5 轮: 10000 客户端连接 -> 全部断开', tone: 'cmd' },
              { text: '[Mem] connections=0, memory_get_usage = 58.2 MB', tone: 'err' },
              { text: '为什么客户端早就走光了，内存却一字节都没释放？！', tone: 'err' },
            ]}
          />
          <WaterTankBar
            title="PHP 进程内存水位 (RSS)"
            subtitle="只增不减 = 对象无法被销毁"
            fillPercent={rss}
            fillColor={THEME.red}
            capacityLabel={`${rss} MB (持续泄漏中)`}
            width={460}
            height={280}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'circular-ref') {
    return (
      <StageContainer
        banner="交叉引用死结：Worker::$connections + SelectLoop 回调数组 + 闭包 $this 死死攥着对象！"
        conceptPill="引用计数无法归零"
        conceptColor={"#8e44ad"}
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
          <BoxCard title="绳子 1：Worker 池" accent="blue" width={360} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <code style={{ fontFamily: THEME.fontMono }}>$worker-&gt;connections[$id] = $conn;</code>
              <div style={{ marginTop: 12 }}>只要没 unset，对象永远 refcount ≥ 1！</div>
            </div>
          </BoxCard>
          <BoxCard title="绳子 2：SelectLoop 回调表" accent="orange" width={380} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <code style={{ fontFamily: THEME.fontMono }}>$readCallbacks[$fd] = [$conn, 'baseRead'];</code>
              <div style={{ marginTop: 12 }}>忘了 delRead/delWrite，事件引擎也一直攥着对象不松手！</div>
            </div>
          </BoxCard>
          <BoxCard title="绳子 3：对象身上的闭包" accent="red" width={380} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <code style={{ fontFamily: THEME.fontMono }}>$conn-&gt;onMessage = fn() =&gt; $conn-&gt;...</code>
              <div style={{ marginTop: 12 }}>闭包 use 了外部变量或自身，形成强循环引用环！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'four-unplug') {
    const steps = [
      { n: '①', title: '注销事件', code: '$loop->delRead($socket); $loop->delWrite($socket);', color: THEME.blue },
      { n: '②', title: '关闭句柄', code: '@fclose($this->_socket);', color: THEME.orange },
      { n: '③', title: '清空回调', code: '$this->onMessage = $this->onClose = null;', color: "#8e44ad" },
      { n: '④', title: '移出连接池', code: 'unset($worker->connections[$this->id]);', color: THEME.green },
    ];
    return (
      <StageContainer
        banner="destroy() 四步连环拔管：剪断全部 4 根绳子，引用计数瞬间归零实现零泄漏！"
        conceptPill="destroy() 四步清理"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 1120,
            opacity: enter,
          }}
        >
          {steps.map((s, idx) => {
            const p = spring({
              frame: Math.max(0, localFrame - idx * 14),
              fps,
              config: SPRING_POP,
            });
            return (
              <div
                key={s.n}
                style={{
                  transform: `translateX(${(1 - p) * 24}px)`,
                  opacity: p,
                  background: '#FFFFFF',
                  border: `2px solid ${s.color}`,
                  borderRadius: 14,
                  padding: '18px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div
                    style={{
                      background: s.color,
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: 22,
                      padding: '8px 18px',
                      borderRadius: 10,
                    }}
                  >
                    {s.n} {s.title}
                  </div>
                  <div style={{ fontFamily: THEME.fontMono, fontSize: 21, color: THEME.dark }}>
                    {s.code}
                  </div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: THEME.green }}>✓ 已剪断</div>
              </div>
            );
          })}
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="源码巅峰印证：Workerman/Connection/TcpConnection.php 每一条分支都亲手推导完毕！"
      conceptPill="TcpConnection 源码真迹"
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
        <CodeBlockPanel
          title="Workerman/Connection/TcpConnection.php"
          width={760}
          lines={[
            'if ($this->_status === self::STATUS_CLOSING) {',
            '    $this->destroy(); // 发完最后字节立刻关闭',
            '}',
            'public function destroy() {',
            '    Worker::$globalEvent->del($this->_socket, EV_READ);',
            '    Worker::$globalEvent->del($this->_socket, EV_WRITE);',
            '    @fclose($this->_socket);',
            '    unset($this->worker->connections[$this->id]);',
            '    $this->onMessage = $this->onClose = null;',
            '}',
          ]}
          activeLine={3}
        />
        <BoxCard
          title="Reactor 全闭环达成"
          accent="green"
          width={360}
          minHeight={360}
          badge="100% 对齐"
        >
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            <div>✓ 非阻塞多路复用</div>
            <div>✓ 最小堆高精度定时</div>
            <div>✓ 异步双缓冲背压</div>
            <div>✓ 优雅关闭与零泄漏</div>
          </div>
          <CodeHint text="下一站：第 8 章粘包半包！" highlight />
        </BoxCard>
      </div>
    </StageContainer>
  );
};
