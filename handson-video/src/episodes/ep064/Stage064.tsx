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
  { text: 'public static function resetStd(string $logFile): void' },
  { text: '{' },
  { text: '    // 1. 关闭从原 SSH 终端继承来的 0/1/2 描述符' },
  { text: '    @fclose(STDIN); @fclose(STDOUT); @fclose(STDERR);', diff: 'removed' },
  { text: '' },
  { text: '    // 2. 利用 OS 最小空闲 FD 分配规则重新占回 0 / 1 / 2 号位!' },
  { text: "    fopen('/dev/null', 'r'); // 稳占 FD #0 (STDIN  黑洞)", diff: 'added' },
  { text: "    fopen($logFile, 'a');    // 稳占 FD #1 (STDOUT -> 日志)", diff: 'added' },
  { text: "    fopen($logFile, 'a');    // 稳占 FD #2 (STDERR -> 日志)", diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage064: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (0/1/2 标准流重定向)',
      status: { label: 'FD 0/1/2 CLEAN ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 12 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么关闭旧 0/1/2 再顺序重开？" badge="最小 FD 分配律" badgeTone="green">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.softBg, border: `2px solid ${THEME.gridColor}`, textAlign: 'center' }}>
          FD 0 (STDIN) → /dev/null
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          FD 1 (echo/STDOUT) → log
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          FD 2 (报错/STDERR) → log
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP064 · 重定向 0/1/2 标准流"
      fileName="Daemon.php"
      lines={LINES}
      startLineNumber={15}
      focusLines={visual === 'std-trap' ? [18] : [21, 22, 23]}
      callout={
        visual === 'std-trap'
          ? { line: 19, text: '不关掉原 TTY 的 0/1/2 会卡住 SSH 断开！', tone: 'amber' }
          : { line: 20, text: 'OS 保证按 0 → 1 → 2 顺序分配给最小空闲槽位', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
