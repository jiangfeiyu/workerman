import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDecision } from "./scenes/SceneDecision";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP17FirstPrinciples: React.FC = () => {
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
      <Track name="EP17 Scenes">
        <SceneHook
          name="01 盲抄大厂现场"
          durationInFrames={15 * fps}
          episodeLabel="EP17"
          sectionTitle="01 · 盲抄大厂翻车"
          headline="“头部大厂上了 AI 智能仪表盘，咱们下周也照抄一套！”"
          colleagueSender="产品小王"
          colleagueRole="盲目对标"
          colleagueMessage="竞品大厂刚上了 12 个专业图表和智能仪表盘，咱们赶紧也全套搬过来！"
          bossSender="运营老张"
          bossRole="泼冷水"
          bossReply="可咱们服务的都是街边小店老板，他们连 Excel 都很少打开啊…"
          takeawayText="⚠ 只抄别人表面的功能，不问底层服务谁、解决什么真痛点"
          secondBubbleSec={4.53}
          takeawaySec={9.87}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场做方案最省事也最容易翻车的一招：抄大厂！",
              startMs: 250,
              endMs: 4275,
              timestampMs: 2262,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "看到头部产品上了复杂仪表盘，不管三七二十一直接搬过来，",
              startMs: 4525,
              endMs: 9566,
              timestampMs: 7045,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果开发忙了两个月，小店老板点开看一眼就关掉了，到底错在哪？",
              startMs: 9866,
              endMs: 14601,
              timestampMs: 12233,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneDecision
          name="02 第一性原理图解"
          from={15 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP17"
          sectionTitle="02 · 第一性原理 vs 类比"
          accentColor="#38B764"
          title="第一性原理：剥掉行业惯例，回到最底层事实重建方案"
          mode="first-principles"
          block1Title="照搬 12 个专业图表"
          block1Body="只看“大厂做了啥”（类比表象），忽略小店老板根本没时间和耐心学复杂报表。"
          block2Title="回到“10 秒算清今天赚没赚”"
          block2Body="从底层需求出发：一张极简“今日收支卡片”就够了！研发成本降 90%，留存翻 3 倍。"
          block3Title=""
          block3Body=""
          summaryCaption="类比思维让你跟在别人后面跑；第一性原理让你找到真正省力的捷径"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这就是“类比思维”和“第一性原理”的根本差距。",
              startMs: 250,
              endMs: 3425,
              timestampMs: 1837,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "类比思维是照猫画虎，只学表象功能，根本不管对方服务的客户是谁；",
              startMs: 3675,
              endMs: 9237,
              timestampMs: 6456,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一性原理要你剥掉行业惯例，追问到最底层的事实：小店老板只想十秒钟算清今天赚没赚钱！",
              startMs: 9487,
              endMs: 17448,
              timestampMs: 13467,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "从这个原点重新推导，一张“今日收支卡片”就够了，成本降九成、留存翻三倍！",
              startMs: 17698,
              endMs: 24106,
              timestampMs: 20902,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 方案推导对比"
          from={40 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP17"
          sectionTitle="03 · 方案推导前后对比"
          title="砍掉 90% 华而不实的惯例，直击底层刚需"
          badLabel="✖ 类比抄作业"
          badSubtitle="对标大厂堆功能"
          badExample="“行业标杆都上了 8 个分析模块和 AI 看板，咱们对标抄齐才显专业！”"
          badNote="问题：把大厂的复杂性硬塞给小店老板，上线后次留暴跌"
          goodLabel="✔ 第一性原理"
          goodSubtitle="回到原点极简重构"
          goodExample="“小店老板关店只有 5 分钟看账，只需要 2 个数字：今日净赚 + 缺货提醒。先上极简卡片！”"
          goodNote="亮点：成本低、上线快、用户零学习门槛直接用起来"
          goodCardSec={6.52}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿着大厂截图当圣旨，把用户不需要的复杂度全背在身上；",
              startMs: 250,
              endMs: 6224,
              timestampMs: 3237,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边回到“五分钟看账”的底层事实，砍掉九成多余功能，一上线就被疯狂好评！",
              startMs: 6524,
              endMs: 12796,
              timestampMs: 9660,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={53 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP17"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“别人家的客服都接入了 7 层菜单机器人，所以我们也必须上 7 层菜单！”——踩了什么坑？"
          answer="答案：盲目类比思维！忘了用户找客服的底层事实是“30 秒解决退款/故障”，多层机器人只会逼疯用户。"
          mantra="本集口诀：别光抄别人的作业，先剥到最底层再重建！"
          countdownStartSec={2.8}
          answerSec={6.07}
          mantraSec={11.64}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“别人家用七层客服菜单，咱们也必须上”，属于哪种思维？",
              startMs: 250,
              endMs: 5665,
              timestampMs: 2957,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，这是盲目类比，忘了用户找客服只想最快解决问题！",
              startMs: 6065,
              endMs: 11238,
              timestampMs: 8651,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别光抄别人的作业，先剥到最底层再重建！",
              startMs: 11638,
              endMs: 15867,
              timestampMs: 13752,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 盲抄现场配音"
          src={staticFile("audio/ep17-scene1.wav")}
          from={0}
          durationInFrames={440}
          volume={1}
        />
        <Audio
          name="02 第一性原理配音"
          src={staticFile("audio/ep17-scene2.wav")}
          from={15 * fps}
          durationInFrames={725}
          volume={1}
        />
        <Audio
          name="03 方案对比配音"
          src={staticFile("audio/ep17-scene3.wav")}
          from={40 * fps}
          durationInFrames={386}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep17-scene4.wav")}
          from={53 * fps}
          durationInFrames={478}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 产品照抄"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 运营提醒"
          src={staticFile("audio/ui-switch.wav")}
          from={4.53 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.87 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 类比卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={15.5 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 第一性卡片"
          src={staticFile("audio/ui-click.wav")}
          from={17.3 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 总结"
          src={staticFile("audio/ui-ding.wav")}
          from={19.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 抄作业"
          src={staticFile("audio/ui-switch.wav")}
          from={40.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 原点重建"
          src={staticFile("audio/ui-ding.wav")}
          from={46.52 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={55.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={56.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={57.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={59.07 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={64.64 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
