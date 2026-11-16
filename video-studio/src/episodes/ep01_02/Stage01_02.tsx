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

export const Stage01_02: React.FC<StageProps> = ({
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

  if (visual === 'cwd-ebusy') {
    return (
      <StageContainer
        banner="Linux 内核锁机制：进程的 pwd 持有挂载点活跃计数 mnt_count → 盘死活卸不掉！"
        conceptPill="umount EBUSY 惨案"
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
          <BoxCard
            title="常驻进程内核控制块"
            subtitle="PID 3021 (踩在 /data/project)"
            accent="orange"
            width={430}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• <code style={{ fontFamily: THEME.fontMono }}>task_struct-&gt;fs-&gt;pwd</code></div>
              <div>• 指向 <code style={{ fontFamily: THEME.fontMono }}>/data</code> 数据盘的 <code style={{ fontFamily: THEME.fontMono }}>vfsmount</code></div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                • 即使此刻零磁盘 I/O，活跃引用计数 mnt_count ≥ 1！
              </div>
            </div>
          </BoxCard>

          <TerminalPanel
            title="运维深夜扩容数据盘"
            width={700}
            localFrame={localFrame}
            stepFrames={20}
            lines={[
              { text: '$ umount /data', tone: 'cmd' },
              { text: 'umount: /data: target is busy.', tone: 'err' },
              { text: '$ fuser -m /data', tone: 'cmd' },
              { text: '/data: 3021c   # 👈 原来是 PHP Worker 站在里面没挪脚！', tone: 'warn' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'dangling-core') {
    return (
      <StageContainer
        banner="悬空 CWD 灾难：启动目录被删除后，进程崩掉想留 Core Dump 却无处可写！"
        conceptPill="Dangling CWD & Core Dump"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard
            title="1. 开发老王在 /home/tom 启动服务"
            accent="blue"
            width={520}
            minHeight={350}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 服务以守护进程跑了 3 个月</div>
              <div>• 老王离职，运维清理了 <code style={{ fontFamily: THEME.fontMono }}>rm -rf /home/tom</code></div>
              <CodeHint text="readlink /proc/PID/cwd -> '/home/tom (deleted)'" />
            </div>
          </BoxCard>
          <BoxCard
            title="2. 半夜触发段错误崩溃！"
            accent="red"
            width={560}
            minHeight={350}
            badge="案发现场零线索"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 内核准备在当前 cwd 下写入 <code style={{ fontFamily: THEME.fontMono }}>core.3021</code> 内存转储文件</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                • 目录早已不存在 (ENOENT) → Core 文件直接生成失败！运维两眼一抹黑！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'apue-vs-workerman') {
    return (
      <StageContainer
        banner="Unix 规范 vs Workerman 工程折中：用 $_startFile 与 __DIR__ 彻底消灭路径漂移！"
        conceptPill="防漂移双保险"
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
          <BoxCard
            title="标准 Unix 规范 (APUE)"
            subtitle="chdir('/')"
            accent="blue"
            width={450}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 根目录 <code style={{ fontFamily: THEME.fontMono }}>/</code> 系统不关机绝不会卸载</div>
              <div>• 但副作用是开发者日常写的 <code style={{ fontFamily: THEME.fontMono }}>./config.php</code> 相对路径会全部断链！</div>
            </div>
          </BoxCard>

          <CodeBlockPanel
            title="Workerman/src/Worker.php 防漂移设计"
            width={660}
            lines={[
              '// 1. 启动第一时间获取并锁定启动脚本绝对路径：',
              '$backtrace = debug_backtrace();',
              'static::$_startFile = $backtrace[count($backtrace) - 1]["file"];',
              '',
              '// 2. 业务访问配置文件，永远拒绝 ./ 相对路径：',
              '$cfg = require __DIR__ . "/config/app.php";',
            ]}
            activeLine={2}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'port80-dilemma') {
    return (
      <StageContainer
        banner="端口权限世纪两难：绑 80 端口必须 root 皇上，跑业务绝不许用 root 裸奔！"
        conceptPill="特权端口 0~1023"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard
            title="痛点 A：不用 root 连端口都占不到"
            accent="orange"
            width={540}
            minHeight={350}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• Linux 规定 <code style={{ fontFamily: THEME.fontMono }}>0 ~ 1023</code> 为特权端口（HTTP 80 / HTTPS 443）</div>
              <div>• 普通用户直接监听直接报 <code style={{ fontFamily: THEME.fontMono }}>Permission denied</code>！</div>
            </div>
          </BoxCard>
          <BoxCard
            title="痛点 B：一直用 root 跑业务 = 裸奔"
            accent="red"
            width={560}
            minHeight={350}
            badge="极高危漏洞"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 一旦第三方库或代码存在 RCE 漏洞</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                • 黑客直接拿到 UID=0 最高权限，整台机器被删库植木马！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'gid-before-uid') {
    const step = Math.floor(localFrame / 45) % 2;
    return (
      <StageContainer
        banner="皇上自废武功的生死先后顺序：必须先 posix_setgid($gid)，再 posix_setuid($uid)！"
        conceptPill="先 GID 后 UID 铁律"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard
            title="❌ 写反顺序（惨烈翻车！）"
            accent="red"
            width={540}
            minHeight={360}
            badge="Operation not permitted"
          >
            <CodeBlockPanel
              width={490}
              lines={[
                'posix_setuid(33); // 1. 皇上先把玉玺扔了变成平民',
                'posix_setgid(33); // 2. 平民再想改组？Kernel: 滚！无权！',
              ]}
              activeLine={1}
            />
          </BoxCard>

          <BoxCard
            title="✅ 正确顺序（丝滑降权）"
            accent="green"
            width={560}
            minHeight={360}
            badge="Nginx / Workerman 标准写法"
          >
            <CodeBlockPanel
              width={510}
              lines={[
                'posix_setgid(33); // 1. 趁还是皇上，先下旨改变群组 GID=33',
                'posix_setuid(33); // 2. 最后一步才交出皇权降为 UID=33！',
              ]}
              activeLine={step}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'setuser-source') {
    return (
      <StageContainer
        banner="Workerman/src/Worker.php::setUserAndGroup() 真迹：第 1029 行先 GID 后 UID！"
        conceptPill="setUserAndGroup 源码"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            transform: `scale(${0.95 + 0.05 * pop})`,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="Workerman/src/Worker.php#L1014-L1035"
            width={760}
            lines={[
              'protected static function setUserAndGroup(): void {',
              '    $user_info = posix_getpwnam(static::$user);',
              '    $uid = $user_info["uid"];',
              '    $gid = $user_info["gid"];',
              '    if ($uid != posix_getuid() || $gid != posix_getgid()) {',
              '        // 先改组，再改人，少一行颠倒都要爆炸：',
              '        if (!posix_setgid($gid) || !posix_setuid($uid)) {',
              '            static::log("Notice: Can not run woker as ...");',
              '        }',
              '    }',
              '}',
            ]}
            activeLine={6}
          />
          <BoxCard title="核心步骤拆解" accent="blue" width={360} minHeight={360}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>1. Master 先以 root 监听 80 端口</div>
              <div>2. fork 出 Worker 子进程后</div>
              <div>3. 每个 Worker 各自降权成 <code style={{ fontFamily: THEME.fontMono }}>www-data</code> 安全接客！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'exit-code-137') {
    const progress = interpolate(localFrame, [15, 75], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <StageContainer
        banner="进程临终遗言（退出状态码）：为什么容器或脚本退出码常看到神秘的 137？"
        conceptPill="退出码 $? = 128 + 信号"
        conceptColor={THEME.blue}
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
          <BoxCard title="正常退出: $? = 0" accent="green" width={320} minHeight={320}>
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              代码调用 <code style={{ fontFamily: THEME.fontMono }}>exit(0);</code><br />代表寿终正寝，任务成功。
            </div>
          </BoxCard>
          <BoxCard title="业务报错: 1 ~ 125" accent="orange" width={340} minHeight={320}>
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              代码调用 <code style={{ fontFamily: THEME.fontMono }}>exit(1);</code><br />代表端口冲突或配置非法主动停机。
            </div>
          </BoxCard>
          <AnimatedFlowArrow width={120} label="被强杀" color={THEME.red} progress={progress} />
          <BoxCard
            title="神秘 137 = 128 + 9"
            subtitle="SIGKILL / OOM Killer"
            accent="red"
            width={380}
            minHeight={320}
            badge="死于非命!"
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              Linux 约定：被信号杀死则退出码 = <b>128 + 信号编号</b>。看到 137 就说明被 <code style={{ fontFamily: THEME.fontMono }}>kill -9</code> 或内存 OOM 当场处决！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="临终抢救机制：register_shutdown_function + error_get_last() 抓出 Fatal Error 写死因！"
      conceptPill="Worker::checkErrors() 抢救"
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
          title="Workerman 临终抢救钩子 (05_exit_and_shutdown.php)"
          width={700}
          lines={[
            'register_shutdown_function(function () {',
            '    $errors = error_get_last();',
            '    if ($errors && in_array($errors["type"], [E_ERROR, E_PARSE])) {',
            '        $msg = "Fatal: {$errors[\'message\']} at line {$errors[\'line\']}";',
            '        Worker::safeEcho($msg); // 写死前黑匣子！',
            '    }',
            '});',
          ]}
          activeLine={1}
        />
        <BoxCard title="为什么 try/catch 抓不到？" accent="orange" width={420} minHeight={340}>
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            <div>• 语法解析错或内存溢出属于引擎级 Fatal Error，不会走 catch</div>
            <div>• 遗言钩子写完黑匣子日志后，Master 收到 exitCode != 0 立刻自动拉起替补新 Worker！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
