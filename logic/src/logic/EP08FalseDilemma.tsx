import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneFallacy } from "./scenes/SceneFallacy";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP08FalseDilemma: React.FC = () => {
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
      <Track name="EP08 Scenes">
        <SceneHook
          name="01 逼宫二选一"
          durationInFrames={14 * fps}
          episodeLabel="EP08"
          sectionTitle="01 · 职场二选一陷阱"
          headline="“要么全员通宵赶工，要么项目延期你担全责，你选吧！”"
          colleagueSender="业务方"
          colleagueRole="强势逼宫"
          colleagueMessage="现在就两个选择：要么你们全员通宵按时上，要么项目延期你担全责，赶紧选吧！"
          bossSender="研发主管"
          bossRole="冷静破局"
          bossReply="等等…为什么只有这两个极端选项？不能核心先上、边缘分批吗？"
          takeawayText="⚠ 故意把现实压缩成两个死按钮，其实是想逼你进圈套"
          secondBubbleSec={4.85}
          takeawaySec={9.56}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场谈判最窒息的一幕：对方直接给你甩出两个极端选项：",
              startMs: 250,
              endMs: 4604,
              timestampMs: 2427,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“要么全员通宵赶工，要么项目延期你背锅，你自己选吧！”",
              startMs: 4854,
              endMs: 9256,
              timestampMs: 7055,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "这两个按钮无论按哪一个都很惨，其实你根本不用按！",
              startMs: 9556,
              endMs: 13171,
              timestampMs: 11363,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneFallacy
          name="02 光谱展开图解"
          from={14 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP08"
          sectionTitle="02 · 谬误透视镜"
          accentColor="#38B764"
          title="虚假两难（非黑即白）：把死开关拉开成连续光谱"
          mode="spectrum"
          leftTitle="全员通宵赶工"
          leftDetail="项目整包延期"
          rightTitle="核心先上·边缘延后"
          rightDetail="复用旧组件降工期"
          summaryCaption="核心破局：拒绝在对方的二选一盒子里做题，直接拿出方案 C"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "逻辑学把这种套路叫“虚假两难”，也就是非黑即白。",
              startMs: 250,
              endMs: 4150,
              timestampMs: 2200,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对方故意把现实世界藏起来，只留给你左黑右白两个死开关。",
              startMs: 4450,
              endMs: 8723,
              timestampMs: 6586,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只要把开关拉开成一条连续光谱，中间明明还有“核心先上、边缘延后”和“复用旧模块”好几个稳妥方案！",
              startMs: 9023,
              endMs: 16226,
              timestampMs: 12624,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 谈判破局对比"
          from={31 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP08"
          sectionTitle="03 · 破局话术对比"
          title="跳出非黑即白的盒子，端出方案 C 拿回主动权"
          badLabel="✖ 被迫二选一"
          badSubtitle="在对方规则里吃亏"
          badExample="“那…那好吧，我们今晚全员留下来通宵赶工试试吧。”"
          badNote="问题：默认接受了虚假前提，结果往往又累又容易出 Bug"
          goodLabel="✔ 端出方案 C"
          goodSubtitle="拆出双赢中间解"
          goodExample="“A 和 B 代价都太大。我提供方案 C：80% 核心功能本周五如期上线，20% 动效下周二补齐，既保上线又不透支团队。”"
          goodNote="亮点：兼顾业务上线窗口与工程质量，双方都能接受"
          goodCardSec={4.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边被困在别人的二选一盒子里，怎么选都吃亏；",
              startMs: 250,
              endMs: 4527,
              timestampMs: 2388,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边直接拒绝虚假两难，端出方案 C：八成核心按期上，两成低优下周补，瞬间拿回主动权！",
              startMs: 4827,
              endMs: 12558,
              timestampMs: 8692,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={45 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP08"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“我问了两个实习生都说不会用这个新工具，看来全公司都用不起来！”——错在哪？"
          answer="答案：以偏概全！2 个刚入职的实习生代表不了全公司不同岗位和老员工，样本过小且存在偏差。"
          mantra="本集口诀：遇到逼选先找 C，局部特例别代表全部！"
          countdownStartSec={3.1}
          answerSec={6.38}
          mantraSec={11.44}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：两个实习生不会用新工具，就断定全公司都用不起来，错在哪？",
              startMs: 250,
              endMs: 5986,
              timestampMs: 3118,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，这就是以偏概全，拿两个小样本硬推全公司！",
              startMs: 6386,
              endMs: 11042,
              timestampMs: 8714,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：遇到逼选先找 C，局部特例别代表全部！",
              startMs: 11442,
              endMs: 15535,
              timestampMs: 13488,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 逼宫现场配音"
          src={staticFile("audio/ep08-scene1.wav")}
          from={0}
          durationInFrames={397}
          volume={1}
        />
        <Audio
          name="02 光谱图解配音"
          src={staticFile("audio/ep08-scene2.wav")}
          from={14 * fps}
          durationInFrames={489}
          volume={1}
        />
        <Audio
          name="03 破局对比配音"
          src={staticFile("audio/ep08-scene3.wav")}
          from={31 * fps}
          durationInFrames={379}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep08-scene4.wav")}
          from={45 * fps}
          durationInFrames={468}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 业务逼宫"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 主管破局"
          src={staticFile("audio/ui-switch.wav")}
          from={4.85 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.56 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 两难开关"
          src={staticFile("audio/ui-switch.wav")}
          from={14.5 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 光谱展开"
          src={staticFile("audio/ui-click.wav")}
          from={15.8 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 破局总结"
          src={staticFile("audio/ui-ding.wav")}
          from={17.6 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 被迫二选一"
          src={staticFile("audio/ui-switch.wav")}
          from={31.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 端出方案C"
          src={staticFile("audio/ui-ding.wav")}
          from={35.83 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={48.1 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={49.1 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={50.1 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={51.38 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={56.44 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
