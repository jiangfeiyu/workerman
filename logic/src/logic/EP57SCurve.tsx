import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneTrendModel } from "./scenes/SceneTrendModel";

export const EP57SCurve: React.FC = () => {
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
      <Track name="EP57 Scenes">
        <SceneHook
          name="01 盲目恋战老业务"
          durationInFrames={17 * fps}
          episodeLabel="EP57"
          sectionTitle="01 · S 曲线恋战翻车"
          headline="老业务明明还在赚钱创新高，为什么现在就要启动第二曲线？"
          colleagueSender="部门主管"
          colleagueRole="死守老业务"
          colleagueMessage="咱们老产品今年营收还涨了 5% 呢！抽人去做新项目纯粹是不务正业！"
          bossSender="战略顾问"
          bossRole="看穿斜率拐点"
          bossReply="可去年增速 60%，今年获客翻了三倍，再等老业务往下掉就来不及接棒了！"
          takeawayText="⚠ 等到业绩真下跌再想转型，现金流和信心早没了"
          secondBubbleSec={5.69}
          takeawaySec={9.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "老板和团队最难做的决定，莫过于在老业务还在赚钱时提前转身！",
              startMs: 250,
              endMs: 5442,
              timestampMs: 2846,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "大家总觉得“既然现在还在涨，折腾啥第二曲线啊”；",
              startMs: 5692,
              endMs: 8898,
              timestampMs: 7295,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可等你真等到业绩暴跌再想转型，现金流早没了，连熬过新项目爬坡期的钱都拿不出来！",
              startMs: 9198,
              endMs: 15478,
              timestampMs: 12338,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneTrendModel
          name="02 S 曲线与第二曲线拐点"
          from={17 * fps}
          durationInFrames={29 * fps}
          episodeLabel="EP57"
          sectionTitle="02 · S 曲线拐点"
          accentColor="#41A6F6"
          title="在第一曲线斜率放缓的 A 点（仍在盈利），提前孵化第二曲线"
          mode="s-curve"
          item1Title="① 第一曲线爆发期"
          item1Body="投入 1 份换 10 份回报，团队信心足、现金流最充沛"
          item2Title="② A 点斜率放缓拐点"
          item2Body="总量还在涨但增速骤降，正是抽 15% 精锐开新线的黄金窗口"
          item3Title="③ 双曲线无缝接力"
          item3Body="趁老业务还在造血时熬过新曲线冷启动，避免青黄不接"
          item4Title=""
          item4Body=""
          summaryCaption="莫等老曲线掉头才转身，在 A 点拐点提前架起第二曲线"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "任何业务和个人技能的增长，都逃不过一条标准的 S 曲线。",
              startMs: 250,
              endMs: 4177,
              timestampMs: 2214,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "前期慢慢爬坡，中期陡峭爆发，到了中后期，斜率突然变缓，这就是边际收益递减的“A 点拐点”；",
              startMs: 4427,
              endMs: 12319,
              timestampMs: 8373,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么绝不能等到掉头向下再开第二曲线？因为新曲线前期也得慢爬很久！",
              startMs: 12569,
              endMs: 18949,
              timestampMs: 15759,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只有在第一曲线还赚着钱、斜率刚开始变平的 A 点果断派出一支小分队孵化，两条曲线才能无缝接力！",
              startMs: 19199,
              endMs: 27110,
              timestampMs: 23155,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 转型时机对比"
          from={46 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP57"
          sectionTitle="03 · 转型窗口对比"
          title="手里还有余粮时架新线，别等断粮才被迫切赛道"
          badLabel="✖ 等到下跌才转型"
          badSubtitle="现金枯竭被迫豪赌"
          badExample="“老产品还能微涨，先别乱动；等明年负增长裁员时，再仓促砸钱做新业务！”"
          badNote="问题：没利润供血，新项目还没熬出冷启动就被迫砍掉"
          goodLabel="✔ A 点拐点提前接棒"
          goodSubtitle="趁主业盈利孵化新线"
          goodExample="“增速从 60% 降到 8% 且获客翻倍，立刻抽 15% 预算与精锐试点第二曲线。”"
          goodNote="亮点：用老业务余粮稳稳托起新业务，平稳穿越周期"
          goodCardSec={8.0}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边看着总量创新高就一直拖，拖到利润干涸才急着换赛道，结果两边一起断粮；",
              startMs: 250,
              endMs: 7704,
              timestampMs: 3977,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边盯住“增速放缓”这个提前信号，趁手里还有余粮，早一步把第二曲线架上去！",
              startMs: 8004,
              endMs: 14310,
              timestampMs: 11157,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={62 * fps}
          durationInFrames={24 * fps}
          episodeLabel="EP57"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="当一份工作你已经“闭眼都能干、连续两年没新长进但工资还不错”，对应 S 曲线哪一段？"
          answer="答案：第一曲线平台期！此时最危险的不是今天没钱，而是在舒适区耗尽了转轨窗口，必须立刻搭起个人第二技能曲线！"
          mantra="本集口诀：莫等掉头才转身，斜率变缓是信号；趁有余粮开新线，两条曲线接力跑！"
          countdownStartSec={3.98}
          answerSec={6.98}
          mantraSec={15.11}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：工作闭眼都能干、连续两年没新长进但工资还不错，你在哪一段？",
              startMs: 250,
              endMs: 6579,
              timestampMs: 3415,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！这就是最危险的个人平台期！趁精力还在、饭碗还稳，立刻搭起自己的第二技能曲线！",
              startMs: 6979,
              endMs: 14710,
              timestampMs: 10845,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：莫等掉头才转身，斜率变缓是信号；趁有余粮开新线，两条曲线接力跑！",
              startMs: 15110,
              endMs: 22541,
              timestampMs: 18826,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 恋战现场配音"
          src={staticFile("audio/ep57-scene1.wav")}
          from={0}
          durationInFrames={464}
          volume={1}
        />
        <Audio
          name="02 S曲线拐点配音"
          src={staticFile("audio/ep57-scene2.wav")}
          from={17 * fps}
          durationInFrames={813}
          volume={1}
        />
        <Audio
          name="03 转型对比配音"
          src={staticFile("audio/ep57-scene3.wav")}
          from={46 * fps}
          durationInFrames={429}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep57-scene4.wav")}
          from={62 * fps}
          durationInFrames={676}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 死守老业务"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 顾问提醒"
          src={staticFile("audio/ui-switch.wav")}
          from={5.69 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.2 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第一曲线"
          src={staticFile("audio/ui-click.wav")}
          from={17.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 A点拐点"
          src={staticFile("audio/ui-switch.wav")}
          from={19.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第二曲线接力"
          src={staticFile("audio/ui-ding.wav")}
          from={22.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 下跌对比"
          src={staticFile("audio/ui-switch.wav")}
          from={46.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 A点接棒对比"
          src={staticFile("audio/ui-ding.wav")}
          from={54 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={65.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={66.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={67.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={68.98 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={77.11 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
