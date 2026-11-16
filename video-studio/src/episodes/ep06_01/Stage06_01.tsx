import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
} from '../../components/StagePrimitives';

export const Stage06_01: React.FC<StageProps> = ({
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

  if (visual === 'sleep-poison') {
    const frozenSec = (interpolate(localFrame, [20, 120], [0, 3.0])).toFixed(1);
    return (
      <StageContainer
        banner="致命毒药：在 onMessage 回调里调用 sleep(3) = 直接打晕唯一的 PHP 进程！"
        conceptPill="阻塞式 sleep() 灾难"
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
          <CodeBlockPanel
            title="poison_server.php"
            width={560}
            lines={[
              '$worker->onMessage = function($conn, $msg) {',
              '    // 💣 想 3 秒后再给客人 A 回复',
              '    sleep(3);',
              '    $conn->send("3秒后回复: " . $msg);',
              '};',
            ]}
            activeLine={2}
          />
          <BoxCard
            title={`全服连坐冻结中 (${frozenSec}s / 3.0s)`}
            accent="red"
            width={580}
            minHeight={360}
            badge="全员卡死"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 客人 A：等待 3s 回复... ⏳</div>
              <div style={{ color: THEME.red, fontWeight: 700 }}>
                • 客人 B (只是发个 ping)：也被卡住 3s 无法响应！❌
              </div>
              <div style={{ color: THEME.red, fontWeight: 700 }}>
                • 新客人 C 尝试连接：在队列干等！❌
              </div>
            </div>
            <CodeHint text="单进程里严禁 sleep / 同步慢 SQL / file_get_contents" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'single-process-rule') {
    return (
      <StageContainer
        banner="单进程铁律：回调必须 0.01ms 闪电返回！唯一合法等待的地方只有 stream_select"
        conceptPill="唯一的合法休眠点"
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
          <BoxCard title="onMessage 回调" accent="green" width={330} minHeight={300}>
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              登记“闹钟任务”后毫秒级 return！
            </div>
            <CodeHint text="< 0.05 ms" highlight />
          </BoxCard>
          <AnimatedFlowArrow width={150} label="回到循环" color={THEME.green} progress={pop} />
          <BoxCard
            title="SelectLoop 主循环"
            subtitle="唯一的睡觉场所"
            accent="blue"
            width={560}
            minHeight={300}
            badge="核心调度器"
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              如果把「要等多久才到下一个闹钟」作为超时参数传给 stream_select，就能一举两得！
            </div>
            <CodeHint text="一边盯网络事件，一边充当微秒精度闹钟" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'select-timeout') {
    return (
      <StageContainer
        banner="被忽视的超级武器：stream_select 第 4、5 个参数正是秒与微秒级超时闹钟！"
        conceptPill="select 超时参数"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 26,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="PHP 内置签名"
            width={1020}
            lines={[
              'stream_select(',
              '    array &$read,    // ① 可读套接字名单',
              '    array &$write,   // ② 可写套接字名单',
              '    array &$except,  // ③ 异常带外数据',
              '    ?int $seconds,   // ④ ⏰ 超时整秒数 (null=死等, 0=立刻返回)',
              '    ?int $microseconds = null // ⑤ ⏰ 剩余微秒数 (0 ~ 999999)',
              ');',
            ]}
            activeLine={4}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'after-math') {
    return (
      <StageContainer
        banner="微秒精度倒计时算术：永远用 max(0.0, ...) 兜底，防止负数让 select 报错！"
        conceptPill="高精度时间拆分"
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
            title="计算最近闹钟还差几秒"
            width={720}
            lines={[
              '$runTime = microtime(true) + 3.0; // 到点时间点',
              '// 进 select 前计算动态剩余时间：',
              '$wait = max(0.0, $runTime - microtime(true));',
              '$tvSec  = (int)$wait;                       // 整数秒: 2',
              '$tvUsec = (int)(($wait - $tvSec) * 1000000); // 微秒: 998500',
              '@stream_select($read, $write, $except, $tvSec, $tvUsec);',
            ]}
            activeLine={2}
          />
          <BoxCard
            title="为什么要 max(0.0, ...)?"
            accent="orange"
            width={400}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              万一上个业务处理太慢，闹钟其实已经过期 0.2 秒了，$wait 会变成负数。传负数给 stream_select 会抛出 ValueError 崩溃！
            </div>
            <CodeHint text="0 = 立即检查完就醒" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'wakeup-both') {
    return (
      <StageContainer
        banner="双通道协同唤醒：来消息提前醒来先接待客人，没消息睡到闹钟响再触发回调！"
        conceptPill="双事件协同"
        conceptColor={THEME.green}
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
            title="分支 A：第 1.2s 客人 B 发来消息"
            accent="blue"
            width={560}
            minHeight={360}
            badge="提前唤醒"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>1. 内核立刻叫醒 stream_select（仅睡了 1.2s）</div>
              <div>2. 马上为客人 B 处理请求，零延迟！</div>
              <div>3. 下一轮重新算闹钟还剩 1.8s，继续回 select 睡！</div>
            </div>
          </BoxCard>

          <BoxCard
            title="分支 B：第 3.0s 闹钟到点"
            accent="green"
            width={560}
            minHeight={360}
            badge="准时唤醒"
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>1. select 等待期满返回 0 (无网络事件)</div>
              <div>2. 检查当前时间 ≥ $runTime</div>
              <div>3. 立刻执行客人 A 的定时回调！全程无一人阻塞！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === '50k-timers') {
    const scanOps = Math.min(50000, Math.floor(interpolate(localFrame, [20, 120], [1, 50000])));
    return (
      <StageContainer
        banner="性能撞墙：5 万个长连接心跳定时器，每轮 foreach 找最小值是 O(N) 噩梦！"
        conceptPill="O(N) 扫描瓶颈"
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
            title="每次主循环都在全表扫 50,000 个元素"
            subtitle={`本轮已对比次数: ${scanOps.toLocaleString()} / 50,000`}
            accent="red"
            width={620}
            minHeight={360}
            badge="CPU 暴涨"
          >
            <CodeBlockPanel
              width={570}
              lines={[
                '// 每次进 stream_select 前都要扫描全部定时器：',
                '$nextTime = PHP_FLOAT_MAX;',
                'foreach ($this->timers as $t) {',
                '    if ($t->runTime < $nextTime) $nextTime = $t->runTime;',
                '}',
              ]}
              activeLine={2}
            />
          </BoxCard>
          <BoxCard
            title="为什么这是巨大浪费？"
            accent="orange"
            width={500}
            minHeight={360}
          >
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              1 秒内事件循环可能唤醒几万次，每次只为回答一个问题：<br />
              <b>“下一个最先响的闹钟是几秒？”</b><br />
              其实后面 49,999 个闹钟根本不用看！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'min-heap') {
    return (
      <StageContainer
        banner="最小堆 (Min-Heap)：永远把最早到期的闹钟浮在树顶，O(1) 秒看堆顶！"
        conceptPill="SplPriorityQueue 最小堆"
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
            title="最小堆树状结构"
            subtitle="堆顶永远是最小值 (最早到期)"
            accent="green"
            width={600}
            minHeight={390}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
              <div
                style={{
                  background: THEME.green,
                  color: '#FFF',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontFamily: THEME.fontMono,
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                🥇 堆顶 Top: +0.5s (#Task-88)
              </div>
              <div style={{ display: 'flex', gap: 40 }}>
                <div
                  style={{
                    background: '#F1F5F9',
                    border: `2px solid ${THEME.gridColor}`,
                    padding: '12px 22px',
                    borderRadius: 10,
                    fontFamily: THEME.fontMono,
                    fontSize: 19,
                  }}
                >
                  +3.2s (#Task-12)
                </div>
                <div
                  style={{
                    background: '#F1F5F9',
                    border: `2px solid ${THEME.gridColor}`,
                    padding: '12px 22px',
                    borderRadius: 10,
                    fontFamily: THEME.fontMono,
                    fontSize: 19,
                  }}
                >
                  +10.0s (#Task-41)
                </div>
              </div>
              <div style={{ fontSize: 19, color: THEME.mutedText }}>
                只要第 1 个 (+0.5s) 还没到点，剩下 49,999 个全不用看！
              </div>
            </div>
          </BoxCard>
          <BoxCard
            title="复杂度碾压级对比"
            accent="blue"
            width={520}
            minHeight={390}
          >
            <div style={{ fontSize: 22, lineHeight: 1.9 }}>
              <div>• 瞄一眼最近闹钟：<b style={{ color: THEME.green }}>O(1)</b></div>
              <div>• 新增一个定时器：<b style={{ color: THEME.blue }}>O(log N)</b> (~16 步搞定 5 万条)</div>
              <div>• C 语言底层实现：PHP 原生 <code style={{ fontFamily: THEME.fontMono }}>SplPriorityQueue</code></div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'neg-timestamp') {
    return (
      <StageContainer
        banner="PHP 巧妙黑魔法：SplPriorityQueue 默认最大堆 → 传「负数时间戳」秒变最小堆！"
        conceptPill="负数优先级技巧"
        conceptColor={"#8e44ad"}
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
            title="巧取反号：让数字小的时间戳变大！"
            width={700}
            lines={[
              '$scheduler = new \\SplPriorityQueue();',
              '$scheduler->setExtractFlags(\\SplPriorityQueue::EXTR_DATA);',
              '',
              '// 闹钟 A: 1700000005.0 (5秒后，要最先响！)',
              '// 闹钟 B: 1700000030.0 (30秒后)',
              '$scheduler->insert($taskA_id, -1700000005.0); // 更大！浮在堆顶',
              '$scheduler->insert($taskB_id, -1700000030.0); // 更小，沉到底下',
            ]}
            activeLine={5}
          />
          <BoxCard
            title="原理一目了然"
            accent="orange"
            width={420}
            minHeight={340}
          >
            <div style={{ fontSize: 22, lineHeight: 1.8 }}>
              <div>-5 &gt; -30 !</div>
              <div style={{ marginTop: 10 }}>
                取负号之后，原本时间戳越早（数字越小）的任务，负数值反而越大，天然浮在最大堆最顶端！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'lazy-delete') {
    return (
      <StageContainer
        banner="惰性删除 (Lazy Deletion)：delTimer() 只删任务账本，堆顶弹出时查无此账即丢弃！"
        conceptPill="Lazy Deletion"
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
          <BoxCard
            title="1. delTimer($id) 取消定时器"
            accent="orange"
            width={560}
            minHeight={370}
          >
            <CodeBlockPanel
              width={510}
              lines={[
                'public function delTimer(int $id): bool {',
                '    // 绝不挖开堆内部数组重排！O(1) 仅划账',
                '    unset($this->_eventTimer[$id]);',
                '    return true;',
                '}',
              ]}
              activeLine={2}
            />
          </BoxCard>
          <BoxCard
            title="2. tick() 堆顶弹出检查"
            accent="green"
            width={560}
            minHeight={370}
          >
            <CodeBlockPanel
              width={510}
              lines={[
                'while (!$this->_scheduler->isEmpty()) {',
                '    $data = $this->_scheduler->top();',
                '    $timerId = $data[0];',
                '    if (!isset($this->_eventTimer[$timerId])) {',
                '        $this->_scheduler->extract(); // 查无此账，丢弃',
                '        continue;',
                '    }',
                '}',
              ]}
              activeLine={4}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="源码对照：Workerman/Events/Select.php 的 $_scheduler + tick() 与推导完全一致！"
      conceptPill="Events/Select::tick() 真迹"
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
          title="Workerman/Events/Select.php"
          width={760}
          lines={[
            '$this->_scheduler = new \\SplPriorityQueue();',
            '$this->_scheduler->insert([$timer_id, $time], -$run_time);',
            '// tick() 每次被 loop() 调用：',
            'while (!$this->_scheduler->isEmpty()) {',
            '    $scheduler_data = $this->_scheduler->top();',
            '    if ($run_time <= $time_now) {',
            '        $this->_scheduler->extract();',
            '        call_user_func_array($task[0], $task[1]);',
            '    } else { return $run_time - $time_now; }',
            '}',
          ]}
          activeLine={1}
        />
        <BoxCard
          title="repeat 周期定时器秘密"
          accent="blue"
          width={360}
          minHeight={360}
          badge="自循环入队"
        >
          <div style={{ fontSize: 21, lineHeight: 1.7 }}>
            repeat 定时器并不是在堆里永久住着：每次执行完回调，如果没被删掉，再重新 insert 一次 `-(now + interval)`！
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
