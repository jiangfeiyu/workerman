import React from 'react';
import { interpolate, spring } from 'remotion';
import {
  IDECodePanel,
  LegoProgressStrip,
  MultiTerminalPanel,
  SPRING_POP,
  SPRING_SMOOTH,
  THEME,
  XRayInspector,
  type IDECodeLine,
  type StageProps,
  type TerminalPaneData,
} from '../../components';
import snapshot from './snapshot.json';

const SERVER_LINES: IDECodeLine[] = [
  { text: '<?php' },
  { text: 'declare(strict_types=1);' },
  { text: '' },
  { text: "\$port = getenv('PORT') ?: '9001';" },
  { text: '$server = stream_socket_server("tcp://127.0.0.1:{$port}", $errno, $errstr);', diff: 'added' },
  { text: 'if (!$server) {' },
  { text: '    exit("启动失败: {$errstr}\\n");' },
  { text: '}' },
  { text: 'echo "[Server] 监听 tcp://127.0.0.1:{$port} 成功，等待客人上门...\\n";' },
  { text: '' },
  { text: 'while ($conn = @stream_socket_accept($server, -1)) {', diff: 'added' },
  { text: '    $peer = stream_socket_get_name($conn, true);' },
  { text: '    echo "[Server] 接待新客人: {$peer}\\n";' },
  { text: '' },
  { text: '    // 死等这个客人发一行消息（没发回车前，程序卡死在这里！）' },
  { text: '    $msg = fgets($conn);', diff: 'modified' },
  { text: '    echo "[Server] 收到 {$peer} 消息: " . trim((string)$msg) . "\\n";' },
  { text: '' },
  { text: '    fwrite($conn, "Echo: " . $msg);' },
  { text: '    fclose($conn);' },
  { text: '    echo "[Server] 已送走 {$peer}\\n";' },
  { text: '}' },
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

export const Stage001: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });

  if (visual === 'hook-lego-plan') {
    const cards = [
      { title: '第 1 篇 · 网络发动机', sub: 'Socket → SelectLoop → Timer', tone: THEME.amber, active: true },
      { title: '第 2 篇 · 全双工连接层', sub: 'TcpConnection 异步缓冲与背压', tone: THEME.blue, active: false },
      { title: '第 3 篇 · 协议插件栈', sub: 'Frame / HTTP / WebSocket', tone: THEME.green, active: false },
      { title: '第 4 篇 · 多进程与 Epoll', sub: 'Master 监工 / Reload / EpollLoop', tone: THEME.amber, active: false },
      { title: '第 5 篇 · Fiber 协程与 TLS', sub: '同步写法跑异步 + HTTPS/WSS', tone: THEME.blue, active: false },
      { title: '第 6~7 篇 · 分布式网关实战', sub: 'Gateway + BusinessWorker + 弹幕项目', tone: THEME.red, active: false },
    ];

    return (
      <div
        style={{
          position: 'absolute',
          top: 104,
          left: 52,
          right: 52,
          bottom: 132,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          opacity: enter,
        }}
      >
        <LegoProgressStrip nodes={LEGO_NODES} subLabel="EP001 · 本集目标：10 行阻塞 Server" />

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '0.92fr 1.08fr',
            gap: 20,
          }}
        >
          <div
            style={{
              backgroundColor: THEME.cardBg,
              border: `3.5px solid ${THEME.dark}`,
              borderRadius: 20,
              padding: '26px 28px',
              boxShadow: '0 8px 0 rgba(44,37,32,0.14)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                🧱 分而治之 · 递归拼装路线图（112 集）
              </div>
              <div style={{ fontSize: 19, color: THEME.mutedText, marginBottom: 18 }}>
                每集只啃 1 个微功能（10~25 行真实代码），小组件递归组合成完整框架
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                }}
              >
                {cards.map((c, idx) => {
                  const pop = spring({
                    frame: Math.max(0, localFrame - idx * 5),
                    fps,
                    config: SPRING_POP,
                  });
                  return (
                    <div
                      key={c.title}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        backgroundColor: c.active ? THEME.amberBg : THEME.softBg,
                        border: `3px solid ${c.active ? THEME.amber : THEME.dark}`,
                        transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
                        opacity: pop,
                      }}
                    >
                      <div style={{ fontSize: 19, fontWeight: 800, color: c.active ? THEME.amber : THEME.dark }}>
                        {c.active ? '🔥 ' : ''}{c.title}
                      </div>
                      <div style={{ fontSize: 15, color: THEME.mutedText, marginTop: 4 }}>
                        {c.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                backgroundColor: THEME.greenBg,
                border: `2.5px solid ${THEME.green}`,
                borderRadius: 12,
                padding: '12px 18px',
                fontSize: 18,
                fontWeight: 800,
                color: THEME.green,
              }}
            >
              ✅ 所有终端输出与 QPS 数据均来自真实 PHP 8.5 实机执行快照
            </div>
          </div>

          <IDECodePanel
            fileName="ep01/server.php"
            lines={SERVER_LINES.slice(0, 9)}
            typeRange={{
              fromLine: 1,
              toLine: 9,
              localFrame,
              startFrame: 18,
              framesPerLine: 18,
            }}
            callout={{ line: 4, text: '今日起点：第 1 个监听门', tone: 'amber' }}
            fontSize={16}
            lineHeight={30}
          />
        </div>
      </div>
    );
  }

  // Standard 3-pane coding layout for shots 2..5
  const getIdeProps = () => {
    if (visual === 'code-listen') {
      return {
        lines: SERVER_LINES.slice(0, 9),
        focusLines: [5, 9],
        typeRange: { fromLine: 4, toLine: 9, localFrame, startFrame: 6, framesPerLine: 16 },
        callout: { line: 6, text: '↑ 向内核申请 3 号监听 Socket', tone: 'green' as const },
      };
    }
    if (visual === 'code-accept') {
      return {
        lines: SERVER_LINES,
        focusLines: [11, 16, 19, 20],
        typeRange: { fromLine: 11, toLine: 22, localFrame, startFrame: 6, framesPerLine: 14 },
        callout: { line: 16, text: '⚠️ 隐患：死等客人发换行', tone: 'amber' as const },
      };
    }
    if (visual === 'crash-demo') {
      return {
        lines: SERVER_LINES,
        focusLines: [16],
        callout: { line: 16, text: '🔒 唯一进程正卡死在此行！', tone: 'red' as const },
      };
    }
    return {
      lines: [
        ...SERVER_LINES.slice(0, 8),
        { text: '// 下集 EP002：一行代码关掉阻塞开关！', diff: 'added' as const },
        { text: 'stream_set_blocking($server, false);', diff: 'added' as const },
        ...SERVER_LINES.slice(8, 17),
      ],
      focusLines: [9, 10],
      callout: { line: 10, text: '下集破局：非阻塞 + 空转惨案', tone: 'blue' as const },
    };
  };

  const getTerminals = (): TerminalPaneData[] => {
    if (visual === 'code-listen') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · Server',
          status: { label: 'LISTENING 🟢', tone: 'green' },
          command: 'php server.php',
          commandTypeFrames: [8, 28],
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'success', appearAtFrame: 42 },
          ],
        },
        {
          id: 't2',
          title: 'Terminal 2 · 等待测试',
          status: { label: 'READY', tone: 'blue' },
          localFrame,
          lines: [
            { text: '# 准备模拟双客户端并发连入 19001 端口...', tone: 'info', appearAtFrame: 20 },
          ],
        },
      ];
    }

    if (visual === 'code-accept') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · Server',
          status: { label: 'WAITING ACCEPT', tone: 'blue' },
          command: 'php server.php',
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 10 },
            { text: '// 调用 stream_socket_accept($server, -1) 进入内核等待...', tone: 'normal', appearAtFrame: 35 },
          ],
        },
      ];
    }

    if (visual === 'crash-demo') {
      return [
        {
          id: 't1',
          title: 'Terminal 1 · Server (单进程)',
          status: { label: 'BLOCKED ON A 🔒', tone: 'red' },
          command: 'PORT=19001 php server.php',
          commandTypeFrames: [0, 12],
          localFrame,
          lines: [
            { text: snapshot.serverOutput[0], tone: 'info', appearAtFrame: 15 },
            { text: snapshot.serverOutput[1], tone: 'warn', appearAtFrame: 45 },
            { text: '⏳ 卡在 fgets($connA)，完全无视正在敲门的客人 B...', tone: 'error', appearAtFrame: 85 },
            { text: snapshot.serverOutput[2], tone: 'success', appearAtFrame: 260 },
            { text: snapshot.serverOutput[4], tone: 'info', appearAtFrame: 295 },
            { text: snapshot.serverOutput[5], tone: 'success', appearAtFrame: 320 },
          ],
        },
        {
          id: 't2',
          title: 'Terminal 2 · 客人 A',
          status: { label: localFrame < 245 ? 'IDLE 1.2s 😴' : 'SENT ✅', tone: localFrame < 245 ? 'amber' : 'green' },
          command: 'nc 127.0.0.1 19001',
          commandTypeFrames: [20, 38],
          localFrame,
          lines: [
            { text: snapshot.clientA.idleAction, tone: 'warn', appearAtFrame: 50 },
            { text: `> ${snapshot.clientA.send}`, tone: 'cmd', appearAtFrame: 245 },
            { text: snapshot.clientA.reply, tone: 'success', appearAtFrame: 275 },
          ],
        },
        {
          id: 't3',
          title: 'Terminal 3 · 客人 B',
          status: {
            label: localFrame < 285 ? `BLOCKED ${snapshot.clientB.blockedWaitMs}ms ⏱️` : 'DELAYED REPLY',
            tone: localFrame < 285 ? 'red' : 'amber',
          },
          command: 'nc 127.0.0.1 19001',
          commandTypeFrames: [65, 82],
          localFrame,
          lines: [
            { text: `> ${snapshot.clientB.send}`, tone: 'cmd', appearAtFrame: 92 },
            { text: `❌ 1.2s 超时无响应！被客人 A 活活堵死 (${snapshot.clientB.blockedWaitMs}ms)`, tone: 'error', appearAtFrame: 145 },
            { text: `迟到的回音: ${snapshot.clientB.delayedReplyAfterAFinished}`, tone: 'warn', appearAtFrame: 330 },
          ],
        },
      ];
    }

    return [
      {
        id: 't1',
        title: '实测数据复盘 · EP01 vs 下集 EP02 预告',
        status: { label: 'NEXT: EP002', tone: 'amber' },
        localFrame,
        lines: [
          { text: `EP01 实测客人 B 干等耗时: ${snapshot.clientB.blockedWaitMs} ms (timedOut=true)`, tone: 'error', appearAtFrame: 10 },
          { text: '根因: stream_socket_accept / fgets 默认阻塞模式', tone: 'warn', appearAtFrame: 35 },
          { text: 'EP02 剧透: 加上 stream_set_blocking(false) 后 ->', tone: 'info', appearAtFrame: 70 },
          { text: '[CPU 警报] 0.5 秒空转了 73,293 次 while 循环！', tone: 'error', appearAtFrame: 110 },
        ],
      },
    ];
  };

  const renderXRay = () => {
    if (visual === 'code-listen') {
      return (
        <XRayInspector title="🔬 内核 X-Ray · 进程 FD 文件表" badge="FD #3 LISTEN" badgeTone="green">
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
            {[
              { fd: 'FD 0', name: 'STDIN', sub: '键盘', active: false },
              { fd: 'FD 1', name: 'STDOUT', sub: '屏幕', active: false },
              { fd: 'FD 2', name: 'STDERR', sub: '报错', active: false },
              { fd: 'FD 3', name: 'LISTEN', sub: ':19001', active: true },
            ].map((item) => (
              <div
                key={item.fd}
                style={{
                  flex: 1,
                  padding: '12px 10px',
                  borderRadius: 12,
                  textAlign: 'center',
                  backgroundColor: item.active ? THEME.greenBg : THEME.softBg,
                  border: `2.5px solid ${item.active ? THEME.green : THEME.dark}`,
                }}
              >
                <div style={{ fontFamily: THEME.fontMono, fontSize: 18, fontWeight: 800, color: item.active ? THEME.green : THEME.dark }}>
                  {item.fd}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: THEME.mutedText }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 16, color: THEME.mutedText, textAlign: 'center', fontWeight: 600 }}>
            stream_socket_server() 向内核申请到了 3 号监听门牌号
          </div>
        </XRayInspector>
      );
    }

    if (visual === 'crash-demo') {
      return (
        <XRayInspector title="🔬 内核 X-Ray · 阻塞调用栈现场" badge="进程卡死 🔒" badgeTone="red">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 12,
                backgroundColor: THEME.redBg,
                border: `2.5px solid ${THEME.red}`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: THEME.red }}>
                PHP 唯一进程 (PID)
              </div>
              <div style={{ fontFamily: THEME.fontMono, fontSize: 14, marginTop: 6, color: THEME.dark }}>
                停在: fgets(FD #4 客人A)
              </div>
              <div style={{ fontSize: 14, marginTop: 4, color: THEME.mutedText }}>
                等待状态: 内核睡眠 (S+)
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: THEME.red }}>⛔</div>
            <div
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 12,
                backgroundColor: THEME.amberBg,
                border: `2.5px solid ${THEME.amber}`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: THEME.amber }}>
                门外 TCP 队列
              </div>
              <div style={{ fontFamily: THEME.fontMono, fontSize: 14, marginTop: 6, color: THEME.dark }}>
                客人 B: 已连入但没人 accept!
              </div>
              <div style={{ fontSize: 14, marginTop: 4, color: THEME.red, fontWeight: 700 }}>
                干等 {snapshot.clientB.blockedWaitMs}ms 超时
              </div>
            </div>
          </div>
        </XRayInspector>
      );
    }

    return (
      <XRayInspector title="🔬 内核 X-Ray · 单线程接客流程" badge="阻塞模型" badgeTone="amber">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 17, fontWeight: 800 }}>
          <div style={{ padding: '10px 16px', borderRadius: 10, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}` }}>
            accept() 迎客
          </div>
          <span>→</span>
          <div style={{ padding: '10px 16px', borderRadius: 10, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, color: THEME.red }}>
            fgets() 死等
          </div>
          <span>→</span>
          <div style={{ padding: '10px 16px', borderRadius: 10, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}` }}>
            fwrite() + close()
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: THEME.mutedText, textAlign: 'center', fontWeight: 600 }}>
          只要中间 fgets() 没收到回车，后面的 accept() 永远轮不到执行！
        </div>
      </XRayInspector>
    );
  };

  const ideProps = getIdeProps();

  return (
    <div
      style={{
        position: 'absolute',
        top: 104,
        left: 52,
        right: 52,
        bottom: 132,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <LegoProgressStrip
        nodes={LEGO_NODES}
        subLabel="EP001 · 阻塞 Server 与并发卡死"
      />

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1040px 1fr',
          gap: 18,
          minHeight: 0,
        }}
      >
        <IDECodePanel
          fileName="ep01/server.php"
          lines={ideProps.lines}
          focusLines={ideProps.focusLines}
          typeRange={ideProps.typeRange}
          callout={ideProps.callout}
          fontSize={18}
          lineHeight={28}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            minHeight: 0,
          }}
        >
          <div style={{ flex: 1.35, minHeight: 0 }}>
            <MultiTerminalPanel panes={getTerminals()} />
          </div>
          <div style={{ flex: 0.78, minHeight: 0 }}>
            {renderXRay()}
          </div>
        </div>
      </div>
    </div>
  );
};
