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

const LINES_WINDOW: IDECodeLine[] = [
  { text: '// 核心总花名册：接待门 $server 和所有客人放在同一个池子里！', diff: 'added' },
  { text: '$allFds = [(int)$server => $server];', diff: 'added' },
  { text: '' },
  { text: 'while (true) {' },
  { text: '    $read = $allFds;' },
  { text: '    $write = $except = null;' },
  { text: '    if (@stream_select($read, $write, $except, null) <= 0) continue;' },
  { text: '' },
  { text: '    foreach ($read as $fd) {' },
  { text: '        if ($fd === $server) {', diff: 'added' },
  { text: '            $conn = @stream_socket_accept($server, 0);' },
  { text: '            if ($conn) {' },
  { text: '                stream_set_blocking($conn, false);' },
  { text: '                $allFds[(int)$conn] = $conn;', diff: 'added' },
  { text: '                echo "[Server] 新客入座 fd=" . (int)$conn . "\\n";' },
  { text: '            }' },
  { text: '        } else {', diff: 'added' },
  { text: '            $data = @fread($fd, 1024);' },
  { text: '            if ($data === "" || $data === false) {', diff: 'modified' },
  { text: '                echo "[Server] 客人离开 fd=" . (int)$fd . "\\n";' },
  { text: '                unset($allFds[(int)$fd]); fclose($fd);', diff: 'modified' },
  { text: '                continue;' },
  { text: '            }' },
  { text: '            echo "[Server] 收到 fd=" . (int)$fd . ": " . trim($data) . "\\n";' },
  { text: '            fwrite($fd, "Echo[fd=" . (int)$fd . "]: " . $data);' },
  { text: '        }' },
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

export const Stage005: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'hook-pool') {
      return {
        focusLines: [10, 11, 14, 16],
        callout: { line: 11, text: '门卫与客人统一放进 $allFds', tone: 'blue' as const },
      };
    }
    if (visual === 'branch-accept') {
      return {
        focusLines: [19, 20, 23, 24],
        typeRange: { fromLine: 19, toLine: 25, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 23, text: '关键：以整数 FD 为键存入总池！', tone: 'green' as const },
      };
    }
    if (visual === 'branch-read') {
      return {
        focusLines: [26, 27, 28, 30],
        typeRange: { fromLine: 26, toLine: 34, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 30, text: '⚠️ 断开必删！否则死循环+漏FD', tone: 'red' as const },
      };
    }
    if (visual === 'verify-concurrent') {
      return {
        focusLines: [16, 23, 33, 34],
        callout: { line: 34, text: '精准回复对应 FD 的客人！', tone: 'green' as const },
      };
    }
    return {
      focusLines: [19, 26],
      callout: { line: 19, text: '下集模块 1.2：消除 if-else 抽象 SelectLoop', tone: 'amber' as const },
    };
  };

  const getTerminals = (): TerminalPaneData[] => {
    if (visual === 'verify-concurrent' || visual === 'milestone') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · 单进程多路复用 Server',
          status: { label: 'MULTI-CLIENT ✅', tone: 'green' },
          command: 'PORT=19005 php server.php',
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 10 },
            { text: snapshot.serverOutput[1], tone: 'info', appearAtFrame: 25 },
            { text: snapshot.serverOutput[2], tone: 'info', appearAtFrame: 40 },
            { text: snapshot.serverOutput[3], tone: 'success', appearAtFrame: 65 },
            { text: snapshot.serverOutput[4], tone: 'success', appearAtFrame: 110 },
            { text: snapshot.serverOutput[5], tone: 'success', appearAtFrame: 150 },
            { text: snapshot.serverOutput[6], tone: 'warn', appearAtFrame: 185 },
            { text: snapshot.serverOutput[7], tone: 'warn', appearAtFrame: 195 },
          ],
        },
        {
          id: 't2',
          title: 'Terminal 2 · 客人 A (fd=6 发呆) vs 客人 B (fd=7 连发)',
          status: { label: '0ms BLOCKING', tone: 'green' },
          localFrame,
          lines: [
            { text: `B 发送 1 -> ${snapshot.clientBReplies[0]}`, tone: 'success', appearAtFrame: 72 },
            { text: `A 终于说话 -> ${snapshot.clientAReply}`, tone: 'info', appearAtFrame: 118 },
            { text: `B 发送 2 -> ${snapshot.clientBReplies[1]}`, tone: 'success', appearAtFrame: 158 },
          ],
        },
      ];
    }

    return [
      {
        id: 't1',
        title: 'Terminal 1 · 代码演进推演',
        status: { label: 'MODULE 1.1', tone: 'blue' },
        command: 'PORT=19005 php server.php',
        localFrame,
        lines: [
          { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 15 },
          { text: snapshot.serverOutput[1], tone: 'success', appearAtFrame: 45 },
          { text: snapshot.serverOutput[2], tone: 'success', appearAtFrame: 75 },
        ],
      },
    ];
  };

  const xray = (
    <XRayInspector
      title="🔬 内核 X-Ray · $allFds 花名册实时池"
      badge={visual === 'milestone' ? '模块 1.1 毕业 🎉' : '1 个 select 管全场'}
      badgeTone="green"
    >
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { fd: 'fd=5', role: '监听门 $server', desc: '来客 → accept 入池', tone: THEME.amberBg, border: THEME.amber },
          { fd: 'fd=6', role: '客人 A (发呆中)', desc: '没说话 → 静静待着', tone: THEME.softBg, border: THEME.dark },
          { fd: 'fd=7', role: '客人 B (发消息)', desc: '有数据 → 立刻 fread 回显', tone: THEME.greenBg, border: THEME.green },
        ].map((item) => (
          <div
            key={item.fd}
            style={{
              flex: 1,
              padding: '10px 10px',
              borderRadius: 12,
              backgroundColor: item.tone,
              border: `2.5px solid ${item.border}`,
            }}
          >
            <div style={{ fontFamily: THEME.fontMono, fontSize: 16, fontWeight: 800 }}>{item.fd}</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 3 }}>{item.role}</div>
            <div style={{ fontSize: 13, color: THEME.mutedText, marginTop: 3 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP005【合拢】· 单进程多路复用服务器"
      fileName="ep05/server.php"
      lines={LINES_WINDOW}
      startLineNumber={10}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={24}
      terminals={getTerminals()}
      xray={xray}
    />
  );
};
