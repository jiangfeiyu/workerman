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
  { text: '$rooms = [' },
  { text: "    'room:live-101' => ['cid_01', 'cid_02', 'cid_03'],", diff: 'added' },
  { text: "    'room:live-102' => ['cid_04']," },
  { text: '];' },
  { text: '' },
  { text: 'function sendToGroup(string $room, string $danmaku): int {' },
  { text: '    $frame = WebsocketProtocol::encode($danmaku); // 只需编 1 次复用给全房!', diff: 'added' },
  { text: '    foreach ($rooms[$room] ?? [] as $cid) { sendToClient($cid, $frame); }' },
  { text: '    return count($rooms[$room] ?? []);' },
  { text: '}' },
  { text: '$onlineTotal = array_sum(array_map("count", $rooms)); // 实时全服在线统计!', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'active' as const },
  { label: '7.2 压测总收官', state: 'todo' as const },
];

export const Stage108: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 弹幕房间群推与实时在线人数统计',
      status: { label: 'GROUP PUSH ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'success' : 'info',
        appearAtFrame: 16 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 直播间群组推送：一次编码 + 精准隔离" badge="断连自动退群" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          room:live-101 [cid_01..03] → 全部触达 (3人)
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          room:live-102 [cid_04] → 完全隔离零串房
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP108 · 房间群推与在线统计"
      fileName="RoomGroup.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'room-group' ? [2, 3] : [7, 8, 11]}
      callout={
        visual === 'room-group'
          ? { line: 5, text: '连接断开事件 onClose 务必清理房表防止僵尸键', tone: 'amber' }
          : { line: 10, text: 'encode 一次发全房，省掉 99% 重复封包开销', tone: 'green' }
      }
      fontSize={14}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
