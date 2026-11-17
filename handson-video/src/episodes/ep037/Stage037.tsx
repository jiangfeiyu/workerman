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

const TEXT_LINES: IDECodeLine[] = [
  { text: 'class TextProtocol implements ProtocolInterface', diff: 'added' },
  { text: '{' },
  { text: '    public static function input(string $buffer): int' },
  { text: '    {' },
  { text: '        $pos = strpos($buffer, "\\n");' },
  { text: '        return $pos === false ? 0 : $pos + 1;', diff: 'added' },
  { text: '    }' },
  { text: '    public static function decode(string $package): string' },
  { text: '    {' },
  { text: '        return rtrim($package, "\\r\\n");', diff: 'added' },
  { text: '    }' },
  { text: '    public static function encode(mixed $data): string' },
  { text: '    {' },
  { text: '        return (string)$data . "\\n";', diff: 'added' },
  { text: '    }' },
  { text: '}' },
];

const PIPELINE_LINES: IDECodeLine[] = [
  { text: '    public function feed(string $chunk): void' },
  { text: '    {' },
  { text: '        $this->recvBuffer .= $chunk;' },
  { text: '        while ($this->recvBuffer !== "") {' },
  { text: '            $len = ($this->protocol)::input($this->recvBuffer);', diff: 'added' },
  { text: '            if ($len === 0) return; // 半包留在蓄水池', diff: 'added' },
  { text: '            $package = substr($this->recvBuffer, 0, $len);', diff: 'added' },
  { text: '            $this->recvBuffer = substr($this->recvBuffer, $len);', diff: 'added' },
  { text: '            ($this->onMessage)(($this->protocol)::decode($package));', diff: 'added' },
  { text: '        }' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage037: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showPipe = visual === 'pipeline';
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (8B 半包测试)',
      status: { label: 'TEXT PROTOCOL ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 1 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 管道 X-Ray · 协议与连接层解耦运行" badge="alpha → beta" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          feed(8B): alpha\nbe
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          input()=6 切 alpha，余 be 返回 0
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          补 ta\n 吐出 beta
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP037 · TextProtocol 与缓冲管道"
      fileName={showPipe ? 'ProtocolBufferPipeline.php' : 'TextProtocol.php'}
      tabs={['TextProtocol.php', 'ProtocolBufferPipeline.php']}
      lines={showPipe ? PIPELINE_LINES : TEXT_LINES}
      startLineNumber={showPipe ? 16 : 6}
      focusLines={showPipe ? [20, 21, 24] : [11, 15, 19]}
      callout={
        showPipe
          ? { line: 21, text: '遇到 0 立刻停手，等下一波水流', tone: 'blue' }
          : { line: 11, text: '找不到 \\n 返回 0，找到返回 $pos+1', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
