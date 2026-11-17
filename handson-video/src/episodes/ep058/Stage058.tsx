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
  { text: "// Master 在 fork 之前先 bind 监听 3 号 FD" },
  { text: "$server = stream_socket_server('tcp://127.0.0.1:8080');", diff: 'added' },
  { text: '' },
  { text: 'for ($i = 1; $i <= 2; $i++) {' },
  { text: '    $pid = pcntl_fork();' },
  { text: '    if ($pid === 0) {' },
  { text: '        // 所有子进程天然继承了同一个 $server 监听句柄！', diff: 'added' },
  { text: '        $conn = stream_socket_accept($server, -1);' },
  { text: '        handleClient($conn);' },
  { text: '        exit(0);' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'active' as const },
  { label: '4.2 守护与CLI', state: 'todo' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage058: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 多 Worker 共享同一个监听端口抢单实测',
      status: { label: 'SHARED FD ✅', tone: 'blue' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 16 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 父子共享内核 Socket 文件描述符" badge="Thundering Herd 惊群隐患" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          Worker #1 / #2 ... #N 睡在同 1 个 FD
        </div>
        <span>◀── 1 个新连接 ──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          全员唤醒仅 1 人抢到 (惊群)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP058 · 共享 FD 与惊群效应"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={3}
      focusLines={visual === 'shared-fd' ? [4, 9, 10] : [9, 10, 11]}
      callout={
        visual === 'shared-fd'
          ? { line: 5, text: '先 bind 后 fork，所有儿子共用同1个 FD', tone: 'blue' }
          : { line: 13, text: '百进程共用 1 FD 会有惊群，EP061 用 SO_REUSEPORT 治！', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
