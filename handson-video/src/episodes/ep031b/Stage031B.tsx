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
  { text: '// 客户端发了 200KB，但故意不 fclose()，连接还活着！' },
  { text: 'fwrite($client, str_repeat("D", 200 * 1024));' },
  { text: 'usleep(50_000);' },
  { text: '' },
  { text: '$round = 0; $total = 0;' },
  { text: 'while (true) {', diff: 'added' },
  { text: '    $round++;' },
  { text: '    $chunk = @fread($conn, 65535);' },
  { text: '    // 🚨 陷阱：把“读空缓冲区”当成“对方断开”，当场误杀！', diff: 'removed' },
  { text: '    if ($chunk === "" || $chunk === false) {', diff: 'removed' },
  { text: '        echo "[第{$round}轮] fread 返回空串！误判断开直接关闭！\\n";' },
  { text: '        break;' },
  { text: '    }' },
  { text: '    $total += strlen($chunk);' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'done' as const },
  { label: '2.3 优雅断连', state: 'active' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage031B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (200KB 误杀现场)',
      status: { label: visual === 'why-while-read' ? 'WHY WHILE?' : 'FALSE KILL 🚨', tone: visual === 'why-while-read' ? 'amber' : 'red' },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'why-while-read'
          ? [{ text: '# 客户端一次性发来 200KB 且不断开连接，想用 while 一口气读空...', tone: 'info', appearAtFrame: 15 }]
          : snapshot.output.map((line, i) => ({
              text: line,
              tone: i === 2 ? ('error' as const) : ('info' as const),
              appearAtFrame: 15 + i * 26,
            })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 读端 X-Ray · 空字符串 '' 的两副面孔" badge="误杀根因" badgeTone="red">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.amber }}>前 25 轮：每次 8KB</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>204,800 B 已经全部读完到 PHP</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>第 26 轮：缓冲区空了返回 ''</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>没查 feof() 直接 break → 活人被误杀！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP031B【加餐过渡】· while 循环读误杀活着客户端"
      fileName="ep31b/demo.php"
      lines={LINES}
      startLineNumber={9}
      focusLines={visual === 'why-while-read' ? [14, 16] : [17, 18, 19]}
      callout={
        visual === 'need-feof'
          ? { line: 18, text: '下集 EP032：加 feof() 二次确认辨真伪！', tone: 'green' }
          : { line: 18, text: '第 26 轮读空返回 "" 却被当成断开！', tone: 'red' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
