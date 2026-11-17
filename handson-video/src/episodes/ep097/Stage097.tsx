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
  { text: '// ❌ 单体架构：100,000 条客户 TCP + 业务 Controller 焊在同个 Worker 进程' },
  { text: '// 每天发布 3 次需求 -> reload 重启全部 Worker -> 10万长连接瞬间全断重连!', diff: 'removed' },
  { text: '' },
  { text: '// ✅ Gateway/Business 物理分离架构：' },
  { text: '$gateway->count        = 4;  // 前排接入层：只管收发包，半年不重启!', diff: 'added' },
  { text: '$businessWorker->count = 16; // 后排业务层：无状态逻辑，随时杀掉秒级 reload!', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage097: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 单层 reload 雪崩 vs 双层分离对比',
      status: { label: 'ARCHITECTURE LEAP ⚡', tone: 'amber' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'error' : 'success',
        appearAtFrame: 12 + i * 30,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么大厂一定要把【长连接层】与【业务逻辑层】拆开？" badge="彻底消灭重连雪崩" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          前排 Gateway: 只扛 Socket (半年零重启 🛡️)
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          后排 BusinessWorker: 无状态业务 (一天发版 10 次 ⚡)
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'monolith-pain'
      ? [1]
      : visual === 'reconnect-storm'
      ? [2]
      : [4, 5, 6];

  const callout =
    visual === 'monolith-pain'
      ? { line: 3, text: '稳定低频的 I/O 与高频变动的业务焊死最致命', tone: 'amber' as const }
      : visual === 'reconnect-storm'
      ? { line: 3, text: '10 万人同秒重连握手认证 = 自建 DDoS 攻击!', tone: 'red' as const }
      : { line: 4, text: '两层通过极轻内网 TCP 互通，互不影响生命周期', tone: 'green' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP097 · 十万连接 reload 雪崩推演"
      fileName="cluster_design.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={27}
      terminals={terminals}
      xray={xray}
    />
  );
};
