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
  { text: '    public function close(string $data = ""): void', diff: 'added' },
  { text: '    {' },
  { text: '        if ($this->status === ConnectionStatus::Closing || $this->status === ConnectionStatus::Closed) {' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        if ($data !== "") {' },
  { text: '            $this->send($data);' },
  { text: '        }' },
  { text: '        if ($this->sendBuffer === "") {' },
  { text: '            $this->destroy(); // 没积压，立刻走人', diff: 'added' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        // 还有缓冲没发完：切 Closing 并停止读新包，留着写监听排空！', diff: 'added' },
  { text: '        $this->status = ConnectionStatus::Closing;', diff: 'added' },
  { text: '        $this->loop->offReadable($this->socket);', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    // 在 baseWrite() 末尾：' },
  { text: '    if ($this->status === ConnectionStatus::Closing) {', diff: 'added' },
  { text: '        $this->destroy(); // 最后 1 字节也发出去了，完美谢幕！', diff: 'added' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'done' as const },
  { label: '2.3 优雅断连', state: 'active' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage031: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (close 1MB 尾包实测)',
      status: { label: 'GRACEFUL CLOSE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 15 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 关流 X-Ray · close() 与 Closing 半关闭状态" badge="最后一字节不丢" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          close($data) → Closing
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          offReadable + 留写监听
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          排空触发 destroy()
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP031 · close() vs destroy()"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={71}
      focusLines={visual === 'close-vs-destroy' ? [76, 80] : [84, 85, 89, 90]}
      typeRange={
        visual === 'closing-state'
          ? { fromLine: 83, toLine: 91, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'close-vs-destroy'
          ? { line: 80, text: '直接 destroy() 会截断末尾消息！', tone: 'red' }
          : { line: 84, text: '关读留写：半关闭态等缓冲发完', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
