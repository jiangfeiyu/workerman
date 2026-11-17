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

const LOOP_LINES: IDECodeLine[] = [
  { text: 'class SelectLoop implements EventLoopInterface', diff: 'added' },
  { text: '{' },
  { text: '    private array $readFds = [];', diff: 'added' },
  { text: '    private array $readCallbacks = [];', diff: 'added' },
  { text: '' },
  { text: '    public function onReadable($stream, callable $callback): void' },
  { text: '    {' },
  { text: '        $id = (int)$stream;' },
  { text: '        $this->readFds[$id] = $stream;' },
  { text: '        $this->readCallbacks[$id] = $callback;' },
  { text: '    }' },
  { text: '    public function offReadable($stream): void' },
  { text: '    {' },
  { text: '        $id = (int)$stream;' },
  { text: '        unset($this->readFds[$id], $this->readCallbacks[$id]);' },
  { text: '    }' },
  { text: '    public function run(): void' },
  { text: '    {' },
  { text: '        while ($this->readFds !== []) {' },
  { text: '            $read = $this->readFds;' },
  { text: '            $write = $except = null;' },
  { text: '            $count = @stream_select($read, $write, $except, null);', diff: 'modified' },
  { text: '            if ($count === false || $count === 0) continue;', diff: 'added' },
  { text: '            foreach ($read as $fd) {' },
  { text: '                $cb = $this->readCallbacks[(int)$fd] ?? null;' },
  { text: '                if ($cb) $cb($fd);' },
  { text: '            }' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const SERVER_LINES: IDECodeLine[] = [
  { text: '$loop = new SelectLoop();', diff: 'added' },
  { text: '$loop->onReadable($server, function ($srv) use ($loop): void {' },
  { text: '    $conn = @stream_socket_accept($srv, 0);' },
  { text: '    if (!$conn) return;' },
  { text: '    stream_set_blocking($conn, false);' },
  { text: '    $loop->onReadable($conn, function ($client) use ($loop): void {', diff: 'added' },
  { text: '        $data = @fread($client, 1024);' },
  { text: '        if ($data === "" || $data === false) {' },
  { text: '            $loop->offReadable($client); fclose($client); return;' },
  { text: '        }' },
  { text: '        fwrite($client, "Echo[SelectLoop]: " . $data);' },
  { text: '    });' },
  { text: '});' },
  { text: '$loop->run();', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'active' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage009: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showServer = visual === 'use-in-server';

  const getIde = () => {
    if (visual === 'class-skeleton') {
      return {
        fileName: 'SelectLoop.php',
        lines: LOOP_LINES,
        startLineNumber: 5,
        focusLines: [7, 8, 10, 16],
        typeRange: { fromLine: 5, toLine: 20, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 8, text: '全局变量收进私有属性！', tone: 'green' as const },
      };
    }
    if (visual === 'run-eintr') {
      return {
        fileName: 'SelectLoop.php',
        lines: LOOP_LINES,
        startLineNumber: 5,
        focusLines: [26, 27],
        callout: { line: 26, text: '@ 抑制信号打断产生的 EINTR', tone: 'amber' as const },
      };
    }
    if (showServer) {
      return {
        fileName: 'server.php',
        lines: SERVER_LINES,
        startLineNumber: 9,
        focusLines: [9, 10, 14, 22],
        callout: { line: 22, text: '调用 $loop->run() 一键启动！', tone: 'green' as const },
      };
    }
    return {
      fileName: 'SelectLoop.php',
      lines: LOOP_LINES,
      startLineNumber: 5,
      focusLines: [26],
      callout: { line: 26, text: '下集：补全 onWritable 写监听大坑', tone: 'blue' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · SelectLoop 读监听实测',
      status: { label: 'SELECT LOOP 🟢', tone: 'green' },
      command: 'PORT=19009 php server.php',
      localFrame,
      lines: showServer
        ? [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 12 },
            { text: snapshot.serverOutput[1], tone: 'success', appearAtFrame: 35 },
            { text: `Client 收到: ${snapshot.reply}`, tone: 'success', appearAtFrame: 65 },
            { text: snapshot.serverOutput[2], tone: 'warn', appearAtFrame: 95 },
          ]
        : [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 15 },
            { text: '# @stream_select 遭遇信号中断时返回 false (EINTR)，安全 continue 继续监听', tone: 'warn', appearAtFrame: 55 },
          ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · EINTR 中断容错机制" badge="防崩溃细节" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          进程正睡在 stream_select
        </div>
        <span>→ 收到信号打断 →</span>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          @ 抑制警告 + continue 重睡
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP009 · SelectLoop 读监听与 EINTR"
      fileName={ide.fileName}
      tabs={['SelectLoop.php', 'server.php']}
      lines={ide.lines}
      startLineNumber={ide.startLineNumber}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
