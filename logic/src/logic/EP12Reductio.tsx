import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneReasoning } from "./scenes/SceneReasoning";

export const EP12Reductio: React.FC = () => {
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
      <Track name="EP12 Scenes">
        <SceneHook
          name="01 离谱需求现场"
          durationInFrames={17 * fps}
          episodeLabel="EP12"
          sectionTitle="01 · 不伤和气反驳现场"
          headline="“把首页 8 个按钮全加上红点角标！”——怎么说才不吵架？"
          colleagueSender="需求方"
          colleagueRole="强势提需求"
          colleagueMessage="为了防止用户漏看，我们要把首页这 8 个入口全加上小红点和闪烁角标！"
          bossSender="设计师"
          bossRole="冷静思考"
          bossReply="（全加角标就等于全没重点…但直接怼太丑肯定变成审美吵架！）"
          takeawayText="⚠ 正面批评审美只会让对方死扛，顺着逻辑推一步让他自己喊停"
          secondBubbleSec={6.46}
          takeawaySec={11.68}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "开会遇到离谱需求：对方非要把首页八个按钮全加上小红点和闪烁角标。",
              startMs: 250,
              endMs: 6211,
              timestampMs: 3230,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "如果你直接怼“这样太丑太土了”，马上变成审美吵架，谁也不服谁！",
              startMs: 6461,
              endMs: 11383,
              timestampMs: 8922,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "有没有一种方法，不撕破脸，还能让对方自己喊停？",
              startMs: 11683,
              endMs: 15665,
              timestampMs: 13674,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneReasoning
          name="02 归谬法三步图解"
          from={17 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP12"
          sectionTitle="02 · 归谬法（反证法）"
          accentColor="#A77BCA"
          title="归谬法三步走：不硬怼，顺着推一步让矛盾自己浮现"
          mode="reductio"
          item1Title="“加红点就能抢注意力”"
          item1Body="先礼貌认同对方的前提，不跟对方在立场和情绪上正面冲突。"
          item2Title="“干脆 10 个按钮全闪起来”"
          item2Body="顺着同一条规则往极限推进，看看沿着这个前提会走到哪。"
          item3Title="“全是重点 = 没有重点！”"
          item3Body="得出连对方也无法接受的荒谬结果，原假设自然站不住脚。"
          summaryCaption="不用批评对方不懂行，荒谬的结论会自动帮你说服他"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这就要用逻辑学最优雅的武器：归谬法。",
              startMs: 250,
              endMs: 3300,
              timestampMs: 1775,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步：先笑眯眯地假设对方的逻辑成立，“加红点就能抢注意力”；",
              startMs: 3550,
              endMs: 8656,
              timestampMs: 6103,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步：顺着往极限推一步，“那干脆十个按钮全闪起来”；",
              startMs: 8906,
              endMs: 13359,
              timestampMs: 11132,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步：荒谬结果自己浮出来了，“全都是重点，就等于一个重点都没有！”",
              startMs: 13609,
              endMs: 18819,
              timestampMs: 16214,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 反驳话术对比"
          from={37 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP12"
          sectionTitle="03 · 反驳前后对比"
          title="把“我反对你”变成“我们一起看这个推论合不合理”"
          badLabel="✖ 正面硬怼"
          badSubtitle="触发防御心态"
          badExample="“你这需求太乱了！全加红点用户根本看不懂，显得太土太低端！”"
          badNote="问题：否定对方专业度，对方为了面子只能死扛到底"
          goodLabel="✔ 归谬引导"
          goodSubtitle="顺推一步见矛盾"
          goodExample="“按‘加红点能突出重点’这个思路，如果 8 个入口全加红点，每个都一样抢眼，那用户第一眼该点哪一个呢？”"
          goodNote="亮点：给足台阶，对方会主动退回“只留 1 个核心红点”"
          goodCardSec={6.08}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边直接批评对方不懂设计，对方为了面子反而死扛到底；",
              startMs: 250,
              endMs: 5781,
              timestampMs: 3015,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边顺着他的好意往后推一步，把矛盾摆到台面上，对方自己就会说：“那还是只留一个核心红点吧！”",
              startMs: 6081,
              endMs: 13728,
              timestampMs: 9904,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={52 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP12"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“只要代码不报错，系统就绝对稳定。”——它等价的逆否命题怎么说？"
          answer="答案：“如果系统不稳定，说明代码肯定有报错！”——一听就知道太绝对（如内存泄漏/外部超时未必报错），一照即破！"
          mantra="本集口诀：反驳别急着硬怼，顺推一步见真章！"
          countdownStartSec={3.4}
          answerSec={6.62}
          mantraSec={13.73}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“只要代码不报错，系统就绝对稳定”，等价的逆否命题怎么说？",
              startMs: 250,
              endMs: 6224,
              timestampMs: 3237,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对：“如果系统不稳定，代码就一定报错”。反过来一照就知道这大话有多离谱！",
              startMs: 6624,
              endMs: 13327,
              timestampMs: 9975,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：反驳别急着硬怼，顺推一步见真章！",
              startMs: 13727,
              endMs: 17745,
              timestampMs: 15736,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 需求现场配音"
          src={staticFile("audio/ep12-scene1.wav")}
          from={0}
          durationInFrames={472}
          volume={1}
        />
        <Audio
          name="02 归谬三步配音"
          src={staticFile("audio/ep12-scene2.wav")}
          from={17 * fps}
          durationInFrames={567}
          volume={1}
        />
        <Audio
          name="03 反驳对比配音"
          src={staticFile("audio/ep12-scene3.wav")}
          from={37 * fps}
          durationInFrames={414}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep12-scene4.wav")}
          from={52 * fps}
          durationInFrames={535}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 需求发言"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 设计师思考"
          src={staticFile("audio/ui-switch.wav")}
          from={6.46 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.68 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 归谬Step1"
          src={staticFile("audio/ui-click.wav")}
          from={17.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 归谬Step2"
          src={staticFile("audio/ui-switch.wav")}
          from={19.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 归谬Step3"
          src={staticFile("audio/ui-ding.wav")}
          from={21.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 正面硬怼"
          src={staticFile("audio/ui-switch.wav")}
          from={37.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 归谬引导"
          src={staticFile("audio/ui-ding.wav")}
          from={43.08 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={55.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={56.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={57.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={58.62 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={65.73 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
