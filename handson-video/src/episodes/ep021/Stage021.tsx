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
  { text: "require_once __DIR__ . '/../Worker.php';" },
  { text: '' },
  { text: "\$port = getenv('PORT') ?: '9021';" },
  { text: '$worker = new WorkerV01("tcp://127.0.0.1:{$port}");', diff: 'added' },
  { text: '' },
  { text: '$worker->onConnect = fn ($conn) => print("[聊天室] 上线 fd=" . (int)$conn . "\\n");', diff: 'added' },
  { text: '$worker->onClose = fn ($conn) => print("[聊天室] 下线 fd=" . (int)$conn . "\\n");', diff: 'added' },
  { text: '$worker->onMessage = function ($sender, string $msg) use ($worker): void {', diff: 'added' },
  { text: '    foreach ($worker->connections as $conn) {' },
  { text: '        if ($conn !== $sender) {' },
  { text: '            fwrite($conn, "[来自 fd=" . (int)$sender . "] " . $msg);' },
  { text: '        }' },
  { text: '    }' },
  { text: '};', diff: 'added' },
  { text: '' },
  { text: 'echo "[聊天室] 第 1 篇合拢验收启动 tcp://127.0.0.1:{$port}\\n";' },
  { text: '$worker->start();', diff: 'added' },
];

export const Stage021: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.1 Socket破冰', state: 'done' as const },
    { label: '1.2 SelectLoop', state: 'done' as const },
    { label: '1.3 Timer', state: 'done' as const },
    { label: '1.4 Worker v0.1', state: visual === 'part1-summary' ? ('done' as const) : ('active' as const) },
    { label: '2.x TcpConnection', state: visual === 'part1-summary' ? ('active' as const) : ('todo' as const) },
    { label: '3.x HTTP/WS', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 聊天室服务端日志',
      status: { label: 'PART 1 COMPLETE 🎉', tone: 'green' },
      command: 'PORT=19021 php server.php',
      localFrame,
      lines: snapshot.serverOutput.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : i >= 3 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 12 + i * 24,
      })),
    },
    {
      id: 't2',
      title: 'Terminal 2 · Alice (fd=10) & Bob (fd=11) 实时互聊',
      status: { label: 'BROADCAST ✅', tone: 'blue' },
      localFrame,
      lines: [
        { text: 'Alice > Hello Bob!', tone: 'cmd', appearAtFrame: 35 },
        { text: `Bob 收到: ${snapshot.bobReceived}`, tone: 'success', appearAtFrame: 52 },
        { text: 'Bob > Hi Alice!', tone: 'cmd', appearAtFrame: 80 },
        { text: `Alice 收到: ${snapshot.aliceReceived}`, tone: 'success', appearAtFrame: 96 },
      ],
    },
  ];

  const xray = (
    <XRayInspector
      title="🔬 毕业 X-Ray · 第 1 篇拼装完成 & 第 2 篇预告"
      badge={visual === 'part1-summary' ? '第 1 篇毕业 🎓' : '8 行写聊天室'}
      badgeTone={visual === 'part1-summary' ? 'amber' : 'green'}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ 第 1 篇已掌握</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>SelectLoop + 最小堆 Timer + WorkerV01</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>🔥 第 2 篇即将攻克</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>10MB 丢 7MB 惨案 → TcpConnection 发送缓冲</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP021【第 1 篇合拢】· 8 行写广播聊天室"
      fileName="ep21/server.php"
      lines={LINES}
      focusLines={visual === 'chat-code' ? [9, 10, 11, 14] : [12, 13, 14, 20]}
      typeRange={
        visual === 'chat-code'
          ? { fromLine: 7, toLine: 20, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'part1-summary'
          ? { line: 14, text: '下篇解决：大文件直接 fwrite 会丢包！', tone: 'amber' }
          : { line: 14, text: '8 行业务代码跑在自研异步引擎上！', tone: 'green' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
