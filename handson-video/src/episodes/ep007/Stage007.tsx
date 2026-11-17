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
  { text: '$readFds = []; $readCallbacks = [];', diff: 'added' },
  { text: 'function watchRead($stream, callable $cb): void {' },
  { text: '    global $readFds, $readCallbacks;' },
  { text: '    $id = (int)$stream;' },
  { text: '    $readFds[$id] = $stream; $readCallbacks[$id] = $cb;' },
  { text: '}' },
  { text: 'function unwatchRead($stream): void {' },
  { text: '    global $readFds, $readCallbacks;' },
  { text: '    unset($readFds[(int)$stream], $readCallbacks[(int)$stream]);' },
  { text: '}' },
  { text: '' },
  { text: '// 1. 先平铺写好“客人说话回调”（不嵌套！）', diff: 'added' },
  { text: '$onClientRead = function ($client): void {', diff: 'added' },
  { text: '    $data = @fread($client, 1024);' },
  { text: '    if ($data === "" || $data === false) {' },
  { text: '        echo "[Server] 客人离开 fd=" . (int)$client . "\\n";' },
  { text: '        unwatchRead($client); fclose($client); return;' },
  { text: '    }' },
  { text: '    fwrite($client, "Echo[cb]: " . $data);' },
  { text: '};' },
  { text: '' },
  { text: '// 2. 再写“门卫迎客回调”，收到新客直接绑上 $onClientRead', diff: 'added' },
  { text: '$onAccept = function ($srv) use ($onClientRead): void {' },
  { text: '    $conn = @stream_socket_accept($srv, 0);' },
  { text: '    if (!$conn) return;' },
  { text: '    stream_set_blocking($conn, false);' },
  { text: '    echo "[Server] 新客入座 fd=" . (int)$conn . "\\n";' },
  { text: '    watchRead($conn, $onClientRead);', diff: 'added' },
  { text: '};' },
  { text: 'watchRead($server, $onAccept);', diff: 'added' },
  { text: '' },
  { text: '// 3. 主循环缩水成 6 行纯调度！', diff: 'modified' },
  { text: 'while (true) {' },
  { text: '    $read = $readFds; $write = $except = null;' },
  { text: '    if (@stream_select($read, $write, $except, null) <= 0) continue;' },
  { text: '    foreach ($read as $fd) {' },
  { text: '        $cb = $readCallbacks[(int)$fd] ?? null;', diff: 'added' },
  { text: '        if ($cb) $cb($fd);', diff: 'added' },
  { text: '    }' },
  { text: '}' },
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

export const Stage007: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'two-tables') {
      return {
        focusLines: [9, 10, 15],
        callout: { line: 9, text: '同下标双表 + 普通辅助函数（不套闭包）', tone: 'blue' as const },
      };
    }
    if (visual === 'register-handlers') {
      return {
        focusLines: [21, 31, 36, 38],
        typeRange: { fromLine: 21, toLine: 38, localFrame, startFrame: 6, framesPerLine: 11 },
        callout: { line: 38, text: '先登记门卫，此时两段回调都还没执行！', tone: 'green' as const },
      };
    }
    if (visual === 'pure-loop') {
      return {
        focusLines: [41, 45, 46],
        callout: { line: 45, text: '主循环零业务代码，彻底解耦！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [9, 45, 46],
      callout: { line: 46, text: '下一步：装进 SelectLoop 类里！', tone: 'green' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Server (平铺回调表)',
      status: { label: 'DECOUPLED ✅', tone: 'green' },
      command: 'PORT=19007 php server.php',
      localFrame,
      lines: [
        { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 15 },
        ...(visual === 'verify-next' || visual === 'pure-loop'
          ? [
              { text: snapshot.serverOutput[1], tone: 'success' as const, appearAtFrame: 40 },
              { text: snapshot.serverOutput[2], tone: 'warn' as const, appearAtFrame: 85 },
            ]
          : []),
      ],
    },
    {
      id: 't2',
      title: 'Terminal 2 · Client 验证',
      status: { label: 'OK', tone: 'blue' },
      localFrame,
      lines:
        visual === 'verify-next'
          ? [
              { text: '> hello callback table', tone: 'cmd', appearAtFrame: 25 },
              { text: snapshot.reply, tone: 'success', appearAtFrame: 55 },
            ]
          : [{ text: '# 平铺定义 $onClientRead 与 $onAccept，主循环只管查表叫号...', tone: 'info', appearAtFrame: 25 }],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 架构 X-Ray · 平铺登记 vs 叫号执行" badge="零嵌套" badgeTone="green">
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 800 }}>[5] =&gt; $onAccept</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>门响触发 → accept 后调用 watchRead($conn, $onClientRead)</div>
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 800 }}>[6] =&gt; $onClientRead</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>客响触发 → fread 读数据并 Echo[cb]</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP007【过渡】· 平铺回调表消灭 if-else"
      fileName="ep07/server.php"
      lines={LINES}
      startLineNumber={9}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={14}
      lineHeight={18}
      terminals={terminals}
      xray={xray}
    />
  );
};
