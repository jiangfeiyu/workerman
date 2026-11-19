import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEuler } from "./scenes/SceneEuler";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP02Identity: React.FC = () => {
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
      <Track name="EP02 Scenes">
        <SceneHook
          name="01 鸡同鸭讲现场"
          durationInFrames={11 * fps}
          episodeLabel="EP02"
          sectionTitle="01 · 开会鸡同鸭讲"
          headline="同样收到“优化一下”，为什么两人做出两件毫无关系的事？"
          colleagueSender="产品小王"
          colleagueRole="改版汇报"
          colleagueMessage="老板说这周要把首页“优化一下”，我已经通宵改了 3 版视觉和按钮配色了！"
          bossSender="开发老刘"
          bossRole="当场懵圈"
          bossReply="啥？我以为“优化一下”是把加载速度从 3 秒压到 1 秒，我在重构接口啊！"
          takeawayText="⚠ 嘴上说着同一个词，脑子里装的却是两件完全不同的事"
          secondBubbleSec={2.75}
          takeawaySec={6.84}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "同样收到一句“把这个页面优化一下”，",
              startMs: 250,
              endMs: 2496,
              timestampMs: 1373,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "产品熬夜改了三版配色，开发却在重构加载接口，",
              startMs: 2746,
              endMs: 6542,
              timestampMs: 4644,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "开会吵了一个小时才发现：俩人根本没在说一件事！",
              startMs: 6842,
              endMs: 10705,
              timestampMs: 8773,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEuler
          name="02 同一律欧拉图"
          from={11 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP02"
          sectionTitle="02 · 同一律图解"
          accentColor="#38B764"
          title="同一律：同一个词，在同一次对话里只能指同一个意思"
          mode="disjoint"
          outerLabel="产品说的“优化”：改视觉转化"
          innerLabel="开发说的“优化”：降接口耗时"
          outerColor="#41A6F6"
          innerColor="#38B764"
          relationCaption="两个完全不相交的圈，用同一个词硬套，必然鸡同鸭讲"
          noteText="先给模糊词下定义，再讨论怎么做"
          noteDelaySec={9.3}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这在逻辑学里叫“违背了同一律”。",
              startMs: 250,
              endMs: 2562,
              timestampMs: 1406,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边圈里的“优化”，指的是界面转化率，",
              startMs: 2862,
              endMs: 5761,
              timestampMs: 4311,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边圈里的“优化”，指的是页面响应速度。",
              startMs: 6011,
              endMs: 9003,
              timestampMs: 7507,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "两个完全不相交的圈，用同一个词硬套，必然鸡同鸭讲。",
              startMs: 9303,
              endMs: 13673,
              timestampMs: 11488,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 定义对齐对比"
          from={25 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP02"
          sectionTitle="03 · 对齐定义前后对比"
          title="把模糊黑箱锁死成具体指标，返工率直接减半"
          badLabel="✖ 违背同一律"
          badSubtitle="概念模糊各自发挥"
          badExample="“大家这周把核心流程优化一下，周五上线，尽量做到最好！”"
          badNote="问题：“优化”和“最好”没有统一口径，每人理解都不同"
          goodLabel="✔ 遵守同一律"
          goodSubtitle="先锁定义再派活"
          goodExample="“本周【优化】特指两点：① 登录页加载压到 1 秒内；② 主按钮点击率提到 12%。其余视觉暂不动。”"
          goodNote="亮点：同一个词只对应唯一指标，跨部门 100% 同频"
          goodCardSec={5.1}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边说了“优化”和“做到最好”，全是模糊黑箱，",
              startMs: 250,
              endMs: 4812,
              timestampMs: 2531,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边只要加一句定义：把“优化”锁死成两个可验收指标，",
              startMs: 5112,
              endMs: 9373,
              timestampMs: 7242,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "每个人接到的指令完全一致，返工率直接降一半！",
              startMs: 9623,
              endMs: 13393,
              timestampMs: 11508,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={39 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP02"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“小张，你把这份数据整理得‘专业一点’，明天带给客户看！”"
          answer="答案：“专业一点”在不同人脑子里含义不同（加图表？换排版？补行业口径？），违背同一律，必须先问清具体标准。"
          mantra="本集口诀：开会先对齐定义，同一个词只说一件事！"
          countdownStartSec={1.9}
          answerSec={5.0}
          mantraSec={8.95}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：老板让你把数据“整理得专业一点”，哪里有问题？",
              startMs: 250,
              endMs: 4623,
              timestampMs: 2436,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，“专业”没有统一定义，很容易做完再返工。",
              startMs: 5023,
              endMs: 8566,
              timestampMs: 6794,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：开会先对齐定义，同一个词只说一件事！",
              startMs: 8966,
              endMs: 13320,
              timestampMs: 11143,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 鸡同鸭讲配音"
          src={staticFile("audio/ep02-scene1.wav")}
          from={0}
          durationInFrames={324}
          volume={1}
        />
        <Audio
          name="02 同一律欧拉图配音"
          src={staticFile("audio/ep02-scene2.wav")}
          from={11 * fps}
          durationInFrames={412}
          volume={1}
        />
        <Audio
          name="03 对齐对比配音"
          src={staticFile("audio/ep02-scene3.wav")}
          from={25 * fps}
          durationInFrames={405}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep02-scene4.wav")}
          from={39 * fps}
          durationInFrames={402}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 产品气泡"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 开发懵圈"
          src={staticFile("audio/ui-switch.wav")}
          from={2.75 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={6.84 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 欧拉图展开"
          src={staticFile("audio/ui-click.wav")}
          from={11.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 底部提示"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 模糊写法"
          src={staticFile("audio/ui-switch.wav")}
          from={25.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 对齐写法"
          src={staticFile("audio/ui-ding.wav")}
          from={30.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={40.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={41.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={42.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={44.0 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={47.95 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
