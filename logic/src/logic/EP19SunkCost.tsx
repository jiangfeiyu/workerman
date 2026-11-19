import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDecision } from "./scenes/SceneDecision";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP19SunkCost: React.FC = () => {
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
      <Track name="EP19 Scenes">
        <SceneHook
          name="01 舍不得砍现场"
          durationInFrames={16 * fps}
          episodeLabel="EP19"
          sectionTitle="01 · 鸡肋项目取舍"
          headline="“已经投了 3 个月 50 万，现在砍掉岂不是全白费了？”"
          colleagueSender="项目经理"
          colleagueRole="不舍止损"
          colleagueMessage="这个模块已经做了 3 个月、花了 50 万，虽然上线没人用，但停掉实在太可惜了！"
          bossSender="财务总监"
          bossRole="点破真相"
          bossReply="先别提那 50 万！如果今天再给你 20 万，你投它还是投更有潜力的新线？"
          takeawayText="⚠ 被已经拿不回来的过去绑架，往往会赔掉更多未来的资源"
          secondBubbleSec={6.51}
          takeawaySec={12.42}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场最难做的一个决定：已经做了三个月、花掉五十万的鸡肋项目，到底砍不砍？",
              startMs: 250,
              endMs: 6258,
              timestampMs: 3254,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "很多人嘴里念叨着“都投入这么多了，停掉太可惜”，咬牙继续往里填坑，",
              startMs: 6508,
              endMs: 12115,
              timestampMs: 9311,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可为什么越不舍得停，最后亏得越惨？",
              startMs: 12415,
              endMs: 15180,
              timestampMs: 13797,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneDecision
          name="02 沉没vs机会成本"
          from={16 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP19"
          sectionTitle="02 · 在“今天”切一刀"
          accentColor="#FFCD75"
          title="决策只看“今天之后”的增量：沉没成本权重永远是 0"
          mode="sunk-cost"
          block1Title="已投 3 个月 + 50 万"
          block1Body="无论今天砍还是不砍，这 50 万都已经拿不回来了！逻辑决策里必须清零。"
          block2Title="方案 A：再投 20 万救旧线"
          block2Body="预期只换回 5 万"
          block3Title="方案 B：把 20 万投给新线"
          block3Body="预期能赚回 60 万！"
          summaryCaption="真正贵的不是过去花掉的 50 万，而是继续填坑错过的 60 万新机会"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把时间轴在“今天”切一刀，决策瞬间就清醒了。",
              startMs: 250,
              endMs: 3691,
              timestampMs: 1970,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "切点左边的“三个月和五十万”，叫沉没成本，不管你停不停，它都已经拿不回来了，必须彻底清零！",
              startMs: 3941,
              endMs: 11118,
              timestampMs: 7529,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真正决定要不要继续的，是切点右边的“机会成本”：",
              startMs: 11368,
              endMs: 14836,
              timestampMs: 13102,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "同样再投二十万，救这个项目只能换回五万，投给新业务能赚六十万，傻子都知道该怎么选！",
              startMs: 15086,
              endMs: 22156,
              timestampMs: 18621,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 止损汇报对比"
          from={39 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP19"
          sectionTitle="03 · 止损决策前后对比"
          title="把历史清零，只拿未来的钱比未来的账"
          badLabel="✖ 沉没成本绑架"
          badSubtitle="舍不得过去继续填坑"
          badExample="“前期已经投了 50 万和三个月人力，半途而废太可惜了，再补 20 万试试看吧！”"
          badNote="问题：为了面子和过去的心血，赔掉接下来的 20 万真金白银"
          goodLabel="✔ 机会成本决策"
          goodSubtitle="过去清零·未来比增量"
          goodExample="“过去 50 万已沉没不计；未来 20 万救旧线预期回报 5 万，转投新线预期回报 60 万，建议立刻止损切换。”"
          goodNote="亮点：理性止损、算清未来 ROI，老板反而夸你有大局观"
          goodCardSec={5.07}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边盯着过去已经沉没的五十万，越陷越深；",
              startMs: 250,
              endMs: 4773,
              timestampMs: 2511,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把历史清零，只拿未来的钱比未来的账，老板一眼就拍板止损，反而夸你有魄力！",
              startMs: 5073,
              endMs: 11923,
              timestampMs: 8498,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={52 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP19"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="你花了 2 小时精修一份方案，结果发现大方向全错了。这时该继续硬改，还是立刻推倒重来？"
          answer="答案：立刻推倒重来！花掉的 2 小时已是沉没成本，在错方向上打补丁只会白白浪费接下来的 5 小时！"
          mantra="本集口诀：过去的钱不算账，未来的钱比增量！"
          countdownStartSec={3.9}
          answerSec={7.18}
          mantraSec={13.01}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：花了两小时修方案却发现方向全错，该继续硬改还是推倒重来？",
              startMs: 250,
              endMs: 6775,
              timestampMs: 3512,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！立刻推倒重来，别让沉没的两小时绑架后面的五小时！",
              startMs: 7175,
              endMs: 12609,
              timestampMs: 9892,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：过去的钱不算账，未来的钱比增量！",
              startMs: 13009,
              endMs: 16673,
              timestampMs: 14841,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 鸡肋项目配音"
          src={staticFile("audio/ep19-scene1.wav")}
          from={0}
          durationInFrames={457}
          volume={1}
        />
        <Audio
          name="02 沉没机会配音"
          src={staticFile("audio/ep19-scene2.wav")}
          from={16 * fps}
          durationInFrames={667}
          volume={1}
        />
        <Audio
          name="03 止损对比配音"
          src={staticFile("audio/ep19-scene3.wav")}
          from={39 * fps}
          durationInFrames={360}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep19-scene4.wav")}
          from={52 * fps}
          durationInFrames={502}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 经理纠结"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务点破"
          src={staticFile("audio/ui-switch.wav")}
          from={6.51 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.42 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 沉没成本"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 机会成本"
          src={staticFile("audio/ui-click.wav")}
          from={18.3 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 总结"
          src={staticFile("audio/ui-ding.wav")}
          from={20.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 沉没绑架"
          src={staticFile("audio/ui-switch.wav")}
          from={39.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 增量对比"
          src={staticFile("audio/ui-ding.wav")}
          from={44.07 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={55.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={56.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={57.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={59.18 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={65.01 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
