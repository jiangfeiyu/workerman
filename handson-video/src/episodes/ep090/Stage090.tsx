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
  { text: 'public function baseRead(): void' },
  { text: '{' },
  { text: '    if ($this->transport === "ssl" && !$this->sslCompleted) {', diff: 'added' },
  { text: '        $ret = @stream_socket_enable_crypto($this->socket, true, $this->sslMethod);' },
  { text: '        if ($ret === 0) return;  // 等下一包握手字节再进!', diff: 'added' },
  { text: '        if ($ret === false) { $this->destroy(); return; }' },
  { text: '        $this->sslCompleted = true;' },
  { text: '        ($this->onSslReady)($this);' },
  { text: '        return;' },
  { text: '    }' },
  { text: '    // 握手完成！下面 fread($this->socket) 自动吐出解密后的 HTTP/WS 明文！', diff: 'added' },
  { text: '    $data = @fread($this->socket, 65535);' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage090: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · HTTPS 加密通道端到端握手+解密实测',
      status: { label: 'HTTPS / WSS ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 14 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 TcpConnection::doSslHandshake() 异步握手流" badge="TLS1.2 / 1.3" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          $sslCompleted = false → 循环 === 0 return 让出
        </div>
        <span>── === true ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          fread() 自动读出明文 GET /tls-ok HTTP/1.1!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP090 · doSslHandshake 状态机"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={30}
      focusLines={visual === 'ssl-fsm' ? [32, 33, 34, 35] : [36, 40, 41]}
      callout={
        visual === 'ssl-fsm'
          ? { line: 34, text: '遇到 0 直接 return，毫不阻塞其他上万用户', tone: 'amber' }
          : { line: 39, text: 'PHP stream 底层透明解密，上层只见明文!', tone: 'green' }
      }
      fontSize={14}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
