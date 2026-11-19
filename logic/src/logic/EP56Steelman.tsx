import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneCrisis } from "./scenes/SceneCrisis";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP56Steelman: React.FC = () => {
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
      <Track name="EP56 Scenes">
        <SceneHook
          name="01 会议室互怼僵局"
          durationInFrames={18 * fps}
          episodeLabel="EP56"
          sectionTitle="01 · 会议室反驳翻车"
          headline="反驳别人总被回怼“你没听懂我在担心啥”，怎么破局？"
          colleagueSender="产品小吴"
          colleagueRole="攻击弱靶子"
          colleagueMessage="我觉得老王你反对改版就是保守、不愿意试新东西，太墨守成规了！"
          bossSender="运营老王"
          bossRole="死守防御盾"
          bossReply="胡说！你压根没听懂我在担心什么，老客流失了你背得起这个锅吗？！"
          takeawayText="⚠ 挑对方最弱的话扣帽子，只会逼对方把防御门锁死"
          secondBubbleSec={3.79}
          takeawaySec={9.35}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "会议室里为什么经常一反驳就变成吵架？",
              startMs: 250,
              endMs: 3544,
              timestampMs: 1897,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为你总爱挑对手话里最弱的漏洞扣帽子，说人家“保守、没大局观”！",
              startMs: 3794,
              endMs: 9047,
              timestampMs: 6421,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你以为自己赢了，其实对方一肚子火：你压根没听懂我真正在乎啥，死活不肯让步！",
              startMs: 9347,
              endMs: 16245,
              timestampMs: 12796,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCrisis
          name="02 稻草人 vs 钢人论证"
          from={18 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP56"
          sectionTitle="02 · 钢人论证"
          accentColor="#41A6F6"
          title="钢人论证三步：替对手补强到 100 分再精准拆解"
          mode="steelman"
          item1Title="扭曲对手成软靶子"
          item1Body="“你就是怕麻烦、阻拦创新！”——对方觉得被歪曲，绝不认输"
          item2Title="先补强到 100 分"
          item2Body="“你其实在保护大客户续费率、不想改版激怒老用户，这非常关键！”"
          item3Title="等对方点头确认"
          item3Body="听到对手亲口说“对！我就是这意思”——防御盾牌立刻放下"
          item4Title="拆解唯一关键环"
          item4Body="顺着最强顾虑给方案：“保留老版快捷切换入口”，对手立刻放行"
          summaryCaption="用最强善意理解对手，才能在对方的逻辑主场里一剑封喉"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "高段位说服靠的是稻草人的反面——“钢人论证”。",
              startMs: 250,
              endMs: 3878,
              timestampMs: 2064,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "低手造“稻草人”：故意歪曲对手的话，把靶子捏软了再一拳打倒，对方根本不服；",
              startMs: 4128,
              endMs: 10520,
              timestampMs: 7324,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "高手造“钢人”：先帮对手把理由补强到一百分！“你担心改版伤及老客续费率，这顾虑太关键了！”",
              startMs: 10770,
              endMs: 18628,
              timestampMs: 14699,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "等对方点头承认“对，我就是这意思”，防御墙立刻倒塌！这时你再针对他的最强顾虑给出保留老入口的方案，连对手都会拍手叫好！",
              startMs: 18878,
              endMs: 29434,
              timestampMs: 24156,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 反驳话术对比"
          from={49 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP56"
          sectionTitle="03 · 高段位说服对比"
          title="少给对手扣“保守”帽子，先讲透他的担忧再给解法"
          badLabel="✖ 攻击稻草人靶子"
          badSubtitle="人身贴标签激化对立"
          badExample="“你就是怕麻烦、不敢尝试新技术，按你这么说公司永远别升级了！”"
          badNote="问题：把专业讨论变成人身攻防，对方宁可卡死项目也不松口"
          goodLabel="✔ 钢人论证三步法"
          goodSubtitle="先补强 100 分再解耦"
          goodExample="“理解您担心拆架构拖垮交付节奏、运维翻倍；所以我们只拆最卡的支付模块，核心不动。”"
          goodNote="亮点：站在对方最强的顾虑上递方案，直接赢得尊重与放行"
          goodCardSec={7.08}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把对手丑化成“怕麻烦的守旧派”，哪怕你方案再好，对方也会拼命卡死；",
              startMs: 250,
              endMs: 6781,
              timestampMs: 3516,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先替对手把核心担忧讲透到一百分，再在他的逻辑框架里精准递出解法，既赢了方案又赢了人心！",
              startMs: 7081,
              endMs: 15314,
              timestampMs: 11198,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={66 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP56"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="钢人论证第一步，为什么一定要先让对方点头承认“对，你完全理解我的意思”？"
          answer="答案：一旦对方点头确认“靶子一致”，他就放下了防御盾牌，后续再也没法用“你曲解我”来逃避事实拆解！"
          mantra="本集口诀：别捏软靶稻草人，先替对手补到一百分；对方点头放下盾，精准拆掉关键环！"
          countdownStartSec={2.72}
          answerSec={5.72}
          mantraSec={11.51}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：钢人论证里，为什么要先让对方点头确认“你懂我的意思”？",
              startMs: 250,
              endMs: 5315,
              timestampMs: 2783,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！对方一点头就放下了防御盾牌，后面再也不好用“你曲解我”来耍赖！",
              startMs: 5715,
              endMs: 11111,
              timestampMs: 8413,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别捏软靶稻草人，先替对手补到一百分；对方点头放下盾，精准拆掉关键环！",
              startMs: 11511,
              endMs: 19009,
              timestampMs: 15260,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 互怼现场配音"
          src={staticFile("audio/ep56-scene1.wav")}
          from={0}
          durationInFrames={487}
          volume={1}
        />
        <Audio
          name="02 钢人论证配音"
          src={staticFile("audio/ep56-scene2.wav")}
          from={18 * fps}
          durationInFrames={883}
          volume={1}
        />
        <Audio
          name="03 话术对比配音"
          src={staticFile("audio/ep56-scene3.wav")}
          from={49 * fps}
          durationInFrames={459}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep56-scene4.wav")}
          from={66 * fps}
          durationInFrames={570}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 扣帽子攻击"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 对手怒怼"
          src={staticFile("audio/ui-switch.wav")}
          from={3.79 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.35 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 稻草人反例"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 Step1 补强100分"
          src={staticFile("audio/ui-click.wav")}
          from={20.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 Step2 对方点头"
          src={staticFile("audio/ui-click.wav")}
          from={23.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 Step3 精准拆解"
          src={staticFile("audio/ui-ding.wav")}
          from={26.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 稻草人对比"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 钢人对比"
          src={staticFile("audio/ui-ding.wav")}
          from={56.08 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={68.72 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={69.72 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={70.72 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={71.72 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={77.51 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
