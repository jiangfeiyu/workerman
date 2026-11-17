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
  { text: 'protected bool $wsHandshake = false;', diff: 'added' },
  { text: '' },
  { text: 'public function baseRead(): void' },
  { text: '{' },
  { text: '    $this->recvBuffer .= fread($this->socket, 65535);' },
  { text: '    if (!$this->wsHandshake) {' },
  { text: '        $headerEnd = strpos($this->recvBuffer, "\\r\\n\\r\\n");' },
  { text: '        if ($headerEnd === false) return;' },
  { text: '        $httpReq = substr($this->recvBuffer, 0, $headerEnd + 4);' },
  { text: '        $this->recvBuffer = substr($this->recvBuffer, $headerEnd + 4);' },
  { text: '        $this->send(WebsocketProtocol::handshakeResponse($httpReq), raw: true);' },
  { text: '        $this->wsHandshake = true; // 同一条连接当场热切换!', diff: 'added' },
  { text: '    }' },
  { text: '    // 升级后切入二进制帧解析（EP050~053 逐字节手写）', diff: 'added' },
  { text: '    while (($len = WebsocketProtocol::input($this->recvBuffer)) > 0) {' },
  { text: '        $pkg = substr($this->recvBuffer, 0, $len);' },
  { text: '        $this->recvBuffer = substr($this->recvBuffer, $len);' },
  { text: '        ($this->onMessage)($this, WebsocketProtocol::decode($pkg));' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage048: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (单条 TCP 热切换)',
      status: { label: 'HOT SWAP ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 16 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 同一个 FD 上的两段生命" badge="$wsHandshake 状态机" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          第 1 包: HTTP 文本 (\r\n\r\n)
        </div>
        <span>──▶ 101 ──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          后续所有包: WebSocket 二进制帧
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP048 · 协议热切换状态位"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={50}
      focusLines={visual === 'state-problem' ? [50, 55, 56] : [60, 61, 63]}
      callout={
        visual === 'state-problem'
          ? { line: 50, text: '每条连接独享握手状态位', tone: 'amber' }
          : { line: 61, text: '一句 true 无缝切入二进制帧解析', tone: 'green' }
      }
      fontSize={15}
      lineHeight={22}
      terminals={terminals}
      xray={xray}
    />
  );
};
