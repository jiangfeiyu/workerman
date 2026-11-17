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

const RESP_LINES: IDECodeLine[] = [
  { text: 'class Response', diff: 'added' },
  { text: '{' },
  { text: '    public function __construct(' },
  { text: '        public int $status = 200,' },
  { text: '        public array $headers = ["Content-Type" => "text/html; charset=utf-8"],' },
  { text: '        public string $body = "",' },
  { text: '    ) {}' },
  { text: '    public static function json(mixed $data, int $status = 200): self', diff: 'added' },
  { text: '    {' },
  { text: '        return new self(' },
  { text: '            status: $status,' },
  { text: '            headers: ["Content-Type" => "application/json; charset=utf-8"],' },
  { text: '            body: json_encode($data, JSON_UNESCAPED_UNICODE) ?: "{}",' },
  { text: '        );' },
  { text: '    }' },
  { text: '}' },
];

const ENCODE_LINES: IDECodeLine[] = [
  { text: '    public static function encode(mixed $data): string', diff: 'added' },
  { text: '    {' },
  { text: '        $resp = $data instanceof Response ? $data : new Response(body: (string)$data);' },
  { text: '        $reason = self::REASON_PHRASES[$resp->status] ?? "OK";' },
  { text: '        $headers = $resp->headers;' },
  { text: '        $headers["Content-Length"] = (string)strlen($resp->body);', diff: 'added' },
  { text: '        $headers["Connection"] ??= "keep-alive";', diff: 'added' },
  { text: '' },
  { text: '        $raw = "HTTP/1.1 {$resp->status} {$reason}\\r\\n";' },
  { text: '        foreach ($headers as $k => $v) {' },
  { text: '            $raw .= "{$k}: {$v}\\r\\n";' },
  { text: '        }' },
  { text: '        return $raw . "\\r\\n" . $resp->body;', diff: 'added' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'active' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage045: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showEncode = visual === 'encode-http';
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (Response::json 编码输出)',
      status: { label: '200 OK JSON ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 2 ? ('success' as const) : ('info' as const),
        appearAtFrame: 16 + i * 22,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 响应 X-Ray · 必须自动补齐 Content-Length！" badge="防浏览器转圈" badgeTone="amber">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}` }}>
          没写 Content-Length → 浏览器以为没发完一直转圈
        </div>
        <span>vs</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          自动补 Content-Length → 浏览器毫秒渲染！
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP045 · Response 与 Http::encode"
      fileName={showEncode ? 'HttpProtocol.php' : 'Response.php'}
      tabs={['Response.php', 'HttpProtocol.php']}
      lines={showEncode ? ENCODE_LINES : RESP_LINES}
      startLineNumber={showEncode ? 56 : 4}
      focusLines={showEncode ? [61, 62, 68] : [11, 15]}
      callout={
        showEncode
          ? { line: 61, text: '关键头：告诉浏览器正文精确字节数', tone: 'amber' }
          : { line: 11, text: '快捷工厂：Response::json($data)', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
