import React from 'react';
import { spring } from 'remotion';
import { CodeHint, CpuGauge, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage05_03: React.FC<StageProps> = ({
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

  if (visual === 'hotel-two-tables') {
    return (
      <StageContainer
        banner="无面向对象平滑过渡：仅用两个普通 PHP 数组，照样消灭一切 if/else 分支！"
        conceptPill="门铃名单 + 岗位回执卡"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="09_step_by_step_callbacks.php"
            width={620}
            lines={[
              '$readFds   = [(int)$server => $server];',
              '$callbacks = [(int)$server => $onAccept];',
              '// 当某门铃响起：',
              'foreach ($read as $fdSock) {',
              '    $cb = $callbacks[(int)$fdSock];',
              '    $cb($fdSock); // 一行搞定！不需要 if ($fdSock === $server)',
              '}',
            ]}
            activeLine={4}
          />
          <BoxCard title="大饭店前台模型" accent="green" width={480} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• <b>$readFds</b>：交给保安盯着的门铃列表</div>
              <div>• <b>$callbacks</b>：门铃号 → 对应经办人</div>
              <CodeHint text="面向对象 SelectLoop 只是把这俩数组装进类里！" highlight />
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'lt-read-2bytes') {
    return (
      <StageContainer
        banner="隐藏内功 1 实测 (08_level_triggered_demo.php)：一次发 6B，抠门只读 2B → select 连续叫醒 3 次！"
        conceptPill="水平触发 (LT) 铁证"
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
          <TerminalPanel
            title="客户端发 'ABCDEF'，每次仅 fread($conn, 2)"
            width={740}
            localFrame={localFrame}
            stepFrames={22}
            lines={[
              { text: '=== 水平触发实验启动 (PID: 1339) ===', tone: 'dim' },
              { text: '【第 1 次被 select 唤醒】读 2 字节: [AB] (内核还剩 CDEF)', tone: 'warn' },
              { text: '【第 2 次被 select 唤醒】读 2 字节: [CD] (内核还剩 EF)', tone: 'warn' },
              { text: '【第 3 次被 select 唤醒】读 2 字节: [EF] (彻底掏空!)', tone: 'ok' },
            ]}
          />
          <BoxCard title="水位线决定一切" accent="blue" width={380} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              只要内核池子里残留 ≥ 1 字节，每次循环 <code style={{ fontFamily: THEME.fontMono }}>stream_select</code> 都会立刻唤醒你，永不丢包！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'fd-setsize-1024') {
    return (
      <StageContainer
        banner="隐藏内功 2：Linux C 语言底层 fd_set 位图写死 FD_SETSIZE = 1024 个比特！"
        conceptPill="1024 诅咒物理根源"
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
            title="/usr/include/sys/select.h (C 底层结构体)"
            width={620}
            lines={[
              '#define FD_SETSIZE 1024  // 写死在 glibc 头文件里的硬上限！',
              'typedef struct {',
              '    unsigned long fds_bits[1024 / (8 * sizeof(long))];',
              '} fd_set; // 固定仅 128 字节 (1024 bit)',
            ]}
            activeLine={0}
          />
          <BoxCard
            title="FD ≥ 1024 就越界！"
            accent="red"
            width={480}
            minHeight={340}
            badge="FD_SETSIZE = 1024"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              位图数组只有 1024 个格子（0~1023）。一旦连接编号达到 1024，根本塞不进这个结构体，轻则报错重则内存踩踏崩溃！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'select-source-warn') {
    return (
      <StageContainer
        banner="源码印证 (Events/Select.php#L200)：监控数量 ≥ 1024 时 Workerman 主动发出警告！"
        conceptPill="ulimit vs fd_set 区分"
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
            title="Workerman/src/Events/Select.php#L200-L205"
            width={680}
            lines={[
              'if (count($this->readFds) >= 1024) {',
              '    trigger_error(',
              '        "System call select exceeded 1024, please install event ext!",',
              '        E_USER_WARNING',
              '    );',
              '}',
            ]}
            activeLine={0}
          />
          <BoxCard title="别混淆两个上限！" accent="blue" width={420} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• <b>ulimit -n</b>：管单进程总共能开多少个文件 (可调成 10 万+)</div>
              <div style={{ marginTop: 8 }}>• <b>FD_SETSIZE = 1024</b>：select 系统调用自身位图死限，改 ulimit 也救不了！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'write-null-rule') {
    return (
      <StageContainer
        banner="隐藏内功 3：为什么 $write 与 $except 平时必须传 null？否则发送区有空就疯狂唤醒！"
        conceptPill="$write 平时必须传 null"
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
          <BoxCard title="99.9% 时间里内核发送区都是空的" accent="red" width={720} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.8 }}>
              <div>1. 把普通连接放进 <code style={{ fontFamily: THEME.fontMono }}>$write</code> 名单</div>
              <div>2. 内核发现发送区还有大把空余空间 → 立即报“可写就绪”！</div>
              <div>3. <code style={{ fontFamily: THEME.fontMono }}>stream_select</code> 0 微秒返回 → 你的循环陷入 100% CPU 空转风暴！</div>
              <CodeHint text="铁律：只有 sendBuffer 有积压数据时才临时 addWrite，排空秒 delWrite！" highlight />
            </div>
          </BoxCard>
          <CpuGauge percent="100%" stateLabel="常驻监听 write 后果" mode="busy" localFrame={localFrame} />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'timeout-three-modes') {
    const modes = [
      { title: '1. null（永久休眠）', code: 'stream_select($r, $w, $e, null);', desc: '没事件死睡，0.0% CPU，靠网卡中断秒醒', accent: 'green' as const },
      { title: '2. 0（立即返回探测）', code: 'stream_select($r, $w, $e, 0, 0);', desc: '毫秒不睡扫一眼就走，沦为 CPU 空转忙轮询', accent: 'red' as const },
      { title: '3. > 0（限时打盹）', code: 'stream_select($r, $w, $e, $sec, $usec);', desc: '来消息提前醒，到点没消息准时醒 → 定时器底座！', accent: 'blue' as const },
    ];
    return (
      <StageContainer
        banner="隐藏内功 4：stream_select($r, $w, $e, $tv_sec, $tv_usec) 超时参数的三种神态！"
        conceptPill="超时参数三神态"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 22, opacity: enter }}>
          {modes.map((m) => (
            <BoxCard key={m.title} title={m.title} accent={m.accent} width={370} minHeight={340}>
              <div style={{ fontSize: 20, lineHeight: 1.75 }}>{m.desc}</div>
              <CodeHint text={m.code} highlight />
            </BoxCard>
          ))}
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="从 Select 升级 Epoll：消灭 1024 上限 + 消灭用户态/内核态整表拷贝 + 消灭 O(N) 扫描！"
      conceptPill="通往百万并发 Epoll"
      conceptColor={THEME.green}
      localFrame={localFrame}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          transform: `scale(${0.95 + 0.05 * pop})`,
          opacity: enter,
        }}
      >
        <BoxCard title="Select 三大性能瓶颈" accent="red" width={460} minHeight={360}>
          <div style={{ fontSize: 21, lineHeight: 1.8 }}>
            <div>1. 仅支持 1024 个 FD 硬上限</div>
            <div>2. 每次循环从用户态拷贝全量表进内核</div>
            <div>3. 内核与用户态均要 O(N) 遍历查谁响了</div>
          </div>
        </BoxCard>
        <AnimatedFlowArrow width={160} label="多态替换" color={THEME.green} progress={pop} />
        <BoxCard
          title="Epoll 事件驱动终局"
          accent="green"
          width={500}
          minHeight={360}
          badge="100万+ 并发基石"
        >
          <div style={{ fontSize: 21, lineHeight: 1.8 }}>
            <div>• 内核红黑树长期托管（零重复拷贝）</div>
            <div>• 就绪链表精准仅返回活跃 FD（O(1)）</div>
            <div>• 仅需替换 EventLoopInterface 实现，业务零改动！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
