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
  { text: "public const string GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';", diff: 'added' },
  { text: '' },
  { text: 'public static function handshakeResponse(string $httpHeader): string' },
  { text: '{' },
  { text: "    if (!preg_match('/Sec-WebSocket-Key:\\s*(.+?)\\r\\n/i', $httpHeader, $m)) {" },
  { text: '        return "HTTP/1.1 400 Bad Request\\r\\n\\r\\n";' },
  { text: '    }' },
  { text: '    $accept = base64_encode(sha1(trim($m[1]) . self::GUID, true));', diff: 'added' },
  { text: '    return "HTTP/1.1 101 Switching Protocols\\r\\n"' },
  { text: '        . "Upgrade: websocket\\r\\n"' },
  { text: '        . "Connection: Upgrade\\r\\n"' },
  { text: '        . "Sec-WebSocket-Accept: {$accept}\\r\\n\\r\\n";' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage047: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · RFC 6455 101 握手暗号实测',
      status: { label: '101 UPGRADE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: 'Client Key: dGhlIHNhbXBsZSBub25jZQ==', tone: 'normal', appearAtFrame: 14 },
        { text: snapshot.output[0], tone: 'success', appearAtFrame: 40 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 101 对暗号公式" badge="RFC 6455" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          Key + 固定 GUID
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          sha1(..., true)
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          base64 → Sec-WebSocket-Accept
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP047 · WebSocket 101 握手暗号"
      fileName="WebsocketProtocol.php"
      lines={LINES}
      startLineNumber={8}
      focusLines={visual === 'ws-upgrade' ? [12, 13] : [8, 15, 16, 19]}
      callout={
        visual === 'ws-upgrade'
          ? { line: 14, text: '先从 HTTP 头提取 Sec-WebSocket-Key', tone: 'blue' }
          : { line: 18, text: 'sha1(..., true) 原始20B再 Base64', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
