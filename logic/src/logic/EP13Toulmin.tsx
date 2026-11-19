import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { ScenePractice } from "./scenes/ScenePractice";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP13Toulmin: React.FC = () => {
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
      <Track name="EP13 Scenes">
        <SceneHook
          name="01 申请被打回现场"
          durationInFrames={15 * fps}
          episodeLabel="EP13"
          sectionTitle="01 · 要资源被打回"
          headline="“我写了最近很忙、请批 2 个人，为什么老板立刻打回来？”"
          colleagueSender="研发主管"
          colleagueRole="写申请"
          colleagueMessage="老板，最近需求太多测试实在跟不上了，Bug 积压很多，申请下月再招 2 个全职测试！"
          bossSender="老板"
          bossRole="三连反问"
          bossReply="忙就得批编制？不能写自动化吗？投进去的成本几个季度能回本？"
          takeawayText="⚠ 只喊自己有多苦，没替老板算清投资回报与替代方案"
          secondBubbleSec={5.5}
          takeawaySec={10.15}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "为什么你写了一份“我很忙、请批人”的申请，老板反手就给你打了回来？",
              startMs: 250,
              endMs: 5245,
              timestampMs: 2747,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为你只说了自己多辛苦，老板脑子里却立刻冒出三个反问：",
              startMs: 5495,
              endMs: 9848,
              timestampMs: 7671,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "值不值？有没有替代方案？达不到预期怎么办？",
              startMs: 10148,
              endMs: 14177,
              timestampMs: 12162,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <ScenePractice
          name="02 图尔敏四宫格"
          from={15 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP13"
          sectionTitle="02 · 图尔敏论证模型"
          accentColor="#FFCD75"
          title="让老板很难拒绝的四宫格：主张 + 数据 + 依据 + 堵反驳"
          mode="toulmin"
          slot1Title="① 核心主张（Claim）"
          slot1Body="申请下月增补 1 名中级测试工程师，专攻核心支付链路。"
          slot2Title="② 客观数据（Data）"
          slot2Body="上季度因人手缺口导致 3 次线上漏测，直接资损与客诉成本达 18 万元。"
          slot3Title="③ 正当依据（Warrant / ROI）"
          slot3Body="补人后回归提速 40%，预计每月止损 6 万元，3 个月即可回本。"
          slot4Title="④ 反驳预判（Rebuttal）"
          slot4Body="已用自动化覆盖 60% 常规用例，无法覆盖复杂并发支付，因此必须补专职人力。"
          summaryCaption="把“伸手要成本”变成“帮老板减损赚钱的投资案”"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "想要老板秒批，直接套用逻辑学最抗打的“图尔敏模型”。",
              startMs: 250,
              endMs: 4554,
              timestampMs: 2402,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步给主张和硬数据：申请一名测试，解决每月线上漏测损失五万块的问题；",
              startMs: 4804,
              endMs: 10544,
              timestampMs: 7674,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步亮出正当依据：配人后回归效率翻倍，三个月就能回本；",
              startMs: 10794,
              endMs: 15556,
              timestampMs: 13175,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步提前堵住反驳：已经排除了外包和脚本替代，这样老板想挑刺都挑不出来！",
              startMs: 15806,
              endMs: 21968,
              timestampMs: 18887,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 资源申请对比"
          from={38 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP13"
          sectionTitle="03 · 申请书前后对比"
          title="别卖惨求支持，把回本账和预判全摆在明面上"
          badLabel="✖ 乞求式申请"
          badSubtitle="只有情绪没有账本"
          badExample="“最近业务太卷，测试天天加班到深夜快扛不住了，恳请老板批 2 个 HC。”"
          badNote="问题：站在老板视角只有“又要花钱”，没有任何产出与替代说明"
          goodLabel="✔ 图尔敏提案"
          goodSubtitle="ROI+预判全给齐"
          goodExample="“【主张】申请 1 名测试；【依据】上季漏测致损 18 万，补人可缩回归 40% 三个月回本；【预判】已复用自动化覆盖 60% 用例。”"
          goodNote="亮点：所有反问提前替老板答完了，审批通过率翻倍"
          goodCardSec={5.39}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边靠卖惨求支持，老板只会觉得你在要成本；",
              startMs: 250,
              endMs: 5093,
              timestampMs: 2671,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把回本账和反对预判全写在前头，变成帮老板赚钱减损的投资案，批起来毫不犹豫！",
              startMs: 5393,
              endMs: 12061,
              timestampMs: 8727,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={51 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP13"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“申请买一套 5 万元的数据看板工具，因为竞品都在用，我们不能落后。”——最缺哪一块？"
          answer="答案：缺正当依据（这套工具能省多少工时/提高多少转化，何时回本）和反驳预判（为什么开源或免费工具替代不了）！"
          mantra="本集口诀：要资源别卖惨，亮数据、算回本、堵反驳！"
          countdownStartSec={2.4}
          answerSec={5.58}
          mantraSec={10.07}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“申请买五万元工具，因为竞品都在用”，最缺哪一块？",
              startMs: 250,
              endMs: 5180,
              timestampMs: 2715,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "缺的是能回本的正当依据，以及为什么免费工具替代不了！",
              startMs: 5580,
              endMs: 9669,
              timestampMs: 7624,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：要资源别卖惨，亮数据、算回本、堵反驳！",
              startMs: 10069,
              endMs: 15365,
              timestampMs: 12717,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 打回现场配音"
          src={staticFile("audio/ep13-scene1.wav")}
          from={0}
          durationInFrames={427}
          volume={1}
        />
        <Audio
          name="02 图尔敏模型配音"
          src={staticFile("audio/ep13-scene2.wav")}
          from={15 * fps}
          durationInFrames={661}
          volume={1}
        />
        <Audio
          name="03 申请对比配音"
          src={staticFile("audio/ep13-scene3.wav")}
          from={38 * fps}
          durationInFrames={364}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep13-scene4.wav")}
          from={51 * fps}
          durationInFrames={463}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 主管申请"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板反问"
          src={staticFile("audio/ui-switch.wav")}
          from={5.5 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.15 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 主张卡片"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 数据卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={17.1 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 依据卡片"
          src={staticFile("audio/ui-click.wav")}
          from={18.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 反驳预判"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 卖惨申请"
          src={staticFile("audio/ui-switch.wav")}
          from={38.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 图尔敏提案"
          src={staticFile("audio/ui-ding.wav")}
          from={43.39 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={53.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={54.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={55.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={56.58 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={61.07 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
