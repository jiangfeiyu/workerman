import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneReasoning } from "./scenes/SceneReasoning";

export const EP10ValidSound: React.FC = () => {
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
      <Track name="EP10 Scenes">
        <SceneHook
          name="01 方案被否现场"
          durationInFrames={13 * fps}
          episodeLabel="EP10"
          sectionTitle="01 · 纸上谈兵现场"
          headline="“我数学算得严丝合缝，为什么业务方还是一口否决？”"
          colleagueSender="策划小陈"
          colleagueRole="信心满满"
          colleagueMessage="我算过账了！每天多弹 3 次活动弹窗，按现在的 5% 转化率，成交额直接翻 3 倍！"
          bossSender="业务总监"
          bossRole="泼冷水"
          bossReply="账是算得挺顺，可你弹窗弹 3 次，用户早烦得直接卸载 App 了！"
          takeawayText="⚠ 推理过程没错，但你的初始前提一碰现实就碎"
          secondBubbleSec={5.31}
          takeawaySec={9.4}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "为什么你写了一份自认为“严丝合缝”的方案，业务方却一口否决？",
              startMs: 250,
              endMs: 5060,
              timestampMs: 2655,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你算得很有道理：多弹三次窗，转化就能翻三倍，",
              startMs: 5310,
              endMs: 9096,
              timestampMs: 7203,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可对方一句“用户早关 App 了”，直接把你问哑巴！",
              startMs: 9396,
              endMs: 12511,
              timestampMs: 10953,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneReasoning
          name="02 两把锁图解"
          from={13 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP10"
          sectionTitle="02 · 有效 vs 真实"
          accentColor="#41A6F6"
          title="好方案必须同时打开两把锁：结构有效 + 事实真实"
          mode="two-locks"
          item1Title="推理链条没有漏洞"
          item1Body="如果“每次转化率保持 5%”为真，那么乘以 3 倍弹窗确实等于 3 倍成交（结构自洽）"
          item2Title="前提本身必须符合现实"
          item2Body="现实中弹窗越多用户越反感，转化率会暴跌，“保持 5%”这个前提本身是假的！"
          item3Title=""
          item3Body=""
          summaryCaption="只开结构锁、没开事实锁 = 纸上谈兵；双锁齐开才算过关"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "因为一个让人买账的论证，必须同时打开两把锁。",
              startMs: 250,
              endMs: 3576,
              timestampMs: 1913,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一把叫“结构锁（有效）”：前提如果成立，结论就必须推得出来；",
              startMs: 3826,
              endMs: 8978,
              timestampMs: 6402,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二把叫“事实锁（真实）”：你的初始前提本身，必须经得起现实检验！",
              startMs: 9228,
              endMs: 14592,
              timestampMs: 11910,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "只开了结构锁、没开事实锁，在职场里就是“纸上谈兵”。",
              startMs: 14842,
              endMs: 19613,
              timestampMs: 17227,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 方案验证对比"
          from={33 * fps}
          durationInFrames={13 * fps}
          episodeLabel="EP10"
          sectionTitle="03 · 提案前后对比"
          title="用小灰度先把前提验证成真，方案自然过会"
          badLabel="✖ 理想化硬推"
          badSubtitle="只算公式不管现实"
          badExample="“日活 × 弹窗次数 × 5% = GMV 翻倍，公式和逻辑完全自洽！”"
          badNote="问题：默认用户不会反感、转化率不衰减，前提脱离业务"
          goodLabel="✔ 双锁齐开"
          goodSubtitle="小步验证前提为真"
          goodExample="“先用 5% 流量灰度测‘加 1 次弹窗后的衰减率与次留’，验证前提成立后再评估全量 ROI。”"
          goodNote="亮点：主动替老板堵住前提风险，结构严密且接地气"
          goodCardSec={5.83}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿着理想化的静态公式硬推，前提一碰现实就碎；",
              startMs: 250,
              endMs: 5530,
              timestampMs: 2890,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把前提里的风险先拿小灰度实测一遍，结构对、前提真，两把锁一起打开！",
              startMs: 5830,
              endMs: 11978,
              timestampMs: 8904,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={46 * fps}
          durationInFrames={18 * fps}
          episodeLabel="EP10"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“所有名校生写代码都零 Bug，小李是名校生，所以小李写代码零 Bug。”——推理有效吗？真实吗？"
          answer="答案：结构有效（三段论格式完全正确），但大前提“写代码零 Bug”在现实中是假的，所以整个论证不真实！"
          mantra="本集口诀：推理对叫有效，前提真才靠谱，双锁齐开才拍板！"
          countdownStartSec={3.4}
          answerSec={6.79}
          mantraSec={12.25}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：大前提“所有名校生写代码零 Bug”，推导出小李零 Bug，这推理对吗？",
              startMs: 250,
              endMs: 6392,
              timestampMs: 3321,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结构完全有效，但大前提违背常识，所以结论不真实！",
              startMs: 6792,
              endMs: 11849,
              timestampMs: 9320,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：推理对叫有效，前提真才靠谱，双锁齐开才拍板！",
              startMs: 12249,
              endMs: 17385,
              timestampMs: 14817,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 方案被否配音"
          src={staticFile("audio/ep10-scene1.wav")}
          from={0}
          durationInFrames={377}
          volume={1}
        />
        <Audio
          name="02 两把锁配音"
          src={staticFile("audio/ep10-scene2.wav")}
          from={13 * fps}
          durationInFrames={590}
          volume={1}
        />
        <Audio
          name="03 提案对比配音"
          src={staticFile("audio/ep10-scene3.wav")}
          from={33 * fps}
          durationInFrames={361}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep10-scene4.wav")}
          from={46 * fps}
          durationInFrames={524}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 策划发言"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 总监冷水"
          src={staticFile("audio/ui-switch.wav")}
          from={5.31 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.4 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 结构锁"
          src={staticFile("audio/ui-click.wav")}
          from={13.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 事实锁"
          src={staticFile("audio/ui-switch.wav")}
          from={15.3 * fps}
          durationInFrames={10}
          volume={0.32}
        />
        <Audio
          name="02 双锁总结"
          src={staticFile("audio/ui-ding.wav")}
          from={17.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 理想化卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={33.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 双锁齐开卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={38.83 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={49.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={50.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={51.4 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={52.79 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={58.25 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
