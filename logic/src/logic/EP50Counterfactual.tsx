import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneExperiment } from "./scenes/SceneExperiment";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP50Counterfactual: React.FC = () => {
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
      <Track name="EP50 Scenes">
        <SceneHook
          name="01 虚高战报抢功现场"
          durationInFrames={19 * fps}
          episodeLabel="EP50"
          sectionTitle="01 · 虚高战报穿帮"
          headline="“花 100 万优惠券换 500 万成交”，财务一算账为什么说倒贴钱？"
          colleagueSender="运营主管"
          colleagueRole="按总量算 ROI"
          colleagueMessage="老板大喜！这波满减券花了 100 万，带来 500 万成交，ROI 高达 5 倍！"
          bossSender="财务总监"
          bossRole="灵魂追问"
          bossReply="等等…这批人上个月没领券也买了 450 万，咱们是不是白贴了 100 万只多卖了 50 万？"
          takeawayText="⚠ 不算“没发券原本能卖多少”，全是把自然订单当成自己的功劳"
          secondBubbleSec={6.21}
          takeawaySec={12.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "年底听汇报最容易被绕晕的一句话，叫“我花一百万，带来了五百万成交”！",
              startMs: 250,
              endMs: 5960,
              timestampMs: 3105,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一听投资回报五倍，老板差点当场发奖金，可财务一算账当场傻眼：",
              startMs: 6210,
              endMs: 11900,
              timestampMs: 9055,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "要是没有你这波补贴，那些本来就要买单的老客户，原本自己就会下单四百五十万！",
              startMs: 12200,
              endMs: 18014,
              timestampMs: 15107,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneExperiment
          name="02 反事实平行宇宙对比"
          from={19 * fps}
          durationInFrames={27 * fps}
          episodeLabel="EP50"
          sectionTitle="02 · 反事实推理"
          accentColor="#FFCD75"
          title="反事实照妖镜：实验组减去空白对照组，才是真增量"
          mode="counterfactual"
          item1Title="① 事实世界（发了 100 万券）"
          item1Body="表面成交 500 万，其中 450 万属于刚需老客原本就会买的自然单"
          item2Title="② 反事实平行宇宙（10% 空白对照组不发券）"
          item2Body="同样一批老客不发任何优惠券，自然复购成交额依然高达 450 万"
          item3Title="③ 真实净增量 = 500 万 − 450 万 = 50 万"
          item3Body="为了撬动这多出来的 50 万成交，公司实打实掏了 100 万补贴"
          item4Title="真实 ROI"
          item4Body="-50%（亏钱买单）"
          summaryCaption="永远留出 5%~10% 空白对照组，用净增量而不是总盘算功劳"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "识破虚高战报的照妖镜，叫“反事实推理”。",
              startMs: 250,
              endMs: 3439,
              timestampMs: 1845,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "上面这条线叫事实：发完一百万补贴，总成交五百万，看起来风光无限；",
              startMs: 3689,
              endMs: 9631,
              timestampMs: 6660,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "下面这条线叫反事实平行宇宙：划出一成不发券的空白对照组，发现他们照样买了四百五十万；",
              startMs: 9881,
              endMs: 16954,
              timestampMs: 13418,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "两条线一减，真实净增量只有五十万！补贴一百万换五十万增量，其实每单都在倒贴钱！",
              startMs: 17204,
              endMs: 25127,
              timestampMs: 21166,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 归因汇报对比"
          from={46 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP50"
          sectionTitle="03 · ROI 汇报对比"
          title="别把大盘自然流水算进活动功劳，算净增量才不自欺"
          badLabel="✖ 按总盘算功劳"
          badSubtitle="把自然复购算成补贴功劳"
          badExample="“触达用户总成交 500 万 ÷ 补贴成本 100 万 = ROI 5.0！建议下月追加 300 万券！”"
          badNote="问题：越发券越亏钱，公司毛利全被“本来就会买的老客”白白吃掉"
          goodLabel="✔ 留空白组算净增量"
          goodSubtitle="只认多撬动出来的新钱"
          goodExample="“对比空白组，本次仅产生 50 万净增量，扣除 100 万补贴实亏；建议改只针对流失新客发券。”"
          goodNote="亮点：精准剔除自然单水分，把钱花在真正能撬动增量的刀刃上"
          goodCardSec={7.76}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把所有自然下单的老客全算进自己业绩，汇报漂亮但公司真金白银在流血；",
              startMs: 250,
              endMs: 7461,
              timestampMs: 3856,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边切出一小块空白对照组算“净增量”，一眼看清到底哪部分才是真正撬动出来的新钱！",
              startMs: 7761,
              endMs: 14263,
              timestampMs: 11012,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={62 * fps}
          durationInFrames={22 * fps}
          episodeLabel="EP50"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="推广说“点过广告的人复购率比没点的高 3 倍，说明广告极有效！”用反事实思维怎么拆穿？"
          answer="答案：本来想买的老客才更爱点广告！必须对比“随机曝光组 vs 随机空白对照组”，而不是挑“主动点击的人”比。"
          mantra="本集口诀：别拿总盘当功劳，留组空白做对照；真实净增减去成本，才算没瞎花钱！"
          countdownStartSec={2.94}
          answerSec={5.94}
          mantraSec={13.54}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：点过广告的人复购率高三倍，就能证明广告很神吗？",
              startMs: 250,
              endMs: 5543,
              timestampMs: 2897,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "错！本来就想买的老客才更爱点广告！必须跟随机没投广告的空白组比净增量！",
              startMs: 5943,
              endMs: 13139,
              timestampMs: 9541,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别拿总盘当功劳，留组空白做对照；真实净增减去成本，才算没瞎花钱！",
              startMs: 13539,
              endMs: 20512,
              timestampMs: 17026,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 虚高战报配音"
          src={staticFile("audio/ep50-scene1.wav")}
          from={0}
          durationInFrames={540}
          volume={1}
        />
        <Audio
          name="02 反事实图解配音"
          src={staticFile("audio/ep50-scene2.wav")}
          from={19 * fps}
          durationInFrames={754}
          volume={1}
        />
        <Audio
          name="03 归因对比配音"
          src={staticFile("audio/ep50-scene3.wav")}
          from={46 * fps}
          durationInFrames={428}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep50-scene4.wav")}
          from={62 * fps}
          durationInFrames={615}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 战报吹牛"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务拆穿"
          src={staticFile("audio/ui-switch.wav")}
          from={6.21 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.2 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 事实条"
          src={staticFile("audio/ui-click.wav")}
          from={19.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 反事实对照条"
          src={staticFile("audio/ui-switch.wav")}
          from={21.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 真实净增量"
          src={staticFile("audio/ui-ding.wav")}
          from={24.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 总盘对比"
          src={staticFile("audio/ui-switch.wav")}
          from={46.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 净增量对比"
          src={staticFile("audio/ui-ding.wav")}
          from={53.76 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={64.94 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={65.94 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={66.94 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={67.94 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={75.54 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
