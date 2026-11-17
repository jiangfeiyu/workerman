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

const DEMO_LINES: IDECodeLine[] = [
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: '' },
  { text: '// 用本地管道模拟：看清 stream_select 传引用陷阱' },
  { text: '[$r1, $w1] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '[$r2, $w2] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);' },
  { text: '' },
  { text: "\$allFds = ['pipe1' => \$r1, 'pipe2' => \$r2];" },
  { text: 'fwrite($w1, "hello-1\\n");' },
  { text: '' },
  { text: '// ❌ 错误写法：直接把 $allFds 传给 stream_select', diff: 'removed' },
  { text: '$badPool = $allFds;', diff: 'removed' },
  { text: '$write = $except = null;' },
  { text: 'stream_select($badPool, $write, $except, 1);', diff: 'removed' },
  { text: 'echo "[第1轮后] badPool 剩下的键: " . implode(", ", array_keys($badPool)) . "\\n";' },
  { text: '' },
  { text: 'fwrite($w2, "hello-2\\n");' },
  { text: '$count = stream_select($badPool, $write, $except, 0, 100_000);', diff: 'removed' },
  { text: 'echo "[第2轮误用被改写的数组] 就绪数量 = {$count} (pipe2 彻底失联！)\\n";' },
  { text: '' },
  { text: '// ✅ 正确写法：每次拷贝临时数组 $read = $allFds', diff: 'added' },
  { text: '$read = $allFds;', diff: 'added' },
  { text: '$countOk = stream_select($read, $write, $except, 0, 100_000);', diff: 'added' },
  { text: 'echo "[第2轮拷贝新数组] 就绪数量 = {$countOk}, 键 = " . implode(", ", array_keys($read)) . "\\n";' },
  { text: 'echo "[读取 pipe2] " . trim((string)fgets($read["pipe2"])) . "\\n";' },
];

const LEGO_NODES = [
  { label: '1.1 Socket破冰', state: 'active' as const },
  { label: '1.2 SelectLoop', state: 'todo' as const },
  { label: '1.3 Timer', state: 'todo' as const },
  { label: '1.4 Worker v0.1', state: 'todo' as const },
  { label: '2.x TcpConnection', state: 'todo' as const },
  { label: '3.x HTTP/WS', state: 'todo' as const },
  { label: '4~7 ModernWorker', state: 'todo' as const },
];

