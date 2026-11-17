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
  { text: 'public static function sleep(float $seconds): void' },
  { text: '{' },
  { text: '    $fiber = Fiber::getCurrent(); // 抓住当前正在跑的协程!', diff: 'added' },
  { text: '    // 直接复用第 1 篇的 EventLoop::delay() 到点唤醒自己!', diff: 'added' },
  { text: '    self::$loop->delay($seconds, static fn () => $fiber->resume());', diff: 'added' },
  { text: '    Fiber::suspend(); // 立刻挂起，绝不阻塞别的协程!', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage079: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (复用 delay() 并发睡眠)',
      status: { label: 'NON-BLOCKING 61.9ms ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('success' as const) : ('info' as const),
        appearAtFrame: 12 + i * 22,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 原生 sleep() 卡全服 vs delay() + Fiber 并发叠加" badge="Timer + Fiber 合体" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          原生 sleep: 60ms + 20ms = 80ms 串行死等 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          $loop-&gt;delay() + suspend(): 总耗时仅 61.9ms ✅
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP079 · 手写 Coroutine::sleep"
      fileName="Coroutine.php"
      lines={LINES}
      startLineNumber={14}
      focusLines={visual === 'sleep-trap' ? [19] : [16, 18, 19]}
      callout={
        visual === 'sleep-trap'
          ? { line: 19, text: '原生 sleep 锁死整条进程，万人同时掉线', tone: 'red' }
          : { line: 18, text: '第 1 篇写的 delay() 到点自动调 $fiber->resume()！', tone: 'green' }
      }
      fontSize={16}
      lineHeight={28}
      terminals={terminals}
      xray={xray}
    />
  );
};
