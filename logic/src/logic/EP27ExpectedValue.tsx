import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProbability } from "./scenes/SceneProbability";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP27ExpectedValue: React.FC = () => {
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
      <Track name="EP27 Scenes">
        <SceneHook
          name="01 盲目追爆款现场"
          durationInFrames={18 * fps}
          episodeLabel="EP27"
          sectionTitle="01 · 运气归因与胜率迷思"
          headline="爆款全组照抄、只敢选“高胜率保底活”——两个决策坑"
          colleagueSender="同事"
          colleagueRole="盲目归因"
          colleagueMessage="老王上周随手发条吐槽视频爆了十万赞！这周全组全部改成吐槽风吧！"
          bossSender="策划"
          bossRole="迷信高胜率"
          bossReply="那个新方案胜率才 40% 太悬了，咱们还是选 80% 稳过的小活动更保底！"
          takeawayText="⚠ 一次爆冷会回归均值，商业押注看“期望值 EV”而非表面胜率"
          secondBubbleSec={2.93}
          takeawaySec={10.21}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "团队做决策最常踩这两个坑：",
              startMs: 250,
              endMs: 2675,
              timestampMs: 1462,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "看到一次偶然爆款就急着总结秘籍全组照抄；选方案又只盯“成功率高不高”，不敢碰大机会！",
              startMs: 2925,
              endMs: 9911,
              timestampMs: 6418,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "想要不被短期运气骗走，你必须掌握两个武器：均值回归和期望值 EV！",
              startMs: 10211,
              endMs: 16563,
              timestampMs: 13387,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneProbability
          name="02 均值回归与期望值"
          from={18 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP27"
          sectionTitle="02 · 均值回归 & EV 期望"
          accentColor="#38B764"
          title="一次爆火不算真本事，赔率 × 胜率算清 EV 才是正收益"
          mode="regression-ev"
          item1Title="极端暴涨后必向均值回落"
          item1Body="单次爆款混杂平台流量红利；没有连续 10 次稳定样本，别急着把运气当铁律全组照搬。"
          item2Title="先拉长 10 次均值再归因"
          item2Body="避免追涨杀跌"
          item3Title="高胜率陷阱：80% 赚 1 万 / 20% 赔 10 万"
          item3Body="EV = 0.8×1 - 0.2×10 = -1.2 万（越稳亏越惨！）"
          item4Title="正 EV 押注：40% 赚 20 万 / 60% 亏 2 万"
          item4Body="EV = 0.4×20 - 0.6×2 = +6.8 万（赢大亏小长期必赢）"
          summaryCaption="高手不迷信高胜率，专挑“亏得起且期望值为正”的好牌持续下注"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "左边叫均值回归：一次爆火多半夹杂了平台运气红利，",
              startMs: 250,
              endMs: 4670,
              timestampMs: 2460,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "不拉长十次连续样本，千万别急着把偶发高点当成永久实力！",
              startMs: 4920,
              endMs: 10316,
              timestampMs: 7618,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再看右边的期望值算账法：保底活动看着胜率八成，可赢一万、输赔十万，期望值反而是负一万二；",
              startMs: 10566,
              endMs: 18839,
              timestampMs: 14702,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "新方案胜率虽只有四成，但赢了赚二十万、输了只亏两万，算完期望值高达正六点八万！高手押的是正期望，不是高胜率！",
              startMs: 19089,
              endMs: 29442,
              timestampMs: 24265,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 决策思维对比"
          from={49 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP27"
          sectionTitle="03 · 追爆款 vs 期望值押注"
          title="别被偶然波动带跑偏，用样本周期和正 EV 管好筹码"
          badLabel="✖ 运气归因 + 只看胜率"
          badSubtitle="被短期波动戏耍"
          badExample="“爆了一次全改风向！只接 80% 稳过的单，哪怕赚得少输了赔死。”"
          badNote="问题：追高买在山顶，保底项目净赚小钱背大锅"
          goodLabel="✔ 连续样本 + 正 EV 筛选"
          goodSubtitle="输得起时博大赔率"
          goodExample="“先连跑 10 次看均值；选正 EV 项目用小成本试错，输了亏 2 万、成了赚 20 万。”"
          goodNote="亮点：长期期望为正，几次失败照样赚回超额收益"
          goodCardSec={4.94}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边被偶然运气牵着跑，一惊一乍换打法；",
              startMs: 250,
              endMs: 4635,
              timestampMs: 2442,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先等样本收敛避开虚假归因，再用赔率加胜率算出正期望值，专挑“赢大亏小”的好牌打！",
              startMs: 4935,
              endMs: 12659,
              timestampMs: 8797,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={63 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP27"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="销冠上月超常爆单 5 倍，本月回落到平时业绩的 1.2 倍，老板该骂他“骄傲退步”吗？"
          answer="答案：不该！上月 5 倍包含运气极值，本月回到 1.2 倍正是正常的均值回归，依然高于团队基线水平。"
          mantra="本集口诀：单次爆冷别归因，算清期望再重注！"
          countdownStartSec={4.13}
          answerSec={7.13}
          mantraSec={14.58}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：销冠上月超常爆单五倍，本月掉回一点二倍，能骂他骄傲退步吗？",
              startMs: 250,
              endMs: 6726,
              timestampMs: 3488,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！极端值之后向平均水平回落叫均值回归，一点二倍依然很强，别瞎批评！",
              startMs: 7126,
              endMs: 14178,
              timestampMs: 10652,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：单次爆冷别归因，算清期望再重注！",
              startMs: 14578,
              endMs: 18629,
              timestampMs: 16603,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 追爆款现场配音"
          src={staticFile("audio/ep27-scene1.wav")}
          from={0}
          durationInFrames={497}
          volume={1}
        />
        <Audio
          name="02 均值回归EV配音"
          src={staticFile("audio/ep27-scene2.wav")}
          from={18 * fps}
          durationInFrames={884}
          volume={1}
        />
        <Audio
          name="03 决策对比配音"
          src={staticFile("audio/ep27-scene3.wav")}
          from={49 * fps}
          durationInFrames={380}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep27-scene4.wav")}
          from={63 * fps}
          durationInFrames={559}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 盲目照抄"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 迷信保底"
          src={staticFile("audio/ui-switch.wav")}
          from={2.93 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.21 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 均值回归"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 期望值EV"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 波动决策"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 正期望押注"
          src={staticFile("audio/ui-ding.wav")}
          from={53.94 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={67.13 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={68.13 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={69.13 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={70.13 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={77.58 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
