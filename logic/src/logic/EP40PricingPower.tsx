import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEconomics } from "./scenes/SceneEconomics";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP40PricingPower: React.FC = () => {
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
      <Track name="EP40 Scenes">
        <SceneHook
          name="01 降价内卷现场"
          durationInFrames={18 * fps}
          episodeLabel="EP40"
          sectionTitle="01 · 低价苦力内卷"
          headline="矿泉水超市卖 2 元、机场卖 15 元——凭什么能拿走 7 倍溢价？"
          colleagueSender="销售同事"
          colleagueRole="跟风杀价"
          colleagueMessage="老板，竞品把同款降到 9.9 了！咱们成本都要 8 块，赶紧跟着降到 8.5 保销量吧！"
          bossSender="资深操盘手"
          bossRole="重构价值"
          bossReply="别跟！拼不过低价内卷，换个紧迫场景打包卖，同样东西咱们还能卖到 39！"
          takeawayText="⚠ 价格从不取决于你的“成本有多高”，而取决于“不买你的替代代价有多高”"
          secondBubbleSec={5.51}
          takeawaySec={10.32}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "商业世界里最蠢的竞争方式就是“成本加一成、跟风拼低价”：",
              startMs: 250,
              endMs: 5257,
              timestampMs: 2753,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对手降一元你降两元，最后两家一起累死在微利线上！",
              startMs: 5507,
              endMs: 10019,
              timestampMs: 7763,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么同一瓶水超市两块、机场十五块照样排长队？秘密全在“价值锚定”！",
              startMs: 10319,
              endMs: 16582,
              timestampMs: 13450,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEconomics
          name="02 定价权三阶梯"
          from={18 * fps}
          durationInFrames={37 * fps}
          episodeLabel="EP40"
          sectionTitle="02 · 定价权与价值锚定"
          accentColor="#A7F070"
          title="换掉客户脑子里的“比价锚点”，才能彻底跳出降价死局"
          mode="pricing-anchor"
          item1Title="进货 1 元卖 2 元（微利）"
          item1Body="隔壁货架全是平价替代品，客户只按物料成本砍价，涨 5 毛就跑"
          item2Title="机场安检后卖 15 元"
          item2Body="不能出关且极其口渴，替代代价极高，高溢价照样抢着买单"
          item3Title="按“省钱/赚钱结果”报价"
          item3Body="不按几人天工时收费，直接锚定“每年帮你省 100 万”，定价权彻底回到手中"
          item4Title="切换对比锚点"
          item4Body="物料费 ➔ 不买的巨大损失"
          summaryCaption="低价内卷永远赢不了，把锚点从成本切换到“场景与价值”才算翻身"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看懂定价权的三个台阶，彻底告别低价苦力内卷。",
              startMs: 250,
              endMs: 4291,
              timestampMs: 2270,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一阶叫成本定价：只敢按进货价加一点点利润，用户脑子里的对比锚全是拼多多同款，稍微涨五毛钱就跑；",
              startMs: 4541,
              endMs: 13231,
              timestampMs: 8886,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二阶叫场景溢价：过完机场安检口渴得要命时，不能出门买平价水，替代门槛一拉高，十五块钱照样秒付款；",
              startMs: 13481,
              endMs: 22299,
              timestampMs: 17890,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "最高阶叫价值结果锚定：卖产品不再按零件算账，而是按“帮客户多赚或省下多少钱”来定！把锚点从“物料费”换成“替代代价”，定价权自然回到你手里！",
              startMs: 22549,
              endMs: 35075,
              timestampMs: 28812,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 报价谈判对比"
          from={55 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP40"
          sectionTitle="03 · 算工时苦力 vs 算结果溢价"
          title="永远别把自己按“工时零件”明码标价，去锚定帮对方省下的真金白银"
          badLabel="✖ 按人天工时硬算"
          badSubtitle="端出苦力底牌被狠砍"
          badExample="“我们研发了 20 人天，每天按 1500 元算一共收 3 万，已经贴着成本线了！”"
          badNote="后果：客户心里拿你跟外包人头比价，开口再往腰斩里砍"
          goodLabel="✔ 锚定替代收益报价"
          goodSubtitle="先算清不买多赔多少钱"
          goodExample="“这套对账系统每月替贵司省下 3 名财务加班、堵住 20 万漏账，年省百万只收 8 万，三个月回本！”"
          goodNote="亮点：锚点直接抬到“年省百万”，报价翻倍客户仍觉得超值"
          goodCardSec={7.02}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边自己端出工时成本底牌，客户满脑子只想着怎么把你的日薪往下砍；",
              startMs: 250,
              endMs: 6717,
              timestampMs: 3483,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先给客户算清“不买你的系统每个月会多赔多少钱”，把价格锚定在巨大收益上，报价翻三倍还抢着签单！",
              startMs: 7017,
              endMs: 15195,
              timestampMs: 11106,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={72 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP40"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="同一套 PPT 模板，直接按“15 张幻灯片”卖只卖 19 元；加上高管审阅要点打包成“升职答辩急救包”能卖 199 元，凭什么？"
          answer="答案：把对比锚从“卖几张幻灯片物料（19元）”，改成了“升职加薪结果保障的高价值场景（替代代价极高）”！"
          mantra="本集口诀：别拿成本标底价，盯着价值改场景！"
          countdownStartSec={7.08}
          answerSec={10.08}
          mantraSec={17.37}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：同一套答辩模板，按十五页卖十九块，加上高管审阅要点打包成升职急救包却卖一百九十九，凭什么？",
              startMs: 250,
              endMs: 9679,
              timestampMs: 4964,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！把锚点从几张幻灯片换成了升职加薪的高价值场景，定价权直接翻十倍！",
              startMs: 10079,
              endMs: 16968,
              timestampMs: 13523,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别拿成本标底价，盯着价值改场景！",
              startMs: 17368,
              endMs: 21333,
              timestampMs: 19350,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 降价内卷配音"
          src={staticFile("audio/ep40-scene1.wav")}
          from={0}
          durationInFrames={498}
          volume={1}
        />
        <Audio
          name="02 定价阶梯配音"
          src={staticFile("audio/ep40-scene2.wav")}
          from={18 * fps}
          durationInFrames={1053}
          volume={1}
        />
        <Audio
          name="03 报价对比配音"
          src={staticFile("audio/ep40-scene3.wav")}
          from={55 * fps}
          durationInFrames={456}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep40-scene4.wav")}
          from={72 * fps}
          durationInFrames={640}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 销售跟降"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 操盘破局"
          src={staticFile("audio/ui-switch.wav")}
          from={5.51 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.32 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 成本定价"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 场景溢价"
          src={staticFile("audio/ui-click.wav")}
          from={20.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 价值锚定"
          src={staticFile("audio/ui-ding.wav")}
          from={22.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 工时报价"
          src={staticFile("audio/ui-switch.wav")}
          from={55.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 锚定结果"
          src={staticFile("audio/ui-ding.wav")}
          from={62.02 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={79.08 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={80.08 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={81.08 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={82.08 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={89.37 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
