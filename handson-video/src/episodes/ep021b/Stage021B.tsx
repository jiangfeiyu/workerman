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
  { text: '[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '' },
  { text: '// 1. 踩坑：裸 resource 根本不能挂载业务属性！', diff: 'removed' },
  { text: 'try {' },
  { text: '    $r->uid = 10086; // 直接抛 Error！', diff: 'removed' },
  { text: '} catch (\\Throwable $e) {' },
  { text: '    echo "[踩坑报错] " . $e->getMessage() . "\\n";' },
  { text: '}' },
  { text: '' },
  { text: '// 2. 用散装数组？每加一个属性就多一张全局表！', diff: 'modified' },
  { text: '$uids[(int)$r] = 10086;' },
  { text: '$sendBuffers[(int)$r] = "";' },
  { text: '' },
  { text: '// 3. 最小包装盒：先建一个最朴素的盒子把它们装起来！', diff: 'added' },
  { text: 'class ConnBox {', diff: 'added' },
  { text: '    public $socket;' },
  { text: '    public ?int $uid = null;' },
  { text: '    public string $sendBuffer = "";' },
  { text: '    public function __construct($socket) { $this->socket = $socket; }' },
  { text: '}' },
  { text: '$box = new ConnBox($r);', diff: 'added' },
  { text: '$box->uid = 10086;', diff: 'added' },
  { text: 'echo "[最小包装盒] \\$box->uid = {$box->uid} 成功！\\n";' },
];

const LEGO_NODES = [
  { label: '1.x 事件引擎', state: 'done' as const },
  { label: '2.1 连接对象化', state: 'active' as const },
  { label: '2.2 发送缓冲', state: 'todo' as const },
  { label: '2.3 优雅断连', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage021B: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'resource-trap') {
      return {
        focusLines: [7, 8, 9, 10, 11],
        callout: { line: 9, text: 'resource 不是对象，不能写 $r->uid！', tone: 'red' as const },
      };
    }
    if (visual === 'scattered-arrays') {
      return {
        focusLines: [15, 16],
        callout: { line: 15, text: '全局散装数组越写越多，断连极易漏删！', tone: 'amber' as const },
      };
    }
    return {
      focusLines: [19, 20, 21, 22, 25, 26],
      callout: { line: 26, text: '把散装数组全装进 ConnBox 一个盒子里！', tone: 'green' as const },
    };
  };

  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php demo.php',
      status: {
        label: visual === 'resource-trap' ? 'ERROR ON RESOURCE 🚨' : 'CONN BOX ✅',
        tone: visual === 'resource-trap' ? 'red' : 'green',
      },
      command: 'php demo.php',
      localFrame,
      lines:
        visual === 'resource-trap'
          ? [{ text: snapshot.output[0], tone: 'error', appearAtFrame: 20 }]
          : visual === 'scattered-arrays'
            ? [
                { text: snapshot.output[0], tone: 'warn', appearAtFrame: 10 },
                { text: snapshot.output[1], tone: 'warn', appearAtFrame: 40 },
              ]
            : [
                { text: snapshot.output[0], tone: 'info', appearAtFrame: 10 },
                { text: snapshot.output[1], tone: 'info', appearAtFrame: 35 },
                { text: snapshot.output[2], tone: 'success', appearAtFrame: 65 },
              ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 内存 X-Ray · 散装全局表 vs 最小包装盒 ConnBox" badge="收拢状态" badgeTone="blue">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.red }}>散装全局数组（第 1 篇痛点）</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 12, marginTop: 4 }}>$uids[6] / $sendBuffers[6] / $active[6]</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.green }}>ConnBox 包装盒（收拢一体）</div>
          <div style={{ fontFamily: THEME.fontMono, fontSize: 12, marginTop: 4 }}>$box-&gt;socket / -&gt;uid / -&gt;sendBuffer</div>
        </div>
      </div>
    </XRayInspector>
  );

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP021B【加餐过渡】· 为什么需要连接包装盒"
      fileName="ep21b/demo.php"
      lines={LINES}
      startLineNumber={5}
      focusLines={ide.focusLines}
      callout={ide.callout}
      fontSize={14}
      lineHeight={20}
      terminals={terminals}
      xray={xray}
    />
  );
};
