import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneNegotiation } from "./scenes/SceneNegotiation";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP23BiasAnchor: React.FC = () => {
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
      <Track name="EP23 Scenes">
        <SceneHook
          name="01 报价踩坑现场"
          durationInFrames={18 * fps}
          episodeLabel="EP23"
          sectionTitle="01 · 报价与筛选盲区"
          headline="“老实报了一周工期，被砍价到三天通宵！”——错在哪？"
          colleagueSender="产品小周"
          colleagueRole="老实吃亏"
          colleagueMessage="我本来实诚报了 1 周工期，结果业务方一刀砍下来，只给我 3 天时间！"
          bossSender="资深PM"
          bossRole="点拨一语"
          bossReply="你要先报全量评估“2 周”，再退到砍边缘后的“1 周”，对方就觉得赚大了！"
          takeawayText="⚠ 人的判断极易被“偏见漏斗”和“第一组数字”左右"
          secondBubbleSec={5.98}
          takeawaySec={11.91}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "为什么你实诚报了一周工期，对方一砍价只剩三天，把自己逼到通宵？",
              startMs: 250,
              endMs: 5725,
              timestampMs: 2987,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "还有人写汇报方案，只挑对自己有利的数据贴上去，结果一被反问当场社死！",
              startMs: 5975,
              endMs: 11609,
              timestampMs: 8792,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "这背后藏着人类大脑两个最顽固的偏差：确认偏误和锚定效应。",
              startMs: 11909,
              endMs: 17190,
              timestampMs: 14549,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneNegotiation
          name="02 偏误与锚定图解"
          from={18 * fps}
          durationInFrames={26 * fps}
          episodeLabel="EP23"
          sectionTitle="02 · 确认偏误 & 锚定效应"
          accentColor="#41A6F6"
          title="看透大脑的两大偏差：先找反例拆盲区，再设安全锚点"
          mode="bias-anchor"
          item1Title="只捡支持自己的数据看"
          item1Body="先定了结论，再只挑好看的图表贴进 PPT，主动忽略负面样本与执行代价。"
          item2Title="反向自查"
          item2Body="汇报前先帮老板挑 3 个反例"
          item3Title="第一个数字锁死预期"
          item3Body="对方会围绕你先抛出的数字讨价还价，直接交出底牌只会被继续往下砍。"
          item4Title="先高后让"
          item4Body="先报全量 2 周做锚点，再退到精简 1 周"
          summaryCaption="好方案经得起反例拷打，好报价永远先抛合理锚点"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "先看“确认偏误”：大脑一旦认定了“我的方案是对的”，就会变成一只筛选漏斗，",
              startMs: 250,
              endMs: 5668,
              timestampMs: 2959,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只留好消息、自动屏蔽反例，要想方案抗打，必须自己先找三条反面证据！",
              startMs: 5918,
              endMs: 12140,
              timestampMs: 9029,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再看“锚定效应”：报价或排期时，先抛出的数字就是一只铁锚，",
              startMs: 12390,
              endMs: 17353,
              timestampMs: 14871,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "先报出包含全量需求的“两周”，再给出精简后的“一周”，对方心理上觉得捡了大便宜，其实正好落在你的安全区！",
              startMs: 17603,
              endMs: 25440,
              timestampMs: 21521,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 汇报谈判对比"
          from={44 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP23"
          sectionTitle="03 · 汇报与报价对比"
          title="既把盲区提前补齐，又把谈判锚点稳稳握在手里"
          badLabel="✖ 裸报底线"
          badSubtitle="报喜不报忧+没留余地"
          badExample="“工期最快 5 天吧，数据只看了最近涨了 30% 的这组用户。”"
          badNote="问题：5 天被砍成 3 天，且一被追问未涨用户组立刻穿帮"
          goodLabel="✔ 设锚+列反例"
          goodSubtitle="主动权与专业度拉满"
          goodExample="“全量功能需 12 天；精简方案只需 6 天且可控；已排查 2 个潜在风险并附应对预案。”"
          goodNote="亮点：对方欣然接受 6 天，同时折服于你思考的全面性"
          goodCardSec={7.13}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边一上来就交出底牌，还藏着风险不报，谈判和评审全处于被动；",
              startMs: 250,
              endMs: 6832,
              timestampMs: 3541,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先抛高锚点再让步，同时主动摆出反例和预案，专业度和主动权双双拉满！",
              startMs: 7132,
              endMs: 13457,
              timestampMs: 10294,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={59 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP23"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="面试谈薪时，HR 问你“期望薪资多少”，你脱口而出“比现在多两千就行”。为什么吃亏？"
          answer="答案：你自己主动抛了一个过低的锚点！HR 后续只会围绕这个数字向下压，直接锁死了更高的薪资空间。"
          mantra="本集口诀：方案先找反例验，报价先抛安全锚！"
          countdownStartSec={2.9}
          answerSec={6.2}
          mantraSec={11.53}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：面试谈薪一开口就说“比现在多两千就行”，为什么容易吃亏？",
              startMs: 250,
              endMs: 5803,
              timestampMs: 3026,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！你自己先抛了一个超低锚点，直接锁死了后面的议价空间！",
              startMs: 6203,
              endMs: 11130,
              timestampMs: 8666,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：方案先找反例验，报价先抛安全锚！",
              startMs: 11530,
              endMs: 15589,
              timestampMs: 13559,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 报价现场配音"
          src={staticFile("audio/ep23-scene1.wav")}
          from={0}
          durationInFrames={518}
          volume={1}
        />
        <Audio
          name="02 偏误锚定配音"
          src={staticFile("audio/ep23-scene2.wav")}
          from={18 * fps}
          durationInFrames={765}
          volume={1}
        />
        <Audio
          name="03 汇报对比配音"
          src={staticFile("audio/ep23-scene3.wav")}
          from={44 * fps}
          durationInFrames={406}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep23-scene4.wav")}
          from={59 * fps}
          durationInFrames={470}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 小周吐槽"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 资深点拨"
          src={staticFile("audio/ui-switch.wav")}
          from={5.98 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.91 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 确认偏误"
          src={staticFile("audio/ui-click.wav")}
          from={18.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 锚定效应"
          src={staticFile("audio/ui-switch.wav")}
          from={20.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 总结"
          src={staticFile("audio/ui-ding.wav")}
          from={22.8 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 裸报底线"
          src={staticFile("audio/ui-switch.wav")}
          from={44.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 设锚反例"
          src={staticFile("audio/ui-ding.wav")}
          from={51.13 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={61.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={62.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={63.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={65.2 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={70.53 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
