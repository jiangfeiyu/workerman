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
  { text: '$maxWatermark = 512 * 1024; // 512 KB 安全线' },
  { text: '$buffer = 0; $paused = false;' },
  { text: '' },
  { text: '// 模拟“上游推流泵 + 慢速消费端”背压联动', diff: 'added' },
  { text: 'for ($tick = 1; $tick <= 5; $tick++) {' },
  { text: '    if (!$paused) {' },
  { text: '        $buffer += 256 * 1024;' },
  { text: '        if ($buffer >= $maxWatermark) {' },
  { text: '            $paused = true; // 收到 onBufferFull → 上游踩刹车！', diff: 'removed' },
  { text: '        }' },
  { text: '    } else {' },
  { text: '        $buffer = max(0, $buffer - 256 * 1024); // 慢端消化' },
  { text: '        if ($buffer === 0) {' },
  { text: '            $paused = false; // 收到 onBufferDrain → 松刹车恢复！', diff: 'added' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage029B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (红绿灯刹车演示)',
      status: { label: visual === 'oom-problem' ? 'RED LIGHT CONCEPT' : 'BACKPRESSURE ✅', tone: visual === 'oom-problem' ? 'red' : 'green' },
      command: 'php demo.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 1 ? ('error' as const) : i === 4 ? ('success' as const) : ('info' as const),
        appearAtFrame: 10 + i * 20,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 背压 X-Ray · 信号灯 vs 刹车动作" badge="上游踩刹车" badgeTone="amber">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>🔴 onBufferFull（红灯信号）</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>框架只负责亮红灯；上游在回调里设 $paused=true 停推！</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>🟢 onBufferDrain（绿灯信号）</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>缓冲排空后亮绿灯；上游设 $paused=false 恢复推流！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP029B【加餐过渡】· 看懂红绿灯背压联动"
      fileName="ep29b/demo.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'oom-problem' ? [11, 12] : [11, 12, 16, 17]}
      callout={
        visual === 'oom-problem'
          ? { line: 12, text: 'onBufferFull 只是通知，真正停推靠 $paused=true！', tone: 'red' }
          : { line: 17, text: '排空后再恢复推流，内存永远稳稳封顶！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
