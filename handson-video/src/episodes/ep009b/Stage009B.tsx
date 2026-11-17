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
  { text: '// 【加餐过渡】10行代码亲手塞满内核写缓冲区！' },
  { text: '[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: 'stream_set_blocking($r, false);' },
  { text: 'stream_set_blocking($w, false);' },
  { text: '' },
  { text: '$chunk = str_repeat(\'A\', 4096); // 每次尝试塞 4KB', diff: 'added' },
  { text: '$totalSent = 0;' },
  { text: '' },
  { text: 'for ($i = 1; $i <= 50; $i++) {' },
  { text: '    $written = @fwrite($w, $chunk);', diff: 'added' },
  { text: '    if ($written === 0 || $written === false) {', diff: 'added' },
  { text: '        echo "[第{$i}次] fwrite 返回 0！缓冲区已塞满 (累计={$totalSent})\\n";' },
  { text: '        break;' },
  { text: '    }' },
  { text: '    $totalSent += $written;' },
  { text: '}' },
  { text: '' },
  { text: '// 另一端读走 8KB，发件柜立刻腾出空位', diff: 'added' },
  { text: '$drained = fread($r, 8192);' },
  { text: 'echo "[收件端读走] " . strlen($drained) . " 字节，腾出空位！\\n";' },
  { text: '$retry = @fwrite($w, $chunk);', diff: 'added' },
  { text: 'echo "[再次 fwrite] 成功塞入 {$retry} 字节！\\n";' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'active' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage009B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'inbox-vs-outbox') {
      return {
        focusLines: [5, 6, 7],
        callout: { line: 5, text: 'fwrite() 写进的是本机内核发件柜！', tone: 'blue' as const },
      };
    }
    if (visual === 'fill-buffer') {
      return {
        focusLines: [12, 13, 14, 15],
        callout: { line: 14, text: '塞满 8192B 后，第 3 次 fwrite 返回 0！', tone: 'red' as const },
      };
    }
    return {
      focusLines: [22, 24],
      callout: { line: 24, text: '有空位 = 可写！所以平时一直处于可写就绪', tone: 'green' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo_full.php',
      status: {
        label: visual === 'fill-buffer' ? 'BUFFER FULL (0B) 🚨' : 'DRAINED & READY ✅',
        tone: visual === 'fill-buffer' ? 'red' : 'green',
      },
      command: 'php demo_full.php',
      localFrame,
      lines:
        visual === 'inbox-vs-outbox'
          ? [{ text: '# 准备测试：不从 $r 读取，只用 $w 疯狂 fwrite...', tone: 'info', appearAtFrame: 20 }]
          : visual === 'fill-buffer'
            ? [
                { text: '# 第1次 fwrite -> 4096 B | 第2次 fwrite -> 4096 B', tone: 'info', appearAtFrame: 15 },
                { text: snapshot.output[0], tone: 'error', appearAtFrame: 45 },
              ]
            : [
                { text: snapshot.output[0], tone: 'warn', appearAtFrame: 10 },
                { text: snapshot.output[1], tone: 'info', appearAtFrame: 40 },
                { text: snapshot.output[2], tone: 'success', appearAtFrame: 75 },
              ],
    },
  ];

  const isFull = visual === 'fill-buffer';
  const isDrain = visual === 'drain-and-why';
  const fillPercent = isFull ? '100%' : isDrain ? '50%' : '0%';
  const barColor = isFull ? THEME.red : isDrain ? THEME.green : THEME.blue;

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · 发件暂存柜（Send Buffer = 8192 B）" badge={isFull ? '已塞爆' : '有空位=可写'} badgeTone={isFull ? 'red' : 'green'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800 }}>
          <span>$w 发送缓冲区水位：</span>
          <span style={{ color: barColor }}>
            {isFull ? '8192 / 8192 B（已满 → fwrite=0）' : isDrain ? '读走8KB后再写4KB → 4096 / 8192 B ✅' : '0 / 8192 B（空柜子 → 天生可写！）'}
          </span>
        </div>
        <div style={{ height: 22, borderRadius: 8, backgroundColor: '#e7e5e4', border: `2px solid ${THEME.dark}`, overflow: 'hidden' }}>
          <div style={{ width: fillPercent, height: '100%', backgroundColor: barColor, transition: 'width 0.3s' }} />
        </div>
        <div style={{ fontSize: 13, color: THEME.mutedText }}>
          💡 <strong>有空位 = 内核认为“可写就绪”</strong>。平时发件柜几乎总有空位，所以挂上 onWritable 会不停触发！
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP009B【加餐过渡】· 塞满内核写缓冲区实战"
      fileName="ep09b/demo_full.php"
      lines={LINES}
      focusLines={ide.focusLines}
      callout={ide.callout}
      fontSize={15}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
