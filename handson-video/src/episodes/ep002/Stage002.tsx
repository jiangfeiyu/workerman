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

const LINES_FULL: IDECodeLine[] = [
  { text: 'stream_set_blocking($server, false);', diff: 'added' },
  { text: 'echo "[Server] 非阻塞监听已开启\\n";' },
  { text: '$clients = []; $loops = 0; $start = microtime(true);', diff: 'added' },
  { text: '' },
  { text: 'while (true) {' },
  { text: '    $loops++;', diff: 'added' },
  { text: '    $conn = @stream_socket_accept($server, 0);', diff: 'modified' },
  { text: '    if ($conn) {' },
  { text: '        stream_set_blocking($conn, false);', diff: 'added' },
  { text: '        $clients[] = $conn;' },
  { text: '    }' },
  { text: '    foreach ($clients as $i => $client) {' },
  { text: '        $data = @fread($client, 1024);', diff: 'modified' },
  { text: '        if ($data === "" && feof($client)) {' },
  { text: '            fclose($client); unset($clients[$i]); continue;' },
  { text: '        }' },
  { text: '        if ($data !== false && $data !== "") {' },
  { text: '            fwrite($client, "Echo: " . $data);' },
  { text: '        }' },
  { text: '    }' },
  { text: '    if (microtime(true) - $start >= 0.5) {' },
  { text: '        echo "[CPU 警报] 0.5 秒空转了 " . number_format($loops) . " 次!\\n";' },
  { text: '        $loops = 0; $start = microtime(true);' },
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

export const Stage002: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'diff-nonblocking') {
      return {
        focusLines: [11, 17, 19, 23],
        typeRange: { fromLine: 11, toLine: 30, localFrame, startFrame: 6, framesPerLine: 12 },
        callout: { line: 11, text: '核心开关：设为非阻塞', tone: 'green' as const },
      };
    }
    if (visual === 'concurrent-ok') {
      return {
        focusLines: [22, 23, 28],
        callout: { line: 23, text: '没数据直接返回 false，不再堵死', tone: 'blue' as const },
      };
    }
    if (visual === 'cpu-disaster') {
      return {
        focusLines: [15, 16, 32],
        callout: { line: 16, text: '🔥 0.5s 疯跑 73,293 次！', tone: 'red' as const },
      };
    }
    if (visual === 'usleep-trap') {
      return {
        focusLines: [34],
        callout: { line: 34, text: '加 usleep() 治标不治本！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [15, 17],
      callout: { line: 17, text: '下集：交由内核 stream_select 托管', tone: 'blue' as const },
    };
  };

  const getTerminals = (): TerminalPaneData[] => {
    if (visual === 'concurrent-ok') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · Server',
          status: { label: 'NON-BLOCKING', tone: 'green' },
          command: 'PORT=19002 php server.php',
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 10 },
            { text: snapshot.serverOutput[2], tone: 'success', appearAtFrame: 35 },
            { text: snapshot.serverOutput[3], tone: 'success', appearAtFrame: 50 },
          ],
        },
        {
          id: 't2',
          title: 'Terminal 2 · 客人 A & B 实测',
          status: { label: 'ZERO BLOCKING ✅', tone: 'green' },
          localFrame,
          lines: [
            { text: '客人 A: (保持发呆不发包)', tone: 'warn', appearAtFrame: 20 },
            { text: '客人 B > msg from B', tone: 'cmd', appearAtFrame: 55 },
            { text: `客人 B 收到: ${snapshot.clientBReplyWhileAIdle}`, tone: 'success', appearAtFrame: 75 },
            { text: `客人 A 收到: ${snapshot.clientAReply}`, tone: 'success', appearAtFrame: 110 },
          ],
        },
      ];
    }

    if (visual === 'cpu-disaster') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · Server 警报日志',
          status: { label: 'CPU 100% 🔥', tone: 'red' },
          command: 'PORT=19002 php server.php',
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 10 },
            { text: snapshot.serverOutput[1], tone: 'error', appearAtFrame: 35 },
            { text: snapshot.serverOutput[2], tone: 'normal', appearAtFrame: 75 },
            { text: snapshot.serverOutput[3], tone: 'normal', appearAtFrame: 95 },
            { text: snapshot.serverOutput[4], tone: 'error', appearAtFrame: 120 },
          ],
        },
      ];
    }

    if (visual === 'usleep-trap') {
      return [
        {
          id: 't1',
          title: '推演对比 · usleep() 两难困局',
          status: { label: 'DILEMMA ⚠️', tone: 'amber' },
          localFrame,
          lines: [
            { text: '方案 A: usleep(10_000) 睡 10ms → CPU降了，但延迟+10ms / 单轮卡顿', tone: 'warn', appearAtFrame: 15 },
            { text: '方案 B: usleep(1)      睡 1us  → 延迟低了，但 CPU 照样飙到 95%+', tone: 'error', appearAtFrame: 65 },
            { text: '理想方案: 没数据时 0% CPU 休眠，有数据包瞬间 0.001ms 唤醒！', tone: 'success', appearAtFrame: 120 },
          ],
        },
      ];
    }

    return [
      {
        id: 't1',
        title: 'Terminal 1 · Server',
        status: { label: 'EP002 -> EP003', tone: 'blue' },
        command: 'PORT=19002 php server.php',
        localFrame,
        lines: [
          { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 10 },
          { text: snapshot.serverOutput[1], tone: 'error', appearAtFrame: 45 },
          { text: '下集 EP003【铺垫】：先用一个 20 行本地实验避开 stream_select 大坑！', tone: 'success', appearAtFrame: 90 },
        ],
      },
    ];
  };

  const renderXRay = () => {
    if (visual === 'cpu-disaster') {
      return (
        <XRayInspector title="🔬 内核 X-Ray · EAGAIN 空转现场" badge="73,293 次 / 0.5s" badgeTone="red">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, padding: '10px 14px', borderRadius: 12, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: THEME.red }}>PHP while(true)</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>狂问: accept()? fread()?</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, color: THEME.amber }}>
              <div>往返 14万次/秒 ⇄</div>
              <div style={{ fontSize: 13, color: THEME.red }}>返回 false (EAGAIN)</div>
            </div>
            <div style={{ flex: 1, padding: '10px 14px', borderRadius: 12, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Linux 内核</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>不让进程睡，立刻甩回</div>
            </div>
          </div>
        </XRayInspector>
      );
    }

    return (
      <XRayInspector title="🔬 内核 X-Ray · 阻塞 vs 非阻塞本质" badge="EP002 核心对比" badgeTone="blue">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: THEME.red }}>默认阻塞模式</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>没数据就睡死在 fgets()，别人全堵死</div>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: THEME.amber }}>非阻塞轮询模式</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>不堵人了，但没内核看门导致 CPU 冒烟</div>
          </div>
        </div>
      </XRayInspector>
    );
  };

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP002 · 非阻塞与 CPU 空转"
      fileName="ep02/server.php"
      lines={LINES_FULL}
      startLineNumber={11}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={24}
      terminals={getTerminals()}
      xray={renderXRay()}
    />
  );
};
