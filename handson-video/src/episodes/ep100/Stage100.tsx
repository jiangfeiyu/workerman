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
  { text: 'public static function encodeClientId(string $ip, int $port, int $connId): string' },
  { text: '{' },
  { text: '    // 4B 内网IP (N) + 2B 进程端口 (n) + 4B 连接ID (N) = 10B -> 20位 HEX!', diff: 'added' },
  { text: "    return bin2hex(pack('NnN', ip2long($ip), $port, $connId));", diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: 'public static function decodeClientId(string $cid): array' },
  { text: '{' },
  { text: "    $u = unpack('Nip/nport/NconnId', hex2bin($cid));", diff: 'added' },
  { text: "    return ['ip' => long2ip($u['ip']), 'port' => $u['port'], 'connId' => $u['connId']];" },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage100: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 全局唯一 20 位 client_id 编解码实测',
      status: { label: 'GLOBAL COORD ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'success', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 免查 Redis 路由表：自带全网坐标的 20 位 client_id" badge="0a000008 + 205a + 0000002a" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          4B 内网 IP: 10.0.0.8
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          2B 内网 Port: 8282
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          4B 局部 ConnId: #42
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP100 · 全局唯一 client_id 编解码"
      fileName="GatewayProtocol.php"
      lines={LINES}
      startLineNumber={8}
      focusLines={visual === 'why-cid' ? [8, 10] : [11, 16, 17]}
      callout={
        visual === 'why-cid'
          ? { line: 9, text: '每台机器都能自己算出绝不撞车的全网身份证', tone: 'blue' }
          : { line: 12, text: '看到 client_id 当场逆向定位到哪台机哪个 FD!', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
