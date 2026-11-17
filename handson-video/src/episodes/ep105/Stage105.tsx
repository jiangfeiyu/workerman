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
  { text: 'class Gateway' },
  { text: '{' },
  { text: '    public static function bindUid(string $cid, string $uid): void {', diff: 'added' },
  { text: '        // 发送 CMD_BIND_UID 给该 $cid 所属 Gateway 节点托管(避免多Worker孤岛!)', diff: 'added' },
  { text: '        self::sendCmdToGateway($cid, CMD_BIND_UID, $uid);', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public static function sendToUid(string $uid, string $msg): void {', diff: 'added' },
  { text: '        // 向所有 Gateway 专线广播 CMD_SEND_TO_UID，各节点查本地 uidMap 推送!', diff: 'added' },
  { text: '        foreach (self::$gatewayLinks as $link) {' },
  { text: '            $link->send(GatewayProtocol::encodePacket(CMD_SEND_TO_UID, $uid, $msg));', diff: 'added' },
  { text: '        }' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage105: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Gateway::bindUid + sendToUid 多端精准投递',
      status: { label: 'UID BOUND ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'info' : 'success',
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 uid_888 ↔ client_id 一对多映射表" badge="重连不变 + 多端同步" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          账号 uid_888
        </div>
        <span>── bindUid ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          [手机 cid_1, 网页 cid_2] → sendToUid 一键全推!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP105 · 会话与 bindUid 绑定"
      fileName="Gateway.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'why-uid' ? [3, 4] : [6, 7, 10, 12]}
      callout={
        visual === 'why-uid'
          ? { line: 5, text: '用户断线重连后 cid 会换，只有业务 UID 永恒不变', tone: 'amber' }
          : { line: 13, text: '按 user_id 发消息完全不用自己查任何路由表', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
