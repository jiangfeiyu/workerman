import React from 'react';
import { spring } from 'remotion';
import { CodeHint, CpuGauge, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage00_01: React.FC<StageProps> = ({ visual, localFrame, fps }) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 24, fps, config: SPRING_POP });
  const pulse = (localFrame % 42) / 42;

  if (visual === 'hello-echo') {
    return (
      <StageContainer
        banner="全课程第一行代码：PHP 怎么让显示器上的像素发光？"
        conceptPill="疑问：echo 本身会画屏幕吗？"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <CodeBlockPanel
            title="chapters/chapter00/01_echo.php"
            lines={['<?php', 'echo "Hello Linux!\\n";']}
            activeLine={1}
            width={520}
          />
          <AnimatedFlowArrow width={200} label="如何点亮像素？" color={THEME.orange} progress={enter} pulse={pulse} />
          <TerminalPanel
            title="显示器终端"
            lines={[
              { text: '$ php 01_echo.php', tone: 'cmd' },
              { text: 'Hello Linux!', tone: 'ok' },
            ]}
            localFrame={localFrame}
            stepFrames={22}
            width={520}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'security-risk') {
    return (
      <StageContainer
        banner="假如普通 PHP 代码能直接碰硬件，整台电脑会瞬间灾难！"
        conceptPill="硬件安全危机：必须隔离普通软件与底层硬件"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <BoxCard title="新手写的普通脚本" subtitle="不受限权限" accent="red" width={420} badge="高危直连!">
            <CodeHint text="直接写物理内存 / 显卡 / 硬盘" highlight />
            <div style={{ fontSize: 22, fontWeight: 700, color: THEME.red }}>
              写错一行指针或偏移量，直接覆写系统内存或格式化磁盘！
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={180} label="危险越权" color={THEME.red} progress={enter} blocked />
          <BoxCard title="底层物理硬件" subtitle="内存 / 网卡 / 磁盘 / 显卡" accent="default" width={540}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              1. 别的进程（微信/数据库）内存密码被偷看
            </div>
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              2. 操作系统内核数据被踩烂，当场蓝屏死机！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'two-rings') {
    return (
      <StageContainer
        banner="CPU 硬件级权限隔离：用户态安全房间 vs 内核态保安亭"
        conceptPill="Ring 3 用户态（安全沙箱） | Ring 0 内核态（特权保安亭）"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 48, alignItems: 'stretch' }}>
          <BoxCard title="用户态 (User Space)" subtitle="CPU Ring 3" accent="blue" width={540} minHeight={310}>
            <CodeHint text="PHP / Nginx / 浏览器 / 普通 App" />
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              被关在安全房间里，只准算自己的变量，绝对不允许直接碰显卡、磁盘、网卡！
            </div>
          </BoxCard>
          <BoxCard title="内核态 (Kernel Space)" subtitle="CPU Ring 0" accent="orange" width={540} minHeight={310} badge="独占所有硬件">
            <CodeHint text="Linux Kernel 装甲保安亭" highlight />
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              掌控所有硬件资源、内存分配与进程生杀大权，只通过受控窗口受理申请！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'syscall-window') {
    return (
      <StageContainer
        banner="系统调用 (Syscall)：PHP 向内核保安亭窗口递交办事申请单"
        conceptPill="echo → write() 系统调用 → 内核代为操作 TTY 屏幕"
        conceptColor={THEME.dark}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <BoxCard title="用户态 PHP" subtitle="Ring 3" accent="blue" width={360}>
            <CodeHint text='echo "Hello Linux!\n";' highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>自己不能碰屏幕，填申请表！</div>
          </BoxCard>
          <AnimatedFlowArrow width={220} label='递交 write(1, "Hello...")' color={THEME.orange} progress={enter} pulse={pulse} />
          <BoxCard title="系统调用窗口" subtitle="Syscall Gate" accent="orange" width={330}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 23, fontWeight: 800, textAlign: 'center' }}>
              Ring 3 → Ring 0
            </div>
            <div style={{ fontSize: 21, textAlign: 'center', fontWeight: 700 }}>权限切换 &amp; 安检</div>
          </BoxCard>
          <AnimatedFlowArrow width={180} label="内核执行" color={THEME.green} progress={enter} pulse={pulse} />
          <BoxCard title="TTY 屏幕硬件" subtitle="Ring 0 代管" accent="green" width={320}>
            <div style={{ fontSize: 23, fontWeight: 800 }}>屏幕成功点亮输出！</div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'strace-write') {
    return (
      <StageContainer
        banner="第一神器 strace：亲眼抓捕 PHP 递交的 write 申请单"
        conceptPill='write(1, "Hello Linux!\n", 13) = 13'
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <TerminalPanel
            title="strace 系统调用透视镜"
            lines={[
              { text: '$ strace -e trace=write php 01_echo.php', tone: 'cmd' },
              { text: 'write(1, "Hello Linux!\\n", 13) = 13', tone: 'ok' },
              { text: 'Hello Linux!', tone: 'dim' },
              { text: '+++ exited with 0 +++', tone: 'warn' },
            ]}
            localFrame={localFrame}
            stepFrames={20}
            width={680}
          />
          <BoxCard title="逐词拆解天机" subtitle="内核返回值 = 13" accent="orange" width={540}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 21, fontWeight: 700, lineHeight: 1.7 }}>
              <div>1. write：内核 C 接口函数名</div>
              <div>2. 1：1 号管子 STDOUT (标准输出)</div>
              <div>3. "Hello Linux!\n"：写入的字符串</div>
              <div>4. 13：总字节长度，返回 = 13 成功！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'user-math') {
    return (
      <StageContainer
        banner="反面实验：纯 CPU 计算 $sum += $i 需要找内核保安吗？"
        conceptPill="纯算术/循环在用户态寄存器直跑：0 次系统调用！"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="02_math_and_sleep.php"
            lines={[
              '$sum = 0;',
              'for ($i = 0; $i < 10000; $i++) {',
              '    $sum += $i; // 纯 CPU 寄存器加法',
              '}',
            ]}
            activeLine={2}
            width={580}
          />
          <TerminalPanel
            title="strace 追踪纯计算"
            lines={[
              { text: "$ strace -e trace=write php -r '$x=1+1;'", tone: 'cmd' },
              { text: '+++ exited with 0 +++', tone: 'ok' },
              { text: '# 零次 write / 零次系统调用切换！', tone: 'warn' },
              { text: '# 纳秒级用户态寄存器直跑，不伤及他人', tone: 'dim' },
            ]}
            localFrame={localFrame}
            stepFrames={20}
            width={620}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'program-vs-process') {
    const alive = pop > 0.2;
    return (
      <StageContainer
        banner="静态尸体 vs 活体灵魂：程序 (Program) 与 进程 (Process)"
        conceptPill="sleep(2) → clock_nanosleep() 让活体进程暂停 2 秒"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <BoxCard title="程序 (Program)" subtitle="躺在硬盘上" accent="default" width={400}>
            <CodeHint text="02_math_and_sleep.php" />
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              只是静态代码图纸，不运行时只占几百字节磁盘空间
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={200} label="php 执行加载" color={THEME.orange} progress={enter} pulse={pulse} />
          <BoxCard title="进程 (Process)" subtitle="活在内存里" accent={alive ? 'orange' : 'blue'} width={560} badge="sleep(2) 挂起中">
            <CodeHint text="clock_nanosleep(CLOCK_REALTIME, ...)" highlight />
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              真正被内核调度跑起来的活体打工人！加上 sleep(2) 就能在另一个窗口活捉它。
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'pid-and-sleep') {
    return (
      <StageContainer
        banner="同时跑 3 个脚本怎么区分？发唯一身份证 PID + 观察睡眠态 S+"
        conceptPill="睡眠队列不消耗 CPU：STAT = S+ 时 %CPU 恒为 0.0%"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <TerminalPanel
            title="ps aux | grep php"
            lines={[
              { text: '$ ps aux | grep 02_math_and_sleep', tone: 'cmd' },
              { text: 'USER   PID  %CPU %MEM STAT COMMAND', tone: 'dim' },
              { text: 'root  1042   0.0  0.1 S+   php 02_math...', tone: 'ok' },
              { text: 'root  1043   0.0  0.1 S+   php 02_math...', tone: 'ok' },
            ]}
            localFrame={localFrame}
            stepFrames={18}
            width={680}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <CpuGauge percent="0.0%" stateLabel="S+ (Sleeping)" mode="idle" localFrame={localFrame} />
            <BoxCard title="内核等待队列" accent="green" width={440}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                sleep 期间进程不在运行态 R，而是挂在等待队列里安睡，0% CPU 浪费！
              </div>
            </BoxCard>
          </div>
        </div>
      </StageContainer>
    );
  }

  // source-check
  return (
    <StageContainer
      banner="Workerman 源码真迹初探：启动安检门 Worker::checkSapiEnv()"
      conceptPill="Workerman/Worker.php：校验 CLI 运行模式与 Linux 底层支撑"
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <CodeBlockPanel
          title="Workerman/Worker.php :: checkSapiEnv()"
          lines={[
            'protected static function checkSapiEnv(): void',
            '{',
            "    if (PHP_SAPI !== 'cli') {",
            '        exit("Only run in command line mode \\n");',
            '    }',
            "    if (DIRECTORY_SEPARATOR === '\\\\') {",
            '        self::$_OS = OS_TYPE_WINDOWS;',
            '    }',
            '}',
          ]}
          activeLine={2}
          width={680}
        />
        <BoxCard title="第 0 章基石就位" subtitle="pcntl + posix + CLI" accent="green" width={480}>
          <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.65 }}>
            <div>• 只能运行在常驻 CLI 进程中（非 FPM）</div>
            <div>• 依赖 Linux 系统调用与多进程扩展</div>
            <div>• 下章深入进程的户口本：PID、PPID 与权限降级</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
