import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneTrendModel } from "./scenes/SceneTrendModel";

export const EP59SignalNoise: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1A1C2C",
        backgroundImage:
          "radial-gradient(rgba(115, 239, 247, 0.14) 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <Track name="EP59 Scenes">
        <SceneHook
          name="01 万字周报翻车现场"
          durationInFrames={20 * fps}
          episodeLabel="EP59"
          sectionTitle="01 · 低信噪比周报"
          headline="周报写了 8000 字、附了 48 张图表，老板为什么越看越茫然？"
          colleagueSender="同事小刘"
          colleagueRole="堆砌流水账"
          colleagueMessage="老板，这是我熬夜整理的本周全量汇报，一共 48 张表、8000 字，每个细节都全啦！"
          bossSender="老板"
          bossRole="信息过载"
          bossReply="我翻了二十分钟……到底哪块出事了、下周要改啥，你能直接说三句话吗？"
          takeawayText="⚠ 低价值流水账叫噪音，只会把真正致命的信号埋死"
          secondBubbleSec={6.26}
          takeawaySec={12.23}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场写汇报最常见的自我感动，就是把周报越写越长、表格越塞越满！",
              startMs: 250,
              endMs: 6011,
              timestampMs: 3131,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你以为这叫“认真细致、信息全面”，可老板翻了十分钟血压直往上飙：",
              startMs: 6261,
              endMs: 11926,
              timestampMs: 9094,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "几千字全是“开了多少会、发了多少贴”的噪音，唯一出事的警报反倒藏在角落里！",
              startMs: 12226,
              endMs: 18235,
              timestampMs: 15231,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneTrendModel
          name="02 信噪比过滤与决策熵减"
          from={20 * fps}
          durationInFrames={29 * fps}
          episodeLabel="EP59"
          sectionTitle="02 · 信噪比与熵减"
          accentColor="#38B764"
          title="决策熵减三刀：折叠正常噪音，只置顶改变动作的信号"
          mode="signal-noise"
          item1Title="过程苦劳 & ±1% 正常波动"
          item1Body="开了几次会、写了多少文档、常规指标正常抖动——看完不改任何动作，统统折叠进附录。"
          item2Title="偏离预期的异常红线信号"
          item2Body="核心付费页流失突增 8%——能直接触发“今天立刻回滚还是加码”的硬信号置顶第一行！"
          item3Title="黄金检验尺"
          item3Body="一条信息如果不决定明天改不改动作，就绝不要放到核心汇报第一页！"
          item4Title=""
          item4Body=""
          summaryCaption="好汇报不是字多表全，而是帮团队用最短时间锁定唯一动作"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "在信息论里，决定一份汇报有没有价值的，不是字数，而是“信噪比”。",
              startMs: 250,
              endMs: 5263,
              timestampMs: 2757,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "凡是看了之后不会改变任何动作的“过程流水账”和微弱波动，统统归进上面这层噪音区，直接过滤折叠；",
              startMs: 5513,
              endMs: 13356,
              timestampMs: 9435,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只有偏离预期、能触发下一步“加码或止损”的异常波动，才是下面漏出来的真信号！",
              startMs: 13606,
              endMs: 19689,
              timestampMs: 16648,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住一条黄金检验尺：一条指标如果不决定你明天改不改动作，就别往核心汇报第一页放！",
              startMs: 19939,
              endMs: 27046,
              timestampMs: 23493,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 汇报信息密度对比"
          from={49 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP59"
          sectionTitle="03 · 汇报密度对比"
          title="折叠 90% 日常噪音，把异常信号和建议动作放第一行"
          badLabel="✖ 堆砌噪音流水账"
          badSubtitle="苦劳很多，重点全无"
          badExample="“本周对接 6 部门，召开 9 次评审会，输出 14 份文档，日常浏览量微涨 0.5%……”"
          badNote="问题：信息熵爆表，唯一跌破警戒线的付费率被埋在第 24 页"
          goodLabel="✔ 高信噪比异常置顶"
          goodSubtitle="折叠正常项，直给信号"
          goodExample="“【红灯信号】核心付费页流失突增 8%（疑似弹窗拦截），建议今日 18 点前灰度回滚；其余正常。”"
          goodNote="亮点：3 秒看清警报与动作，老板直接拍板推进"
          goodCardSec={5.69}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边密密麻麻写了一堆苦劳和流水账，看完整个人更迷糊；",
              startMs: 250,
              endMs: 5387,
              timestampMs: 2819,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把正常数据全部折叠，只把唯一亮红灯的信号和对应动作放第一行，老板三秒钟就能批准执行！",
              startMs: 5687,
              endMs: 13824,
              timestampMs: 9756,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={64 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP59"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="某指标每天在 49%~51% 之间正常随机抖动，周报里需要每天写 200 字分析“今天为什么跌了 0.4%”吗？"
          answer="答案：绝对不要！对正常随机抖动做过度归因叫“把噪音当信号”，只会引导团队天天瞎折腾，超出警戒阈值再报警！"
          mantra="本集口诀：莫把苦劳当信号，正常波动先折叠；只留能改动作的硬变化，一眼看清怎么干！"
          countdownStartSec={3.33}
          answerSec={6.33}
          mantraSec={14.32}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：正常波动百分之零点四的指标，需要每天写两百字分析原因吗？",
              startMs: 250,
              endMs: 5927,
              timestampMs: 3089,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "错！那是把随机噪音当信号！折腾半天全是无用功，超出红线再高亮报警！",
              startMs: 6327,
              endMs: 13921,
              timestampMs: 10124,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：莫把苦劳当信号，正常波动先折叠；只留能改动作的硬变化，一眼看清怎么干！",
              startMs: 14321,
              endMs: 21823,
              timestampMs: 18072,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 万字周报配音"
          src={staticFile("audio/ep59-scene1.wav")}
          from={0}
          durationInFrames={547}
          volume={1}
        />
        <Audio
          name="02 信噪比配音"
          src={staticFile("audio/ep59-scene2.wav")}
          from={20 * fps}
          durationInFrames={811}
          volume={1}
        />
        <Audio
          name="03 密度对比配音"
          src={staticFile("audio/ep59-scene3.wav")}
          from={49 * fps}
          durationInFrames={415}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep59-scene4.wav")}
          from={64 * fps}
          durationInFrames={655}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 交万字周报"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板崩溃"
          src={staticFile("audio/ui-switch.wav")}
          from={6.26 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.23 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 噪音层"
          src={staticFile("audio/ui-switch.wav")}
          from={20.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 信号层"
          src={staticFile("audio/ui-click.wav")}
          from={22.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 黄金检验尺"
          src={staticFile("audio/ui-ding.wav")}
          from={25.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 噪音对比"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 信号置顶对比"
          src={staticFile("audio/ui-ding.wav")}
          from={54.69 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={67.33 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={68.33 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={69.33 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={70.33 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={78.32 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
