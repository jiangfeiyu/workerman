import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneOrgMechanism } from "./scenes/SceneOrgMechanism";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP41PrincipalAgent: React.FC = () => {
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
      <Track name="EP41 Scenes">
        <SceneHook
          name="01 监管扯皮现场"
          durationInFrames={17 * fps}
          episodeLabel="EP41"
          sectionTitle="01 · 委托代理矛盾"
          headline="为什么按天雇来的团队总在磨洋工，不盯着就慢吞吞？"
          colleagueSender="部门主管"
          colleagueRole="抓狂盯梢"
          colleagueMessage="外包报了三十天工期，怎么天天磨洋工，半个月才完成一丁点啊？"
          bossSender="监工同事"
          bossRole="道破规则"
          bossReply="废话！人家按两千块一天算工资，拖得越慢赚得越多，换你也不想早完工！"
          takeawayText="⚠ 付钱机制和目标反着来，就会陷入无尽的“猫鼠盯梢死局”"
          secondBubbleSec={4.05}
          takeawaySec={9.93}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "找别人帮忙办件事，最累人的不是活有多难，",
              startMs: 250,
              endMs: 3798,
              timestampMs: 2024,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "而是你天天提心吊胆防着他磨洋工、报虚价，对方还嫌你管得死！",
              startMs: 4048,
              endMs: 9631,
              timestampMs: 6839,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么总是陷入“猫捉老鼠”的死局？因为你的分钱机制和目标根本是反着来的！",
              startMs: 9931,
              endMs: 15313,
              timestampMs: 12622,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneOrgMechanism
          name="02 激励相容图解"
          from={17 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP41"
          sectionTitle="02 · 激励相容设计"
          accentColor="#38B764"
          title="告别“猫鼠盯梢”：用激励相容把分钱与目标绑在一起"
          mode="principal-agent"
          item1Title="按天/按人头发死钱，目标打架"
          item1Body="拖得越久、塞人越多反而赚越多，省成本干得快反而少拿钱"
          item2Title="监工成本比工钱高"
          item2Body="全靠喊觉悟和派人盯梢根本管不住"
          item3Title="总包一口价 ＋ 省本提前分红"
          item3Body="把“按时间拿钱”改成“按结果、省下预算分奖金”，对方为自己赚大头就会拼命快干"
          item4Title="顺着人性自驱推进"
          item4Body="不用催进度，对方自己优化效率"
          summaryCaption="好机制让对方为自己赚钱的同时，刚好把你的事办漂亮"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把老板和执行方的账摊开，立刻明白问题出在哪里。",
              startMs: 250,
              endMs: 4110,
              timestampMs: 2180,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "这叫“委托代理矛盾”：按死日薪或固定人头付钱，对方拖得越久、塞人越多赚得越丰厚，你的目标和他完全打架；",
              startMs: 4360,
              endMs: 13471,
              timestampMs: 8915,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "靠监工盯梢和开会喊格局，监控成本比工钱还贵！",
              startMs: 13721,
              endMs: 18169,
              timestampMs: 15945,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "高手用的是“激励相容”：一口价包干加提前完工奖，或者按省下的成本分成！顺着人性让他为自己多赚钱，他就比你还拼命把事办漂亮！",
              startMs: 18419,
              endMs: 29430,
              timestampMs: 23924,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 激励设计对比"
          from={48 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP41"
          sectionTitle="03 · 过程按天 vs 结果包干"
          title="不要挑战人性去催人干活，改分钱公式对方自己就冲了"
          badLabel="✖ 按过程人天发死钱"
          badSubtitle="奖励拖延与凑人数"
          badExample="“你们按人天来驻场开发吧，每人每天 2000 元，做到上线为止！”"
          badNote="后果：能干十天的活故意拆三十天，还给你塞进三个新手充数"
          goodLabel="✔ 结果包干 ＋ 提前分成"
          goodSubtitle="把省时收益分给执行方"
          goodExample="“总预算 10 万包干交付；提前上线且零 P0 故障，省下工期的 30% 直接作额外奖金！”"
          goodNote="亮点：不用派十个监工盯，对方半夜主动替你优化交付节奏"
          goodCardSec={6.44}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边付钱方式在鼓励对方拖时间，你得派十个监工天天盯着；",
              startMs: 250,
              endMs: 6142,
              timestampMs: 3196,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把结果利益绑死在同一方向，不用你催进度，对方半夜自己主动优化工期！",
              startMs: 6442,
              endMs: 12440,
              timestampMs: 9441,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={62 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP41"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="工厂将设备维修工改成“每修好一次故障奖 200 元”，一个月后机器却坏得更勤了，为什么？"
          answer="答案：激励写反了！按修理次数发奖等于鼓励“留隐患让机器天天坏”，改按“机器连续无故障运行天数”发奖立刻治好！"
          mantra="本集口诀：别靠盯梢管人性，把钱绑在结果上！"
          countdownStartSec={3.31}
          answerSec={6.31}
          mantraSec={13.84}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：按“每修一次奖两百”发给维修工，为什么机器反而坏得更勤了？",
              startMs: 250,
              endMs: 5905,
              timestampMs: 3077,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！你奖励的是“修理次数”而不是“机器不坏”，改按连续零故障天数发奖立刻治好！",
              startMs: 6305,
              endMs: 13438,
              timestampMs: 9871,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别靠盯梢管人性，把钱绑在结果上！",
              startMs: 13838,
              endMs: 17580,
              timestampMs: 15709,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 监管扯皮配音"
          src={staticFile("audio/ep41-scene1.wav")}
          from={0}
          durationInFrames={460}
          volume={1}
        />
        <Audio
          name="02 激励相容配音"
          src={staticFile("audio/ep41-scene2.wav")}
          from={17 * fps}
          durationInFrames={883}
          volume={1}
        />
        <Audio
          name="03 激励对比配音"
          src={staticFile("audio/ep41-scene3.wav")}
          from={48 * fps}
          durationInFrames={374}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep41-scene4.wav")}
          from={62 * fps}
          durationInFrames={528}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 主管抓狂"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 监工揭秘"
          src={staticFile("audio/ui-switch.wav")}
          from={4.05 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.93 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 委托矛盾"
          src={staticFile("audio/ui-switch.wav")}
          from={17.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 激励相容"
          src={staticFile("audio/ui-ding.wav")}
          from={19.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 按天发死钱"
          src={staticFile("audio/ui-switch.wav")}
          from={48.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 结果分红"
          src={staticFile("audio/ui-ding.wav")}
          from={54.44 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={65.31 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={66.31 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={67.31 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={68.31 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={75.84 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
