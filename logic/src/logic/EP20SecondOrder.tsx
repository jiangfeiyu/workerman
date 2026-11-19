import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDecision } from "./scenes/SceneDecision";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP20SecondOrder: React.FC = () => {
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
      <Track name="EP20 Scenes">
        <SceneHook
          name="01 一阶补贴翻车"
          durationInFrames={15 * fps}
          episodeLabel="EP20"
          sectionTitle="01 · 短视策略现场"
          headline="“发大额无门槛券当天订单暴涨 60%！”——3 个月后却崩了"
          colleagueSender="运营同学"
          colleagueRole="冲量方案"
          colleagueMessage="下周发一波大额无门槛满减券！我测算过当天订单至少能暴涨 60%！"
          bossSender="战略负责人"
          bossRole="二阶追问"
          bossReply="当天的确好看，但有没有想过：停发券之后用户还愿意原价买吗？"
          takeawayText="⚠ 只看第一步眼前收益，往往会埋下第 2、3 步的反噬地雷"
          secondBubbleSec={5.47}
          takeawaySec={9.82}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场里最容易拍手叫好、过两个月却全员背锅的决策，长这样：",
              startMs: 250,
              endMs: 5224,
              timestampMs: 2737,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "发一波大额无门槛优惠券，当天订单暴涨百分之六十，",
              startMs: 5474,
              endMs: 9517,
              timestampMs: 7495,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可为什么三个月后，不发券就没人下单、利润彻底崩了？",
              startMs: 9817,
              endMs: 14222,
              timestampMs: 12019,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneDecision
          name="02 二阶连锁反应"
          from={15 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP20"
          sectionTitle="02 · 二阶思维推演"
          accentColor="#F77622"
          title="高手比普通人多想两步：不仅看动作，更看“群体反应”"
          mode="second-order"
          block1Title="当周订单暴涨 60%"
          block1Body="发无门槛大券后，短期 GMV 与拉新报表极度亮眼，全员鼓掌。"
          block2Title="羊毛党入场 + 老客等券"
          block2Body="大家摸透了发券规律，正常老客学会“不打折绝不原价下单”。"
          block3Title="停券即崩 + 利润穿底"
          block3Body="一旦停止补贴，自然复购率跌穿地板，毛利率被彻底打废。"
          summaryCaption="好规则要扛得住“大家适应它之后的反作用力”"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "因为只看“第一步收益”，叫一阶思维；真正的高手都在用“二阶思维”。",
              startMs: 250,
              endMs: 5480,
              timestampMs: 2865,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一阶效应很美：发券当周，新客和订单确实齐刷刷暴涨；",
              startMs: 5730,
              endMs: 10831,
              timestampMs: 8280,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "但二阶反应紧跟着就来了：羊毛党闻风涌入，正常老客也学会了“等打折才买”；",
              startMs: 11081,
              endMs: 17119,
              timestampMs: 14100,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "到第三阶，一旦停止补贴，复购率直接跌穿地板，得不偿失！",
              startMs: 17369,
              endMs: 22508,
              timestampMs: 19938,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 策略设计对比"
          from={38 * fps}
          durationInFrames={14 * fps}
          episodeLabel="EP20"
          sectionTitle="03 · 策略设计前后对比"
          title="提前堵住“等券”的二阶漏洞，短期冲量与长期都稳"
          badLabel="✖ 一阶撒钱冲量"
          badSubtitle="透支未来利润"
          badExample="“发全场 5 折无门槛通用券，快速冲刺本月 GMV 考核指标！”"
          badNote="问题：把正价客户洗成折扣敏感客，停券后业务断崖下跌"
          goodLabel="✔ 二阶隔离设计"
          goodSubtitle="锁死补贴边界"
          goodExample="“券只限【首次下单或流失召回客】使用，并绑定复购阶梯满减，既拉增量又不破坏原价心智。”"
          goodNote="亮点：拿新客增量不伤老客原价心智，长期健康增长"
          goodCardSec={6.21}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边为了本月冲量无脑撒钱，把未来半年的利润全透支光了；",
              startMs: 250,
              endMs: 5912,
              timestampMs: 3081,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边提前推演出老客“等券心理”，把补贴锁进“新客与召回”笼子里，短期冲量、长期也稳！",
              startMs: 6212,
              endMs: 13443,
              timestampMs: 9827,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={52 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP20"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“按代码行数给程序员发绩效奖金！”——一阶看像是鼓励多干活，二阶会发生什么？"
          answer="答案：大家为了拿奖金会把 10 行逻辑拆成 100 行废话，甚至复制粘贴制造垃圾屎山代码，系统彻底无法维护！"
          mantra="本集口诀：先想第一步收益，再问一句“然后呢”！"
          countdownStartSec={3.2}
          answerSec={6.5}
          mantraSec={12.26}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：按代码行数发奖金，看似鼓励多干活，二阶会发生什么？",
              startMs: 250,
              endMs: 6097,
              timestampMs: 3173,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "没错！大家会疯狂写废话代码凑行数，系统变成维护噩梦！",
              startMs: 6497,
              endMs: 11861,
              timestampMs: 9179,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：先想第一步收益，再问一句“然后呢”！",
              startMs: 12261,
              endMs: 16403,
              timestampMs: 14332,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 一阶翻车配音"
          src={staticFile("audio/ep20-scene1.wav")}
          from={0}
          durationInFrames={429}
          volume={1}
        />
        <Audio
          name="02 二阶推演配音"
          src={staticFile("audio/ep20-scene2.wav")}
          from={15 * fps}
          durationInFrames={677}
          volume={1}
        />
        <Audio
          name="03 策略对比配音"
          src={staticFile("audio/ep20-scene3.wav")}
          from={38 * fps}
          durationInFrames={405}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep20-scene4.wav")}
          from={52 * fps}
          durationInFrames={494}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运营冲量"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 战略追问"
          src={staticFile("audio/ui-switch.wav")}
          from={5.47 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.82 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 一阶卡片"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 二阶卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={17.3 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 三阶反噬"
          src={staticFile("audio/ui-ding.wav")}
          from={19.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 一阶撒钱"
          src={staticFile("audio/ui-switch.wav")}
          from={38.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 二阶隔离"
          src={staticFile("audio/ui-ding.wav")}
          from={44.21 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={55.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={56.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={57.2 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={58.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={64.26 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
