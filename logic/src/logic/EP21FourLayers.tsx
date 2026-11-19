import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneNegotiation } from "./scenes/SceneNegotiation";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP21FourLayers: React.FC = () => {
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
      <Track name="EP21 Scenes">
        <SceneHook
          name="01 立场死磕现场"
          durationInFrames={16 * fps}
          episodeLabel="EP21"
          sectionTitle="01 · 立场硬碰硬"
          headline="“周五必须上！”“绝不同意！”——为什么道理讲尽还是卡死？"
          colleagueSender="业务方"
          colleagueRole="死守时间"
          colleagueMessage="这个活动周五必须全量上线，错过这波周末流量就彻底浪费了！"
          bossSender="测试主管"
          bossRole="死守底线"
          bossReply="不管你怎么说，我就是不同意上线，这版风险太大！"
          takeawayText="⚠ 双方都停在第一层“立场”上硬碰硬，永远谈不拢"
          secondBubbleSec={3.42}
          takeawaySec={8.41}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "跨部门开会最怕遇到这种死胡同：",
              startMs: 250,
              endMs: 3171,
              timestampMs: 1710,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一方喊“周五必须上”，另一方咬死“绝不同意”，谁也说服不了谁！",
              startMs: 3421,
              endMs: 8111,
              timestampMs: 5766,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么讲了一堆道理还是卡死？因为你们俩都停在最表面那一层硬碰硬！",
              startMs: 8411,
              endMs: 14687,
              timestampMs: 11549,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneNegotiation
          name="02 四层剥离图解"
          from={16 * fps}
          durationInFrames={26 * fps}
          episodeLabel="EP21"
          sectionTitle="02 · 四层剥离法"
          accentColor="#38B764"
          title="把死命令往下剥四层：看清对方真正想要的安全感"
          mode="four-layers"
          item1Title="① 表层立场"
          item1Body="“绝不同意这周五全量上线！”（在此层硬杠永远无解）"
          item2Title="② 主观观点"
          item2Body="“我觉得这版太赶、风险太不可控！”"
          item3Title="③ 触发事实"
          item3Body="上个月抢上线导致线上崩了 2 小时，测试团队被通报批评"
          item4Title="④ 底层真需求"
          item4Body="不是针对业务，只是怕再出事故背绩效锅，需要可控的兜底证明！"
          summaryCaption="满足对方的底层真需求，表层的死立场自然就松动了"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "高手化解死磕，靠的是把话往下剥四层。",
              startMs: 250,
              endMs: 4206,
              timestampMs: 2228,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一层叫立场：“绝不同意上”，在立场上吵架永远无解；",
              startMs: 4456,
              endMs: 8989,
              timestampMs: 6722,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "剥到第二、三层，看见他的观点和触发事实：上个月因为没压测，线上崩过两小时；",
              startMs: 9239,
              endMs: 15919,
              timestampMs: 12579,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再剥到最底层的真需求：他不是针对你，他只是怕再出事故背绩效锅！满足他这个安全感，上线立马放行！",
              startMs: 16169,
              endMs: 25512,
              timestampMs: 20840,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 谈判沟通对比"
          from={42 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP21"
          sectionTitle="03 · 破局沟通对比"
          title="别给对方扣帽子，直接把他的安全感兜住"
          badLabel="✖ 立场互怼"
          badSubtitle="扣帽子激化矛盾"
          badExample="“你们测试就是缺乏大局观，天天卡着业务线不让上线，出问题谁负责？”"
          badNote="问题：否定对方专业价值，对方只能把门锁得更死"
          goodLabel="✔ 满足真需求"
          goodSubtitle="共情+技术兜底"
          goodExample="“理解你担心再出故障；如果今天补齐压测报告，并加上一键降级开关，周五能灰度先上 20% 吗？”"
          goodNote="亮点：直接回应“防背锅”需求，测试主动帮着推进上线"
          goodCardSec={5.91}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边扣帽子指责对方没大局观，对方只会把门关得更死；",
              startMs: 250,
              endMs: 5612,
              timestampMs: 2931,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边直接回应他的底层安全需求，用“压测加一键降级”把风险兜住，对方主动帮着你推进上线！",
              startMs: 5912,
              endMs: 12938,
              timestampMs: 9425,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={56 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP21"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="法务死活不批合同里的某句话，嘴上说“行业从不这么写”。法务真正的底层需求是什么？"
          answer="答案：控制违约赔付上限、避免公司踩合规红线！只要把免责或赔付上限写进条款，法务立刻放行。"
          mantra="本集口诀：别在立场上硬碰硬，往下剥到真需求！"
          countdownStartSec={3.2}
          answerSec={6.48}
          mantraSec={12.4}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：法务死活不批合同，嘴上说“从不这么写”，他的真需求是什么？",
              startMs: 250,
              endMs: 6083,
              timestampMs: 3166,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！不是故意刁难，而是要控制赔付上限、避免合规踩雷！",
              startMs: 6483,
              endMs: 12002,
              timestampMs: 9242,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别在立场上硬碰硬，往下剥到真需求！",
              startMs: 12402,
              endMs: 16521,
              timestampMs: 14461,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 立场现场配音"
          src={staticFile("audio/ep21-scene1.wav")}
          from={0}
          durationInFrames={443}
          volume={1}
        />
        <Audio
          name="02 四层剥离配音"
          src={staticFile("audio/ep21-scene2.wav")}
          from={16 * fps}
          durationInFrames={767}
          volume={1}
        />
        <Audio
          name="03 沟通对比配音"
          src={staticFile("audio/ep21-scene3.wav")}
          from={42 * fps}
          durationInFrames={390}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep21-scene4.wav")}
          from={56 * fps}
          durationInFrames={498}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 业务施压"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 测试卡住"
          src={staticFile("audio/ui-switch.wav")}
          from={3.42 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.41 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1层"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第2层"
          src={staticFile("audio/ui-click.wav")}
          from={18.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3层"
          src={staticFile("audio/ui-click.wav")}
          from={19.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第4层真需求"
          src={staticFile("audio/ui-ding.wav")}
          from={21.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 立场互怼"
          src={staticFile("audio/ui-switch.wav")}
          from={42.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 满足需求"
          src={staticFile("audio/ui-ding.wav")}
          from={47.91 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={59.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={60.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={61.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={62.48 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={68.4 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
