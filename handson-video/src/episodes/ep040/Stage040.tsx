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
  { text: '    public const int MAX_PACKAGE_SIZE = 10 * 1024 * 1024; // 10MB 熔断防线', diff: 'added' },
  { text: '' },
  { text: '    public static function input(string $buffer): int' },
  { text: '    {' },
  { text: '        if (strlen($buffer) < 4) return 0;' },
  { text: '        $meta = unpack("NtotalLen", $buffer);' },
  { text: '        $totalLen = (int)$meta["totalLen"];' },
  { text: '' },
  { text: '        // 黑客伪造 2GB 包头？立刻熔断抛异常让 TcpConnection 踢飞！', diff: 'removed' },
  { text: '        if ($totalLen < 4 || $totalLen > self::MAX_PACKAGE_SIZE) {', diff: 'added' },
  { text: '            throw new \\LengthException("非法超大包长度: {$totalLen}");', diff: 'added' },
  { text: '        }', diff: 'added' },
  { text: '        return strlen($buffer) < $totalLen ? 0 : $totalLen;' },
  { text: '    }' },
];

export const Stage040: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1~2 引擎+连接', state: 'done' as const },
    { label: '3.1 粘包与协议', state: visual === 'fuse-protect' ? ('done' as const) : ('active' as const) },
    { label: '3.2 HTTP/1.1', state: visual === 'fuse-protect' ? ('active' as const) : ('todo' as const) },
    { label: '3.3 WebSocket', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 恶意超大包熔断实测',
      status: { label: 'FUSE TRIPPED 🛡️', tone: 'red' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: '模拟黑客发送伪造 99MB 包头: pack("N", 99 * 1024 * 1024)', tone: 'warn', appearAtFrame: 18 },
        { text: snapshot.output[3], tone: 'error', appearAtFrame: 48 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 防护 X-Ray · 协议熔断防内存攻击" badge="模块 3.1 毕业 🎉" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>
          仅发 4B 谎称 2GB 包
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          input() 检出超限抛异常
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          当场 destroy() 踢飞
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP040【踩坑】· 超大包熔断防线"
      fileName="FrameProtocol.php"
      lines={LINES}
      startLineNumber={7}
      focusLines={visual === 'attack-risk' ? [13, 15] : [16, 17]}
      callout={
        visual === 'attack-risk'
          ? { line: 15, text: '不限制就会傻等 2GB 撑爆内存！', tone: 'red' }
          : { line: 17, text: '🎉 模块 3.1 毕业！下集写 HTTP', tone: 'green' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
