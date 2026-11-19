import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDecision } from "./scenes/SceneDecision";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP18IssueTree: React.FC = () => {
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
      <Track name="EP18 Scenes">
        <SceneHook
          name="01 乱查翻车现场"
          durationInFrames={15 * fps}
          episodeLabel="EP18"
          sectionTitle="01 · 无头苍蝇查错"
          headline="“本周订单暴跌 30%！”——别急着拉所有人开会，先画树"
          colleagueSender="老板"
          colleagueRole="紧急追查"
          colleagueMessage="本周成交订单跌了 30%，到底怎么回事？下午两点前给我结论！"
          bossSender="运营小陈"
          bossRole="手忙脚乱"
          bossReply="我这就去问投放、找设计查主图、再让客服导三百条工单…"
          takeawayText="⚠ 靠穷举挨个问一圈，浪费一上午还抓不到真凶"
          secondBubbleSec={3.87}
          takeawaySec={9.07}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "老板一句“本周订单跌了百分之三十，查清楚”，",
              startMs: 250,
              endMs: 3620,
              timestampMs: 1935,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "很多人立刻像无头苍蝇一样，问完投放问设计、查完客服查文案，",
              startMs: 3870,
              endMs: 8769,
              timestampMs: 6319,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "忙了一整天还没摸到门！真正的高手是怎么十分钟破案的？",
              startMs: 9069,
              endMs: 13730,
              timestampMs: 11399,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneDecision
          name="02 问题树剪枝图"
          from={15 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP18"
          sectionTitle="02 · 问题树 + 假设剪枝"
          accentColor="#38B764"
          title="用公式切出问题树，直接剪掉正常枝，10 分钟锁定异常"
          mode="issue-tree"
          block1Title="总订单跌 30%"
          block1Body="订单 = 流量 × 转化率 × 客单价"
          block2Title="日活流量：-1%（基本持平）"
          block2Body="客单价：+2%（正常波动）"
          block3Title="结账转化率"
          block3Body="定位：安卓端支付按钮兼容报错！"
          summaryCaption="先画 MECE 问题树保底，再拿假设一刀剪掉无关分支"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "高手只做两步：先画问题树，再做假设剪枝。",
              startMs: 250,
              endMs: 4301,
              timestampMs: 2275,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步用公式把“订单”切一刀：订单等于流量、乘以转化率、再乘以客单价，不重不漏；",
              startMs: 4551,
              endMs: 11142,
              timestampMs: 7846,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步先扫一眼大盘数据：流量和客单价根本没动，只有转化率跌了三成！",
              startMs: 11392,
              endMs: 17286,
              timestampMs: 14339,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "果断剪掉另外两枝，顺着“转化率”深挖下去，立刻发现支付按钮在安卓端报错了！",
              startMs: 17536,
              endMs: 23844,
              timestampMs: 20690,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 排查效率对比"
          from={40 * fps}
          durationInFrames={12 * fps}
          episodeLabel="EP18"
          sectionTitle="03 · 查错效率前后对比"
          title="从拉十个人开会两小时，到 10 分钟精准抓出元凶"
          badLabel="✖ 撒网式排查"
          badSubtitle="无头苍蝇碰运气"
          badExample="“把所有部门拉进群，从广告渠道、视觉文案、价格策略到售后逐一复盘一遍…”"
          badNote="问题：同时查十几条线，浪费全员时间还容易被杂音带偏"
          goodLabel="✔ 问题树+剪枝"
          goodSubtitle="只验证最可疑一枝"
          goodExample="“拆解流量/转化/客单价；确认流量平稳，仅支付转化率跌 28%，10 分钟锁定安卓支付弹窗报错。”"
          goodNote="亮点：逻辑严密、直奔病灶、汇报时老板一眼信服"
          goodCardSec={5.34}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边把全公司拉进群开会排查，浪费十个人一下午；",
              startMs: 250,
              endMs: 5042,
              timestampMs: 2646,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边先算公式切出问题树，直接剪掉正常分支，十分钟精准抓住元凶！",
              startMs: 5342,
              endMs: 11345,
              timestampMs: 8343,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={52 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP18"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="老客户复购率没跌，但总营收掉了 20%。顺着问题树，最该先查“新客拉新”还是“老客留存”？"
          answer="答案：优先查新客拉新！老客复购稳定，说明存量池没出事，直接剪掉老客分支，深挖新客数量或首单转化。"
          mantra="本集口诀：先画问题树不漏项，再找异常枝一刀剪！"
          countdownStartSec={3.5}
          answerSec={6.8}
          mantraSec={11.87}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：老客复购没跌，总营收却掉了两成，先查新客还是查老客？",
              startMs: 250,
              endMs: 6401,
              timestampMs: 3325,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！优先查新客拉新，直接剪掉已经稳定的老客分支！",
              startMs: 6801,
              endMs: 11465,
              timestampMs: 9133,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先画问题树不漏项，再找异常枝一刀剪！",
              startMs: 11865,
              endMs: 16186,
              timestampMs: 14025,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 乱查现场配音"
          src={staticFile("audio/ep18-scene1.wav")}
          from={0}
          durationInFrames={414}
          volume={1}
        />
        <Audio
          name="02 问题树配音"
          src={staticFile("audio/ep18-scene2.wav")}
          from={15 * fps}
          durationInFrames={717}
          volume={1}
        />
        <Audio
          name="03 效率对比配音"
          src={staticFile("audio/ep18-scene3.wav")}
          from={40 * fps}
          durationInFrames={342}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep18-scene4.wav")}
          from={52 * fps}
          durationInFrames={488}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 老板追查"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 运营乱查"
          src={staticFile("audio/ui-switch.wav")}
          from={3.87 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.07 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 根节点"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 分支展开"
          src={staticFile("audio/ui-switch.wav")}
          from={17.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 剪枝总结"
          src={staticFile("audio/ui-ding.wav")}
          from={19.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 撒网排查"
          src={staticFile("audio/ui-switch.wav")}
          from={40.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 问题树剪枝"
          src={staticFile("audio/ui-ding.wav")}
          from={45.34 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={55.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={56.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={57.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={58.8 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={63.87 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
