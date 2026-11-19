import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneCrisis } from "./scenes/SceneCrisis";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP54CrisisResponse: React.FC = () => {
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
      <Track name="EP54 Scenes">
        <SceneHook
          name="01 危机解释翻车现场"
          durationInFrames={21 * fps}
          episodeLabel="EP54"
          sectionTitle="01 · 危机沟通翻车"
          headline="线上出 P0 事故或客诉爆炸时，为什么解释原因反而更挨骂？"
          colleagueSender="业务负责人"
          colleagueRole="急着甩原因"
          colleagueMessage="这次支付崩了 1 小时真不能怪我们，主要是机房运营商网络波动，加上流量太猛……"
          bossSender="暴怒大客户"
          bossRole="安全感失控"
          bossReply="我管你是谁的锅！现在钱扣了订单没到账，你倒是说到底什么时候赔、怎么退啊！"
          takeawayText="⚠ 着火时没人想听你多无辜，先扑火兜底再讲道理"
          secondBubbleSec={5.6}
          takeawaySec={12.31}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "业务突发大故障时，最蠢的一句危机公关就是“其实这次真不能怪我们”！",
              startMs: 250,
              endMs: 5348,
              timestampMs: 2799,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "哪怕真的是外部供应商背锅，你越急着甩客观原因自证清白，客户和老板火气越大！",
              startMs: 5598,
              endMs: 12009,
              timestampMs: 8804,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为着火的那一刻，没人想听谁无辜，大家只想知道：火扑灭了没有？损失谁兜底？",
              startMs: 12309,
              endMs: 19595,
              timestampMs: 15952,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCrisis
          name="02 危机沟通四步止血环"
          from={21 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP54"
          sectionTitle="02 · 危机沟通四步环"
          accentColor="#E43B44"
          title="严格按四步出牌：先止血 ➔ 认事实 ➔ 给时间表 ➔ 再查因"
          mode="crisis-response"
          item1Title="① 先止血"
          item1Body="立刻亮出切断动作：已回滚节点、暂停扣款，数据零丢失。"
          item2Title="② 认事实"
          item2Body="用客观数字直面影响范围，不用“第三方/大概”绕弯推责。"
          item3Title="③ 给兜底"
          item3Body="明确赔付方案与恢复时间点（如 2 小时内原路退回）。"
          item4Title="④ 查根因"
          item4Body="火彻底扑灭、情绪平稳后，再出完整技术复盘报告。"
          summaryCaption="顺序一反就是火上浇油，先稳住客户安全感再谈根因"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "真正稳住局面的危机沟通，必须严格按这四步顺序出牌。",
              startMs: 250,
              endMs: 4521,
              timestampMs: 2386,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步先止血：先亮出应急动作，比如“已切断故障节点、暂停重复扣款”；",
              startMs: 4771,
              endMs: 10844,
              timestampMs: 7808,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步认事实：干脆利落对齐客观影响，绝不用“可能、大概、第三方问题”绕弯；",
              startMs: 11094,
              endMs: 17398,
              timestampMs: 14246,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步给兜底和时间表：几小时内赔付到账、何时恢复；第四步等火扑灭了，再静下心来查根因！顺序一反，解释就是火上浇油！",
              startMs: 17648,
              endMs: 29100,
              timestampMs: 23374,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 危机公告对比"
          from={52 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP54"
          sectionTitle="03 · 危机话术对比"
          title="少讲“我有多努力、这事真不怪我”，多给确定时间表"
          badLabel="✖ 甩锅自证清白"
          badSubtitle="推责空话点燃怒火"
          badExample="“因上游机房网络波动叠加流量激增导致异常，技术正在全力排查，敬请谅解。”"
          badNote="问题：没说影响是否止住、也没说什么时候赔，用户看完直接投诉"
          goodLabel="✔ 止血 + 认账 + 时间表"
          goodSubtitle="三句话瞬间稳住舆论"
          goodExample="“服务已恢复且资金零丢失；受损订单 2 小时内全额退款并附 20 元券，18 点发复盘报告。”"
          goodNote="亮点：止血、期限、补偿一步到位，客户立刻安心不再刷屏"
          goodCardSec={7.25}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边通篇都在讲“这事怪我吗、我在努力了”，用户看完只想立刻投诉；",
              startMs: 250,
              endMs: 6954,
              timestampMs: 3602,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把止血、退款期限和补偿方案直接摆在第一行，三句话就把炸锅的舆论稳稳压了下来！",
              startMs: 7254,
              endMs: 14965,
              timestampMs: 11110,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP54"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="大客户群里刷屏吐槽产品出 Bug，回复“我马上帮您问问研发怎么回事”为什么容易激怒客户？"
          answer="答案：没给确定性兜底与时间节点！应回：“已确认问题并切入紧急通道，15 分钟内带替代方案回来同步进度！”"
          mantra="本集口诀：先止血再认账，给清赔付时间表；火灭之后再复盘，莫在火场讲理由！"
          countdownStartSec={3.01}
          answerSec={6.01}
          mantraSec={14.22}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：大客户群里炸锅吐槽，回复“我帮您问问研发”为什么反而挨骂？",
              startMs: 250,
              endMs: 5608,
              timestampMs: 2929,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！没给确定性兜底！换成“已切紧急通道，十五分钟内带方案回来”，客户立刻安心一半！",
              startMs: 6008,
              endMs: 13818,
              timestampMs: 9913,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先止血再认账，给清赔付时间表；火灭之后再复盘，莫在火场讲理由！",
              startMs: 14218,
              endMs: 21235,
              timestampMs: 17727,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 危机现场配音"
          src={staticFile("audio/ep54-scene1.wav")}
          from={0}
          durationInFrames={588}
          volume={1}
        />
        <Audio
          name="02 四步止血配音"
          src={staticFile("audio/ep54-scene2.wav")}
          from={21 * fps}
          durationInFrames={873}
          volume={1}
        />
        <Audio
          name="03 公告对比配音"
          src={staticFile("audio/ep54-scene3.wav")}
          from={52 * fps}
          durationInFrames={449}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep54-scene4.wav")}
          from={68 * fps}
          durationInFrames={637}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 甩锅解释"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 客户怒怼"
          src={staticFile("audio/ui-switch.wav")}
          from={5.6 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.31 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1步 止血"
          src={staticFile("audio/ui-click.wav")}
          from={21.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第2步 认事实"
          src={staticFile("audio/ui-click.wav")}
          from={23.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3步 给时间表"
          src={staticFile("audio/ui-click.wav")}
          from={26.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第4步 查根因"
          src={staticFile("audio/ui-ding.wav")}
          from={29.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 甩锅对比"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 止血对比"
          src={staticFile("audio/ui-ding.wav")}
          from={59.25 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={71.01 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={72.01 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={73.01 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={74.01 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={82.22 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
