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

const WORKER_LINES: IDECodeLine[] = [
  { text: 'class WorkerV01', diff: 'added' },
  { text: '{' },
  { text: '    public ?\\Closure $onMessage = null;' },
  { text: '    public array $connections = [];' },
  { text: '    private SelectLoopWithRepeat $loop;' },
  { text: '' },
  { text: '    public function __construct(private string $listenAddress)' },
  { text: '    {' },
  { text: '        $this->loop = new SelectLoopWithRepeat();' },
  { text: '    }' },
  { text: '    public function start(): void', diff: 'added' },
  { text: '    {' },
  { text: '        $this->server = stream_socket_server($this->listenAddress, $errno, $errstr);' },
  { text: '        stream_set_blocking($this->server, false);' },
  { text: '        $this->loop->onReadable($this->server, function ($srv): void {' },
  { text: '            $conn = @stream_socket_accept($srv, 0);' },
  { text: '            if (!$conn) return;' },
  { text: '            stream_set_blocking($conn, false);' },
  { text: '            $this->connections[(int)$conn] = $conn;' },
  { text: '            $this->loop->onReadable($conn, function ($client): void { ... });' },
  { text: '        });' },
  { text: '        $this->loop->run();' },
  { text: '    }' },
  { text: '}' },
];

const ENTRY_LINES: IDECodeLine[] = [
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: "require_once __DIR__ . '/../Worker.php';" },
  { text: '' },
  { text: "\$port = getenv('PORT') ?: '9018';" },
  { text: '$worker = new WorkerV01("tcp://127.0.0.1:{$port}");', diff: 'added' },
  { text: '' },
  { text: '// 业务脚本只需 4 行代码，底层 Select/accept 彻底隐身！', diff: 'added' },
  { text: '$worker->onMessage = function ($conn, string $msg): void {', diff: 'added' },
  { text: '    fwrite($conn, "WorkerV01 Echo: " . $msg);' },
  { text: '};', diff: 'added' },
  { text: '' },
  { text: '$worker->start();', diff: 'added' },
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

export const Stage018: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showEntry = visual === 'clean-entry';

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php server.php',
      status: { label: 'WORKER V0.1 🟢', tone: 'green' },
      command: 'PORT=19018 php server.php',
      localFrame,
      lines: [
        { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 15 },
        ...(showEntry
          ? [{ text: `Client 收到: ${snapshot.reply}`, tone: 'success' as const, appearAtFrame: 45 }]
          : []),
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 架构 X-Ray · WorkerV01 封装层次" badge="复杂性下沉" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          业务入口 (4 行)
        </div>
        <span>──调用──▶</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          WorkerV01 壳子
        </div>
        <span>──驱动──▶</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          SelectLoop + Timer
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP018 · 组装 WorkerV01"
      fileName={showEntry ? 'ep18/server.php' : 'Worker.php'}
      tabs={['Worker.php', 'ep18/server.php']}
      lines={showEntry ? ENTRY_LINES : WORKER_LINES}
      startLineNumber={showEntry ? 1 : 6}
      focusLines={showEntry ? [6, 9, 13] : [16, 18, 27]}
      typeRange={
        visual === 'wrap-worker'
          ? { fromLine: 16, toLine: 28, localFrame, startFrame: 6, framesPerLine: 14 }
          : undefined
      }
      callout={
        showEntry
          ? { line: 9, text: '干净得就像写原版 Workerman！', tone: 'green' }
          : { line: 16, text: '把监听与事件注册全包进来', tone: 'blue' }
      }
      fontSize={15}
      lineHeight={22}
      terminals={terminals}
      xray={xray}
    />
  );
};
