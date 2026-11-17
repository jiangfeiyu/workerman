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
  { text: 'class SelectLoopWithRepeat extends SelectLoop' },
  { text: '{' },
  { text: '    private array $repeating = [];', diff: 'added' },
  { text: '' },
  { text: '    public function repeat(float $interval, callable $callback): int', diff: 'added' },
  { text: '    {' },
  { text: '        $repeatId = random_int(100000, 999999);' },
  { text: '        $this->repeating[$repeatId] = true;' },
  { text: '        $this->scheduleNext($repeatId, $interval, $callback);', diff: 'added' },
  { text: '        return $repeatId;' },
  { text: '    }' },
  { text: '' },
  { text: '    private function scheduleNext(int $repeatId, float $interval, callable $callback): void', diff: 'added' },
  { text: '    {' },
  { text: '        $this->delay($interval, function () use ($repeatId, $interval, $callback): void {' },
  { text: '            if (!isset($this->repeating[$repeatId])) return;' },
  { text: '            $callback($repeatId);' },
  { text: '            if (isset($this->repeating[$repeatId])) {' },
  { text: '                $this->scheduleNext($repeatId, $interval, $callback); // 接力下一单！', diff: 'added' },
  { text: '            }' },
  { text: '        });' },
  { text: '    }' },
  { text: '' },
  { text: '    public function cancelRepeat(int $repeatId): void', diff: 'added' },
  { text: '    {' },
  { text: '        unset($this->repeating[$repeatId]);' },
  { text: '    }' },
  { text: '}' },
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

export const Stage016: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (repeat 每 60ms 触发)',
      status: { label: 'CLEAN RELAY 🔁', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 3 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 接力 X-Ray · scheduleNext() 代替自引用闭包" badge="栈深度=1 · 不套娃" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          delay(60ms) 到点
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          执行 $callback
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          未取消则 $this-&gt;scheduleNext()
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP016 · 把 delay 接力封装成 repeat()"
      fileName="ep16/SelectLoopWithRepeat.php"
      lines={LINES}
      startLineNumber={6}
      focusLines={visual === 'cancel-inside' ? [21, 23, 29, 31] : [14, 18, 20, 24]}
      typeRange={
        visual === 'self-schedule'
          ? { fromLine: 14, toLine: 26, localFrame, startFrame: 6, framesPerLine: 14 }
          : undefined
      }
      callout={
        visual === 'cancel-inside'
          ? { line: 21, text: '回调内调用 cancelRepeat() 立刻停掉接力！', tone: 'amber' }
          : { line: 18, text: '普通私有方法 scheduleNext() 清晰接力下一单！', tone: 'green' }
      }
      fontSize={14}
      lineHeight={20}
      terminals={terminals}
      xray={xray}
    />
  );
};
