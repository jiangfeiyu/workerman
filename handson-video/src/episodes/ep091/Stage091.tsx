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
  { text: 'class TcpConnection' },
  { text: '{' },
  { text: '    public float $headerTimeout = 5.0; // 首包超时防慢连接!' },
  { text: '    private bool $firstPkgDone = false;' },
  { text: '' },
  { text: '    public function startGuardTimer(EventLoopInterface $loop): void' },
  { text: '    {' },
  { text: '        $loop->delay($this->headerTimeout, function (): void {', diff: 'added' },
  { text: '            if (!$this->firstPkgDone) {', diff: 'added' },
  { text: '                // 超过 5 秒连第一条完整包都没发完 → 判定慢连接强踢!', diff: 'removed' },
  { text: '                $this->destroy();', diff: 'added' },
  { text: '            }' },
  { text: '        });' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage091: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Slowloris 慢连接攻击包头超时拦截日志',
      status: { label: 'SLOWLORIS BLOCKED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 1 ? 'success' : 'warn',
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 防 Slowloris 慢速攻击：首包超时倒计时" badge="护住宝贵 FD 池" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          accept 建连瞬间挂上 5s 闹钟
        </div>
        <span>── 5s 未收齐首包 ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          直接 destroy() 踢出连接，释放 FD!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP091 · Slowloris 慢连接防御"
      fileName="TcpConnection.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'slowloris' ? [3, 4, 10] : [8, 9, 11]}
      callout={
        visual === 'slowloris'
          ? { line: 5, text: '黑客 10 秒吐 1 字节就能白占连接数', tone: 'red' }
          : { line: 12, text: '只要首包按时通过就立刻置 true 豁免', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
