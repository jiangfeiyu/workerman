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
  { text: "// ❌ 灾难错误：在 Master fork 之前就把业务类加载进了全局类表!" },
  { text: "require_once __DIR__ . '/BizHandler.php'; // v1.0 焊死在 Master 内存", diff: 'removed' },
  { text: '' },
  { text: '// ... 运维修改磁盘 BizHandler.php 为 v2.0 后发送 reload ...' },
  { text: '$pid = pcntl_fork();' },
  { text: 'if ($pid === 0) {' },
  { text: "    // 子进程 COW 继承了 v1.0 类定义，强行 require 当场 Fatal Error!", diff: 'removed' },
  { text: '    echo BizHandler::$ver; // 永远停在 v1.0!', diff: 'removed' },
  { text: '}' },
  { text: '' },
  { text: '// ✅ 黄金铁律：Master 保持白纸，在 fork 后 onWorkerStart 里再加载!' },
  { text: '$worker->onWorkerStart = function (): void {', diff: 'added' },
  { text: "    require_once __DIR__ . '/BizHandler.php'; // 每次 reload 必读最新 v2.0!", diff: 'added' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'active' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage068: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Master 提前 require 导致 reload 失效实测',
      status: { label: 'CLASS TABLE TRAP 💥', tone: 'red' },
      command: 'php demo.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'error', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'warn', appearAtFrame: 34 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 PHP 类表不可卸载原则：为什么必须放进 onWorkerStart？" badge="热更新黄金铁律" badgeTone="red">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          fork 前加载: Master 污染全局类表 → reload 永远锁死 v1.0 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          onWorkerStart 加载: 新子进程白纸起跑 → 秒吃 v2.0 ✅
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'master-require'
      ? [2, 4]
      : visual === 'why-stuck'
      ? [7, 8]
      : [12, 13, 14];

  const callout =
    visual === 'master-require'
      ? { line: 3, text: '在顶层写 require 等于把 v1.0 焊进母体', tone: 'red' as const }
      : visual === 'why-stuck'
      ? { line: 9, text: 'PHP 运行期同进程不能卸载/重定义类', tone: 'amber' as const }
      : { line: 11, text: '只有框架核心进 Master，业务全放 onWorkerStart', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP068 · 踩坑：Master 提前加载类"
      fileName="demo.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
