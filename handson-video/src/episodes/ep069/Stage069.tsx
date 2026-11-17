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
  { text: '// Master 收到 reload (SIGUSR1) → 转群发给所有活跃 Worker：' },
  { text: 'pcntl_signal(SIGUSR1, function () use ($workers): void {' },
  { text: '    foreach ($workers as $workerPid => $slot) {' },
  { text: '        posix_kill($workerPid, SIGUSR1); // Master 自己不退出!', diff: 'added' },
  { text: '    }' },
  { text: '});' },
  { text: '' },
  { text: '// 老 Worker 收到 SIGUSR1 后优雅交班：' },
  { text: 'pcntl_signal(SIGUSR1, function () use ($loop, $server): void {' },
  { text: '    $loop->offReadable($server); // 1. 摘牌停接新请求', diff: 'added' },
  { text: '    drainPendingAndExit($loop); // 2. 等手头消息发完再 exit(0)!', diff: 'added' },
  { text: '});' },
  { text: '// 3. Master pcntl_wait() 捕获老 Worker 下班 → 秒拉新 Worker 加载 v2.0!' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage069: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (优雅 reload 真进程实测)',
      status: { label: 'ZERO DOWNTIME ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 12 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 平滑热更新 reload 三棒接力" badge="老请求不砍断" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          SIGUSR1 发给老 Worker
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          老 Worker 排空退出
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Master 拉起新 Worker 加载 v2.0!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP069 · 优雅热更新 reload"
      fileName="Master.php"
      lines={LINES}
      startLineNumber={20}
      focusLines={visual === 'reload-sig' ? [21, 22, 23] : [29, 30, 32]}
      callout={
        visual === 'reload-sig'
          ? { line: 25, text: 'Master 绝不动摇，只把接力信号传给子进程', tone: 'blue' }
          : { line: 27, text: 'Master pcntl_wait 顺手完成新老交替！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
