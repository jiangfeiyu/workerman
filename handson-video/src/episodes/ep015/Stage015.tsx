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
  { text: '    private \SplPriorityQueue $timers;' },
  { text: '    private int $timerAutoId = 0;' },
  { text: '    private array $activeTimers = [];', diff: 'added' },
  { text: '' },
  { text: '    public function delay(float $seconds, callable $callback): int', diff: 'added' },
  { text: '    {' },
  { text: '        $id = ++$this->timerAutoId;' },
  { text: '        $triggerAt = microtime(true) + $seconds;' },
  { text: '        $this->activeTimers[$id] = true;' },
  { text: '        $this->timers->insert(["id" => $id, "at" => $triggerAt, "cb" => $callback], -$triggerAt);' },
  { text: '        return $id;' },
  { text: '    }' },
  { text: '    public function delTimer(int $timerId): void', diff: 'added' },
  { text: '    {' },
  { text: '        unset($this->activeTimers[$timerId]); // 懒惰删除：不硬拆堆！', diff: 'added' },
  { text: '    }' },
  { text: '    private function tickTimers(): void', diff: 'added' },
  { text: '    {' },
  { text: '        $now = microtime(true);' },
  { text: '        while (!$this->timers->isEmpty()) {' },
  { text: '            $top = $this->timers->top();' },
  { text: '            if (!isset($this->activeTimers[$top["id"]])) {' },
  { text: '                $this->timers->extract(); continue; // 遇到已取消，直接丢弃' },
  { text: '            }' },
  { text: '            if ($top["at"] > $now) break;' },
  { text: '            $this->timers->extract();' },
  { text: '            unset($this->activeTimers[$top["id"]]);' },
  { text: '            ($top["cb"])($top["id"]);' },
  { text: '        }' },
  { text: '    }' },
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

export const Stage015: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'delay-method') {
      return {
        focusLines: [18, 20, 21, 22, 23],
        typeRange: { fromLine: 18, toLine: 25, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 23, text: '权重 -$triggerAt 让最早闹钟排堆顶', tone: 'green' as const },
      };
    }
    if (visual === 'lazy-delete') {
      return {
        focusLines: [16, 26, 28, 35, 36],
        callout: { line: 28, text: '绝招：O(1) 标删，出堆时再丢弃！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [38, 39, 40, 41],
      callout: { line: 38, text: '堆顶大于现在就 break，极快！', tone: 'blue' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (delay + delTimer)',
      status: { label: 'LAZY DELETE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 数据结构 X-Ray · 最小堆 + 懒惰删除表" badge="O(1) 取消定时器" badgeTone="amber">
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>SplPriorityQueue 堆</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>50ms → 80ms(幽灵) → 150ms</div>
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>$activeTimers 存活账本</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>timer#1 已 unset → 浮到堆顶直接丢弃</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP015 · SelectLoop::delay & delTimer"
      fileName="ep15/SelectLoop.php"
      lines={LINES}
      startLineNumber={14}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={15}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
