import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneExperiment } from "./scenes/SceneExperiment";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP52OccamFalsify: React.FC = () => {
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
      <Track name="EP52 Scenes">
        <SceneHook
          name="01 算命式复盘现场"
          durationInFrames={18 * fps}
          episodeLabel="EP52"
          sectionTitle="01 · 算命式复盘"
          headline="为什么“涨了跌了都能圆回来”的复盘，在科学上全是废话？"
          colleagueSender="策划小周"
          colleagueRole="正反都赢"
          colleagueMessage="这期如果销量涨了，说明视觉抓人；如果跌了，说明用户还在适应期、品牌心智已埋下啦！"
          bossSender="老板"
          bossRole="抓出漏洞"
          bossReply="听起来好有道理……可等一下，照你这么说，不管涨还是跌，你永远是对的？"
          takeawayText="⚠ 永远不会出错的预测，恰恰是最没价值的伪命题"
          secondBubbleSec={4.74}
          takeawaySec={11.37}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "复盘会上最让老板头疼的一类发言，叫“算命式复盘”！",
              startMs: 250,
              endMs: 4494,
              timestampMs: 2372,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "涨了归功于创意绝佳，跌了归因于“用户还在心智教育期”，横竖都能给你圆成大功一件！",
              startMs: 4744,
              endMs: 11065,
              timestampMs: 7905,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "在科学逻辑里，永远不会出错的废话，恰恰是最没价值的伪命题！",
              startMs: 11365,
              endMs: 16403,
              timestampMs: 13884,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneExperiment
          name="02 可证伪性与奥卡姆剃刀"
          from={18 * fps}
          durationInFrames={29 * fps}
          episodeLabel="EP52"
          sectionTitle="02 · 两把科学剪刀"
          accentColor="#38B764"
          title="可证伪性 + 奥卡姆剃刀：踢掉玄学废话与复杂阴谋论"
          mode="occam-falsify"
          item1Title="① 可证伪性（Falsifiability）"
          item1Body="下判断前先立军令状：写死“出现什么数据就证明我错了”，不敢赌反面全是空话。"
          item2Title="② 奥卡姆剃刀（Occam's Razor）"
          item2Body="如无必要勿增实体：出故障先查假设最少的直接原因，莫先编十环阴谋论。"
          item3Title="排障黄金顺序"
          item3Body="先测下单链接、优惠券开关与报错日志，90% 大事故都是 1 个低级开关写反了！"
          item4Title=""
          item4Body=""
          summaryCaption="敢说怎样算我错才叫真预测，先砍多余脑补才抓得住真 Bug"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把复盘和排障拉回科学轨道，全靠这两把硬核剪刀。",
              startMs: 250,
              endMs: 4758,
              timestampMs: 2504,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一把叫“可证伪性”：下任何判断前，必须提前写死“什么数据出现就认错”，不敢赌反面的预测全是空话；",
              startMs: 5008,
              endMs: 12986,
              timestampMs: 8997,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二把叫“奥卡姆剃刀”：出问题别急着编十环阴谋论，先砍掉多余脑补，直奔假设最少、最简单那个直接原因；",
              startMs: 13236,
              endMs: 21610,
              timestampMs: 17423,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "先查开关配置和接口报错，再聊行业大势，排错效率直接翻十倍！",
              startMs: 21860,
              endMs: 27026,
              timestampMs: 24443,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 复盘与排障对比"
          from={47 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP52"
          sectionTitle="03 · 复盘排障对比"
          title="少留“永远正确”的后门，多用剃刀先查最简单原因"
          badLabel="✖ 玄学圆场 + 复杂脑补"
          badSubtitle="正反不亏，查不到真因"
          badExample="“零成交估计是竞品爬虫叠加天气太热；等下月用户心智教育完再看吧！”"
          badNote="问题：既不承认失败标准，又不去点一下报错的下单按钮"
          goodLabel="✔ 可证伪 + 奥卡姆先查"
          goodSubtitle="定清认错线，直奔直接原因"
          goodExample="“若 3 天转化低于 2% 即判定改版失败回滚；当前零成交优先排查支付回调与库存开关。”"
          goodNote="亮点：军令状清晰，10 分钟内立刻定位是优惠券冲突导致无法下单"
          goodCardSec={6.94}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把错误全推给外部玄学，还给自己留了永远立于不败之地的后门；",
              startMs: 250,
              endMs: 6640,
              timestampMs: 3445,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边提前立好认错军令状，排查问题先拿剃刀砍掉花哨假设，一刀扎进最直接的漏洞里！",
              startMs: 6940,
              endMs: 14535,
              timestampMs: 10738,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={63 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP52"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“留存涨了说明产品牛，跌了说明洗掉了低质量羊毛党”，这句话缺了什么？"
          answer="答案：缺可证伪性！正反话都让你说尽了，如果不预先划定健康留存底线，产品做烂了也能自我安慰！"
          mantra="本集口诀：敢说怎样算我错，才叫真判断；排错先拿剃刀剪，莫信复杂阴谋论！"
          countdownStartSec={4.64}
          answerSec={7.64}
          mantraSec={14.47}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“留存涨了说明产品牛，跌了说明洗掉了羊毛党”，这句话致命硬伤是啥？",
              startMs: 250,
              endMs: 7235,
              timestampMs: 3743,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！缺可证伪性！正反话都让你说尽了，根本没法指导下一步改不改版！",
              startMs: 7635,
              endMs: 14074,
              timestampMs: 10855,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：敢说怎样算我错，才叫真判断；排错先拿剃刀剪，莫信复杂阴谋论！",
              startMs: 14474,
              endMs: 21690,
              timestampMs: 18082,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 算命复盘配音"
          src={staticFile("audio/ep52-scene1.wav")}
          from={0}
          durationInFrames={492}
          volume={1}
        />
        <Audio
          name="02 两把剪刀配音"
          src={staticFile("audio/ep52-scene2.wav")}
          from={18 * fps}
          durationInFrames={811}
          volume={1}
        />
        <Audio
          name="03 排障对比配音"
          src={staticFile("audio/ep52-scene3.wav")}
          from={47 * fps}
          durationInFrames={436}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep52-scene4.wav")}
          from={63 * fps}
          durationInFrames={651}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 算命发言"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板反问"
          src={staticFile("audio/ui-switch.wav")}
          from={4.74 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.37 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 剪刀1 可证伪"
          src={staticFile("audio/ui-click.wav")}
          from={18.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 剪刀2 奥卡姆剃刀"
          src={staticFile("audio/ui-click.wav")}
          from={20.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 排障黄金顺序"
          src={staticFile("audio/ui-ding.wav")}
          from={23.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 玄学对比"
          src={staticFile("audio/ui-switch.wav")}
          from={47.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 科学排障对比"
          src={staticFile("audio/ui-ding.wav")}
          from={53.94 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={67.64 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={68.64 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={69.64 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={70.64 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={77.47 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
