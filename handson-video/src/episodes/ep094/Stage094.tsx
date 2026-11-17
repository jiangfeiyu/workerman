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
  { text: '$worker->count = 4; // 开启 4 核多进程并发!' },
  { text: '' },
  { text: '// ❌ 灾难：Alice 在 Worker#1(fd=5)，Bob 在 Worker#2(fd=6)' },
  { text: '$worker->onMessage = function ($conn, $msg) use ($worker): void {' },
  { text: '    // 每个 Worker 内存隔离：这个数组里根本没有隔壁进程的连接!', diff: 'removed' },
  { text: '    foreach ($worker->connections as $client) {', diff: 'removed' },
  { text: '        $client->send($msg); // 只能触达 1/4 的人!', diff: 'removed' },
  { text: '    }' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'active' as const },
  { label: '6.2 Gateway集群', state: 'todo' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage094: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 4 进程广播孤岛漏发实测',
      status: { label: '3/4 DROPPED 💥', tone: 'red' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'warn' : 'error',
        appearAtFrame: 16 + i * 30,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 多进程孤岛惨案：$worker->connections 各自为政" badge="跨进程不能直呼" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          Worker #1 内存: [Alice(fd=5)] ← 只发到了 Alice
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          Worker #2 内存: [Bob(fd=6)] ← Bob 彻底掉出局外 💥
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP094 · 踩坑：4 进程广播失灵"
      fileName="chat_4workers.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'single-ok' ? [1, 4] : [5, 6, 7]}
      callout={
        visual === 'single-ok'
          ? { line: 2, text: '单进程跑得好好的，一开 4 进程就半数收不到', tone: 'amber' }
          : { line: 8, text: 'COW 物理隔离导致你只能看到本进程内的 1/4 连接', tone: 'red' }
      }
      fontSize={15}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
