import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneFallacy } from "./scenes/SceneFallacy";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP07CorrelationBias: React.FC = () => {
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
      <Track name="EP07 Scenes">
        <SceneHook
          name="01 周报归因现场"
          durationInFrames={13 * fps}
          episodeLabel="EP07"
          sectionTitle="01 · 周报归因翻车"
          headline="“改了按钮颜色，周末成交涨了 35%！”——真是你的功劳吗？"
          colleagueSender="运营小周"
          colleagueRole="周报喜讯"
          colleagueMessage="周五我把购买按钮从蓝改成橙，周末成交额暴涨 35%！说明橙色按钮极度有效！"
          bossSender="数据总监"
          bossRole="灵魂一问"
          bossReply="周末不是正好赶上平台发满减券吗？不改按钮颜色是不是也涨？"
          takeawayText="⚠ 把“同时发生”直接当成“我导致的”，是最容易翻车的伪归因"
          secondBubbleSec={3.28}
          takeawaySec={8.03}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "周报里最容易让人踩坑的“自我感动式归因”：",
              startMs: 250,
              endMs: 3026,
              timestampMs: 1638,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "周五改了个按钮颜色，周末成交额暴涨，就以为是颜色的功劳。",
              startMs: 3276,
              endMs: 7732,
              timestampMs: 5504,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "当领导问一句“周末不是发满减券了吗”，当场下不来台！",
              startMs: 8032,
              endMs: 11625,
              timestampMs: 9828,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneFallacy
          name="02 相关与幸存者偏差"
          from={13 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP07"
          sectionTitle="02 · 谬误透视镜"
          accentColor="#A77BCA"
          title="相关性 ≠ 因果性 + 幸存者偏差：别被数据表象骗了"
          mode="correlation-bias"
          leftTitle="周末大促发满减券！"
          leftDetail="按钮改橙色   〰   成交涨 35%（仅仅同时发生）"
          rightTitle="30% 留群老客：都夸好用"
          rightDetail="70% 没说话就卸载的沉默用户被完全忽略"
          summaryCaption="核心破局：用 A/B 对照剥离大盘变量，并主动寻找沉默流失样本"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "逻辑学提醒我们：两件事同时发生，叫相关，不叫因果。",
              startMs: 250,
              endMs: 5047,
              timestampMs: 2648,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "按钮改色和成交暴涨之间，很可能藏着“平台发券”这个第三变量。",
              startMs: 5347,
              endMs: 10322,
              timestampMs: 7834,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "还有幸存者偏差：老客户群里大家都在夸好用，但那百分之七十没进群就卸载的沉默用户，你根本没看到！",
              startMs: 10622,
              endMs: 19095,
              timestampMs: 14858,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 周报复盘对比"
          from={33 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP07"
          sectionTitle="03 · 周报复盘前后对比"
          title="不贪大盘的功劳，老板反而更信任你的专业度"
          badLabel="✖ 强行揽功"
          badSubtitle="把大盘当成自己业绩"
          badExample="“周五按钮改版后，周末成交暴涨 35%，充分证明本次视觉改版大获成功！”"
          badNote="问题：没做对照组，一被追问大促发券就会立刻穿帮"
          goodLabel="✔ 严谨归因"
          goodSubtitle="剥离变量+真实净值"
          goodExample="“周末大盘涨 35%（含发券红利）；通过同周期 A/B 实验剥离后，橙色按钮组点击率净提升 4.2%。”"
          goodNote="亮点：分清大盘与净增，严谨、诚实、有说服力"
          goodCardSec={5.54}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把大盘红利全算成自己功劳，经不起任何推敲；",
              startMs: 250,
              endMs: 5237,
              timestampMs: 2743,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边诚实交代大盘增长，再用对照实验把真正属于你的四点二个百分点剥出来，老板反而更信任你！",
              startMs: 5537,
              endMs: 12690,
              timestampMs: 9113,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={47 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP07"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“我们回访了 10 位续费老客户，100% 都夸产品完美，说明不用改版了！”——错在哪？"
          answer="答案：幸存者偏差！能留下来续费的本来就是最满意的那批人，对产品不满意的用户早就悄悄流失了。"
          mantra="本集口诀：同涨不代表因果，沉默样本也要看！"
          countdownStartSec={2.8}
          answerSec={6.08}
          mantraSec={11.4}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：回访十个续费老客都说好，说明产品不需要改版吗？",
              startMs: 250,
              endMs: 5683,
              timestampMs: 2966,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "错！这是幸存者偏差，不满意的人早就悄悄流失了。",
              startMs: 6083,
              endMs: 11003,
              timestampMs: 8543,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：同涨不代表因果，沉默样本也要看！",
              startMs: 11403,
              endMs: 15213,
              timestampMs: 13308,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 归因现场配音"
          src={staticFile("audio/ep07-scene1.wav")}
          from={0}
          durationInFrames={351}
          volume={1}
        />
        <Audio
          name="02 偏差图解配音"
          src={staticFile("audio/ep07-scene2.wav")}
          from={13 * fps}
          durationInFrames={575}
          volume={1}
        />
        <Audio
          name="03 周报对比配音"
          src={staticFile("audio/ep07-scene3.wav")}
          from={33 * fps}
          durationInFrames={383}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep07-scene4.wav")}
          from={47 * fps}
          durationInFrames={459}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运营周报"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 总监追问"
          src={staticFile("audio/ui-switch.wav")}
          from={3.28 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.03 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 相关卡片"
          src={staticFile("audio/ui-click.wav")}
          from={13.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 幸存者卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={14.8 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 破局总结"
          src={staticFile("audio/ui-ding.wav")}
          from={16.6 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 强行揽功"
          src={staticFile("audio/ui-switch.wav")}
          from={33.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 严谨归因"
          src={staticFile("audio/ui-ding.wav")}
          from={38.54 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={49.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={50.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={51.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={53.08 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={58.4 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
