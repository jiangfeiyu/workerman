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
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: '' },
  { text: 'enum ConnectionStatus: string', diff: 'added' },
  { text: '{' },
  { text: "    case Connecting = 'connecting';   // 异步拨号预留", diff: 'added' },
  { text: "    case Established = 'established'; // 服务端 accept 即已建立", diff: 'added' },
  { text: "    case Closing = 'closing';         // 半关闭：停读等写完", diff: 'added' },
  { text: "    case Closed = 'closed';           // 已彻底销毁", diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: '// 1. 状态守卫：非 Established 拒绝发新包' },
  { text: 'if ($this->status !== ConnectionStatus::Established) {' },
  { text: '    return false;' },
  { text: '}' },
  { text: '// 2. 幂等防重：已是 Closed 直接返回，防止重复 fclose' },
  { text: 'if ($this->status === ConnectionStatus::Closed) {' },
  { text: '    return;' },
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

export const Stage023: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (四态与守卫实测)',
      status: { label: 'ENUM STATE MACHINE ✅', tone: 'blue' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 || i === 4 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 12 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 状态 X-Ray · 四态强类型流转" badge="PHP 8 Enum" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 13, fontWeight: 800 }}>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>Connecting (预留)</div>
        <span>→</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>Established</div>
        <span>→</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>Closing</div>
        <span>→</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>Closed</div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP023 · ConnectionStatus 枚举"
      fileName="ConnectionStatus.php"
      lines={LINES}
      focusLines={visual === 'enum-def' ? [4, 6, 7, 8, 9] : [13, 17]}
      typeRange={
        visual === 'enum-def'
          ? { fromLine: 4, toLine: 10, localFrame, startFrame: 6, framesPerLine: 16 }
          : undefined
      }
      callout={
        visual === 'enum-def'
          ? { line: 6, text: '强类型语义化，Connecting 留给异步拨号！', tone: 'blue' }
          : { line: 17, text: '防重幂等：Closed 状态直接拦截返回', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
