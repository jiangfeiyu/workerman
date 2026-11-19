import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneCrisis } from "./scenes/SceneCrisis";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP53Abilene: React.FC = () => {
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
      <Track name="EP53 Scenes">
        <SceneHook
          name="01 集体违心鼓掌现场"
          durationInFrames={20 * fps}
          episodeLabel="EP53"
          sectionTitle="01 · 阿比林悖论"
          headline="会前人人吐槽，会上全票通过——集体是如何手拉手掉坑的？"
          colleagueSender="部门主管"
          colleagueRole="默认一致"
          colleagueMessage="这个周末跨界嘉年华方案，大家没意见就全票通过、下周立刻推进吧！"
          bossSender="参会全员"
          bossRole="内心OS"
          bossReply="其实预算肯定超、客户也不买账……算了别人都点头，我可不当出头鸟！"
          takeawayText="⚠ 没人愿意当异类，结果十个人凑出了一场谁都不想要的大翻车"
          secondBubbleSec={5.53}
          takeawaySec={12.96}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场开会最魔幻的一幕，叫“会前人人吐槽，会上全票通过”！",
              startMs: 250,
              endMs: 5275,
              timestampMs: 2763,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "散会后项目果然做黄，大家一聊才发现：原来当初现场十个人，有九个心里都在打鼓！",
              startMs: 5525,
              endMs: 12658,
              timestampMs: 9092,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "明明每个人都不看好，怎么就凑出了一场集体踩坑？因为你们中了“阿比林悖论”！",
              startMs: 12958,
              endMs: 18454,
              timestampMs: 15706,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCrisis
          name="02 群体迷思与破冰机制"
          from={20 * fps}
          durationInFrames={29 * fps}
          episodeLabel="EP53"
          sectionTitle="02 · 群体迷思破冰"
          accentColor="#E43B44"
          title="打破阿比林悖论：先匿名写雷区，再指定合法反方"
          mode="abilene-groupthink"
          item1Title="① 怕当异类咽回顾虑"
          item1Body="领导定调后，为了表面合群没人敢第一个唱反调"
          item2Title="② 沉默误读为全员赞成"
          item2Body="看见别人没说话，人人都误以为“只有我一个人担心”"
          item3Title="③ 先匿名写底线打分"
          item3Body="讨论前每人独立写下 1~10 分信心值与最大担忧点"
          item4Title="④ 指定合法魔鬼代言人"
          item4Body="轮流指派专职红方挑刺，让质疑变成职责而非针对人"
          summaryCaption="莫把沉默当赞成，用制度把唱反调变成合法保护色"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看懂“阿比林悖论”和“群体迷思”，只要盯住这三个环。",
              startMs: 250,
              endMs: 3939,
              timestampMs: 2095,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一环是“怕当异类”：老板一开口定调，大家为了合群纷纷把顾虑咽回肚子；",
              startMs: 4189,
              endMs: 9652,
              timestampMs: 6921,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二环是“沉默等于同意”：每个人看见别人没反对，反而以为“全组都觉得很稳”；",
              startMs: 9902,
              endMs: 15220,
              timestampMs: 12561,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "破局只能靠改规则：讨论前先匿名写下最担忧的雷区，再指定一位“合法魔鬼代言人”专职挑刺！把唱反调变成制度职责，虚假一致立刻瓦解！",
              startMs: 15470,
              endMs: 27737,
              timestampMs: 21604,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 会议决策对比"
          from={49 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP53"
          sectionTitle="03 · 会议表决对比"
          title="少用“没人反对就通过”，多用制度保住真话"
          badLabel="✖ 直接举手表决"
          badSubtitle="捂出虚假一致定时弹"
          badExample="“觉得方案不错的请点头，没人反对咱们今天就这么定下来了！”"
          badNote="问题：十个人的真实顾虑全咽回肚子里，执行期一起爆雷"
          goodLabel="✔ 匿名打分 + 指定反方"
          goodSubtitle="制度保护合法挑刺"
          goodExample="“先匿名写 1 个最大风险；再由小李专职当红方挑刺 5 分钟，挑完再投票。”"
          goodNote="亮点：不用背心理包袱就能把暗雷排光，会后执行一条心"
          goodCardSec={7.53}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边用“没人反对就通过”看似高效，其实是把十个人的真实担忧全捂成了定时炸弹；",
              startMs: 250,
              endMs: 7225,
              timestampMs: 3738,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边靠先匿名写风险再指定合法反方，让大家不用背心理包袱就能把真话倒出来！",
              startMs: 7525,
              endMs: 13598,
              timestampMs: 10562,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={64 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP53"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="团队开会总是 5 分钟全票鼓掌通过、从不争论，这说明团队极高效还是危险信号？"
          answer="答案：极度危险信号！健康的逻辑讨论必然伴随充分质疑；从没分歧的表决，往往说明全员已经放弃思考与担责！"
          mantra="本集口诀：莫把沉默当赞成，先匿名再设反方，合法挑刺保平安！"
          countdownStartSec={4.35}
          answerSec={7.35}
          mantraSec={15.67}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：团队开会总是五分钟全票鼓掌、从不争论，是高效还是危险信号？",
              startMs: 250,
              endMs: 6949,
              timestampMs: 3600,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！极度危险！全员不说话往往不是完全赞同，而是没人愿意为真实风险背锅！",
              startMs: 7349,
              endMs: 15266,
              timestampMs: 11308,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：莫把沉默当赞成，先匿名再设反方，合法挑刺保平安！",
              startMs: 15666,
              endMs: 21819,
              timestampMs: 18743,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 阿比林现场配音"
          src={staticFile("audio/ep53-scene1.wav")}
          from={0}
          durationInFrames={554}
          volume={1}
        />
        <Audio
          name="02 群体迷思配音"
          src={staticFile("audio/ep53-scene2.wav")}
          from={20 * fps}
          durationInFrames={832}
          volume={1}
        />
        <Audio
          name="03 表决对比配音"
          src={staticFile("audio/ep53-scene3.wav")}
          from={49 * fps}
          durationInFrames={408}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep53-scene4.wav")}
          from={64 * fps}
          durationInFrames={655}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 主管拍板"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 全员内心OS"
          src={staticFile("audio/ui-switch.wav")}
          from={5.53 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.96 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 环1 怕当异类"
          src={staticFile("audio/ui-switch.wav")}
          from={20.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 环2 误读沉默"
          src={staticFile("audio/ui-switch.wav")}
          from={22.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 破局1 匿名写"
          src={staticFile("audio/ui-click.wav")}
          from={25.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 破局2 合法反方"
          src={staticFile("audio/ui-ding.wav")}
          from={28.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 举手对比"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 制度对比"
          src={staticFile("audio/ui-ding.wav")}
          from={56.53 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={68.35 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={69.35 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={70.35 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={71.35 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={79.67 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
