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
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: '' },
  { text: '// 【铺垫】PHP 内置 SplPriorityQueue 默认是大顶堆（数字越大越先出队）', diff: 'removed' },
  { text: '$badHeap = new SplPriorityQueue();', diff: 'removed' },
  { text: "$badHeap->insert('0.5秒后响', 0.5);" },
  { text: "$badHeap->insert('0.1秒后响', 0.1);" },
  { text: "$badHeap->insert('1.0秒后响', 1.0);" },
  { text: 'echo "[默认大顶堆队头] " . $badHeap->top() . " (最晚的先出，错了！)\\n";' },
  { text: '' },
  { text: '// ✅ 破解绝招：把时间戳取负数 -$triggerAt 当权重！', diff: 'added' },
  { text: '$minHeap = new SplPriorityQueue();', diff: 'added' },
  { text: "$minHeap->insert('0.5秒后响', -0.5);", diff: 'added' },
  { text: "$minHeap->insert('0.1秒后响', -0.1);", diff: 'added' },
  { text: "$minHeap->insert('1.0秒后响', -1.0);", diff: 'added' },
  { text: '' },
  { text: '$order = [];' },
  { text: 'while (!$minHeap->isEmpty()) {' },
  { text: '    $order[] = $minHeap->extract();' },
  { text: '}' },
  { text: 'echo "[取负变最小堆后出队顺序] " . implode(" -> ", $order) . "\\n";' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'done' as const },
  { label: '1.3 Timer', state: 'active' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage013: React.FC<StageProps> = ({ visual, localFrame }) => {
  const isBad = visual === 'max-heap-trap';
  const isFix = visual === 'negate-trick' || visual === 'verify-order';

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: isBad ? 'WRONG ORDER ❌' : 'MIN-HEAP O(logN) ✅', tone: isBad ? 'red' : 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        ...(isBad || isFix ? [{ text: snapshot.output[0], tone: 'error' as const, appearAtFrame: 20 }] : []),
        ...(isFix ? [{ text: snapshot.output[1], tone: 'success' as const, appearAtFrame: 55 }] : []),
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 算法 X-Ray · 负数反转大小关系" badge="-0.1 > -0.5 > -1.0" badgeTone="green">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: THEME.red }}>正数权重 (大顶堆)</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 14, marginTop: 4 }}>1.0 &gt; 0.5 &gt; 0.1 → 最晚先出</div>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: THEME.green }}>负数权重 (变小顶堆!)</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 14, marginTop: 4 }}>-0.1 &gt; -0.5 &gt; -1.0 → 最早先出</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP013【铺垫】· SplPriorityQueue 最小堆"
      fileName="ep13/demo.php"
      lines={LINES}
      focusLines={isBad ? [5, 8, 9] : isFix ? [11, 13, 14, 15, 21] : [4, 5]}
      typeRange={
        visual === 'negate-trick'
          ? { fromLine: 11, toLine: 16, localFrame, startFrame: 6, framesPerLine: 16 }
          : undefined
      }
      callout={
        isBad
          ? { line: 9, text: '1.0 秒的闹钟竟然排最前面！', tone: 'red' }
          : isFix
          ? { line: 14, text: '绝妙一招：权重取负 -0.1 最大！', tone: 'green' }
          : { line: 4, text: '不用手写数组排序 O(N)，堆只需 O(logN)', tone: 'blue' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
