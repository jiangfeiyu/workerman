import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAILogic } from "./scenes/SceneAILogic";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP29PromptLogic: React.FC = () => {
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
      <Track name="EP29 Scenes">
        <SceneHook
          name="01 AI 吐废话现场"
          durationInFrames={18 * fps}
          episodeLabel="EP29"
          sectionTitle="01 · 许愿式提问翻车"
          headline="为什么让 AI 写方案，总给你一堆“赋能闭环”的正确废话？"
          colleagueSender="同事小陈"
          colleagueRole="许愿式提问"
          colleagueMessage="帮我写一份双十一拉新活动方案，要高端大气、有网感、能爆火！"
          bossSender="AI 助手"
          bossRole="空话生成器"
          bossReply="好的！建议打造“全方位矩阵赋能生态”，通过多维裂变抓手实现流量闭环……"
          takeawayText="⚠ 提问没锁死逻辑边界，AI 只能用万能套话填满空白"
          secondBubbleSec={4.83}
          takeawaySec={10.87}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "用 AI 办公时，你是不是也经常气到想摔键盘：",
              startMs: 250,
              endMs: 4578,
              timestampMs: 2414,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你让它写份活动方案，它给你整出一堆“全方位赋能、打造生态闭环”的正确废话！",
              startMs: 4828,
              endMs: 10570,
              timestampMs: 7699,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "别怪模型笨，其实是你自己用“许愿式提问”，把逻辑边界全留成了空白！",
              startMs: 10870,
              endMs: 16153,
              timestampMs: 13512,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAILogic
          name="02 形式逻辑 Prompt 三件套"
          from={18 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP29"
          sectionTitle="02 · 形式逻辑 Prompt"
          accentColor="#38B764"
          title="用形式逻辑写 Prompt：锁前提 + 且/或/非边界 + 验收标准"
          mode="prompt-logic"
          item1Title="① 锁定前提与角色"
          item1Body="定死视角、受众与硬约束：如“客单 99 元零食、预算 3 万、面向下沉老客”。"
          item2Title="② 布尔边界（且/或/非）"
          item2Body="AND 含排期与测算；OR 路径二选一；NOT 严禁“赋能/闭环”等虚词空话。"
          item3Title="③ 客观验收尺子"
          item3Body="规定条数、每条不超 30 字、必须带可验证指标，不达标直接重写。"
          item4Title="实战公式"
          item4Body="【前提】谁/给谁/硬约束 + 【且/或/非】必须做与严禁做 + 【验收】格式与数字门槛"
          summaryCaption="AI 不是许愿池，你把逻辑轨道铺好，它才会高速狂奔"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "让 AI 一次交出好答案，只需要把形式逻辑装进三件套。",
              startMs: 250,
              endMs: 4949,
              timestampMs: 2600,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一块锁前提：明确角色、受众和硬性事实，比如“预算只有五万、面向下沉市场老客”；",
              startMs: 5199,
              endMs: 12442,
              timestampMs: 8820,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二块加布尔逻辑“且、或、非”：必须含落地排期，路径二选一，同时用非字诀拉黑一切虚词空话；",
              startMs: 12692,
              endMs: 21567,
              timestampMs: 17130,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三块定验收尺子：规定字数上限和量化指标，AI 没法偷懒，直接按你的逻辑轨道狂奔！",
              startMs: 21817,
              endMs: 29525,
              timestampMs: 25671,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 提问前后对比"
          from={49 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP29"
          sectionTitle="03 · 提示词写法对比"
          title="少给情绪形容词，多给硬前提和否定边界"
          badLabel="✖ 许愿式提问"
          badSubtitle="全是虚词，没有尺子"
          badExample="“帮我写一份双十一拉新方案，要高级、有网感、能引爆全网！”"
          badNote="问题：AI 不知道预算、客群和禁忌，只能拼凑万能套话模板"
          goodLabel="✔ 形式逻辑 Prompt"
          goodSubtitle="前提 + 布尔边界 + 验收"
          goodExample="“【前提】99 元零食，预算 3 万。【且】含 3 个裂变钩子与 ROI 测算。【非】禁止空话。【验收】表格输出，每条≤30字。”"
          goodNote="亮点：约束清晰、禁止虚词、格式锁定，产出直接可用于评审"
          goodCardSec={6.61}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边只给几个情绪形容词，AI 只能吐出一堆谁都能用的套话模板；",
              startMs: 250,
              endMs: 6308,
              timestampMs: 3279,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把前提、布尔边界和验收标准一次钉死，AI 输出的内容拿来就能直接开评审会！",
              startMs: 6608,
              endMs: 13278,
              timestampMs: 9943,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={64 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP29"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="写提示词时加上一句“严禁编造数据，缺数据直接标注【待核实】”，用到了哪种逻辑边界？"
          answer="答案：用到了 NOT（否定边界）+ 验收兜底规则！直接堵死 AI 为了凑字数而胡编数字的退路。"
          mantra="本集口诀：前提锁死边界，且或非写明白；验收尺子给到位，AI 不再吐水话！"
          countdownStartSec={4.18}
          answerSec={7.18}
          mantraSec={14.37}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：提示词里加上“严禁编造数据，缺数据直接标待核实”，这是什么逻辑？",
              startMs: 250,
              endMs: 6784,
              timestampMs: 3517,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！这就是最实用的否定边界加上验收兜底，直接堵死 AI 瞎编的退路！",
              startMs: 7184,
              endMs: 13974,
              timestampMs: 10579,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：前提锁死边界，且或非写明白；验收尺子给到位，AI 不再吐水话！",
              startMs: 14374,
              endMs: 21096,
              timestampMs: 17735,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 吐废话现场配音"
          src={staticFile("audio/ep29-scene1.wav")}
          from={0}
          durationInFrames={485}
          volume={1}
        />
        <Audio
          name="02 形式逻辑三件套配音"
          src={staticFile("audio/ep29-scene2.wav")}
          from={18 * fps}
          durationInFrames={886}
          volume={1}
        />
        <Audio
          name="03 提问对比配音"
          src={staticFile("audio/ep29-scene3.wav")}
          from={49 * fps}
          durationInFrames={398}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep29-scene4.wav")}
          from={64 * fps}
          durationInFrames={633}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 许愿提问"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 AI 空话回复"
          src={staticFile("audio/ui-switch.wav")}
          from={4.83 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.87 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 模块1 前提约束"
          src={staticFile("audio/ui-click.wav")}
          from={18.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 模块2 布尔边界"
          src={staticFile("audio/ui-switch.wav")}
          from={20.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 模块3 验收标准"
          src={staticFile("audio/ui-click.wav")}
          from={23.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 实战公式汇总"
          src={staticFile("audio/ui-ding.wav")}
          from={26.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 许愿对比"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 形式逻辑对比"
          src={staticFile("audio/ui-ding.wav")}
          from={55.61 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={68.18 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={69.18 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={70.18 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={71.18 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={78.37 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
