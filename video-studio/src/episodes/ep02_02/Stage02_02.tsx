import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage02_02: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({
    frame: Math.max(0, localFrame - 12),
    fps,
    config: SPRING_POP,
  });

  if (visual === 'daemon-detach') {
    return (
      <StageContainer
        banner="守护进程脱离终端：黑窗口关掉了，业务里成千上万行 echo / var_dump 该往哪流？"
        conceptPill="Daemon 脱离终端困境"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            opacity: enter,
          }}
        >
          <BoxCard title="PHP 业务进程" accent="blue" width={360} minHeight={320}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              代码里写了大量：<br />
              <code style={{ fontFamily: THEME.fontMono }}>echo "收到消息\n";</code><br />
              底层只认死理：<code style={{ fontFamily: THEME.fontMono }}>write(1, ...)</code>
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={220} label="FD 1 断管！" color={THEME.red} progress={pop} blocked />
          <BoxCard
            title="已关闭的 XShell 终端"
            accent="red"
            width={440}
            minHeight={320}
            badge="终端窗口已退出"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              原来的 <code style={{ fontFamily: THEME.fontMono }}>/dev/pts/0</code> 已销毁，如果能不改一行业务代码，让 FD 1 偷偷流向 <code style={{ fontFamily: THEME.fontMono }}>workerman.log</code> 就完美了！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'resetstd-magic') {
    const step = Math.min(2, Math.floor(localFrame / 55));
    const slots = [
      { fd: 'FD 0', name: 'STDIN (/dev/pts/0)' },
      { fd: 'FD 1', name: step === 0 ? 'STDOUT (旧终端)' : step === 1 ? '🔥 空缺中 (刚被 fclose 拔掉!)' : '✅ workerman.log (精准抢占 1 号位!)' },
      { fd: 'FD 2', name: step < 2 ? 'STDERR' : '✅ workerman.log / 占位' },
    ];
    return (
      <StageContainer
        banner="偷天换日 resetStd()：fclose(STDOUT/STDERR) → fopen 日志文件自动霸占 FD 1！"
        conceptPill="最小空位重定向魔术"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="04_magic_reset_std.php"
            width={540}
            lines={[
              '// 1. 强行拔掉 1 号与 2 号旧管子：',
              'fclose(STDOUT);',
              'fclose(STDERR);',
              '// 2. 再打开日志文件，抢占最小空缺 1 号位！',
              '$log = fopen("workerman.log", "w+");',
              'echo "这句普通 echo 自动写入了日志！\\n";',
            ]}
            activeLine={step === 0 ? 1 : step === 1 ? 1 : 4}
          />
          <BoxCard
            title="进程 FD 描述符表实时变化"
            accent={step === 2 ? 'green' : 'orange'}
            width={580}
            minHeight={350}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {slots.map((s) => (
                <div
                  key={s.fd}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: '#fff',
                    border: `2px solid ${THEME.gridColor}`,
                    fontFamily: THEME.fontMono,
                    fontSize: 19,
                  }}
                >
                  <span style={{ fontWeight: 800, color: THEME.blue }}>{s.fd}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'static-gc-trap') {
    return (
      <StageContainer
        banner="Workerman/Worker.php#L1520 神级细节：必须把 $stdOutStream 存进静态属性防 GC！"
        conceptPill="static::$outputStream 防 GC"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="Workerman/src/Worker.php (resetStd)"
            width={680}
            lines={[
              '$stdOutStream = fopen(static::$stdoutFile, "a");',
              'if ($stdOutStream !== false) {',
              '    // 💥 如果不挂载到静态属性上：',
              '    // resetStd() 函数刚一结束，局部变量 refcount=0 销毁，',
              '    // PHP 立刻自动替你 fclose 关掉 1 号管子！',
              '    static::$outputStream = $stdOutStream;',
              '}',
            ]}
            activeLine={5}
          />
          <BoxCard title="保命静态引用" accent="orange" width={420} minHeight={330}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              只有挂载在 <code style={{ fontFamily: THEME.fontMono }}>Worker::$outputStream</code> 静态类属性上，这根 1 号管子才能伴随进程永久存活不灭！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'stdin-blocking') {
    const waiting = localFrame < 90;
    return (
      <StageContainer
        banner="0 号管子阻塞实验：没数据时进程被内核移出 CPU 进入睡眠队列，数据一到瞬间唤醒！"
        conceptPill="Blocking I/O 休眠与唤醒"
        conceptColor={waiting ? THEME.orange : THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <TerminalPanel
            title="04b_stdin_blocking.php 实测"
            width={680}
            localFrame={localFrame}
            stepFrames={26}
            lines={[
              { text: '(sleep 1; echo "你好！") | php 04b_stdin_blocking.php', tone: 'cmd' },
              { text: '即将执行: fread(STDIN, 1024)...', tone: 'dim' },
              { text: '⏳ [0.0s ~ 1.0s] 内核队列没水，进程被操作系统安全挂起 (0% CPU)', tone: 'warn' },
              { text: '🎉 拿到数据: [你好！]，共等待阻塞了 1.003 秒！', tone: 'ok' },
            ]}
          />
          <BoxCard
            title="为什么不占 CPU？"
            subtitle={waiting ? 'State: S (Sleeping)' : 'State: R (Running!)'}
            accent={waiting ? 'orange' : 'green'}
            width={420}
            minHeight={330}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              阻塞读不是在死循环“问有没有水”，而是把进程从 CPU 调度队列彻底摘下来，等内核收到硬件中断后再喊醒你！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'fd-leak-1024') {
    const count = Math.min(1024, Math.floor(interpolate(localFrame, [15, 115], [3, 1024])));
    return (
      <StageContainer
        banner="05_fd_leak_limit.php：常驻进程只 fopen / accept 不 fclose → 撞穿 ulimit -n 1024！"
        conceptPill="FD 泄漏与 Too many open files"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard
            title="进程 FD 编号耗尽进度"
            subtitle={`已占号牌: ${count} / 1024`}
            accent="red"
            width={500}
            minHeight={350}
            badge="ulimit -n 1024"
          >
            <div style={{ fontSize: 64, fontFamily: THEME.fontMono, fontWeight: 800, color: THEME.red, textAlign: 'center', margin: '18px 0' }}>
              {count} / 1024
            </div>
            <CodeHint text="还剩 0 个可用句柄 -> 整个进程彻底废掉！" highlight />
          </BoxCard>
          <TerminalPanel
            title="泄漏复现现场"
            width={620}
            localFrame={localFrame}
            stepFrames={20}
            lines={[
              { text: 'for ($i=0; $i<2000; $i++) $pool[] = fopen(...);', tone: 'cmd' },
              { text: '[成功打开] 第 1 个 -> FD = 3 ... 第 1021 个 -> FD = 1023', tone: 'ok' },
              { text: '💥 第 1022 次打开彻底崩溃！', tone: 'err' },
              { text: 'Warning: fopen(): Too many open files!', tone: 'err' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'torn-write') {
    return (
      <StageContainer
        banner="多进程写文件撕裂 (Torn Write)：4 个 Worker 同时写日志，文字在硬盘上乱套穿插！"
        conceptPill="并发写入踩踏"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard title="Worker A & Worker B" accent="orange" width={420} minHeight={340}>
            <div style={{ fontSize: 20, lineHeight: 1.75 }}>
              <div>• Worker A 写入：<code style={{ fontFamily: THEME.fontMono }}>[2026] Worker A </code> → CPU 时间片到被切走！</div>
              <div>• Worker B 抢占 CPU 写入：<code style={{ fontFamily: THEME.fontMono }}>[2026] Worker B ok\n</code></div>
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={120} label="混写!" color={THEME.red} progress={pop} />
          <TerminalPanel
            title="workerman.log 惨不忍睹的现状"
            width={560}
            localFrame={localFrame}
            stepFrames={22}
            lines={[
              { text: '[2026] Worker A [2026] Worker B ok', tone: 'err' },
              { text: 'handle request done!   <- 半句话跟别人拼到同一行了！', tone: 'warn' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'flock-ex-queue') {
    return (
      <StageContainer
        banner="06_flock_concurrency.php：flock($fp, LOCK_EX) 排他锁让并发进程严格排队写入！"
        conceptPill="flock LOCK_EX 排队保护"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="安全写入三步曲"
            width={500}
            lines={[
              '$fp = fopen("test.log", "a+");',
              'flock($fp, LOCK_EX); // 抢占独占锁，抢不到就排队睡',
              'fwrite($fp, "=== 安全完整写入 ===\\n");',
              'flock($fp, LOCK_UN); // 解锁放行下一位！',
            ]}
            activeLine={1}
          />
          <TerminalPanel
            title="06_flock_concurrency.php 真实跑盘"
            width={620}
            localFrame={localFrame}
            stepFrames={20}
            lines={[
              { text: '[父进程 290] 🔒 抢锁成功！写入并保持 1 秒...', tone: 'ok' },
              { text: '  [子进程 403] 也来写日志，尝试获取锁...(排队挂起)', tone: 'warn' },
              { text: '[父进程 290] 🔓 释放锁 (LOCK_UN)', tone: 'dim' },
              { text: '  [子进程 403] 终于排队等到了锁！(阻塞 0.9s 后完整追加)', tone: 'ok' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="Workerman 源码神用：LOCK_EX|LOCK_NB 非阻塞锁守护唯一 Master，防运维手抖双开！"
      conceptPill="Worker::lock() 单例守护"
      conceptColor={THEME.blue}
      localFrame={localFrame}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          opacity: enter,
        }}
      >
        <CodeBlockPanel
          title="Workerman/src/Worker.php (lock & log)"
          width={680}
          lines={[
            '// 1. Worker::lock() 防重复启动两个 Master：',
            '$fd = fopen($pidFile . ".lock", "a+");',
            'flock($fd, LOCK_EX | LOCK_NB); // 抢不到立刻 false，不死等！',
            '',
            '// 2. Worker::log() 多 Worker 安全并发写日志：',
            'file_put_contents($logFile, $msg, FILE_APPEND | LOCK_EX);',
          ]}
          activeLine={2}
        />
        <BoxCard title="LOCK_NB 妙处何在？" accent="green" width={420} minHeight={340}>
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            <div>• 写日志要排队等（所以用阻塞 <code style={{ fontFamily: THEME.fontMono }}>LOCK_EX</code>）</div>
            <div>• 检测双开启动不能傻等！要用 <code style={{ fontFamily: THEME.fontMono }}>LOCK_NB</code> 非阻塞锁，已有 Master 在跑立刻报错退出！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
