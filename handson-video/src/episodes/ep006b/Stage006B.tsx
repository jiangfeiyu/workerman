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
  { text: '// 【加餐过渡】彻底拆平：先写函数，不搞闭包套闭包！', diff: 'added' },
  { text: '$readCallbacks = [];' },
  { text: '' },
  { text: '// 1. 平铺写出两个普通函数（各干各的）', diff: 'added' },
  { text: 'function onGateRing(int $fd, array &$callbacks): void {' },
  { text: '    echo "  [触发时刻] {$fd} 号门铃响了 -> 迎客并给 6 号登记\\n";' },
  { text: "    \$callbacks[6] = 'onGuestSpeak';", diff: 'added' },
  { text: '}' },
  { text: 'function onGuestSpeak(int $fd, array &$callbacks): void {' },
  { text: '    echo "  [触发时刻] {$fd} 号客人说话 -> 回复 Echo!\\n";' },
  { text: '}' },
  { text: '' },
  { text: '// 2. 登记时刻：只存进数组抽屉，函数体一行都不跑！', diff: 'modified' },
  { text: 'echo "[登记时刻] 把 \'onGateRing\' 放进 5 号抽屉\\n";' },
  { text: "\$readCallbacks[5] = 'onGateRing';", diff: 'added' },
  { text: '' },
  { text: '// 3. 触发时刻：事件到达后再查表加括号运行！', diff: 'added' },
  { text: 'echo "[事件到达] 5 号就绪，取出触发:\\n";' },
  { text: '($readCallbacks[5])(5, $readCallbacks);', diff: 'added' },
  { text: 'echo "[事件到达] 6 号就绪，取出触发:\\n";' },
  { text: '($readCallbacks[6])(6, $readCallbacks);', diff: 'added' },
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

export const Stage006B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'separate-functions') {
      return {
        focusLines: [8, 9, 10, 12, 13],
        callout: { line: 8, text: '普通命名函数平铺写出，零嵌套！', tone: 'blue' as const },
      };
    }
    if (visual === 'register-vs-run') {
      return {
        focusLines: [16, 17, 18],
        callout: { line: 18, text: '登记时刻：只放进抽屉，函数体不执行！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [21, 22, 23, 24],
      callout: { line: 22, text: '叫号加括号才真正执行，并顺手登记 6 号！', tone: 'green' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (时空顺序追踪)',
      status: {
        label: visual === 'register-vs-run' ? 'REGISTER ONLY' : 'DISPATCH TRACE ✅',
        tone: visual === 'register-vs-run' ? 'amber' : 'green',
      },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'separate-functions'
          ? [{ text: '# 先平铺定义好两个互不嵌套的普通函数...', tone: 'info', appearAtFrame: 15 }]
          : visual === 'register-vs-run'
            ? [
                { text: snapshot.output[0], tone: 'warn', appearAtFrame: 20 },
                { text: '# 此时 onGateRing() 一行都没运行！', tone: 'info', appearAtFrame: 50 },
              ]
            : [
                { text: snapshot.output[0], tone: 'info', appearAtFrame: 10 },
                { text: snapshot.output[1], tone: 'cmd', appearAtFrame: 30 },
                { text: snapshot.output[2], tone: 'success', appearAtFrame: 50 },
                { text: snapshot.output[3], tone: 'cmd', appearAtFrame: 75 },
                { text: snapshot.output[4], tone: 'success', appearAtFrame: 95 },
              ],
    },
  ];

  const isReg = visual === 'register-vs-run';
  const isRun = visual === 'dispatch-chain';

  const xray = (
    <XRayInspector title="🔬 时空 X-Ray · 登记时刻 vs 触发时刻" badge={isRun ? '接力触发' : '先存后用'} badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: 10,
            backgroundColor: isReg ? THEME.amberBg : '#f5f5f4',
            border: `2px solid ${isReg ? THEME.amber : THEME.gridColor}`,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: THEME.amber }}>① 登记时刻（放抽屉）</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 12, marginTop: 3 }}>[5] =&gt; 'onGateRing'</div>
          <div style={{ fontSize: 12, color: THEME.mutedText }}>此时不跑函数体</div>
        </div>
        <span style={{ fontWeight: 900 }}>→</span>
        <div
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: 10,
            backgroundColor: isRun ? THEME.greenBg : '#f5f5f4',
            border: `2px solid ${isRun ? THEME.green : THEME.gridColor}`,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: THEME.green }}>② 5号响（迎客）</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 12, marginTop: 3 }}>跑 onGateRing(5)</div>
          <div style={{ fontSize: 12, color: THEME.mutedText }}>顺手登记 [6] =&gt; 'onGuestSpeak'</div>
        </div>
        <span style={{ fontWeight: 900 }}>→</span>
        <div
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: 10,
            backgroundColor: isRun ? THEME.blueBg : '#f5f5f4',
            border: `2px solid ${isRun ? THEME.blue : THEME.gridColor}`,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: THEME.blue }}>③ 6号响（说话）</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 12, marginTop: 3 }}>跑 onGuestSpeak(6)</div>
          <div style={{ fontSize: 12, color: THEME.mutedText }}>查表回显 Echo!</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP006B【加餐过渡】· 看懂回调的登记与触发时机"
      fileName="ep06b/demo.php"
      lines={LINES}
      focusLines={ide.focusLines}
      callout={ide.callout}
      fontSize={15}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
