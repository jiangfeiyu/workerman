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
  { text: '    public function send(string $data): bool' },
  { text: '    {' },
  { text: '        if ($this->status !== ConnectionStatus::Established) return false;' },
  { text: '        if ($data === "") return true;' },
  { text: '' },
  { text: '        // 1. 快速路径：必须确认前面没人排队 ($sendBuffer==="")，才许直接 fwrite！', diff: 'added' },
  { text: '        if ($this->sendBuffer === "") {', diff: 'added' },
  { text: '            $written = (int)@fwrite($this->socket, $data);' },
  { text: '            if ($written === strlen($data)) {', diff: 'added' },
  { text: '                return true; // 99% 短消息当场发完！' },
  { text: '            }' },
  { text: '            if ($written > 0) {' },
  { text: '                $data = substr($data, $written);' },
  { text: '            }' },
  { text: '        }' },
  { text: '' },
  { text: '        // 2. 慢速路径：写不完或已有排队，顺序拼接末尾防插队！', diff: 'added' },
  { text: '        $this->sendBuffer .= $data;', diff: 'added' },
  { text: '        $this->loop->onWritable($this->socket, fn () => $this->baseWrite());', diff: 'added' },
  { text: '        return true;' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage028: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (直写 + 保序验证)',
      status: { label: 'FAST + ORDERED ✅', tone: 'blue' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 1 ? ('info' as const) : ('success' as const),
        appearAtFrame: 18 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 发送 X-Ray · 为什么必须先查 $sendBuffer === ''？" badge="严防插队串台" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>Fast Path ($sendBuffer 为空)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>没人排队 → 直接 fwrite()，写完即走</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>Slow Path (已有老包在排队)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>如果硬插队直写就会乱序！必须 .= 排到队尾</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP028 · TcpConnection::send()"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={39}
      focusLines={visual === 'fast-path' ? [45, 46, 47, 48] : [56, 57]}
      typeRange={
        visual === 'fast-path'
          ? { fromLine: 44, toLine: 53, localFrame, startFrame: 6, framesPerLine: 15 }
          : { fromLine: 55, toLine: 59, localFrame, startFrame: 6, framesPerLine: 16 }
      }
      callout={
        visual === 'fast-path'
          ? { line: 45, text: '先查无人排队，才走快速直写！', tone: 'green' }
          : { line: 56, text: '有排队必追加队尾，严防“END”插队跑到前面！', tone: 'amber' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
