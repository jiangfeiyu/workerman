import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneFallacy } from "./scenes/SceneFallacy";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP06AuthorityCircle: React.FC = () => {
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
      <Track name="EP06 Scenes">
        <SceneHook
          name="01 资历压人现场"
          durationInFrames={14 * fps}
          episodeLabel="EP06"
          sectionTitle="01 · 挡箭牌现场"
          headline="“别问为什么，大厂都是这么做的，你才来半年懂什么？”"
          colleagueSender="新人小吴"
          colleagueRole="业务提问"
          colleagueMessage="这版表单拆了 5 步太长了，会不会导致用户在第 3 步就大量流失啊？"
          bossSender="前辈老赵"
          bossRole="直接压人"
          bossReply="某大厂去年就是这么改的，你才工作半年懂什么？按流程照做就行！"
          takeawayText="⚠ 跳过事实和场景匹配，拿“头衔、惯例、资历”当挡箭牌"
          secondBubbleSec={4.35}
          takeawaySec={7.88}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "提出一个具体疑问，对方不讲道理，只甩出一句：",
              startMs: 250,
              endMs: 4103,
              timestampMs: 2176,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“大厂都是这么做的，你才工作半年懂什么？”",
              startMs: 4353,
              endMs: 7581,
              timestampMs: 5967,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "遇到这种话别被气到，用逻辑透镜一眼看穿它在拿什么挡箭。",
              startMs: 7881,
              endMs: 12792,
              timestampMs: 10336,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneFallacy
          name="02 三种挡箭牌图解"
          from={14 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP06"
          sectionTitle="02 · 谬误透视镜"
          accentColor="#41A6F6"
          title="诉诸权威 + 循环论证 + 对人不对事：全都没回答问题本身"
          mode="circle-authority"
          leftTitle="“大厂这么做 / 你才来半年”"
          leftDetail="头衔与资历，不能决定表单转化率是高还是低"
          rightTitle="“必须按这模板做，因为一直是标准”"
          rightDetail="用结论证明结论，原地绕圈零新信息"
          summaryCaption="核心破局：把“谁说的”放到一边，只看“适不适合当前场景”"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这里藏着三个挡箭牌：第一是诉诸权威，大厂的业务和咱们体量一样吗？",
              startMs: 250,
              endMs: 5765,
              timestampMs: 3007,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二是循环论证：“因为一直这么规定，所以必须遵守”，原地绕圈没有新信息。",
              startMs: 6065,
              endMs: 11811,
              timestampMs: 8938,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三是对人不对事：你的资历长短，根本不能决定“表单转化率是高还是低”！",
              startMs: 12111,
              endMs: 18148,
              timestampMs: 15129,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 破局话术对比"
          from={33 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP06"
          sectionTitle="03 · 礼貌破局对比"
          title="不拼资历也不硬刚，用小步验证把球踢回事实"
          badLabel="✖ 情绪硬刚"
          badSubtitle="陷入身份对立"
          badExample="“大厂怎么了？你资历老就能不讲道理吗？我看这方案就是不行！”"
          badNote="问题：把业务讨论变成面子之争，问题本身无人关心"
          goodLabel="✔ 聚焦事实"
          goodSubtitle="肯定参考+小流量验证"
          goodExample="“大厂方案确实值得参考！想确认两点：咱们用户群体和它一致吗？能不能先拿 10% 流量测一下 5 步和 2 步的数据？”"
          goodNote="亮点：给足尊重，同时把决策权交还给真实数据"
          goodCardSec={6.05}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边跟对方比资历、情绪硬刚，只会把讨论彻底搞僵；",
              startMs: 250,
              endMs: 5752,
              timestampMs: 3001,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先肯定参考价值，然后把焦点强行拉回场景匹配度和小流量验证，不卑不亢！",
              startMs: 6052,
              endMs: 12764,
              timestampMs: 9408,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={47 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP06"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“这个方案必须通过，因为这是经过我深思熟虑的最优解！”——踩了什么坑？"
          answer="答案：循环论证（同语反复）！“必须通过”和“最优解”都是在自吹自擂，没有提供任何外部数据或对比依据。"
          mantra="本集口诀：头衔不等于证据，对事永远别对人！"
          countdownStartSec={2.7}
          answerSec={5.9}
          mantraSec={10.97}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“必须通过，因为这是我深思熟虑的最优解”，缺了啥？",
              startMs: 250,
              endMs: 5505,
              timestampMs: 2877,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，这是原地打转的循环论证，拿结论给自己当理由！",
              startMs: 5905,
              endMs: 10571,
              timestampMs: 8238,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：头衔不等于证据，对事永远别对人！",
              startMs: 10971,
              endMs: 15092,
              timestampMs: 13031,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 挡箭牌现场配音"
          src={staticFile("audio/ep06-scene1.wav")}
          from={0}
          durationInFrames={386}
          volume={1}
        />
        <Audio
          name="02 三种挡箭牌配音"
          src={staticFile("audio/ep06-scene2.wav")}
          from={14 * fps}
          durationInFrames={547}
          volume={1}
        />
        <Audio
          name="03 破局对比配音"
          src={staticFile("audio/ep06-scene3.wav")}
          from={33 * fps}
          durationInFrames={385}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep06-scene4.wav")}
          from={47 * fps}
          durationInFrames={455}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 新人提问"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 前辈压人"
          src={staticFile("audio/ui-switch.wav")}
          from={4.35 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={7.88 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 权威卡片"
          src={staticFile("audio/ui-click.wav")}
          from={14.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 循环卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={15.8 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 破局总结"
          src={staticFile("audio/ui-ding.wav")}
          from={17.6 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 情绪硬刚"
          src={staticFile("audio/ui-switch.wav")}
          from={33.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 聚焦事实"
          src={staticFile("audio/ui-ding.wav")}
          from={39.05 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={49.7 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={50.7 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={51.7 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={52.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={57.97 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
