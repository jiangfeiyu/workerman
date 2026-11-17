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
  { text: '// 浏览器连上 TCP Server 发来的原始报文长这样：', diff: 'added' },
  { text: 'POST /api/login?from=web HTTP/1.1\\r\\n', diff: 'added' },
  { text: 'Host: localhost:8080\\r\\n' },
  { text: 'Connection: keep-alive\\r\\n' },
  { text: 'Content-Type: application/x-www-form-urlencoded\\r\\n' },
  { text: 'Content-Length: 11\\r\\n' },
  { text: '\\r\\n', diff: 'modified' },
  { text: 'user=modern', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'active' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage041: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (原生报文解剖)',
      status: { label: 'PLAIN TEXT WIRE', tone: 'blue' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('warn' as const) : ('info' as const),
        appearAtFrame: 12 + i * 20,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 报文 X-Ray · HTTP 请求四段式解剖" badge="也是纯文本协议" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>1. 请求行</div>
        <span>+</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>2. Headers</div>
        <span>+</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>3. 空行 \r\n\r\n</div>
        <span>+</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>4. Body 正文</div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP041【铺垫】· 原生 HTTP 报文认脸"
      fileName="raw_http_request.txt"
      lines={LINES}
      focusLines={visual === 'raw-http' ? [2, 6, 7, 8] : [7, 8]}
      callout={
        visual === 'raw-http'
          ? { line: 7, text: '空行 \\r\\n\\r\\n 是头与体的分水岭！', tone: 'amber' }
          : { line: 6, text: '下集：先找 \\r\\n\\r\\n 写 input()', tone: 'blue' }
      }
      fontSize={17}
      lineHeight={30}
      terminals={terminals}
      xray={xray}
    />
  );
};
