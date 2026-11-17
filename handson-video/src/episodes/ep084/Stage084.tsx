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
  { text: 'public static function encode(array $args): string' },
  { text: '{' },
  { text: '    $out = "*" . count($args) . "\\r\\n"; // 数组参数个数', diff: 'added' },
  { text: '    foreach ($args as $a) {' },
  { text: '        $s = (string)$a;' },
  { text: '        $out .= "$" . strlen($s) . "\\r\\n{$s}\\r\\n"; // 字节长度+正文', diff: 'added' },
  { text: '    }' },
  { text: '    return $out;' },
  { text: '}' },
  { text: '' },
  { text: 'public static function decodeLine(string $raw): string|int|null' },
  { text: '{' },
  { text: '    if ($raw[0] === "+") return substr($raw, 1, strpos($raw, "\\r\\n") - 1);' },
  { text: '    if ($raw[0] === "$") {' },
  { text: '        $len = (int)substr($raw, 1, ($p = strpos($raw, "\\r\\n")) - 1);' },
  { text: '        return $len < 0 ? null : substr($raw, $p + 2, $len);', diff: 'added' },
  { text: '    }' },
  { text: '    return trim($raw);' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~4 底座与Epoll', state: 'done' as const },
  { label: '5.1 Fiber 调度', state: 'done' as const },
  { label: '5.2 Redis连接池', state: 'active' as const },
  { label: '5.3 TLS与总装', state: 'todo' as const },
  { label: '6~7 分布式实战', state: 'todo' as const },
];

export const Stage084: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · php verify.php (RESP 编解码实测)',
      status: { label: 'RESP CODEC ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line, i) => ({
        text: line,
        tone: i === 0 ? ('info' as const) : ('success' as const),
        appearAtFrame: 14 + i * 28,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 Redis RESP 协议三剑客" badge="二进制安全前缀定界" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          *N : 数组共有几个参数
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          $len : 后面紧跟多少字节正文
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          +OK : 单行成功状态回复
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP084 · 手写 RESP 协议解析"
      fileName="RespCodec.php"
      lines={LINES}
      startLineNumber={4}
      focusLines={visual === 'resp-format' ? [6, 9] : [16, 17, 18, 19]}
      callout={
        visual === 'resp-format'
          ? { line: 4, text: '*3 表示后面跟 3 段参数，读完直接切分', tone: 'blue' }
          : { line: 20, text: '$len 直接告知字节长度，比 \\n 更安全', tone: 'green' }
      }
      fontSize={15}
      lineHeight={23}
      terminals={terminals}
      xray={xray}
    />
  );
};
