import React from 'react';
import { spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage07_03: React.FC<StageProps> = ({
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

  if (visual === 'god-class-pain') {
    return (
      <StageContainer
        banner="反模式警报：把所有连接与发送队列全塞进 Worker “上帝类”，复杂度立刻失控爆炸！"
        conceptPill="拆分上帝类 Worker"
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
            title="重构前：God Class Worker"
            accent="red"
            width={520}
            minHeight={360}
            badge="高耦合灾难"
          >
            <div style={{ fontSize: 20, lineHeight: 1.75 }}>
              <div>• 大门口 accept 迎宾</div>
              <div>• 管几万个客户端各自的 $sendBuffer[(int)$sock]</div>
              <div>• 管各自的 $recvBuffer[(int)$sock]</div>
              <div>• 管各自的连接状态与业务属性</div>
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={140} label="各司其职" color={THEME.green} progress={pop} />
          <BoxCard title="拆出 TcpConnection 管家" accent="green" width={460} minHeight={360}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              每个客人独立 new 一个 <code style={{ fontFamily: THEME.fontMono }}>TcpConnection</code> 实例，自己的缓冲、状态、事件自己承包，Worker 瞬间变轻！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'packet-7steps') {
    const steps = [
      '1. 客户端敲下回车通过网卡发来数据包',
      '2. SelectLoop::loop() 里的 stream_select() 瞬间被内核唤醒',
      '3. 引擎拿着 (int)$socket 去查表调用 [$conn, "baseRead"]',
      '4. $conn->baseRead() 把内核数据 fread 出来交给协议解码',
      '5. $conn 触发 ($this->onMessage)($this, $data) 执行业务',
      '6. 业务调 $conn->send($reply) 回写（塞满就挂 addWrite）',
    ];
    const active = Math.floor(localFrame / 28) % steps.length;
    return (
      <StageContainer
        banner="数据包在“铁三角”内部的完整 6 步旅行沙盘：Worker 迎宾完早就功成身退！"
        conceptPill="铁三角数据流全景"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: 1080,
            opacity: enter,
          }}
        >
          {steps.map((s, idx) => {
            const isAct = idx === active;
            return (
              <div
                key={s}
                style={{
                  padding: '13px 22px',
                  borderRadius: 12,
                  background: isAct ? THEME.orangeBg : '#FFFFFF',
                  border: `2.5px solid ${isAct ? THEME.orange : THEME.gridColor}`,
                  fontSize: 22,
                  fontWeight: isAct ? 800 : 600,
                  color: THEME.dark,
                  boxShadow: '0 6px 14px rgba(0,0,0,0.04)',
                }}
              >
                {s}
              </div>
            );
          })}
        </div>
      </StageContainer>
    );
  }

  if (visual === 'this-baseread-array') {
    return (
      <StageContainer
        banner="极易忽略的真相：[$this, 'baseRead'] 根本不是字符串，它的 [0] 号位死死抓着整个对象！"
        conceptPill="Callable 数组强引用"
        conceptColor={THEME.orange}
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
            title="构造函数里的这行代码干了什么？"
            width={620}
            lines={[
              '$this->_loop->addRead($this->_socket, [$this, "baseRead"]);',
              '',
              '// 本质上等价于创建了如下二元数组并存进 SelectLoop：',
              '$readCallbacks[$fd] = [',
              '    0 => $this,       // 🎈 强引用抓紧了 $conn 实例！',
              '    1 => "baseRead",',
              '];',
            ]}
            activeLine={4}
          />
          <BoxCard title="影响对象生死！" accent="orange" width={480} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              只要 <code style={{ fontFamily: THEME.fontMono }}>SelectLoop</code> 的回调数组不删掉它，<code style={{ fontFamily: THEME.fontMono }}>$conn</code> 的引用计数 <code style={{ fontFamily: THEME.fontMono }}>refcount</code> 永远不可能是 0，永远不会销毁！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'balloon-1') {
    return (
      <StageContainer
        banner="气球与绳子实验 1 (13_refcount_balloon_experiment.php)：只有 1 根绳子 → 撒手即爆炸回收！"
        conceptPill="实验 1: refcount 1 -> 0"
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
            title="实验 1：单绳引用"
            width={520}
            lines={[
              '$balloon1 = new Balloon("气球 1 号"); // refcount = 1',
              'unset($balloon1);                     // refcount = 0!',
              '// 立刻同步触发 __destruct() 💥 释放内存',
            ]}
            activeLine={1}
          />
          <TerminalPanel
            title="命令行输出"
            width={600}
            localFrame={localFrame}
            stepFrames={24}
            lines={[
              { text: '🎈 [气球吹起] 气球 1 号 被创建诞生了！', tone: 'ok' },
              { text: '准备 unset($balloon1)...', tone: 'dim' },
              { text: '💥 [气球爆炸销毁] 气球 1 号 的所有绳子全断了，内存被彻底回收！', tone: 'warn' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'balloon-2') {
    return (
      <StageContainer
        banner="实验 2 震惊真相：事件表 [$balloon2, 'fly'] 拽着第 2 根绳，unset($balloon2) 根本不会爆炸！"
        conceptPill="实验 2: 事件循环抓紧第 2 根绳"
        conceptColor={THEME.orange}
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
            title="实验 2：两只手同时拽着气球"
            width={560}
            lines={[
              '$balloon2 = new Balloon("气球 2 号");         // 手 1',
              '$eventLoopCallbacks["fd_15"] = [$balloon2, "fly"]; // 手 2',
              'unset($balloon2); // 仅撒开手 1：refcount 从 2 降到 1!',
              '// 💥 必须执行 unset($eventLoopCallbacks["fd_15"]) 才爆炸！',
            ]}
            activeLine={2}
          />
          <TerminalPanel
            title="命令行实测"
            width={560}
            localFrame={localFrame}
            stepFrames={22}
            lines={[
              { text: '现在我们撒开手 1：执行 unset($balloon2)...', tone: 'cmd' },
              { text: '👀 请看：有没有打印气球 2 号爆炸？——【绝对没有！】', tone: 'err' },
              { text: '再执行 unset($eventLoopCallbacks["fd_15"]) (类似 delRead)', tone: 'cmd' },
              { text: '💥 [气球爆炸销毁] 气球 2 号 终于内存回收！', tone: 'ok' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'balloon-3') {
    return (
      <StageContainer
        banner="实验 3 致命蛇咬尾巴：$balloon3->onAction = fn() use ($balloon3) {} 外部 unset 仍永远不死！"
        conceptPill="实验 3: 闭包自循环引用"
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
            title="实验 3：自身属性挂着捕获自己的闭包"
            width={580}
            lines={[
              '$balloon3 = new CircleBalloon("气球 3 号");',
              '$balloon3->onAction = function() use ($balloon3) {};',
              'unset($balloon3);',
              '// 💥 没用！自己属性里存的闭包，肚子里正反咬着 $balloon3 自己！',
              '// 必须：在 destroy() 里把 $this->onMessage = null 等属性全部置空！',
            ]}
            activeLine={3}
          />
          <BoxCard
            title="为什么 destroy() 必须置 null？"
            accent="red"
            width={520}
            minHeight={340}
            badge="解开循环死结"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              当用户写 <code style={{ fontFamily: THEME.fontMono }}>$conn-&gt;onClose = fn() use ($conn) ...</code> 时，如果框架不主动清掉回调属性，几万个断掉的连接对象就会化作不死僵尸直到 OOM！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="生死一念反推：accept 时为何必须写 $this->connections[$id] = $connection？"
      conceptPill="一存保活 · 四拔销毁"
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
          title="Worker::acceptConnection() 为什么一定要存池？"
          width={620}
          lines={[
            'public function acceptConnection($socket) {',
            '    $conn = new TcpConnection($loop, $newSocket);',
            '    // 如果漏掉下面这行，也没挂到任何全局数组：',
            '    // acceptConnection 返回瞬间局部变量死掉，$conn 当场析构 fclose!',
            '    $this->connections[$conn->id] = $conn;',
            '}',
          ]}
          activeLine={4}
        />
        <BoxCard title="全套生命周期闭环" accent="green" width={480} minHeight={340}>
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            <div>• <b>生 (accept)</b>：靠 <code style={{ fontFamily: THEME.fontMono }}>$connections[$id]</code> + <code style={{ fontFamily: THEME.fontMono }}>SelectLoop</code> 两只手保活</div>
            <div>• <b>死 (destroy)</b>：严格执行四步拔管，让 refcount 精确归 0 秒爆回收！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
