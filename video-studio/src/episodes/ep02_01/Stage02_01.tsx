import React from 'react';
import { spring } from 'remotion';
import { CodeHint, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

const FdCell: React.FC<{
  idx: number;
  label: string;
  tone?: 'std' | 'file' | 'free' | 'err';
}> = ({ idx, label, tone = 'std' }) => {
  const styles = {
    std: { bg: THEME.blueBg, border: THEME.blue },
    file: { bg: THEME.orangeBg, border: THEME.orange },
    free: { bg: '#f3f1ea', border: '#bbb' },
    err: { bg: THEME.redBg, border: THEME.red },
  }[tone];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 16px',
        borderRadius: 12,
        border: `3px solid ${styles.border}`,
        backgroundColor: styles.bg,
        fontFamily: THEME.fontMono,
        fontSize: 21,
        fontWeight: 800,
      }}
    >
      <span
        style={{
          backgroundColor: THEME.dark,
          color: '#fff',
          padding: '3px 11px',
          borderRadius: 8,
        }}
      >
        FD {idx}
      </span>
      <span>{label}</span>
    </div>
  );
};

export const Stage02_01: React.FC<StageProps> = ({ visual, localFrame, fps }) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 22, fps, config: SPRING_POP });
  const pulse = (localFrame % 42) / 42;

  if (visual === 'born-three-fds') {
    return (
      <StageContainer
        banner="进程刚出生不打开任何文件，肚子里也自带 0, 1, 2 三根管子！"
        conceptPill="STDIN (0) | STDOUT (1) | STDERR (2) 全指向当前终端 /dev/pts/x"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="内核 FD 描述符表" subtitle="/proc/PID/fd" accent="blue" width={540}>
            <FdCell idx={0} label="STDIN  -> /dev/pts/0 (键盘)" tone="std" />
            <FdCell idx={1} label="STDOUT -> /dev/pts/0 (屏幕)" tone="std" />
            <FdCell idx={2} label="STDERR -> /dev/pts/0 (报错)" tone="std" />
          </BoxCard>
          <TerminalPanel
            title="ls -l /proc/PID/fd"
            lines={[
              { text: '$ ls -l /proc/1920/fd', tone: 'cmd' },
              { text: '0 -> /dev/pts/0', tone: 'ok' },
              { text: '1 -> /dev/pts/0', tone: 'ok' },
              { text: '2 -> /dev/pts/0', tone: 'ok' },
            ]}
            localFrame={localFrame}
            stepFrames={16}
            width={580}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'stdout-stderr') {
    return (
      <StageContainer
        banner="为什么屏幕要分 1 号和 2 号两根管子？重定向分流实验！"
        conceptPill="> bill.txt 只抓 1 号管子 (STDOUT)，2 号报错仍显示在屏幕"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="02_stdout_vs_stderr.php"
            lines={[
              'fwrite(STDOUT, "账单: 100元\\n");',
              'fwrite(STDERR, "警告: 余额不足!\\n");',
            ]}
            activeLine={localFrame > 50 ? 1 : 0}
            width={500}
          />
          <AnimatedFlowArrow width={170} label="> bill.txt" color={THEME.dark} progress={enter} pulse={pulse} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <BoxCard title="bill.txt 账单文件 (接走 FD 1)" accent="green" width={460}>
              <CodeHint text="账单: 100元  (干净无污染!)" highlight />
            </BoxCard>
            <BoxCard title="当前屏幕 (仍保留 FD 2)" accent="red" width={460}>
              <CodeHint text="警告: 余额不足!  (立刻警报!)" />
            </BoxCard>
          </div>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'ghost-terminal') {
    return (
      <StageContainer
        banner="黑客实验：终端也是文件，隔空向另一个进程的 FD 1 写字！"
        conceptPill="一切皆文件：往 /proc/PID/fd/1 写字 = 直接打印到对方屏幕"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <TerminalPanel
            title="终端 B（隔空发信）"
            lines={[
              { text: '$ echo "我是幽灵!" > /proc/1920/fd/1', tone: 'cmd' },
              { text: '# 写入目标进程的 1 号文件描述符', tone: 'dim' },
            ]}
            localFrame={localFrame}
            stepFrames={20}
            width={540}
          />
          <AnimatedFlowArrow width={170} label="直通 /dev/pts/0" color={THEME.orange} progress={enter} pulse={pulse} />
          <TerminalPanel
            title="终端 A（PID 1920 正在 sleep）"
            lines={[
              { text: '$ php 01b_ghost_terminal.php', tone: 'cmd' },
              { text: '我是幽灵!', tone: 'warn' },
            ]}
            localFrame={localFrame}
            stepFrames={28}
            width={500}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'fopen-fd3') {
    return (
      <StageContainer
        banner="fopen() 打开硬盘文件拿到几号牌？内核数组的下一个空位：3！"
        conceptPill="PHP Stream Resource 脱掉马甲后，在内核里就是一个整数 FD = 3"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <CodeBlockPanel
            title="打开普通文件"
            lines={[
              '$fp = fopen("data.txt", "w+");',
              'echo (int)$fp; // 底层对应 FD 3',
            ]}
            activeLine={0}
            width={490}
          />
          <BoxCard title="内核 FD 描述符表" subtitle="紧凑数组下标" accent="orange" width={620}>
            <FdCell idx={0} label="STDIN" tone="std" />
            <FdCell idx={1} label="STDOUT" tone="std" />
            <FdCell idx={2} label="STDERR" tone="std" />
            <FdCell idx={3} label="data.txt (新分配!)" tone="file" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'lowest-fd') {
    const phase = localFrame > 70 ? 2 : localFrame > 35 ? 1 : 0;
    return (
      <StageContainer
        banner="最小可用编号原则：关掉 3 号再开新文件，新文件拿几号？"
        conceptPill="永远抢占当前最小的空闲座位：3 号！而非递增给 5 号"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="03_lowest_fd_reuse.php"
            lines={[
              '$a = fopen("a.txt", "w"); // FD 3',
              '$b = fopen("b.txt", "w"); // FD 4',
              'fclose($a);               // 释放 FD 3!',
              '$c = fopen("c.txt", "w"); // 抢回 FD 3!',
            ]}
            activeLine={phase === 0 ? 1 : phase === 1 ? 2 : 3}
            width={540}
          />
          <BoxCard title="FD 数组座位变化" subtitle={phase === 0 ? '打开 a, b' : phase === 1 ? '关掉 a 腾空' : 'c 抢占 3 号'} accent="blue" width={580}>
            <FdCell idx={0} label="STDIN / 1 STDOUT / 2 STDERR" tone="std" />
            <FdCell
              idx={3}
              label={phase === 0 ? 'a.txt' : phase === 1 ? '(空位! 待抢座)' : 'c.txt (精准抢回 3 号!)'}
              tone={phase === 1 ? 'free' : 'file'}
            />
            <FdCell idx={4} label="b.txt" tone="file" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'fd-leak') {
    const count = Math.min(1024, Math.floor(localFrame * 14));
    return (
      <StageContainer
        banner="只管 fopen 不管 fclose：FD 涨到 1024 当场爆仓！"
        conceptPill="FD 泄漏撞穿 ulimit -n (1024) → Too many open files"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <CodeBlockPanel
            title="05_fd_leak_limit.php"
            lines={[
              '$leaks = [];',
              'while (true) {',
              '    $leaks[] = fopen("/dev/null", "r");',
              '    // 忘记 fclose() -> 句柄持续泄露！',
              '}',
            ]}
            activeLine={2}
            width={540}
          />
          <BoxCard title="已占 FD 数量" subtitle="ulimit -n = 1024" accent="red" width={540} badge={count >= 1024 ? '进程暴毙!' : `${count} / 1024`}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 36, fontWeight: 800, color: THEME.red, textAlign: 'center' }}>
              FD: {count} / 1024
            </div>
            <CodeHint text="Warning: failed to open stream: Too many open files" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'reset-std') {
    const stage2 = pop > 0.25;
    return (
      <StageContainer
        banner="破译 Workerman::resetStd()：为什么关闭 0,1,2 再开 3 次黑洞？"
        conceptPill="利用最小可用原则：让 /dev/null 或日志文件精准重占 0, 1, 2"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="Workerman/Worker.php :: resetStd()"
            lines={[
              'fclose(STDIN);  // 释放 FD 0',
              'fclose(STDOUT); // 释放 FD 1',
              'fclose(STDERR); // 释放 FD 2',
              "fopen('/dev/null', 'r'); // 抢回 FD 0!",
              "fopen($stdoutFile, 'a'); // 抢回 FD 1!",
              "fopen($stdoutFile, 'a'); // 抢回 FD 2!",
            ]}
            activeLine={stage2 ? 4 : 1}
            width={620}
          />
          <BoxCard title="守护进程后台不崩溃秘诀" accent="green" width={540}>
            <FdCell idx={0} label={stage2 ? '/dev/null (安全黑洞)' : '(已关闭)'} tone={stage2 ? 'file' : 'free'} />
            <FdCell idx={1} label={stage2 ? 'worker.log (echo 自动写日志!)' : '(已关闭)'} tone={stage2 ? 'file' : 'free'} />
            <FdCell idx={2} label={stage2 ? 'worker.log (报错自动写日志!)' : '(已关闭)'} tone={stage2 ? 'file' : 'free'} />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'stdin-block') {
    return (
      <StageContainer
        banner="读 0 号键盘管子为什么会卡住？阻塞 I/O (Blocking) 初体验"
        conceptPill="管中无数据时，进程在内核等待队列睡大觉，直到你敲下回车"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="04b_stdin_blocking.php"
            lines={[
              'echo "请敲一行字...\\n";',
              '$line = fread(STDIN, 1024); // 卡死在这里！',
              'echo "你输入了: $line";',
            ]}
            activeLine={1}
            width={580}
          />
          <BoxCard title="内核 read(0, ...) 状态" subtitle="管子是空的" accent="orange" width={520} badge="Zzz 卡住等待">
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              只要你不敲键盘，管子里就没水；没拿到数据之前死也不往下走一步！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // flock
  return (
    <StageContainer
      banner="多进程写同一份日志字迹穿插？用 flock 加锁排队！一切皆文件！"
      conceptPill="flock($fp, LOCK_EX) 并发独占锁 | 统一 FD 读写一切硬件"
      conceptColor={THEME.dark}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
        <CodeBlockPanel
          title="06_flock_concurrency.php"
          lines={[
            'flock($fp, LOCK_EX); // 拿独占锁排队写',
            'fwrite($fp, "[PID:$pid] 日志内容\\n");',
            'flock($fp, LOCK_UN); // 写完放锁',
          ]}
          activeLine={0}
          width={580}
        />
        <BoxCard title="第 2 章内功大一统" accent="green" width={540}>
          <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.65 }}>
            <div>• 键盘(0)、屏幕(1)、硬盘文件(3) 全是整数 FD</div>
            <div>• 下一章开始，用 0 号文件推导出 Workerman 的灵魂 $onMessage！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
