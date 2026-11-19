import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEconomics } from "./scenes/SceneEconomics";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP38CashFlow: React.FC = () => {
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
      <Track name="EP38 Scenes">
        <SceneHook
          name="01 喜报狂赚却断粮"
          durationInFrames={16 * fps}
          episodeLabel="EP38"
          sectionTitle="01 · 黑字倒闭现场"
          headline="刚签下千万级大单、财报暴赚，公司下月怎么发不出工资了？"
          colleagueSender="销售总监"
          colleagueRole="报喜利润"
          colleagueMessage="好消息！拿下千万级标杆大客户，咱们今年利润直接翻三倍，稳稳大赚！"
          bossSender="财务总监"
          bossRole="死守现金"
          bossReply="别开香槟！对方要 180 天账期，咱们得先垫付八百万发工资买原料，下月现金见底了！"
          takeawayText="⚠ 账面利润只是纸上数字，发工资和交货租全靠“现金活水”"
          secondBubbleSec={3.87}
          takeawaySec={10.16}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "商业世界里最魔幻的一种死法叫“黑字倒闭”：",
              startMs: 250,
              endMs: 3617,
              timestampMs: 1933,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "财报和喜报上明明写着狂赚几千万，结果第二天突然发不出工资关门大吉！",
              startMs: 3867,
              endMs: 9863,
              timestampMs: 6865,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "利润和现金明明都是钱，为什么会有这么致命的差别？",
              startMs: 10163,
              endMs: 14132,
              timestampMs: 12147,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEconomics
          name="02 现金流 vs 利润图解"
          from={16 * fps}
          durationInFrames={35 * fps}
          episodeLabel="EP38"
          sectionTitle="02 · 现金流 vs 账面利润"
          accentColor="#41A6F6"
          title="利润是肌肉分数，现金流才是每分钟必须吸到的氧气"
          mode="cash-vs-profit"
          item1Title="今天签单就计入“盈利”"
          item1Body="哪怕大客户半年后才付款，报表当月已经红火；可钱其实全躺在对方账上（应收白条）"
          item2Title="本月 10 号准时扣款"
          item2Body="发工资、付原料、交房租谁都不认“客户白条”，必须银行卡里的真现金立刻划出"
          item3Title="业务越火，需要替客户垫付的现金越大"
          item3Body="接满长账期大单，账面利润越高、银行卡里的氧气反而被抽干得越快，直接窒息破产"
          item4Title="账期比总额更要命"
          item4Body="必须用预付款覆盖垫资"
          summaryCaption="没有活钱兜底的长账期大单，接得越多死得越快"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把公司看成一个人：利润是体检单上的肌肉分数，现金流才是每分钟呼吸的氧气！",
              startMs: 250,
              endMs: 6909,
              timestampMs: 3579,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边看账面利润：今天签合同验收，哪怕对方半年后才打款，报表上今天就已经记成盈利，其实钱全躺在别人的口袋里；",
              startMs: 7159,
              endMs: 16623,
              timestampMs: 11891,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边看真实现金流：原料款、快递费、下月十号的员工工资，每一分都得立刻用卡里的活钱划出去；",
              startMs: 16873,
              endMs: 24627,
              timestampMs: 20750,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一旦业务越做越大、垫资和账期拉得太长，账面越红火，银行卡里的氧气反而被抽得越干，直接窒息倒下！",
              startMs: 24877,
              endMs: 33674,
              timestampMs: 29275,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 接单条款对比"
          from={51 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP38"
          sectionTitle="03 · 盲签总额 vs 锁死回款"
          title="签大合同别光盯着总额欢呼，先把“何时到账”写死在合同里"
          badLabel="✖ 只看总额盲签垫资"
          badSubtitle="自己掏钱替甲方垫背"
          badExample="“大客户名头响，180 天账期就签吧！先垫资干活，能把今年营收撑起来就行！”"
          badNote="后果：越接大单现金流越干涸，遇到一次延期付款当场断裂"
          goodLabel="✔ 预付款 ＋ 节点回款"
          goodSubtitle="拿客户的钱滚着干活"
          goodExample="“总价可以让两个点，但签约必须先付 30% 预付款、阶段验收立刻结清 50%，覆盖原料和工资。”"
          goodNote="亮点：用正向现金周期保护团队安全，干完利润真进兜"
          goodCardSec={6.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边被“千万总额”冲昏头脑，拿自己的真现金替大甲方免费垫资；",
              startMs: 250,
              endMs: 6532,
              timestampMs: 3391,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边在谈价格的同时死守预付款和回款节点，用活钱覆盖账期，利润才能稳稳落进口袋！",
              startMs: 6832,
              endMs: 14152,
              timestampMs: 10492,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={67 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP38"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="一家公司利润率只有 3%，但客户全部现付全款，而给上游供应商却压了 90 天账期。它容易缺现金吗？"
          answer="答案：根本不缺！先收钱后付款形成“负现金周转周期”，规模越大手里躺着的免费活钱反而越多！"
          mantra="本集口诀：利润只是纸面分，现金才是救命水！"
          countdownStartSec={5.0}
          answerSec={8.0}
          mantraSec={13.93}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：利润率才百分之三，但客户现付全款、对上游延后九十天结算，公司会缺钱吗？",
              startMs: 250,
              endMs: 7603,
              timestampMs: 3926,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！先收钱后付款，手里的现金流充沛得很，越转活钱越多！",
              startMs: 8003,
              endMs: 13530,
              timestampMs: 10766,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：利润只是纸面分，现金才是救命水！",
              startMs: 13930,
              endMs: 18115,
              timestampMs: 16022,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 黑字倒闭配音"
          src={staticFile("audio/ep38-scene1.wav")}
          from={0}
          durationInFrames={424}
          volume={1}
        />
        <Audio
          name="02 现金流量图配音"
          src={staticFile("audio/ep38-scene2.wav")}
          from={16 * fps}
          durationInFrames={1011}
          volume={1}
        />
        <Audio
          name="03 接单对比配音"
          src={staticFile("audio/ep38-scene3.wav")}
          from={51 * fps}
          durationInFrames={425}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep38-scene4.wav")}
          from={67 * fps}
          durationInFrames={544}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 销售签单"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 财务预警"
          src={staticFile("audio/ui-switch.wav")}
          from={3.87 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.16 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 账面利润"
          src={staticFile("audio/ui-switch.wav")}
          from={16.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 真现金流"
          src={staticFile("audio/ui-click.wav")}
          from={18.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 断血警告"
          src={staticFile("audio/ui-ding.wav")}
          from={20.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲签总额"
          src={staticFile("audio/ui-switch.wav")}
          from={51.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 锁死预付"
          src={staticFile("audio/ui-ding.wav")}
          from={57.83 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={72 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={73 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={74 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={75 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.93 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
