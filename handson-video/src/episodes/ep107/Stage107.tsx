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
  { text: '// 前排 Gateway 挂上第 3 篇 WebsocketProtocol + 第 5 篇 TLS(WSS)：' },
  { text: '$gateway = new Gateway("websocket://0.0.0.0:443", $sslContext);' },
  { text: '' },
  { text: '// 后排 BusinessWorker 业务入口：不到 30 行实现弹幕路由！' },
  { text: 'Events::$onMessage = function (string $cid, string $rawJson): void {', diff: 'added' },
  { text: '    $pkt = json_decode($rawJson, true);' },
  { text: "    match ($pkt['type'] ?? '') {", diff: 'added' },
  { text: "        'join'    => Gateway::joinGroup($cid, \$pkt['room'])," },
  { text: "        'danmaku' => broadcastDanmaku(\$pkt['room'], \$pkt['text']),", diff: 'added' },
  { text: "        'ping'    => Gateway::sendToClient(\$cid, '{\"type\":\"pong\"}')," },
  { text: '    };' },
  { text: '};' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'active' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage107: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 实时弹幕系统核心骨架验证',
      status: { label: 'WSS DANMAKU ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'info' : 'success',
        appearAtFrame: 14 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 全栈拼装：用前 6 篇手写轮子秒出弹幕骨架" badge="30行核心业务" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          第3/5篇: WebSocket + WSS 接入
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          第4/6篇: Epoll + Gateway 集群
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          第7篇: join / danmaku / ping 分发
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP107 · 实时弹幕系统骨架"
      fileName="DanmakuEvents.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'danmaku-arch' ? [1, 2] : [7, 8, 9, 10]}
      callout={
        visual === 'danmaku-arch'
          ? { line: 3, text: '前排直接复用之前手写的 WSS 与协议层', tone: 'blue' }
          : { line: 6, text: '底层高并发集群全托底，业务写起来极简无比', tone: 'green' }
      }
      fontSize={14}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
