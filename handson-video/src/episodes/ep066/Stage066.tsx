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
  { text: '$cmd      = $argv[1] ?? "help";' },
  { text: '$flags    = array_slice($argv, 2);' },
  { text: '$daemon   = in_array("-d", $flags, true);', diff: 'added' },
  { text: '$graceful = in_array("-g", $flags, true);', diff: 'added' },
  { text: '$masterPid = (int)@file_get_contents("/tmp/master.pid"); // 定位后台主进程', diff: 'added' },
  { text: '' },
  { text: 'match ($cmd) {' },
  { text: '    "start"  => startAll($daemon),' },
  { text: '    "stop"   => posix_kill($masterPid, $graceful ? SIGTERM : SIGKILL),', diff: 'added' },
  { text: '    "reload" => posix_kill($masterPid, SIGUSR1),', diff: 'added' },
  { text: '    "status" => posix_kill($masterPid, SIGUSR2),' },
  { text: '    default  => printUsage(),' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage066: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (PID 定位 + CLI 映射)',
      status: { label: 'CLI READY ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 10 + i * 16,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 4 大 CLI 指令背后的信号遥控器" badge="模块 4.2 合拢 🎉" badgeTone="green">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        {['start -d → 守护化+锁PID', 'stop -g → 投递 SIGTERM', 'reload → 投递 SIGUSR1', 'status → 投递 SIGUSR2'].map((c) => (
          <div
            key={c}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 8,
              backgroundColor: THEME.greenBg,
              border: `2px solid ${THEME.green}`,
              textAlign: 'center',
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP066 · 合拢：CommandRunner CLI"
      fileName="CommandRunner.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'cli-parse' ? [1, 3, 4] : [5, 8, 9, 10]}
      callout={
        visual === 'cli-parse'
          ? { line: 4, text: '解析 -d / -g 标志位', tone: 'blue' }
          : { line: 5, text: '先从 master.pid 读出 Master PID 再发信号', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
