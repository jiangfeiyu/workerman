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
  { text: '$pid = pcntl_fork();' },
  { text: 'if ($pid === 0) {' },
  { text: '    exit(42); // 子进程先行退出，内核保留退出状态等待父进程读取', diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: '// 若父进程一直不 wait，该子进程在 ps 里永远显示 <defunct> (Z 僵尸!)' },
  { text: 'usleep(30_000);' },
  { text: '' },
  { text: '$reaped   = pcntl_waitpid($pid, $status);', diff: 'added' },
  { text: '$normal   = pcntl_wifexited($status);' },
  { text: '$exitCode = pcntl_wexitstatus($status); // 精确读出 42 并销毁僵尸!' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'active' as const },
  { label: '4.2 守护与CLI', state: 'todo' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage059: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · pcntl_waitpid 回收僵尸进程实测',
      status: { label: 'NO ZOMBIE ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 孤儿 vs 僵尸：谁才真正可怕？" badge="PID 表项泄漏防线" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          孤儿进程 (父先死): 1 号 init 自动领养 ✅
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          僵尸进程 Z (子先死父不收尸): 占死 PID 坑位 ❌
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP059 · 孤儿进程 vs 僵尸进程"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'orphan-zombie' ? [6, 9] : [12, 13, 14]}
      callout={
        visual === 'orphan-zombie'
          ? { line: 8, text: '父进程不收尸，子进程就成占坑的僵尸', tone: 'red' }
          : { line: 11, text: 'waitpid 读走遗书 exitCode 并彻底注销表项', tone: 'green' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
