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
  { text: '// 1. 用 OpenSSL 生成 2048-bit RSA 私钥 + X.509 自签名证书' },
  { text: '$priv = openssl_pkey_new(["private_key_bits" => 2048]);' },
  { text: '$csr  = openssl_csr_new(["commonName" => "localhost"], $priv);' },
  { text: '$x509 = openssl_csr_sign($csr, null, $priv, 365);' },
  { text: 'file_put_contents($certFile, $certPem . $keyPem);' },
  { text: '' },
  { text: '// 2. 挂入 stream_context_create，业务与协议层零改动!', diff: 'added' },
  { text: '$ctx = stream_context_create(["ssl" => [' },
  { text: '    "local_cert"  => $certFile,', diff: 'added' },
  { text: '    "verify_peer" => false,' },
  { text: ']]);' },
  { text: '$srv = stream_socket_server("tcp://0.0.0.0:443", $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'done' as const },
  { label: '5.3 TLS与总装', state: 'active' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage088: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 自签名 PEM 证书与 SSL 上下文实测',
      status: { label: 'SSL CONTEXT ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 1 ? 'success' : 'info',
        appearAtFrame: 16 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 给任意 TCP 服务无侵入穿 TLS 防弹衣" badge="Transport = ssl" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          server.pem (公钥证书 + RSA私钥)
        </div>
        <span>── stream_context ─▶</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          HTTP → HTTPS | WebSocket → WSS!
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP088 · 自签名证书与 SSL Context"
      fileName="verify.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'cert-gen' ? [2, 3, 4, 5] : [8, 9, 11, 12]}
      callout={
        visual === 'cert-gen'
          ? { line: 6, text: '开发测试 4 行纯 PHP 自动产出合法 PEM', tone: 'amber' }
          : { line: 10, text: '上层 HttpProtocol / WebsocketProtocol 零代码改动', tone: 'green' }
      }
      fontSize={14}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
