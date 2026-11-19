import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProbability } from "./scenes/SceneProbability";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP26Simpson: React.FC = () => {
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
      <Track name="EP26 Scenes">
        <SceneHook
          name="01 复盘会背锅现场"
          durationInFrames={16 * fps}
          episodeLabel="EP26"
          sectionTitle="01 · 平均数背锅现场"
          headline="每个渠道都在涨，总转化率怎么反而跌了 3 个点？！"
          colleagueSender="运营同学"
          colleagueRole="分项都在涨"
          colleagueMessage="老板你看！老客渠道转化涨到 22%，新客渠道也涨到 6%，两块都在进步！"
          bossSender="总监"
          bossRole="只看大盘总数"
          bossReply="别拿分项糊弄我，大盘总转化率明明跌了 3 个点，就是投放越做越差！"
          takeawayText="⚠ 合并总盘会掩盖“结构比例变化”，这就是最经典的辛普森悖论"
          secondBubbleSec={3.4}
          takeawaySec={9.26}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "做完月度复盘最冤的瞬间莫过于此：",
              startMs: 250,
              endMs: 3149,
              timestampMs: 1699,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "每个细分渠道转化率明明都在上涨，可一合并算大盘总数居然反跌了！",
              startMs: 3399,
              endMs: 8961,
              timestampMs: 6180,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "难道小学数学学坏了？其实你撞上了统计学里最诡异的“辛普森悖论”！",
              startMs: 9261,
              endMs: 14307,
              timestampMs: 11784,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneProbability
          name="02 辛普森悖论图解"
          from={16 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP26"
          sectionTitle="02 · 辛普森悖论"
          accentColor="#FFCD75"
          title="分项全涨、总数反跌？原因只有四个字：结构漂移"
          mode="simpson-paradox"
          item1Title="老客通道 20% ➔ 22%"
          item1Body="转化能力提升了 2 个点；但本月流量权重从 50% 降到了 20%"
          item2Title="拉新通道 5% ➔ 6%"
          item2Body="新手流量本来转化就低，团队仍提了 1 个点；预算占比却猛涨到 80%"
          item3Title="大盘总计 12.5% ➔ 9.2%"
          item3Body="加权后大盘反跌 3.3%！并非运营变差，而是低转化拉新流量变重了"
          item4Title="流量占比变了"
          item4Body="必须分层看各渠道真实 ROI"
          summaryCaption="总平均数是“各自表现”和“结构权重”乘出来的结果，看大盘前先拆权重"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "为什么全部分项都在涨，合起来却会跌？看懂这三层比例就明白。",
              startMs: 250,
              endMs: 5207,
              timestampMs: 2728,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "先看高转化老客通道：转化率从两成涨到两成二，但它只占总流量的两成；",
              startMs: 5457,
              endMs: 11691,
              timestampMs: 8574,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再看低转化拉新通道：转化率从百分之五小涨到百分之六，可这个月老板把八成新预算全砸了进来；",
              startMs: 11941,
              endMs: 20009,
              timestampMs: 15975,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果一加权平均，大量低转化流量把大盘硬生生拉低了三点三个百分点！团队根本没退步，纯粹是流量结构变了！",
              startMs: 20259,
              endMs: 29355,
              timestampMs: 24807,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 汇报归因对比"
          from={47 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP26"
          sectionTitle="03 · 总数追责 vs 结构拆解"
          title="用总平均数追责容易误伤功臣，按结构拆解才能看清真业绩"
          badLabel="✖ 只盯合并大盘"
          badSubtitle="忽略结构占比"
          badExample="“大盘总转化跌了 3%，所有人写检讨、立刻把新客投放全停了！”"
          badNote="问题：新客渠道其实进步了 20%，一刀切直接砍掉扩量引擎"
          goodLabel="✔ 拆开权重与转化率"
          goodSubtitle="分层评估真实进步"
          goodExample="“老客 22%、新客 6% 均在涨；总盘下降因拉新占比从 50% 扩至 80%，建议新老客分开算 ROI。”"
          goodNote="亮点：保住团队功劳，同时把“扩量战略”的代价说清楚"
          goodCardSec={6.18}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边盯着总平均数一刀切追责，直接把功臣当成背锅侠；",
              startMs: 250,
              endMs: 5884,
              timestampMs: 3067,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把数量占比和转化率拆开摆上台面，一眼看清这是“扩量战略”带来的结构变化！",
              startMs: 6184,
              endMs: 12971,
              timestampMs: 9577,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={61 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP26"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="公司男员工、女员工今年平均工资都在涨，为什么全公司人均工资反而下降了？"
          answer="答案：今年大量扩招了基础岗位新人！低起薪员工权重变大，把整体均值拉低了，并不是老员工降薪。"
          mantra="本集口诀：别被总数带偏路，拆开权重看真数！"
          countdownStartSec={3.73}
          answerSec={6.73}
          mantraSec={13.23}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：公司男女员工今年平均薪资都在涨，为什么全公司人均反降了？",
              startMs: 250,
              endMs: 6326,
              timestampMs: 3288,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！今年大量扩招了基础岗位新人，低薪权重变大把总均值拉下来了！",
              startMs: 6726,
              endMs: 12831,
              timestampMs: 9778,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别被总数带偏路，拆开权重看真数！",
              startMs: 13231,
              endMs: 17281,
              timestampMs: 15256,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 复盘背锅配音"
          src={staticFile("audio/ep26-scene1.wav")}
          from={0}
          durationInFrames={430}
          volume={1}
        />
        <Audio
          name="02 辛普森图解配音"
          src={staticFile("audio/ep26-scene2.wav")}
          from={16 * fps}
          durationInFrames={881}
          volume={1}
        />
        <Audio
          name="03 归因对比配音"
          src={staticFile("audio/ep26-scene3.wav")}
          from={47 * fps}
          durationInFrames={390}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep26-scene4.wav")}
          from={61 * fps}
          durationInFrames={519}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 分项上涨"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 总监质疑"
          src={staticFile("audio/ui-switch.wav")}
          from={3.4 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 悖论点题"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.26 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 分项 A"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 分项 B"
          src={staticFile("audio/ui-click.wav")}
          from={18.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 合并反跌"
          src={staticFile("audio/ui-ding.wav")}
          from={20.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 总数一刀切"
          src={staticFile("audio/ui-switch.wav")}
          from={47.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 分层看权重"
          src={staticFile("audio/ui-ding.wav")}
          from={53.18 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={64.73 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={65.73 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={66.73 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={67.73 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={74.23 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
