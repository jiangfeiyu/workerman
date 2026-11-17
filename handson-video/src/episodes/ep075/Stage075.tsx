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
  { text: 'class EpollLoop' },
  { text: '{' },
  { text: '    /** @var array<int, EventHandle> 必须强引用保活，否则被 GC 销毁! */' },
  { text: '    private array $allEvents = [];', diff: 'added' },
  { text: '' },
  { text: '    public function addUnsafe(int $fd): void {' },
  { text: '        $ev = new EventHandle($fd); // ❌ 函数一结束 refcount 归 0!', diff: 'removed' },
  { text: '    }' },
  { text: '' },
  { text: '    public function addSafe(int $fd): void {' },
  { text: '        $ev = new EventHandle($fd);' },
  { text: '        $this->allEvents[$fd] = $ev; // ✅ 强引用留进常驻数组!', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public function del(int $fd): void { unset($this->allEvents[$fd]); }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'done' as const },
  { label: '4.4 Epoll核动力', state: 'active' as const },
];

export const Stage075: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 引用计数归零触发 __destruct() 抓现行',
      status: { label: 'GC REFCOUNT TRAP 💥', tone: 'red' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'error', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 36 },
        { text: snapshot.output[2], tone: 'info', appearAtFrame: 58 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 PHP 引用计数 refcount = 0 的隐形杀手" badge="ext-event 经典血坑" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          局部变量 $ev 离开函数 → refcount=0 → __destruct() 蒸发 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          $this-&gt;allEvents[$fd] = $ev → 持续保活直至 del() unset ✅
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'gc-bug'
      ? [6, 7]
      : visual === 'refcount-zero'
      ? [7, 8]
      : [4, 12, 15];

  const callout =
    visual === 'gc-bug'
      ? { line: 8, text: '没报错也没进回调，是最难排查的静默 Bug', tone: 'red' as const }
      : visual === 'refcount-zero'
      ? { line: 8, text: '离开大括号的瞬间 C 底层事件结构体就被释放了', tone: 'amber' as const }
      : { line: 13, text: 'del() 时精准 unset，既保活又零泄漏', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP075 · 踩坑：$allEvents 防 GC"
      fileName="EpollLoop.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
