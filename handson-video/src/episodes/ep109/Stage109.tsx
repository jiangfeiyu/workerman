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
  { text: 'function saveDanmakuAsync(ConnectionPool $pool, string $room, string $msg): void' },
  { text: '{' },
  { text: '    $redis = $pool->borrow(); // 从第 5 篇协程连接池借出独占连接!', diff: 'added' },
  { text: '    try {' },
  { text: '        $redis->lPush("history:{$room}", $msg); // 非阻塞 Fiber 挂起落库', diff: 'added' },
  { text: '    } finally {' },
  { text: '        $pool->release($redis); // 铁律：异常也必归还，防止池耗尽!', diff: 'added' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'active' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage109: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Fiber + 连接池并发 RESP LPUSH 落库实测',
      status: { label: 'ZERO CROSS-TALK ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'info' : 'success',
        appearAtFrame: 12 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 try/finally + ConnectionPool 防连接池打爆" badge="零串台不阻塞" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          borrow() 借出独占
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          lPush 协程挂起落库
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          finally 必调 release() 归还!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP109 · 协程 Redis 异步落库"
      fileName="DanmakuStorage.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'async-save' ? [3, 5] : [6, 7]}
      callout={
        visual === 'async-save'
          ? { line: 4, text: '先屏幕广播再异步入库，直播间 0 卡顿', tone: 'blue' }
          : { line: 8, text: '少写 finally 一旦抛错整个池连接就会泄漏归零！', tone: 'amber' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
