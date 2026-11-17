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
  { text: '$workers = []; // [pid => slot]' },
  { text: 'forkOneWorker(slot: 1); forkOneWorker(slot: 2);' },
  { text: '' },
  { text: '// Master 永不亲自处理请求，核心只有这 10 行监工循环！' },
  { text: 'while (count($workers) > 0) {' },
  { text: '    $deadPid = pcntl_wait($status); // 阻塞等任何子进程出事', diff: 'added' },
  { text: '    $slot    = $workers[$deadPid];' },
  { text: '    unset($workers[$deadPid]);' },
  { text: '    $code    = pcntl_wexitstatus($status);' },
  { text: '    if (!$isStopping && $code !== 0) {' },
  { text: '        // 发现非正常崩溃 -> 秒级拉起全新替补进程!', diff: 'added' },
  { text: '        $newPid = forkOneWorker($slot);', diff: 'added' },
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

export const Stage060: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Worker #1 崩溃后 Master 秒级拉起替补实测',
      status: { label: 'AUTO RESPAWN ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'error', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 26 },
        { text: snapshot.output[2], tone: 'warn', appearAtFrame: 44 },
        { text: snapshot.output[3], tone: 'success', appearAtFrame: 62 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Master 7×24 自愈监工机" badge="打不死的高可用骨架" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          Worker #1 崩溃 code=9
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          pcntl_wait 返回 PID
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Master fork 替补 pid=70559 顶班!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP060 · Master 监工自动拉起"
      fileName="Master.php"
      lines={LINES}
      startLineNumber={18}
      focusLines={visual === 'master-loop' ? [22, 23, 24] : [27, 28, 29]}
      callout={
        visual === 'master-loop'
          ? { line: 21, text: 'Master 只盯 PID 花名册，永不被业务代码拖垮', tone: 'blue' }
          : { line: 30, text: '替补立刻顶上，保证永远满编运转', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
