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
  { text: '$payload = str_repeat("M", 10 * 1024 * 1024); // 10 MB', diff: 'added' },
  { text: '' },
  { text: '$loop->onReadable($server, function ($srv) use ($loop, $payload): void {' },
  { text: '    $sock = @stream_socket_accept($srv, 0);' },
  { text: '    $conn = new TcpConnection($sock, $loop);', diff: 'added' },
  { text: '    $conn->maxSendBufferSize = 512 * 1024; // 512KB 高水位', diff: 'added' },
  { text: '' },
  { text: '    $conn->onBufferFull = fn () => print("[onBufferFull] 突破 512KB 背压！\\n");' },
  { text: '    $conn->onBufferDrain = fn () => print("[onBufferDrain] 排空恢复！\\n");' },
  { text: '    $conn->onClose = fn () => print("[onClose] 发完自动优雅销毁\\n");' },
  { text: '' },
  { text: '    // 1 行调用：发送 10MB 并在排空最后 1 字节后自动关闭！', diff: 'added' },
  { text: '    $conn->close($payload);', diff: 'added' },
  { text: '});' },
];

export const Stage033: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.x 事件引擎', state: 'done' as const },
    { label: '2.1 连接对象化', state: 'done' as const },
    { label: '2.2 发送缓冲', state: 'done' as const },
    { label: '2.3 优雅断连', state: visual === 'verify-10mb' ? ('done' as const) : ('active' as const) },
    { label: '3.x HTTP/WS', state: visual === 'verify-10mb' ? ('active' as const) : ('todo' as const) },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 2 篇合拢实测 (EP25 地狱用例)',
      status: { label: '10,485,760 B · 0 LOSS 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 15 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 毕业 X-Ray · 第 2 篇对比与第 3 篇预告" badge="第 2 篇毕业 🎓" badgeTone="green">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ EP025 96.9% 丢失 → EP033 0% 丢失</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>完整送达 10,485,760 bytes + 水位背压</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>🔥 第 3 篇即将攻克</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>TCP 粘包半包惨案 → HTTP &amp; WebSocket</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP033【第 2 篇合拢】· 10MB 零丢包"
      fileName="ep33/verify.php"
      lines={LINES}
      startLineNumber={10}
      focusLines={visual === 'test-setup' ? [14, 15, 22] : [17, 18, 19, 22]}
      callout={
        visual === 'verify-10mb'
          ? { line: 22, text: '🎉 10,485,760 字节一字不差！', tone: 'green' }
          : { line: 15, text: '故意压低水位到 512KB 测试背压', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
