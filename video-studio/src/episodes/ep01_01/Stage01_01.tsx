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

export const Stage01_01: React.FC<StageProps> = ({ visual, localFrame, fps }) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 20, fps, config: SPRING_POP });
  const pulse = (localFrame % 42) / 42;

  if (visual === 'pid-ppid') {
    return (
      <StageContainer
        banner="进程不是凭空蹦出来的：每个 PHP 进程都有亲爹 PPID"
        conceptPill="posix_getpid() 查自己 | posix_getppid() 查父进程 (bash)"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <BoxCard title="父进程 bash" subtitle="PID: 312" accent="blue" width={360}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>命令行解释器：敲回车时向内核申请生出 PHP 子进程</div>
          </BoxCard>
          <AnimatedFlowArrow width={180} label="fork + exec" color={THEME.orange} progress={enter} pulse={pulse} />
          <CodeBlockPanel
            title="01_identity.php"
            lines={[
              '$pid  = posix_getpid();  // 1850',
              '$ppid = posix_getppid(); // 312 (bash)',
              'echo "我是 $pid, 我爹是 $ppid\\n";',
            ]}
            activeLine={localFrame > 45 ? 1 : 0}
            width={620}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'process-title') {
    return (
      <StageContainer
        banner="痛点：几十个进程在 ps 里全叫 php start.php，运维分不清谁是谁！"
        conceptPill="cli_set_process_title() 对应 Workerman::setProcessTitle()"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="进程改名"
            lines={[
              'cli_set_process_title(',
              '    "modern-worker: master process"',
              ');',
            ]}
            activeLine={1}
            width={520}
          />
          <AnimatedFlowArrow width={160} label="瞬间变身" color={THEME.green} progress={enter} pulse={pulse} />
          <TerminalPanel
            title="ps aux 改名前后对照"
            lines={[
              { text: '# 改名前：全都长一样', tone: 'dim' },
              { text: '1850  S+  php 01_identity.php', tone: 'err' },
              { text: '# 改名后：角色一目了然！', tone: 'dim' },
              { text: '1850  S+  modern-worker: master process', tone: 'ok' },
            ]}
            localFrame={localFrame}
            stepFrames={18}
            width={580}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'proc-fs') {
    const vanished = pop > 0.5;
    return (
      <StageContainer
        banner="/proc 伪文件系统：不占硬盘，把内核进程内存伪装成文件夹！"
        conceptPill="进程活着就在 /proc/<PID>/，进程一死瞬间凭空消失"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="Linux 内核内存" subtitle="进程控制块 PCB" accent="orange" width={420}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              无需发明几百个新命令，直接用 ls 和 cat 就能偷看进程五脏六腑！
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={180} label="内核实时映射" color={THEME.dark} progress={enter} pulse={pulse} />
          <TerminalPanel
            title="/proc/1850/ 目录生命周期"
            lines={[
              { text: '$ ls /proc/1850/', tone: 'cmd' },
              { text: 'cmdline  cwd  exe  fd/  status', tone: 'ok' },
              { text: '$ kill 1850 && ls /proc/1850/', tone: 'cmd' },
              {
                text: vanished ? 'No such file or directory (瞬间消失!)' : '等待进程退出...',
                tone: 'err',
              },
            ]}
            localFrame={localFrame}
            stepFrames={22}
            width={620}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'proc-files') {
    return (
      <StageContainer
        banner="翻开 /proc/<PID>/ 档案袋：三大核心秘密一目了然"
        conceptPill="cmdline (改名真迹) | status/VmRSS (物理内存) | cwd (立足点)"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 28 }}>
          <BoxCard title="/proc/PID/cmdline" subtitle="启动参数" accent="blue" width={390}>
            <CodeHint text="modern-worker: master" highlight />
            <div style={{ fontSize: 21, fontWeight: 700 }}>
              为什么改进程名 ps 就跟着变？因为 ps 读取的正是这个文件！
            </div>
          </BoxCard>
          <BoxCard title="/proc/PID/status" subtitle="物理内存体检" accent="green" width={390}>
            <CodeHint text="VmRSS:   18420 kB" highlight />
            <div style={{ fontSize: 21, fontWeight: 700 }}>
              真实吃掉多少物理内存看 VmRSS，排查常驻进程泄漏必看！
            </div>
          </BoxCard>
          <BoxCard title="/proc/PID/cwd" subtitle="软链接指针" accent="orange" width={390}>
            <CodeHint text="cwd -> /home/workerman" highlight />
            <div style={{ fontSize: 21, fontWeight: 700 }}>
              进程当前立足的工作目录，决定所有相对路径从哪开始算！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'cwd-trap') {
    return (
      <StageContainer
        banner="相对路径漂移惨案：守护进程 chdir('/') 后 ./a.txt 找不到了！"
        conceptPill="防漂移铁律：永远使用 __DIR__ 或提前保存初始工作目录"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="03_cwd_and_chdir.php"
            lines={[
              "chdir('/'); // 守护进程常切到根目录",
              "// 危险：变成去找 /a.txt -> 报错！",
              "fopen('./a.txt', 'r');",
              '// 安全：锚定当前脚本所在目录',
              "fopen(__DIR__ . '/a.txt', 'r');",
            ]}
            activeLine={localFrame > 55 ? 4 : 2}
            width={620}
          />
          <BoxCard title="Workerman 防漂移" subtitle="Worker.php" accent="orange" width={540}>
            <CodeHint text="getcwd() + __DIR__" highlight />
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              守护进程化会脱离终端并切换目录，框架必须在启动前先把启动路径或文件绝对路径存下来！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'privilege-dilemma') {
    return (
      <StageContainer
        banner="安全两难：80 端口只有 root 能听，但 root 跑业务等于把钥匙给黑客！"
        conceptPill="特权端口 (< 1024) 必须 root | 业务逻辑绝不能用 root"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <BoxCard title="困境 A：普通用户启动" subtitle="UID = 1000" accent="red" width={520} badge="Bind 80 失败!">
            <CodeHint text="stream_socket_server('tcp://0.0.0.0:80')" />
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.red }}>
              内核直接拒绝：Permission denied！小于 1024 的特权端口只有 UID=0 能绑定。
            </div>
          </BoxCard>
          <BoxCard title="困境 B：全程 root 跑业务" subtitle="UID = 0" accent="red" width={520} badge="全服沦陷风险!">
            <CodeHint text="onMessage() 跑着第三方业务代码" />
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.red }}>
              万一业务代码有个上传或注入漏洞，黑客直接获得 root 权限删掉整台服务器！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'drop-privilege') {
    const step2 = localFrame > 65;
    return (
      <StageContainer
        banner="破局绝招：先借 root 占 80 端口，再自废武功降权成平民！"
        conceptPill="先 posix_setgid() 再 posix_setuid() — 顺序写反会降权失败！"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="Worker::setUserAndGroup() 精髓"
            lines={[
              '// 1. 趁着还是 root，先把 80 端口占下来',
              "$server = stream_socket_server('tcp://0.0.0.0:80');",
              '// 2. 必须先改 GID（如果先降 UID 就没权限改组了！）',
              'posix_setgid($userInfo["gid"]);',
              '// 3. 最后彻底放弃 root 身份，变成 www-data 平民',
              'posix_setuid($userInfo["uid"]);',
            ]}
            activeLine={step2 ? 5 : 3}
            width={720}
          />
          <BoxCard title="当前进程身份" subtitle={step2 ? 'UID=33 (www-data)' : 'UID=0 (root)'} accent={step2 ? 'green' : 'orange'} width={440} badge={step2 ? '安全降权成功!' : '临时特权'}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              {step2
                ? '80 端口 FD 已攥在手里，哪怕黑客攻破业务也只是普通平民权限！'
                : '占完端口立刻自废武功，绝不把 root 带进业务循环！'}
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'exit-code') {
    return (
      <StageContainer
        banner="子进程死了怎么汇报死因？临终遗言 Exit Code (0 ~ 255)"
        conceptPill="exit(0) 光荣完成 | exit(非0) 异常暴毙 | bash 用 $? 读取"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="05_exit_and_shutdown.php"
            lines={[
              '// 正常完成任务',
              'exit(0);',
              '// 半路出车祸（自定义错误码 99）',
              'exit(99);',
            ]}
            activeLine={3}
            width={520}
          />
          <TerminalPanel
            title="父进程 bash 接收遗言"
            lines={[
              { text: '$ php ok.php && echo $?', tone: 'cmd' },
              { text: '0   # 0 代表一切正常', tone: 'ok' },
              { text: '$ php crash.php ; echo $?', tone: 'cmd' },
              { text: '99  # 非 0 代表对应故障原因', tone: 'err' },
            ]}
            localFrame={localFrame}
            stepFrames={18}
            width={620}
          />
        </div>
      </StageContainer>
    );
  }

  // shutdown-hook
  return (
    <StageContainer
      banner="Fatal Error 暴毙前最后抢救：register_shutdown_function()"
      conceptPill="Worker::checkErrors()：结合 error_get_last() 记录最后遗言"
      conceptColor={THEME.blue}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
        <CodeBlockPanel
          title="Workerman::checkErrors() 原理"
          lines={[
            'register_shutdown_function(function () {',
            '    $err = error_get_last();',
            '    if ($err && ($err["type"] & (E_ERROR | E_PARSE))) {',
            '        file_put_contents("worker.log", $err["message"]);',
            '    }',
            '});',
          ]}
          activeLine={1}
          width={700}
        />
        <BoxCard title="临终救护车" subtitle="死前最后 1 毫秒" accent="blue" width={460}>
          <div style={{ fontSize: 23, fontWeight: 700 }}>
            哪怕业务触发了致命错误瞬间停机，shutdown 钩子依然会被触发，把案发现场写进日志留给 Master！
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
