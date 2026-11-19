import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProbability } from "./scenes/SceneProbability";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP25Bayes: React.FC = () => {
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
      <Track name="EP25 Scenes">
        <SceneHook
          name="01 墙头草判断现场"
          durationInFrames={15 * fps}
          episodeLabel="EP25"
          sectionTitle="01 · 非 0 即 100 陷阱"
          headline="上午听分享激动打 100 分，下午听唱衰立刻扣到 0 分——为什么？"
          colleagueSender="同事"
          colleagueRole="盲目乐观"
          colleagueMessage="刚听完那场行业分享，简直是天才风口，咱们全仓押这个方向吧！"
          bossSender="老板"
          bossRole="瞬间归零"
          bossReply="前天竞品刚把这个项目砍了，要不咱们也一刀切全停了吧？"
          takeawayText="⚠ 大脑只有 0 和 1 的开关、没有概率刻度，永远被片面消息牵着走"
          secondBubbleSec={3.13}
          takeawaySec={8.55}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场判断最怕出现这种“两极跳”：",
              startMs: 250,
              endMs: 2884,
              timestampMs: 1567,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "上午听一场分享激动得打一百分，下午听一句唱衰直接扣到零分！",
              startMs: 3134,
              endMs: 8251,
              timestampMs: 5692,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "要么全信、要么全否，大脑永远只有开关没有刻度，到底怎么破？",
              startMs: 8551,
              endMs: 13739,
              timestampMs: 11145,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneProbability
          name="02 贝叶斯更新图解"
          from={15 * fps}
          durationInFrames={36 * fps}
          episodeLabel="EP25"
          sectionTitle="02 · 贝叶斯更新"
          accentColor="#73EFF7"
          title="把判断写成 0%~100% 滑块：按新证据权重动态调刻度"
          mode="bayes-update"
          item1Title="① 先设先验基准（Prior）"
          item1Body="不急着上头：假设新方向常规成功率先按 40% 打底"
          item2Title="② 检验新证据权重"
          item2Body="竞品砍业务是没市场还是他们缺钱？先核查真实原因"
          item3Title="③ 动态微调滑块"
          item3Body="查实对方资金链断裂：把握仅微调降到 35%，而非直接清零"
          item4Title="④ 小步验证再加权"
          item4Body="用可控成本试跑两周，拿到真实转化数据把把握推高到 62%"
          summaryCaption="高手每次只押注与当前把握度匹配的成本，保留随时修正的空间"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "真正的高手用的是贝叶斯滑块，四步动态算清把握度。",
              startMs: 250,
              endMs: 4428,
              timestampMs: 2339,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步先设基准线：先不急着上头，假设新项目常规成功率是四成；",
              startMs: 4678,
              endMs: 10361,
              timestampMs: 7519,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步看新证据：竞品裁撤是强警报还是烟雾弹？先核查是因为没市场，还是他们缺钱才砍；",
              startMs: 10611,
              endMs: 18755,
              timestampMs: 14683,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步做动态微调：查实对方是资金链断裂，那对我们的把握只微调降到三成五，而不是直接清零；",
              startMs: 19005,
              endMs: 27338,
              timestampMs: 23171,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "最后拿试跑数据继续加权：每次只押注与当前把握度匹配的成本，进退全在掌控中！",
              startMs: 27588,
              endMs: 34567,
              timestampMs: 31077,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 判断方式对比"
          from={51 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP25"
          sectionTitle="03 · 极端判断 vs 概率刻度"
          title="别做一惊一乍的“开关脑”，升级成随时修正的“滑块脑”"
          badLabel="✖ 零和一极端开关"
          badSubtitle="一条消息定生死"
          badExample="“竞品都撤了肯定没戏，立刻一刀切停掉项目，前期投入算我倒霉！”"
          badNote="问题：把弱信号当终审判决，白白丢掉真实机会"
          goodLabel="✔ 贝叶斯滑块更新"
          goodSubtitle="按证据强度调比例"
          goodExample="“竞品收缩值得警惕，先把成功把握从 50% 调到 35%，砍半预算先试跑两周拿硬数据。”"
          goodNote="亮点：成本随把握度浮动，进能放量、退可止损"
          goodCardSec={7.18}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边一有风吹草动就走极端，错失真机会还白白浪费前期投入；",
              startMs: 250,
              endMs: 6883,
              timestampMs: 3566,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把判断写成百分比滑块，跟着证据强度一格一格调，决策稳得多！",
              startMs: 7183,
              endMs: 12600,
              timestampMs: 9891,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={65 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP25"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="面试前只听到传闻说候选人“上家待半年就走”，能直接拿这条一票淘汰他吗？"
          answer="答案：不能直接淘汰！未经核实的口头传闻只是弱证据，应先微调把握分，再到面试中核查真实离职原因。"
          mantra="本集口诀：判断不搞零和一，看清证据调比例！"
          countdownStartSec={2.34}
          answerSec={5.34}
          mantraSec={11.63}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：听说候选人“半年就离职”，能直接一票淘汰吗？",
              startMs: 250,
              endMs: 4939,
              timestampMs: 2594,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！传言只是弱证据，先微调把握度，拿到真实离职原因再下定论！",
              startMs: 5339,
              endMs: 11227,
              timestampMs: 8283,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：判断不搞零和一，看清证据调比例！",
              startMs: 11627,
              endMs: 15678,
              timestampMs: 13652,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 墙头草现场配音"
          src={staticFile("audio/ep25-scene1.wav")}
          from={0}
          durationInFrames={413}
          volume={1}
        />
        <Audio
          name="02 贝叶斯图解配音"
          src={staticFile("audio/ep25-scene2.wav")}
          from={15 * fps}
          durationInFrames={1038}
          volume={1}
        />
        <Audio
          name="03 判断对比配音"
          src={staticFile("audio/ep25-scene3.wav")}
          from={51 * fps}
          durationInFrames={378}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep25-scene4.wav")}
          from={65 * fps}
          durationInFrames={471}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 盲目加仓"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 瞬间归零"
          src={staticFile("audio/ui-switch.wav")}
          from={3.13 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.55 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1步基准"
          src={staticFile("audio/ui-switch.wav")}
          from={15.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第2步证据"
          src={staticFile("audio/ui-click.wav")}
          from={17.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3步微调"
          src={staticFile("audio/ui-click.wav")}
          from={19.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第4步验证"
          src={staticFile("audio/ui-ding.wav")}
          from={20.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 极端开关"
          src={staticFile("audio/ui-switch.wav")}
          from={51.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 概率滑块"
          src={staticFile("audio/ui-ding.wav")}
          from={58.18 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={67.34 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={68.34 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={69.34 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={70.34 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={76.63 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
