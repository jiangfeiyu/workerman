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
  { text: '$fiber = new Fiber(function (): string {' },
  { text: "    // 去程：向调度器抛出意图；回程：接收 resume() 传回的数据!", diff: 'added' },
  { text: "    $row = Fiber::suspend('WAIT_DB_ROW');", diff: 'added' },
  { text: '    return "FINAL => GOT: {$row}";' },
  { text: '});' },
  { text: '' },
  { text: '$signal = $fiber->start(); // 1. 收到 WAIT_DB_ROW', diff: 'added' },
  { text: '// ... 调度器用 Epoll 等到 MySQL 结果后 ...' },
  { text: "$fiber->resume('user#42');  // 2. 把数据塞回第 3 行 $row!", diff: 'added' },
  { text: 'echo $fiber->getReturn();  // 3. 拿到 FINAL => GOT: user#42' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage078: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · suspend ↔ resume 双向传值接力实测',
      status: { label: '2-WAY HANDOFF ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Fiber 双向传值高速公路" badge="异步变同步的核心原语" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          去程: Fiber::suspend(&quot;REQ&quot;) → start() 返回 REQ
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          回程: $fiber-&gt;resume(&quot;DATA&quot;) → 变成 suspend() 返回值!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP078 · 双向传值 suspend/resume"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={10}
      focusLines={visual === 'suspend-out' ? [12, 16] : [12, 18, 19]}
      callout={
        visual === 'suspend-out'
          ? { line: 15, text: 'start() 的返回值就是里面 suspend 递出的请求', tone: 'amber' }
          : { line: 17, text: 'resume() 的入参会直接穿墙赋给内部 $row', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
