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
  { text: 'class RegisterCenter' },
  { text: '{' },
  { text: '    /** @var array<string, float> 在线 Gateway 地址与最后心跳时间 */' },
  { text: '    private array $gatewayNodes = [];' },
  { text: '' },
  { text: '    public function onGatewayConnect(string $lanAddr): void {' },
  { text: '        $this->gatewayNodes[$lanAddr] = microtime(true);', diff: 'added' },
  { text: '        $this->broadcastGatewayList(); // 通知全体 BusinessWorker 动态连入!', diff: 'added' },
  { text: '    }' },
  { text: '' },
  { text: '    public function sweepDeadNodes(float $timeout = 10.0): void {' },
  { text: '        // 心跳超时立刻摘除并群发新名单，实现自动故障摘除!', diff: 'added' },
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

export const Stage102: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Register 服务发现与节点列表推送实测',
      status: { label: 'DISCOVERY ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'success' : 'info',
        appearAtFrame: 16 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Register 集群通讯录：动态扩缩容不重启" badge="服务发现 + 心跳摘除" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          Gateway 上/下线报备
        </div>
        <span>──▶</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          Register 注册中心
        </div>
        <span>──▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          推送列表给所有 BusinessWorker!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP102 · Register 注册中心"
      fileName="Register.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'why-register' ? [4, 7] : [8, 12]}
      callout={
        visual === 'why-register'
          ? { line: 5, text: '扩容加机器不用改配置文件，自动注册自动发现', tone: 'blue' }
          : { line: 10, text: '宕机机器心跳一断秒级踢出集群名单', tone: 'green' }
      }
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
