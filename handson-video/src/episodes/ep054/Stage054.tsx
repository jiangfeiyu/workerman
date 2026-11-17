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
  { text: '// 1. Alice 握手升级 -> 101 Switching Protocols' },
  { text: '$resp101 = WebsocketProtocol::handshakeResponse($handshakeReq);', diff: 'added' },
  { text: 'fwrite($srvAlice, $resp101);' },
  { text: '' },
  { text: '// 2. Alice 发送掩码文本帧 -> 服务端 input + decode' },
  { text: '$pkgLen = WebsocketProtocol::input($buf);' },
  { text: '$text   = WebsocketProtocol::decode(substr($buf, 0, $pkgLen));', diff: 'added' },
  { text: '' },
  { text: '// 3. 服务端 encode 无掩码帧 -> 全服广播给 Bob!' },
  { text: '$broadcast = "[广播] Alice: {$text}";' },
  { text: 'fwrite($srvBob, WebsocketProtocol::encode($broadcast));', diff: 'added' },
  { text: '$bobLen = WebsocketProtocol::input($bobBuf);' },
  { text: '$bobGot = WebsocketProtocol::decode(substr($bobBuf, 0, $bobLen));' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'done' as const },
  { label: '4~7 ModernWorker', state: 'active' as const },
];

export const Stage054: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 3 篇终极合拢：原生 WS 聊天室实测',
      status: { label: 'PART 3 COMPLETE 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'warn', appearAtFrame: 36 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 62 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🏆 第 3 篇协议乐高总装：4 大协议统一插槽" badge="ProtocolInterface 闭环" badgeTone="green">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        {['TextProtocol (\\n)', 'FrameProtocol (4B)', 'HTTP/1.1 (Keep-Alive)', 'WebSocket (101+Mask)'].map((p) => (
          <div
            key={p}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 8,
              backgroundColor: THEME.greenBg,
              border: `2px solid ${THEME.green}`,
              textAlign: 'center',
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'ws-live-chat'
      ? [2, 6, 7]
      : visual === 'broadcast-bob'
      ? [10, 11, 13]
      : [2, 7, 11];

  const callout =
    visual === 'ws-live-chat'
      ? { line: 4, text: '101 热切换后直接解密中文掩码帧', tone: 'blue' as const }
      : visual === 'broadcast-bob'
      ? { line: 8, text: '服务端广播帧零依赖跨客户端收发', tone: 'green' as const }
      : { line: 12, text: '四大工业协议全部实现 input / decode / encode', tone: 'blue' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP054 · 第 3 篇合拢：原生 WS 聊天室"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
