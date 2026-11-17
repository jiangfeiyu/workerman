import React from 'react';
import {
  HandsOnLayout,
  THEME,
  XRayInspector,
  type IDECodeLine,
  type StageProps,
  type TerminalPaneData,
} from '../../components';
import snapshot from './snapshot.json';

const LINES: IDECodeLine[] = [
  { text: '$hitWithoutAsync = false; $hitWithAsync = false;' },
  { text: '' },
  { text: '// 1. 默认不开 async_signals：发完 SIGUSR1 后不会自己跑！', diff: 'removed' },
  { text: 'pcntl_signal(SIGUSR1, function () use (&$hitWithoutAsync): void {' },
  { text: '    $hitWithoutAsync = true;' },
  { text: '});' },
  { text: 'posix_kill(getmypid(), SIGUSR1);' },
  { text: '// 此时 $hitWithoutAsync 依然是 false！必须手调 dispatch() 才触发', diff: 'removed' },
  { text: 'pcntl_signal_dispatch();' },
  { text: '' },
  { text: '// 2. 开启 PHP 7.1+ 异步信号：无需轮询，发信号当场秒级触发！', diff: 'added' },
  { text: 'pcntl_async_signals(true);', diff: 'added' },
  { text: 'pcntl_signal(SIGUSR2, function () use (&$hitWithAsync): void {' },
  { text: '    $hitWithAsync = true;' },
  { text: '});' },
  { text: 'posix_kill(getmypid(), SIGUSR2); // $hitWithAsync 瞬间变为 true！', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage066B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (信号派发对比)',
      status: { label: visual === 'without-async' ? 'WAIT DISPATCH ⏳' : 'ASYNC INSTANT ✅', tone: visual === 'without-async' ? 'amber' : 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 12 + i * 25,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 信号 X-Ray · 手动 dispatch 轮询 vs async_signals" badge="EP067 前置" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>默认模式（被动等轮询）</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>信号先存进待办箱，必须等调用 pcntl_signal_dispatch()</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>pcntl_async_signals(true)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>VM 指令间隙自动秒级派发，睡在 select 也会被惊醒！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP066B【加餐过渡】· 为什么需要 pcntl_async_signals"
      fileName="ep66b/verify.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'without-async' ? [10, 11, 12] : [15, 19]}
      callout={
        visual === 'without-async'
          ? { line: 11, text: '没开异步前发了信号也还是 false！', tone: 'amber' }
          : { line: 15, text: '下集 EP067：看信号惊醒 stream_select (EINTR)', tone: 'green' }
      }
      fontSize={14}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
