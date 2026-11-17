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

const WORKER_HOOKS_LINES: IDECodeLine[] = [
  { text: '    public ?\\Closure $onConnect = null;', diff: 'added' },
  { text: '    public ?\\Closure $onMessage = null;' },
  { text: '    public ?\\Closure $onClose = null;', diff: 'added' },
  { text: '' },
  { text: '    // 1. 新客人进门并记入连接池：触发 onConnect', diff: 'added' },
  { text: '    $id = (int)$conn;' },
  { text: '    $this->connections[$id] = $conn;' },
  { text: '    $this->safeCall($this->onConnect, $conn);', diff: 'added' },
  { text: '' },
  { text: '    $this->loop->onReadable($conn, function ($client) use ($id): void {' },
  { text: '        $data = @fread($client, 65535);' },
  { text: '        if ($data === "" || $data === false) {' },
  { text: '            $this->loop->offReadable($client);' },
  { text: '            unset($this->connections[$id]);' },
  { text: '            fclose($client);' },
  { text: '            $this->safeCall($this->onClose, $client); // 3. 断线清理后触发', diff: 'added' },
  { text: '            return;' },
  { text: '        }' },
  { text: '        $this->safeCall($this->onMessage, $client, $data); // 2. 收包触发', diff: 'added' },
  { text: '    });' },
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

export const Stage019: React.FC<StageProps> = ({ visual, localFrame }) => {
  const focusLines =
    visual === 'hooks-def'
      ? [8, 9, 10]
      : visual === 'trigger-points'
      ? [15, 23, 26]
      : [15, 23, 26];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 三大生命周期日志',
      status: { label: '3 HOOKS FIRED ✅', tone: 'green' },
      command: 'PORT=19019 php server.php',
      localFrame,
      lines: [
        { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.serverOutput[1], tone: 'success', appearAtFrame: 35 },
        { text: snapshot.serverOutput[2], tone: 'info', appearAtFrame: 68 },
        { text: snapshot.serverOutput[3], tone: 'warn', appearAtFrame: 100 },
      ],
    },
    {
      id: 't2',
      title: 'Terminal 2 · Client 视角',
      status: { label: 'CONNECTED -> CLOSED', tone: 'blue' },
      localFrame,
      lines: [
        { text: `连入即收: ${snapshot.welcome}`, tone: 'success', appearAtFrame: 42 },
        { text: `发包回显: ${snapshot.reply}`, tone: 'success', appearAtFrame: 78 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 生命周期 X-Ray · 连接的三段人生" badge="事件驱动闭环" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          ① onConnect
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, color: THEME.blue }}>
          ② onMessage (N次)
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          ③ onClose
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP019 · Connect / Message / Close"
      fileName="Worker.php"
      lines={WORKER_HOOKS_LINES}
      startLineNumber={8}
      focusLines={focusLines}
      typeRange={
        visual === 'trigger-points'
          ? { fromLine: 15, toLine: 27, localFrame, startFrame: 6, framesPerLine: 14 }
          : undefined
      }
      callout={
        visual === 'hooks-def'
          ? { line: 8, text: '三大核心回调属性就位', tone: 'blue' }
          : { line: 23, text: '清理完 FD 后再通知业务 onClose', tone: 'green' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
