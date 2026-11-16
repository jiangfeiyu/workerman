import React from 'react';
import { spring } from 'remotion';
import { CodeHint, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage03_01: React.FC<StageProps> = ({ visual, localFrame, fps }) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 20, fps, config: SPRING_POP });
  const pulse = (localFrame % 42) / 42;

  if (visual === 'naive-robot') {
    return (
      <StageContainer
        banner="v0.1 笨代码：在碰网络之前，先用 0 号 STDIN 写死循环机器人"
        conceptPill="4 行起步：while (true) 读取键盘并直接回显"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <CodeBlockPanel
            title="01_naive_loop.php (v0.1)"
            lines={[
              'while (true) {',
              '    $msg = fgets(STDIN);',
              '    echo "机器人收到: " . $msg;',
              '}',
            ]}
            activeLine={localFrame > 40 ? 2 : 1}
            width={580}
          />
          <BoxCard title="运行体感" accent="blue" width={480}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              敲一行回车，机器人回你一行。虽然简单，但接下来需求一变立刻撞墙！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'spaghetti') {
    return (
      <StageContainer
        banner="撞墙痛点 1：业务代码全塞进 while 里，变成一锅乱麻！"
        conceptPill="强耦合惨剧：改一行算字数/过滤逻辑，就要动底层 I/O 循环"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="一锅粥代码"
            lines={[
              'while (true) {',
              '    $msg = fgets(STDIN); // 底层读取',
              '    $len = strlen($msg); // 算字数业务',
              '    $msg = strtoupper($msg); // 转大写业务',
              '    saveToDb($msg);      // 存库业务...',
              '}',
            ]}
            activeLine={2}
            width={620}
          />
          <BoxCard title="底层与上层死死缠绕" accent="red" width={480} badge="不可复用!">
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.red }}>
              读取管子的脏活累活，和业务处理逻辑混在一起，想给另一个部门用根本拆不开！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'extract-fn') {
    return (
      <StageContainer
        banner="v0.2 抽取 handleMessage()，但写死了函数名怎么复用？"
        conceptPill="撞墙痛点 2：客服调 replyCustomer，财务调 calcTax，要复制底座吗？"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="02_extract_function.php (v0.2)"
            lines={[
              'while (true) {',
              '    $msg = fgets(STDIN);',
              '    handleMessage($msg); // 写死了函数名！',
              '}',
            ]}
            activeLine={2}
            width={560}
          />
          <AnimatedFlowArrow width={170} label="被迫写死" color={THEME.red} progress={enter} blocked={pop > 0.3} />
          <BoxCard title="两个部门同时要底座" accent="orange" width={460}>
            <CodeHint text="客服部: replyCustomer($msg)" />
            <CodeHint text="财务部: calcTax($msg)" />
            <div style={{ fontSize: 21, fontWeight: 700 }}>
              难道把 while 底座复制粘贴两份？
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'callable-var') {
    return (
      <StageContainer
        banner="内功破局：把“一个函数本身”装进变量里传递！"
        conceptPill="PHP Closure 匿名函数 & Callable：函数也是变量"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <CodeBlockPanel
            title="03_callable_variable.php"
            lines={[
              '// 形态 A：函数名字符串',
              "$fn = 'replyCustomer';",
              '// 形态 B：匿名闭包函数',
              '$fn = function ($msg) {',
              '    echo "收到: $msg";',
              '};',
              '$fn("你好"); // 像调函数一样调用变量！',
            ]}
            activeLine={localFrame > 55 ? 6 : 3}
            width={620}
          />
          <BoxCard title="把行为变成参数" accent="blue" width={480}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              平时我们传数字和字符串；现在直接把一整段业务逻辑装进 $fn 当参数递进引擎！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'ioc-callback') {
    return (
      <StageContainer
        banner="v0.3 控制反转 (IoC)：runServer($callback) 一行代码也不用改！"
        conceptPill="底座只管读取并回调 $callback($msg) — 谁调用谁反转！"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="04_callback_engine.php (v0.3)"
            lines={[
              'function runServer(callable $callback) {',
              '    while (true) {',
              '        $msg = fgets(STDIN);',
              '        $callback($msg); // 交回业务控制权',
              '    }',
              '}',
            ]}
            activeLine={3}
            width={580}
          />
          <AnimatedFlowArrow width={170} label="自由插拔" color={THEME.green} progress={enter} pulse={pulse} />
          <BoxCard title="不同部门共用同一发动机" accent="green" width={470}>
            <CodeHint text="runServer('replyCustomer');" highlight />
            <CodeHint text="runServer('calcTax');" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'param-explosion') {
    return (
      <StageContainer
        banner="撞墙痛点 3：多生命周期回调导致函数参数列表像火车一样长！"
        conceptPill="onStart / onMessage / onStop / onError 全塞函数参数太丑陋"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <CodeBlockPanel
            title="参数爆炸惨案"
            lines={[
              'runServer(',
              '    $onStartCallback,',
              '    $onMessageCallback,',
              '    null, // 不想传还得拿 null 占位！',
              '    $onErrorCallback',
              ');',
            ]}
            activeLine={3}
            width={680}
          />
          <BoxCard title="怎么改更优雅？" accent="orange" width={680}>
            <div style={{ fontSize: 24, fontWeight: 700, textAlign: 'center' }}>
              把发动机做成 class Worker，把回调变成对象属性插座！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'worker-slots') {
    return (
      <StageContainer
        banner="v0.4 历史性一刻：class Worker 的属性即“标准插座”！"
        conceptPill="$worker->onMessage = function($msg) { ... }; 插哪个用哪个"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="05_worker_class.php (v0.4)"
            lines={[
              'class Worker {',
              '    public $onWorkerStart = null;',
              '    public $onMessage     = null;',
              '    public function run() {',
              '        if ($this->onWorkerStart) ($this->onWorkerStart)($this);',
              '        while (true) {',
              '            $msg = fgets(STDIN);',
              '            if ($this->onMessage) ($this->onMessage)($msg);',
              '        }',
              '    }',
              '}',
            ]}
            activeLine={7}
            width={740}
          />
          <BoxCard title="外部极简接入" accent="orange" width={450} badge="插座设计诞生!">
            <CodeHint text="$w = new Worker();" />
            <CodeHint text="$w->onMessage = fn($m) => ...;" highlight />
            <CodeHint text="$w->run();" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'defensive-guard') {
    return (
      <StageContainer
        banner="工业级防御：is_callable 验插座 + try/catch(\Throwable) 安全网"
        conceptPill="防止非法赋值崩溃 + 防止单条消息异常拖垮整个常驻进程"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="06_worker_defensive.php"
            lines={[
              'if (is_callable($this->onMessage)) {',
              '    try {',
              '        ($this->onMessage)($msg);',
              '    } catch (\\Throwable $e) {',
              '        if ($this->onError) ($this->onError)($e);',
              '    }',
              '}',
            ]}
            activeLine={3}
            width={640}
          />
          <BoxCard title="常驻进程生存法则" accent="blue" width={480}>
            <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.65 }}>
              <div>1. 防止赋值字符串 "abc" 引发 Fatal Error</div>
              <div>2. 业务报错被安全网兜住，主循环继续活着服务其他请求！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // workerman-match
  return (
    <StageContainer
      banner="Workerman 官方源码印证：与我们推导的插座设计 100% 吻合！"
      conceptPill="Workerman/Worker.php：不再死记语法，它是被逼出来的最自然设计"
      conceptColor={THEME.green}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <CodeBlockPanel
          title="Workerman/Worker.php 原版真迹"
          lines={[
            'public $onWorkerStart = null;',
            'public $onConnect     = null;',
            'public $onMessage     = null;',
            'public $onClose       = null;',
            'public $onError       = null;',
          ]}
          activeLine={2}
          width={560}
        />
        <BoxCard title="下一章预告：破壳通网！" accent="green" width={540}>
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.65 }}>
            <div>• 底座骨架与回调机制已全部掌握</div>
            <div>• 第 4 章只需把 STDIN 换成 Socket，你的 Worker 瞬间变身网络服务器！</div>
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
