import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneStrategy } from "./scenes/SceneStrategy";

export const EP46BarbellStrategy: React.FC = () => {
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
      <Track name="EP46 Scenes">
        <SceneHook
          name="01 裸辞与死守两难"
          durationInFrames={19 * fps}
          episodeLabel="EP46"
          sectionTitle="01 · 动荡选择两极"
          headline="死守旧岗怕淘汰、裸辞梭哈怕爆仓——怎么做到“绝不死还吃大肉”？"
          colleagueSender="焦虑同事"
          colleagueRole="进退两难"
          colleagueMessage="旧赛道越干越卷，但不干难道要立刻辞职押上全部积蓄 All-in 创业吗？"
          bossSender="理智前辈"
          bossRole="反脆弱思维"
          bossReply="千万别拿身家赌单点！既不躺平也不爆仓，给自己配一根“杠铃”！"
          takeawayText="⚠ 用 80% 稳住现金底盘 ＋ 20% 低成本博高赔率机会（杠铃策略）"
          secondBubbleSec={4.61}
          takeawaySec={10.49}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "行业一有风吹草动，很多人大脑就只剩下两个极端念头：",
              startMs: 250,
              endMs: 4357,
              timestampMs: 2303,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "要么死守旧岗位不敢越雷池半步，要么一咬牙裸辞押上全部身家去赌风口！",
              startMs: 4607,
              endMs: 10191,
              timestampMs: 7399,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "怎么才能在动荡里既保证“绝对不会死”，又能稳稳吃上新机会？用“杠铃策略”！",
              startMs: 10491,
              endMs: 17246,
              timestampMs: 13868,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneStrategy
          name="02 80/20 反脆弱杠铃"
          from={19 * fps}
          durationInFrames={38 * fps}
          episodeLabel="EP46"
          sectionTitle="02 · 杠铃策略 & 反脆弱"
          accentColor="#41A6F6"
          title="砍掉全押中间态！左端 80% 绝对稳健，右端 20% 博十倍风口"
          mode="barbell-strategy"
          item1Title="主业现金流 ＋ 核心退路"
          item1Body="保证风浪再大也绝不断粮、不借贷爆仓，这是你敢试错的全部底气"
          item2Title="全押平庸中间态"
          item2Body="既不稳也不高赔率，最容易温水煮青蛙"
          item3Title="业余时间 / 小预算测新赛道"
          item3Body="九次试错全败只亏 15%，绝不伤筋动骨；一旦押中 1 个直接跃迁"
          item4Title="反脆弱结构"
          item4Body="下跌有底、上涨无顶"
          summaryCaption="输的时候亏得起，赢的时候翻十倍——这就是反脆弱杠铃"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看看这根反脆弱杠铃怎么左右配重，把脆弱变成越晃越赚的优势。",
              startMs: 250,
              endMs: 5305,
              timestampMs: 2777,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边压住百分之八十到八十五的绝对安全盘：守住稳定现金流、核心手艺和健康退路，哪怕外面风暴再大也绝不爆仓；",
              startMs: 5555,
              endMs: 15607,
              timestampMs: 10581,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边拿百分之十五到二十输得起的低成本，放手去博不对称高赔率机会：比如周末测新业务、做 AI 自动化小工具、试跑新赛道；",
              startMs: 15857,
              endMs: 26168,
              timestampMs: 21012,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "最关键的是：万一右端九次试水全赔光，左端稳稳托住你不伤元气；只要有一次押中了十倍风口，整个人生直接跃迁！",
              startMs: 26418,
              endMs: 36283,
              timestampMs: 31350,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 资源配置对比"
          from={57 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP46"
          sectionTitle="03 · 单点梭哈 vs 杠铃配重"
          title="永远不要裸辞赌身家，要在稳健安全垫上长出高赔率触角"
          badLabel="✖ 死熬或全仓一把梭"
          badSubtitle="无退路的单点脆弱"
          badExample="“要么死守老岗位等裁员，要么辞职拿出 50 万积蓄租办公室 All-in 新风口！”"
          badNote="后果：稍有闪失直接破产出局，连重来的筹码都没了"
          goodLabel="✔ 80% 现金垫 ＋ 20% 试错包"
          goodSubtitle="小亏不痛、一中翻盘"
          goodExample="“主业与老业务先保住 80% 现金底盘，拆出 20% 周末和 2 万预算测 4 个高赔率小实验。”"
          goodNote="亮点：哪怕连续试错三次失败照样稳赢，一击命中立刻切换"
          goodCardSec={5.65}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边要么慢水煮青蛙、要么一次踩雷直接出局；",
              startMs: 250,
              endMs: 5349,
              timestampMs: 2799,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边在安全垫上长出高赔率触角，亏钱有限度、赚钱没上限，这才是真正的反脆弱！",
              startMs: 5649,
              endMs: 12912,
              timestampMs: 9280,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={71 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP46"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="传统软件公司拿 85% 研发稳住老客户续费，另拨 15% 人力做 3 个 AI 新应用轻量孵化。这属于什么打法？"
          answer="答案：最标准的企业级“杠铃策略”！85% 老业务保现金不断粮，15% 精兵低成本试新，成了一个就能切出第二曲线！"
          mantra="本集口诀：八成稳住压舱石，两成低本博十倍！"
          countdownStartSec={5.54}
          answerSec={8.54}
          mantraSec={15.48}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：八成半人力保老客户现金流，一成半人力低成本孵化三个 AI 新工具，这是什么打法？",
              startMs: 250,
              endMs: 8141,
              timestampMs: 4195,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！标准杠铃策略：稳住不断粮的基本盘，再用小筹码博取大风口！",
              startMs: 8541,
              endMs: 15081,
              timestampMs: 11811,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：八成稳住压舱石，两成低本博十倍！",
              startMs: 15481,
              endMs: 19555,
              timestampMs: 17518,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 裸辞两难配音"
          src={staticFile("audio/ep46-scene1.wav")}
          from={0}
          durationInFrames={518}
          volume={1}
        />
        <Audio
          name="02 杠铃图解配音"
          src={staticFile("audio/ep46-scene2.wav")}
          from={19 * fps}
          durationInFrames={1089}
          volume={1}
        />
        <Audio
          name="03 配置对比配音"
          src={staticFile("audio/ep46-scene3.wav")}
          from={57 * fps}
          durationInFrames={388}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep46-scene4.wav")}
          from={71 * fps}
          durationInFrames={587}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 焦虑两难"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 前辈点破"
          src={staticFile("audio/ui-switch.wav")}
          from={4.61 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.49 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 左端80%"
          src={staticFile("audio/ui-switch.wav")}
          from={19.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 砍掉中间"
          src={staticFile("audio/ui-click.wav")}
          from={21.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 右端20%"
          src={staticFile("audio/ui-ding.wav")}
          from={23.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 全仓一把梭"
          src={staticFile("audio/ui-switch.wav")}
          from={57.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 杠铃配重"
          src={staticFile("audio/ui-ding.wav")}
          from={62.65 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={76.54 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={77.54 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={78.54 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={79.54 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={86.48 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
