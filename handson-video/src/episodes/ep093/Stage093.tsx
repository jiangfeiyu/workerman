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
  { text: '{' },
  { text: '    "name": "modern-worker/core",' },
  { text: '    "require": { "php": ">=8.2" },' },
  { text: '    "autoload": {', diff: 'added' },
  { text: '        "psr-4": { "ModernWorker\\\\": "src/" }', diff: 'added' },
  { text: '    }' },
  { text: '}' },
  { text: '' },
  { text: '// src/ModernWorker 标准化目录树:' },
  { text: '//  ├── Events/      (SelectLoop / EpollLoop)' },
  { text: '//  ├── Connection/  (TcpConnection / AsyncTcpClient)' },
  { text: '//  ├── Protocols/   (Text / Frame / Http / Websocket)' },
  { text: '//  ├── Coroutine/   (Fiber / RedisClient / ConnectionPool)' },
  { text: '//  └── Worker.php   (Master / Daemon / CLI / TLS)' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'done' as const },
  { label: '6~7 分布式实战', state: 'active' as const },
];

export const Stage093: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 5 篇总装：PSR-4 与单机内核验收',
      status: { label: 'PART 5 COMPLETE 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 34 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🏆 ModernWorker v1.0 单机核动力工业包总装完成！" badge="第 5 篇收官 🎉" badgeTone="green">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 700 }}>
        {['Epoll + 多进程', '4大协议插槽', 'Fiber 协程调度', '安全连接池', 'HTTPS/WSS TLS'].map((k) => (
          <div
            key={k}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 8,
              backgroundColor: THEME.greenBg,
              border: `2px solid ${THEME.green}`,
              textAlign: 'center',
            }}
          >
            {k}
          </div>
        ))}
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP093 · 第 5 篇总装：PSR-4"
      fileName="composer.json"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'psr4-tree' ? [4, 5, 10, 11, 12] : [5, 13, 14]}
      callout={
        visual === 'psr4-tree'
          ? { line: 8, text: '告别手工 require，按命名空间自动按需加载', tone: 'blue' }
          : { line: 7, text: '第 6 篇：破除单机极限 → ModernGateway 集群！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
