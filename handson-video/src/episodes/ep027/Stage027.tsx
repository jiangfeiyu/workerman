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
  { text: '$loop->onWritable($w, function ($sock) use ($loop, &$pending, &$emptyTriggers): void {' },
  { text: '    if ($pending !== "") {' },
  { text: '        $n = (int)@fwrite($sock, $pending);' },
  { text: '        $pending = substr($pending, $n);' },
  { text: '        echo "[onWritable] 数据已写完，故意忘记调用 offWritable()...\\n";', diff: 'removed' },
  { text: '        return;' },
  { text: '    }' },
  { text: '' },
  { text: '    // 哪怕 $pending 已经是空的，只要不 offWritable，内核每微秒都在狂叫！', diff: 'removed' },
  { text: '    $emptyTriggers++;' },
  { text: '    if ($emptyTriggers >= 50_000) {' },
  { text: '        echo "[CPU 100% 死循环实测] onWritable 仍被狂刷 50,000 次！\\n";' },
  { text: '        $loop->offWritable($sock);', diff: 'added' },
  { text: '        $loop->stop();' },
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

export const Stage027: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: { label: '50,000x SPIN 🔥', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 18 },
        { text: snapshot.output[1], tone: 'error', appearAtFrame: 52 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 死循环 X-Ray · 水平触发(LT)的可写陷阱" badge="CPU 100% 根因" badgeTone="red">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          $pending 已空 (无数据要写)
        </div>
        <span>+ 忘卸 offWritable →</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>
          内核看缓冲有空位 → 狂刷 50,000 次！
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP027【踩坑】· 忘卸 offWritable 死循环"
      fileName="ep27/demo.php"
      lines={LINES}
      startLineNumber={13}
      focusLines={visual === 'forget-off' ? [17, 18] : visual === '50k-spin' ? [22, 23, 24] : [25]}
      callout={
        visual === 'golden-rule'
          ? { line: 25, text: '✅ 黄金铁律：排空必调 offWritable()', tone: 'green' }
          : { line: 18, text: '🚨 故意漏掉 offWritable 看看下场！', tone: 'red' }
      }
      fontSize={16}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
