import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAgentFlow } from "./scenes/SceneAgentFlow";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP64HumanInLoop: React.FC = () => {
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
      <Track name="EP64 Scenes">
        <SceneHook
          name="01 全自动失控事故现场"
          durationInFrames={20 * fps}
          episodeLabel="EP64"
          sectionTitle="01 · 全系列终局篇"
          headline="把不可逆操作的钥匙交给全自动 AI，一秒失控能捅多大篓子？"
          colleagueSender="同事小刘"
          colleagueRole="盲目全无人化"
          colleagueMessage="老板，我设了个全自动营销 Agent，完全不用人管，连优惠券和全员邮件都能自己发！"
          bossSender="运营总监"
          bossRole="紧急告警"
          bossReply="刚收到告警，它把内部测试草稿当正式活动群发给了十万大客户，全网都在截图！"
          takeawayText="⚠ 效率越高，把“不可逆单向门”交给全自动的代价就越惨重"
          secondBubbleSec={4.26}
          takeawaySec={11.9}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "来到整套课程第六十四集——全系列终局篇！",
              startMs: 250,
              endMs: 4007,
              timestampMs: 2129,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "当 AI 越来越聪明、能直接调用外部工具时，最可怕的翻车叫做“把不可逆的钥匙交给了全自动”！",
              startMs: 4257,
              endMs: 11597,
              timestampMs: 7927,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "它一秒钟就能替你发十万封邮件、扣一万笔款——效率越高，一旦失控炸得越惨！",
              startMs: 11897,
              endMs: 18541,
              timestampMs: 15219,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAgentFlow
          name="02 人机防呆与最后一公里闸门"
          from={20 * fps}
          durationInFrames={35 * fps}
          episodeLabel="EP64"
          sectionTitle="02 · Human-in-the-loop"
          accentColor="#E43B44"
          title="人机协同权限矩阵：放开可逆自动化，卡死不可逆红灯门"
          mode="human-in-the-loop"
          item1Title="① AI 全自动狂奔"
          item1Body="内部草稿、检索摘要、数据清洗——零损失又可逆，100% 放手自动跑。"
          item2Title="② 灰度 + 熔断阈值"
          item2Body="5% 灰度试跑与工单流转——挂上异常自动停机开关，半自动监控。"
          item3Title="③ 人类审批硬卡点"
          item3Body="群发公告、资金划拨、改权限——AI 备好检查单，必须人亲自点确认！"
          item4Title="终极分工"
          item4Body="AI 负责把炮弹装填到最佳状态，最后扣下扳机并承担决策责任的人永远是你！"
          summaryCaption="九成苦活交给自动化，人类稳稳守住最后一公里红灯铁门"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "驾驭智能体时代的终极本事，是搭好“最后一公里”的人机权限闸门。",
              startMs: 250,
              endMs: 5331,
              timestampMs: 2791,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "绿灯区：低风险又可逆的内部动作，比如整理资料、写初稿、跑分析，放心让 AI 全自动狂奔；",
              startMs: 5581,
              endMs: 13706,
              timestampMs: 9644,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "黄灯区：半可逆的灰度动作，比如放百分之五流量测试，挂上自动熔断阈值；",
              startMs: 13956,
              endMs: 19972,
              timestampMs: 16964,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "红灯区：对外群发、动真金白银、删改核心数据的不可逆单向门，必须立起一道“人类审批硬卡点”！AI 负责把炮弹装填好，最后扣扳机担责的人，永远是你！",
              startMs: 20222,
              endMs: 33494,
              timestampMs: 26858,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 自动化边界对比"
          from={55 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP64"
          sectionTitle="03 · 人机防呆对比"
          title="不搞悬崖边全自动撒手，只守最后一公里红灯铁门"
          badLabel="✖ 盲目全自动撒手"
          badSubtitle="把生死开关交给概率"
          badExample="“只要接入工具就全链自动执行，连全网群发、发优惠券和改价都不设人工确认！”"
          badNote="问题：单向门一旦出错不可撤回，一秒酿成品牌与财务双重灾难"
          goodLabel="✔ 分级设闸人控终点"
          goodSubtitle="效率与安全双双拉满"
          goodExample="“L1/L2 起草与清洗全自动跑；涉及资金、外发与权限的 L3 动作，强制弹出人工双确认。”"
          goodNote="亮点：吃尽 90% AI 效率红利，同时守死 100% 业务安全底线"
          goodCardSec={6.87}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边追求百分百无人化，结果把公司的生死开关放在了概率随机的悬崖边；",
              startMs: 250,
              endMs: 6565,
              timestampMs: 3408,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把九成苦活累活全交给机器全自动，自己只稳稳守住最后一公里那扇红灯铁门，又快又绝对安全！",
              startMs: 6865,
              endMs: 15699,
              timestampMs: 11282,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 终局小测与全系列口诀"
          from={72 * fps}
          durationInFrames={24 * fps}
          episodeLabel="EP64"
          sectionTitle="04 · 终局自测 & 全系列总口诀"
          question="从 EP01 到 EP64 学完四季逻辑课，所有逻辑工具最底层的共同内核究竟是什么？"
          answer="答案：永远先看清边界与前提，分清事实与假设，再用可验证的结构和兜底机制，在不确定的世界里做高胜率决策！"
          mantra="全系列总口诀：草稿检索全自动，不可逆门人把关；四重逻辑护体走，职场决策永不慌！"
          countdownStartSec={3.24}
          answerSec={6.24}
          mantraSec={15.24}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "全系列终局一测：学完六十四集，所有逻辑工具最底层的共同内核是什么？",
              startMs: 250,
              endMs: 5841,
              timestampMs: 3046,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！永远先锁清前提与边界，分清事实和假设，再用结构和兜底机制在不确定的世界里做高胜率决策！",
              startMs: 6241,
              endMs: 14844,
              timestampMs: 10543,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住全系列总口诀：草稿检索全自动，不可逆门人把关；四重逻辑护体走，职场决策永不慌！",
              startMs: 15244,
              endMs: 22931,
              timestampMs: 19088,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 失控事故配音"
          src={staticFile("audio/ep64-scene1.wav")}
          from={0}
          durationInFrames={556}
          volume={1}
        />
        <Audio
          name="02 权限闸门配音"
          src={staticFile("audio/ep64-scene2.wav")}
          from={20 * fps}
          durationInFrames={1005}
          volume={1}
        />
        <Audio
          name="03 防呆对比配音"
          src={staticFile("audio/ep64-scene3.wav")}
          from={55 * fps}
          durationInFrames={471}
          volume={1}
        />
        <Audio
          name="04 终局口诀配音"
          src={staticFile("audio/ep64-scene4.wav")}
          from={72 * fps}
          durationInFrames={688}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 炫耀全自动"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 紧急告警"
          src={staticFile("audio/ui-switch.wav")}
          from={4.26 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.9 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 L1 绿灯区"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 L2 黄灯区"
          src={staticFile("audio/ui-click.wav")}
          from={22.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 L3 红灯硬卡点"
          src={staticFile("audio/ui-switch.wav")}
          from={25.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 终极分工"
          src={staticFile("audio/ui-ding.wav")}
          from={28.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 全自动对比"
          src={staticFile("audio/ui-switch.wav")}
          from={55.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 分级设闸对比"
          src={staticFile("audio/ui-ding.wav")}
          from={61.87 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={75.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={76.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={77.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={78.24 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 全系列总口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={87.24 * fps}
          durationInFrames={42}
          volume={0.35}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
