import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneReasoning } from "./scenes/SceneReasoning";

export const EP11ThreeInferences: React.FC = () => {
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
      <Track name="EP11 Scenes">
        <SceneHook
          name="01 查错误判现场"
          durationInFrames={17 * fps}
          episodeLabel="EP11"
          sectionTitle="01 · 线上故障误判"
          headline="“报错了，肯定是刚才改的配置搞挂的！”——别猜了，先分清推理"
          colleagueSender="运维小赵"
          colleagueRole="急着回滚"
          colleagueMessage="支付接口报错了！刚才刚好改过缓存配置，肯定是缓存搞挂的，赶紧回滚！"
          bossSender="架构师"
          bossRole="冷静排查"
          bossReply="等会！先看一眼监控，上游第三方支付网关也在同一秒超时了！"
          takeawayText="⚠ 把“最先想到的可能”直接当成“唯一真相”，是查故障的大忌"
          secondBubbleSec={5.64}
          takeawaySec={10.48}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "同事查线上故障：看到报错，就断定“一定是刚才改的配置搞挂的”，",
              startMs: 250,
              endMs: 5394,
              timestampMs: 2822,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果忙着回滚半天，问题还在，因为根本是第三方网关挂了！",
              startMs: 5644,
              endMs: 10178,
              timestampMs: 7911,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么会误判？因为汇报、复盘、查故障，用的压根不是同一种推理！",
              startMs: 10478,
              endMs: 16494,
              timestampMs: 13486,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneReasoning
          name="02 三大推理分工图"
          from={17 * fps}
          durationInFrames={24 * fps}
          episodeLabel="EP11"
          sectionTitle="02 · 三大推理工具箱"
          accentColor="#FFCD75"
          title="演绎定规矩 · 归纳做复盘 · 溯因查 Bug（先猜后验）"
          mode="three-inferences"
          item1Title="一般规则 ➔ 具体结论"
          item1Body="结论 100% 确定！适合立规矩、算账、审批合规与向下派活。"
          item2Title="多个样本 ➔ 一般规律"
          item2Body="结论是概率性的！适合月度复盘、用户访谈与提炼经验打法。"
          item3Title="异常现象 ➔ 最可能原因"
          item3Body="像侦探破案倒推原因！适合查线上 Bug 与归因，猜完必须立即验证！"
          summaryCaption="不同战场用不同武器：别拿小样本归纳当成 100% 定律"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场工具箱里有三把推理武器，分工完全不同。",
              startMs: 250,
              endMs: 4555,
              timestampMs: 2402,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一把叫“演绎”：从公司红线推导具体能不能做，百分百确定，适合定规则；",
              startMs: 4805,
              endMs: 10779,
              timestampMs: 7792,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二把叫“归纳”：从几十个复盘案例里提炼打法，用来总结规律；",
              startMs: 11029,
              endMs: 15955,
              timestampMs: 13492,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三把叫“溯因”：看到异常结果倒推最可能的原因，查故障全靠它，但猜完必须验一下！",
              startMs: 16205,
              endMs: 23042,
              timestampMs: 19623,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 推理匹配对比"
          from={41 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP11"
          sectionTitle="03 · 推理用对前后对比"
          title="分清“确定性推导”和“概率性猜想”，表达稳如老狗"
          badLabel="✖ 混淆推理"
          badSubtitle="小样本归纳当铁律"
          badExample="“我上周试了 2 个标题点击率很高，这就是全网爆款万能公式，以后全按这个写！”"
          badNote="问题：把不完全归纳当成 100% 演绎定律，遇到新场景必翻车"
          goodLabel="✔ 各司其职"
          goodSubtitle="精准匹配场景"
          goodExample="“用归纳从 30 篇案例提炼 3 个高点击特征，再用 A/B 验证；查故障先做溯因列 3 个疑似点，逐一排查。”"
          goodNote="亮点：定标准严密、做复盘克制、查问题不拍脑袋"
          goodCardSec={6.77}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿两个样本归纳出来的经验，当成百分百定律到处套，迟早翻车；",
              startMs: 250,
              endMs: 6468,
              timestampMs: 3359,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边各司其职：定规则用演绎，做总结用归纳，查问题先溯因再验证，思路稳如老狗！",
              startMs: 6768,
              endMs: 14053,
              timestampMs: 10410,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={56 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP11"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“公司规定超 5000 元采购须总监签字，这笔采购 8000 元，所以须总监签字。”——这是哪种推理？"
          answer="答案：演绎推理！从一般性规则（>5000 元须签字）推导到具体个案（8000 元），结论 100% 必然成立。"
          mantra="本集口诀：定规用演绎，复盘靠归纳，查错先溯因再验证！"
          countdownStartSec={3.5}
          answerSec={6.91}
          mantraSec={12.46}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：规定五千元以上要签字，这笔八千元所以要签字，属于哪种推理？",
              startMs: 250,
              endMs: 6514,
              timestampMs: 3382,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，这就是演绎推理，从规则推到具体个案，百分百确定！",
              startMs: 6914,
              endMs: 12063,
              timestampMs: 9488,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：定规用演绎，复盘靠归纳，查错先溯因再验证！",
              startMs: 12463,
              endMs: 17891,
              timestampMs: 15177,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 误判现场配音"
          src={staticFile("audio/ep11-scene1.wav")}
          from={0}
          durationInFrames={497}
          volume={1}
        />
        <Audio
          name="02 三大推理配音"
          src={staticFile("audio/ep11-scene2.wav")}
          from={17 * fps}
          durationInFrames={694}
          volume={1}
        />
        <Audio
          name="03 匹配对比配音"
          src={staticFile("audio/ep11-scene3.wav")}
          from={41 * fps}
          durationInFrames={424}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep11-scene4.wav")}
          from={56 * fps}
          durationInFrames={539}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运维发言"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 架构师提醒"
          src={staticFile("audio/ui-switch.wav")}
          from={5.64 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.48 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 演绎卡片"
          src={staticFile("audio/ui-click.wav")}
          from={17.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 归纳卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={19.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 溯因卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={21.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 混淆推理"
          src={staticFile("audio/ui-switch.wav")}
          from={41.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 各司其职"
          src={staticFile("audio/ui-ding.wav")}
          from={47.77 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={59.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={60.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={61.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={62.91 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={68.46 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
