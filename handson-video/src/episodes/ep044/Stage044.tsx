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

const REQ_LINES: IDECodeLine[] = [
  { text: 'readonly class Request', diff: 'added' },
  { text: '{' },
  { text: '    public function __construct(' },
  { text: '        public string $method,', diff: 'added' },
  { text: '        public string $path,', diff: 'added' },
  { text: '        public array $query,', diff: 'added' },
  { text: '        public array $headers,', diff: 'added' },
  { text: '        public string $body,', diff: 'added' },
  { text: '    ) {}' },
  { text: '    public function header(string $name, string $default = ""): string' },
  { text: '    {' },
  { text: '        return $this->headers[strtolower($name)] ?? $default;' },
  { text: '    }' },
  { text: '}' },
];

const DECODE_LINES: IDECodeLine[] = [
  { text: '    public static function decode(string $package): Request', diff: 'added' },
  { text: '    {' },
  { text: '        $headerEnd = (int)strpos($package, "\\r\\n\\r\\n");' },
  { text: '        $rawHeader = substr($package, 0, $headerEnd);' },
  { text: '        $body = substr($package, $headerEnd + 4);' },
  { text: '        $lines = explode("\\r\\n", $rawHeader);' },
  { text: '        [$method, $uri] = explode(" ", array_shift($lines), 3);', diff: 'added' },
  { text: '        $parts = parse_url($uri); $path = $parts["path"] ?? "/";' },
  { text: '        $query = []; if (isset($parts["query"])) parse_str($parts["query"], $query);' },
  { text: '        $headers = [];' },
  { text: '        foreach ($lines as $line) {' },
  { text: '            if (str_contains($line, ":")) {' },
  { text: '                [$k, $v] = explode(":", $line, 2);' },
  { text: '                $headers[strtolower(trim($k))] = trim($v);' },
  { text: '            }' },
  { text: '        }' },
  { text: '        return new Request($method, $path, $query, $headers, $body);', diff: 'added' },
  { text: '    }' },
];

const LEGO_NODES = [
  { label: '1~2 引擎+连接', state: 'done' as const },
  { label: '3.1 粘包与协议', state: 'done' as const },
  { label: '3.2 HTTP/1.1', state: 'active' as const },
  { label: '3.3 WebSocket', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage044: React.FC<StageProps> = ({ visual, localFrame }) => {
  const showDecode = visual === 'decode-parse';
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (Request 解析输出)',
      status: { label: 'READONLY REQUEST ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 1 ? ('success' as const) : ('info' as const),
        appearAtFrame: 15 + i * 24,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 解码 X-Ray · 原始字符串 → 不可变 Request 对象" badge="PHP 8.2 readonly" badgeTone="blue">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 14, fontWeight: 800 }}>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
          POST /api/login?from=web
        </div>
        <span>→ decode() →</span>
        <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, color: THEME.green }}>
          method / path / query[from] / body
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP044 · 不可变 Request 对象"
      fileName={showDecode ? 'HttpProtocol.php' : 'Request.php'}
      tabs={['Request.php', 'HttpProtocol.php']}
      lines={showDecode ? DECODE_LINES : REQ_LINES}
      startLineNumber={showDecode ? 31 : 4}
      focusLines={showDecode ? [37, 44, 47] : [4, 7, 8, 9]}
      callout={
        showDecode
          ? { line: 44, text: 'Header 键名统一 strtolower 防大小写坑', tone: 'blue' }
          : { line: 4, text: 'readonly 保证请求进入业务不可篡改', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
