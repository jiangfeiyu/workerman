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
  { text: 'class MiniConnection' },
  { text: '{' },
  { text: '    public string $recvBuffer = "";' },
  { text: '    // 1. 只存类名字符串，10万连接共享 1 份静态逻辑（0 对象开销！）', diff: 'added' },
  { text: '    public function __construct(private string $protocol) {}', diff: 'added' },
  { text: '' },
  { text: '    // 2. 对比第 2 篇 baseRead()：原来直接吐 $chunk，现在加这 4 行切包！', diff: 'added' },
  { text: '    public function feed(string $chunk): array' },
  { text: '    {' },
  { text: '        $this->recvBuffer .= $chunk;' },
  { text: '        $msgs = [];' },
  { text: '        while (($len = ($this->protocol)::input($this->recvBuffer)) > 0) {', diff: 'added' },
  { text: '            $pkg = substr($this->recvBuffer, 0, $len);' },
  { text: '            $this->recvBuffer = substr($this->recvBuffer, $len);' },
  { text: '            $msgs[] = ($this->protocol)::decode($pkg);', diff: 'added' },
  { text: '        }' },
  { text: '        return $msgs;' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage036B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (动态类名静态调用)',
      status: { label: '0 OBJECT COST ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 15 + i * 25,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 语法与对接 X-Ray · 为什么 static + ($this->protocol)::input()" badge="省 10 万份对象" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.blue }}>($this-&gt;protocol)::input()</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>$protocol 存类名字符串 → 加括号直接调静态方法！</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>对接 TcpConnection::baseRead()</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>第 2 篇直接吐 $chunk → 现在加 4 行 while 切包！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP036B【加餐过渡】· 静态契约与动态类名调用"
      fileName="ep36b/verify.php"
      lines={LINES}
      startLineNumber={19}
      focusLines={visual === 'why-static' ? [22, 23] : visual === 'dynamic-call' ? [30, 33] : [27, 30, 31, 32, 33]}
      callout={
        visual === 'why-static'
          ? { line: 23, text: '只存类名字符串，10万连接零额外对象内存！', tone: 'blue' }
          : visual === 'dynamic-call'
          ? { line: 30, text: '字符串加括号 :: 即可动态调用任意协议！', tone: 'amber' }
          : { line: 30, text: '下集 EP037：实现正式 TextProtocol', tone: 'green' }
      }
      fontSize={14}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
