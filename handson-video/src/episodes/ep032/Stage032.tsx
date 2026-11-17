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
  { text: '    private function baseRead(): void' },
  { text: '    {' },
  { text: '        while (true) {', diff: 'added' },
  { text: '            $chunk = @fread($this->socket, 65535);', diff: 'modified' },
  { text: '            if ($chunk === "" || $chunk === false) {', diff: 'modified' },
  { text: '                if (feof($this->socket)) {', diff: 'added' },
  { text: '                    $this->destroy();', diff: 'added' },
  { text: '                }' },
  { text: '                return;' },
  { text: '            }' },
  { text: '            if ($this->onMessage) {' },
  { text: '                ($this->onMessage)($this, $chunk);' },
  { text: '            }' },
  { text: '        }' },
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

export const Stage032: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (200KB 保活 + 断开实测)',
      status: { label: 'DRAINED + SAFE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('success' as const) : ('warn' as const),
        appearAtFrame: 18 + i * 34,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 读端 X-Ray · 空字符串的两副面孔" badge="feof 二次确认" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>feof() === false</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>200KB 读空了 (EAGAIN) → 安全 return，连接继续活着</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>feof() === true</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>收到对方 FIN 断开包 → 调 destroy() 清理</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP032 · baseRead() 循环读空与 feof"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={96}
      focusLines={visual === 'read-loop' ? [98, 99] : [100, 101, 102, 104]}
      callout={
        visual === 'read-loop'
          ? { line: 99, text: '循环读空 200KB，兼容 Epoll ET 模式', tone: 'blue' }
          : { line: 101, text: 'feof() 精准区分“读空了”和“真断开了”', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
