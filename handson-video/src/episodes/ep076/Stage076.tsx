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
  { text: '// 1 活跃 + 499 空闲长连接，连续调度 500 轮实测对比：' },
  { text: '$t1 = hrtime(true);' },
  { text: 'for ($t = 0; $t < 500; $t++) {' },
  { text: '    $r = $all500Reads; // O(N): 每轮拷贝扫完 500 个句柄', diff: 'removed' },
  { text: '    stream_select($r, $w, $e, 0, 0);' },
  { text: '}' },
  { text: '$selectMs = (hrtime(true) - $t1) / 1e6; // 本机实测 10.98 ms' },
  { text: '' },
  { text: '// Epoll / Kqueue 就绪链表 O(1) 调度模型：' },
  { text: '$t2 = hrtime(true);' },
  { text: 'for ($t = 0; $t < 500; $t++) {' },
  { text: '    foreach ($readyQueue as $fd) { dispatch($fd); } // 只取 1 个活跃 FD!', diff: 'added' },
  { text: '}' },
  { text: '$epollMs = (hrtime(true) - $t2) / 1e6;  // 本机实测 0.006 ms (1700x!)' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'done' as const },
  { label: '4.4 Epoll核动力', state: 'done' as const },
];

export const Stage076: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 4 篇终极合拢：Select O(N) vs Epoll O(1) 横评',
      status: { label: '1700x SPEEDUP 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 36 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 60 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🏆 第 4 篇毕业全景：现代并发架构五件套就位！" badge="1700.2x 调度提速" badgeTone="green">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 700 }}>
        {['Master 自愈监工', '双 fork 守护化', 'flock PID + CLI', '零断线 reload', 'Epoll O(1) 引擎'].map((k) => (
          <div
            key={k}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 8,
              backgroundColor: THEME.greenBg,
              border: `2px solid ${THEME.green}`,
              textAlign: 'center',
            }}
          >
            {k}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'bench-setup'
      ? [3, 4, 5]
      : visual === 'bench-result'
      ? [7, 12, 14]
      : [12, 14];

  const callout =
    visual === 'bench-setup'
      ? { line: 6, text: '海量空闲长连接是 IM / 弹幕服务最真实常态', tone: 'amber' as const }
      : visual === 'bench-result'
      ? { line: 8, text: '10.98ms vs 0.006ms！并发越多差距是指数级拉大', tone: 'green' as const }
      : { line: 10, text: '下一篇第 5 篇：Fiber 协程 + TLS 加密！', tone: 'blue' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP076 · 第 4 篇收官：万级并发横评"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
