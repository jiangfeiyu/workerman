import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneFallacy } from "./scenes/SceneFallacy";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP05FallacyStrawman: React.FC = () => {
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
      <Track name="EP05 Scenes">
        <SceneHook
          name="01 诡辩现场"
          durationInFrames={15 * fps}
          episodeLabel="EP05"
          sectionTitle="01 · 评审会诡辩现场"
          headline="“你提砍一个边缘需求，是不是根本不想让项目成功？”"
          colleagueSender="研发小周"
          colleagueRole="理性建议"
          colleagueMessage="这期时间太紧，建议把低频营销弹窗先延后到二期，保主流程稳定上线。"
          bossSender="需求方"
          bossRole="极限上纲"
          bossReply="你不做弹窗就是不重视转化！照这样砍下去，页面没人用，项目肯定黄！"
          takeawayText="⚠ 你的原话被歪曲成假靶子，又被硬推了一串不存在的滑坡"
          secondBubbleSec={4.07}
          takeawaySec={10.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "评审会提一句“时间不够，建议先砍一个边缘弹窗”，",
              startMs: 250,
              endMs: 3821,
              timestampMs: 2035,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对方却回你：“你连转化都不管了？照这么砍项目肯定黄！”",
              startMs: 4071,
              endMs: 9895,
              timestampMs: 6983,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "别急着自证清白，你刚中了两个经典的职场诡辩套路。",
              startMs: 10195,
              endMs: 14466,
              timestampMs: 12330,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneFallacy
          name="02 稻草人+滑坡图解"
          from={15 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP05"
          sectionTitle="02 · 谬误透视镜"
          accentColor="#F77622"
          title="稻草人 + 滑坡谬误：先歪曲你的话，再用极端后果吓唬你"
          mode="strawman-slippery"
          leftTitle="原话：一期先暂缓低频弹窗"
          leftDetail="假靶子：你根本不管用户转化！"
          rightTitle="砍一个低频弹窗"
          rightDetail="项目肯定黄了！"
          summaryCaption="核心破局：扶正原话靶子，用客观数据切断无依据滑坡"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "第一招叫稻草人谬误：他把你的“暂缓弹窗”，歪曲成“不顾项目转化”，",
              startMs: 250,
              endMs: 5321,
              timestampMs: 2785,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "竖起一个极端的稻草人靶子，然后狠狠一脚踹翻。",
              startMs: 5571,
              endMs: 9058,
              timestampMs: 7314,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二招叫滑坡谬误：砍个小功能就必然导致项目黄掉？中间的多米诺骨牌根本不成立！",
              startMs: 9358,
              endMs: 16459,
              timestampMs: 12908,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 反制话术对比"
          from={32 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP05"
          sectionTitle="03 · 优雅反制前后对比"
          title="不要顺着对方自证清白，两步把话题拉回正轨"
          badLabel="✖ 被带偏自证"
          badSubtitle="陷入假靶子陷阱"
          badExample="“我没有不重视转化啊，我平时加班也很努力的，只是开发真来不及嘛…”"
          badNote="问题：一旦忙着证明自己态度好，你就默认接受了对方的歪曲"
          goodLabel="✔ 扶正+截断"
          goodSubtitle="重申原话+用数据说话"
          goodExample="“先澄清：我支持保转化，我建议的是【一期延后低频弹窗】以保主流程准时上线；转化影响我们上线看 A/B 数据。”"
          goodNote="亮点：瞬间拆穿稻草人，并用可控实验切断滑坡链条"
          goodCardSec={5.63}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看应对对比：左边一旦开始解释“我没有不重视”，你就掉进对方的靶子里了；",
              startMs: 250,
              endMs: 5334,
              timestampMs: 2792,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边直接两步反制：先把靶子扶正，重申真实立场，再用客观数据切断滑坡！",
              startMs: 5634,
              endMs: 12575,
              timestampMs: 9104,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={45 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP05"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“今天允许你迟到 10 分钟，明天全公司都会迟到，最后团队散架！”——踩了什么谬误？"
          answer="答案：滑坡谬误！把偶发的小概率事件直接推演到“团队散架”，中间缺少必然因果链条和制度兜底。"
          mantra="本集口诀：靶子歪了先扶正，莫名滑坡喊停步！"
          countdownStartSec={2.8}
          answerSec={6.06}
          mantraSec={11.84}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“今天迟到十分钟，明天公司就散架”，属于什么谬误？",
              startMs: 250,
              endMs: 5665,
              timestampMs: 2957,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对，这就是典型的滑坡谬误，把极端小概率当成了必然结果。",
              startMs: 6065,
              endMs: 11437,
              timestampMs: 8751,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：靶子歪了先扶正，莫名滑坡喊停步！",
              startMs: 11837,
              endMs: 15861,
              timestampMs: 13849,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 诡辩现场配音"
          src={staticFile("audio/ep05-scene1.wav")}
          from={0}
          durationInFrames={436}
          volume={1}
        />
        <Audio
          name="02 谬误图解配音"
          src={staticFile("audio/ep05-scene2.wav")}
          from={15 * fps}
          durationInFrames={496}
          volume={1}
        />
        <Audio
          name="03 反制对比配音"
          src={staticFile("audio/ep05-scene3.wav")}
          from={32 * fps}
          durationInFrames={380}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep05-scene4.wav")}
          from={45 * fps}
          durationInFrames={478}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 研发气泡"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 需求上纲"
          src={staticFile("audio/ui-switch.wav")}
          from={4.07 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.2 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 稻草人卡片"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 滑坡骨牌"
          src={staticFile("audio/ui-switch.wav")}
          from={16.8 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 破局总结"
          src={staticFile("audio/ui-ding.wav")}
          from={18.6 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 被带偏写法"
          src={staticFile("audio/ui-switch.wav")}
          from={32.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 反制写法"
          src={staticFile("audio/ui-ding.wav")}
          from={37.63 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={47.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={48.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={49.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={51.06 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={56.84 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
