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
  { text: '// 【铺垫】把函数放进数组里按编号随时触发！', diff: 'added' },
  { text: '$handlers = [];', diff: 'added' },
  { text: '' },
  { text: '$handlers[100] = function (string $msg): void {', diff: 'added' },
  { text: '    echo "[100号回调被触发] 收到: {$msg}\\n";' },
  { text: '};' },
  { text: '' },
  { text: '$handlers[200] = function (string $msg): void {', diff: 'added' },
  { text: '    echo "[200号回调被触发] 转大写: " . strtoupper($msg) . "\\n";' },
  { text: '};' },
  { text: '' },
  { text: '$events = [' },
  { text: "    ['id' => 100, 'data' => 'hello worker']," },
  { text: "    ['id' => 200, 'data' => 'select loop']," },
  { text: '];' },
  { text: '' },
  { text: 'foreach ($events as $event) {' },
  { text: "    \$fn = \$handlers[\$event['id']] ?? null;" },
  { text: '    if (is_callable($fn)) {', diff: 'modified' },
  { text: "        \$fn(\$event['data']);", diff: 'modified' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'active' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage006: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'why-fn-array') {
      return {
        focusLines: [4, 5],
        callout: { line: 5, text: '用数组存函数，彻底告别 if-else', tone: 'blue' as const },
      };
    }
    if (visual === 'table-dispatch') {
      return {
        focusLines: [7, 11, 21, 22, 23],
        typeRange: { fromLine: 7, toLine: 25, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 23, text: '拿出函数加括号直接执行！', tone: 'green' as const },
      };
    }
    return {
      focusLines: [21, 23],
      callout: { line: 23, text: '下集：用这招改造 EP005 主循环', tone: 'amber' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: 'CALLABLE TABLE', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'why-fn-array'
          ? [{ text: '# 准备用整数 ID 映射 Closure 闭包函数...', tone: 'info', appearAtFrame: 15 }]
          : [
              { text: snapshot.output[0], tone: 'success', appearAtFrame: 25 },
              { text: snapshot.output[1], tone: 'success', appearAtFrame: 55 },
            ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内存 X-Ray · $handlers 回调映射表" badge="O(1) 查表" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 800 }}>Key: 100</div>
          <div style={{ fontSize: 14, marginTop: 4 }}>Value: fn($msg) =&gt; echo 收到</div>
        </div>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 800 }}>Key: 200</div>
          <div style={{ fontSize: 14, marginTop: 4 }}>Value: fn($msg) =&gt; strtoupper</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP006【铺垫】· 回调数组查表"
      fileName="ep06/demo.php"
      lines={LINES}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
