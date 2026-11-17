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
  { text: '    private function safeCall(?\\Closure $fn, mixed ...$args): void', diff: 'added' },
  { text: '    {' },
  { text: '        if (!$fn) {' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        try {', diff: 'added' },
  { text: '            $fn(...$args);', diff: 'added' },
  { text: '        } catch (\\Throwable $e) {', diff: 'added' },
  { text: '            if ($this->onError) {' },
  { text: '                ($this->onError)($e);' },
  { text: '            } else {' },
  { text: '                fwrite(STDERR, "[Worker 捕获异常防崩溃] {$e->getMessage()}\\n");' },
  { text: '            }' },
  { text: '        }', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '// ep20/server.php 故障模拟：收到 boom 直接抛 RuntimeException' },
  { text: '$worker->onMessage = function ($conn, string $msg): void {' },
  { text: '    if (str_contains($msg, "boom")) {' },
  { text: '        throw new \\RuntimeException("业务代码故意抛出的异常！");', diff: 'removed' },
  { text: '    }' },
  { text: '    fwrite($conn, "OK: " . $msg);' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'done' as const },
  { label: '1.3 Timer', state: 'done' as const },
  { label: '1.4 Worker v0.1', state: 'active' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage020: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Server stdout & stderr',
      status: { label: 'SURVIVED 🛡️', tone: 'green' },
      command: 'PORT=19020 php server.php',
      localFrame,
      lines: [
        { text: snapshot.stdout[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.stderr[0], tone: 'error', appearAtFrame: 50 },
        { text: '✅ 进程未崩溃，继续留在 EventLoop 服务下一个客人！', tone: 'success', appearAtFrame: 90 },
      ],
    },
    {
      id: 't2',
      title: 'Terminal 2 · 爆破请求 vs 正常请求',
      status: { label: 'STILL ALIVE ✅', tone: 'green' },
      localFrame,
      lines: [
        { text: 'Client 1 > boom  (触发 RuntimeException)', tone: 'warn', appearAtFrame: 35 },
        { text: 'Client 2 > still alive?', tone: 'cmd', appearAtFrame: 85 },
        { text: `Client 2 收到: ${snapshot.secondClientReply}`, tone: 'success', appearAtFrame: 115 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 防护 X-Ray · 常驻内存异常隔离" badge="Throwable 兜底" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>
          单次回调炸出 Error / Exception
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          safeCall() 拦截记日志
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          EventLoop 稳如泰山
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP020【踩坑】· safeCall 异常防崩溃"
      fileName="Worker.php"
      lines={LINES}
      startLineNumber={57}
      focusLines={visual === 'crash-risk' ? [75, 76] : [62, 63, 64, 68]}
      typeRange={
        visual === 'safe-call'
          ? { fromLine: 62, toLine: 71, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'crash-risk'
          ? { line: 76, text: '⚠️ 裸跑异常会炸毁整个进程！', tone: 'red' }
          : { line: 64, text: 'catch (\Throwable) 连 TypeError 一起兜住', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
