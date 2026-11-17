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
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: '' },
  { text: "\$port = getenv('PORT') ?: '9004';" },
  { text: '$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);' },
  { text: 'stream_set_blocking($server, false);' },
  { text: 'echo "[Server] 已用 stream_select 守护接待门 (CPU 0% 睡眠中)...\\n";' },
  { text: '' },
  { text: 'while (true) {' },
  { text: '    // 遵循 EP003 铁律：每轮拷贝一份临时数组传给内核', diff: 'added' },
  { text: '    $read = [$server];', diff: 'added' },
  { text: '    $write = $except = null;' },
  { text: '' },
  { text: '    // 第4参数传 null：没客人安心睡觉，来客人内核瞬间叫醒！', diff: 'added' },
  { text: '    $ready = @stream_select($read, $write, $except, null);', diff: 'added' },
  { text: '    if ($ready > 0) {' },
  { text: '        $conn = @stream_socket_accept($server, 0);' },
  { text: '        if ($conn) {' },
  { text: '            $peer = stream_socket_get_name($conn, true);' },
  { text: '            echo "[Server] 内核叫醒！迎入新客人: {$peer}\\n";' },
  { text: '            fwrite($conn, "Welcome {$peer}\\n");' },
  { text: '            fclose($conn);' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'active' as const },
  { label: '1.2 SelectLoop', state: 'todo' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage004: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'code-select') {
      return {
        focusLines: [11, 15],
        typeRange: { fromLine: 10, toLine: 16, localFrame, startFrame: 6, framesPerLine: 16 },
        callout: { line: 15, text: 'null = 没客不空转，安心等唤醒', tone: 'green' as const },
      };
    }
    if (visual === 'wake-up') {
      return {
        focusLines: [15, 17, 20, 21],
        callout: { line: 17, text: '唤醒后必有新客，直接 accept()', tone: 'blue' as const },
      };
    }
    return {
      focusLines: [11, 22],
      callout: { line: 22, text: '下集：不再立刻 fclose，把客人留进监控池', tone: 'amber' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Server',
      status: { label: 'CPU 0% SLEEPING 🌙', tone: 'green' },
      command: 'PORT=19004 php server.php',
      localFrame,
      lines: [
        { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 12 },
        ...(visual !== 'code-select'
          ? [
              { text: snapshot.serverOutput[1], tone: 'success' as const, appearAtFrame: 35 },
              { text: snapshot.serverOutput[2], tone: 'success' as const, appearAtFrame: 70 },
            ]
          : []),
      ],
    },
    {
      id: 't2',
      title: 'Terminal 2 · 客户端访问实测',
      status: { label: 'WOKEN UP ⚡', tone: 'blue' },
      localFrame,
      lines:
        visual === 'code-select'
          ? [{ text: '# 等待新连接敲门唤醒 stream_select...', tone: 'info', appearAtFrame: 20 }]
          : [
              { text: `客人 1 收到: ${snapshot.replies[0]}`, tone: 'success', appearAtFrame: 42 },
              { text: `客人 2 收到: ${snapshot.replies[1]}`, tone: 'success', appearAtFrame: 78 },
            ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · 从 7.3 万次空转到 0% 休眠" badge="CPU 0%" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 16, fontWeight: 800 }}>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          空闲睡眠 (S+) · 0% CPU
        </div>
        <span>→ 新客 SYN 到 →</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          内核瞬间唤醒 accept()
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP004 · stream_select 守护接待门"
      fileName="ep04/server.php"
      lines={LINES}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
