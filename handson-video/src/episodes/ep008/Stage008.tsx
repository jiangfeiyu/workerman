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
  { text: '/**' },
  { text: ' * 统一事件发动机接口：' },
  { text: ' * 今天用 SelectLoop 实现它，第 4 篇无缝切换 EpollLoop' },
  { text: ' */' },
  { text: 'interface EventLoopInterface', diff: 'added' },
  { text: '{' },
  { text: '    /** @param resource $stream */' },
  { text: '    public function onReadable($stream, callable $callback): void;', diff: 'added' },
  { text: '' },
  { text: '    /** @param resource $stream */' },
  { text: '    public function offReadable($stream): void;', diff: 'added' },
  { text: '' },
  { text: '    /** @param resource $stream */' },
  { text: '    public function onWritable($stream, callable $callback): void;', diff: 'added' },
  { text: '' },
  { text: '    /** @param resource $stream */' },
  { text: '    public function offWritable($stream): void;', diff: 'added' },
  { text: '' },
  { text: '    public function run(): void;', diff: 'added' },
  { text: '' },
  { text: '    public function stop(): void;', diff: 'added' },
  { text: '}' },
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

export const Stage008: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'why-interface') {
      return {
        focusLines: [8],
        callout: { line: 8, text: '先定发动机标准插槽！', tone: 'blue' as const },
      };
    }
    if (visual === 'methods') {
      return {
        focusLines: [11, 14, 17, 20, 22, 24],
        typeRange: { fromLine: 11, toLine: 25, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 22, text: '读/写/启/停 6 个干净按钮', tone: 'green' as const },
      };
    }
    return {
      focusLines: [8, 22],
      callout: { line: 8, text: '下集：写出 SelectLoop 实现类', tone: 'amber' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 接口方法校验 (Reflection)',
      status: { label: '6 METHODS ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.methods.map((m, idx) => ({
        text: `  - ${m}`,
        tone: 'success' as const,
        appearAtFrame: 15 + idx * 14,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 架构 X-Ray · 面向接口可插拔设计" badge="零耦合" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 15, fontWeight: 800 }}>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          Worker 上层
        </div>
        <span>──依赖──▶</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, color: THEME.blue }}>
          EventLoopInterface
        </div>
        <span>◀──实现──</span>
        <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          Select / Epoll
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP008 · EventLoopInterface 契约"
      fileName="ep08/EventLoopInterface.php"
      lines={LINES}
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
