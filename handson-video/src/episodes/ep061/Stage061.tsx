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
  { text: '// 1. 安全降权：root 启动绑完 80/443 低位端口后立刻降权成普通用户' },
  { text: "function dropPrivilege(string $user = 'www-data'): void" },
  { text: '{' },
  { text: '    $info = posix_getpwnam($user);' },
  { text: '    posix_setgid($info["gid"]);' },
  { text: '    posix_setuid($info["uid"]); // Worker 从此失去系统高危权限!', diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: '// 2. 彻底消灭惊群：开启 SO_REUSEPORT 让内核哈希分配新连接' },
  { text: '$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);' },
  { text: 'socket_set_option($sock, SOL_SOCKET, SO_REUSEPORT, 1);', diff: 'added' },
  { text: "socket_bind($sock, '0.0.0.0', 8080); // 每个 Worker 各自 listen!" },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'active' as const },
  { label: '4.2 守护与CLI', state: 'todo' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage061: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (降权与 SO_REUSEPORT)',
      status: { label: 'REUSEPORT ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 14 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 权限降级 + SO_REUSEPORT 内核均衡" badge="模块 4.1 收官" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          root 仅用来绑低端口 → fork 后降权
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          SO_REUSEPORT → 内核单队列只唤醒 1 个 Worker
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP061 · 降权与 SO_REUSEPORT"
      fileName="Worker.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'setuid' ? [2, 5, 6] : [10, 11, 12]}
      callout={
        visual === 'setuid'
          ? { line: 7, text: '先 setgid 再 setuid 彻底收走超级权限', tone: 'amber' }
          : { line: 8, text: '内核四元组哈希分发，告别全员抢单惊群', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
