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
  { text: '$pending = str_repeat("A", 2 * 1024 * 1024); // 2 MB' },
  { text: '$spinCount = 0; $zeroWrites = 0;' },
  { text: '' },
  { text: '// ❌ 错法：企图用 while 循环在原地一次性硬塞完！', diff: 'removed' },
  { text: 'while ($pending !== "") {', diff: 'removed' },
  { text: '    $spinCount++;' },
  { text: '    $written = (int)@fwrite($conn, $pending);', diff: 'removed' },
  { text: '    if ($written > 0) {' },
  { text: '        $pending = substr($pending, $written);' },
  { text: '        echo "[第{$spinCount}轮] 塞进 {$written} 字节\\n";' },
  { text: '    } else {' },
  { text: '        $zeroWrites++;' },
  { text: '        if ($zeroWrites >= 10000) {' },
  { text: '            echo "[卡死警报] 内核已满！while 空转 10000 次全返回 0！\\n";', diff: 'removed' },
  { text: '            break;' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'done' as const },
  { label: '2.2 发送缓冲', state: 'active' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage025B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php (慢客户端下 while 死磕)',
      status: { label: visual === 'while-idea' ? 'WHY NOT WHILE?' : 'EVENTLOOP BLOCKED 🚨', tone: visual === 'while-idea' ? 'amber' : 'red' },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'while-idea'
          ? [{ text: '# 如果不用 onWritable，直接写个 while 把剩下 1.7MB 写完会怎样？', tone: 'info', appearAtFrame: 15 }]
          : snapshot.output.map((line, i) => ({
              text: line,
              tone: i === 3 ? ('error' as const) : ('info' as const),
              appearAtFrame: 12 + i * 24,
            })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 调度 X-Ray · 原地 while 死磕 vs 交回 onWritable" badge="单线程致命陷阱" badgeTone="red">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>❌ 原地 while ($pending)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>写满后狂返回 0，单进程彻底卡死，其他 10000 客全饿死！</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ 交回 EventLoop::onWritable</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>先服务别人，等内核通知“有空位了”再回来续传！</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP025B【加餐过渡】· 为什么不能 while 死磕 fwrite"
      fileName="ep25b/demo.php"
      lines={LINES}
      startLineNumber={10}
      focusLines={visual === 'while-idea' ? [13, 14] : visual === 'spin-freeze' ? [16, 21, 22, 23] : [14]}
      callout={
        visual === 'hand-to-loop'
          ? { line: 14, text: '下集 EP026：写不完就交回 SelectLoop::onWritable！', tone: 'green' }
          : { line: 23, text: '全返回 0 狂空转，单进程全员卡死！', tone: 'red' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
