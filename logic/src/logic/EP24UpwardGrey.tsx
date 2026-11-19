import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneNegotiation } from "./scenes/SceneNegotiation";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP24UpwardGrey: React.FC = () => {
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
      <Track name="EP24 Scenes">
        <SceneHook
          name="01 老板拍错板现场"
          durationInFrames={14 * fps}
          episodeLabel="EP24"
          sectionTitle="01 · 高压向上沟通"
          headline="老板拍了一个有大风险的决定，说“不行”只会把天聊死！"
          colleagueSender="老板"
          colleagueRole="强势拍板"
          colleagueMessage="下周起把首页导航分类全撤掉，全站直接改成猜你喜欢瀑布流！"
          bossSender="产品小吴"
          bossRole="当场顶撞"
          bossReply="老板这绝对不行！老客户找不到东西肯定会投诉炸掉的！"
          takeawayText="⚠ 当众说“不行”等于质疑权威，老板哪怕明知不对也难下台阶"
          secondBubbleSec={3.52}
          takeawaySec={8.18}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场最考验情商和逻辑的高压瞬间：",
              startMs: 250,
              endMs: 3271,
              timestampMs: 1760,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "老板兴冲冲拍了一个风险极大的决定，你心里一万个觉得不靠谱，",
              startMs: 3521,
              endMs: 7876,
              timestampMs: 5698,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "如果当众回一句“老板这绝对不行”，哪怕你是对的，天也聊死了！",
              startMs: 8176,
              endMs: 12786,
              timestampMs: 10481,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneNegotiation
          name="02 向上管理三步环"
          from={14 * fps}
          durationInFrames={26 * fps}
          episodeLabel="EP24"
          sectionTitle="02 · 灰度妥协三步环"
          accentColor="#38B764"
          title="不顶撞也不硬扛：接目标 + 摆代价账 + 最小试错包"
          mode="upward-grey"
          item1Title="肯定方向不否定人"
          item1Body="“提升用户逛店时长这个方向太对了，我也非常支持把推荐做强！”"
          item2Title="把反对换成风险账"
          item2Body="“因为老客习惯直奔分类找货，若全量切换可能会拉低复购效率。”"
          item3Title="10% 灰度先跑 3 天"
          item3Body="“建议先用 10% 新用户试跑 3 天，转化涨了立刻全站放开！”"
          item4Title=""
          item4Body=""
          summaryCaption="给足面子又控住风险，让真实数据替你去说服老板"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "优雅劝阻老板，其实只需要走通三步逻辑环。",
              startMs: 250,
              endMs: 3730,
              timestampMs: 1990,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步先接住大目标：肯定他的意图，“提升用户浏览时长这个方向太对了”；",
              startMs: 3980,
              endMs: 9362,
              timestampMs: 6671,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步把“反对”翻译成“风险算账”：全切可能会影响老客复购效率，这是客观代价；",
              startMs: 9612,
              endMs: 15823,
              timestampMs: 12717,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步递上“最小试错包”：先拿一成新用户试跑三天，用真实数据说话，老板既保住了面子，公司也避开了大坑！",
              startMs: 16073,
              endMs: 24616,
              timestampMs: 20344,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 向上沟通对比"
          from={40 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP24"
          sectionTitle="03 · 劝阻上级前后对比"
          title="把试错成本压到最低，老板十有八九立刻点头"
          badLabel="✖ 当众硬怼/盲从"
          badSubtitle="要么得罪人要么背锅"
          badExample="“老板这方案肯定不行，老客会投诉炸的！”（或表面答应、上线背锅）"
          badNote="问题：让老板下不来台，或硬着头皮全量上线踩雷"
          goodLabel="✔ 灰度试错包"
          goodSubtitle="顺方向+控风险"
          goodExample="“支持提升时长！为防老客找货效率下降，建议先切 10% 流量测 3 天，达标再全量推。”"
          goodNote="亮点：既有大局观又有风控意识，把决策变成低成本实验"
          goodCardSec={6.18}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边要么当场顶撞让老板下不来台，要么盲从硬着头皮踩雷；",
              startMs: 250,
              endMs: 5880,
              timestampMs: 3065,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边不否定老板的出发点，只用“十趴流量跑三天”把试错成本压到最低，老板十有八九立刻点头！",
              startMs: 6180,
              endMs: 13745,
              timestampMs: 9962,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={55 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP24"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="如果你给了灰度方案，老板还是坚持“就要 100% 全量上”，这时怎么收尾最专业？"
          answer="答案：立刻备好一键回滚开关、核心指标监控告警和止损阈值，并把回滚预案写进纪要邮件对齐！"
          mantra="本集口诀：先接大目标，再摆代价账，用小步灰度替老板试错！"
          countdownStartSec={3.5}
          answerSec={6.81}
          mantraSec={12.68}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：如果你给了灰度方案，老板还是坚持要全量上线，怎么收尾最专业？",
              startMs: 250,
              endMs: 6414,
              timestampMs: 3332,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！立刻备好一键回滚开关和止损阈值，写进邮件对齐底线！",
              startMs: 6814,
              endMs: 12280,
              timestampMs: 9547,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先接大目标，再摆代价账，用小步灰度替老板试错！",
              startMs: 12680,
              endMs: 18482,
              timestampMs: 15581,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 拍错板现场配音"
          src={staticFile("audio/ep24-scene1.wav")}
          from={0}
          durationInFrames={386}
          volume={1}
        />
        <Audio
          name="02 三步环配音"
          src={staticFile("audio/ep24-scene2.wav")}
          from={14 * fps}
          durationInFrames={740}
          volume={1}
        />
        <Audio
          name="03 向上对比配音"
          src={staticFile("audio/ep24-scene3.wav")}
          from={40 * fps}
          durationInFrames={414}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep24-scene4.wav")}
          from={55 * fps}
          durationInFrames={556}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 老板拍板"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 小吴顶撞"
          src={staticFile("audio/ui-switch.wav")}
          from={3.52 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.18 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 Step1接目标"
          src={staticFile("audio/ui-click.wav")}
          from={14.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 Step2风险账"
          src={staticFile("audio/ui-switch.wav")}
          from={16.3 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 Step3试错包"
          src={staticFile("audio/ui-ding.wav")}
          from={18.8 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 当众硬怼"
          src={staticFile("audio/ui-switch.wav")}
          from={40.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 灰度试错"
          src={staticFile("audio/ui-ding.wav")}
          from={46.18 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={58.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={59.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={60.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={61.81 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={67.68 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
