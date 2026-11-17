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
  { text: '// 1. PHP 7.1+ 全局开启异步信号，彻底告别 pcntl_signal_dispatch() 轮询！' },
  { text: 'pcntl_async_signals(true);', diff: 'added' },
  { text: '' },
  { text: 'pcntl_signal(SIGUSR1, function (int $sig) use (&$worker): void {' },
  { text: '    $worker->reloadFlag = true; // 每条 opcode 之间瞬间触发!', diff: 'added' },
  { text: '});' },
  { text: '' },
  { text: '// 2. 阻塞系统调用被信号打断 (EINTR) 的安全护城河：' },
  { text: '$ret = @stream_select($read, $write, $except, 0, $timeoutUs);', diff: 'added' },
  { text: 'if ($ret === false) {' },
  { text: '    continue; // 收到 EINTR 不崩溃，安全进入下一轮!', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage067: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 异步信号秒触发与 EINTR 保护实测',
      status: { label: 'ASYNC SIGNAL ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'success', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 异步信号调度 + EINTR 系统调用被打断防护" badge="零轮询开销" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          pcntl_async_signals(true): 无需手写 dispatch 轮询
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          @stream_select === false (EINTR) → continue 续命
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP067 · 异步信号与 EINTR 防护"
      fileName="Worker.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'async-sig' ? [2, 4, 5] : [9, 10, 11]}
      callout={
        visual === 'async-sig'
          ? { line: 3, text: 'PHP 虚拟机执行间隙自动异步触发信号回调', tone: 'blue' }
          : { line: 12, text: 'wait/select 被信号打断返回 false 时绝不能报错退场', tone: 'amber' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
