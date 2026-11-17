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
  { text: '    // Request.php 判断长连接复用：' },
  { text: '    public function isKeepAlive(): bool', diff: 'added' },
  { text: '    {' },
  { text: '        $conn = strtolower($this->header("connection"));' },
  { text: '        return $conn !== "close";', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '// 业务层处理完毕后根据 Keep-Alive 决定发完走人还是留着复用：' },
  { text: '$respBytes = HttpProtocol::encode(Response::json(["ok" => true]));' },
  { text: 'if ($req->isKeepAlive()) {' },
  { text: '    $conn->send($respBytes);   // 保留 TCP 隧道，等下个请求！', diff: 'added' },
  { text: '} else {' },
  { text: '    $conn->close($respBytes);  // 发完优雅断连！', diff: 'modified' },
  { text: '}' },
];

export const Stage046: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1~2 引擎+连接', state: 'done' as const },
    { label: '3.1 粘包与协议', state: 'done' as const },
    { label: '3.2 HTTP/1.1', state: visual === 'verify-http' ? ('done' as const) : ('active' as const) },
    { label: '3.3 WebSocket', state: visual === 'verify-http' ? ('active' as const) : ('todo' as const) },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Pipelined HTTP 连续请求合拢实测',
      status: { label: 'KEEP-ALIVE REUSE 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 18 },
        { text: snapshot.output[3], tone: 'warn', appearAtFrame: 42 },
        { text: snapshot.output[4], tone: 'info', appearAtFrame: 66 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 毕业 X-Ray · Keep-Alive 复用省掉反复三次握手" badge="模块 3.2 毕业 🎉" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          keep-alive → send() 留连接
        </div>
        <span>|</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          Connection: close → close() 优雅退
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP046【合拢】· Keep-Alive 长连接复用"
      fileName="Request.php"
      lines={LINES}
      startLineNumber={19}
      focusLines={visual === 'keepalive' ? [20, 23] : [29, 31]}
      callout={
        visual === 'verify-http'
          ? { line: 29, text: '🎉 HTTP/1.1 毕业！下集写 WebSocket', tone: 'green' }
          : { line: 23, text: 'HTTP/1.1 默认长连接，除非显式 close', tone: 'blue' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
