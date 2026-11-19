import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneStrategy } from "./scenes/SceneStrategy";

export const EP45LeverageCurve: React.FC = () => {
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
      <Track name="EP45 Scenes">
        <SceneHook
          name="01 线性穷忙现场"
          durationInFrames={14 * fps}
          episodeLabel="EP45"
          sectionTitle="01 · 线性卖时间困局"
          headline="天天加班到 10 点，为什么努力上限还是被卡死？"
          colleagueSender="勤奋员工"
          colleagueRole="拼命卖小时"
          colleagueMessage="老板，我连轴转半年每天加班到十点、所有需求亲自手写，今年能翻倍涨薪吗？"
          bossSender="部门老板"
          bossRole="点破上限"
          bossReply="你苦劳确实大……可一天最多只有 24 小时，你不加班产出立刻掉回一半啊！"
          takeawayText="⚠ 按小时线性卖时间，手停产出就归零；破局靠“可复制杠杆”"
          secondBubbleSec={3.04}
          takeawaySec={7.63}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场最让人焦虑的困局莫过于此：",
              startMs: 250,
              endMs: 2790,
              timestampMs: 1520,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你已经忙到天天晚上十点才下班，怎么努力上限还是卡死在那里？",
              startMs: 3040,
              endMs: 7329,
              timestampMs: 5184,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为你一直在“按小时线性卖时间”，没有给自己造出一根“可复制杠杆”！",
              startMs: 7629,
              endMs: 12491,
              timestampMs: 10060,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneStrategy
          name="02 三大可复制杠杆"
          from={14 * fps}
          durationInFrames={38 * fps}
          episodeLabel="EP45"
          sectionTitle="02 · 个人可复制杠杆"
          accentColor="#A7F070"
          title="同样一天 24 小时，靠三类零成本复制杠杆拉出百倍差距"
          mode="leverage-curve"
          item1Title="纯卖体力与小时数"
          item1Body="手停产出归零，只能一对一应付眼前杂活，每天硬上限死卡在 24 小时"
          item2Title="十年难翻倍"
          item2Body="越努力反而被绑得越紧"
          item3Title="代码自动化 ＋ SOP 流程 ＋ 模板产品"
          item3Body="做好一次就能零成本复制给 10 个人、1 万个客户使用，睡后持续创造回报"
          item4Title="同活做三遍必工具化"
          item4Body="顺手留下可复用复利资产"
          summaryCaption="每次解决完重复痛点，顺手留下一件零复制成本的杠杆工具"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看懂这条斜率分岔线，立刻明白高手是怎么用同样一天拉出百倍差距的。",
              startMs: 250,
              endMs: 6363,
              timestampMs: 3306,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "下面这条平缓直线叫“线性出卖时间”：手一停产出就归零，干十年还是只能一对一应付眼前活；",
              startMs: 6613,
              endMs: 14135,
              timestampMs: 10374,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "上面这条冲天曲线靠的是三类零成本复制杠杆：第一把重复操作写成自动化脚本；",
              startMs: 14385,
              endMs: 21129,
              timestampMs: 17757,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二把个人经验写成 SOP 检查清单带团队一起干；第三把痛点答案做成文章、工具或模板，做好一次就能无限重复交付！每次干活顺手留下一份可复用资产，复利才真正开始转动！",
              startMs: 21379,
              endMs: 36403,
              timestampMs: 28891,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 工作习惯对比"
          from={52 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP45"
          sectionTitle="03 · 干完就丢 vs 工具沉淀"
          title="遵循“同件事做三次必封装”，往后三年白赚时间"
          badLabel="✖ 干完就丢一次性劳动"
          badSubtitle="明天原封不动重干"
          badExample="“又帮新人嘴上讲了遍流程、又手动复制粘贴完一份周报，呼，今天真充实！”"
          badNote="后果：干了五年还在手搓杂事，自己根本离不开一线"
          goodLabel="✔ 同活三遍封装成资产"
          goodSubtitle="脚本 / SOP / 模板杠杆"
          goodExample="“同类问题答到第 2 遍，多花 30 分钟做成 FAQ 机器人或一键模板，以后零秒交付！”"
          goodNote="亮点：每天解放出更多整块时间去攻克更高价值难题"
          goodCardSec={7.19}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边每天忙着反复手搓相同的活，年底只剩一身疲惫和干不完的杂事；",
              startMs: 250,
              endMs: 6894,
              timestampMs: 3572,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边遵循“同件事做三次必工具化”，今天多花半小时做模板，往后三年都在替你白赚时间！",
              startMs: 7194,
              endMs: 14449,
              timestampMs: 10821,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP45"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="经常要做 20 个同风格数据大屏：每次从零手画算什么，先封装母版、配色和公式库再套用算什么？"
          answer="答案：从零手画是纯“线性体力劳动”；封装母版与公式库再批量复用，是最典型的低成本“模板工具杠杆”！"
          mantra="本集口诀：别只线性卖时间，同活三遍变资产！"
          countdownStartSec={5.0}
          answerSec={8.0}
          mantraSec={15.02}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：每次做新项目都从零开始画图，和先封装母版公式库再套用，本质差在哪里？",
              startMs: 250,
              endMs: 7599,
              timestampMs: 3924,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！从零画是按小时卖苦力，封装母版公式库就是复制成本趋近零的个人杠杆！",
              startMs: 7999,
              endMs: 14617,
              timestampMs: 11308,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别只线性卖时间，同活三遍变资产！",
              startMs: 15017,
              endMs: 18910,
              timestampMs: 16963,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 穷忙现场配音"
          src={staticFile("audio/ep45-scene1.wav")}
          from={0}
          durationInFrames={375}
          volume={1}
        />
        <Audio
          name="02 三大杠杆配音"
          src={staticFile("audio/ep45-scene2.wav")}
          from={14 * fps}
          durationInFrames={1093}
          volume={1}
        />
        <Audio
          name="03 习惯对比配音"
          src={staticFile("audio/ep45-scene3.wav")}
          from={52 * fps}
          durationInFrames={434}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep45-scene4.wav")}
          from={68 * fps}
          durationInFrames={568}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 员工苦劳"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板点破"
          src={staticFile("audio/ui-switch.wav")}
          from={3.04 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={7.63 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 线性卖时间"
          src={staticFile("audio/ui-switch.wav")}
          from={14.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 可复制杠杆"
          src={staticFile("audio/ui-ding.wav")}
          from={16.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 干完就丢"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 封装资产"
          src={staticFile("audio/ui-ding.wav")}
          from={59.19 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={73 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={74 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={75 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={76 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={83.02 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
