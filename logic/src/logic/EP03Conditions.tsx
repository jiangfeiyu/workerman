import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEuler } from "./scenes/SceneEuler";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP03Conditions: React.FC = () => {
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
      <Track name="EP03 Scenes">
        <SceneHook
          name="01 立军令状现场"
          durationInFrames={10 * fps}
          episodeLabel="EP03"
          sectionTitle="01 · 排期背锅现场"
          headline="“再加 2 个人，周五肯定能按时上线了吧？”"
          colleagueSender="领导"
          colleagueRole="灵魂催促"
          colleagueMessage="这周再给你调 2 个开发过来，人手绝对够了，周五肯定能准时上线了吧？"
          bossSender="开发小陈"
          bossRole="内心OS"
          bossReply="可是接口文档还没定、测试环境也挂着…加人真能保证上线吗？"
          takeawayText="⚠ 把“缺一不可的条件”当成“有它就够的保证”，周五必背锅"
          secondBubbleSec={2.38}
          takeawaySec={5.46}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场最容易背锅的一句对话：",
              startMs: 250,
              endMs: 2130,
              timestampMs: 1190,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "领导问“再加两个人，周五就能上线了吧？”",
              startMs: 2380,
              endMs: 5164,
              timestampMs: 3772,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你一咬牙答应了，结果周五还是延期，到底错在哪？",
              startMs: 5464,
              endMs: 9083,
              timestampMs: 7273,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEuler
          name="02 充分必要欧拉图"
          from={10 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP03"
          sectionTitle="02 · 欧拉套圈秒懂"
          accentColor="#38B764"
          title="充分条件 vs 必要条件：小圈推大圈，大圈包风险"
          mode="subset"
          outerLabel="大圈（必要）：加了 2 个开发"
          innerLabel="小圈（结果）：周五准时上线"
          outerColor="#41A6F6"
          innerColor="#38B764"
          relationCaption="大圈空白区：加了人但需求还在改，照样延期！"
          noteText="加人只是“没它不行”的必要条件，不是“有它就够”的充分条件"
          noteDelaySec={13.28}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "画两个圈，一秒分清充分条件和必要条件。",
              startMs: 250,
              endMs: 3976,
              timestampMs: 2113,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "如果“加两个人”是大圈，“按时上线”是里面的小圈，",
              startMs: 4276,
              endMs: 7572,
              timestampMs: 5924,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "说明加人只是“没它不行”的必要条件，不是“有它就够”的充分条件。",
              startMs: 7822,
              endMs: 12979,
              timestampMs: 10400,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "在大圈的空白区里，只要需求还在改，加再多人照样延期！",
              startMs: 13279,
              endMs: 18165,
              timestampMs: 15722,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 承诺边界对比"
          from={29 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP03"
          sectionTitle="03 · 答应需求前后对比"
          title="把“必要条件”补齐成“充分条件”，答应的事才不翻车"
          badLabel="✖ 直接硬扛"
          badSubtitle="把必要当充分"
          badExample="“行！只要再加两个人，周五保证准时上线！”"
          badNote="问题：默认吞下了需求变更、接口延期等全部外部风险"
          goodLabel="✔ 补齐充分条件"
          goodSubtitle="说清前提边界"
          goodExample="“加 2 个人是前提，【并且】今天 17 点前冻结需求、明天接口联调通过，周五才能准时上线。”"
          goodNote="亮点：把必要条件组合成充分条件，边界清晰可交付"
          goodCardSec={5.52}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边顺着对方把“必要”当“充分”，风险全自己扛；",
              startMs: 250,
              endMs: 5224,
              timestampMs: 2737,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把充分条件补齐：除了加人，还得加上需求冻结和联调节点。",
              startMs: 5524,
              endMs: 11401,
              timestampMs: 8462,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "先把条件边界说死，答应的承诺才真正算数！",
              startMs: 11651,
              endMs: 15636,
              timestampMs: 13643,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={46 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP03"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“只有拿到千万融资，公司才能活下来。”——拿到融资就一定稳了吗？"
          answer="答案：不一定！“只有…才…”说的是必要条件（大圈），拿到融资只代表没死在资金上，不代表产品和运营不会出问题。"
          mantra="本集口诀：只要就是充分，只有才是必要，别把必要当保证！"
          countdownStartSec={3.6}
          answerSec={6.83}
          mantraSec={13.43}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“只有拿到融资，公司才能活下来”，那拿到融资就一定稳了吗？",
              startMs: 250,
              endMs: 6430,
              timestampMs: 3340,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "答案是不一定！“只有…才…”只是必要条件，有它也不保证一定成功。",
              startMs: 6830,
              endMs: 13034,
              timestampMs: 9932,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：只要就，是充分；只有才，是必要，别把必要当保证！",
              startMs: 13434,
              endMs: 19720,
              timestampMs: 16577,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 背锅现场配音"
          src={staticFile("audio/ep03-scene1.wav")}
          from={0}
          durationInFrames={276}
          volume={1}
        />
        <Audio
          name="02 套圈图解配音"
          src={staticFile("audio/ep03-scene2.wav")}
          from={10 * fps}
          durationInFrames={548}
          volume={1}
        />
        <Audio
          name="03 边界对比配音"
          src={staticFile("audio/ep03-scene3.wav")}
          from={29 * fps}
          durationInFrames={472}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep03-scene4.wav")}
          from={46 * fps}
          durationInFrames={595}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 领导气泡"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 开发内心OS"
          src={staticFile("audio/ui-switch.wav")}
          from={2.38 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={5.46 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 欧拉图展开"
          src={staticFile("audio/ui-click.wav")}
          from={10.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 底部总结"
          src={staticFile("audio/ui-ding.wav")}
          from={23.28 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 硬扛写法"
          src={staticFile("audio/ui-switch.wav")}
          from={29.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 补齐充分条件"
          src={staticFile("audio/ui-ding.wav")}
          from={34.52 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={49.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={50.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={51.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={52.83 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={59.43 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
