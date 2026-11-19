import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { ScenePractice } from "./scenes/ScenePractice";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP15StarCausal: React.FC = () => {
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
      <Track name="EP15 Scenes">
        <SceneHook
          name="01 述职被质疑现场"
          durationInFrames={15 * fps}
          episodeLabel="EP15"
          sectionTitle="01 · 述职答辩拷问"
          headline="“你说业绩涨了 20%，怎么证明是你改出来的，而不是大盘涨的？”"
          colleagueSender="答辩人"
          colleagueRole="自信汇报"
          colleagueMessage="我主导了首页改版和文案优化，上线后核心下单转化率直接提升了 20%！"
          bossSender="面试官"
          bossRole="硬核追问"
          bossReply="那段时间市场部也在投广告，你怎么证明这 20% 是你改出来的？"
          takeawayText="⚠ Action 和 Result 之间缺少“排他性因果证明”，再亮眼也会被打折"
          secondBubbleSec={4.12}
          takeawaySec={9.5}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "述职答辩或面试时，最怕被评委问住这一句：",
              startMs: 250,
              endMs: 3869,
              timestampMs: 2059,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“你说业绩涨了百分之二十，怎么证明是你干出来的，而不是大盘涨的？”",
              startMs: 4119,
              endMs: 9200,
              timestampMs: 6659,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "很多人背了 STAR 法则还是被问倒，就因为中间少了一根因果锁链！",
              startMs: 9500,
              endMs: 14229,
              timestampMs: 11864,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <ScenePractice
          name="02 STAR 因果链升级"
          from={15 * fps}
          durationInFrames={22 * fps}
          episodeLabel="EP15"
          sectionTitle="02 · STAR 因果链升级"
          accentColor="#A77BCA"
          title="在 Action 和 Result 之间加上“因果排他证据”"
          mode="star-causal"
          slot1Title="S/T · 锁定真痛点"
          slot1Body="旧版首屏跳出率达 62%，核心流失卡在注册表单第 2 步。"
          slot2Title="A · 关键动作"
          slot2Body="删减 3 个非必填字段，并增加分段式进度引导。"
          slot3Title="🔍 因果排他验证"
          slot3Body="14 天 A/B 对照实验，同投放渠道下剔除大盘季节波动。"
          slot4Title="★ 可归因结果 R"
          slot4Body="实验组转化净提升 11.4%，方法论沉淀为全站表单规范。"
          summaryCaption="证明“去掉我的动作，成果就不会发生”，才叫硬核战功"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "来看逻辑升级版 STAR 模型，关键就在行动和结果中间那一步。",
              startMs: 250,
              endMs: 4402,
              timestampMs: 2326,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "普通写法只是按时间顺序列出“我做了 A、结果出了 B”；",
              startMs: 4652,
              endMs: 8815,
              timestampMs: 6733,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "升级写法必须加上“因果排他证据”：通过对照实验、同机器压测或漏斗拆解，",
              startMs: 9065,
              endMs: 15466,
              timestampMs: 12265,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "证明“去掉我的动作，这个成果就不会发生”，这才叫真正属于你的战功！",
              startMs: 15716,
              endMs: 20561,
              timestampMs: 18138,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 述职表达对比"
          from={37 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP15"
          sectionTitle="03 · 述职/面试对比"
          title="11.4% 的净提升，比虚胖的 20% 含金量翻倍"
          badLabel="✖ 弱因果流水账"
          badSubtitle="先做后成当功劳"
          badExample="“我主导了首页改版和文案优化，上线一个月后全站下单量提升 20%。”"
          badNote="问题：经不起追问大促与投放变量，听起来像在凑数字"
          goodLabel="✔ 硬核因果证明"
          goodSubtitle="对照实验+剥离净值"
          goodExample="“针对第 2 步 62% 跳出率做分步简化；经 14 天 A/B 对照剔除投放波动后，实验组转化净提升 11.4%。”"
          goodNote="亮点：痛点→动作→对照排他→净收益，评委直接给高分"
          goodCardSec={5.77}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边说了“主导”“优化”，数字看着吓人，经不起深挖；",
              startMs: 250,
              endMs: 5468,
              timestampMs: 2859,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边精准交代痛点、动作和对照净值，哪怕数字从二十降到十一点四，含金量反而翻倍！",
              startMs: 5768,
              endMs: 13198,
              timestampMs: 9483,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={51 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP15"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“我建立周会制度后，半年内团队离职率从 15% 降到了 5%，说明周会很有效！”——哪里有漏洞？"
          answer="答案：忽略了同期混杂变量！比如半年内公司普调了薪资、或行业变冷大家不愿跳槽，没排除这些因素就不能归因于周会。"
          mantra="本集口诀：先做后成不叫因，对照排除才服人！"
          countdownStartSec={2.9}
          answerSec={6.15}
          mantraSec={11.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：建了周会制度后离职率下降，能直接算成周会的功劳吗？",
              startMs: 250,
              endMs: 5746,
              timestampMs: 2998,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "不能！可能同期涨薪了或大环境变冷，没做排除不能归因。",
              startMs: 6146,
              endMs: 11429,
              timestampMs: 8787,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先做后成不叫因，对照排除才服人！",
              startMs: 11829,
              endMs: 15884,
              timestampMs: 13856,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 述职拷问配音"
          src={staticFile("audio/ep15-scene1.wav")}
          from={0}
          durationInFrames={429}
          volume={1}
        />
        <Audio
          name="02 STAR因果配音"
          src={staticFile("audio/ep15-scene2.wav")}
          from={15 * fps}
          durationInFrames={619}
          volume={1}
        />
        <Audio
          name="03 述职对比配音"
          src={staticFile("audio/ep15-scene3.wav")}
          from={37 * fps}
          durationInFrames={398}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep15-scene4.wav")}
          from={51 * fps}
          durationInFrames={479}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 候选人发言"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 面试官追问"
          src={staticFile("audio/ui-switch.wav")}
          from={4.12 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.5 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 STAR_S"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 STAR_A"
          src={staticFile("audio/ui-switch.wav")}
          from={17.1 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 STAR_验证"
          src={staticFile("audio/ui-click.wav")}
          from={18.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 STAR_R"
          src={staticFile("audio/ui-ding.wav")}
          from={20.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 弱因果卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={37.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 因果证明卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={42.77 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={53.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={54.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={55.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={57.15 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={62.83 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
