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
  { text: '$byte1 = 0x81; // 二进制 1000 0001 -> FIN=1, Opcode=1', diff: 'added' },
  { text: '$fin    = ($byte1 >> 7) & 1;   // 右移7位再 & 1 => 1' },
  { text: '$opcode = $byte1 & 0x0F;       // 低4位掩码     => 1' },
  { text: '' },
  { text: '$byte2 = 0x85; // 二进制 1000 0101 -> MASK=1, Len=5', diff: 'added' },
  { text: '$masked  = ($byte2 >> 7) & 1;  // 1' },
  { text: '$lenCode = $byte2 & 0x7F;      // 低7位掩码     => 5' },
  { text: '' },
  { text: '// 异或对称魔术: 同一密钥 XOR 两次必回原文' },
  { text: '$plain = "Hello"; $key = "\\x1A\\x2B\\x3C\\x4D";' },
  { text: 'for ($i = 0; $i < strlen($plain); $i++) {' },
  { text: '    $cipher .= $plain[$i] ^ $key[$i % 4];', diff: 'added' },
  { text: '}' },
  { text: 'for ($i = 0; $i < strlen($cipher); $i++) {' },
  { text: '    $back .= $cipher[$i] ^ $key[$i % 4]; // 还原 Hello!', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage049: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 位运算灯泡课实测输出',
      status: { label: 'BITWISE ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 34 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const bits = ['1', '0', '0', '0', '0', '0', '0', '1'];
  const xray = (
    <XRayInspector title="🔬 1 字节 = 8 盏开关灯泡 (0x81 = 1000 0001)" badge="位运算显微镜" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {bits.map((b, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              padding: '6px 0',
              borderRadius: 8,
              textAlign: 'center',
              fontFamily: THEME.fontMono,
              fontWeight: 900,
              fontSize: 16,
              backgroundColor: b === '1' ? THEME.amberBg : THEME.softBg,
              border: `2px solid ${b === '1' ? THEME.amber : THEME.gridColor}`,
              color: b === '1' ? THEME.amber : THEME.mutedText,
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'bulbs-intro'
      ? [1, 5]
      : visual === 'shift-mask'
      ? [2, 3, 6, 7]
      : [10, 12, 15];

  const callout =
    visual === 'bulbs-intro'
      ? { line: 4, text: '1 字节同时压缩了开关位与数值位', tone: 'blue' as const }
      : visual === 'shift-mask'
      ? { line: 8, text: '>> 踢到最右，& 过滤只留目标位', tone: 'amber' as const }
      : { line: 13, text: '(A ^ Key) ^ Key === A 完美还原', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP049 · 铺垫：位运算灯泡课"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={16}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
