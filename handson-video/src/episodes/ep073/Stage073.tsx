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
  { text: '// Linux Epoll / macOS Kqueue 核动力底层两大核心数据结构：' },
  { text: '// 1. 红黑树 (RB-Tree): 只在建连/断连调 epoll_ctl() 时增删 1 次！', diff: 'added' },
  { text: '$epfd = epoll_create();' },
  { text: 'epoll_ctl($epfd, EPOLL_CTL_ADD, $clientFd, EPOLLIN); // 挂树常驻!', diff: 'added' },
  { text: '' },
  { text: '// 2. 双向就绪链表 (rdlist): 网卡中断时驱动自动把活跃 FD 推进链表!' },
  { text: 'while (true) {' },
  { text: '    // epoll_wait() 绝不扫描睡着的 10000 连接，直接端走就绪链表!', diff: 'added' },
  { text: '    $readyEvents = epoll_wait($epfd, $maxEvents, $timeoutMs);', diff: 'added' },
  { text: '    foreach ($readyEvents as $ev) { ($ev->cb)($ev->fd); }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'done' as const },
  { label: '4.3 热更新看板', state: 'done' as const },
  { label: '4.4 Epoll核动力', state: 'active' as const },
];

export const Stage073: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (O(1) 就绪链表实测)',
      status: { label: 'O(1) READY LIST ✅', tone: 'green' },
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
    <XRayInspector title="🔬 红黑树常驻 + 中断挂载就绪链表 = 真 O(1)" badge="万级连接零衰减" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          红黑树: 托管 100,000 FD (0 重复拷贝)
        </div>
        <span>── 网卡中断 ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          rdlist 就绪链表: epoll_wait 只取活跃的 3 条!
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'rbtree'
      ? [2, 3, 4]
      : visual === 'rdlist'
      ? [6, 8]
      : [8, 9, 10];

  const callout =
    visual === 'rbtree'
      ? { line: 5, text: '一次 epoll_ctl 注册，生命周期内不用重复传内核', tone: 'blue' as const }
      : visual === 'rdlist'
      ? { line: 7, text: '网卡收到数据自动把活跃句柄挂入就绪队列', tone: 'amber' as const }
      : { line: 11, text: '复杂度只跟活跃人数有关，与总在线人数 N 无关！', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP073 · 红黑树与就绪链表 O(1)"
      fileName="epoll_kernel_model.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
