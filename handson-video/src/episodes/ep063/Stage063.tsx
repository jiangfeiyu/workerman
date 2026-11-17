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
  { text: 'public static function daemonize(): void' },
  { text: '{' },
  { text: '    umask(0); // 1. 清空文件权限掩码' },
  { text: '    $pid = pcntl_fork();' },
  { text: '    if ($pid > 0) exit(0); // 2. 原父进程退出，让老二脱群', diff: 'added' },
  { text: '' },
  { text: '    if (posix_setsid() === -1) {', diff: 'added' },
  { text: '        throw new \\RuntimeException("setsid fail");' },
  { text: '    } // 3. 另立无终端新会话！脱离 SSH 魔爪' },
  { text: '' },
  { text: '    $pid = pcntl_fork();', diff: 'added' },
  { text: '    if ($pid > 0) exit(0); // 4. 老二退出，孙子绝无权再绑终端!' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage063: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 两次 fork + posix_setsid() 会话脱离实测',
      status: { label: 'DAEMON DETACHED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 38 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么非要 fork 两次？" badge="Unix 守护进程金律" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          fork #1 脱原进程组
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          setsid() 建无终端新会话
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          fork #2 丢掉领头羊资格
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'first-fork'
      ? [4, 5]
      : visual === 'second-fork'
      ? [7, 11, 12]
      : [3, 9];

  const callout =
    visual === 'first-fork'
      ? { line: 6, text: '只有非组长进程才能调用 posix_setsid()', tone: 'blue' as const }
      : visual === 'second-fork'
      ? { line: 10, text: '孙子非会话首领，内核禁止其打开控制终端', tone: 'green' as const }
      : { line: 3, text: 'umask(0) 确保写日志和建 Socket 权限不受限', tone: 'amber' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP063 · 两次 fork + setsid"
      fileName="Daemon.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={16}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
