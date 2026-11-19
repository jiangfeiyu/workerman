import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAgentFlow } from "./scenes/SceneAgentFlow";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP61DeterministicRail: React.FC = () => {
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
      <Track name="EP61 Scenes">
        <SceneHook
          name="01 大模型算错账翻车"
          durationInFrames={20 * fps}
          episodeLabel="EP61"
          sectionTitle="01 · 万能计算器陷阱"
          headline="把算账和校验全丢给大模型，为什么少算三千块直接发给客户？"
          colleagueSender="同事小陈"
          colleagueRole="盲目全托 AI"
          colleagueMessage="我搭了个全自动 AI 报价流，把所有计算、折扣和合同条款全交给大模型一次生成！"
          bossSender="财务总监"
          bossRole="抓出资损"
          bossReply="可是它把“满一万打八折再减五百”算错了三千块，还直接发给了客户！"
          takeawayText="⚠ 别让大模型用概率去猜加减法，算账必须写死在确定性轨道上"
          secondBubbleSec={5.81}
          takeawaySec={12.14}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "搭建 AI 工作流最容易踩的坑，叫“把大模型当成万能计算器”！",
              startMs: 250,
              endMs: 5559,
              timestampMs: 2905,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "明明是一个简单的折扣算账和字段校验，非要让大模型凭概率一个字一个字猜出来；",
              startMs: 5809,
              endMs: 11838,
              timestampMs: 8824,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果它文采飞扬、逻辑顺畅，唯独在最简单的加减法上给客户少算了三千块！",
              startMs: 12138,
              endMs: 18360,
              timestampMs: 15249,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAgentFlow
          name="02 确定性轨道 vs 概率性推理"
          from={20 * fps}
          durationInFrames={32 * fps}
          episodeLabel="EP61"
          sectionTitle="02 · 铁轨 vs 大脑"
          accentColor="#38B764"
          title="确定性轨道锁算账与边界，概率性大脑只做语义理解"
          mode="deterministic-probabilistic"
          item1Title="① 确定性铁轨（代码 / 公式）"
          item1Body="金额加减、时间比对、格式校验、权限与红线拦截——必须 100% 精确，绝不靠猜。"
          item2Title="② 概率性大脑（大模型）"
          item2Body="读懂非结构化长文、总结要点、风格改写与发散提案——尽情发挥弹性智能。"
          item3Title="混合架构铁律"
          item3Body="代码铺好铁轨和刹车，大模型只在车厢里提供语义智能，永不脱轨！"
          item4Title=""
          item4Body=""
          summaryCaption="铁轨管死账本与开关，大脑负责理解与创意"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "真正稳如泰山的智能体架构，必须把“确定性轨道”和“概率性推理”拆得清清楚楚。",
              startMs: 250,
              endMs: 6316,
              timestampMs: 3283,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "凡是需要百分百精确、错一次就出事故的事——比如算账、卡时间、校验格式和权限，统统写死在代码和公式的“确定性铁轨”上；",
              startMs: 6566,
              endMs: 16434,
              timestampMs: 11500,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "凡是需要读懂人话、提炼总结、或者发散找思路的事，才放进中间的大模型“概率脑”里运行；",
              startMs: 16684,
              endMs: 23547,
              timestampMs: 20116,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "铁轨管死边界和账本，大脑负责理解与创意，这才是永不脱轨的现代 AI 工作流！",
              startMs: 23797,
              endMs: 30354,
              timestampMs: 27076,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 工作流架构对比"
          from={52 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP61"
          sectionTitle="03 · AI 架构对比"
          title="少让模型“自由发挥算数字”，用代码公式守死底线"
          badLabel="✖ 全盘交给大模型"
          badSubtitle="拿概率赌算账精准度"
          badExample="“把原始订单发给 AI，让它自己算总价、判断折扣并直接生成最终打款单！”"
          badNote="问题：算错一次折扣直接造成资损，还找不到固定报错位置"
          goodLabel="✔ 铁轨锁死 + AI 语义"
          goodSubtitle="分工明确零资损"
          goodExample="“AI 提取需求与写沟通文案；金额汇总、折扣和红线拦截全由代码公式硬执行。”"
          goodNote="亮点：精准度 100% 确定，同时享受大模型的语义灵活性"
          goodCardSec={6.67}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把铁轨和发动机全交给概率去赌运气，不出事只是运气好；",
              startMs: 250,
              endMs: 6374,
              timestampMs: 3312,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边让代码公式守死算账与开关，大模型专心啃非结构化文字，精准度和灵巧度一次全拿满！",
              startMs: 6674,
              endMs: 14344,
              timestampMs: 10509,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={24 * fps}
          episodeLabel="EP61"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="做“AI 客服自动退款流”时，“安抚用户情绪”和“核对订单是否超过 7 天”，哪个必须写死成代码规则？"
          answer="答案：核对是否超过 7 天！日期和金额这类硬指标必须精确到零失误，绝不能让 AI 用概率去猜！"
          mantra="本集口诀：算账校验走死规则，理解发散给大模型；铁轨锁边界，大脑做推理！"
          countdownStartSec={4.17}
          answerSec={7.17}
          mantraSec={15.48}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“安抚用户情绪”和“核对订单超没超七天”，哪个必须写死成确定性规则？",
              startMs: 250,
              endMs: 6770,
              timestampMs: 3510,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！查超没超七天！时间与金额这种硬指标必须精确到零失误，绝不能让 AI 去猜！",
              startMs: 7170,
              endMs: 15081,
              timestampMs: 11126,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：算账校验走死规则，理解发散给大模型；铁轨锁边界，大脑做推理！",
              startMs: 15481,
              endMs: 22242,
              timestampMs: 18862,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 算错账现场配音"
          src={staticFile("audio/ep61-scene1.wav")}
          from={0}
          durationInFrames={551}
          volume={1}
        />
        <Audio
          name="02 铁轨大脑配音"
          src={staticFile("audio/ep61-scene2.wav")}
          from={20 * fps}
          durationInFrames={911}
          volume={1}
        />
        <Audio
          name="03 架构对比配音"
          src={staticFile("audio/ep61-scene3.wav")}
          from={52 * fps}
          durationInFrames={430}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep61-scene4.wav")}
          from={68 * fps}
          durationInFrames={667}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 全托AI"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务抓错"
          src={staticFile("audio/ui-switch.wav")}
          from={5.81 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.14 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 确定性铁轨"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 概率性大脑"
          src={staticFile("audio/ui-click.wav")}
          from={22.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 混合架构铁律"
          src={staticFile("audio/ui-ding.wav")}
          from={25.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 全托对比"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 铁轨对比"
          src={staticFile("audio/ui-ding.wav")}
          from={58.67 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={72.17 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={73.17 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={74.17 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={75.17 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={83.48 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
