import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAILogic } from "./scenes/SceneAILogic";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP31RedBlueTeam: React.FC = () => {
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
      <Track name="EP31 Scenes">
        <SceneHook
          name="01 夸夸群误事现场"
          durationInFrames={19 * fps}
          episodeLabel="EP31"
          sectionTitle="01 · AI 夸夸群陷阱"
          headline="AI 狂夸你的方案“逻辑严密”，为什么一进评审会还是被问倒？"
          colleagueSender="同事小孙"
          colleagueRole="沉迷夸夸群"
          colleagueMessage="我刚让 AI 评价我的新方案，它狂夸我“视野宏大、结构严密”，上会肯定稳了！"
          bossSender="评审会老板"
          bossRole="连环灵魂发问"
          bossReply="预算超了三倍，客诉赔付谁兜底？一线还要多点五次按钮，怎么落地？"
          takeawayText="⚠ 别让 AI 只当讨好型夸夸群，要用它当魔鬼考官提前排雷"
          secondBubbleSec={5.03}
          takeawaySec={10.56}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "拿 AI 审方案最致命的坑，就是只听它当“夸夸群”！",
              startMs: 250,
              endMs: 4776,
              timestampMs: 2513,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "默认状态下，AI 为了讨好你，动不动就夸你“视野宏大、结构清晰”；",
              startMs: 5026,
              endMs: 10262,
              timestampMs: 7644,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可一进真实评审会，老板、法务、一线轮番连环发问，分分钟把你问懵在台上！",
              startMs: 10562,
              endMs: 17453,
              timestampMs: 14008,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAILogic
          name="02 红蓝对抗模式"
          from={19 * fps}
          durationInFrames={33 * fps}
          episodeLabel="EP31"
          sectionTitle="02 · 红蓝对抗模式"
          accentColor="#F77622"
          title="启动 AI 红蓝对抗：提前在电脑前演练十遍图尔敏反驳预判"
          mode="red-blue-team"
          item1Title="提交方案草案"
          item1Body="把立项、报价或改版思路作为蓝方靶子，先不求好听，只求抗打。"
          item2Title="红方 1 · 挑刺老板/财务"
          item2Body="“回本周期太长！砍掉一半预算还能怎么验证？”"
          item3Title="红方 2 · 严谨法务/一线"
          item3Body="“隐私赔付谁扛？增加 5 个操作步骤，销售根本不愿意用！”"
          item4Title="打好补丁再上会"
          item4Body="针对 Top 3 致命漏洞，提前备好数据证据、降级开关与折中方案。"
          summaryCaption="把会议室里的明枪暗箭，提前交给红方 AI 在电脑前轰一遍"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "真正把方案磨到防弹，靠的是让 AI 启动“红蓝对抗模式”。",
              startMs: 250,
              endMs: 4983,
              timestampMs: 2617,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "蓝方先交出草案，接着命令 AI 切换红方角色，别客气、往死里挑刺：",
              startMs: 5233,
              endMs: 11568,
              timestampMs: 8401,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一号红方扮挑刺老板，追问预算和回本周期；二号红方扮严谨法务，死抠合规与赔付；三号红方扮一线员工，专门拆穿落地有多麻烦！",
              startMs: 11818,
              endMs: 22858,
              timestampMs: 17338,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "红方炸出三条致命伤后，蓝方立刻打补丁、备预案！会议室里的明枪暗箭，提前在电脑前演练十遍！",
              startMs: 23108,
              endMs: 31342,
              timestampMs: 27225,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 审方案前后对比"
          from={52 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP31"
          sectionTitle="03 · 方案打磨对比"
          title="不要华丽的文字外衣，要经得起连环追问的硬补丁"
          badLabel="✖ 只让 AI 润色吹捧"
          badSubtitle="漏洞穿华丽外衣"
          badExample="“请帮我润色这份方案，让它听起来更高级、更有战略感、更有说服力。”"
          badNote="问题：逻辑漏洞一个没修，上会被老板三句话一捅就破"
          goodLabel="✔ 红方三连击演练"
          goodSubtitle="图尔敏反驳预判"
          goodExample="“请分饰反对本案的财务、法务和一线主管，各自列出 2 个最致命驳回理由，不要客气。”"
          goodNote="亮点：提前排完所有反驳雷区，老板刚张嘴你就把预案递过去了"
          goodCardSec={6.17}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边只是给漏洞穿上一件高大上的文字外衣，上会一捅就破；",
              startMs: 250,
              endMs: 5867,
              timestampMs: 3059,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把图尔敏反驳预判交给红方 AI 狂轰滥炸，真正进会议室时，老板刚张嘴你就把预案递过去了！",
              startMs: 6167,
              endMs: 14072,
              timestampMs: 10120,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={67 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP31"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="用红蓝对抗挖出 5 个隐患后，正式汇报时应该把这 5 个漏洞全部摊在第一页讲吗？"
          answer="答案：不要！正文坚持结论先行只讲主方案，把 Top 2 核心漏洞的应对预案放进风险页或备用答疑，稳重又不自乱阵脚。"
          mantra="本集口诀：别让 AI 夸你好，切红方视角往死挑；漏洞提前打补丁，上会永远稳接招！"
          countdownStartSec={3.04}
          answerSec={6.04}
          mantraSec={14.24}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：红蓝对抗挖出五个隐患，上会时该全摆在第一页吗？",
              startMs: 250,
              endMs: 5637,
              timestampMs: 2944,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "错！别自乱阵脚！核心观点放前面，把关键预案稳稳藏进风险页和备用答疑里！",
              startMs: 6037,
              endMs: 13842,
              timestampMs: 9940,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别让 AI 夸你好，切红方视角往死挑；漏洞提前打补丁，上会永远稳接招！",
              startMs: 14242,
              endMs: 21965,
              timestampMs: 18104,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 夸夸群现场配音"
          src={staticFile("audio/ep31-scene1.wav")}
          from={0}
          durationInFrames={524}
          volume={1}
        />
        <Audio
          name="02 红蓝对抗配音"
          src={staticFile("audio/ep31-scene2.wav")}
          from={19 * fps}
          durationInFrames={940}
          volume={1}
        />
        <Audio
          name="03 审方案对比配音"
          src={staticFile("audio/ep31-scene3.wav")}
          from={52 * fps}
          durationInFrames={422}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep31-scene4.wav")}
          from={67 * fps}
          durationInFrames={659}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 夸夸群自信"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板连环问"
          src={staticFile("audio/ui-switch.wav")}
          from={5.03 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.56 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 蓝方草案"
          src={staticFile("audio/ui-click.wav")}
          from={19.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 红方老板"
          src={staticFile("audio/ui-switch.wav")}
          from={21.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 红方法务一线"
          src={staticFile("audio/ui-switch.wav")}
          from={24.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 蓝方防弹补丁"
          src={staticFile("audio/ui-ding.wav")}
          from={27.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 润色对比"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 红蓝演练对比"
          src={staticFile("audio/ui-ding.wav")}
          from={58.17 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={70.04 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={71.04 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={72.04 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={73.04 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={81.24 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
