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
  { text: '// ❌ 常见误区：在 BusinessWorker 本地静态数组保存用户 Session / uidMap', diff: 'removed' },
  { text: '//    1) 16 个 Worker 内存互不相通； 2) 业务 reload 一重启状态全灭！', diff: 'removed' },
  { text: '' },
  { text: '// ✅ 正确解耦：Gateway 持久保管连接会话，BusinessWorker 保持 100% 无状态！', diff: 'added' },
  { text: '$gatewayConnSession[$cid] = ["uid" => "uid_888", "vip" => true];', diff: 'added' },
  { text: '' },
  { text: '// 即使 BusinessWorker v1 被杀掉重启为 v2：' },
  { text: '$bizV1LocalMemory = null; // 业务内存彻底清零，毫无影响', diff: 'removed' },
  { text: '$v2Session = $gatewayConnSession[$cid]; // 下条消息 Gateway 自动带回!', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage104B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (无状态 Session 与路由表托管校验)',
      status: { label: 'STATELESS BIZ ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? ('error' as const) : ('success' as const),
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 状态托管 X-Ray · 为什么 BusinessWorker 杀掉重启登录状态不丢？" badge="EP105 前置" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>❌ 状态放 BusinessWorker</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>16 进程内存孤岛 + 热更新直接清零</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>✅ 状态托管在 Gateway / 共享存储</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 13, marginTop: 4 }}>与 TCP 长连接同生命周期，v2 无缝继承</div>
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP104B【加餐过渡】· BusinessWorker 无状态与 Session 存储"
      fileName="ep104b/verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'stateless-trap' ? [1, 2, 8] : [4, 5, 9]}
      callout={
        visual === 'stateless-trap'
          ? { line: 2, text: '绝不要在 BusinessWorker 进程内存里存登录态或 uidMap！', tone: 'red' }
          : { line: 9, text: '下集 EP105：跨 Gateway 节点绑定 uid 并多端精准推送！', tone: 'green' }
      }
      fontSize={14}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
