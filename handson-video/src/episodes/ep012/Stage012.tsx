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
  { text: '// 【铺垫】即使没有任何 FD 就绪，第 4/5 参数也能让进程精准定时醒来！', diff: 'added' },
  { text: '[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '' },
  { text: '$t0 = microtime(true);' },
  { text: '$read = [$r];' },
  { text: '$write = $except = null;' },
  { text: '' },
  { text: '// 传入 0 秒 + 200_000 微秒 (= 0.2 秒)', diff: 'added' },
  { text: '$count = @stream_select($read, $write, $except, 0, 200_000);', diff: 'added' },
  { text: '$elapsedMs = round((microtime(true) - $t0) * 1000, 1);' },
  { text: '' },
  { text: 'echo "[select 超时唤醒] 就绪数 = {$count}, 实际睡眠 = {$elapsedMs} ms\\n";' },
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

export const Stage012: React.FC<StageProps> = ({ visual, localFrame }) => {
  const focusLines = visual === 'timeout-param' ? [11, 12] : [12, 13, 15];
  const callout =
    visual === 'timeout-param'
      ? { line: 12, text: '0 秒 + 200,000 微秒 = 精准闹钟！', tone: 'green' as const }
      : { line: 15, text: '期间 0% CPU，到点立刻返回 0', tone: 'blue' as const };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: '205ms WOKE UP ⏰', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: 'success' as const,
        appearAtFrame: 30 + i * 20,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · stream_select 睡眠边界" badge="微秒级闹钟" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          timeout = null → 无限睡死
        </div>
        <span>vs</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          timeout = (0, 200_000) → 谁先到谁叫醒
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP012【铺垫】· select 超时机制"
      fileName="ep12/demo.php"
      lines={LINES}
      focusLines={focusLines}
      typeRange={
        visual === 'timeout-param'
          ? { fromLine: 11, toLine: 15, localFrame, startFrame: 8, framesPerLine: 16 }
          : undefined
      }
      callout={callout}
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
