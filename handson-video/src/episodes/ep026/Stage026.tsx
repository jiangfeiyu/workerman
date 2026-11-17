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
  { text: '$payload = str_repeat("W", 10 * 1024 * 1024); // 10 MB' },
  { text: '$pending = $payload; // 应用层蓄水池', diff: 'added' },
  { text: '$receivedTotal = 0; $writeRounds = 0;' },
  { text: '$loop = new SelectLoopWithRepeat();' },
  { text: '' },
  { text: '$loop->onReadable($client, function ($c) use ($loop, &$receivedTotal, $payload): void {' },
  { text: '    while (true) {' },
  { text: '        $chunk = @fread($c, 65536);' },
  { text: '        if ($chunk === "" || $chunk === false) break;' },
  { text: '        $receivedTotal += strlen($chunk);' },
  { text: '    }' },
  { text: '    if ($receivedTotal >= strlen($payload)) { $loop->offReadable($c); $loop->stop(); }' },
  { text: '});' },
  { text: '' },
  { text: '// 发送端分批续传：写不完的用 substr($pending, $written) 留待下次', diff: 'added' },
  { text: '$loop->onWritable($conn, function ($s) use ($loop, &$pending, &$writeRounds): void {', diff: 'added' },
  { text: '    $writeRounds++;' },
  { text: '    $written = (int)@fwrite($s, $pending);', diff: 'added' },
  { text: '    if ($written > 0) {' },
  { text: '        $pending = substr($pending, $written); // 切掉已送出头部', diff: 'added' },
  { text: '    }' },
  { text: '    if ($pending === "") {' },
  { text: '        $loop->offWritable($s); // 排空立即卸载！', diff: 'added' },
  { text: '    }' },
  { text: '});' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage026: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (6 轮续传实测)',
      status: { label: '0 BYTES LOST ✅', tone: 'green' },
      command: 'php demo.php',
      localFrame,
      lines: snapshot.output.map((line) => ({
        text: line,
        tone: 'success' as const,
        appearAtFrame: 25,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 缓冲 X-Ray · 6 轮接力切片排空过程" badge="10,485,760 B 完整" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          $pending 蓄水池 (10MB)
        </div>
        <span>──每轮 fwrite + substr──▶</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          6 轮内核接力
        </div>
        <span>──排空──▶</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          offWritable() 结束
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP026【过渡】· 全局 $pending 续传"
      fileName="ep26/demo.php"
      lines={LINES}
      startLineNumber={14}
      focusLines={visual === 'pending-idea' ? [15, 29] : [31, 33, 36]}
      typeRange={
        visual === 'substr-drain'
          ? { fromLine: 29, toLine: 38, localFrame, startFrame: 6, framesPerLine: 15 }
          : undefined
      }
      callout={
        visual === 'substr-drain'
          ? { line: 34, text: '发走多少，就从头部切掉多少！', tone: 'green' }
          : { line: 36, text: '下集踩坑：敢删掉这行 offWritable 吗？', tone: 'amber' }
      }
      fontSize={15}
      lineHeight={22}
      terminals={terminals}
      xray={xray}
    />
  );
};
