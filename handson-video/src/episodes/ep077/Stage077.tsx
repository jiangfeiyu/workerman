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
  { text: 'function deepQuery(): string' },
  { text: '{' },
  { text: '    // 比 yield 强在哪？套了 3 层普通函数依然可以直接 suspend 冻结!', diff: 'added' },
  { text: "    \$row = Fiber::suspend('WAIT_DB_ROW');", diff: 'added' },
  { text: '    return "GOT: {\$row}";' },
  { text: '}' },
  { text: '' },
  { text: 'function serviceLayer(): string { return deepQuery(); }' },
  { text: '' },
  { text: '$fiber = new Fiber(fn () => "FINAL => " . serviceLayer());', diff: 'added' },
  { text: '$signal = $fiber->start(); // 停在 3 层调用栈正中间!' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage077: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (3 层调用栈原地冻结)',
      status: { label: 'STACKFUL FIBER ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 16 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 无栈 yield 生成器 vs 有栈 Fiber 协程" badge="PHP 8.1+ 质变" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          yield 无栈: 只能在顶层暂停，嵌套全写 yield from ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Fiber 有栈: 独立 C/PHP 调用栈，任意深处直接冻结 ✅
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP077 · Fiber 冻结魔法"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'why-fiber' ? [6, 11] : [6, 7, 13, 14]}
      callout={
        visual === 'why-fiber'
          ? { line: 12, text: 'serviceLayer 压根不用加任何异步关键字', tone: 'blue' }
          : { line: 9, text: '整条深层调用栈现场被原封打包暂存', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
