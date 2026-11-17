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
  { text: '    public int $maxSendBufferSize = 1024 * 1024; // 1MB 高水位', diff: 'added' },
  { text: '    public ?\\Closure $onBufferFull = null;', diff: 'added' },
  { text: '    public ?\\Closure $onBufferDrain = null;', diff: 'added' },
  { text: '    private bool $bufferFullTriggered = false;', diff: 'added' },
  { text: '' },
  { text: '    // 在 send() 拼接缓冲区之后检查高水位：' },
  { text: '    $this->sendBuffer .= $data;' },
  { text: '    $this->loop->onWritable($this->socket, fn () => $this->baseWrite());' },
  { text: '' },
  { text: '    if (!$this->bufferFullTriggered && strlen($this->sendBuffer) >= $this->maxSendBufferSize) {', diff: 'added' },
  { text: '        $this->bufferFullTriggered = true;', diff: 'added' },
  { text: '        if ($this->onBufferFull) {' },
  { text: '            ($this->onBufferFull)($this);' },
  { text: '        }' },
  { text: '    }' },
  { text: '' },
  { text: '    // 在 baseWrite() 彻底排空缓冲区之后触发绿灯：' },
  { text: '    if ($this->bufferFullTriggered) {', diff: 'added' },
  { text: '        $this->bufferFullTriggered = false;', diff: 'added' },
  { text: '        if ($this->onBufferDrain) ($this->onBufferDrain)($this);', diff: 'added' },
  { text: '    }' },
];

export const Stage030: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.x 事件引擎', state: 'done' as const },
    { label: '2.1 连接对象化', state: 'done' as const },
    { label: '2.2 发送缓冲', state: visual === 'drain-resume' ? ('done' as const) : ('active' as const) },
    { label: '2.3 优雅断连', state: visual === 'drain-resume' ? ('active' as const) : ('todo' as const) },
    { label: '3.x HTTP/WS', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (水位防重实测)',
      status: { label: visual === 'drain-resume' ? 'GREEN LIGHT 🟢' : 'HIGH WATERMARK ⚠️', tone: visual === 'drain-resume' ? 'green' : 'amber' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 15 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 42 },
        ...(visual === 'drain-resume' ? [{ text: snapshot.output[2], tone: 'success' as const, appearAtFrame: 65 }] : []),
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 背压 X-Ray · 高低水位线防 OOM 阀门" badge="布尔锁防重" badgeTone="amber">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>🔴 冲破 maxSendBufferSize</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>加布尔锁只触发 1 次 onBufferFull</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>🟢 baseWrite 全部排空</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>复位布尔锁 + 触发 onBufferDrain 恢复</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP030 · 水位线背压防 OOM"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={50}
      focusLines={visual === 'oom-risk' ? [50, 53] : visual === 'high-watermark' ? [59, 60, 62] : [67, 68, 69]}
      callout={
        visual === 'high-watermark'
          ? { line: 60, text: '布尔锁防止连发大包重复报警！', tone: 'amber' }
          : visual === 'drain-resume'
          ? { line: 69, text: '绿灯放行：恢复生产发送', tone: 'green' }
          : { line: 53, text: '布尔锁记录当前是否已报警', tone: 'red' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
