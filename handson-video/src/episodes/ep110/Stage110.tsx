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
  { text: '// 1. Throwable 全局兜底 + JSON 结构化日志:' },
  { text: 'try { dispatch($req); } catch (\\Throwable $e) {' },
  { text: "    error_log(json_encode(['level' => 'ERR', 'msg' => $e->getMessage()]));", diff: 'added' },
  { text: '}' },
  { text: '' },
  { text: '// 2. /etc/systemd/system/modern-worker.service:' },
  { text: '[Service]' },
  { text: 'ExecStart=/usr/bin/php /opt/app/server.php start', diff: 'added' },
  { text: 'ExecReload=/usr/bin/php /opt/app/server.php reload' },
  { text: 'Restart=always', diff: 'added' },
  { text: 'LimitNOFILE=1048576', diff: 'added' },
];

const LEGO_NODES = [
  { label: '1~5 单机全能版', state: 'done' as const },
  { label: '6.1 Channel邮局', state: 'done' as const },
  { label: '6.2 Gateway集群', state: 'done' as const },
  { label: '7.1 弹幕大实战', state: 'done' as const },
  { label: '7.2 压测总收官', state: 'active' as const },
];

export const Stage110: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · Throwable 隔离与 systemd 守护配置校验',
      status: { label: 'PROD READY ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: snapshot.output.map((line: string, i: number) => ({
        text: line,
        tone: i === 0 ? 'warn' : 'success',
        appearAtFrame: 14 + i * 26,
      })),
    },
  ];

  const xray = (
    <XRayInspector title="🔬 机房级 7×24 无人值守三道保险" badge="断电自启 + 百万FD" badgeTone="blue">
      <div style={{ display: 'flex', gap: 10, fontFamily: THEME.fontMono, fontSize: 14, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.amberBg, border: `2px solid ${THEME.amber}`, textAlign: 'center' }}>
          Throwable 接住单请求错误防崩溃
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.blueBg, border: `2px solid ${THEME.blue}`, textAlign: 'center' }}>
          LimitNOFILE=1048576 解锁百万连接
        </div>
        <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          Restart=always 断电秒级自起
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP110 · 异常日志与 systemd 托管"
      fileName="modern-worker.service"
      lines={LINES}
      startLineNumber={1}
      focusLines={visual === 'json-log' ? [2, 3] : [8, 9, 10, 11]}
      callout={
        visual === 'json-log'
          ? { line: 4, text: '绝不因一条脏数据把整条 Worker 进程拖死', tone: 'amber' }
          : { line: 7, text: '突破系统默认 1024 FD 限制，放开 Epoll 手脚', tone: 'green' }
      }
      fontSize={15}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
