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
  { text: '// SelectLoop 核心：每轮循环都得把全量数组拷贝进内核轮询！' },
  { text: 'for ($t = 0; $t < 300; $t++) {' },
  { text: '    $r = $allReadSockets; // 哪怕 10000 条里只有 1 条发消息，仍要全量拷贝!', diff: 'removed' },
  { text: '    $w = $e = null;' },
  { text: '    // 底层 C 结构体 fd_set 只有 1024 个 bit 坑位！', diff: 'removed' },
  { text: '    stream_select($r, $w, $e, 0, 0); // FD >= 1024 当场越界崩溃!', diff: 'removed' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'done' as const },
  { label: '4.4 Epoll核动力', state: 'active' as const },
];

export const Stage072: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (stream_select O(N) 实测)',
      status: { label: 'FD_SETSIZE=1024 💥', tone: 'red' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 3 ? ('error' as const) : i === 2 ? ('warn' as const) : ('info' as const),
        appearAtFrame: 12 + i * 18,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 stream_select() 两大死穴" badge="O(N) 拷贝 + 1024 上限" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          死穴 1: fd_set[1024 bit] 硬编码位图，第 1025 连接直接越界 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          死穴 2: 每轮全量拷贝用户态↔内核态 + O(N) 盲扫全员 ❌
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'select-scale'
      ? [2, 3, 6]
      : visual === 'fdset-1024'
      ? [5, 6]
      : [2, 3, 4];

  const callout =
    visual === 'select-scale'
      ? { line: 3, text: '50→250→500 连接，耗时呈 10 倍线性飙升', tone: 'amber' as const }
      : visual === 'fdset-1024'
      ? { line: 5, text: 'C 标准库宏 FD_SETSIZE 写死上限 1024', tone: 'red' as const }
      : { line: 7, text: '9999 个空闲连接每轮都被无辜重扫一遍', tone: 'blue' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP072 · 踩坑：select 1024 上限"
      fileName="SelectLoop.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={16}
      lineHeight={27}
      terminals={terminals}
      xray={xray}
    />
  );
};
