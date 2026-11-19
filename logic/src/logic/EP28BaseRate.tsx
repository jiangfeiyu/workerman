import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProbability } from "./scenes/SceneProbability";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP28BaseRate: React.FC = () => {
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
      <Track name="EP28 Scenes">
        <SceneHook
          name="01 准确率 99% 画饼现场"
          durationInFrames={19 * fps}
          episodeLabel="EP28"
          sectionTitle="01 · 99% 准确率骗局"
          headline="“系统准确率高达 99%”——为什么一上线还是误封一半好人？！"
          colleagueSender="供应商"
          colleagueRole="只报准确率"
          colleagueMessage="老板放心！咱们这套风控系统准确率高达 99%，抓刷单几乎零失误！"
          bossSender="采购同事"
          bossRole="信以为真"
          bossReply="99% 快赶上百分百了！干脆把人工复核岗裁掉，全部直接自动封号吧！"
          takeawayText="⚠ 真实坏人基数太小时，99% 准的警报里有一半是冤枉好人（基本比率谬误）"
          secondBubbleSec={4.57}
          takeawaySec={11.27}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "签采购合同时，你一定听过这种极具迷惑性的宣传语：",
              startMs: 250,
              endMs: 4324,
              timestampMs: 2287,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“我们的系统识别准确率高达百分之九十九”，一听感觉几乎不会错，差点就直接自动封号了！",
              startMs: 4574,
              endMs: 10965,
              timestampMs: 7769,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么“百分之九十九准”在真实业务里，误杀率可能高达一半？你忘了算基本比率！",
              startMs: 11265,
              endMs: 17419,
              timestampMs: 14342,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneProbability
          name="02 千人漏斗图解"
          from={19 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP28"
          sectionTitle="02 · 基本比率谬误"
          accentColor="#E43B44"
          title="1000 人跑一遍漏斗：99% 准确率竟约等于 50% 瞎猜！"
          mode="base-rate"
          item1Title="1% 真坏人（10 人）"
          item1Body="990 个都是正常下单好用户（基础比例极低）"
          item2Title="10 人全抓出"
          item2Body="真坏人 100% 命中，系统抓回全部 10 个羊毛党"
          item3Title="约 10 个好人被冤"
          item3Body="990 个好用户 × 1% 误杀率 ≈ 10 名无辜用户进报警池"
          item4Title="真实命中率 50%"
          item4Body="报警池共 20 人：10 真 10 假！直接自动封号等于抛硬币"
          summaryCaption="看任何“高准确率”模型之前，先问清稀有事件的真实基数（Base Rate）"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把一千个正常下单用户放进漏斗算一笔账，魔术当场拆穿。",
              startMs: 250,
              endMs: 5052,
              timestampMs: 2651,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "先看基础基数：一千人里，真羊毛党只占百分之一，也就是十个人；好用户有九百九十个；",
              startMs: 5302,
              endMs: 12752,
              timestampMs: 9027,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "系统虽然抓全了这十个真坏人，可面对九百九十个好人，百分之一的误杀率会误抓近十个无辜用户；",
              startMs: 13002,
              endMs: 20443,
              timestampMs: 16722,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "最后报警池一共亮灯二十个人：十个真坏人加十个冤枉的好人，实际抓准率只有百分之五十，跟抛硬币一模一样！",
              startMs: 20693,
              endMs: 29442,
              timestampMs: 25067,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 采买落地对比"
          from={50 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP28"
          sectionTitle="03 · 迷信指标 vs 漏斗分层"
          title="高准确率工具不是直接代替人，而是帮人缩小 98% 排查范围"
          badLabel="✖ 迷信 99% 一刀切"
          badSubtitle="直接自动封号"
          badExample="“99% 准还要什么人工复核？全量接入自动拦截，省掉审核团队！”"
          badNote="后果：每封 2 人就冤枉 1 个高价值老客，客诉当场炸锅"
          goodLabel="✔ 基数漏斗 + 二次核验"
          goodSubtitle="机器初筛 + 轻量复核"
          goodExample="“坏人基数小，报警池里一半是误杀；先由模型把 1000 人缩成 20 人，再加短信验证或人工 10 秒复核。”"
          goodNote="亮点：审核工作量降 98%，同时做到极低误伤率"
          goodCardSec={6.58}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边迷信单个准确率数字一刀切自动封号，口碑瞬间崩盘；",
              startMs: 250,
              endMs: 6277,
              timestampMs: 3263,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边看清真实基数和漏斗占比，把高准确率工具用在初筛降本、关键动作留一道低成本核验，既省钱又不伤好人！",
              startMs: 6577,
              endMs: 16369,
              timestampMs: 11473,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP28"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="某种罕见线上故障发生率只有 1‰，配了一套准确率 99% 的报警器，警报一响是真故障的概率大吗？"
          answer="答案：不大（不到 10%）！1000 次正常请求 1% 误报就会响 10 次假警报，而真故障只有 1 次，狼来了居多。"
          mantra="本集口诀：别光盯着准确率，先查基数画漏斗！"
          countdownStartSec={4.4}
          answerSec={7.4}
          mantraSec={14.17}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：千分之一的罕见故障配百分之九十九准的报警，警报一响是真故障的概率大吗？",
              startMs: 250,
              endMs: 6996,
              timestampMs: 3623,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！一千次正常也会误报十次，真故障才一次，九成以上是假警报！",
              startMs: 7396,
              endMs: 13773,
              timestampMs: 10584,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别光盯着准确率，先查基数画漏斗！",
              startMs: 14173,
              endMs: 18222,
              timestampMs: 16197,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 99%准确率现场配音"
          src={staticFile("audio/ep28-scene1.wav")}
          from={0}
          durationInFrames={523}
          volume={1}
        />
        <Audio
          name="02 基本比率漏斗配音"
          src={staticFile("audio/ep28-scene2.wav")}
          from={19 * fps}
          durationInFrames={884}
          volume={1}
        />
        <Audio
          name="03 采买对比配音"
          src={staticFile("audio/ep28-scene3.wav")}
          from={50 * fps}
          durationInFrames={492}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep28-scene4.wav")}
          from={68 * fps}
          durationInFrames={547}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 销售话术"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 采购轻信"
          src={staticFile("audio/ui-switch.wav")}
          from={4.57 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.27 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1步基数"
          src={staticFile("audio/ui-switch.wav")}
          from={19.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第2步抓坏人"
          src={staticFile("audio/ui-click.wav")}
          from={21.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3步误杀"
          src={staticFile("audio/ui-click.wav")}
          from={23.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第4步真相"
          src={staticFile("audio/ui-ding.wav")}
          from={24.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲目封号"
          src={staticFile("audio/ui-switch.wav")}
          from={50.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 分层复核"
          src={staticFile("audio/ui-ding.wav")}
          from={56.58 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={72.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={73.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={74.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={75.4 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={82.17 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
