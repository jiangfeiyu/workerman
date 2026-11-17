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
  { text: '// 1. pack / unpack 大端序格式字母速查：', diff: 'added' },
  { text: "//    'n' = 2 字节 (16位无符号, 最大 65535)" },
  { text: "//    'N' = 4 字节 (32位无符号, EP038 已学)" },
  { text: "//    'J' = 8 字节 (64位无符号, 超大包)" },
  { text: '$len2B = pack("n", 300);', diff: 'added' },
  { text: '$len8B = pack("J", 70000);', diff: 'added' },
  { text: '' },
  { text: '// 2. PHP 坑点：unpack 没起别名时，数组下标从 1 开始！', diff: 'modified' },
  { text: '$arr2 = unpack("n", $len2B); // [1 => 300]', diff: 'added' },
  { text: '$arr8 = unpack("J", $len8B); // [1 => 70000]', diff: 'added' },
  { text: 'echo "2B=" . $arr2[1] . ", 8B=" . $arr8[1] . "\\n";' },
  { text: '' },
  { text: '// 3. RFC 6455 帧字节顺序：' },
  { text: '// [B0: FIN+Opcode] [B1: MASK+LenCode] [ExtLen 0/2/8B] [MaskKey 0/4B] [Payload]' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'done' as const },
  { label: '3.3 WebSocket', state: 'active' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage050B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (n / J 与帧地图)',
      status: { label: 'FRAME MAP ✅', tone: 'blue' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 15 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 RFC 6455 字节地图 · 为什么 MaskKey 排在扩展长度后面？" badge="EP051/052 前置" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 800 }}>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>B0 (1B)</div>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>B1 (1B)</div>
        <span>→</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>ExtLen (0 / 2 / 8B)</div>
        <span>→</span>
        <div style={{ padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>MaskKey (0 / 4B)</div>
        <span>→</span>
        <div style={{ flex: 1, padding: '7px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>Payload</div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP050B【加餐过渡】· WS 二进制帧布局与 n/J 速通"
      fileName="ep50b/verify.php"
      lines={LINES}
      startLineNumber={3}
      focusLines={visual === 'pack-nj' ? [4, 5, 6, 7, 8] : visual === 'unpack-index' ? [10, 11, 12] : [16]}
      callout={
        visual === 'pack-nj'
          ? { line: 7, text: "'n'=2字节，'N'=4字节，'J'=8字节大端序", tone: 'blue' }
          : visual === 'unpack-index'
          ? { line: 11, text: 'unpack 不起别名时下标从 1 开始！', tone: 'amber' }
          : { line: 16, text: '看懂帧地图，下集 EP051/052 秒懂偏移！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
