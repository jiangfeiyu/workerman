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
  { text: 'class HttpProtocol implements ProtocolInterface' },
  { text: '{' },
  { text: '    public static function input(string $buffer): int', diff: 'added' },
  { text: '    {' },
  { text: '        $headerEnd = strpos($buffer, "\\r\\n\\r\\n");', diff: 'added' },
  { text: '        if ($headerEnd === false) {' },
  { text: '            return 0; // 请求头还没收齐，继续等待！', diff: 'added' },
  { text: '        }' },
  { text: '' },
  { text: '        // 对于纯 GET 请求（无 Body），总长度 = 头结束位置 + 4 字节空行', diff: 'added' },
  { text: '        return $headerEnd + 4;', diff: 'added' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'active' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage042: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (GET 边界探测)',
      status: { label: 'GET READY ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 边界 X-Ray · 为什么要 + 4 ？" badge="\\r\\n\\r\\n = 4 字节" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          请求行 + Headers ($headerEnd)
        </div>
        <span>+</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          \r \n \r \n (4 字节)
        </div>
        <span>=</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          完整 GET 包长
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP042 · HttpProtocol::input() GET 头"
      fileName="HttpProtocol.php"
      lines={LINES}
      startLineNumber={14}
      focusLines={visual === 'header-end' ? [18, 20] : [23, 24]}
      callout={
        visual === 'header-end'
          ? { line: 20, text: '没找到 \\r\\n\\r\\n 返回 0 等头收齐', tone: 'amber' }
          : { line: 24, text: '下集：POST 还得加上 Content-Length', tone: 'blue' }
      }
      fontSize={16}
      lineHeight={28}
      terminals={terminals}
      xray={xray}
    />
  );
};
