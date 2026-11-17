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
  { text: '// Master 收到 stop -g (SIGTERM)：' },
  { text: 'pcntl_signal(SIGTERM, function () use (&$isStopping, $workers): void {' },
  { text: '    $isStopping = true; // 1. 锁死自愈开关：停机期间绝不再拉新替补!', diff: 'added' },
  { text: '    foreach ($workers as $pid => $slot) {' },
  { text: '        posix_kill($pid, SIGTERM);' },
  { text: '    }' },
  { text: '});' },
  { text: '' },
  { text: '// Worker 优雅排空三部曲（完全复用第 1~2 篇接口）：' },
  { text: 'function gracefulStop(EventLoopInterface $loop, $server, array $conns): void' },
  { text: '{' },
  { text: '    $loop->offReadable($server); // 1. 停止 accept 新连接', diff: 'added' },
  { text: '    foreach ($conns as $conn) { $conn->close(); } // 2. 等发送队列排空', diff: 'added' },
  { text: '    if (count($conns) === 0) { $loop->stop(); }   // 3. 全数清零安全退出', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage070: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (stop -g 排空实测)',
      status: { label: '0 PACKET LOST ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 kill -9 暴力断电 vs stop -g 优雅排空" badge="金融交易级零丢包" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          kill -9 强杀: 半路发送数据直接腰斩丢失 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          stop -g: 关门 + 吐光 $sendBuffer + 零连接退 ✅
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP070 · 优雅停机 stop -g"
      fileName="Worker.php"
      lines={LINES}
      startLineNumber={40}
      focusLines={visual === 'stop-trap' ? [41, 42, 44] : [51, 52, 53]}
      callout={
        visual === 'stop-trap'
          ? { line: 46, text: '忘了设 $isStopping=true 会变成停机死循环补位', tone: 'amber' }
          : { line: 48, text: '复用第 2 篇写的 $conn->close() 排空能力！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
