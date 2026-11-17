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
  { text: '$ret = @stream_socket_enable_crypto(' },
  { text: '    $conn, true,' },
  { text: '    STREAM_CRYPTO_METHOD_TLSv1_2_SERVER | STREAM_CRYPTO_METHOD_TLSv1_3_SERVER' },
  { text: ');' },
  { text: '' },
  { text: '// ❌ 血坑写法：if (!$ret) { close(); } 会把 0 当成 false 踢死正常用户!', diff: 'removed' },
  { text: 'if ($ret === 0) {', diff: 'added' },
  { text: '    return; // TLS 握手半包中，绝不是错误，继续等下次可读!', diff: 'added' },
  { text: '} elseif ($ret === true) {' },
  { text: '    $sslCompleted = true; // 加密通道打通!', diff: 'added' },
  { text: '} else {' },
  { text: '    closeConnection(); // 只有全等 === false 才算握手失败!' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage089: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 非阻塞 TLS enable_crypto 捕获 ret===0 实测',
      status: { label: 'STRICT === 0 ✅', tone: 'amber' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 1 ? 'success' : 'warn',
        appearAtFrame: 16 + i * 30,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 stream_socket_enable_crypto() 三值返回陷阱" badge="必须全等 ===" badgeTone="red">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          === true : 握手全部成功 ✅
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          === 0 : 半包等待中 (非报错!) ⏳
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          === false : 证书/协议失败 ❌
        </div>
      </div>
    </XRayInspector>
  );

  const focus =
    visual === 'tls-half'
      ? [1, 2, 3, 4]
      : visual === 'zero-vs-false'
      ? [6, 7, 9, 11]
      : [7, 8, 10];

  const callout =
    visual === 'tls-half'
      ? { line: 5, text: 'ClientHello/ServerHello 来回交互分多次触发', tone: 'blue' as const }
      : visual === 'zero-vs-false'
      ? { line: 6, text: 'PHP 里 0 == false 为 true！弱判断必死', tone: 'red' as const }
      : { line: 13, text: '本机实测遇到 2 次 ret===0 后顺利变 true！', tone: 'amber' as const };

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP089 · 铺垫：TLS 返回值陷阱"
      fileName="doSslHandshake.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={focus}
      callout={callout}
      fontSize={15}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
