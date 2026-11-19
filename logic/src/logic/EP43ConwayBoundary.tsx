import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneOrgMechanism } from "./scenes/SceneOrgMechanism";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP43ConwayBoundary: React.FC = () => {
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
      <Track name="EP43 Scenes">
        <SceneHook
          name="01 无尽对齐扯皮现场"
          durationInFrames={18 * fps}
          episodeLabel="EP43"
          sectionTitle="01 · 对齐会内耗现场"
          headline="改一个小字段要拉 5 个组开 3 小时对齐会——真是同事难沟通吗？"
          colleagueSender="产品同学"
          colleagueRole="痛苦协调"
          colleagueMessage="我就想在订单页加个小字段，怎么拉了设计、前端、中台、财务开三小时还没定下来？"
          bossSender="研发同事"
          bossRole="说出真相"
          bossReply="因为中台只背公共表 KPI、前端怕背事故锅、财务怕对不上账，谁敢先点头放行啊！"
          takeawayText="⚠ 跨部门天天开会扯皮，往往不是沟通差，而是组织架构切错了（康威定律）"
          secondBubbleSec={5.65}
          takeawaySec={9.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "大公司最消耗灵魂的一句话就是：“走，拉五个组再开个对齐会！”",
              startMs: 250,
              endMs: 5396,
              timestampMs: 2823,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "本来两天能干完的小需求，五个部门扯皮半个月还没动工！",
              startMs: 5646,
              endMs: 9527,
              timestampMs: 7586,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真的是这帮同事不配合、情商低吗？不是！是你的组织架构切错了！",
              startMs: 9827,
              endMs: 16076,
              timestampMs: 12951,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneOrgMechanism
          name="02 康威定律图解"
          from={18 * fps}
          durationInFrames={35 * fps}
          episodeLabel="EP43"
          sectionTitle="02 · 康威定律与职责边界"
          accentColor="#41A6F6"
          title="组织怎么切分，流程就会有多卡顿：用闭环 ＋ 标准接口消灭扯皮"
          mode="conway-boundary"
          item1Title="设计 / 前端 / 后端 / 财务各成竖井"
          item1Body="一个完整业务硬生生切成五截穿过五堵墙，每次交接必扯皮甩锅"
          item2Title="两天活拖半个月"
          item2Body="全在拉群开会互相求配合"
          item3Title="按端到端价值组闭环小队"
          item3Body="强相关兵种配齐在一条船上共担结果，对外只暴露清晰的黑盒接口契约"
          item4Title="定死接口不插手内部"
          item4Body="写清入参出参规范，彻底告别群里撕逼"
          summaryCaption="用结构边界和标准契约消灭扯皮，比天天开拉通会高级十倍"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "组织怎么切分，流程就会有多卡顿，这就是大名鼎鼎的“康威定律”。",
              startMs: 250,
              endMs: 5254,
              timestampMs: 2752,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边是按工种硬切出来的“部门竖井”：前端只管画图、后端只管接口、财务只管对账，一个完整业务被迫穿过五堵墙，每次交接必扯皮；",
              startMs: 5504,
              endMs: 16269,
              timestampMs: 10886,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真正高效的组织长在右边：按“端到端完整交付”组成闭环小组，把所有强相关的兵配齐在一条船上；",
              startMs: 16519,
              endMs: 24397,
              timestampMs: 20458,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "实在需要跨组配合的地方，定死“黑盒接口契约”——你只需按标准交出数据格式，我不插手你内部怎么写，彻底告别无意义的群里撕逼！",
              startMs: 24647,
              endMs: 33799,
              timestampMs: 29223,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 协作架构对比"
          from={53 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP43"
          sectionTitle="03 · 竖井开会 vs 闭环接口"
          title="少拉五部门拉通会求配合，先从重组边界和定死接口开始"
          badLabel="✖ 竖井拼接 ＋ 开会粘合"
          badSubtitle="指望靠沟通解决架构病"
          badExample="“按专业拆出五个独立部门各背 KPI，推大项目时拉群开会互相协调帮忙！”"
          badNote="后果：需求越复杂对齐会越多，最后全员精力耗死在群里"
          goodLabel="✔ 闭环小队 ＋ 标准契约"
          goodSubtitle="强耦合装一起，组间走协议"
          goodExample="“围绕退款闭环配齐全栈小分队共担一个指标；对外财务打款只暴露标准接口格式。”"
          goodNote="亮点：两天就能交付上线，再也不需要找五位总监轮流点头"
          goodCardSec={6.61}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把一条完整的链条砍成五节，然后指望开会用胶水粘起来；",
              startMs: 250,
              endMs: 6306,
              timestampMs: 3278,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把紧耦合的环节装进一个闭环团队，组外定死干净的接口规范，效率直接起飞！",
              startMs: 6606,
              endMs: 12868,
              timestampMs: 9737,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={67 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP43"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="上下游两个团队天天在群里争吵“这行异常脏数据到底该谁先洗干净”，最缺什么？"
          answer="答案：缺一份写死规范与兜底归属的“标准接口契约”！边界和格式定死谁产谁洗，灰色地带瞬间消失。"
          mantra="本集口诀：扯皮多半架构错，闭环组队定接口！"
          countdownStartSec={4.43}
          answerSec={7.43}
          mantraSec={14.09}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：上下游两组天天吵“脏数据到底该谁清洗”，最缺什么才能一劳永逸？",
              startMs: 250,
              endMs: 7033,
              timestampMs: 3641,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！一份写死谁产谁洗的标准接口契约，把灰色地带划清楚就不再吵了！",
              startMs: 7433,
              endMs: 13693,
              timestampMs: 10563,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：扯皮多半架构错，闭环组队定接口！",
              startMs: 14093,
              endMs: 18111,
              timestampMs: 16102,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 扯皮现场配音"
          src={staticFile("audio/ep43-scene1.wav")}
          from={0}
          durationInFrames={483}
          volume={1}
        />
        <Audio
          name="02 康威定律图解配音"
          src={staticFile("audio/ep43-scene2.wav")}
          from={18 * fps}
          durationInFrames={1014}
          volume={1}
        />
        <Audio
          name="03 架构对比配音"
          src={staticFile("audio/ep43-scene3.wav")}
          from={53 * fps}
          durationInFrames={387}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep43-scene4.wav")}
          from={67 * fps}
          durationInFrames={544}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 产品协调崩溃"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 研发说出真相"
          src={staticFile("audio/ui-switch.wav")}
          from={5.65 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.83 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 竖井架构"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 闭环接口"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 竖井开会"
          src={staticFile("audio/ui-switch.wav")}
          from={53.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 标准契约"
          src={staticFile("audio/ui-ding.wav")}
          from={59.61 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={71.43 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={72.43 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={73.43 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={74.43 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={81.09 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
