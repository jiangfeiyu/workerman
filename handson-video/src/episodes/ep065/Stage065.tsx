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
  { text: 'public static function acquirePidLock(string $pidFile): mixed' },
  { text: '{' },
  { text: "    $fp = fopen($pidFile, 'c+'); // 注意用 c+ 不清空原文件!" },
  { text: '    if (!flock($fp, LOCK_EX | LOCK_NB)) {', diff: 'added' },
  { text: '        fclose($fp);' },
  { text: '        return false; // 锁已被活着的老 Master 霸占!', diff: 'removed' },
  { text: '    }' },
  { text: '    ftruncate($fp, 0);' },
  { text: '    fwrite($fp, (string)getmypid()); // 写入当前 Master PID', diff: 'added' },
  { text: '    fflush($fp);' },
  { text: '    return $fp; // 返回句柄保活，进程崩溃内核会自动解锁!', diff: 'added' },
  { text: '}' },
];

const LEGO_NODES = [
  { label: '1~3 内核与协议', state: 'done' as const },
  { label: '4.1 多进程监工', state: 'done' as const },
  { label: '4.2 守护与CLI', state: 'active' as const },
  { label: '4.3 热更新看板', state: 'todo' as const },
  { label: '4.4 Epoll核动力', state: 'todo' as const },
];

export const Stage065: React.FC<StageProps> = ({ visual, localFrame }) => {
  const terminals: TerminalPaneData[] = [
    {
      id: 't1',
      title: 'Terminal 1 · master.pid 排他文件锁防重复启动实测',
      status: { label: 'PID LOCKED ✅', tone: 'green' },
      command: 'php verify.php',
      localFrame,
      lines: [
        { text: snapshot.output[0], tone: 'success', appearAtFrame: 14 },
        { text: snapshot.output[1], tone: 'error', appearAtFrame: 42 },
      ],
    },
  ];

  const xray = (
    <XRayInspector title="🔬 为什么 flock 比只判断 file_exists(pid) 可靠一万倍？" badge="内核自动解锁" badgeTone="blue">
      <div style={{ display: 'flex', gap: 12, fontFamily: THEME.fontMono, fontSize: 15, fontWeight: 700 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.redBg, border: `2px solid ${THEME.red}`, textAlign: 'center' }}>
          只看文件存在: 进程被 kill -9 后死锁卡死 ❌
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, backgroundColor: THEME.greenBg, border: `2px solid ${THEME.green}`, textAlign: 'center' }}>
          flock(LOCK_EX|LOCK_NB): 崩溃内核秒回收锁 ✅
        </div>
      </div>
    </XRayInspector>
  );

  return (
    <HandsOnLayout
      legoNodes={LEGO_NODES}
      subLabel="EP065 · master.pid 文件锁"
      fileName="CommandRunner.php"
      lines={LINES}
      startLineNumber={12}
      focusLines={visual === 'dup-start' ? [14, 15, 17] : [19, 20, 22]}
      callout={
        visual === 'dup-start'
          ? { line: 16, text: '非阻塞抢不到锁立刻报错退出，严防双开', tone: 'red' }
          : { line: 23, text: '切记留住 $fp 变量，丢了句柄锁立刻失效！', tone: 'green' }
      }
      fontSize={16}
      lineHeight={25}
      terminals={terminals}
      xray={xray}
    />
  );
};
