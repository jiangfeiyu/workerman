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
  { text: 'class ConnectionPool' },
  { text: '{' },
  { text: '    private \\SplQueue $idle;    // 空闲连接队列' },
  { text: '    private \\SplQueue $waiters; // 排队等连接的协程队列', diff: 'added' },
  { text: '' },
  { text: '    public function borrow(): string' },
  { text: '    {' },
  { text: '        if (!$this->idle->isEmpty()) return $this->idle->dequeue();', diff: 'added' },
  { text: '        $this->waiters->enqueue(Fiber::getCurrent()); // 池空排队!', diff: 'added' },
  { text: '        return Fiber::suspend(); // 等前人归还立刻唤醒交棒!', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public function release(string $conn): void' },
  { text: '    {' },
  { text: '        if (!$this->waiters->isEmpty()) {' },
  { text: '            $this->waiters->dequeue()->resume($conn); // 直接接力!', diff: 'added' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        $this->idle->enqueue($conn);' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'active' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage087: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 容量=1 连接池接力独占零串台实测',
      status: { label: '0 CROSS-TALK ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 2 ? 'success' : 'info',
        appearAtFrame: 14 + i * 22,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 ConnectionPool：用两个 SplQueue 实现借还闭环" badge="模块 5.2 合拢 🎉" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          borrow(): 有货出队独占 | 池空挂入 $waiters 睡觉
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          release(): 唤醒下个等待协程 resume($conn) 接力!
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'pool-borrow'
      ? [3, 4, 8]
      : visual === 'waiters-suspend'
      ? [9, 10]
      : [15, 16, 19];

  const callout =
    visual === 'pool-borrow'
      ? { line: 5, text: '每根协程借走后 100% 独占该 TCP 连接', tone: 'blue' as const }
      : visual === 'waiters-suspend'
      ? { line: 11, text: '池满时不报错，原地挂起等上一位归还', tone: 'amber' as const }
      : { line: 14, text: '像接力棒一样精准交给下一个排队的协程', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP087 · 协程安全连接池"
      fileName="ConnectionPool.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
