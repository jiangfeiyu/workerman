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
  { text: '$server = stream_socket_server("tcp://127.0.0.1:19025", $errno, $errstr);' },
  { text: 'stream_set_blocking($server, false);' },
  { text: '' },
  { text: '// 慢速接收端：连进来先不读数据，让内核发送缓冲区塞满' },
  { text: '$client = stream_socket_client("tcp://127.0.0.1:19025", $e1, $s1, 2);' },
  { text: '$conn = @stream_socket_accept($server, 1);' },
  { text: 'stream_set_blocking($conn, false);' },
  { text: '' },
  { text: '$payload = str_repeat("A", 10 * 1024 * 1024); // 10 MB', diff: 'added' },
  { text: '$totalBytes = strlen($payload);' },
  { text: '$written = @fwrite($conn, $payload); // 🚨 非阻塞裸写！', diff: 'removed' },
  { text: '' },
  { text: '$lostBytes = $totalBytes - (int)$written;' },
  { text: 'echo sprintf("[10MB 裸写惨案] 丢失 = %s bytes (%.1f%%)!\\n", ...);' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage025: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (10MB 实测)',
      status: { label: '96.9% LOST 🚨', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'setup-10mb'
          ? [{ text: '# 准备把 10,485,760 字节直接喂给非阻塞 fwrite()...', tone: 'info', appearAtFrame: 20 }]
          : [
              { text: snapshot.output[0], tone: 'error', appearAtFrame: 20 },
              { text: '⚠️ PHP 无任何报错、无任何 Exception，静默丢掉了 10.15 MB！', tone: 'warn', appearAtFrame: 60 },
            ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · SO_SNDBUF 内核发送缓冲塞满现场" badge="写满即截断" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>PHP 应用层</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>fwrite(10,485,760 B)</div>
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>内核 SO_SNDBUF</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>仅装下 327,212 B 满!</div>
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>剩余 10,158,548 B</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>直接被业务代码忽略丢弃</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP025【踩坑】· 10MB 丢 96.9% 惨案"
      fileName="ep25/demo.php"
      lines={LINES}
      focusLines={visual === 'setup-10mb' ? [10, 12, 14] : [14, 16, 17]}
      typeRange={
        visual === 'setup-10mb'
          ? { fromLine: 12, toLine: 17, localFrame, startFrame: 6, framesPerLine: 16 }
          : undefined
      }
      callout={
        visual === 'disaster-output'
          ? { line: 15, text: '返回 327,212 而非 10,485,760！', tone: 'red' }
          : { line: 15, text: '下集：建 $pending 应用层蓄水池接力续传', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
