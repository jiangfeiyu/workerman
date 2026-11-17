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
  { text: '// ❌ 致命反面教材：全局只初始化一条共享 $sharedRedis TCP 连接！' },
  { text: '$sharedQueue = [];' },
  { text: '$fA = new Fiber(function () use (&$sharedQueue): string {' },
  { text: "    $sharedQueue[] = 'RES_FOR_A'; // 1. 协程 A 发出请求并挂起等回复", diff: 'removed' },
  { text: '    return Fiber::suspend();      // 让出控制权!', diff: 'removed' },
  { text: '});' },
  { text: '' },
  { text: '$fB = new Fiber(function () use (&$sharedQueue): string {' },
  { text: '    // 2. 协程 B 共用同一条 TCP，趁机直接读走了队列头的包!', diff: 'removed' },
  { text: '    return array_shift($sharedQueue); // 错拿成 RES_FOR_A!', diff: 'removed' },
  { text: '});' },
  { text: '$fA->start(); $fB->start();' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'active' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage086: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 单连接多协程串台灾难现场抓包',
      status: { label: 'DATA CORRUPTION 💥', tone: 'red' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 1 ? 'error' : 'info',
        appearAtFrame: 16 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么同一条 TCP 不能给两根并发协程共用？" badge="必爆张冠李戴" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          Fiber A: 发 GET keyA → suspend
        </div>
        <span>── B 插队读写同1条FD ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          Fiber B 一把顺走 RES_FOR_A 💥
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'shared-trap'
      ? [1, 3, 8]
      : visual === 'interleave'
      ? [4, 5, 9]
      : [10, 12];

  const callout =
    visual === 'shared-trap'
      ? { line: 2, text: '开发测试单人没事，上线高并发必乱套', tone: 'red' as const }
      : visual === 'interleave'
      ? { line: 6, text: 'A 挂起的几毫秒里，B 把同一条管道读乱了', tone: 'amber' as const }
      : { line: 11, text: '一条 TCP 管道同一瞬间只能属于 1 根协程！', tone: 'red' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP086 · 踩坑：单连接并发串台"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
