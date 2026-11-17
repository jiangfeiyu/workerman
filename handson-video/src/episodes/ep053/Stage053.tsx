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
  { text: 'public static function encode(mixed $data): string' },
  { text: '{' },
  { text: '    $payload = (string)$data;' },
  { text: '    $len     = strlen($payload);' },
  { text: '    $first   = chr(0x81); // FIN=1, Opcode=1 (Text 文本帧)', diff: 'added' },
  { text: '    if ($len <= 125) {' },
  { text: '        return $first . chr($len) . $payload; // MASK位保持0!', diff: 'added' },
  { text: '    }' },
  { text: '    if ($len <= 65535) {' },
  { text: "        return $first . chr(126) . pack('n', $len) . $payload;" },
  { text: '    }' },
  { text: "    return $first . chr(127) . pack('J', $len) . $payload;" },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage053: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Server → Client 无掩码封包实测',
      status: { label: 'MASK=0 ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: 'encode("Welcome to ModernWorker WS!") (27 chars)', tone: 'info', appearAtFrame: 16 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 双向 Mask 铁律 (RFC 6455)" badge="搞反浏览器必断连!" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          Browser → Server: MASK = 1 (必须掩码)
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Server → Browser: MASK = 0 (严禁掩码!)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP053 · 服务端推送 encode"
      fileName="WebsocketProtocol.php"
      lines={LINES}
      startLineNumber={67}
      focusLines={visual === 'server-nomask' ? [71, 73] : [71, 73, 76, 78]}
      callout={
        visual === 'server-nomask'
          ? { line: 74, text: 'chr($len) 最高位天然为 0，浏览器直接验收', tone: 'green' }
          : { line: 77, text: '三档阶梯长度 + 原文 Payload 直接输出', tone: 'blue' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
