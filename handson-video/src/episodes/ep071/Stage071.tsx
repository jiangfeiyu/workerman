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
  { text: '// Worker 收到 SIGUSR2 后写下自己当前体检快照：' },
  { text: 'pcntl_signal(SIGUSR2, function () use ($worker): void {' },
  { text: '    $stat = [', diff: 'added' },
  { text: "        'pid'    => getmypid()," },
  { text: "        'memory' => round(memory_get_usage(true) / 1024 / 1024, 1) . 'MB',", diff: 'added' },
  { text: "        'conns'  => count($worker->connections)," },
  { text: "        'qps'    => $worker->totalRequests," },
  { text: '    ];' },
  { text: '    file_put_contents("/tmp/mw_stat_" . getmypid() . ".json", json_encode($stat));', diff: 'added' },
  { text: '});' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage071: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (SIGUSR2 实时看板)',
      status: { label: 'STATUS OK ✅', tone: 'green' },
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
    <XRayInspector title="🔬 跨进程监控看板汇总流" badge="模块 4.3 毕业 🎉" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          SIGUSR2 通知全员
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          各 Worker 写下内存/QPS
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          CLI 汇总打印体检大屏!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP071 · 实时 status 看板"
      fileName="Status.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'status-sig' ? [2, 5, 9] : [4, 5, 6, 7]}
      callout={
        visual === 'status-sig'
          ? { line: 10, text: '子进程独立内存靠临时快照文件汇聚最稳', tone: 'blue' }
          : { line: 3, text: '内存持续攀升的 Worker 一眼排查定位！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
