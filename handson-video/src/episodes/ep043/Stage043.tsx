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
  { text: '    public static function input(string $buffer): int' },
  { text: '    {' },
  { text: '        $headerEnd = strpos($buffer, "\\r\\n\\r\\n");' },
  { text: '        if ($headerEnd === false) {' },
  { text: '            return 0; // HTTP 请求头尚未收齐' },
  { text: '        }' },
  { text: '        $headerBlock = substr($buffer, 0, $headerEnd);', diff: 'added' },
  { text: '        $contentLen = 0;' },
  { text: '        if (preg_match("/\\r\\nContent-Length:\\s*(\\d+)/i", $headerBlock, $m)) {', diff: 'added' },
  { text: '            $contentLen = (int)$m[1];', diff: 'added' },
  { text: '        }' },
  { text: '        $totalLen = $headerEnd + 4 + $contentLen;', diff: 'modified' },
  { text: '        return strlen($buffer) < $totalLen ? 0 : $totalLen;', diff: 'added' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'active' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage043: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · POST 半包等待实测',
      status: { label: 'BODY HALF-PACKET ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 18 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 52 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 测长 X-Ray · POST 头到了但 Body 只到一半" badge="缺 6B 返回 0" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          头 + \r\n\r\n
        </div>
        <span>+</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          Content-Length: 11 (实到 5B)
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          strlen &lt; totalLen → 返回 0 等齐
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP043 · Content-Length 与 POST 半包"
      fileName="HttpProtocol.php"
      lines={LINES}
      startLineNumber={16}
      focusLines={visual === 'content-length' ? [24, 25, 27] : [27, 28]}
      callout={
        visual === 'post-half'
          ? { line: 28, text: 'Body 没收齐，继续返回 0 留在蓄水池！', tone: 'amber' }
          : { line: 27, text: '总长度 = 头结束 + 4 + Content-Length', tone: 'green' }
      }
      fontSize={16}
      lineHeight={27}
      terminals={terminals}
      xray={xray}
    />
  );
};
