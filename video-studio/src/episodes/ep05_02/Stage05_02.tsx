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
} from '../../components/StagePrimitives';

export const Stage05_02: React.FC<StageProps> = ({
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

  if (visual === 'eof-storm') {
    return (
      <StageContainer
        banner="惊悚实验：客户端刚按 Ctrl+C 断开，服务端屏幕疯狂刷屏且 CPU 飙到 100%！"
        conceptPill="EOF 死循环风暴"
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
            title="Terminal — php 03_select_bug.php"
            width={760}
            localFrame={localFrame}
            stepFrames={10}
            lines={[
              { text: '[Client #4] 已连接: 127.0.0.1:52010', tone: 'ok' },
              { text: '[Client #4] 按下 Ctrl+C 断开连接 (发送 FIN)', tone: 'warn' },
              { text: '[Recv #4] 收到 0 字节消息: ""', tone: 'err' },
              { text: '[Recv #4] 收到 0 字节消息: ""', tone: 'err' },
              { text: '[Recv #4] 收到 0 字节消息: ""', tone: 'err' },
              { text: '[Recv #4] 收到 0 字节消息: "" (每秒 100,000+ 次!)', tone: 'err' },
            ]}
          />
          <CpuGauge
            percent="100%"
            stateLabel="死循环空转！"
            mode="busy"
            localFrame={localFrame}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'fin-is-readable') {
    const finProgress = interpolate(localFrame, [15, 70], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <StageContainer
        banner="Linux 反直觉铁律：收到对方的 FIN (EOF) 也算一次“可读事件”！"
        conceptPill="FIN = 可读事件 (EOF)"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard
            title="客户端按 Ctrl+C"
            accent="red"
            width={320}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              OS 内核向服务端发出最后一个 TCP 控制包：
            </div>
            <CodeHint text="TCP FIN=1 (文件结束标志 EOF)" highlight />
          </BoxCard>

          <div
            style={{
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedFlowArrow
              width={300}
              label="FIN (EOF)"
              color={THEME.red}
              progress={finProgress}
              pulse={finProgress > 0 && finProgress < 1 ? finProgress : null}
            />
          </div>

          <BoxCard
            title="服务端内核 + PHP 现场"
            subtitle="select() 瞬间被唤醒！"
            accent="orange"
            width={520}
            minHeight={360}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>1. 内核认为：$conn 已到 EOF，必须立刻通知用户进程！于是将 $conn 标为「可读」</div>
              <div style={{ marginTop: 10 }}>
                2. PHP 调 fread($conn, 8192) → 立刻返回空串 <code style={{ fontFamily: THEME.fontMono }}>""</code>
              </div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 10 }}>
                3. 没调用 fclose() → 下一轮 select 又看到 EOF → 无限循环！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'eof-cleanup') {
    return (
      <StageContainer
        banner="扑灭风暴两连击：先从总花名册 unset 除名，再调用 fclose 拔掉句柄！"
        conceptPill="EOF 正确清理"
        conceptColor={THEME.green}
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
            title="04_select_clean.php"
            width={620}
            lines={[
              '$msg = fread($socket, 65535);',
              'if ($msg === "" || $msg === false) {',
              '    // ① 从总花名册中移除，select 不再盯它',
              '    unset($allSockets[(int)$socket]);',
              '    // ② 释放内核 FD 句柄，触发四次挥手',
              '    fclose($socket);',
              '    continue;',
              '}',
            ]}
            activeLine={3}
          />
          <CpuGauge
            percent="0.1%"
            stateLabel="优雅清理 · 回归休眠"
            mode="normal"
            localFrame={localFrame}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'not-always-dead') {
    return (
      <StageContainer
        banner="大师级严谨判断：非阻塞 fread 返回空串可能是 EAGAIN，真断线还需看 feof！"
        conceptPill="EAGAIN vs 真 EOF"
        conceptColor={"#8e44ad"}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard
            title='情况 A：假空读 (EAGAIN)'
            subtitle='连接还活着！'
            accent="blue"
            width={560}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• 非阻塞模式下直接调用 fread，如果对端还没发数据</div>
              <div>• fread 也返回 <code style={{ fontFamily: THEME.fontMono }}>""</code>，但此时内核并没有收到 FIN</div>
              <CodeHint text="feof($socket) === false (别误杀！)" highlight />
            </div>
          </BoxCard>

          <BoxCard
            title='情况 B：真断线 (EOF)'
            subtitle='确认收到 FIN！'
            accent="green"
            width={560}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• stream_select 已报告该 $socket 就绪可读</div>
              <div>• 且 fread 返回 "" 同时 feof($socket) 为 true（或空串且刚由 select 唤醒）</div>
              <CodeHint text="Workerman: $buffer === '' || $buffer === false -> if (feof($socket)) destroy()" highlight />
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'extract-selectloop') {
    return (
      <StageContainer
        banner="架构拆解：Worker 只负责业务逻辑，事件盯梢抽离成可替换的 SelectLoop！"
        conceptPill="关注点分离"
        conceptColor={THEME.blue}
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
          <BoxCard
            title="重构前：耦合巨无霸"
            accent="red"
            width={380}
            minHeight={370}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• listen / accept</div>
              <div>• $allSockets 维护</div>
              <div>• stream_select 循环</div>
              <div>• fread + 业务回包</div>
              <div style={{ color: THEME.red, marginTop: 10 }}>
                想换成 epoll / libevent 必须重写整份代码！
              </div>
            </div>
          </BoxCard>

          <AnimatedFlowArrow
            width={160}
            label="抽离引擎"
            color={THEME.blue}
            progress={pop}
          />

          <BoxCard
            title="EventInterface 引擎"
            subtitle="SelectLoop / EpollLoop"
            accent="green"
            width={580}
            minHeight={370}
            badge="面向接口编程"
          >
            <CodeBlockPanel
              width={530}
              lines={[
                'interface EventLoopInterface {',
                '    public function addRead($fd, callable $cb);',
                '    public function delRead($fd);',
                '    public function loop();',
                '}',
              ]}
              activeLine={1}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'bell-and-card') {
    return (
      <StageContainer
        banner="SelectLoop 内部极简双表：门铃名单 ($readFds) + 岗位回执卡 ($readCallbacks)"
        conceptPill="双表映射数据结构"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 32,
            opacity: enter,
          }}
        >
          <BoxCard
            title="表 1：$this->readFds"
            subtitle="交给内核 stream_select 的门铃名单"
            accent="blue"
            width={540}
            minHeight={370}
          >
            <CodeBlockPanel
              width={490}
              lines={[
                '$this->readFds = [',
                '    3 => resource(#3 server),  // 迎宾门铃',
                '    4 => resource(#4 clientA), // 客人 A 门铃',
                '    5 => resource(#5 clientB), // 客人 B 门铃',
                '];',
              ]}
              activeLine={2}
            />
            <CodeHint text="索引统一用 (int)$socket 作为唯一 Key" />
          </BoxCard>

          <BoxCard
            title="表 2：$this->readCallbacks"
            subtitle="门铃响时要找谁的岗位卡"
            accent="orange"
            width={580}
            minHeight={370}
          >
            <CodeBlockPanel
              width={530}
              lines={[
                '$this->readCallbacks = [',
                '    3 => fn($srv) => $worker->acceptConnection($srv),',
                '    4 => fn($cli) => $connA->baseRead($cli),',
                '    5 => fn($cli) => $connB->baseRead($cli),',
                '];',
              ]}
              activeLine={2}
            />
            <CodeHint text="同一个 (int)$fd 在两张表里成对增删！" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'loop-dispatch') {
    const highlightStep = Math.floor(localFrame / 35) % 4;
    return (
      <StageContainer
        banner="O(1) 精准查表派发：4 号门铃响了，直接调用 readCallbacks[4]($socket)！"
        conceptPill="事件派发 Loop"
        conceptColor={THEME.green}
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
            title="SelectLoop::loop()"
            width={740}
            lines={[
              'while (true) {',
              '    $read = $this->readFds;',
              '    @stream_select($read, $write, $except, 0, $usec);',
              '    foreach ($read as $socket) {',
              '        $fd = (int)$socket;',
              '        ($this->readCallbacks[$fd])($socket);',
              '    }',
              '}',
            ]}
            activeLine={highlightStep + 2}
          />
          <BoxCard
            title="零 if/else 扩展"
            accent="green"
            width={380}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              无论是 3 号总机还是 50,000 号普通客户，loop() 代码永远不需要改一行！
            </div>
            <CodeHint text="IoC 控制反转" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'level-triggered') {
    const remaining = localFrame > 80 ? 976 : 2000;
    return (
      <StageContainer
        banner="水平触发 (LT) 特性：内核池子里只要还剩 1 个字节没读完，select 就继续喊你！"
        conceptPill="Level-Triggered 水平触发"
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
          <BoxCard
            title="内核接收缓冲区 SO_RCVBUF"
            subtitle={`当前未读剩余: ${remaining} Bytes`}
            accent={remaining > 0 ? 'orange' : 'green'}
            width={520}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• 客户端一口气发来 2000 字节</div>
              <div>• 你的 fread($conn, 1024) 每次只掏 1024 字节</div>
              <div style={{ color: THEME.orange, fontWeight: 700, marginTop: 10 }}>
                • 还剩 {remaining} 字节留在内核 → 下一轮 select 立刻再次把 $conn 放进 $read！不会丢数据！
              </div>
            </div>
          </BoxCard>

          <BoxCard
            title="LT (select) vs ET (边缘触发)"
            accent="blue"
            width={580}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• <b>LT 水平触发</b>：有剩就一直报，编程安全容错率高</div>
              <div>• <b>ET 边缘触发</b>：只通知一次，必须 while 循环 fread 到 EAGAIN 否则死等</div>
              <CodeHint text="Workerman 默认稳定读取块大小：READ_BUFFER_SIZE = 65535" />
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="源码照妖镜：Workerman Events/Select.php 与你的手写引擎逐行对齐！"
      conceptPill="Events/Select.php 源码印证"
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
          title="Workerman/Events/Select.php"
          width={760}
          lines={[
            '$fd_key = (int)$fd;',
            'switch ($flag) {',
            '    case self::EV_READ:',
            '        $this->_readFds[$fd_key] = $fd;',
            '        $this->_allEvents[$fd_key][$flag] = [$func, $args];',
            '        break;',
            '}',
            '$ret = @stream_select($read, $write, $except, 0, $this->_selectTimeout);',
          ]}
          activeLine={3}
        />
        <BoxCard
          title="你已彻底攻克底层"
          accent="green"
          width={360}
          minHeight={360}
          badge="100% 对齐"
        >
          <div style={{ fontSize: 21, lineHeight: 1.7 }}>
            Events/Select.php 里的 $_readFds、$_allEvents 与 stream_select 派发，再也不是神秘黑盒！
          </div>
          <CodeHint text="下一步：非阻塞定时器" highlight />
        </BoxCard>
      </div>
    </StageContainer>
  );
};
