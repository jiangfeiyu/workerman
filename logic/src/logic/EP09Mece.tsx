import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneReasoning } from "./scenes/SceneReasoning";

export const EP09Mece: React.FC = () => {
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
      <Track name="EP09 Scenes">
        <SceneHook
          name="01 汇报算不平现场"
          durationInFrames={14 * fps}
          episodeLabel="EP09"
          sectionTitle="01 · 周报分类翻车"
          headline="安卓 40% + 苹果 35% + 学生 30% = 105%？你又重又漏了！"
          colleagueSender="运营小李"
          colleagueRole="月度汇报"
          colleagueMessage="老板，本月新增用户按三类统计：安卓用户 40%、苹果用户 35%、学生用户 30%！"
          bossSender="老板"
          bossRole="灵魂发问"
          bossReply="40% 加 35% 再加 30% 等于 105%？你这分类到底怎么拆的？"
          takeawayText="⚠ 同一层级混用了“系统”和“职业”两把尺子，数据必然打架"
          secondBubbleSec={3.72}
          takeawaySec={8.56}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "写周报、做复盘最尴尬的翻车瞬间：",
              startMs: 250,
              endMs: 3468,
              timestampMs: 1859,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你把用户拆成“安卓、苹果和学生”，加起来居然超过百分百！",
              startMs: 3718,
              endMs: 8255,
              timestampMs: 5986,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么汇报总是又乱又算不平？因为你缺了一把分类尺子。",
              startMs: 8555,
              endMs: 13408,
              timestampMs: 10981,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneReasoning
          name="02 MECE 尺子图解"
          from={14 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP09"
          sectionTitle="02 · MECE 原则图解"
          accentColor="#38B764"
          title="MECE 原则：相互独立（不重） + 完全穷尽（不漏）"
          mode="mece-tree"
          item1Title="一次只用一把尺"
          item1Body="要么全按系统（安卓/iOS/Web），要么全按身份（学生/职场），禁止混切"
          item2Title="所有块加起来 = 100%"
          item2Body="加上“其他/未知”兜底项，确保全集不留空白角落"
          item3Title=""
          item3Body=""
          summaryCaption="好分类就像切蛋糕：每一刀下去，既不重叠也不掉渣"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这把尺子在逻辑学和麦肯锡方法论里，叫“MECE 原则”。",
              startMs: 250,
              endMs: 4668,
              timestampMs: 2459,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一条叫“相互独立”：同一层级只能用一个维度切，各块之间不能重叠；",
              startMs: 4968,
              endMs: 10552,
              timestampMs: 7760,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二条叫“完全穷尽”：所有小块拼起来要严丝合缝，不能漏掉角落！",
              startMs: 10852,
              endMs: 16050,
              timestampMs: 13451,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 故障分类对比"
          from={31 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP09"
          sectionTitle="03 · 复盘拆解前后对比"
          title="统一按一条维度切分，汇报瞬间变清爽"
          badLabel="✖ 维度混用"
          badSubtitle="又重叠又漏项"
          badExample="“故障原因分三块：① 接口报错、② 开发人手不够、③ 首页加载慢。”"
          badNote="问题：混着现象与人力原因，且漏了测试和第三方网关"
          goodLabel="✔ MECE 拆解"
          goodSubtitle="按请求链路切一刀"
          goodExample="“按请求链路拆三段：① 前端渲染耗时；② 后端接口异常；③ 第三方支付超时。覆盖 100% 故障。”"
          goodNote="亮点：各段互不重叠、全链路覆盖，老板一眼锁定瓶颈"
          goodCardSec={6.06}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边混着“现象”和“人力原因”，各块互相打架还漏项；",
              startMs: 250,
              endMs: 5764,
              timestampMs: 3007,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边统一按“请求链路”切一刀：前端、后端、第三方，不重不漏，老板一眼看清瓶颈在哪！",
              startMs: 6064,
              endMs: 13487,
              timestampMs: 9775,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={45 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP09"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“本季度复盘分三部分：① 产品亮点、② 运营复盘、③ 踩坑教训。”——符合 MECE 吗？"
          answer="答案：不符合！“运营复盘”里既可能包含亮点，也可能包含踩坑教训，和①③交叉重叠，维度没统一。"
          mantra="本集口诀：一次只用一把尺，切完不重也不漏！"
          countdownStartSec={3.4}
          answerSec={6.7}
          mantraSec={12.47}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：把复盘拆成“产品亮点、运营复盘、踩坑教训”，合理吗？",
              startMs: 250,
              endMs: 6295,
              timestampMs: 3272,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "不合理！“运营复盘”和“亮点、教训”严重重叠，维度没统一。",
              startMs: 6695,
              endMs: 12070,
              timestampMs: 9382,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：一次只用一把尺，切完不重也不漏！",
              startMs: 12470,
              endMs: 16018,
              timestampMs: 14244,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 算不平现场配音"
          src={staticFile("audio/ep09-scene1.wav")}
          from={0}
          durationInFrames={405}
          volume={1}
        />
        <Audio
          name="02 MECE图解配音"
          src={staticFile("audio/ep09-scene2.wav")}
          from={14 * fps}
          durationInFrames={484}
          volume={1}
        />
        <Audio
          name="03 分类对比配音"
          src={staticFile("audio/ep09-scene3.wav")}
          from={31 * fps}
          durationInFrames={407}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep09-scene4.wav")}
          from={45 * fps}
          durationInFrames={483}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运营汇报"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板质疑"
          src={staticFile("audio/ui-switch.wav")}
          from={3.72 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.56 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 ME卡片"
          src={staticFile("audio/ui-click.wav")}
          from={14.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 CE卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={16.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 总结"
          src={staticFile("audio/ui-ding.wav")}
          from={18.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 错误分类"
          src={staticFile("audio/ui-switch.wav")}
          from={31.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 MECE分类"
          src={staticFile("audio/ui-ding.wav")}
          from={37.06 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={48.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={49.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={50.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={51.7 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={57.47 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
