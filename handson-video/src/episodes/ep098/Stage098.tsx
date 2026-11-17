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
  { text: '// Gateway 极简双端口原型（暂用 JSON 行转发，EP101 再升级二进制）：' },
  { text: '$publicServer = stream_socket_server("tcp://0.0.0.0:8282");  // 接公网用户', diff: 'added' },
  { text: '$innerServer  = stream_socket_server("tcp://127.0.0.1:2901"); // 等后端业务来连', diff: 'added' },
  { text: '' },
  { text: '// 1. 公网收到用户消息 -> 附带连接 FD($connId) 转发给内网 BusinessWorker：' },
  { text: 'fwrite($bizConn, json_encode(["connId" => $connId, "msg" => $msg]) . "\\n");', diff: 'added' },
  { text: '' },
  { text: '// 2. 内网收到 BusinessWorker 回包 -> 按 connId 找到公网 Socket 原路写出：' },
  { text: '$pkt = json_decode((string)fgets($bizConn), true);' },
  { text: 'fwrite($publicClients[$pkt["connId"]], $pkt["reply"] . "\\n");', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage098: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Gateway ↔ BusinessWorker 内外转发日志',
      status: { label: 'PROXY <-> LOGIC ✅', tone: 'green' },
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
    <XRayInspector title="🔬 Gateway 极简双端口接力模型" badge="物理隔离第一步" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          用户 ←8282→ Gateway
        </div>
        <span>◀── 2901 内部专线 ──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          BusinessWorker (无状态逻辑计算)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP098 · 双进程极简网关原型"
      fileName="GatewayProtoDemo.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'two-roles' ? [2, 3] : [6, 9, 10]}
      callout={
        visual === 'two-roles'
          ? { line: 4, text: '外网口稳守用户长连接，内网口只对接计算节点', tone: 'blue' }
          : { line: 7, text: 'Gateway 自己绝不跑一行业务 SQL / Redis!', tone: 'green' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
