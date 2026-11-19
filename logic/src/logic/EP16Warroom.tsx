import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { ScenePractice } from "./scenes/ScenePractice";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP16Warroom: React.FC = () => {
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
      <Track name="EP16 Scenes">
        <SceneHook
          name="01 扯皮会议现场"
          durationInFrames={15 * fps}
          episodeLabel="EP16"
          sectionTitle="01 · 全课程总实战"
          headline="喊口号、搬大厂、逼二选一…混乱扯皮会如何 5 分钟收口？"
          colleagueSender="运营代表"
          colleagueRole="强势施压"
          colleagueMessage="这周必须把转化“做上去”，不然老板追责！要么开发通宵全改，要么你们背锅！"
          bossSender="研发代表"
          bossRole="互相甩锅"
          bossReply="你们文案自己都没对齐，大厂也不这么搞啊，反正这锅我不背！"
          takeawayText="⚠ 概念模糊 + 虚假两难 + 诉诸权威 + 无边界分工 = 两小时无果"
          secondBubbleSec={2.93}
          takeawaySec={8.68}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "跨部门会议最常见的崩溃一幕：",
              startMs: 250,
              endMs: 2684,
              timestampMs: 1467,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "有人在喊口号，有人在逼二选一，有人搬出大厂，所有人都在甩锅！",
              startMs: 2934,
              endMs: 8384,
              timestampMs: 5659,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "十六节课学完了，今天我们用四步逻辑手术刀，现场把这场乱会五分钟收口！",
              startMs: 8684,
              endMs: 14038,
              timestampMs: 11361,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <ScenePractice
          name="02 四步逻辑手术刀"
          from={15 * fps}
          durationInFrames={26 * fps}
          episodeLabel="EP16"
          sectionTitle="02 · 4 步会议收口作战图"
          accentColor="#38B764"
          title="串联全课程武器：定词 → 排雷 → MECE 拆解 → 锁条件"
          mode="meeting-warroom"
          slot1Title="01 · 同一律定词"
          slot1Body="打断情绪，先把“把转化做上去”对齐为“注册转化率提升 2%”。"
          slot2Title="02 · 谬误排雷"
          slot2Body="拒绝“通宵或背锅”的虚假两难，踢掉“大厂怎么搞”，端出方案 C。"
          slot3Title="03 · MECE 拆解"
          slot3Body="按用户漏斗切一刀：曝光、点击、填表三段，不重不漏各认领一段。"
          slot4Title="04 · 锁充分条件"
          slot4Body="用“且”写死责任人与周四 18 点灰度节点，会议直接拍板散会！"
          summaryCaption="逻辑不是为了吵赢别人，而是用最短时间把复杂事推向前进"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "第一步用同一律：打断情绪，先把“把转化做上去”对齐为“注册转化率提升两个百分点”。",
              startMs: 250,
              endMs: 6895,
              timestampMs: 3572,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步用谬误排雷：拒绝“通宵或背锅”的虚假两难，端出方案 C。",
              startMs: 7145,
              endMs: 12359,
              timestampMs: 9752,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步用 MECE 拆解：按漏斗拆成“曝光、点击、填表”三段，各认领一段。",
              startMs: 12609,
              endMs: 19084,
              timestampMs: 15846,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第四步锁死充分条件：写清“且”的验收标准与负责人，会议直接结束拍板！",
              startMs: 19334,
              endMs: 25155,
              timestampMs: 22244,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 会议纪要对比"
          from={41 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP16"
          sectionTitle="03 · 会议收口前后对比"
          title="从扯皮两小时散会，变成十分钟锁定可执行纪要"
          badLabel="✖ 无效扯皮会"
          badSubtitle="看似和气其实没落地"
          badExample="“大家都再加把劲配合一下，方案回头再微调，有进展群里随时同步，散会！”"
          badNote="问题：目标模糊、条件缺失、责任不清，明天继续互相扯皮"
          goodLabel="✔ 逻辑定音纪要"
          goodSubtitle="目标·方案·条件全锁死"
          goodExample="“目标：注册率提 2%；方案 C：运营改首屏文案【且】研发只改 1 个按钮，周四 18 点灰度上线看 48 小时数据。”"
          goodNote="亮点：同一律+方案C+且条件全到位，拿起来就能干"
          goodCardSec={6.12}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边散会时一团和气，第二天照样没人干活、继续扯皮；",
              startMs: 250,
              endMs: 5816,
              timestampMs: 3033,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把词义、方案、条件和验收人全部锁死，十分钟就能高效散会！",
              startMs: 6116,
              endMs: 12790,
              timestampMs: 9453,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 毕业测验与总口诀"
          from={55 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP16"
          sectionTitle="04 · 毕业终极自测 & 全课总口诀"
          question="遇到“概念混乱 + 情绪甩锅 + 逼二选一”的会议，第一句话最应该先做什么？"
          answer="答案：先用同一律对齐大家到底要解决什么目标！连讨论的对象都没对齐，后面所有争论、拆解和拍板都是在做无用功。"
          mantra="全课总口诀：先对齐定义，再看穿套路；结构化拆解，用事实拍板！"
          countdownStartSec={2.5}
          answerSec={5.67}
          mantraSec={11.13}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "毕业自测：遇到又吵又逼选的扯皮会，第一句话最该先做什么？",
              startMs: 250,
              endMs: 5266,
              timestampMs: 2758,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！先用同一律对齐大家到底要解决什么目标，再找方案 C！",
              startMs: 5666,
              endMs: 10734,
              timestampMs: 8200,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "送你全课总口诀：先对齐定义，再看穿套路；结构化拆解，用事实拍板！恭喜毕业！",
              startMs: 11134,
              endMs: 19044,
              timestampMs: 15089,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 扯皮会议配音"
          src={staticFile("audio/ep16-scene1.wav")}
          from={0}
          durationInFrames={423}
          volume={1}
        />
        <Audio
          name="02 四步手术刀配音"
          src={staticFile("audio/ep16-scene2.wav")}
          from={15 * fps}
          durationInFrames={757}
          volume={1}
        />
        <Audio
          name="03 纪要对比配音"
          src={staticFile("audio/ep16-scene3.wav")}
          from={41 * fps}
          durationInFrames={386}
          volume={1}
        />
        <Audio
          name="04 毕业口诀配音"
          src={staticFile("audio/ep16-scene4.wav")}
          from={55 * fps}
          durationInFrames={573}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运营施压"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 研发甩锅"
          src={staticFile("audio/ui-switch.wav")}
          from={2.93 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.68 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 Step1同一律"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 Step2排雷"
          src={staticFile("audio/ui-switch.wav")}
          from={17.1 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 Step3MECE"
          src={staticFile("audio/ui-click.wav")}
          from={18.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 Step4锁条件"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 扯皮纪要"
          src={staticFile("audio/ui-switch.wav")}
          from={41.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 定音纪要"
          src={staticFile("audio/ui-ding.wav")}
          from={47.12 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={57.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={58.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={59.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={60.67 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 毕业口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={66.13 * fps}
          durationInFrames={42}
          volume={0.35}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
