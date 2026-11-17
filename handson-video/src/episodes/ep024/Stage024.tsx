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
  { text: '    public function getRemoteAddress(): string', diff: 'added' },
  { text: '    {' },
  { text: '        return (string)@stream_socket_get_name($this->socket, true);' },
  { text: '    }' },
  { text: '' },
  { text: '    public function destroy(): void', diff: 'added' },
  { text: '    {' },
  { text: '        if ($this->status === ConnectionStatus::Closed) {' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        $this->status = ConnectionStatus::Closed;', diff: 'modified' },
  { text: '        $this->loop->offReadable($this->socket);', diff: 'added' },
  { text: '        $this->loop->offWritable($this->socket);', diff: 'added' },
  { text: '        @fclose($this->socket);', diff: 'added' },
  { text: '        if ($this->onClose) {' },
  { text: '            ($this->onClose)($this);' },
  { text: '        }' },
  { text: '    }' },
];

export const Stage024: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.x 事件引擎', state: 'done' as const },
    { label: '2.1 连接对象化', state: visual === 'verify-lifecycle' ? ('done' as const) : ('active' as const) },
    { label: '2.2 发送缓冲', state: visual === 'verify-lifecycle' ? ('active' as const) : ('todo' as const) },
    { label: '2.3 优雅断连', state: 'todo' as const },
    { label: '3.x HTTP/WS', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php',
      status: { label: 'ZERO LEAK ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 清理 X-Ray · 为什么 destroy() 必须先摘监听再 fclose？" badge="防 FD 泄漏" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          1. status = Closed
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          2. offReadable + offWritable
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          3. fclose + onClose
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP024 · getRemoteAddress & destroy"
      fileName="TcpConnectionBase.php"
      lines={LINES}
      startLineNumber={33}
      focusLines={visual === 'peer-and-destroy' ? [33, 44, 45, 46] : [43, 47]}
      typeRange={
        visual === 'peer-and-destroy'
          ? { fromLine: 38, toLine: 50, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'peer-and-destroy'
          ? { line: 45, text: '先从 EventLoop 摘除，再 fclose！', tone: 'amber' }
          : { line: 47, text: '下集踩坑：裸发 10MB 丢失 96.9%！', tone: 'red' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
