import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAILogic } from "./scenes/SceneAILogic";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP30HallucinationCheck: React.FC = () => {
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
      <Track name="EP30 Scenes">
        <SceneHook
          name="01 轻信 AI 社死现场"
          durationInFrames={20 * fps}
          episodeLabel="EP30"
          sectionTitle="01 · AI 幻觉社死"
          headline="把 AI 写的“权威报告”直接贴进 PPT，为什么老板一查当场穿帮？"
          colleagueSender="同事小赵"
          colleagueRole="盲信直出"
          colleagueMessage="老板你看，AI 刚帮我拉的行业报告：竞品去年营收暴涨 80%，全靠改了会员图标！"
          bossSender="老板"
          bossRole="核对财报"
          bossReply="我查了人家财报，去年明明只涨了 12%，而且改图标是上个月的事……你没核对过？"
          takeawayText="⚠ AI 擅长用流畅排比句胡说八道，上会前必须先过逻辑体检"
          secondBubbleSec={6.2}
          takeawaySec={12.52}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这两年职场最尴尬的社死，叫“把 AI 瞎编的报告直接贴进汇报稿”！",
              startMs: 250,
              endMs: 5954,
              timestampMs: 3102,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "它文笔流畅、数据精准到小数点后两位，可老板一查财报，当场穿帮！",
              startMs: 6204,
              endMs: 12222,
              timestampMs: 9213,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "AI 最擅长用华丽修辞掩盖硬伤，发出去之前，必须做一遍“防幻觉三问”逻辑体检！",
              startMs: 12522,
              endMs: 18867,
              timestampMs: 15695,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAILogic
          name="02 防幻觉逻辑体检三问"
          from={20 * fps}
          durationInFrames={30 * fps}
          episodeLabel="EP30"
          sectionTitle="02 · 防幻觉三问体检"
          accentColor="#E43B44"
          title="30 秒给 AI 做“逻辑体检”：查概念、查来源、查伪因果"
          mode="hallucination-check"
          item1Title="① 查同一律"
          item1Body="上段说“日活用户”，下段是不是悄悄偷换成了“累计注册数”？"
          item2Title="② 查真前提"
          item2Body="那些带小数点的研报和法条，有没有可核验的一手原始出处？"
          item3Title="③ 查伪因果"
          item3Body="“因为改版所以大涨”，是不是把同期大促的功劳强按在了改版上？"
          item4Title="体检红线"
          item4Body="拿不出原始出处与同口径依据的论断，一律标红【待核实】！"
          summaryCaption="三刀切完，再流畅的“AI 幻觉”也会立刻原形毕露"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "给 AI 答案做逻辑体检，只要连着拷问三句话。",
              startMs: 250,
              endMs: 4208,
              timestampMs: 2229,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一问查同一律：它上段说的“活跃用户”和下段说的“总注册数”，有没有悄悄偷换概念？",
              startMs: 4458,
              endMs: 11113,
              timestampMs: 7786,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二问查真前提：那些带百分比的研报数字和法律条文，敢不敢让它吐出可核验的原始出处？拿不出来的全标红！",
              startMs: 11363,
              endMs: 20110,
              timestampMs: 15737,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三问查伪因果：它总结的“因为改版所以大涨”，是不是把巧合当成了原因？三刀切完，幻觉原形毕露！",
              startMs: 20360,
              endMs: 28937,
              timestampMs: 24649,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 核验前后对比"
          from={50 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP30"
          sectionTitle="03 · AI 产出核验对比"
          title="别被流畅文风骗走，反手让 AI 自己交出软肋"
          badLabel="✖ 盲信直出复制"
          badSubtitle="替模型背锅社死"
          badExample="“AI 写得太顺了！有数字有白皮书金句，直接复制粘贴进周报群发！”"
          badNote="问题：AI 编造的假数字和假出处，最后全算在你自己头上"
          goodLabel="✔ 追问体检交卷"
          goodSubtitle="溯来源 + 查口径"
          goodExample="“请列出这 3 个数据的原始出处与统计口径；无一手依据的标【待核实】，并排查同期活动干扰。”"
          goodNote="亮点：用二次追问倒逼 AI 自曝盲区，稳稳守住汇报专业度"
          goodCardSec={5.91}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边被 AI 的流利文风迷了眼，直接复制粘贴替模型背锅；",
              startMs: 250,
              endMs: 5611,
              timestampMs: 2931,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边反手甩出一句“列口径、溯来源、标待核实”，逼着 AI 自己交出软肋，你只管稳稳把关！",
              startMs: 5911,
              endMs: 14017,
              timestampMs: 9964,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={65 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP30"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="AI 分析“周末下单退货率高，证明周末活动吸引了低质量客户”，体检三问该质疑哪一条？"
          answer="答案：质疑③伪因果与遗漏变量！周末物流延迟、客服停班或周末本就主推高退货服饰，都可能是真原因。"
          mantra="本集口诀：文风越顺越要疑，先查概念与真凭，再防伪造因果链！"
          countdownStartSec={4.03}
          answerSec={7.03}
          mantraSec={15.28}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：AI 说“周末退货高证明周末客户质量差”，体检三问该揪哪条？",
              startMs: 250,
              endMs: 6634,
              timestampMs: 3442,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！揪伪因果和遗漏变量！物流延迟、周末客服停班，都可能才是真原因！",
              startMs: 7034,
              endMs: 14880,
              timestampMs: 10957,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：文风越顺越要疑，先查概念与真凭，再防伪造因果链！",
              startMs: 15280,
              endMs: 21063,
              timestampMs: 18172,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 社死现场配音"
          src={staticFile("audio/ep30-scene1.wav")}
          from={0}
          durationInFrames={566}
          volume={1}
        />
        <Audio
          name="02 防幻觉三问配音"
          src={staticFile("audio/ep30-scene2.wav")}
          from={20 * fps}
          durationInFrames={868}
          volume={1}
        />
        <Audio
          name="03 核验对比配音"
          src={staticFile("audio/ep30-scene3.wav")}
          from={50 * fps}
          durationInFrames={421}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep30-scene4.wav")}
          from={65 * fps}
          durationInFrames={632}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 展示报告"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板打脸"
          src={staticFile("audio/ui-switch.wav")}
          from={6.2 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.52 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 一问同一律"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 二问真前提"
          src={staticFile("audio/ui-switch.wav")}
          from={22.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 三问伪因果"
          src={staticFile("audio/ui-click.wav")}
          from={25.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 体检红线"
          src={staticFile("audio/ui-ding.wav")}
          from={28.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲信对比"
          src={staticFile("audio/ui-switch.wav")}
          from={50.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 追问对比"
          src={staticFile("audio/ui-ding.wav")}
          from={55.91 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={69.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={70.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={71.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={72.03 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.28 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
