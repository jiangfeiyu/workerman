import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneSystemLoop } from "./scenes/SceneSystemLoop";

export const EP34DelayTrap: React.FC = () => {
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
      <Track name="EP34 Scenes">
        <SceneHook
          name="01 调水温式管理"
          durationInFrames={19 * fps}
          episodeLabel="EP34"
          sectionTitle="01 · 时间延迟错觉"
          headline="今天改完激励政策，两周没暴涨就加码——3 个月后直接过冲乱套！"
          colleagueSender="老板"
          colleagueRole="嫌见效太慢"
          colleagueMessage="新制度都上线两周了业绩还没炸！肯定刺激不够，下周把提成翻倍！"
          bossSender="财务"
          bossRole="预警滞后"
          bossReply="可前两个月订单还没回款，按翻倍发下去，三个月后利润率要穿底啊！"
          takeawayText="⚠ 把“制度滞后期”误当成“刺激不够”，连续加码必然过冲震荡"
          secondBubbleSec={3.62}
          takeawaySec={10.71}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "你有没有在浴室调水温时被烫得跳脚的经历？",
              startMs: 250,
              endMs: 3370,
              timestampMs: 1810,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "刚拧两圈嫌水温没变就猛拧到底，十秒后滚烫的水冲出来，吓得你又狠拧回冷水！",
              startMs: 3620,
              endMs: 10407,
              timestampMs: 7013,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "职场管理一旦忽略“时间延迟”，就会在急躁加码和恐慌急刹之间来回翻车！",
              startMs: 10707,
              endMs: 17241,
              timestampMs: 13974,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneSystemLoop
          name="02 时间延迟图解"
          from={19 * fps}
          durationInFrames={36 * fps}
          episodeLabel="EP34"
          sectionTitle="02 · 时间延迟（Delay）陷阱"
          accentColor="#FFCD75"
          title="看着滞后的后视镜猛打方向盘：4 步把组织逼成剧烈震荡"
          mode="delay-trap"
          item1Title="发布新政 / 扩招"
          item1Body="调高提成或加人手，商业效果不可能第 1 天立刻出现"
          item2Title="水面毫无动静"
          item2Body="招人培训、内容种草、老客复购至少有 30~60 天滞后期"
          item3Title="误以为力度不够"
          item3Body="管理者坐不住，继续连续加倍发奖或猛招人手"
          item4Title="过冲爆仓被迫急刹"
          item4Body="几波延迟一起砸过来：成本爆表只能瞬间裁员砍项目"
          summaryCaption="在反应周期跑完之前，最危险的动作就是看着旧数据连续加码"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看清时间延迟是怎么把好政策一步步逼成震荡灾难的。",
              startMs: 250,
              endMs: 4667,
              timestampMs: 2458,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步零号天改规则：比如扩招新人或调高奖金，效果根本不会当场兑现；",
              startMs: 4917,
              endMs: 11067,
              timestampMs: 7992,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步进入滞后期：培训、爬坡、老客复购需要三十天以上才能传导出来，偏偏此刻水面风平浪静；",
              startMs: 11317,
              endMs: 19847,
              timestampMs: 15582,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步最致命：管理者误以为没效果，在半路连续加码招人或发奖；",
              startMs: 20097,
              endMs: 25413,
              timestampMs: 22755,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "等九十天后所有滞后效应集中撞上来，瞬间产能过剩、成本爆表，被迫大裁员，系统彻底过冲震荡！",
              startMs: 25663,
              endMs: 34718,
              timestampMs: 30190,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 调参节奏对比"
          from={55 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP34"
          sectionTitle="03 · 急性加码 vs 周期定速"
          title="写死“完整观察周期”，期间只盯过程信号不乱调主开关"
          badLabel="✖ 凭当天体感瞎调参"
          badSubtitle="反复急加速和急刹车"
          badExample="“才十天还没涨？再加五成激励！过半月爆了？立刻一刀砍光！”"
          badNote="后果：团队折腾到筋疲力尽，业绩像过山车剧烈震荡"
          goodLabel="✔ 先锁周期 ＋ 看先行指标"
          goodSubtitle="满周期再微调参数"
          goodExample="“已知培训转化滞后 45 天：前 3 周只盯有效拜访数，45 天期满再评判是否加码。”"
          goodNote="亮点：既有过程把控，又不破坏系统自然传导节奏"
          goodCardSec={6.75}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边看着滞后的后视镜猛打方向盘，每一次急转弯都在制造更大波动；",
              startMs: 250,
              endMs: 6454,
              timestampMs: 3352,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边提前标出完整反应周期，期间只看先行过程指标，到点再微调，组织稳得像巡航定速！",
              startMs: 6754,
              endMs: 14423,
              timestampMs: 10588,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={71 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP34"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="前端刚遇到一次断货，各省仓恐慌性按 3 倍下单补货，而工厂交货延迟 2 个月。2 个月后会怎样？"
          answer="答案：严重爆仓积压（牛鞭效应）！断货恐慌 ＋ 2 个月交货延迟，所有过量订单会在 2 个月后一起砸穿仓库。"
          mantra="本集口诀：滞后期间别乱加，等完周期再调档！"
          countdownStartSec={4.61}
          answerSec={7.61}
          mantraSec={13.49}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：前端一次断货引发各仓按三倍补货，交货延迟两个月，后续会发生什么？",
              startMs: 250,
              endMs: 7210,
              timestampMs: 3730,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！两个月后所有过量订单一起到货，瞬间爆仓压死现金流！",
              startMs: 7610,
              endMs: 13093,
              timestampMs: 10351,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：滞后期间别乱加，等完周期再调档！",
              startMs: 13493,
              endMs: 17387,
              timestampMs: 15440,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 调水温现场配音"
          src={staticFile("audio/ep34-scene1.wav")}
          from={0}
          durationInFrames={518}
          volume={1}
        />
        <Audio
          name="02 延迟陷阱图解配音"
          src={staticFile("audio/ep34-scene2.wav")}
          from={19 * fps}
          durationInFrames={1042}
          volume={1}
        />
        <Audio
          name="03 调参对比配音"
          src={staticFile("audio/ep34-scene3.wav")}
          from={55 * fps}
          durationInFrames={433}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep34-scene4.wav")}
          from={71 * fps}
          durationInFrames={522}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 老板加码"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务预警"
          src={staticFile("audio/ui-switch.wav")}
          from={3.62 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.71 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 T0调参"
          src={staticFile("audio/ui-switch.wav")}
          from={19.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 T30静默"
          src={staticFile("audio/ui-click.wav")}
          from={21.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 T45加码"
          src={staticFile("audio/ui-click.wav")}
          from={23.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 T90过冲"
          src={staticFile("audio/ui-ding.wav")}
          from={24.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 体感乱调"
          src={staticFile("audio/ui-switch.wav")}
          from={55.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 周期定速"
          src={staticFile("audio/ui-ding.wav")}
          from={61.75 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={75.61 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={76.61 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={77.61 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={78.61 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={84.49 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
