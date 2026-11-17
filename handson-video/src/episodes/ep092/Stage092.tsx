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
  { text: 'function resolveRealIp(string $remoteIp, string $xffHeader, array $trustedProxies): string' },
  { text: '{' },
  { text: '    // 只有底层的 TCP 对端 IP 属于自家受信任网关，才允许读 X-Forwarded-For!', diff: 'added' },
  { text: '    if (!in_array($remoteIp, $trustedProxies, true)) {' },
  { text: '        return $remoteIp; // 严防黑客直连伪造 XFF 头绕过限流!', diff: 'removed' },
  { text: '    }' },
  { text: "    $parts = array_filter(array_map('trim', explode(',', $xffHeader)));" },
  { text: '    return $parts[0] ?? $remoteIp;', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage092: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 受信任代理白名单 vs 伪造 XFF 拦截实测',
      status: { label: 'ANTI-SPOOF ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 1 ? 'success' : 'info',
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 X-Forwarded-For 受信任代理白名单法则" badge="绝不盲信 HTTP 头" badgeTone="amber">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Nginx(10.0.0.1) 在白名单 → 采信 XFF 真实 IP 203.0.113.88 ✅
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          黑客直连伪造 XFF: 8.8.8.8 → 锁定 TCP IP 198.51.100.7 🛡️
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP092 · X-Forwarded-For 真实 IP"
      fileName="Request.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'xff-spoof' ? [4, 5] : [3, 4, 7, 8]}
      callout={
        visual === 'xff-spoof'
          ? { line: 6, text: '任何人都能在 curl -H 随便写虚假 IP', tone: 'red' }
          : { line: 2, text: '先认 TCP 对端身份，再解 HTTP 透传头', tone: 'green' }
      }
      fontSize={14}
      lineHeight={26}
      terminals={terminals}
      xray={xray}
    />
  );
};
