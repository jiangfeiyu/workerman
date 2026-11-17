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
  { text: '$chunks = [' },
  { text: '    \'{"id":1,"msg":"hi"}\\n{"id":2,"m\', // 1条完整 + 第2条半截！' },
  { text: '    \'sg":"ok"}\\n{"id":3,"msg":"yo"}\\n\', // 补齐第2条 + 第3条！' },
  { text: '];' },
  { text: '' },
  { text: '$recvBuffer = ""; // 应用层蓄水池', diff: 'added' },
  { text: 'foreach ($chunks as $round => $chunk) {' },
  { text: '    $recvBuffer .= $chunk; // 1. 新水流先倒进蓄水池', diff: 'added' },
  { text: '    echo "[第" . ($round + 1) . "次收到 chunk] 池长=" . strlen($recvBuffer) . "\\n";' },
  { text: '' },
  { text: '    // 2. 必须用 while 循环切包（绝不能用 if！）', diff: 'added' },
  { text: '    while (($pos = strpos($recvBuffer, "\\n")) !== false) {', diff: 'added' },
  { text: '        $onePacket = substr($recvBuffer, 0, $pos);', diff: 'added' },
  { text: '        $recvBuffer = substr($recvBuffer, $pos + 1); // 消费切掉', diff: 'added' },
  { text: '        echo "  -> [切出完整包] {$onePacket}\\n";' },
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

export const Stage035: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (蓄水池切包实测)',
      status: { label: 'CLEAN SLICED ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: line.includes('[切出完整包]') ? ('success' as const) : ('info' as const),
        appearAtFrame: 15 + i * 20,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 蓄水池 X-Ray · $recvBuffer 暂存与切分" badge="半包不丢，粘包拆开" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          第1轮: 吐出 id=1，留 10B 半截
        </div>
        <span>+ 第2波水 →</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          while 连续切出 id=2 &amp; id=3 (余 0B)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP035【铺垫】· $recvBuffer 蓄水池"
      fileName="ep35/demo.php"
      lines={LINES}
      startLineNumber={5}
      focusLines={visual === 'pool-idea' ? [6, 7, 10] : [12, 16, 17, 18]}
      typeRange={
        visual === 'while-slice'
          ? { fromLine: 15, toLine: 20, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'while-slice'
          ? { line: 16, text: '必须用 while！一次可能粘 N 条包', tone: 'amber' }
          : { line: 18, text: '下集：抽成 ProtocolInterface 插槽', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
