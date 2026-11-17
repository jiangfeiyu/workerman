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
  { text: '$clients = []; // [id => ["fd" => resource, "lastActive" => float]]', diff: 'added' },
  { text: '$loop->onReadable($server, function ($srv) use ($loop, &$clients): void {' },
  { text: '    $conn = @stream_socket_accept($srv, 0);' },
  { text: '    if (!$conn) return;' },
  { text: '    stream_set_blocking($conn, false);' },
  { text: '    $id = (int)$conn;' },
  { text: '    $clients[$id] = ["fd" => $conn, "lastActive" => microtime(true)];', diff: 'added' },
  { text: '    $loop->onReadable($conn, function ($c) use ($loop, &$clients, $id): void {' },
  { text: '        $data = @fread($c, 1024);' },
  { text: '        if ($data === "" || $data === false) {' },
  { text: '            $loop->offReadable($c); unset($clients[$id]); fclose($c); return;' },
  { text: '        }' },
  { text: '        $clients[$id]["lastActive"] = microtime(true); // 说话即续命！', diff: 'modified' },
  { text: '        fwrite($c, "Pong: " . $data);' },
  { text: '    });' },
  { text: '});' },
  { text: '' },
  { text: '$loop->repeat(0.10, function () use ($loop, &$clients, $timeoutSec): void {', diff: 'added' },
  { text: '    $now = microtime(true);' },
  { text: '    foreach ($clients as $id => $info) {' },
  { text: '        if ($now - $info["lastActive"] >= $timeoutSec) {', diff: 'added' },
  { text: '            echo "[心跳巡检] fd={$id} 超时未说话，强制踢出！\\n";' },
  { text: '            @fwrite($info["fd"], "BYE: heartbeat timeout\\n");' },
  { text: '            $loop->offReadable($info["fd"]); fclose($info["fd"]); unset($clients[$id]);' },
  { text: '        }' },
  { text: '    }' },
  { text: '});' },
];

export const Stage017: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.1 Socket破冰', state: 'done' as const },
    { label: '1.2 SelectLoop', state: 'done' as const },
    { label: '1.3 Timer', state: 'done' as const },
    { label: '1.4 Worker v0.1', state: 'active' as const },
    { label: '2.x TcpConnection', state: 'todo' as const },
    { label: '3.x HTTP/WS', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 心跳巡检 Server',
      status: { label: 'HEARTBEAT GUARD 🛡️', tone: 'green' },
      command: 'IDLE_TIMEOUT=0.35 php server.php',
      localFrame,
      lines: [
        { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.serverOutput[1], tone: 'info', appearAtFrame: 28 },
        { text: snapshot.serverOutput[2], tone: 'info', appearAtFrame: 40 },
        { text: snapshot.serverOutput[3], tone: 'error', appearAtFrame: 80 },
        { text: snapshot.serverOutput[4], tone: 'warn', appearAtFrame: 115 },
      ],
    },
    {
      id: 't2',
      title: 'Terminal 2 · 发呆 fd=9 vs 活跃 fd=10',
      status: { label: 'KICKED IDLE ✅', tone: 'amber' },
      localFrame,
      lines: [
        { text: `活跃客人 fd=10 发送 ping -> ${snapshot.activeReply}`, tone: 'success', appearAtFrame: 52 },
        { text: `发呆客人 fd=9 收到踢人通知 -> ${snapshot.idleKickedMsg}`, tone: 'error', appearAtFrame: 92 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 合拢 X-Ray · EventLoop + Timer 双轮驱动" badge="模块 1.3 毕业 🎉" badgeTone="green">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 800, color: THEME.red }}>fd=9 (发呆)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>超时 &gt;= 0.35s → 巡检定时器强踢释放 FD</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 800, color: THEME.green }}>fd=10 (发送 ping)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>刷新 lastActive → 安全续命回 Pong</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP017【合拢】· 心跳超时踢人实战"
      fileName="ep17/server.php"
      lines={LINES}
      startLineNumber={11}
      focusLines={visual === 'patrol' ? [28, 31, 32, 34] : [17, 23]}
      typeRange={
        visual === 'patrol'
          ? { fromLine: 28, toLine: 37, localFrame, startFrame: 6, framesPerLine: 14 }
          : undefined
      }
      callout={
        visual === 'patrol'
          ? { line: 31, text: '每 0.1s 巡检一次，超时踢出！', tone: 'red' }
          : { line: 23, text: '收到数据就刷新 lastActive 续命', tone: 'green' }
      }
      fontSize={15}
      lineHeight={22}
      terminals={terminals}
      xray={xray}
    />
  );
};
