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
  { text: '[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '' },
  { text: '// 发送端连续发 20 条短 JSON，每条末尾带 \\n', diff: 'added' },
  { text: 'for ($i = 1; $i <= 20; $i++) {' },
  { text: '    fwrite($w, json_encode(["id" => $i, "msg" => "hello"]) . "\\n");' },
  { text: '}' },
  { text: 'fclose($w);' },
  { text: '' },
  { text: '// 模拟接收端：内核每次不一定按消息边界吐出！', diff: 'removed' },
  { text: '$chunk1 = fread($r, 128);', diff: 'removed' },
  { text: '$chunk2 = fread($r, 128);', diff: 'removed' },
  { text: 'fclose($r);' },
  { text: '' },
  { text: 'echo "[第1次 fread(128)] 字节=" . strlen((string)$chunk1) . "\\n";' },
  { text: 'echo "[第2次 fread(128) 开头被腰斩残片]:\\n" . strtok((string)$chunk2, "\\n");' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage034: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (真实粘包+半包现场)',
      status: { label: 'STICKY + HALF 🚨', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'normal', appearAtFrame: 24 },
        { text: snapshot.output[5], tone: 'normal', appearAtFrame: 34 },
        { text: `${snapshot.output[6]}  <-- ❌ 第6条被一刀腰斩！`, tone: 'error', appearAtFrame: 48 },
        { text: snapshot.output[8], tone: 'warn', appearAtFrame: 72 },
        { text: `${snapshot.output[9]}  <-- ❌ 残片导致 json_decode 必崩！`, tone: 'error', appearAtFrame: 86 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 协议 X-Ray · TCP 无边界自来水管真相" badge="字节流无边界" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          发送: 包1 | 包2 | 包3 ...
        </div>
        <span>→ 汇入水管 →</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>
          接收 fread(128): 5包黏连 + 第6包半截！
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP034【踩坑】· TCP 粘包与半包"
      fileName="ep34/demo.php"
      lines={LINES}
      focusLines={visual === 'sticky-demo' ? [7, 8, 13, 14] : [13, 14]}
      callout={
        visual === 'disaster-log'
          ? { line: 13, text: '128 字节硬切直接腰斩 JSON！', tone: 'red' }
          : { line: 14, text: '下集：建 $recvBuffer 蓄水池切包', tone: 'amber' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
