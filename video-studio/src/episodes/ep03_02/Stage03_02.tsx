import React from 'react';
import { spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage03_02: React.FC<StageProps> = ({
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

  if (visual === 'uncaught-crash') {
    return (
      <StageContainer
        banner="常驻进程最大杀手：业务代码里一次未捕获的 throw Exception 会让全服直接断线！"
        conceptPill="1 人犯错全服连坐"
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
          <BoxCard title="传统 PHP-FPM 时代" accent="blue" width={520} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 1 个进程只服务当前这 1 个请求</div>
              <div>• 抛异常挂了？最多当前用户看到 500 错误，下一请求又是新进程，无伤大雅</div>
            </div>
          </BoxCard>
          <BoxCard
            title="Workerman 常驻内存进程"
            accent="red"
            width={580}
            minHeight={340}
            badge="整机雪崩！"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 1 个 Worker 同时挂着 10,000 个在线客户端</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 8 }}>
                • 若某个客人触发一句 <code style={{ fontFamily: THEME.fontMono }}>throw new RuntimeException()</code> 未捕获 → 进程直接暴毙，一万个连接集体掉线！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'try-catch-net') {
    return (
      <StageContainer
        banner="异常防护安全网：框架底座必须在调用用户回调外死死套上一层 try ... catch(\Throwable)！"
        conceptPill="try/catch Throwable 安全网"
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
            title="v05_robust_worker.php 核心安全网"
            width={680}
            lines={[
              'if (is_callable($this->onMessage)) {',
              '    try {',
              '        ($this->onMessage)($msg);',
              '    } catch (\\Throwable $e) {',
              '        // 吞下业务异常，仅打印告警或走 onError，绝不杀进程！',
              '        $this->triggerError($e);',
              '    }',
              '}',
            ]}
            activeLine={3}
          />
          <BoxCard title="为什么 catch \Throwable 而不是 \Exception？" accent="blue" width={420} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              PHP 7+ 里 <code style={{ fontFamily: THEME.fontMono }}>TypeError</code>、<code style={{ fontFamily: THEME.fontMono }}>DivisionByZeroError</code> 等致命错误继承自 <code style={{ fontFamily: THEME.fontMono }}>\Error</code> 而不是 <code style={{ fontFamily: THEME.fontMono }}>\Exception</code>，只有接住最高父类 <code style={{ fontFamily: THEME.fontMono }}>\Throwable</code> 才万无一失！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'context-injection') {
    return (
      <StageContainer
        banner="上下文注入设计：为什么触发 onWorkerStart 时要把 ($this) 当作实参喂给业务闭包？"
        conceptPill="Context Injection ($this)"
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
            title="框架把当前底座实例传出去"
            width={620}
            lines={[
              '// 底座内部触发：',
              '($this->onWorkerStart)($this);',
              '',
              '// 业务开发接住 $w：',
              '$worker->onWorkerStart = function (Worker $w) {',
              '    echo "{$w->name} (PID: " . posix_getpid() . ") 启动!\\n";',
              '};',
            ]}
            activeLine={1}
          />
          <BoxCard title="真实开发刚需" accent="green" width={480} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              有了传入的 <code style={{ fontFamily: THEME.fontMono }}>$worker</code> 上下文句柄，业务在 <code style={{ fontFamily: THEME.fontMono }}>onWorkerStart</code> 才能拿到：
              <div>• <code style={{ fontFamily: THEME.fontMono }}>$worker-&gt;id</code> (只在第 0 号进程跑定时任务)</div>
              <div>• <code style={{ fontFamily: THEME.fontMono }}>$worker-&gt;connections</code> (全服广播遍历)</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'is-callable-guard') {
    return (
      <StageContainer
        banner="严格类型防御：必须用 is_callable($this->onMessage) 替代松散的 if ($this->onMessage)！"
        conceptPill="is_callable() 严格安检"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard title="❌ 松散 if 的惨剧" accent="red" width={540} minHeight={340}>
            <CodeBlockPanel
              width={490}
              lines={[
                '$worker->onMessage = "hello"; // 粗心写错！',
                'if ($this->onMessage) {       // 非空字符串居然为 true！',
                '    ($this->onMessage)($msg); // 💥 Fatal: Call to undefined fn hello()!',
                '}',
              ]}
              activeLine={2}
            />
          </BoxCard>
          <BoxCard title="✅ 严格 is_callable() 门禁" accent="green" width={560} minHeight={340}>
            <CodeBlockPanel
              width={510}
              lines={[
                '$worker->onMessage = "hello";',
                'if (is_callable($this->onMessage)) { // 检查既非空且真是可执行函数！',
                '    ($this->onMessage)($msg);        // 直接拦截，绝对安全！',
                '}',
              ]}
              activeLine={1}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'callable-variants') {
    const items = [
      { title: '1. 匿名闭包 (Closure)', code: '$worker->onMessage = function($msg) { ... };', accent: 'blue' as const },
      { title: '2. 全局函数名字符串', code: '$worker->onMessage = "my_handler_func";', accent: 'green' as const },
      { title: '3. 对象实例方法数组', code: '$bot = new CustomerService(); $worker->onMessage = [$bot, "reply"];', accent: 'orange' as const },
      { title: '4. 静态类方法数组', code: '$worker->onMessage = [Event::class, "onMsg"];', accent: 'default' as const },
    ];
    return (
      <StageContainer
        banner="PHP 可调用对象 (callable) 全兼容：一次抽象，天然接通全部 4 种面向对象写法！"
        conceptPill="4 种回调多态支持"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            width: 1120,
            transform: `scale(${0.95 + 0.05 * pop})`,
            opacity: enter,
          }}
        >
          {items.map((it) => (
            <BoxCard key={it.title} title={it.title} accent={it.accent} width={548} minHeight={165}>
              <CodeHint text={it.code} highlight />
            </BoxCard>
          ))}
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="v05_robust_worker.php 实战跑盘：bomb 引爆异常被安全网吞下，下一句正常秒回！"
      conceptPill="健壮 Worker 实测"
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
        <TerminalPanel
          title="Terminal — php v05_robust_worker.php"
          width={760}
          localFrame={localFrame}
          stepFrames={22}
          lines={[
            { text: '=== ChatRobotWorker (PID: 6182) 启动成功，准备接客！===', tone: 'ok' },
            { text: '> bomb', tone: 'cmd' },
            { text: '⚠️ [Worker 安全网拦截] 业务代码发生异常: 💥 数据库连接超时！', tone: 'warn' },
            { text: '> 你好请问订单怎么查？', tone: 'cmd' },
            { text: '【客服回复】您发送的消息是: 你好请问订单怎么查？', tone: 'ok' },
          ]}
        />
        <BoxCard title="进程稳如泰山" accent="green" width={360} minHeight={340} badge="Zero Downtime">
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            哪怕个别消息代码触发 Exception，同一 PID 的 Worker 照常服务剩余 9999 个连接！
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
