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
  { text: '// 1. ChannelServer 总机：维护 [channelName => subscribers[]] 订阅表' },
  { text: "ChannelClient::connect('127.0.0.1', 2206);", diff: 'added' },
  { text: "ChannelClient::on('broadcast', function (string $data) use ($worker): void {", diff: 'added' },
  { text: '    foreach ($worker->connections as $conn) {' },
  { text: '        $conn->send($data); // 每个 Worker 自己负责派给自家连接!', diff: 'added' },
  { text: '    }' },
  { text: '});' },
  { text: '' },
  { text: '// 2. 任意 Worker 想全服喊话：直接发信到内部邮局!' },
  { text: "ChannelClient::publish('broadcast', '全服红包来了!');", diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'active' as const },
  { label: '6.2 Gateway集群', state: 'todo' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage095: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Channel Pub/Sub 跨进程总线投递日志',
      status: { label: 'PUB/SUB BUS ✅', tone: 'green' },
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
    <XRayInspector title="🔬 Channel 内部邮局 Pub/Sub 跨进程总线" badge="TCP 总机路由" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          Worker#1 publish(&apos;broadcast&apos;)
        </div>
        <span>──▶</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          ChannelServer 总机
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          投递 Worker#1 &amp; Worker#2..#4!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP095 · Channel 内部邮局"
      fileName="ChannelClient.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'channel-hub' ? [2, 3, 5] : [9, 10]}
      callout={
        visual === 'channel-hub'
          ? { line: 4, text: '所有进程启动时连上同一邮局，订阅频道', tone: 'blue' }
          : { line: 8, text: '一发 publish，全集群订阅者同秒触发回调！', tone: 'green' }
      }
      fontSize={15}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
