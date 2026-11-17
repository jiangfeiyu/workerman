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
  { text: '$outside = Fiber::getCurrent(); // 在主线程外调用 => null', diff: 'removed' },
  { text: '' },
  { text: 'class MiniCoroutine', diff: 'added' },
  { text: '{' },
  { text: '    public static function spawn(callable $fn): Fiber', diff: 'added' },
  { text: '    {' },
  { text: '        $fiber = new Fiber($fn);' },
  { text: '        $fiber->start();' },
  { text: '        return $fiber;' },
  { text: '    }' },
  { text: '}' },
  { text: '' },
  { text: 'MiniCoroutine::spawn(function (): void {' },
  { text: '    $me = Fiber::getCurrent(); // 无论嵌套几层函数，随时抓出当前协程对象!', diff: 'added' },
  { text: '    Fiber::suspend("PAUSED");' },
  { text: '});' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage078B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (Fiber::getCurrent 验证)',
      status: { label: 'SELF-LOCATE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 14 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 上下文 X-Ray · 为什么深层函数能拿到当前 Fiber？" badge="EP079 前置" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>主线程顶层调用</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>Fiber::getCurrent() === null</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>spawn() 内部深处调用</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>返回当前正在跑的 $fiber 对象！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP078B【加餐过渡】· Fiber::getCurrent 与 spawn"
      fileName="ep78b/verify.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'get-current' ? [4, 17] : [8, 10, 11, 17]}
      callout={
        visual === 'get-current'
          ? { line: 17, text: '函数深处不必层层传参，getCurrent() 直接抓住自己！', tone: 'blue' }
          : { line: 8, text: '下集 EP079：把 $me 丢给第 1 篇 delay() 到点唤醒！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
