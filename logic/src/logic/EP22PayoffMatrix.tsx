import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneNegotiation } from "./scenes/SceneNegotiation";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP22PayoffMatrix: React.FC = () => {
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
      <Track name="EP22 Scenes">
        <SceneHook
          name="01 部门内耗现场"
          durationInFrames={16 * fps}
          episodeLabel="EP22"
          sectionTitle="01 · 职场囚徒困境"
          headline="销售乱承诺、研发报高工期…人人都精明，为啥部门全输？"
          colleagueSender="销售同学"
          colleagueRole="先斩后奏"
          colleagueMessage="我先把下周一上线答应给大客户了，不这样单子明天就要飞了！"
          bossSender="研发主管"
          bossRole="防御反击"
          bossReply="行，那以后你报来的所有需求，我们排期全都先往高里报 3 倍！"
          takeawayText="⚠ 各自选了“最保护自己”的一步，合起来却把单子彻底搞黄"
          secondBubbleSec={5.03}
          takeawaySec={10.21}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场最让人心累的一幕：部门里每个人都很聪明、都在保护自己，",
              startMs: 250,
              endMs: 4784,
              timestampMs: 2517,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "销售为了抢单提前乱承诺，研发为了防背锅把工期故意报三倍，",
              startMs: 5034,
              endMs: 9912,
              timestampMs: 7473,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果最后客户嫌太慢跑了，两个部门年底全都拿不到奖金！",
              startMs: 10212,
              endMs: 14726,
              timestampMs: 12469,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneNegotiation
          name="02 博弈矩阵图解"
          from={16 * fps}
          durationInFrames={26 * fps}
          episodeLabel="EP22"
          sectionTitle="02 · 2×2 囚徒困境矩阵"
          accentColor="#F77622"
          title="别怪大家没格局：收益矩阵写错了，理智人必互相甩锅"
          mode="payoff-matrix"
          item1Title="销售坦诚 + 研发实报"
          item1Body="报价精准、按期交付，双双拿大额成单奖金"
          item2Title="销售实诚 + 研发虚报"
          item2Body="研发留足安全垫不加班，销售丢单背锅"
          item3Title="销售抢跑 + 研发硬扛"
          item3Body="销售拿签单提成，研发通宵修 Bug 吃绩效罚单"
          item4Title="销售乱许诺 + 研发报 3 倍"
          item4Body="报价太贵直接丢单，两个部门年终奖全归零！"
          summaryCaption="破局秘诀：改收益规则，让“合作”比“留一手”更划算"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把这盘棋画成二乘二博弈矩阵，答案一眼看穿。",
              startMs: 250,
              endMs: 3853,
              timestampMs: 2051,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右下角是“各自甩锅、互相留一手”：看似个人最安全，结果双双丢单只拿一分；",
              startMs: 4103,
              endMs: 10561,
              timestampMs: 7332,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左上角才是“坦诚对齐、一起配合”：双赢各拿八分，可单靠嘴上喊格局根本去不了！",
              startMs: 10811,
              endMs: 17510,
              timestampMs: 14160,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "破局只有一招：改收益规则，绑定共同奖金、把互坑成本拉高，逼着大家自动走进双赢格！",
              startMs: 17760,
              endMs: 25124,
              timestampMs: 21442,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 机制破局对比"
          from={42 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP22"
          sectionTitle="03 · 机制设计对比"
          title="嘴上喊“要有大局观”没用，把利益绑在一条船上才管用"
          badLabel="✖ 道德喊话"
          badSubtitle="矩阵没改照样互坑"
          badExample="“大家都是同事，要有格局、要团结，以后别老想着留一手！”"
          badNote="问题：嘴上答应团结，散会后考核机制没变，依然各保各的"
          goodLabel="✔ 重写收益矩阵"
          goodSubtitle="奖惩绑定共同结果"
          goodExample="“设立联合交付奖：成单奖金共享【且】延期罚金共担；排期按历史同模块工时透明估算。”"
          goodNote="亮点：互相配合变成最自私也最划算的选择，自然实现双赢"
          goodCardSec={6.09}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边靠开会喊口号让大伙“有格局”，散会照样互相防着；",
              startMs: 250,
              endMs: 5791,
              timestampMs: 3020,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把利益和责任绑在同一条船上，让合作自然变成两个部门最划算的选择！",
              startMs: 6091,
              endMs: 12059,
              timestampMs: 9075,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={55 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP22"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="为什么跨部门“长期固定搭档”很少互相甩锅，而“临时拼团一锤子买卖”最容易扯皮？"
          answer="答案：重复博弈 vs 单次博弈！长期合作时今天坑人明天一定被反坑，诚信合作才是长期最优解。"
          mantra="本集口诀：别靠口号求团结，改掉规则自然赢！"
          countdownStartSec={3.6}
          answerSec={6.89}
          mantraSec={12.5}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：为什么长期搭档很少互相甩锅，一锤子买卖却最容易扯皮？",
              startMs: 250,
              endMs: 6492,
              timestampMs: 3371,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！重复博弈下，今天坑人明天会被反坑，合作才最划算！",
              startMs: 6892,
              endMs: 12104,
              timestampMs: 9498,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别靠口号求团结，改掉规则自然赢！",
              startMs: 12504,
              endMs: 16692,
              timestampMs: 14598,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 内耗现场配音"
          src={staticFile("audio/ep22-scene1.wav")}
          from={0}
          durationInFrames={444}
          volume={1}
        />
        <Audio
          name="02 博弈矩阵配音"
          src={staticFile("audio/ep22-scene2.wav")}
          from={16 * fps}
          durationInFrames={756}
          volume={1}
        />
        <Audio
          name="03 机制对比配音"
          src={staticFile("audio/ep22-scene3.wav")}
          from={42 * fps}
          durationInFrames={364}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep22-scene4.wav")}
          from={55 * fps}
          durationInFrames={503}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 销售抢单"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 研发报高"
          src={staticFile("audio/ui-switch.wav")}
          from={5.03 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.21 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 矩阵格1"
          src={staticFile("audio/ui-click.wav")}
          from={16.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 双赢格"
          src={staticFile("audio/ui-switch.wav")}
          from={18.1 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 困境格"
          src={staticFile("audio/ui-click.wav")}
          from={19.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 破局总结"
          src={staticFile("audio/ui-ding.wav")}
          from={21.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 道德喊话"
          src={staticFile("audio/ui-switch.wav")}
          from={42.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 重写规则"
          src={staticFile("audio/ui-ding.wav")}
          from={48.09 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={58.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={59.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={60.6 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={61.89 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={67.5 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
