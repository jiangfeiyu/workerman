import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEconomics } from "./scenes/SceneEconomics";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP39MoatShields: React.FC = () => {
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
      <Track name="EP39 Scenes">
        <SceneHook
          name="01 纸糊护城河现场"
          durationInFrames={16 * fps}
          episodeLabel="EP39"
          sectionTitle="01 · PPT 画饼壁垒"
          headline="“界面极简 ＋ 早发 2 个月 ＋ 首单立减”——这真的算护城河吗？"
          colleagueSender="产品经理"
          colleagueRole="盲目自信"
          colleagueMessage="老板放心！咱们比大厂早发整整两个月，UI 极简还给首单优惠，护城河稳得很！"
          bossSender="竞争对手"
          bossRole="两周反杀"
          bossReply="正好省得自己试错！下周全栈抄过去上线，补贴比你们还多五块钱！"
          takeawayText="⚠ 对手花两周或砸钱就能抹平的优势，统统只是“纸糊护城河”"
          secondBubbleSec={4.13}
          takeawaySec={9.04}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "评审会上最怕看见这种自欺欺人的“纸糊护城河”：",
              startMs: 250,
              endMs: 3884,
              timestampMs: 2067,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "把“界面好看、早发两个月、烧钱给优惠”当成竞争壁垒，",
              startMs: 4134,
              endMs: 8738,
              timestampMs: 6436,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果大厂两周抄完上线直接反杀！到底什么样的壁垒才真正抄不走？",
              startMs: 9038,
              endMs: 14801,
              timestampMs: 11919,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEconomics
          name="02 真假护城河盾牌"
          from={16 * fps}
          durationInFrames={37 * fps}
          episodeLabel="EP39"
          sectionTitle="02 · 三大真护城河"
          accentColor="#38B764"
          title="抄得走的功能不算墙！真正抗打的壁垒只有这 3 块铁盾牌"
          mode="moat-shields"
          item1Title="先发 / UI / 发补贴"
          item1Body="两周就被抄平，优惠一停用户全散，零防御力"
          item2Title="网络效应"
          item2Body="用的人越多产品越值钱，没人去冷清的新广场"
          item3Title="高迁移成本"
          item3Body="数据与团队协作全长在上面，换掉比忍着贵十倍"
          item4Title="规模供应链壁垒"
          item4Body="万家网点摊平进货与物流价，新对手打死拼不过"
          summaryCaption="真护城河会随时间越长越厚，假壁垒只会随补贴耗尽立刻倒塌"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "对手能用钱和两周加班抄走的东西，统统不算护城河！真正抗打的硬盾牌只有这三块。",
              startMs: 250,
              endMs: 7134,
              timestampMs: 3692,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一块看假壁垒：先发两个月、页面好看或砸钱发券，补贴一停用户全跑光，毫无防御力；",
              startMs: 7384,
              endMs: 14846,
              timestampMs: 11115,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二块叫网络效应：每多一个用户，老用户获得的匹配或价值就更高，没人愿意去冷清的新广场；",
              startMs: 15096,
              endMs: 22417,
              timestampMs: 18756,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三块叫高迁移成本：工作流、历史资产和上下游协作全锁在里面，换掉你比忍着你贵十倍；再叠加上真规模带来的极低采购成本，这才是谁也打不穿的铁桶壁垒！",
              startMs: 22667,
              endMs: 35842,
              timestampMs: 29254,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 建壁垒方式对比"
          from={53 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP39"
          sectionTitle="03 · 堆功能补贴 vs 建迁移网"
          title="从产品第一天起，就把资源砸向“别人抄不走的沉淀结构”"
          badLabel="✖ 拼功能卷补贴"
          badSubtitle="一抄即平的价格战"
          badExample="“赶紧再堆十个花哨小按钮、再加码拉新红包，用功能表把对手甩在身后！”"
          badNote="后果：陷入无止境的体力内卷，钱烧完用户立刻跳槽"
          goodLabel="✔ 打造网络与迁移沉淀"
          goodSubtitle="越用越离不开的粘性"
          goodExample="“把单机工具做成团队协作空间，让历史知识库与权限链长在里面，换产品代价极高。”"
          goodNote="亮点：把每一天时间沉淀成复利，对手补贴再多也挖不动"
          goodCardSec={5.94}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边整天在功能表和补贴上拼刺刀，干得越累壁垒越薄；",
              startMs: 250,
              endMs: 5635,
              timestampMs: 2942,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边从第一天就往网络效应和迁移成本里砸资源，把时间变成别人追不上的复利！",
              startMs: 5935,
              endMs: 11680,
              timestampMs: 8807,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={66 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP39"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="面对 3 万家店、自建全国冷链的奶茶巨头，新品牌只靠“产品好喝一点”能在同价位打赢它吗？"
          answer="答案：极难！配方几天就被复刻，但 3 万家门店摊平的规模集采与冷链供应链壁垒才是降维绝杀！"
          mantra="本集口诀：抄得走的叫功能，赶不走的才叫墙！"
          countdownStartSec={4.47}
          answerSec={7.47}
          mantraSec={14.35}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：三万家店自建供应链的奶茶巨头，新品牌只靠“好喝一点”能在同价位打赢吗？",
              startMs: 250,
              endMs: 7065,
              timestampMs: 3657,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！配方几天就能复刻，但规模集采和冷链物流壁垒才是真绝杀！",
              startMs: 7465,
              endMs: 13954,
              timestampMs: 10709,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：抄得走的叫功能，赶不走的才叫墙！",
              startMs: 14354,
              endMs: 18095,
              timestampMs: 16224,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 纸糊护城河配音"
          src={staticFile("audio/ep39-scene1.wav")}
          from={0}
          durationInFrames={444}
          volume={1}
        />
        <Audio
          name="02 护城河盾牌配音"
          src={staticFile("audio/ep39-scene2.wav")}
          from={16 * fps}
          durationInFrames={1076}
          volume={1}
        />
        <Audio
          name="03 建壁垒对比配音"
          src={staticFile("audio/ep39-scene3.wav")}
          from={53 * fps}
          durationInFrames={351}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep39-scene4.wav")}
          from={66 * fps}
          durationInFrames={543}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 产品盲目自信"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 对手抄走反杀"
          src={staticFile("audio/ui-switch.wav")}
          from={4.13 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.04 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 假壁垒"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 网络效应"
          src={staticFile("audio/ui-click.wav")}
          from={18.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 迁移成本"
          src={staticFile("audio/ui-click.wav")}
          from={20.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 规模铁桶"
          src={staticFile("audio/ui-ding.wav")}
          from={21.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 卷功能补贴"
          src={staticFile("audio/ui-switch.wav")}
          from={53.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 建迁移沉淀"
          src={staticFile("audio/ui-ding.wav")}
          from={58.94 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={70.47 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={71.47 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={72.47 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={73.47 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.35 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
