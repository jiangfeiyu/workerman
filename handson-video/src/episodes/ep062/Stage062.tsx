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
  { text: '// ❌ 危险操作：SSH 里跑 `php server.php &` 没做守护化！' },
  { text: '$pid = pcntl_fork();' },
  { text: 'if ($pid === 0) {' },
  { text: '    // 仍归属于当前 SSH 会话的控制终端组', diff: 'removed' },
  { text: '    while (true) { serveRequests(); }' },
  { text: '}' },
  { text: '' },
  { text: '// 你一关笔记本 / 断开 SSH 窗口：' },
  { text: '// 内核立刻向整个前台会话组广播 SIGHUP(1) 挂断信号！' },
  { text: 'posix_kill($pid, SIGHUP); // 默认动作：当场杀光全家!', diff: 'removed' },
  { text: 'pcntl_waitpid($pid, $status);' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage062: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · SIGHUP 挂断灭门实测',
      status: { label: 'SIGHUP KILLED 💥', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'error', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么加了 & 后台运行还是会死？" badge="会话连坐机制" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          SSH 窗口关闭
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          内核投递 SIGHUP(1)
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          原终端会话全组连坐阵亡!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP062 · 踩坑：关掉 SSH 服务灭门"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'ssh-close' ? [1, 4] : [8, 9, 10]}
      callout={
        visual === 'ssh-close'
          ? { line: 6, text: '& 只是退到终端后台，依然绑死在这个 SSH 会话里', tone: 'amber' }
          : { line: 7, text: '必须调用 setsid 脱离原会话才能免疫 SIGHUP', tone: 'red' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
