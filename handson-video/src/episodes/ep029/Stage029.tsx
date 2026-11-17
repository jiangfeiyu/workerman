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
  { text: '    private function baseWrite(): void', diff: 'added' },
  { text: '    {' },
  { text: '        if ($this->sendBuffer === "") {' },
  { text: '            $this->loop->offWritable($this->socket);' },
  { text: '            return;' },
  { text: '        }' },
  { text: '' },
  { text: '        $written = (int)@fwrite($this->socket, $this->sendBuffer);', diff: 'added' },
  { text: '        if ($written > 0) {' },
  { text: '            $this->sendBuffer = substr($this->sendBuffer, $written);', diff: 'added' },
  { text: '        }' },
  { text: '' },
  { text: '        if ($this->sendBuffer === "") {' },
  { text: '            // 只要全部发空，立刻摘掉可写监听，杜绝 CPU 100% 空转！', diff: 'added' },
  { text: '            $this->loop->offWritable($this->socket);', diff: 'added' },
  { text: '        }' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage029: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (纯净版 baseWrite 实测)',
      status: { label: 'DRAINED + UNWATCHED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: 'success' as const,
        appearAtFrame: 22 + i * 32,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 排空 X-Ray · baseWrite() 闭环" badge="零 CPU 空转" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          内核可写唤醒
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          fwrite + substr 切片
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          空了即 offWritable()
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP029 · 纯净版 baseWrite() 排空写监听"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={110}
      focusLines={visual === 'drain-loop' ? [117, 119] : [123, 124]}
      typeRange={
        visual === 'drain-loop'
          ? { fromLine: 117, toLine: 121, localFrame, startFrame: 6, framesPerLine: 16 }
          : undefined
      }
      callout={
        visual === 'drain-loop'
          ? { line: 119, text: '每次只切掉真正写进内核的部分', tone: 'blue' }
          : { line: 124, text: '发空立即卸载，零空转闭环！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
