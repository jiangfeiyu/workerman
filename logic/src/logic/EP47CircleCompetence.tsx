import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneStrategy } from "./scenes/SceneStrategy";

export const EP47CircleCompetence: React.FC = () => {
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
      <Track name="EP47 Scenes">
        <SceneHook
          name="01 跨界盲目自信"
          durationInFrames={18 * fps}
          episodeLabel="EP47"
          sectionTitle="01 · 成功者幻觉"
          headline="在一个领域赚到钱，为什么去陌生领域跨界半年就赔光积蓄？"
          colleagueSender="跨界总监"
          colleagueRole="光环幻觉"
          colleagueMessage="我在大厂做流量都干到年薪百万了，开家线下实体连锁店那还不是降维打击？"
          bossSender="实体老兵"
          bossRole="泼盆冷水"
          bossReply="哥们，选址坪效、生鲜损耗、供应链偷料这些暗坑，和线上买量完全是两码事！"
          takeawayText="⚠ 清楚知道自己“不懂什么”，远比盲目自信更保命（能力圈边界）"
          secondBubbleSec={4.34}
          takeawaySec={9.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场高手最容易掉进的一个隐形大坑叫“成功者幻觉”：",
              startMs: 250,
              endMs: 4087,
              timestampMs: 2168,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "在自己领域刚拿到一点成绩，就顺手去跨界踩一个完全陌生的领域，",
              startMs: 4337,
              endMs: 9531,
              timestampMs: 6934,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果短短半年把老本行赚的钱全赔光！因为你早就跨出了自己的“能力圈边界”！",
              startMs: 9831,
              endMs: 16601,
              timestampMs: 13216,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneStrategy
          name="02 能力圈与边界守则"
          from={18 * fps}
          durationInFrames={37 * fps}
          episodeLabel="EP47"
          sectionTitle="02 · 能力圈边界感"
          accentColor="#FFCD75"
          title="圈子不用画得多大，保命的关键在于“看清边界线在哪里”"
          mode="circle-competence"
          item1Title="真懂的核心区"
          item1Body="不用听别人画饼，你自己就能顺手算出底价、看穿陷阱、说出前 3 个死法"
          item2Title="蒙眼跨界的盲区"
          item2Body="全靠听故事押宝、连行业暗语和损耗坑都没摸透，纯靠胆大往雷区硬冲"
          item3Title="请行家 / 小学费 / 跳过"
          item3Body="要么找圈内老手绑利益共担，要么用 5% 学费探底，不懂坚决绕路"
          item4Title="核心检验题"
          item4Body="能说出“怎么死”才算真懂"
          summaryCaption="在圈内下重注，在圈外只靠真专家合作或小额交学费"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "能力圈不讲究圈子画得多大，保命的关键在于看清里面、外面和边界线。",
              startMs: 250,
              endMs: 5580,
              timestampMs: 2915,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "圈内核心区是“你真懂的地方”：不用听别人画饼，你自己就能顺手算出底价、看穿陷阱、预判踩雷点；",
              startMs: 5830,
              endMs: 14214,
              timestampMs: 10022,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "圈外盲区则是“全靠听故事押宝”：连行业潜规则和失败案例都说不出两条，凭着感觉和胆大往里冲，等于蒙眼闯雷区；",
              startMs: 14464,
              endMs: 23889,
              timestampMs: 19176,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "高手面对圈外大机会绝不闭眼硬上，而是三条路选其一：要么请圈内真老手一起绑利益干，要么先用百分之五小学费摸透边界，要么干脆坦然跳过！",
              startMs: 24139,
              endMs: 35452,
              timestampMs: 29795,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 面对陌生机会对比"
          from={55 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP47"
          sectionTitle="03 · 盲目跨界 vs 借力探边界"
          title="承认“这里我不懂”不是丢人，拿真金白银当小白鼠才最贵"
          badLabel="✖ 拿老光环蒙眼硬上"
          badSubtitle="跨界盲目自信交巨额学费"
          badExample="“都是做生意大差不差嘛！先砸一百万把门店铺开，边干边学自然就会了！”"
          badNote="后果：用全部身家给陌生行业交第一波认知学费"
          goodLabel="✔ 找行家合伙或小步摸底"
          goodSubtitle="把盲区变成小额试探"
          goodExample="“线下供应链不在我圈内：要么找管过十家店的老手共担盈亏合伙，要么先租一个月快闪店探底！”"
          goodNote="亮点：绝不因为跨界踩翻老本行攒下的护城河"
          goodCardSec={6.71}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边凭着老本行自信闭眼盲冲，全是在拿真钱替别人交认知税；",
              startMs: 250,
              endMs: 6410,
              timestampMs: 3330,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边诚实承认“这里我不懂”，用“借真行家”或“极小代价试错”把边界线探明再出重手！",
              startMs: 6710,
              endMs: 13555,
              timestampMs: 10132,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={70 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP47"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="怎么用一句话一秒检验自己是不是真的懂一个新项目（在不在自己能力圈内）？"
          answer="答案：看你能不能脱口而出“这门生意最容易死在哪三个环节、同行前 3 个隐形坑是什么”！只会背暴富故事的全部在圈外！"
          mantra="本集口诀：懂行再下重注，不懂借力或绕路！"
          countdownStartSec={3.71}
          answerSec={6.71}
          mantraSec={14.21}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：用哪一个问题，能一秒检验你对新项目是不是真的“懂行在圈内”？",
              startMs: 250,
              endMs: 6314,
              timestampMs: 3282,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！光会背赚钱故事没用，能脱口而出“前三大隐形坑和死法”，才算真正摸到边界！",
              startMs: 6714,
              endMs: 13813,
              timestampMs: 10263,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：懂行再下重注，不懂借力或绕路！",
              startMs: 14213,
              endMs: 18263,
              timestampMs: 16238,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 跨界幻觉配音"
          src={staticFile("audio/ep47-scene1.wav")}
          from={0}
          durationInFrames={498}
          volume={1}
        />
        <Audio
          name="02 能力圈图解配音"
          src={staticFile("audio/ep47-scene2.wav")}
          from={18 * fps}
          durationInFrames={1064}
          volume={1}
        />
        <Audio
          name="03 陌生机会对比配音"
          src={staticFile("audio/ep47-scene3.wav")}
          from={55 * fps}
          durationInFrames={407}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep47-scene4.wav")}
          from={70 * fps}
          durationInFrames={548}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 跨界盲冲"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老兵冷水"
          src={staticFile("audio/ui-switch.wav")}
          from={4.34 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.83 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 圈内核心"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 圈外雷区"
          src={staticFile("audio/ui-click.wav")}
          from={20.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 边界守则"
          src={staticFile("audio/ui-ding.wav")}
          from={22.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲目硬上"
          src={staticFile("audio/ui-switch.wav")}
          from={55.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 借力探底"
          src={staticFile("audio/ui-ding.wav")}
          from={61.71 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={73.71 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={74.71 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={75.71 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={76.71 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={84.21 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
