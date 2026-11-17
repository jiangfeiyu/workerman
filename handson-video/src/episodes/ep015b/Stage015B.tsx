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
  { text: 'require_once __DIR__ . \'/../ep15_select_loop_delay_del/SelectLoop.php\';' },
  { text: '' },
  { text: '// 【加餐过渡】不用多层套娃，普通函数 + delay() 实现续订' },
  { text: '$loop = new SelectLoop();' },
  { text: '$t0 = microtime(true);' },
  { text: '$ticks = 0;' },
  { text: '' },
  { text: 'function heartbeat(SelectLoop $loop, float $t0, int &$ticks): void', diff: 'added' },
  { text: '{' },
  { text: '    $ticks++;' },
  { text: '    $ms = (int)round((microtime(true) - $t0) * 1000);' },
  { text: '    echo "[第{$ticks}次] +{$ms}ms 滴答！\\n";' },
  { text: '' },
  { text: '    if ($ticks < 3) {', diff: 'added' },
  { text: '        // 预约下一单后立刻 return，调用栈直接清零！', diff: 'added' },
  { text: '        $loop->delay(0.06, function () use ($loop, $t0, &$ticks): void {' },
  { text: '            heartbeat($loop, $t0, $ticks);' },
  { text: '        });' },
  { text: '    } else {' },
  { text: '        echo "[结束] 满 3 次，不再续订！\\n";' },
  { text: '    }' },
  { text: '}' },
  { text: '' },
  { text: '$loop->delay(0.06, function () use ($loop, $t0, &$ticks): void {' },
  { text: '    heartbeat($loop, $t0, $ticks);' },
  { text: '});' },
  { text: '$loop->run();' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'done' as const },
  { label: '1.3 Timer', state: 'active' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage015B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'plain-function') {
      return {
        focusLines: [10, 14, 18, 19],
        callout: { line: 10, text: '先写普通函数 heartbeat()，响完再订下一个', tone: 'blue' as const },
      };
    }
    if (visual === 'stack-truth') {
      return {
        focusLines: [17, 18, 19],
        callout: { line: 17, text: 'delay() 放进最小堆就 return，调用栈不会堆高！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [26, 29],
      callout: { line: 29, text: '下集 EP016：把接力棒装进 repeat() 方法', tone: 'green' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: 'RELAY BATON ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'plain-function'
          ? [{ text: '# 普通函数手动续订 3 次 60ms delay() 闹钟...', tone: 'info', appearAtFrame: 15 }]
          : snapshot.output.map((line, i) => ({
              text: line,
              tone: i === 3 ? ('warn' as const) : ('success' as const),
              appearAtFrame: 18 + i * 20,
            })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 接力棒 X-Ray · 为什么不是调用栈死递归？" badge="栈深度永远 = 1" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 13, fontWeight: 800 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          <div>第1次 heartbeat</div>
          <div style={{ fontWeight: 500, fontSize: 12, marginTop: 3 }}>delay(60ms) 塞进堆 → return 清栈</div>
        </div>
        <span>⇒</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div>60ms 后循环取出</div>
          <div style={{ fontWeight: 500, fontSize: 12, marginTop: 3 }}>第2次 heartbeat 启动（新栈=1）</div>
        </div>
        <span>⇒</span>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div>满3次停止</div>
          <div style={{ fontWeight: 500, fontSize: 12, marginTop: 3 }}>不再调 delay，自动结束</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP015B【加餐过渡】· 普通函数看懂 delay 接力续订"
      fileName="ep15b/demo.php"
      lines={LINES}
      startLineNumber={3}
      focusLines={ide.focusLines}
      callout={ide.callout}
      fontSize={14}
      lineHeight={19}
      terminals={terminals}
      xray={xray}
    />
  );
};
