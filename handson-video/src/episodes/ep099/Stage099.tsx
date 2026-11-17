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
  { text: '// 1. 用户长连接死死握在 Gateway 进程内：' },
  { text: '$userConn = stream_socket_client("tcp://{$pubAddr}");' },
  { text: '$gwAccept = stream_socket_accept($publicSrv); $connId = (int)$gwAccept;' },
  { text: '' },
  { text: '// 2. 残酷破坏测试：杀掉后端 BusinessWorker v1 并重连 v2.0！', diff: 'removed' },
  { text: 'fwrite($bizV2, json_encode(["connId" => $connId, "msg" => "v2.0 热更新后推送: Welcome!"]) . "\\n");', diff: 'added' },
  { text: '$pkt = json_decode((string)fgets($gwIn2), true); fwrite($gwAccept, $pkt["msg"] . "\\n");', diff: 'added' },
  { text: '' },
  { text: '// 3. 查验用户端 TCP 连接存活状态：断连次数 === 0!', diff: 'added' },
  { text: '$stillOpen = is_resource($userConn) && !feof($userConn); // true!' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage099: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · BusinessWorker 热重启时用户 TCP 存活实测',
      status: { label: '0 DISCONNECTS ✅', tone: 'green' },
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
    <XRayInspector title="🔬 业务代码热重启：前端长连接 0 感知" badge="断线次数 = 0" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          Gateway 用户长连接: alive=true 纹丝不动
        </div>
        <span>|</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          BusinessWorker: v1 杀死 → v2 秒级连回 Gateway 恢复服务!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP099 · 业务热更新零断线实测"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'kill-biz' ? [5, 6] : [7, 9, 10]}
      callout={
        visual === 'kill-biz'
          ? { line: 4, text: '后端业务节点哪怕全灭重启，公网连接不断!', tone: 'amber' }
          : { line: 8, text: 'v2 上线即刻顺着原 Gateway FD 推到用户屏幕', tone: 'green' }
      }
      fontSize={14}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
