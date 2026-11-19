import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAILogic } from "./scenes/SceneAILogic";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP32CapstoneWorkflow: React.FC = () => {
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
      <Track name="EP32 Scenes">
        <SceneHook
          name="01 人机错位翻车现场"
          durationInFrames={21 * fps}
          episodeLabel="EP32"
          sectionTitle="01 · 终局实战开场"
          headline="让 AI 一键生成 30 页百万立项书，为什么反而被老板当场打回？"
          colleagueSender="同事小周"
          colleagueRole="一键甩手外包"
          colleagueMessage="老板，这是我让 AI 一键生成的 30 页百万级立项书，连财务模型都自动编好了！"
          bossSender="老板"
          bossRole="灵魂追问"
          bossReply="这目标偏离今年战略，转化率还比大盘高三倍——你是负责人还是 AI 是负责人？"
          takeawayText="⚠ 人机协作不是甩手外包，你必须是握着方向盘的“逻辑总导演”"
          secondBubbleSec={7.84}
          takeawaySec={14.13}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "来到第二季终局实战！很多人一接百万级大项目，就想让 AI 一键生成全套立项书，",
              startMs: 250,
              endMs: 7593,
              timestampMs: 3922,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果洋洋洒洒三十页，方向偏了十万八千里，预算数字还全是凭空编的！",
              startMs: 7843,
              endMs: 13831,
              timestampMs: 10837,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住：人机协作不是甩手外包，你必须是握着方向盘的“逻辑总导演”！",
              startMs: 14131,
              endMs: 19584,
              timestampMs: 16858,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAILogic
          name="02 人机四步闭环工作流"
          from={21 * fps}
          durationInFrames={33 * fps}
          episodeLabel="EP32"
          sectionTitle="02 · 百万立项四步闭环"
          accentColor="#FFCD75"
          title="串联全季心法：人定边界、AI 跑算力、红蓝排雷、金字塔收口"
          mode="capstone-workflow"
          item1Title="① 问题树定边界"
          item1Body="人亲自定义核心商业问题与 MECE 拆分维度，让 AI 穷举并排序待验证假设。"
          item2Title="② 概率与 EV 算账"
          item2Body="人卡住历史基数与止损红线，AI 跑出高/中/低三档期望值测算。"
          item3Title="③ 红蓝对抗补风控"
          item3Body="AI 分饰财务、法务、一线狂轰漏洞，人来敲定最小灰度比例与回滚开关。"
          item4Title="④ 金字塔结论汇报"
          item4Body="AI 按“结论+数据+预案”起草一页纸精华，人来做最终判断与签字拍板。"
          summaryCaption="AI 负责算力和穷举，人负责定调、把关和承担决策责任"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "串联全课程工具，人机拿下百万级立项只需要四步闭环。",
              startMs: 250,
              endMs: 4870,
              timestampMs: 2560,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步问题树定边界：你亲自定好问题和拆解维度，让 AI 帮你穷举假设；",
              startMs: 5120,
              endMs: 11491,
              timestampMs: 8306,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步概率与期望值算账：你给真实基数和预算上限，AI 跑出期望值测算和最坏止损线；",
              startMs: 11741,
              endMs: 19168,
              timestampMs: 15455,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步红蓝对抗补风控：AI 轮番挑刺，你定下最小灰度方案；第四步金字塔收口成稿！AI 负责算力和穷举，人负责定调、把关和拍板！",
              startMs: 19418,
              endMs: 31485,
              timestampMs: 25452,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 立项工作流对比"
          from={54 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP32"
          sectionTitle="03 · 人机协作对比"
          title="不做 AI 搬运工，用四步结构化指令当逻辑总导演"
          badLabel="✖ 一键生成当搬运工"
          badSubtitle="目标失焦、数据失真"
          badExample="“AI 帮我写一份百万级智能客服立项书，越详细越好，最好直接凑够 30 页！”"
          badNote="问题：脱离真实业务约束与历史基数，篇幅越长漏洞越多"
          goodLabel="✔ 总导演四步编排"
          goodSubtitle="人机分工、全链闭环"
          goodExample="“① MECE 拆解痛点；② 按历史 15% 转化率算三档 EV；③ 红蓝对抗找 3 个风控点；④ 金字塔输出一页纸。”"
          goodNote="亮点：每一步都锁死了人的边界与基准，10 分钟产出能直接过会的硬核立项"
          goodCardSec={6.24}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边一句“越详细越好”，交出来的全是无法落地的长篇废话；",
              startMs: 250,
              endMs: 5938,
              timestampMs: 3094,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把问题树、期望值、红蓝对抗和金字塔顺次串起来，十分钟搭出骨肉匀称、老板点头即过的硬核立项！",
              startMs: 6238,
              endMs: 15258,
              timestampMs: 10748,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 终局小测与全季总口诀"
          from={71 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP32"
          sectionTitle="04 · 终局自测 & 全季总口诀"
          question="人机协作中，如果 AI 算出来的期望值（EV）极高，但你凭经验觉得前提过于乐观，该怎么办？"
          answer="答案：人是总导演！立刻下调基础概率重跑测算，并用小步灰度试错把真实风险测出来，绝不盲从模型乐观数字。"
          mantra="全季总口诀：AI 算力做穷举，人类逻辑定边界；破局算账加兜底，职场决策稳赢到底！"
          countdownStartSec={4.3}
          answerSec={7.3}
          mantraSec={15.36}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "终局三秒自测：AI 算出来的期望值很高，但你觉得它前提太乐观，怎么办？",
              startMs: 250,
              endMs: 6897,
              timestampMs: 3574,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！人是总导演！立刻把基准概率调低重算，并用小步灰度试错把真风险测出来！",
              startMs: 7297,
              endMs: 14959,
              timestampMs: 11128,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住全季总口诀：AI 算力做穷举，人类逻辑定边界；破局算账加兜底，职场决策稳赢到底！",
              startMs: 15359,
              endMs: 23393,
              timestampMs: 19376,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 错位现场配音"
          src={staticFile("audio/ep32-scene1.wav")}
          from={0}
          durationInFrames={588}
          volume={1}
        />
        <Audio
          name="02 四步闭环配音"
          src={staticFile("audio/ep32-scene2.wav")}
          from={21 * fps}
          durationInFrames={945}
          volume={1}
        />
        <Audio
          name="03 工作流对比配音"
          src={staticFile("audio/ep32-scene3.wav")}
          from={54 * fps}
          durationInFrames={458}
          volume={1}
        />
        <Audio
          name="04 终局小测口诀配音"
          src={staticFile("audio/ep32-scene4.wav")}
          from={71 * fps}
          durationInFrames={702}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 提交立项"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板灵魂追问"
          src={staticFile("audio/ui-switch.wav")}
          from={7.84 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={14.13 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1步 问题树"
          src={staticFile("audio/ui-click.wav")}
          from={21.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第2步 概率EV"
          src={staticFile("audio/ui-click.wav")}
          from={23.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3步 红蓝对抗"
          src={staticFile("audio/ui-switch.wav")}
          from={26.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第4步 金字塔拍板"
          src={staticFile("audio/ui-ding.wav")}
          from={29.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 搬运工对比"
          src={staticFile("audio/ui-switch.wav")}
          from={54.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 总导演对比"
          src={staticFile("audio/ui-ding.wav")}
          from={60.24 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={75.3 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={76.3 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={77.3 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={78.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 全季总口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={86.36 * fps}
          durationInFrames={42}
          volume={0.35}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
