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
  { text: '$first  = ord($buffer[0]);' },
  { text: '$fin    = ($first >> 7) & 1;  // 1=最后一片 0=还有后续分片', diff: 'added' },
  { text: '$opcode = $first & 0x0F;      // 低4位帧类型编号', diff: 'added' },
  { text: '' },
  { text: '$type = match ($opcode) {' },
  { text: '    0x1 => "Text 文本帧",', diff: 'added' },
  { text: '    0x2 => "Binary 二进制帧",' },
  { text: '    0x8 => "Close 挥手断开帧",' },
  { text: '    0x9 => "Ping 心跳探测帧",' },
  { text: '    0xA => "Pong 心跳回复帧",' },
  { text: '    default => "Continuation / Reserved",' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage050: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (第 1 字节位运算解析)',
      status: { label: 'FIN + OPCODE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('success' as const) : ('info' as const),
        appearAtFrame: 14 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 第 1 字节 8 个 bit 布局" badge="0x81 = 文本完整帧" badgeTone="blue">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          bit7: FIN (1)
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.softBg, border: `2px solid ${THEME.gridColor}`, color: THEME.mutedText }}>
          bit6..4: RSV1~3 (000)
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          bit3..0: Opcode (0001 = Text)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP050 · 解析帧头第 1 字节"
      fileName="WebsocketProtocol.php"
      lines={LINES}
      startLineNumber={20}
      focusLines={visual === 'byte1-parse' ? [20, 21, 22] : [25, 27, 28, 29]}
      callout={
        visual === 'byte1-parse'
          ? { line: 23, text: '刚学的 >>7 和 & 0x0F 直接上手', tone: 'blue' }
          : { line: 31, text: '0x80 | 0x01 === 0x81 文本终帧', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
