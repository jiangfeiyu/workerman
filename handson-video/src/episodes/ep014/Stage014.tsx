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
  { text: '// 【过渡】先用数组闹钟推导超时睡眠公式：' },
  { text: '[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '$now = microtime(true);' },
  { text: '$timers = [' },
  { text: "    ['at' => \$now + 0.15, 'msg' => '闹钟 A (150ms)']," },
  { text: "    ['at' => \$now + 0.05, 'msg' => '闹钟 B (50ms)']," },
  { text: '];' },
  { text: '' },
  { text: 'while ($timers !== []) {' },
  { text: "    \$nextAt = min(array_column(\$timers, 'at'));", diff: 'added' },
  { text: '    $waitSec = max(0.0, $nextAt - microtime(true));', diff: 'added' },
  { text: '    $sec = (int)$waitSec;', diff: 'added' },
  { text: '    $usec = (int)(($waitSec - $sec) * 1_000_000);', diff: 'added' },
  { text: '' },
  { text: '    $read = [$r]; $write = $except = null;' },
  { text: '    @stream_select($read, $write, $except, $sec, $usec);', diff: 'modified' },
  { text: '' },
  { text: '    $cur = microtime(true);' },
  { text: '    foreach ($timers as $k => $t) {' },
  { text: "        if (\$cur >= \$t['at']) {" },
  { text: "            echo sprintf('[到点 +%dms] %s\\n', round((\$cur-\$now)*1000), \$t['msg']);" },
  { text: '            unset($timers[$k]);' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
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

export const Stage014: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: 'EXACT TIMING ⏱️', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: 'success' as const,
        appearAtFrame: 25 + i * 35,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 公式 X-Ray · 为什么必须套 max(0.0, ...)？" badge="防负数崩 select" badgeTone="amber">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, fontWeight: 700 }}>
          如果上轮业务处理耗时太久，$nextAt - now 会算出负数！
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, fontWeight: 700, color: THEME.green }}>
          max(0.0, ...) 兜底成 0，stream_select 立刻返回 0 当场补发逾期闹钟！
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP014【过渡】· 睡眠时间公式推导"
      fileName="ep14/demo.php"
      lines={LINES}
      focusLines={visual === 'formula' ? [13, 14, 15, 16, 19] : [23, 24, 25]}
      typeRange={
        visual === 'formula'
          ? { fromLine: 13, toLine: 19, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'formula'
          ? { line: 14, text: '关键防线：max(0.0, $nextAt - now)', tone: 'amber' }
          : { line: 23, text: '下集：用最小堆 O(1) 拿 $nextAt', tone: 'green' }
      }
      fontSize={16}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
