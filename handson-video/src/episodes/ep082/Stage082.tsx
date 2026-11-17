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
  { text: 'class AsyncTcpClient' },
  { text: '{' },
  { text: '    public function connect(EventLoopInterface $loop, string $addr): void' },
  { text: '    {' },
  { text: '        $flags = STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT;', diff: 'added' },
  { text: '        $this->sock = stream_socket_client("tcp://{$addr}", $e, $s, 5, $flags);' },
  { text: '        stream_set_blocking($this->sock, false);' },
  { text: '        // 完全复用第 1 篇 EventLoopInterface 接口！', diff: 'added' },
  { text: '        $loop->onWritable($this->sock, function ($fd) use ($loop): void {', diff: 'added' },
  { text: '            $loop->offWritable($fd); // 握手完成立刻卸写监听!', diff: 'added' },
  { text: '            $loop->onReadable($fd, $this->onRead(...));' },
  { text: '            ($this->onConnect)($this); // 通知业务发送请求包!' },
  { text: '        });' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage082: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (AsyncTcpClient 异步收发)',
      status: { label: 'CLIENT CONNECTED ✅', tone: 'green' },
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
    <XRayInspector title="🔬 AsyncTcpClient 状态流转两连跳" badge="绝不抢事件循环" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          onWritable 等握手 → offWritable 卸载
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          触发 onConnect() + onReadable 等回包!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP082 · 手写 AsyncTcpClient"
      fileName="AsyncTcpClient.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'async-client' ? [5, 6, 7] : [9, 10, 11, 12]}
      callout={
        visual === 'async-client'
          ? { line: 4, text: '同一个 EventLoop 既当服务端又当上游客户端', tone: 'blue' }
          : { line: 10, text: '切到 onReadable 之后全权交由回包驱动', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
