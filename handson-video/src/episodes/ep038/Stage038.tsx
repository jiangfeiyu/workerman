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
  { text: '// 【铺垫】把长度数字 300 变成 4 个大端序二进制字节！', diff: 'added' },
  { text: '$len = 300; // 0x0000012C = 1 * 256 + 44', diff: 'added' },
  { text: '$packed = pack("N", $len);', diff: 'added' },
  { text: '' },
  { text: '$bytesHex = [];' },
  { text: 'for ($i = 0; $i < strlen($packed); $i++) {' },
  { text: '    $bytesHex[] = sprintf("0x%02X (%d)", ord($packed[$i]), ord($packed[$i]));' },
  { text: '}' },
  { text: '' },
  { text: '$unpacked = unpack("Nlen", $packed);', diff: 'added' },
  { text: 'echo "[pack(\'N\', 300) 4字节大端序] " . implode(" | ", $bytesHex) . "\\n";' },
  { text: 'echo "[unpack(\'Nlen\') 还原整数] len = " . $unpacked["len"] . "\\n";' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage038: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (字节显微镜)',
      status: { label: 'BIG-ENDIAN 🔬', tone: 'blue' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 22 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 字节 X-Ray · 整数 300 的 4 字节大端序切面" badge="1×256 + 44 = 300" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { idx: 'Byte 0', hex: '0x00', dec: '0' },
          { idx: 'Byte 1', hex: '0x00', dec: '0' },
          { idx: 'Byte 2', hex: '0x01', dec: '1 (×256)' },
          { idx: 'Byte 3', hex: '0x2C', dec: '44' },
        ].map((b) => (
          <div key={b.idx} style={{ flex: 1, padding: '8px', borderRadius: 10, textAlign: 'center', backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
            <div style={{ fontSize: 12, color: THEME.mutedText }}>{b.idx}</div>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 17, fontWeight: 800, color: THEME.blue }}>{b.hex}</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{b.dec}</div>
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP038【铺垫】· 二进制 pack / unpack"
      fileName="ep38/demo.php"
      lines={LINES}
      focusLines={visual === 'why-binary' ? [4, 5, 6] : [6, 10, 13]}
      callout={
        visual === 'pack-microscope'
          ? { line: 6, text: "格式 'N' = 网络大端序 32 位整数", tone: 'blue' }
          : { line: 5, text: '不怕正文里出现任何 \\n 换行符！', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