export const Stage003: React.FC<StageProps> = ({ visual, localFrame }) => {
  const getIde = () => {
    if (visual === 'why-prep') {
      return {
        focusLines: [4, 5, 6],
        callout: { line: 4, text: '先脱离网络，用纯管道扒开内核行为', tone: 'blue' as const },
      };
    }
    if (visual === 'pair-setup') {
      return {
        focusLines: [5, 6, 8, 9],
        typeRange: { fromLine: 5, toLine: 9, localFrame, startFrame: 6, framesPerLine: 18 },
        callout: { line: 8, text: '总花名册里有 pipe1 和 pipe2', tone: 'green' as const },
      };
    }
    if (visual === 'trap-mutation') {
      return {
        focusLines: [12, 14, 15],
        callout: { line: 14, text: '⚠️ 按引用传参！内核会原地删元素', tone: 'red' as const },
      };
    }
    if (visual === 'pipe2-lost') {
      return {
        focusLines: [17, 18, 19],
        callout: { line: 18, text: 'pipe2 已不在 $badPool 里了！', tone: 'red' as const },
      };
    }
    return {
      focusLines: [22, 23, 24, 25],
      typeRange: { fromLine: 21, toLine: 25, localFrame, startFrame: 6, framesPerLine: 16 },
      callout: { line: 22, text: '✅ 铁律：每轮拷贝 $read = $allFds', tone: 'green' as const },
    };
  };

  const getTerminals = (): TerminalPaneData[] => {
    if (visual === 'why-prep' || visual === 'pair-setup') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · 本地管道实验准备',
          status: { label: 'SANDBOX', tone: 'blue' },
          command: 'php demo.php',
          localFrame,
          lines: [
            { text: '已创建两对管道: pipe1 (写入 hello-1), pipe2 (暂不写)', tone: 'info', appearAtFrame: 35 },
            { text: '$allFds = [ pipe1 => Resource, pipe2 => Resource ]', tone: 'normal', appearAtFrame: 70 },
          ],
        },
      ];
    }

    if (visual === 'trap-mutation') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · 第 1 轮调用结果',
          status: { label: 'ARRAY MUTATED ⚠️', tone: 'amber' },
          command: 'php demo.php',
          localFrame,
          lines: [
            { text: snapshot.output[0], tone: 'warn', appearAtFrame: 35 },
            { text: '↑ 注意看！pipe2 只是第 1 轮没说话，就直接被删出数组了！', tone: 'error', appearAtFrame: 85 },
          ],
        },
      ];
    }

    if (visual === 'pipe2-lost') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · 第 2 轮灾难爆发',
          status: { label: 'PIPE2 LOST ❌', tone: 'red' },
          command: 'php demo.php',
          localFrame,
          lines: [
            { text: snapshot.output[0], tone: 'warn', appearAtFrame: 10 },
            { text: snapshot.output[1], tone: 'error', appearAtFrame: 45 },
          ],
        },
      ];
    }

    return [
      {
        id: 't1',
        title: 'Terminal 1 · 修复后全量真实输出',
        status: { label: 'ALL PASS ✅', tone: 'green' },
        command: 'php demo.php',
        localFrame,
        lines: [
          { text: snapshot.output[0], tone: 'warn', appearAtFrame: 10 },
          { text: snapshot.output[1], tone: 'error', appearAtFrame: 25 },
          { text: snapshot.output[2], tone: 'success', appearAtFrame: 55 },
          { text: snapshot.output[3], tone: 'success', appearAtFrame: 95 },
        ],
      },
    ];
  };

  const renderXRay = () => {
    const mutated = visual === 'trap-mutation' || visual === 'pipe2-lost';
    const fixed = visual === 'copy-rule';

    return (
      <XRayInspector
        title="🔬 内核 X-Ray · stream_select(&$read) 内存变化"
        badge={fixed ? '拷贝保护 ✅' : mutated ? '原数组被砍半 ❌' : '准备就绪'}
        badgeTone={fixed ? 'green' : mutated ? 'red' : 'blue'}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ flex: 1, padding: '10px 12px', borderRadius: 10, backgroundColor: THEME.softBg, border: `2px solid ${THEME.dark}` }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>调用前传入数组</div>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 15, marginTop: 6 }}>
              [pipe1, pipe2]
            </div>
          </div>
          <span style={{ fontSize: 20, fontWeight: 900 }}>→</span>
          <div
            style={{
              flex: 1.2,
              padding: '10px 12px',
              borderRadius: 10,
              backgroundColor: fixed ? THEME.greenBg : mutated ? THEME.redBg : THEME.blueBg,
              border: `2px solid ${fixed ? THEME.green : mutated ? THEME.red : THEME.blue}`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              {fixed ? '$read 被删只剩就绪项' : '内核就地覆盖数组内容'}
            </div>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 15, marginTop: 6 }}>
              {fixed ? '$allFds 依然完整 [pipe1, pipe2]' : mutated ? '$badPool = [pipe1] (pipe2没了!)' : '只留下真正有数据的 FD'}
            </div>
          </div>
        </div>
      </XRayInspector>
    );
  };

  const ide = getIde();
  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP003【铺垫】· stream_select 传引用陷阱"
      fileName="ep03/demo.php"
      lines={DEMO_LINES}
      focusLines={ide.focusLines}
      typeRange={ide.typeRange}
      callout={ide.callout}
      fontSize={16}
      lineHeight={25}
      terminals={getTerminals()}
      xray={renderXRay()}
    />
  );
};
