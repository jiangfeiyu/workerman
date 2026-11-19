import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneTrendModel } from "./scenes/SceneTrendModel";

export const EP58CriticalMass: React.FC = () => {
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
      <Track name="EP58 Scenes">
        <SceneHook
          name="01 撒胡椒面冷场现场"
          durationInFrames={19 * fps}
          episodeLabel="EP58"
          sectionTitle="01 · 撒胡椒面翻车"
          headline="预算铺满 30 个城市，为什么烧了 50 万还是一单没起来？"
          colleagueSender="运营经理"
          colleagueRole="摊薄预算"
          colleagueMessage="同城闲置平台在 30 个城市全铺了推广，花了 50 万怎么一单都没转起来？"
          bossSender="增长顾问"
          bossRole="密度诊断"
          bossReply="每座城才分几百人，五公里内搜不到三件商品，用户打开一次就彻底卸载了！"
          takeawayText="⚠ 没突破 100°C 相变沸点的推广，冒不出一丁点网络蒸汽"
          secondBubbleSec={5.56}
          takeawaySec={12.3}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "很多双边平台或新社群，不是模式不行，而是死在“撒胡椒面”上！",
              startMs: 250,
              endMs: 5307,
              timestampMs: 2779,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "预算分给三十个城市，每座城看起来都有点水花，结果三个月后全军覆没！",
              startMs: 5557,
              endMs: 12001,
              timestampMs: 8779,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为在网络世界里，不够沸点的推广，其实连一滴蒸汽都冒不出来！",
              startMs: 12301,
              endMs: 17060,
              timestampMs: 14681,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneTrendModel
          name="02 临界质量与 100 度相变"
          from={19 * fps}
          durationInFrames={33 * fps}
          episodeLabel="EP58"
          sectionTitle="02 · 临界质量与相变"
          accentColor="#F77622"
          title="相变阈值法则：收缩战线集中一点，烧穿 100°C 沸点"
          mode="critical-mass"
          item1Title="① 预算摊薄到 30 城"
          item1Body="每座城只有 20% 稀疏密度，买家找不到卖家、卖家等不到单，全线死水"
          item2Title="② 全砸进 1 个大学城/商圈"
          item2Body="把 30 万弹药集中轰进单点区域，五公里内秒匹配，口碑正反馈立刻沸腾"
          item3Title="③ 单点复制法则"
          item3Body="站稳一个沸腾根据地，再把同等高密度打法一格一格复制到下一个区域！"
          item4Title=""
          item4Body=""
          summaryCaption="烧水不到 100°C 永远是温水，集中密度打穿沸点才能自循环"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "物理里有一条铁律叫“相变阈值”：水烧到九十九度，依然只是一锅热水；非得突破一百度，才会彻底沸腾。",
              startMs: 250,
              endMs: 8082,
              timestampMs: 4166,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "商业和社群同样存在“临界质量”：你把预算摊薄到三十个区，每个区只烧到二十度，冷得像冰水；",
              startMs: 8332,
              endMs: 16214,
              timestampMs: 12273,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "破局的唯一打法，是把全部资源狠狠砸进一个单点区域，比如先啃下两栋写字楼或一个大学城！",
              startMs: 16464,
              endMs: 24458,
              timestampMs: 20461,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只要局部密度冲破一百度临界点，供需自己就转起来了，再来一格一格复制引爆全城！",
              startMs: 24708,
              endMs: 31536,
              timestampMs: 28122,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 冷启动打法对比"
          from={52 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP58"
          sectionTitle="03 · 冷启动推广对比"
          title="与其 30 城各烧 20°C，不如 1 个点砸穿 100°C"
          badLabel="✖ 全网撒胡椒面"
          badSubtitle="全线低于临界质量"
          badExample="“30 万预算平铺全国 30 个城市，每座城试水 1 万，看看哪里运气好能火。”"
          badNote="问题：30 座城全在沸点以下，钱烧光了一单自循环都没跑出来"
          goodLabel="✔ 单点烧穿 100°C"
          goodSubtitle="打穿局部高密度沸点"
          goodExample="“30 万全砸进 1 个核心商圈，把匹配率冲到 90%，烧沸腾后再复制下一城。”"
          goodNote="亮点：先做成一个自转样板间，后续复制自带势能与口碑"
          goodCardSec={8.24}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边看似四处开花最稳妥，实际上三十万全泼在了九十度以下的温水里，连个响都听不见；",
              startMs: 250,
              endMs: 7940,
              timestampMs: 4095,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边敢于收缩战线，拿全部弹药先烧开一壶水，站稳一个根据地再去攻下一座城！",
              startMs: 8240,
              endMs: 14741,
              timestampMs: 11491,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP58"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="公司建“读书打卡群”，直接拉 500 人发红包，和先找 15 个真爱粉建小群，哪个更容易活？"
          answer="答案：15 人高密度小群！500 人大群里 98% 在潜水，三天变成冷场广告群；15 个高活跃骨干密度极高，讨论直接沸腾！"
          mantra="本集口诀：烧水不到一百度，满锅永远冒不出气；收缩战线攻一点，打穿密度才沸腾！"
          countdownStartSec={3.39}
          answerSec={6.39}
          mantraSec={14.57}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：建读书群，是直接拉五百人发红包，还是先拉十五个真爱粉？",
              startMs: 250,
              endMs: 5992,
              timestampMs: 3121,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！十五人高密度小群！五百人里四百九十个都在潜水，三天就变广告死群！",
              startMs: 6392,
              endMs: 14166,
              timestampMs: 10279,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：烧水不到一百度，满锅永远冒不出气；收缩战线攻一点，打穿密度才沸腾！",
              startMs: 14566,
              endMs: 21668,
              timestampMs: 18117,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 撒胡椒面配音"
          src={staticFile("audio/ep58-scene1.wav")}
          from={0}
          durationInFrames={512}
          volume={1}
        />
        <Audio
          name="02 临界质量配音"
          src={staticFile("audio/ep58-scene2.wav")}
          from={19 * fps}
          durationInFrames={946}
          volume={1}
        />
        <Audio
          name="03 冷启动对比配音"
          src={staticFile("audio/ep58-scene3.wav")}
          from={52 * fps}
          durationInFrames={442}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep58-scene4.wav")}
          from={68 * fps}
          durationInFrames={650}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 撒钱疑惑"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 密度诊断"
          src={staticFile("audio/ui-switch.wav")}
          from={5.56 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={12.3 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 稀疏冷水"
          src={staticFile("audio/ui-switch.wav")}
          from={19.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 集中烧沸100度"
          src={staticFile("audio/ui-ding.wav")}
          from={21.7 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="02 单点复制"
          src={staticFile("audio/ui-click.wav")}
          from={24.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="03 撒胡椒面对比"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 单点沸腾对比"
          src={staticFile("audio/ui-ding.wav")}
          from={60.24 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={71.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={72.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={73.39 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={74.39 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={82.57 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
