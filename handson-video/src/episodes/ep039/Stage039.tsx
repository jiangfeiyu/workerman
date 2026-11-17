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
  { text: 'class FrameProtocol implements ProtocolInterface', diff: 'added' },
  { text: '{' },
  { text: '    public static function input(string $buffer): int', diff: 'added' },
  { text: '    {' },
  { text: '        if (strlen($buffer) < 4) {' },
  { text: '            return 0; // 连 4 字节包头都没收齐，继续等', diff: 'added' },
  { text: '        }' },
  { text: '        $meta = unpack("NtotalLen", $buffer);', diff: 'added' },
  { text: '        $totalLen = (int)$meta["totalLen"];' },
  { text: '        return strlen($buffer) < $totalLen ? 0 : $totalLen;', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public static function decode(string $package): string' },
  { text: '    {' },
  { text: '        return substr($package, 4); // 剥掉前 4B 包头', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public static function encode(mixed $data): string' },
  { text: '    {' },
  { text: '        $body = (string)$data;' },
  { text: '        return pack("N", 4 + strlen($body)) . $body;', diff: 'added' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage039: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (半包+带换行帧切分)',
      status: { label: 'BINARY SAFE ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('warn' as const) : ('success' as const),
        appearAtFrame: 18 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 封包 X-Ray · [4B 总长度头] + [任意二进制 Body]" badge="彻底不怕 \\n" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ padding: '10px 16px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2.5px solid ${THEME.amber}`, fontFamily: THEME.fontMono, fontWeight: 800 }}>
          4B 包头: pack(&apos;N&apos;, 4 + len)
        </div>
        <span style={{ fontWeight: 900 }}>+</span>
        <div style={{ flex: 1, padding: '10px 16px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2.5px solid ${THEME.green}`, fontFamily: THEME.fontMono, fontWeight: 700, textAlign: 'center' }}>
          Body 正文（图片 / JSON / 换行符任意传！）
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP039 · FrameProtocol 二进制封包"
      fileName="FrameProtocol.php"
      lines={LINES}
      startLineNumber={5}
      focusLines={visual === 'frame-code' ? [19, 25] : [9, 10, 12, 14]}
      callout={
        visual === 'frame-code'
          ? { line: 25, text: '4B 总长头 + 原样二进制 Body', tone: 'blue' }
          : { line: 14, text: 'unpack 读总长，够长才放行切包', tone: 'green' }
      }
      fontSize={16}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
