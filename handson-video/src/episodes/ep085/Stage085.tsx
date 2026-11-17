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
  { text: 'class CoroutineRedisClient' },
  { text: '{' },
  { text: '    public function set(string $key, string $val): string' },
  { text: '    {' },
  { text: "        return $this->cmd(['SET', $key, $val]);", diff: 'added' },
  { text: '    }' },
  { text: '    public function get(string $key): ?string' },
  { text: '    {' },
  { text: "        return $this->cmd(['GET', $key]);", diff: 'added' },
  { text: '    }' },
  { text: '    private function cmd(array $args): mixed' },
  { text: '    {' },
  { text: '        $raw = $this->client->awaitRequest(RespCodec::encode($args));', diff: 'added' },
  { text: '        return RespCodec::decodeLine($raw);' },
  { text: '    }' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'active' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage085: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · 纯 PHP 协程 RedisClient 200 次命令压测',
      status: { label: '200 OPS / 15.2ms ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'info', appearAtFrame: 12 },
        { text: snapshot.output[1], tone: 'info', appearAtFrame: 30 },
        { text: snapshot.output[2], tone: 'success', appearAtFrame: 50 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 零 C 扩展的纯 PHP 协程 Redis 客户端" badge="RespCodec + awaitRequest" badgeTone="green">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
          $redis-&gt;set(&apos;k1&apos;, &apos;v1&apos;)
        </div>
        <span>→</span>
        <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}` }}>
          RESP 编码 + Fiber::suspend()
        </div>
        <span>→</span>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          100/100 全部精准命中 (15.24ms!)
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP085 · 协程 RedisClient 实测"
      fileName="RedisClient.php"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'redis-await' ? [11, 13, 14] : [3, 5, 7, 9]}
      callout={
        visual === 'redis-await'
          ? { line: 12, text: '复用 EP083 写的 awaitRequest 一句搞定异步收发', tone: 'blue' }
          : { line: 6, text: '零 phpredis C 扩展，纯粹用今天手写基建拼出', tone: 'green' }
      }
      fontSize={16}
      lineHeight={24}
      terminals={terminals}
      xray={xray}
    />
  );
};
