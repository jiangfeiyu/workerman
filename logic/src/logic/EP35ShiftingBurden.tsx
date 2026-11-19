import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneSystemLoop } from "./scenes/SceneSystemLoop";

export const EP35ShiftingBurden: React.FC = () => {
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
      <Track name="EP35 Scenes">
        <SceneHook
          name="01 救火队员困局"
          durationInFrames={14 * fps}
          episodeLabel="EP35"
          sectionTitle="01 · 止痛药上瘾现场"
          headline="天天熬夜手动修数据，为什么团队反而越忙越缺人？"
          colleagueSender="研发主管"
          colleagueRole="短期救急"
          colleagueMessage="线上又出脏数据了！来不及写校验，老张先通宵手动修好，下月一定补自动化！"
          bossSender="老张"
          bossRole="疲于奔命"
          bossReply="主管，这话你连说五个月了，现在每天光手动修数据就占掉一半工时啊！"
          takeawayText="⚠ 用“短期止痛药”替代“长期建机制”，会彻底废掉团队造血力"
          secondBubbleSec={4.22}
          takeawaySec={7.64}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "团队忙到飞起却越做越累，往往不是不够努力，",
              startMs: 250,
              endMs: 3974,
              timestampMs: 2112,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "而是掉进了一个叫“舍本逐末”的系统死循环：",
              startMs: 4224,
              endMs: 7336,
              timestampMs: 5780,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "出一次问题吃一片止痛药，越吃越爽，最后彻底失去了自愈能力！",
              startMs: 7636,
              endMs: 12700,
              timestampMs: 10168,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneSystemLoop
          name="02 舍本逐末双回路"
          from={14 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP35"
          sectionTitle="02 · 舍本逐末（Shifting the Burden）"
          accentColor="#F77622"
          title="止痛药见效越快，团队原本的造血能力萎缩得越快"
          mode="shifting-burden"
          item1Title="通宵救火 / 手动修库 / 发券冲量"
          item1Body="今晚立刻把窟窿堵上，报表看着很漂亮，人人都夸“救火英雄执行力强”"
          item2Title="挤占全部“治本时间”"
          item2Body="每次救火都耗光写自动化、做培训的工时，久而久之系统越来越脆弱"
          item3Title="补齐自动化校验与标准化培训"
          item3Body="前两周感觉慢且累，但一旦跑通就能永久消灭同类型反复故障"
          item4Title="硬性纪律"
          item4Body="救火 1 次必须配 1 条根治排期"
          summaryCaption="越上瘾的短期止痛药，越会让问题长期恶化失控"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看清“止痛药”是怎么一步步把根本能力掏空的。",
              startMs: 250,
              endMs: 3628,
              timestampMs: 1939,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "当矛盾一爆发，上面这条短路径最诱人：熬夜救火、手动修库、发券冲单，今晚立马见效，人人夸你执行力强；",
              startMs: 3878,
              endMs: 13588,
              timestampMs: 8733,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可它隐藏了一个恶性副作用：每次救火都在挤占写自动化测试、做新人培训的时间；",
              startMs: 13838,
              endMs: 20050,
              timestampMs: 16944,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "久而久之，下面这条慢但正确的根本解法彻底萎缩，问题爆发得越来越频繁，最后整个团队只能靠连轴转硬扛！",
              startMs: 20300,
              endMs: 29392,
              timestampMs: 24846,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 治理问题对比"
          from={45 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP35"
          sectionTitle="03 · 只打止痛针 vs 急救配治本"
          title="救完急难立刻锁定治本预算，绝不把治本推给“下个月”"
          badLabel="✖ 永远止痛推下月"
          badSubtitle="靠透支人力硬扛"
          badExample="“先通宵把这一批修好 / 先发半价券把月度 GMV 冲过去，机制下个月再补！”"
          badNote="问题：下个月还是这么忙，技术债和补贴依赖越滚越厚"
          goodLabel="✔ 止血 ＋ 强制治本配比"
          goodSubtitle="每次救火附带根治任务"
          goodExample="“今天先手动止血上线，但排期表必须强制留 20% 工时在下周五前补齐自动防呆校验。”"
          goodNote="亮点：同类故障不再复发，团队逐步从救火中解放"
          goodCardSec={5.07}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边永远把“治本的事”推给永远不会到来的“下个月”；",
              startMs: 250,
              endMs: 4773,
              timestampMs: 2511,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把急救和治本分开写进排期表：救一次火，必须强制附带一条根治排期，彻底断掉对止痛药的依赖！",
              startMs: 5073,
              endMs: 13733,
              timestampMs: 9403,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={60 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP35"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="老板见自然复购低，连发 3 个月“满 100 减 50”保销量，第 4 个月一停直接腰斩，坑在哪里？"
          answer="答案：大额补贴成了吃上瘾的止痛药！既没改好产品本身体验，还把用户彻底驯化成“没券不下单”。"
          mantra="本集口诀：急救可以救急难，绝不拿它当饭吃！"
          countdownStartSec={4.03}
          answerSec={7.03}
          mantraSec={13.91}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：连发三个月半价补贴保销量，第四个月一停直接腰斩，坑在哪里？",
              startMs: 250,
              endMs: 6627,
              timestampMs: 3438,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！补贴是吃上瘾的止痛药，不仅没修产品体验，还把用户驯化成无券不买了！",
              startMs: 7027,
              endMs: 13509,
              timestampMs: 10268,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：急救可以救急难，绝不拿它当饭吃！",
              startMs: 13909,
              endMs: 17782,
              timestampMs: 15845,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 救火困局配音"
          src={staticFile("audio/ep35-scene1.wav")}
          from={0}
          durationInFrames={381}
          volume={1}
        />
        <Audio
          name="02 舍本逐末图解配音"
          src={staticFile("audio/ep35-scene2.wav")}
          from={14 * fps}
          durationInFrames={882}
          volume={1}
        />
        <Audio
          name="03 治理对比配音"
          src={staticFile("audio/ep35-scene3.wav")}
          from={45 * fps}
          durationInFrames={412}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep35-scene4.wav")}
          from={60 * fps}
          durationInFrames={534}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 主管救火"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 员工累瘫"
          src={staticFile("audio/ui-switch.wav")}
          from={4.22 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={7.64 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 短期止痛药"
          src={staticFile("audio/ui-switch.wav")}
          from={14.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 恶性副作用"
          src={staticFile("audio/ui-click.wav")}
          from={16.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 根本解萎缩"
          src={staticFile("audio/ui-ding.wav")}
          from={18.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 只打止痛针"
          src={staticFile("audio/ui-switch.wav")}
          from={45.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 治本配比"
          src={staticFile("audio/ui-ding.wav")}
          from={50.07 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={64.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={65.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={66.03 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={67.03 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={73.91 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
