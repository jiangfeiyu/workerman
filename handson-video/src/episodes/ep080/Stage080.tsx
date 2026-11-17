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
  { text: '// 框架底座在派发每个请求时，自动给它套上一根独立 Fiber：' },
  { text: '$conn->onMessage = function ($conn, $req) use ($handler): void {' },
  { text: '    Coroutine::spawn(fn () => $handler($conn, $req));', diff: 'added' },
  { text: '};' },
  { text: '' },
  { text: '// 从此业务程序员写代码再也不用回调嵌套地狱：' },
  { text: '$handler = function ($conn, $req): void {' },
  { text: '    $user = $redis->get("uid:1");     // 看似同步，底层自动挂起!', diff: 'added' },
  { text: '    Coroutine::sleep(0.02);           // 看似卡住，实际立刻让出!', diff: 'added' },
  { text: '    $conn->send(Response::json($user));' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'active' as const },
  { label: '5.2 Redis连接池', state: 'todo' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage080: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (一请求一协程并发调度)',
      status: { label: 'SYNC CODE + ASYNC IO ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: 'success' as const,
        appearAtFrame: 16 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 回调地狱终结者：1 Request = 1 Fiber" badge="框架自动包装" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          回调嵌套: then() 套 then() 写吐 😵
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          一请求一 Fiber: 顺序写到底，底层自动切换 ⚡
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP080 · 请求自动协程化"
      fileName="Worker.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'cb-hell' ? [2, 3, 4] : [8, 9, 10]}
      callout={
        visual === 'cb-hell'
          ? { line: 5, text: '框架层包一层 spawn()，业务层零感知切换', tone: 'blue' }
          : { line: 6, text: '像写 FPM 一样直线写代码，跑出 Swoole/Go 级并发', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
