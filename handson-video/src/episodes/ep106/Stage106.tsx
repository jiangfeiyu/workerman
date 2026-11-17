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
  { text: '// 第 6 篇终极合拢检验：Register + Gateway + BusinessWorker 全链路闭环' },
  { text: "$registerNodes['gw-1'] = ['lan' => '127.0.0.1:2901'];" },
  { text: "$cid = GatewayProtocol::encodeClientId('127.0.0.1', 2901, 7);", diff: 'added' },
  { text: "$uidMap = ['uid_888' => $cid];" },
  { text: '' },
  { text: '// BusinessWorker 经历杀进程 v1 -> v2 热重启后，按 uid 下发欢迎帧：' },
  { text: "\$pkt = GatewayProtocol::encodePacket(CMD_SEND_TO_ONE, \$uidMap['uid_888'], 'v2.0 热更新后推送: Welcome uid_888!');", diff: 'added' },
  { text: 'fwrite($gwAcceptUser, GatewayProtocol::decodePacket($pkt)["body"] . "\\n");' },
  { text: '$userGot = trim((string)fgets($userConn)); // 客户长连接 0 断线收到!' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'active' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage106: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 第 6 篇合拢：分布式网关集群实测输出',
      status: { label: 'PART 6 COMPLETE 🎉', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'warn', appearAtFrame: 34 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 56 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🏆 ModernGateway 分布式集群架构正式合拢！" badge="第 6 篇毕业 🎉" badgeTone="green">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        {['Register 服务发现', 'Gateway 扛百万长连接', 'BusinessWorker 无状态热更', 'client_id + bindUid 精准直投'].map((k) => (
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
      subLabel="EP106 · 第 6 篇合拢：分布式集群"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'cluster-flow' ? [2, 3, 4] : [7, 8, 9]}
      callout={
        visual === 'cluster-flow'
          ? { line: 5, text: '三大独立角色协同，水平扩容只需加机器', tone: 'blue' }
          : { line: 6, text: '最后冲刺第 7 篇：高并发实时弹幕实战！', tone: 'green' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
