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
  { text: 'class TcpConnection', diff: 'added' },
  { text: '{' },
  { text: '    private static int $idRecorder = 0;', diff: 'added' },
  { text: '    public readonly int $id;' },
  { text: '    public ?int $uid = null; // 随时挂载业务 UID' },
  { text: '    private $socket;' },
  { text: '    private EventLoopInterface $loop;' },
  { text: '    public ?\\Closure $onMessage = null;' },
  { text: '' },
  { text: '    public function __construct($socket, EventLoopInterface $loop)' },
  { text: '    {' },
  { text: '        $this->id = ++self::$idRecorder;' },
  { text: '        $this->socket = $socket;' },
  { text: '        $this->loop = $loop;' },
  { text: '        stream_set_blocking($this->socket, false);' },
  { text: '        // 把原来 Worker 替它挂的读监听，收进连接自己管！', diff: 'added' },
  { text: '        $this->loop->onReadable($this->socket, fn () => $this->baseRead());', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    private function baseRead(): void', diff: 'added' },
  { text: '    {' },
  { text: '        $data = @fread($this->socket, 65535);' },
  { text: '        if ($data === "" || $data === false) { ... return; }' },
  { text: '        if ($this->onMessage) ($this->onMessage)($this, $data);' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'active' as const },
  { label: '2.2 发送缓冲', state: 'todo' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage022: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (仅验证本集能力)',
      status: { label: 'SELF-MANAGED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'success', appearAtFrame: 20 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 55 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 职责转移 X-Ray · Worker 放手，连接自管理" badge="内聚封装" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: THEME.amber }}>第 1 篇：WorkerV01 代管</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>Worker 自己调 onReadable + fread</div>
        </div>
        <span style={{ fontWeight: 900 }}>⇒</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: THEME.green }}>第 2 篇：TcpConnection 自管</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>构造时挂 onReadable → baseRead() → $onMessage($this, $data)</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP022 · 封装 TcpConnection（连接自管理）"
      fileName="ep22/TcpConnection.php"
      lines={LINES}
      startLineNumber={7}
      focusLines={visual === 'why-object' ? [9, 10, 11, 22, 23] : [18, 23, 26, 30]}
      typeRange={
        visual === 'id-uid'
          ? { fromLine: 16, toLine: 31, localFrame, startFrame: 6, framesPerLine: 12 }
          : undefined
      }
      callout={
        visual === 'why-object'
          ? { line: 23, text: '把读监听从 Worker 收进 TcpConnection！', tone: 'amber' }
          : { line: 30, text: 'baseRead() 读完直接把 $this 传给 onMessage！', tone: 'green' }
      }
      fontSize={14}
      lineHeight={19}
      terminals={terminals}
      xray={xray}
    />
  );
};
