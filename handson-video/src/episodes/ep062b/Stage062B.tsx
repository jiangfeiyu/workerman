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
  { text: '// 1. 模拟终端启动的进程组长 (pid === pgid)，直接调 setsid() 必败！', diff: 'removed' },
  { text: '$leader = pcntl_fork();' },
  { text: 'if ($leader === 0) {' },
  { text: '    posix_setpgid(0, 0); // 让自己成为进程组长 (pid === pgid)' },
  { text: '    $res = @posix_setsid(); // 返回 -1！内核拒绝组长自立新会话！', diff: 'removed' },
  { text: '' },
  { text: '    // 2. 必须先 fork 出非组长子进程，再调 posix_setsid() 立刻成功！', diff: 'added' },
  { text: '    $child = pcntl_fork();', diff: 'added' },
  { text: '    if ($child === 0) {' },
  { text: '        $newSid = posix_setsid(); // pid !== pgid，成功建立独立会话!', diff: 'added' },
  { text: '        exit(0);' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage062B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (组长 setsid 失败 vs fork 成功)',
      status: { label: visual === 'leader-fail' ? 'SETSID = -1 🚨' : 'SETSID OK ✅', tone: visual === 'leader-fail' ? 'red' : 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('error' as const) : i === 1 ? ('success' as const) : ('info' as const),
        appearAtFrame: 12 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 会话 X-Ray · 为什么必须先 fork 一次再调 setsid()？" badge="EP063 前置" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>❌ 终端进程组长 (pid === pgid)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>如果组长能走掉会留下原组分裂，内核直接返回 -1！</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ fork 出子进程 (pid !== pgid)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>子进程不是组长 → posix_setsid() 一举成功！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP062B【加餐过渡】· 为什么不能直接调 setsid()"
      fileName="ep62b/verify.php"
      lines={LINES}
      startLineNumber={10}
      focusLines={visual === 'leader-fail' ? [13, 14] : [17, 19]}
      callout={
        visual === 'leader-fail'
          ? { line: 14, text: '组长直接调 setsid() 必返回 -1！', tone: 'red' }
          : { line: 19, text: '下集 EP063：加上第 2 次 fork 永不绑回终端！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
