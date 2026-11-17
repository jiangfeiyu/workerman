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
  { text: '$counter = 100; // fork 前初始值' },
  { text: '' },
  { text: '$pid = pcntl_fork();' },
  { text: 'if ($pid === 0) {' },
  { text: '    // 触发 Copy-On-Write：内核当场拷贝物理页给子进程!', diff: 'added' },
  { text: '    $counter += 50; // 子进程里变成 150', diff: 'added' },
  { text: '    fwrite($w, "child={$counter}");' },
  { text: '    exit(0);' },
  { text: '}' },
  { text: '' },
  { text: 'pcntl_waitpid($pid, $status);' },
  { text: '// 父进程物理页没被改过，依然是 100!', diff: 'added' },
  { text: 'echo "parent={$counter}";' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'active' as const },
  { label: '4.2 守护与CLI', state: 'todo' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage056: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Copy-On-Write 物理内存隔离实测',
      status: { label: 'MEMORY ISOLATED ✅', tone: 'amber' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'normal', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'warn', appearAtFrame: 34 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Copy-On-Write (写时复制) 页表分裂" badge="多进程互通必须走 IPC" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          只读阶段: 共享同一物理页 (100)
        </div>
        <span>── 写入触发分裂 ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          子进程私有页=150 | 父进程原页=100
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP056 · COW 写时复制隔离"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={5}
      focusLines={visual === 'cow-read' ? [5, 7] : [10, 16, 17]}
      callout={
        visual === 'cow-read'
          ? { line: 6, text: '不修改就不复制，fork 百个 Worker 超省内存', tone: 'blue' }
          : { line: 14, text: '写入即拷贝新页！进程间变量绝不互通', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
