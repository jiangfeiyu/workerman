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
  { text: '// ❌ 坑点：直接监听 ssl:// 会在 accept() 内部死等整个 TLS 握手完成！', diff: 'removed' },
  { text: "$badServer = stream_socket_server('ssl://0.0.0.0:443', $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);", diff: 'removed' },
  { text: '' },
  { text: '// ✅ 正确架构：先用 tcp:// 0ms accept 明文句柄，再非阻塞分段握手！', diff: 'added' },
  { text: "$tcpServer = stream_socket_server('tcp://0.0.0.0:443', $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);", diff: 'added' },
  { text: '$conn = stream_socket_accept($tcpServer, 0); // 仅取走已就绪 TCP 连接，绝不卡主循环', diff: 'added' },
  { text: 'stream_set_blocking($conn, false);' },
  { text: '' },
  { text: '// 下集 EP089：注册到 EventLoop，每次可读事件分段调用 enable_crypto()!', diff: 'added' },
  { text: 'stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLS_SERVER);' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage088B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (ssl:// 阻塞对比 tcp:// + 分段握手)',
      status: { label: 'NON-BLOCKING TLS ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? ('error' as const) : ('success' as const),
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 架构对照 X-Ray · 为什么底层框架不用 ssl:// 而用 tcp:// + enable_crypto()" badge="EP089 前置" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>❌ ssl://0.0.0.0:443</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>accept() 同步阻塞等 ClientHello → 1 个慢连接卡死全服</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ tcp:// + enable_crypto()</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>accept 0ms 返回 → 非阻塞交给 Epoll 驱动 TLS 握手</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP088B【加餐过渡】· 为什么不用 ssl:// 监听"
      fileName="ep88b/verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'ssl-block' ? [1, 2] : [4, 5, 6, 10]}
      callout={
        visual === 'ssl-block'
          ? { line: 2, text: 'ssl:// 把 TLS 握手塞进 accept()，慢客户端直接堵死 EventLoop！', tone: 'red' }
          : { line: 10, text: '下集 EP089：拆解非阻塞 enable_crypto() 最坑返回值 0！', tone: 'green' }
      }
      fontSize={14}
      lineHeight={22}
      terminals={terminals}
      xray={xray}
    />
  );
};
