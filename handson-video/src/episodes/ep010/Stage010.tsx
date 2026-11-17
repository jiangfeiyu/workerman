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

const LOOP_WRITE_LINES: IDECodeLine[] = [
  { text: 'private array $writeFds = [];', diff: 'added' },
  { text: 'private array $writeCallbacks = [];', diff: 'added' },
  { text: '' },
  { text: 'public function onWritable($stream, callable $callback): void', diff: 'added' },
  { text: '{' },
  { text: '    $id = (int)$stream;' },
  { text: '    $this->writeFds[$id] = $stream;' },
  { text: '    $this->writeCallbacks[$id] = $callback;' },
  { text: '}' },
  { text: 'public function offWritable($stream): void', diff: 'added' },
  { text: '{' },
  { text: '    unset($this->writeFds[(int)$stream], $this->writeCallbacks[(int)$stream]);' },
  { text: '}' },
  { text: 'public function run(): void {' },
  { text: '    while ($this->readFds !== [] || $this->writeFds !== []) {' },
  { text: '        $read = $this->readFds; $write = $this->writeFds; $except = null;', diff: 'modified' },
  { text: '        if (@stream_select($read, $write, $except, null) <= 0) continue;' },
  { text: '        foreach ($read as $fd) { ... }' },
  { text: '        foreach ($write as $fd) {', diff: 'added' },
  { text: '            $cb = $this->writeCallbacks[(int)$fd] ?? null;' },
  { text: '            if ($cb) $cb($fd);' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const DEMO_LINES: IDECodeLine[] = [
  { text: '$loop->onWritable($w, function ($pipe) use ($loop, &$ticks): void {' },
  { text: '    $ticks++;' },
  { text: '    if ($ticks === 1) {' },
  { text: '        fwrite($pipe, "async-write-chunk\\n");' },
  { text: '        echo "[第1次 onWritable] 写入完毕 (暂不卸载)\\n";', diff: 'modified' },
  { text: '        return;' },
  { text: '    }' },
  { text: '    echo "[第2次 onWritable] 警告！没数据也要响！赶紧 offWritable\\n";', diff: 'removed' },
  { text: '    $loop->offWritable($pipe);', diff: 'added' },
  { text: '});' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'done' as const },
  { label: '1.2 SelectLoop', state: 'active' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage010: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showDemo = visual === 'demo-trap' || visual === 'rule-next';

  const getIde = () => {
    if (visual === 'add-write') {
      return {
        fileName: 'SelectLoop.php',
        lines: LOOP_WRITE_LINES,
        startLineNumber: 11,
        focusLines: [11, 14, 26, 29],
        typeRange: { fromLine: 11, toLine: 34, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 26, text: '把 $write 也交给 stream_select 等发件柜空位', tone: 'green' as const },
      };
    }
    if (visual === 'pitfall-intro') {
      return {
        fileName: 'SelectLoop.php',
        lines: LOOP_WRITE_LINES,
        startLineNumber: 11,
        focusLines: [29, 30, 31],
        callout: { line: 29, text: '⚠️ 发件柜只要没满，下轮必再触发！', tone: 'red' as const },
      };
    }
    return {
      fileName: 'demo_write.php',
      lines: DEMO_LINES,
      startLineNumber: 12,
      focusLines: visual === 'demo-trap' ? [16, 19, 20] : [20],
      callout: {
        line: 20,
        text: visual === 'demo-trap' ? '🚨 没数据可写照样炸响！' : '✅ 铁律：写完立刻 offWritable()',
        tone: visual === 'demo-trap' ? ('red' as const) : ('green' as const),
      },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo_write.php',
      status: {
        label: visual === 'demo-trap' ? 'BUSY WRITE TRAP 🚨' : 'OFF WRITABLE ✅',
        tone: visual === 'demo-trap' ? 'red' : 'green',
      },
      command: 'php demo_write.php',
      localFrame,
      lines: showDemo
        ? [
            { text: snapshot.output[0], tone: 'warn', appearAtFrame: 15 },
            { text: snapshot.output[1], tone: 'info', appearAtFrame: 45 },
            { text: snapshot.output[2], tone: 'error', appearAtFrame: 85 },
          ]
        : [
            { text: '# 承接 EP009B：发件柜有空位时如果不卸载 onWritable 会怎样？', tone: 'info', appearAtFrame: 20 },
          ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内核 X-Ray · 收件箱(读) vs 发件柜(写)" badge="经典必考坑" badgeTone="red">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: THEME.blue }}>收件箱 · 可读 (常驻)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>平时空箱 [0/8192B] → 安静睡；收到包才响</div>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: THEME.red }}>发件柜 · 可写 (用完即卸)</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>只要有空位 [&lt;8192B] 就永远响 → 必须 offWritable</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP010 · onWritable 写事件死循环陷阱"
      fileName={ide.fileName}
      tabs={['SelectLoop.php', 'demo_write.php']}
      lines={ide.lines}
      startLineNumber={ide.startLineNumber}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
