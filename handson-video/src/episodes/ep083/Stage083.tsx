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
  { text: 'public function awaitRequest(string $payload): string' },
  { text: '{' },
  { text: '    $fiber = Fiber::getCurrent(); // 记住发起请求的协程!', diff: 'added' },
  { text: '    $this->onMessage = function ($cli, string $reply) use ($fiber): void {' },
  { text: '        $fiber->resume($reply);   // 收到回包瞬间唤醒协程并返回!', diff: 'added' },
  { text: '    };' },
  { text: '    $this->send($payload);' },
  { text: '    return Fiber::suspend();      // 优雅让出，直到 $reply 到货!', diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: '// 业务写法瞬间变同步：$pong = $client->awaitRequest("hello-fiber");' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage083: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · AsyncTcpClient::await() 协程化收发实测',
      status: { label: 'AWAIT OK ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 把事件回调封装成同步 await() 只需 8 行" badge="模块 5.1 合拢" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          send() + Fiber::suspend()
        </div>
        <span>── onMessage ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          $fiber-&gt;resume($reply) → 直接当返回值收下!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP083 · 封装协程 await() API"
      fileName="AsyncTcpClient.php"
      lines={LINES}
      startLineNumber={20}
      focusLines={visual === 'wrap-await' ? [22, 26, 27] : [23, 24, 30]}
      callout={
        visual === 'wrap-await'
          ? { line: 28, text: '发出请求后立刻 suspend，释放线程服务别人', tone: 'amber' }
          : { line: 25, text: '回包顺着 EventLoop 回来直接 resume 塞回结果', tone: 'green' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
