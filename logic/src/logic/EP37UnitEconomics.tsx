import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEconomics } from "./scenes/SceneEconomics";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP37UnitEconomics: React.FC = () => {
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
      <Track name="EP37 Scenes">
        <SceneHook
          name="01 伪规模效应画饼"
          durationInFrames={18 * fps}
          episodeLabel="EP37"
          sectionTitle="01 · 伪规模画饼现场"
          headline="“卖一单亏 6 块、做到 100 万单就赚大钱？”——先算单单账！"
          colleagueSender="项目负责人"
          colleagueRole="盲目做大"
          colleagueMessage="老板，这单卖 30 块、进货加配送花了 36 块，但做到 100 万单摊薄成本就能赚大钱！"
          bossSender="财务总监"
          bossRole="拆穿倒挂"
          bossReply="等等……每卖一单直接亏 6 块钱，做到 100 万单难道不是稳亏 600 万吗？！"
          takeawayText="⚠ 卖得越多亏得越快，问题出在“可变成本倒挂（负 UE）”"
          secondBubbleSec={3.36}
          takeawaySec={8.69}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "商业汇报里最常听见的一句大饼就是：",
              startMs: 250,
              endMs: 3106,
              timestampMs: 1678,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“前期先赔本赚吆喝，只要把销量拉到一百万单，成本摊薄就盈利了！”",
              startMs: 3356,
              endMs: 8390,
              timestampMs: 5873,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "这句话到底是真战略还是无底洞？拿“单位经济模型 UE”算一单账，当场现形！",
              startMs: 8690,
              endMs: 16249,
              timestampMs: 12469,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEconomics
          name="02 单位经济模型图解"
          from={18 * fps}
          durationInFrames={32 * fps}
          episodeLabel="EP37"
          sectionTitle="02 · 单位经济模型 UE"
          accentColor="#FFCD75"
          title="把一单切成“可变”与“固定”：单均倒挂时做大只会加速亏"
          mode="unit-economics"
          item1Title="卖 30 元，可变成本花 36 元"
          item1Body="进货 22 + 冷链配送与补贴 14 = 36 > 30 元，每加一单净亏 6 元"
          item2Title="10 万单亏穿 60 万"
          item2Body="可变成本不会因放量消失"
          item3Title="单价 − 可变成本 > 0（正毛利）"
          item3Body="先把单单毛利调到正数（如 +10 元），每多卖一单都在往回赚固定成本"
          item4Title="放量才真能摊薄"
          item4Body="冲过平衡点后研发房租被彻底摊薄"
          summaryCaption="先让最小一单赚正毛利，再谈用规模摊薄固定研发与房租"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看穿“伪规模效应”，只需要把一笔订单切成两块成本。",
              startMs: 250,
              endMs: 4260,
              timestampMs: 2255,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边是负的单位模型：卖三十块，进货加冷链配送和补贴直接花掉三十六，每加一单净亏六块，这叫可变成本倒挂！",
              startMs: 4510,
              endMs: 13888,
              timestampMs: 9199,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可变成本不会因为你卖得多就神奇消失，冲到十万单只会瞬间亏穿六十万；",
              startMs: 14138,
              endMs: 19920,
              timestampMs: 17029,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真正能靠做大盈利的项目在右边：单价减可变成本必须为正，先把单均毛利做成正数，扩大规模才能把研发和房租摊薄赚大钱！",
              startMs: 20170,
              endMs: 30295,
              timestampMs: 25232,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 扩张策略对比"
          from={50 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP37"
          sectionTitle="03 · 盲目冲量 vs 先跑正 UE"
          title="单单亏钱时踩油门等于自杀，先把一单算平再踩油"
          badLabel="✖ 带亏硬冲规模"
          badSubtitle="用总单量掩盖失血"
          badExample="“先别算单单亏几块，赶紧低价发券把日单量砸上去，资本才会买单！”"
          badNote="后果：补贴一断单量瞬间清零，留下巨额真金白银亏损"
          goodLabel="✔ 先锁正 UE 再放量"
          goodSubtitle="改客单与履约成本"
          goodExample="“先停掉亏损低价单；靠满额包邮提客单、压低单均配送费，把单单毛利调到 +5 元再投放！”"
          goodNote="亮点：每多一单都在造血，规模越大公司越健康"
          goodCardSec={5.45}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿着漏水单量猛冲，订单越多流血越快；",
              startMs: 250,
              endMs: 5145,
              timestampMs: 2697,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先花两周把最小一单的账算平算正，再去放大规模，每一单都在给公司造血！",
              startMs: 5445,
              endMs: 11728,
              timestampMs: 8586,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={63 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP37"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="咖啡卖 9.9 元，单杯豆奶人工变动成本 7 元，只因每天只卖 200 杯摊不平 3000 元房租而亏损，能靠冲量救吗？"
          answer="答案：能救！单杯净赚 9.9 − 7 = +2.9 元（正 UE），把日销量拉过盈亏平衡点摊薄房租就能盈利！"
          mantra="本集口诀：单单倒挂别冲量，算正毛利再放大！"
          countdownStartSec={5.39}
          answerSec={8.39}
          mantraSec={15.47}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：咖啡卖九块九、单杯变动成本七块，只是因为每天卖太少才没回本，这能靠冲量救回来吗？",
              startMs: 250,
              endMs: 7985,
              timestampMs: 4117,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！每杯净赚两块九是正模型，把日销量拉上去摊薄固定房租就能盈利！",
              startMs: 8385,
              endMs: 15073,
              timestampMs: 11729,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：单单倒挂别冲量，算正毛利再放大！",
              startMs: 15473,
              endMs: 19446,
              timestampMs: 17459,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 伪规模现场配音"
          src={staticFile("audio/ep37-scene1.wav")}
          from={0}
          durationInFrames={488}
          volume={1}
        />
        <Audio
          name="02 UE模型图解配音"
          src={staticFile("audio/ep37-scene2.wav")}
          from={18 * fps}
          durationInFrames={909}
          volume={1}
        />
        <Audio
          name="03 扩张对比配音"
          src={staticFile("audio/ep37-scene3.wav")}
          from={50 * fps}
          durationInFrames={352}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep37-scene4.wav")}
          from={63 * fps}
          durationInFrames={584}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 画大饼"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务拆穿"
          src={staticFile("audio/ui-switch.wav")}
          from={3.36 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.69 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 负UE"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 正UE"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 带亏冲量"
          src={staticFile("audio/ui-switch.wav")}
          from={50.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 正模型放量"
          src={staticFile("audio/ui-ding.wav")}
          from={55.45 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={68.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={69.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={70.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={71.39 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={78.47 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
