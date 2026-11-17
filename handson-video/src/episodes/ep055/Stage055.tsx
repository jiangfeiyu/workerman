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
  { text: '$parentPid = getmypid();' },
  { text: '$pid = pcntl_fork(); // 调用 1 次，在两个进程里各自返回！', diff: 'added' },
  { text: 'if ($pid === -1) {' },
  { text: '    exit(1); // fork 失败' },
  { text: '} elseif ($pid === 0) {', diff: 'added' },
  { text: '    // 这里跑在【子进程】内存里：$pid === 0' },
  { text: '    echo "child={$myPid}, ppid=" . posix_getppid();' },
  { text: '    exit(0);' },
  { text: '}' },
  { text: '// 这里跑在【父进程】内存里：$pid === 新生孩子的 PID', diff: 'added' },
  { text: 'pcntl_waitpid($pid, $status);' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'active' as const },
  { label: '4.2 守护与CLI', state: 'todo' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage055: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · pcntl_fork() 父子双视角实测',
      status: { label: 'FORK ×2 ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 16 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 pcntl_fork() 一次调用 → 两条平行世界线" badge="返回值决定身份" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          父进程 ($pid &gt; 0): 拿到孩子 PID
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          子进程 ($pid === 0): 拿到 0 独立起跑
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP055 · fork() 调用一次返回两次"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={5}
      focusLines={visual === 'fork-split' ? [6, 9, 14] : [10, 11, 15]}
      callout={
        visual === 'fork-split'
          ? { line: 7, text: '同一个函数在父/子进程里各 return 1 次', tone: 'blue' }
          : { line: 12, text: '孩子 exit(0) 防止穿进父进程收尾逻辑', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
