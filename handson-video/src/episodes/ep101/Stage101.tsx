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
  { text: 'public static function encodePacket(int $cmd, string $cid, string $body): string' },
  { text: '{' },
  { text: '    // 1B cmd + 20B client_id + 任意长度 $body', diff: 'added' },
  { text: "    $payload = pack('Ca20', $cmd, $cid) . $body;", diff: 'added' },
  { text: "    return pack('N', 4 + strlen($payload)) . $payload; // +4B 总长度头!" },
  { text: '}' },
  { text: '' },
  { text: 'public static function decodePacket(string $pkg): array' },
  { text: '{' },
  { text: "    $meta = unpack('NtotalLen/Ccmd/a20cid', $pkg);", diff: 'added' },
  { text: "    return ['cmd' => $meta['cmd'], 'cid' => $meta['cid'], 'body' => substr($pkg, 25)];" },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'active' as const },
  { label: '7.1 弹幕大实战', state: 'todo' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage101: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · GatewayProtocol 内部二进制封包实测',
      status: { label: '39B BINARY FRAME ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'info' : 'success',
        appearAtFrame: 12 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 GatewayProtocol 二进制帧结构 (固定 25B 头)" badge="零 JSON 冗余开销" badgeTone="blue">
      <div style={{ display: 'flex', gap: 8, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          4B 总长 (N)
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          1B cmd (C)
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.softBg, border: `2px solid ${THEME.gridColor}` }}>
          20B client_id (a20)
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Body 正文
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP101 · GatewayProtocol 二进制协议"
      fileName="GatewayProtocol.php"
      lines={LINES}
      startLineNumber={20}
      focusLines={visual === 'gw-frame' ? [22, 23, 24] : [29, 30]}
      callout={
        visual === 'gw-frame'
          ? { line: 21, text: '直接复用 FrameProtocol 定长分帧思想', tone: 'blue' }
          : { line: 27, text: '一行 unpack 一口气拆出 totalLen + cmd + cid', tone: 'green' }
      }
      fontSize={14}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
