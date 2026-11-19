import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { ScenePractice } from "./scenes/ScenePractice";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP14Pyramid: React.FC = () => {
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
      <Track name="EP14 Scenes">
        <SceneHook
          name="01 电梯汇报翻车"
          durationInFrames={15 * fps}
          episodeLabel="EP14"
          sectionTitle="01 · 30 秒电梯汇报"
          headline="“从周一讲到周三，电梯门开了老板还在问：明天到底上不上？”"
          colleagueSender="小李"
          colleagueRole="倒豆子汇报"
          colleagueMessage="老板，周一后端改了表结构，周二设计调了三版切图，周三测试借不到安卓机…"
          bossSender="老板"
          bossRole="走出电梯"
          bossReply="停！我就问一句：明天上午到底能不能准时上线？"
          takeawayText="⚠ 按时间流水账从底往上爬，30 秒根本爬不到重点"
          secondBubbleSec={3.57}
          takeawaySec={9.19}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "电梯里偶遇老板，只有三十秒汇报时间，",
              startMs: 250,
              endMs: 3316,
              timestampMs: 1783,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你从周一忙到周三讲得口干舌燥，电梯门开了老板还没听到答案！",
              startMs: 3566,
              endMs: 8892,
              timestampMs: 6229,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "别再按时间顺序倒豆子了，职场汇报必须把金字塔倒过来建。",
              startMs: 9192,
              endMs: 13613,
              timestampMs: 11402,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <ScenePractice
          name="02 金字塔结构图"
          from={15 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP14"
          sectionTitle="02 · 金字塔表达结构"
          accentColor="#38B764"
          title="塔尖先抛结论，中间最多 3 根支柱，塔底备好细节"
          mode="pyramid"
          slot1Title="塔尖 · 第一句话交底（结论先行）"
          slot1Body="明天上午 10 点可以准时上线！"
          slot2Title="支柱 1 · 主链路质量"
          slot2Body="核心交易压测 100% 通过"
          slot3Title="支柱 2 · 已知小风险"
          slot3Body="2 个低优 UI 顺延下周修"
          slot4Title="塔底 · 客观实证数据"
          slot4Body="只有当老板追问细节时，才把测试报告、工时明细展开给他看"
          summaryCaption="以上统下 + 归类分组：让听众 10 秒记住结论、30 秒建立信任"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "真正高效的表达，永远是一座严密的金字塔。",
              startMs: 250,
              endMs: 3568,
              timestampMs: 1909,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "塔尖第一句话：直接抛核心结论，“能上，或需要延后”；",
              startMs: 3818,
              endMs: 8398,
              timestampMs: 6108,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "中间三根支柱：用 MECE 原则归成三组支撑理由，绝不啰嗦；",
              startMs: 8648,
              endMs: 13925,
              timestampMs: 11286,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "塔底垫上客观数据：只有老板追问细节时，才把底下的实证展开给他看！",
              startMs: 14175,
              endMs: 19714,
              timestampMs: 16944,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 电梯汇报对比"
          from={36 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP14"
          sectionTitle="03 · 电梯汇报前后对比"
          title="10 秒交底结论 + 3 点支撑，老板当场放心点头"
          badLabel="✖ 时间流水账"
          badSubtitle="重点藏在最后一句"
          badExample="“周一做了 A，周二改了 B，周三借手机修了 C，大家最近都很拼，应该差不多吧…”"
          badNote="问题：听完 30 秒，对方依然不知道“到底能不能上”"
          goodLabel="✔ 金字塔 30 秒版"
          goodSubtitle="塔尖先行+三点撑腰"
          goodExample="“【结论】明早 10 点能准时上线。【3 点支撑】① 主链路压测全过；② 2 个小 UI 顺延；③ 回滚预案已就绪。”"
          goodNote="亮点：结论清晰、风险可控、兜底明确，电梯门开刚好讲完"
          goodCardSec={5.15}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边像记流水账，听众的大脑根本抓不住重点；",
              startMs: 250,
              endMs: 4846,
              timestampMs: 2548,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边十秒内先交底“能准时上”，再用三点说清质量、风险和兜底，老板立刻放心点头！",
              startMs: 5146,
              endMs: 12350,
              timestampMs: 8748,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={49 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP14"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="汇报写了“① 进度 100%、② 测试通过、③ 成本超支 20%”，塔尖结论却写“建议继续推进”——错在哪？"
          answer="答案：违反“以上统下”！分论据里出现了负面硬伤（超支 20%），却不解释为何超支仍值得推进，支撑不住塔尖结论。"
          mantra="本集口诀：先抛塔尖再展柱，最多三点不超时！"
          countdownStartSec={3.6}
          answerSec={6.88}
          mantraSec={11.39}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：底下写了“成本超支百分之二十”，塔尖却结论“继续推进”，哪错了？",
              startMs: 250,
              endMs: 6478,
              timestampMs: 3364,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "违反了“以上统下”！分论据支撑不住你的总结论。",
              startMs: 6878,
              endMs: 10990,
              timestampMs: 8934,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先抛塔尖再展柱，最多三点不超时！",
              startMs: 11390,
              endMs: 15392,
              timestampMs: 13391,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 电梯汇报配音"
          src={staticFile("audio/ep14-scene1.wav")}
          from={0}
          durationInFrames={410}
          volume={1}
        />
        <Audio
          name="02 金字塔结构配音"
          src={staticFile("audio/ep14-scene2.wav")}
          from={15 * fps}
          durationInFrames={593}
          volume={1}
        />
        <Audio
          name="03 汇报对比配音"
          src={staticFile("audio/ep14-scene3.wav")}
          from={36 * fps}
          durationInFrames={373}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep14-scene4.wav")}
          from={49 * fps}
          durationInFrames={464}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 小李汇报"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板打断"
          src={staticFile("audio/ui-switch.wav")}
          from={3.57 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.19 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 塔尖出现"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 支柱展开"
          src={staticFile("audio/ui-switch.wav")}
          from={17.1 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 塔底实证"
          src={staticFile("audio/ui-click.wav")}
          from={18.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 金字塔总结"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 流水账卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={36.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 金字塔卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={41.15 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={52.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={53.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={54.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={55.88 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={60.39 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
