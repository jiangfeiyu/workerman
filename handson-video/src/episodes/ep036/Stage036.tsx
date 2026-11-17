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
  { text: 'interface ProtocolInterface', diff: 'added' },
  { text: '{' },
  { text: '    /**' },
  { text: '     * 检查缓冲区是否包含完整的一包数据：' },
  { text: '     * - 返回 0：半包，数据还不够，继续等待接收' },
  { text: '     * - 返回 > 0：完整一包的总字节长度' },
  { text: '     */' },
  { text: '    public static function input(string $buffer): int;', diff: 'added' },
  { text: '' },
  { text: '    /** 把完整包解码成业务数据 */' },
  { text: '    public static function decode(string $package): mixed;', diff: 'added' },
  { text: '' },
  { text: '    /** 把业务数据编码成网络发送字节流 */' },
  { text: '    public static function encode(mixed $data): string;', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'active' as const },
  { label: '3.2 HTTP/1.1', state: 'todo' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage036: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (接口契约校验)',
      status: { label: 'PLUGGABLE SLOT 🔌', tone: 'blue' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('success' as const) : ('info' as const),
        appearAtFrame: 20 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 插槽 X-Ray · 三个静态方法各司其职" badge="可插拔协议" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          input($buf) → 测长度 (0 / N)
        </div>
        <span>→</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          decode($pkg) → 拆包进业务
        </div>
        <span>/</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          encode($data) → 封包发送
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP036 · ProtocolInterface 三大契约"
      fileName="ProtocolInterface.php"
      lines={LINES}
      focusLines={visual === 'three-methods' ? [4, 11, 14, 17] : [8, 9, 11]}
      callout={
        visual === 'input-contract'
          ? { line: 11, text: '0 = 半包继续等，>0 = 整包长度', tone: 'amber' }
          : { line: 4, text: 'Text / Frame / HTTP / WS 全靠它解耦', tone: 'blue' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
