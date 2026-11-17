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
  { text: '$subscribers = [$srvWorker1, $srvWorker2];' },
  { text: "fwrite(\$w1, json_encode(['cmd' => 'publish', 'channel' => 'broadcast', 'data' => '全服红包来了!']));" },
  { text: '$pkt = json_decode((string)fgets($srvWorker1), true);' },
  { text: '' },
  { text: '// ChannelServer 收到发布包后，按频道广播给全部订阅 Worker：', diff: 'added' },
  { text: 'foreach ($subscribers as $sub) {', diff: 'added' },
  { text: "    fwrite(\$sub, json_encode(['channel' => \$pkt['channel'], 'data' => \$pkt['data']]) . \"\\n\");" },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'active' as const },
  { label: '6.2 Gateway集群', state: 'todo' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage096: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 模块 6.1 合拢：全服 100% 跨进程广播验证',
      status: { label: 'BROADCAST 100% ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'warn', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 38 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Channel 走 TCP 的额外红利：天然支持跨机部署" badge="模块 6.1 毕业 🎉" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          同机 4 进程全服触达 100% ✅
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          换内网 IP 即可连上百台机器总机 → 下集 ModernGateway!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP096 · 合拢：全服跨进程广播"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={18}
      focusLines={visual === 'channel-verify' ? [23, 24] : [19, 22, 23]}
      callout={
        visual === 'channel-verify'
          ? { line: 21, text: 'Worker#1/#2 同步精准吐出“全服红包来了!”', tone: 'green' }
          : { line: 20, text: '但十万长连接频繁 reload 仍会断线雪崩！', tone: 'amber' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
