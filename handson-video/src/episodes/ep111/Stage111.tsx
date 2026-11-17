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
  { text: '// wrk 真实高并发压测核查清单（拒绝自我欺骗的假高并发!):' },
  { text: '$ ulimit -n 1048576   # 1. 先检查压测机与服务端 FD 上限!' },
  { text: '$ wrk -t8 -c10000 -d30s --latency http://127.0.0.1:8080/' },
  { text: '' },
  { text: '// 必须同时盯紧 4 个硬指标：' },
  { text: '//  ✅ Requests/sec  (QPS 吞吐)' },
  { text: '//  ✅ 99.0% Latency (P99 尾延迟! 别只看平均延迟被骗!)', diff: 'added' },
  { text: '//  ✅ Socket errors (connect/read/write/timeout 必须为 0!)', diff: 'removed' },
  { text: '//  ✅ Non-2xx resp  (满屏 404/500 跑出10万 QPS 全是假数!)', diff: 'removed' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'done' as const },
  { label: '7.2 压测总收官', state: 'active' as const },
];

export const Stage111: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · wrk --latency P99 尾延迟与错误率校验',
      status: { label: 'BENCH AUDIT ✅', tone: 'green' },
      command: 'wrk -t8 -c10000 -d30s --latency http://127.0.0.1:8080/',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'warn' : 'info',
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 一图识破【假高并发】三大障眼法" badge="压测试金石 P99" badgeTone="red">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          Non-2xx 满屏 500 报错 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          只报 Avg 不敢放 P99 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Errors=0 + P99&lt;2ms ✅
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP111 · 压测读数核心指南"
      fileName="wrk_audit.sh"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'p99-tail' ? [3, 6, 7] : [2, 8, 9]}
      callout={
        visual === 'p99-tail'
          ? { line: 5, text: '平均 1ms 但 P99 800ms 说明 1% 用户卡成幻灯片', tone: 'amber' }
          : { line: 4, text: '先确认 0 报错和 ulimit，再谈多核跑满 QPS！', tone: 'red' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
