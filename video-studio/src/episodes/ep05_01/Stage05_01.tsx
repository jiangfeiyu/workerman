import React from 'react';
import { interpolate, spring } from 'remotion';
import {
  CodeHint,
  CpuGauge,
  SPRING_POP,
  SPRING_SMOOTH,
  THEME,
} from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  StageContainer,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage05_01: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 18, fps, config: SPRING_POP });
  const pulseCycle = ((localFrame % 45) / 45);

  if (visual === 'nested-while') {
    return (
      <StageContainer
        banner="朴素直觉：外层 accept 迎宾 + 内层 fread 陪聊"
        conceptPill="双层 while 循环（串行长连接）"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <BoxCard title="外层循环：大门口" subtitle="FD 3 ($server)" accent="blue" width={460} minHeight={290}>
            <CodeHint text="while (true) { $conn = accept($server); }" highlight />
            <div style={{ fontSize: 25, fontWeight: 700, color: THEME.dark }}>
              迎宾员站在门口等新客人上门
            </div>
            <div style={{ fontSize: 22, color: THEME.mutedText }}>
              接到客人后创建包厢通道 FD 4，交给内层循环
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={200} label="交付 $conn" progress={enter} pulse={pulseCycle} />

          <BoxCard title="内层循环：包厢服务" subtitle="FD 4 ($conn)" accent="orange" width={480} minHeight={290}>
            <CodeHint text="while (true) { $msg = fread($conn, 1024); }" highlight />
            <div style={{ fontSize: 25, fontWeight: 700, color: THEME.dark }}>
              专职服务员死守这 1 位客人一直聊
            </div>
            <div style={{ fontSize: 22, color: THEME.mutedText }}>
              只有客人彻底挂断，才能 break 回到外层
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'blocking-crash') {
    const zzzOffset = Math.sin(localFrame * 0.14) * 8;
    return (
      <StageContainer
        banner="车祸现场：客人 A 去喝茶不说话，客人 B 被锁死门外！"
        conceptPill="阻塞 I/O (Blocking)：read(4) 催眠唯一进程"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <BoxCard title="客人 B（门外）" subtitle="等连 8080" accent="red" width={370} badge="收不到回复！">
            <div style={{ fontSize: 25, fontWeight: 700, color: THEME.red }}>
              疯狂敲门："有人吗？救命！"
            </div>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 20, color: THEME.mutedText }}>
              卡在全连接队列里无人 accept
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={150} label="被堵死!" progress={1} blocked />

          <BoxCard title="唯一 PHP 进程" subtitle="STAT: S+" accent="orange" width={490} badge="Zzz...">
            <CodeHint text="fread($connA, 1024) => read(4, ...)" />
            <div
              style={{
                fontSize: 25,
                fontWeight: 800,
                color: THEME.dark,
                transform: `translateY(${zzzOffset}px)`,
              }}
            >
              被内核打入睡眠等待队列，回不去外层 accept！
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={140} label="死等数据" progress={1} color={THEME.mutedText} />

          <BoxCard title="客人 A（包厢）" subtitle="FD 4 已连" accent="default" width={350}>
            <div style={{ fontSize: 25, fontWeight: 700 }}>已发过 "你好"，保持连接不说话</div>
            <div style={{ fontSize: 21, color: THEME.mutedText }}>既不发言也不挂断</div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'nonblocking') {
    return (
      <StageContainer
        banner="自救第一步：命令内核绝不让我睡觉！"
        conceptPill="非阻塞模式 (O_NONBLOCK)：没数据立刻返回 false"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <BoxCard title="PHP 接线员" subtitle="用户态" accent="blue" width={450}>
            <CodeHint text="stream_set_blocking($stream, false);" highlight />
            <div style={{ fontSize: 25, fontWeight: 700 }}>
              调用 fread($connA) 探一眼：有新消息吗？
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={260} label="立刻返回 false" color={THEME.blue} progress={enter} pulse={pulseCycle} />

          <BoxCard title="Linux 内核" subtitle="EAGAIN (暂无数据)" accent="green" width={520} badge="0ms 返回">
            <CodeHint text="fcntl(fd, F_SETFL, O_NONBLOCK)" />
            <div style={{ fontSize: 25, fontWeight: 700, color: THEME.dark }}>
              管子里现在没水！我不催眠你，你马上去问下一位！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'polling-roster') {
    const activeIdx = Math.floor(localFrame / 18) % 3;
    const items = [
      { fd: 'FD 3', role: '迎宾员 $server', action: 'accept($server, 0)' },
      { fd: 'FD 4', role: '客人 A $connA', action: 'fread($connA, 1024)' },
      { fd: 'FD 5', role: '客人 B $connB', action: 'fread($connB, 1024)' },
    ];
    return (
      <StageContainer
        banner="单循环接线员：把所有连接放进 $connections 花名册轮流问"
        conceptPill="单进程并发：客人 A 和客人 B 终于能同时聊天"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <CodeHint text="while (true) { 问FD3新客 -> foreach ($connections) 问老客 }" highlight />
          <div style={{ display: 'flex', gap: 32 }}>
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <BoxCard
                  key={item.fd}
                  title={item.role}
                  subtitle={item.fd}
                  accent={isActive ? 'orange' : 'default'}
                  width={410}
                  badge={isActive ? '正在巡检' : undefined}
                >
                  <CodeHint text={item.action} highlight={isActive} />
                  <div style={{ fontSize: 23, fontWeight: 700, color: isActive ? THEME.dark : THEME.mutedText }}>
                    {isActive ? '有事处理，没事秒过！' : '等待下一圈巡检'}
                  </div>
                </BoxCard>
              );
            })}
          </div>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'cpu-100') {
    const loopCount = Math.floor(localFrame * 14321);
    return (
      <StageContainer
        banner="乐极生悲：虽然没人说话，但接线员一秒疯跑几百万圈！"
        conceptPill="忙轮询惨案 (Busy Polling)：CPU 100% 空转"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <BoxCard title="疯狗 while(true) 空转" subtitle={`已空问 ${loopCount.toLocaleString()} 次`} accent="red" width={680} badge="全部返回 false">
            <div style={{ fontFamily: THEME.fontMono, fontSize: 24, lineHeight: 1.7, color: THEME.red, fontWeight: 700 }}>
              <div>FD 3 有新客吗？ -&gt; false!</div>
              <div>FD 4 客人A说话吗？ -&gt; false!</div>
              <div>FD 5 客人B说话吗？ -&gt; false!</div>
              <div>FD 3 有新客吗？ -&gt; false! ... (每秒百万圈)</div>
            </div>
          </BoxCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <CpuGauge percent="100.0%" stateLabel="R (Running)" mode="busy" localFrame={localFrame} />
            <div style={{ fontSize: 25, fontWeight: 800, color: THEME.red }}>
              风扇狂转！全在做无用功！
            </div>
          </div>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'stream-select') {
    const wakeUp = localFrame > 55;
    return (
      <StageContainer
        banner="委托内核保安：别自己跑圈了，有人说话再踹醒我！"
        conceptPill="I/O 多路复用 (stream_select)：休眠时 CPU 0.0%"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="PHP 接线员" subtitle="用户态" accent={wakeUp ? 'orange' : 'green'} width={440} badge={wakeUp ? '毫秒唤醒!' : '安心休息'}>
            <CodeHint text="stream_select($read, $w, $e, null);" highlight={wakeUp} />
            <CpuGauge
              percent={wakeUp ? '0.1%' : '0.0%'}
              stateLabel={wakeUp ? 'R (处理 FD 4)' : 'S (Sleeping)'}
              mode={wakeUp ? 'normal' : 'idle'}
              localFrame={localFrame}
            />
          </BoxCard>

          <AnimatedFlowArrow
            width={240}
            label={wakeUp ? 'FD 4 亮灯唤醒!' : '交名单 [3,4,5]'}
            color={wakeUp ? THEME.orange : THEME.green}
            progress={enter}
            pulse={wakeUp ? pulseCycle : null}
          />

          <BoxCard title="Linux 内核 select 保安" subtitle="替你盯着所有通道" accent="blue" width={540}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              {['FD 3 大门', 'FD 4 客人A', 'FD 5 客人B'].map((lbl, i) => {
                const lit = wakeUp && i === 1;
                return (
                  <div
                    key={lbl}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 14,
                      border: `3px solid ${lit ? THEME.orange : THEME.dark}`,
                      backgroundColor: lit ? THEME.orange : '#fff',
                      fontWeight: 800,
                      fontSize: 22,
                    }}
                  >
                    {lbl}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 23, fontWeight: 700, textAlign: 'center', color: THEME.dark }}>
              {wakeUp ? '发现 FD 4 来数据了，精准叫醒进程！' : '全员静默，挂起进程不耗半点 CPU'}
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'eraser-trap') {
    const erased = pop > 0.3;
    return (
      <StageContainer
        banner="惊天大坑：调用一次 stream_select 后，3 号大门不见了！"
        conceptPill="引用传参陷阱 (&$read)：内核用涂改液抹掉了未就绪 FD"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <BoxCard title="调用前递交的 $read" subtitle="传入参数" accent="blue" width={430}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '12px 18px', borderRadius: 12, border: `3px solid ${THEME.dark}`, backgroundColor: '#fff', fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 700 }}>
                [3] 迎宾员 $server
              </div>
              <div style={{ padding: '12px 18px', borderRadius: 12, border: `3px solid ${THEME.dark}`, backgroundColor: '#fff', fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 700 }}>
                [4] 客人 A $connA
              </div>
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={230} label="引用修改 &$read" color={THEME.red} progress={enter} />

          <BoxCard title="醒来后拿回的 $read" subtitle="被内核涂改" accent="red" width={470} badge={erased ? '3 号大门蒸发！' : undefined}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: `3px dashed ${THEME.red}`,
                  backgroundColor: '#fff',
                  fontFamily: THEME.fontMono,
                  fontSize: 24,
                  fontWeight: 700,
                  textDecoration: erased ? 'line-through' : 'none',
                  opacity: erased ? 0.32 : 1,
                }}
              >
                [3] 迎宾员 $server (被抹掉!)
              </div>
              <div style={{ padding: '12px 18px', borderRadius: 12, border: `3px solid ${THEME.green}`, backgroundColor: THEME.greenBg, fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 800 }}>
                [4] 客人 A $connA (只留亮灯者)
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // all-sockets
  return (
    <StageContainer
      banner="防涂改铁律：原始电话本 $allSockets 永不直接上交！"
      conceptPill="SelectLoop 事件循环诞生：$read = $this->allSockets"
      conceptColor={THEME.dark}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <BoxCard title="永久总花名册 $allSockets" subtitle="母本绝不传参" accent="orange" width={450} badge="永久保存">
          <div style={{ fontFamily: THEME.fontMono, fontSize: 23, fontWeight: 700, lineHeight: 1.7 }}>
            <div>[3] =&gt; $server (大门)</div>
            <div>[4] =&gt; $connA (客人A)</div>
            <div>[5] =&gt; $connB (客人B)</div>
          </div>
        </BoxCard>

        <AnimatedFlowArrow width={220} label="每轮复印一份" color={THEME.dark} progress={enter} pulse={pulseCycle} />

        <BoxCard title="临时复印件 $read" subtitle="交给 stream_select" accent="blue" width={540}>
          <CodeHint text="$read = $this->allSockets;" highlight />
          <CodeHint text="stream_select($read, $w, $e, null);" />
          <div style={{ fontSize: 23, fontWeight: 700, color: THEME.green }}>
            涂改液随便改复印件，母本永远完整！有新客再登记进母本，断开就 unset 划掉。
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
