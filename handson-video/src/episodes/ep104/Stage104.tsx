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
  { text: 'class BusinessWorker' },
  { text: '{' },
  { text: '    /** @var array<string, AsyncTcpClient> 已连上的全体 Gateway 专线 */' },
  { text: '    public static array $gatewayLinks = [];' },
  { text: '' },
  { text: '    public static function sendToClient(string $cid, string $msg): void {', diff: 'added' },
  { text: '        $meta = GatewayProtocol::decodeClientId($cid);' },
  { text: '        $lan  = "{$meta[\'ip\']}:{$meta[\'port\']}";' },
  { text: '        self::$gatewayLinks[$lan]?->send(GatewayProtocol::encodePacket(CMD_SEND_TO_ONE, $cid, $msg));', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public static function sendToAll(string $msg): void {', diff: 'added' },
  { text: '        foreach (self::$gatewayLinks as $link) { $link->send(...); }' },
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

export const Stage104: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · BusinessWorker 专线路由投递实测',
      status: { label: 'GATEWAY FACADE ✅', tone: 'green' },
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
    <XRayInspector title="🔬 Gateway::sendToClient() 无感跨机投递" badge="像写单机一样写集群" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          拆出 $cid 前 6B → 127.0.0.1:2901
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          直投目标 Gateway 专线 → 写出用户客户端!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP104 · BusinessWorker 核心"
      fileName="BusinessWorker.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'biz-connect' ? [4, 7] : [6, 9, 12, 13]}
      callout={
        visual === 'biz-connect'
          ? { line: 5, text: '通过第 5 篇写的 AsyncTcpClient 全连上网关', tone: 'blue' }
          : { line: 10, text: '一行静态方法透明路由到对应内网网关', tone: 'green' }
      }
      fontSize={14}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
