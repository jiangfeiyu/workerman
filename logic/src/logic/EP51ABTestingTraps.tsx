import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneExperiment } from "./scenes/SceneExperiment";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP51ABTestingTraps: React.FC = () => {
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
      <Track name="EP51 Scenes">
        <SceneHook
          name="01 实验翻车现场"
          durationInFrames={15 * fps}
          episodeLabel="EP51"
          sectionTitle="01 · A/B 测试翻车"
          headline="实验明明显示“显著上涨”，为什么全量推开一周就原形毕露？"
          colleagueSender="产品经理"
          colleagueRole="早停全量上线"
          colleagueMessage="A/B 测试刚跑两天，新按钮点击率显著涨了 8%，我昨晚已经一键全量上线啦！"
          bossSender="两周后复盘"
          bossRole="数据回落"
          bossReply="奇怪，全量两周后点击率不仅没涨，还比老版本跌了 1%……实验数据造假了吗？"
          takeawayText="⚠ 数据没有造假，是你亲手踩进了实验逻辑的三大陷阱"
          secondBubbleSec={3.13}
          takeawaySec={9.54}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "互联网公司最常发生的玄学翻车：",
              startMs: 250,
              endMs: 2875,
              timestampMs: 1563,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "A/B 测试明明显示“显著上涨”，全量推开一周却原形毕露，甚至跌得更惨！",
              startMs: 3125,
              endMs: 9241,
              timestampMs: 6183,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "数据没有造假，是你自己亲手踩进了实验逻辑的三大陷阱里！",
              startMs: 9541,
              endMs: 14027,
              timestampMs: 11784,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneExperiment
          name="02 A/B 测试三大陷阱"
          from={15 * fps}
          durationInFrames={34 * fps}
          episodeLabel="EP51"
          sectionTitle="02 · 实验三大陷阱"
          accentColor="#F77622"
          title="避开 A/B 测试三大假显著陷阱：早停、串流与凑数"
          mode="ab-traps"
          item1Title="① 偷看早停"
          item1Body="样本量没攒够就天天盯盘，趁随机波动冲高立刻关停，全量必跌回均值。"
          item2Title="② 流量串扰"
          item2Body="AB 组还在抢同一池子库存/骑手，A 组涨全靠吸干 B 组的资源。"
          item3Title="③ 事后凑显著"
          item3Body="整体无差异，硬拆 20 个细分人群总有一个凑巧涨 5%，拿去报喜。"
          item4Title="规范铁律"
          item4Body="跑满预设样本周期 + 跨池隔离资源 + 开跑前写死唯一主验收指标"
          summaryCaption="实验结果要能稳定复现，靠的是赛前锁死规则，不是赛后找亮点"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "搞懂这三大实验陷阱，下次做 A/B 测试再也不会被假数据骗。",
              startMs: 250,
              endMs: 5094,
              timestampMs: 2672,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一坑叫“偷看早停”：样本还没攒够就天天盯盘，哪天随机波动冲高就急着下结论，全量立刻回落；",
              startMs: 5344,
              endMs: 13637,
              timestampMs: 9491,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二坑叫“流量污染”：两个组还在抢同一池子的库存和骑手，A 组赢全靠抢了 B 组的资源；",
              startMs: 13887,
              endMs: 20808,
              timestampMs: 17348,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三坑叫“事后凑显著”：整体没效果，硬拆二十个小群找一个好看的数字交差！提前定好周期、做好隔离、锁死主指标，实验才算数！",
              startMs: 21058,
              endMs: 32574,
              timestampMs: 26816,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 做实验对比"
          from={49 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP51"
          sectionTitle="03 · 实验规范对比"
          title="别拿赌场式随机波动交差，三锁死才敢全量上线"
          badLabel="✖ 草率跑实验交差"
          badSubtitle="偷看早停 + 挑数字报喜"
          badExample="“跑了 1 天看点击率飘红就关实验；整体持平就拆 20 个维度挑一个涨的汇报！”"
          badNote="问题：把随机噪音当黄金发现，全量上线 100% 翻车打脸"
          goodLabel="✔ 三锁死规范实验"
          goodSubtitle="满周期 + 隔离 + 定指标"
          goodExample="“提前算好样本量跑满 14 天不早停；按城市隔离运力池；开跑前锁死‘下单转化率’为主指标。”"
          goodNote="亮点：实打实过滤随机波动，实验涨多少全量就稳稳拿多少"
          goodCardSec={6.75}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边像在赌场里赢一把就赶紧跑，或者专门挑赢的那把拍照发朋友圈；",
              startMs: 250,
              endMs: 6454,
              timestampMs: 3352,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边开跑前就把样本量、隔离边界和主指标全锁死，测出来多少，全量上去就能稳定拿到多少！",
              startMs: 6754,
              endMs: 14833,
              timestampMs: 10794,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={65 * fps}
          durationInFrames={22 * fps}
          episodeLabel="EP51"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="在同一座城市把一半司机分去加 5 元补贴（A 组）、另一半不发（B 组），为什么测不准？"
          answer="答案：流量串扰！两组司机仍在抢同一批乘客订单，A 组多接的单其实是抢了 B 组的，必须按城市或时间段隔离！"
          mantra="本集口诀：周期没满不偷看，资源隔离防串流，开跑锁死主指标！"
          countdownStartSec={3.85}
          answerSec={6.85}
          mantraSec={15.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：在同一座城市把一半司机分去发补贴、一半不发，为什么测不准？",
              startMs: 250,
              endMs: 6453,
              timestampMs: 3352,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！他们还在抢同一批乘客！A 组涨的单全是抢 B 组的，必须按城市或时间段做好隔离！",
              startMs: 6853,
              endMs: 14796,
              timestampMs: 10825,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：周期没满不偷看，资源隔离防串流，开跑锁死主指标！",
              startMs: 15196,
              endMs: 20811,
              timestampMs: 18004,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 实验翻车配音"
          src={staticFile("audio/ep51-scene1.wav")}
          from={0}
          durationInFrames={421}
          volume={1}
        />
        <Audio
          name="02 三大陷阱配音"
          src={staticFile("audio/ep51-scene2.wav")}
          from={15 * fps}
          durationInFrames={977}
          volume={1}
        />
        <Audio
          name="03 实验对比配音"
          src={staticFile("audio/ep51-scene3.wav")}
          from={49 * fps}
          durationInFrames={445}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep51-scene4.wav")}
          from={65 * fps}
          durationInFrames={624}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 宣布上线"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 全量回落"
          src={staticFile("audio/ui-switch.wav")}
          from={3.13 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.54 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 陷阱1 早停"
          src={staticFile("audio/ui-switch.wav")}
          from={15.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 陷阱2 串扰"
          src={staticFile("audio/ui-switch.wav")}
          from={17.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 陷阱3 凑显著"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 规范铁律"
          src={staticFile("audio/ui-ding.wav")}
          from={23.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 草率对比"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 规范对比"
          src={staticFile("audio/ui-ding.wav")}
          from={55.75 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={68.85 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={69.85 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={70.85 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={71.85 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.2 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
