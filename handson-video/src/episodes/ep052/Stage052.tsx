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
  { text: 'public static function decode(string $package): string' },
  { text: '{' },
  { text: '    $second  = ord($package[1]);' },
  { text: '    $masked  = ($second >> 7) & 1;' },
  { text: '    $lenCode = $second & 0x7f;' },
  { text: '    $offset  = 2 + ($lenCode === 126 ? 2 : ($lenCode === 127 ? 8 : 0));' },
  { text: '    if (!$masked) {' },
  { text: '        return substr($package, $offset);' },
  { text: '    }' },
  { text: '    $maskKey = substr($package, $offset, 4);', diff: 'added' },
  { text: '    $payload = substr($package, $offset + 4);' },
  { text: "    $decoded = '';" },
  { text: '    for ($i = 0, $len = strlen($payload); $i < $len; $i++) {' },
  { text: '        $decoded .= $payload[$i] ^ $maskKey[$i % 4];', diff: 'added' },
  { text: '    }' },
  { text: '    return $decoded;' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage052: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Masking Key 循环异或解密实测',
      status: { label: 'DECODED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: 'MaskKey=0x12345678 | PayloadLen=13B | Head=6B -> Total=19B', tone: 'info', appearAtFrame: 16 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 4B 随机掩码防缓存投毒 + 解密公式" badge="Client → Server 必带" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          MaskKey[0..3]
        </div>
        <span>^</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          Payload[$i]
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          还原原文 &quot;Hi Workerman!&quot;
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP052 · Mask 掩码异或解密"
      fileName="WebsocketProtocol.php"
      lines={LINES}
      startLineNumber={47}
      focusLines={visual === 'why-mask' ? [50, 52, 53, 55] : [56, 57, 59, 60]}
      callout={
        visual === 'why-mask'
          ? { line: 55, text: '随机密钥打乱流，防老旧透明代理缓存投毒', tone: 'amber' }
          : { line: 61, text: '$i % 4 循环取 4B 密钥逐字节 XOR', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
