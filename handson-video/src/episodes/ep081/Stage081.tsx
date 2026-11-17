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
  { text: '// ❌ 默认阻塞连上游：对端卡 2s 握手，全进程卡 2s!' },
  { text: '// $sock = stream_socket_client("tcp://10.0.0.5:6379");', diff: 'removed' },
  { text: '' },
  { text: '// ✅ 异步建连核心旗标：发 SYN 包瞬间立刻返回句柄!' },
  { text: '$flags = STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT;', diff: 'added' },
  { text: '$sock  = stream_socket_client("tcp://{$addr}", $errno, $errstr, 2, $flags);', diff: 'added' },
  { text: 'stream_set_blocking($sock, false);' },
  { text: '' },
  { text: '// 怎么知道异步三次握手成功了？注册【可写事件】即可!' },
  { text: '$w = [$sock]; $r = $e = null;' },
  { text: 'stream_select($r, $w, $e, 2, 0); // 一变为可写 = 三次握手已通!' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage081: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (非阻塞 ASYNC_CONNECT 实测)',
      status: { label: 'ASYNC CONNECT ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么三次握手成功触发的是【可写事件】？" badge="POSIX 网络常识" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          ASYNC_CONNECT 发出 SYN 立刻返回 EINPROGRESS
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          收到 SYN+ACK → 内核发送缓冲区可用 → 触发可写!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP081 · 铺垫：异步非阻塞建连"
      fileName="AsyncConnect.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'sync-block' ? [1, 2] : [5, 6, 10, 11]}
      callout={
        visual === 'sync-block'
          ? { line: 3, text: '同步建连在跨机房抖动时会直接冻死事件循环', tone: 'red' }
          : { line: 8, text: 'Socket 首次变可写 + getname(peer) 即确认连通', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
