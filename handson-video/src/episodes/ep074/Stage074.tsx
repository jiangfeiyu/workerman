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
  { text: 'class EpollLoop implements EventLoopInterface', diff: 'added' },
  { text: '{' },
  { text: '    public static function createBestLoop(): EventLoopInterface', diff: 'added' },
  { text: '    {' },
  { text: "        if (extension_loaded('event')) return new self();" },
  { text: '        return new SelectLoop(); // 开发机缺失扩展优雅降级!', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    // 严格实现第 1 篇 EventLoopInterface 六大契约方法，上层 0 改动！', diff: 'added' },
  { text: '    public function onReadable($stream, callable $cb): void { ... }' },
  { text: '    public function offReadable($stream): void { ... }' },
  { text: '    public function onWritable($stream, callable $cb): void { ... }' },
  { text: '    public function offWritable($stream): void { ... }' },
  { text: '    public function run(): void { $this->base->loop(); }' },
  { text: '    public function stop(): void { $this->base->exit(); }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'done' as const },
  { label: '4.4 Epoll核动力', state: 'active' as const },
];

export const Stage074: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (接口契约与自动引擎探测)',
      status: { label: 'ENGINE PLUGGED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 14 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 面向接口编程的核动力热替换" badge="上层 0 行代码改动" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          Worker + TcpConnection + HTTP + WS
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          EventLoopInterface (onReadable / offReadable / run / stop)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP074 · EpollLoop 实现抽象接口"
      fileName="EpollLoop.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'interface-swap' ? [1, 10, 11, 14, 15] : [3, 5, 6]}
      callout={
        visual === 'interface-swap'
          ? { line: 9, text: '实现同款 EventLoopInterface，上层代码纹丝不动', tone: 'blue' }
          : { line: 6, text: '有 ext-event 上核动力，没装自动回退 SelectLoop', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
