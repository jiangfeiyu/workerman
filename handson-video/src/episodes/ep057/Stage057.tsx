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
  { text: '// ❌ 灾难写法：for 循环里没判断 $pid === 0 并退出!' },
  { text: 'for ($i = 0; $i < 4; $i++) {' },
  { text: '    $pid = pcntl_fork(); // 子进程也继续带着 $i 跑下一轮循环!', diff: 'removed' },
  { text: '}' },
  { text: '// 结果: 1 -> 2 -> 4 -> 8 -> 16 个进程当场爆炸!' },
  { text: '' },
  { text: '// ✅ 工业写法：只在 Master 父进程循环繁殖，子进程立刻干活并退出!' },
  { text: 'for ($i = 0; $i < 4; $i++) {' },
  { text: '    $pid = pcntl_fork();' },
  { text: '    if ($pid === 0) {', diff: 'added' },
  { text: '        runWorkerEventLoop(); // 子进程干完正事', diff: 'added' },
  { text: '        exit(0);              // 生死防线：绝不进入下轮循环!', diff: 'added' },
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

export const Stage057: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 4 次循环 fork 进程爆炸实测',
      status: { label: 'FORK BOMB ×16 💥', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'error', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 44 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 4 次循环不写 exit(0) 的二叉树裂变" badge="2^4 = 16 进程炸弹" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        {['1 (初始)', '→ 2 (i=0)', '→ 4 (i=1)', '→ 8 (i=2)', '→ 16 💥 (i=3)'].map((step, i) => (
          <div
            key={step}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 8,
              backgroundColor: i === 4 ? THEME.redBg : THEME.amberBg,
              border: `2px solid ${i === 4 ? THEME.red : THEME.amber}`,
              textAlign: 'center',
            }}
          >
            {step}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'loop-bug'
      ? [2, 3, 4]
      : visual === 'binary-tree'
      ? [3, 5]
      : [10, 11, 12];

  const callout =
    visual === 'loop-bug'
      ? { line: 4, text: '子进程也会接棒跑剩下的循环', tone: 'red' as const }
      : visual === 'binary-tree'
      ? { line: 6, text: '指数翻倍 2^N，循环 20 次直接百万进程', tone: 'amber' as const }
      : { line: 13, text: 'exit(0) 锁死只有 Master 能继续 fork', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP057 · 踩坑：4次 fork 炸出16进程"
      fileName="demo.php"
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
