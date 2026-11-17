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
  { text: '    /** @var array<int, TcpConnection> 本地 clientConnMap[connId] */' },
  { text: '    private array $clientConns = [];' },
  { text: '    private array $workerConns = [];' },
  { text: '' },
  { text: '    public function onClientMessage(TcpConnection $c, string $data): void {' },
  { text: '        $worker = $this->workerConns[$c->id % count($this->workerConns)];', diff: 'added' },
  { text: '        $worker->send(GatewayProtocol::encodePacket(CMD_ON_MESSAGE, $c->cid, $data));' },
  { text: '    }' },
  { text: '' },
  { text: '    public function onWorkerPacket(array $pkt): void {' },
  { text: '        $meta = GatewayProtocol::decodeClientId($pkt["cid"]);' },
  { text: '        $this->clientConns[$meta["connId"]]?->send($pkt["body"]); // O(1) 原路写出!', diff: 'added' },
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

export const Stage103: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Gateway 按 connId O(1) 精确投递日志',
      status: { label: 'O(1) ROUTE ✅', tone: 'green' },
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
    <XRayInspector title="🔬 Gateway 接入层双向高速交换机" badge="O(1) 哈希表直达" badgeTone="green">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          上行: $c-&gt;id % N → 均衡分发给后端 BusinessWorker
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          下行: 拆出 connId → 本地数组 O(1) 原路写回客户!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP103 · Gateway 接入层核心"
      fileName="Gateway.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'gw-dual' ? [4, 5, 8, 9] : [13, 14]}
      callout={
        visual === 'gw-dual'
          ? { line: 6, text: '同一连接始终散列到固定后端，保证消息有序', tone: 'blue' }
          : { line: 11, text: '直指 connId 槽位发出，万级推送零遍历开销', tone: 'green' }
      }
      fontSize={14}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
