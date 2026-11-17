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
  { text: 'public static function input(string $buffer): int' },
  { text: '{' },
  { text: '    $recvLen = strlen($buffer);' },
  { text: '    if ($recvLen < 2) return 0; // 半包：连2字节头都不够', diff: 'added' },
  { text: '    $second  = ord($buffer[1]);' },
  { text: '    $masked  = ($second >> 7) & 1;' },
  { text: '    $dataLen = $second & 0x7f;  // 先看低7位长度码', diff: 'added' },
  { text: '    $headLen = 2 + ($masked ? 4 : 0);' },
  { text: '    if ($dataLen === 126) {' },
  { text: '        if ($recvLen < $headLen + 2) return 0;', diff: 'added' },
  { text: "        $dataLen = unpack('n', substr($buffer, 2, 2))[1];" },
  { text: '        $headLen += 2;' },
  { text: '    } elseif ($dataLen === 127) {' },
  { text: '        if ($recvLen < $headLen + 8) return 0;', diff: 'added' },
  { text: "        $dataLen = unpack('J', substr($buffer, 2, 8))[1];" },
  { text: '        $headLen += 8;' },
  { text: '    }' },
  { text: '    $total = $headLen + $dataLen;' },
  { text: '    return $recvLen < $total ? 0 : $total;', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage051: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (三级阶梯长度实测)',
      status: { label: '0..64KB..8GB ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 1 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 14 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 WebSocket 阶梯长度三档规则" badge="省流量又传大包" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          0..125: 直接装进低 7 bit
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          126: 后跟 2B (unpack &apos;n&apos;)
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          127: 后跟 8B (unpack &apos;J&apos;)
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'tiered-intro'
      ? [26, 27, 28, 29]
      : visual === 'three-tiers'
      ? [30, 32, 34, 36]
      : [25, 31, 35, 40];

  const callout =
    visual === 'tiered-intro'
      ? { line: 28, text: 'MASK + 7位长度码挤在同1字节', tone: 'blue' as const }
      : visual === 'three-tiers'
      ? { line: 34, text: '126 读2字节，127 读8字节无符号数', tone: 'amber' as const }
      : { line: 38, text: '每扩1段头部都要防半包提前 return 0', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP051 · 阶梯长度 7bit / 126 / 127"
      fileName="WebsocketProtocol.php"
      lines={LINES}
      startLineNumber={22}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={21}
      terminals={terminals}
      xray={xray}
    />
  );
};
