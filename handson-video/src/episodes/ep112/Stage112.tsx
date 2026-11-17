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
  { text: '// 🏆 《手把手从 0 到 1 写一个 Workerman (ModernWorker)》112 集全剧终！' },
  { text: '$benchSummary = [' },
  { text: "    'SelectLoop(4W)'     => '12,400 QPS | P99=18.4ms | 上限 1024 FD',", diff: 'removed' },
  { text: "    'ModernWorker-Epoll' => '98,600 QPS | P99=1.1ms  | 支持 100,000+ FD',", diff: 'added' },
  { text: "    'Gateway+Worker集群' => '跨机水平扩容 + 热更新 0 断线!',", diff: 'added' },
  { text: '];' },
  { text: '' },
  { text: '// 7 大篇章阶梯进化全景：' },
  { text: '//  1~2 篇: Socket/SelectLoop/Timer + 全双工 TcpConnection' },
  { text: '//  3~4 篇: 4大工业协议(Text/Frame/HTTP/WS) + Master/Daemon/Epoll' },
  { text: '//  5~7 篇: Fiber协程/连接池/TLS + ModernGateway集群 + 弹幕压测收官!' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'done' as const },
  { label: '7.2 压测总收官', state: 'done' as const },
];

export const Stage112: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 112 集终极检阅：全栈实测通关输出',
      status: { label: '112/112 GRADUATED 🎓', tone: 'green' },
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
    <XRayInspector title="🎓 恭喜毕业！112 集从 0 造出的高性能网络全家桶" badge="112 / 112 COMPLETE 🏆" badgeTone="green">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 13, fontWeight: 700 }}>
        {['Epoll O(1) 引擎', '4大协议插槽', 'Master 0断线重载', 'Fiber + 连接池 + TLS', 'ModernGateway 集群'].map((k) => (
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

  const focus =
    visual === 'final-bench'
      ? [3, 4, 5]
      : visual === 'seven-parts'
      ? [9, 10, 11]
      : [1, 4, 5, 11];

  const callout =
    visual === 'final-bench'
      ? { line: 6, text: '12.4K → 98.6K QPS，P99 压进 1.1ms!', tone: 'green' as const }
      : visual === 'seven-parts'
      ? { line: 8, text: '从 10 行阻塞 Socket 一步步搭出的现代框架', tone: 'blue' as const }
      : { line: 7, text: '🎉 感谢一路写代码至此，112 集圆满收官！', tone: 'amber' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP112 · 终极横评与 112 集毕业"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={14}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
