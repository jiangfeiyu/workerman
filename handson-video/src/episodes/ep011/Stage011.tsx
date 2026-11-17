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
  { text: '    private bool $running = false;', diff: 'added' },
  { text: '' },
  { text: '    public function stop(): void', diff: 'added' },
  { text: '    {' },
  { text: '        $this->running = false;', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public function run(): void' },
  { text: '    {' },
  { text: '        $this->running = true;', diff: 'added' },
  { text: '        while ($this->running) {', diff: 'modified' },
  { text: '            if ($this->readFds === [] && $this->writeFds === []) break;' },
  { text: '            $read = $this->readFds; $write = $this->writeFds; $except = null;' },
  { text: '            $count = @stream_select($read, $write, $except, null);' },
  { text: '            if ($count === false || $count === 0) continue;' },
  { text: '            foreach ($read as $fd) {' },
  { text: '                ($this->readCallbacks[(int)$fd] ?? static fn () => null)($fd);' },
  { text: '            }' },
  { text: '            foreach ($write as $fd) {' },
  { text: '                ($this->writeCallbacks[(int)$fd] ?? static fn () => null)($fd);' },
  { text: '            }' },
  { text: '        }' },
  { text: '    }' },
];

export const Stage011: React.FC<StageProps> = ({ visual, localFrame }) => {
  const legoNodes = [
    { label: '1.1 Socket破冰', state: 'done' as const },
    { label: '1.2 SelectLoop', state: visual === 'lego-done' ? ('done' as const) : ('active' as const) },
    { label: '1.3 Timer', state: visual === 'lego-done' ? ('active' as const) : ('todo' as const) },
    { label: '1.4 Worker v0.1', state: 'todo' as const },
    { label: '2.x TcpConnection', state: 'todo' as const },
    { label: '3.x HTTP/WS', state: 'todo' as const },
    { label: '4~7 ModernWorker', state: 'todo' as const },
  ];

  const getIde = () => {
    if (visual === 'stop-flag') {
      return {
        focusLines: [40, 42, 44, 49, 50],
        typeRange: { fromLine: 40, toLine: 52, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 44, text: '熄火按钮：$this->running = false', tone: 'green' as const },
      };
    }
    return {
      focusLines: [50, 51],
      callout: {
        line: 50,
        text: visual === 'lego-done' ? '🎉 模块 1.2 毕业！下篇装定时器' : '本轮回调跑完自动跳出循环',
        tone: 'blue' as const,
      },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · SelectLoop 合拢全流程实测',
      status: { label: 'STOPPED GRACEFULLY ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('success' as const) : ('info' as const),
        appearAtFrame: 18 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector
      title="🔬 架构 X-Ray · SelectLoop 完整生命周期"
      badge={visual === 'lego-done' ? '模块 1.2 毕业 🎉' : '优雅退出'}
      badgeTone="green"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          onReadable / onWritable
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          run() 事件泵
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          stop() 安全熄火
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={legoNodes}
      subLabel="EP011【合拢】· SelectLoop::stop()"
      fileName="ep11/SelectLoop.php"
      lines={LINES}
      startLineNumber={40}
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
