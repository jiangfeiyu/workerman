import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneSystemLoop } from "./scenes/SceneSystemLoop";

export const EP33Loops: React.FC = () => {
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
      <Track name="EP33 Scenes">
        <SceneHook
          name="01 砸钱失灵现场"
          durationInFrames={16 * fps}
          episodeLabel="EP33"
          sectionTitle="01 · 增长撞墙现场"
          headline="预算翻了 5 倍、总业绩却纹丝不动——飞轮怎么失灵了？"
          colleagueSender="增长同学"
          colleagueRole="猛踩油门"
          colleagueMessage="老板，上月投十万广告效果炸裂，这月预算翻了五倍，转化怎么一动不动啊？"
          bossSender="客服主管"
          bossRole="手刹拉死"
          bossReply="因为新用户进来没人教怎么用，工单排了三千条，老用户都被卡退订了！"
          takeawayText="⚠ 增长撞墙往往不是油门不够，而是撞上了暗处的“调节刹车”"
          secondBubbleSec={2.83}
          takeawaySec={8.44}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "做业务最崩溃的一幕莫过于此：",
              startMs: 250,
              endMs: 2582,
              timestampMs: 1416,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "上个月买量翻倍狂飙，这个月把预算加到五倍，总业绩居然一动不动！",
              startMs: 2832,
              endMs: 8141,
              timestampMs: 5486,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么同一套成功打法突然失灵？因为你只看见了加油的飞轮，没看见暗处的刹车！",
              startMs: 8441,
              endMs: 14706,
              timestampMs: 11573,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneSystemLoop
          name="02 增强与调节回路"
          from={16 * fps}
          durationInFrames={30 * fps}
          episodeLabel="EP33"
          sectionTitle="02 · 增强回路 vs 调节回路"
          accentColor="#38B764"
          title="系统里永远藏着两套环：加速雪球（R）与上限刹车（B）"
          mode="reinforcing-balancing"
          item1Title="好口碑带新客，雪球越滚越大"
          item1Body="投放拉新 ➔ 好口碑发酵 ➔ 带来更多自然推荐（正反馈飞轮越转越快）"
          item2Title="初期顺风顺水"
          item2Body="每投 1 块钱都能撬动复利增长"
          item3Title="过载触发隐形天花板"
          item3Body="规模一扩大 ➔ 客服排队、引导断层、体验下降 ➔ 老客流失抵消新增"
          item4Title="先解开交付与体验瓶颈"
          item4Body="拆掉手刹再推飞轮，增长曲线立刻重回上升"
          summaryCaption="一边拉手刹一边猛踩油门，只会白白烧空预算"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "任何业务系统里，都藏着增强和调节这两套循环。",
              startMs: 250,
              endMs: 4054,
              timestampMs: 2152,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边叫增强回路：好口碑带新客，新客再晒好评价，越转越快像滚雪球；",
              startMs: 4304,
              endMs: 10840,
              timestampMs: 7572,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可只要雪球一滚大，右边的调节回路必然启动：客服排队、服务器变卡、履约跟不上，逼着老客悄悄流失；",
              startMs: 11090,
              endMs: 19674,
              timestampMs: 15382,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "撞到天花板后还死磕买量，就像一边踩油门一边拉手刹！先解开交付瓶颈这个刹车，飞轮才能继续飞！",
              startMs: 19924,
              endMs: 28032,
              timestampMs: 23978,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 增长策略对比"
          from={46 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP33"
          sectionTitle="03 · 死磕油门 vs 先松手刹"
          title="撞上上限天花板时，少烧一半广告费反而留存翻倍"
          badLabel="✖ 盲目加倍买量"
          badSubtitle="在漏水桶里灌水"
          badExample="“转化卡住了？肯定声量不够！下月推广预算再翻倍冲上去！”"
          badNote="问题：进多少人漏多少人，白烧大笔获客费还惹来满屏差评"
          goodLabel="✔ 先修调节刹车"
          goodSubtitle="打通卡点再放量"
          goodExample="“注册暴涨但次留卡死在引导环节！先停一半投放，两周把新手体验修顺，再继续放大飞轮。”"
          goodNote="亮点：堵住木桶底洞，一半预算跑出双倍净留存"
          goodCardSec={6.0}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边在刹车拉死的情况下猛砸预算，全在填漏水的木桶；",
              startMs: 250,
              endMs: 5695,
              timestampMs: 2972,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先找出限制上限的调节回路把漏洞堵上，花原来一半的推广费，净留存反而翻倍！",
              startMs: 5995,
              endMs: 13052,
              timestampMs: 9523,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={61 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP33"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="网红餐厅每天排队 2 小时，老板为冲销量又发了“半价代金券”，为什么月度口碑和复购反而暴跌？"
          answer="答案：后厨出餐速度早就撞上调节回路上限！发券只会让排队更长、菜品变糙，加速触发负向口碑雪球。"
          mantra="本集口诀：撞墙先别猛踩油，先找暗处刹车手！"
          countdownStartSec={3.46}
          answerSec={6.46}
          mantraSec={12.6}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：餐厅都排队两小时了，再发半价大促券为什么反而拉垮复购？",
              startMs: 250,
              endMs: 6059,
              timestampMs: 3154,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！后厨出餐早就卡在调节上限了，硬拉客流只会让体验崩盘！",
              startMs: 6459,
              endMs: 12203,
              timestampMs: 9331,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：撞墙先别猛踩油，先找暗处刹车手！",
              startMs: 12603,
              endMs: 16729,
              timestampMs: 14666,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 砸钱失灵配音"
          src={staticFile("audio/ep33-scene1.wav")}
          from={0}
          durationInFrames={442}
          volume={1}
        />
        <Audio
          name="02 双回路图解配音"
          src={staticFile("audio/ep33-scene2.wav")}
          from={16 * fps}
          durationInFrames={841}
          volume={1}
        />
        <Audio
          name="03 增长对比配音"
          src={staticFile("audio/ep33-scene3.wav")}
          from={46 * fps}
          durationInFrames={392}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep33-scene4.wav")}
          from={61 * fps}
          durationInFrames={502}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 增长加预算"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 客服爆单"
          src={staticFile("audio/ui-switch.wav")}
          from={2.83 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={8.44 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 增强回路"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 调节刹车"
          src={staticFile("audio/ui-ding.wav")}
          from={18.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲目买量"
          src={staticFile("audio/ui-switch.wav")}
          from={46.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 先松手刹"
          src={staticFile("audio/ui-ding.wav")}
          from={52 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={64.46 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={65.46 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={66.46 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={67.46 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={73.6 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
