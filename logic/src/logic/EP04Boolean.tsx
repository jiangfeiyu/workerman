import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneEuler } from "./scenes/SceneEuler";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP04Boolean: React.FC = () => {
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
      <Track name="EP04 Scenes">
        <SceneHook
          name="01 需求歧义现场"
          durationInFrames={17 * fps}
          episodeLabel="EP04"
          sectionTitle="01 · 规则翻车现场"
          headline="一句“新用户或老用户绑手机且实名”，直接刷走 5000 张券"
          colleagueSender="运营同学"
          colleagueRole="发需求"
          colleagueMessage="规则很简单：新用户注册，或老用户绑定手机号且完成实名认证，就可以领券，今天上线！"
          bossSender="测试同学"
          bossRole="紧急告警"
          bossReply="线上刚刷出 5000 个没实名的新号领走券了！你写的是“注册 OR (绑手机 AND 实名)”啊！"
          takeawayText="⚠ 没写清“且、或、非”的括号优先级，直接造成线上资损"
          secondBubbleSec={5.29}
          takeawaySec={10.74}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这句再正常不过的群里需求，上线后直接亏掉几万块预算。",
              startMs: 250,
              endMs: 5041,
              timestampMs: 2645,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "运营说自己写明了“要实名认证”，开发却说完全按字面实现的，",
              startMs: 5291,
              endMs: 10440,
              timestampMs: 7865,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "问题就出在：你以为大家懂的“且和或”，在逻辑里完全不是一回事！",
              startMs: 10740,
              endMs: 16025,
              timestampMs: 13382,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneEuler
          name="02 且或交集图解"
          from={17 * fps}
          durationInFrames={23 * fps}
          episodeLabel="EP04"
          sectionTitle="02 · 且与或的集合图"
          accentColor="#38B764"
          title="“且”是中间交集（全满足），“或”是全部并集（任选一）"
          mode="overlap"
          outerLabel="注册 / 绑手机"
          innerLabel="已完成实名认证"
          outerColor="#41A6F6"
          innerColor="#38B764"
          relationCaption="(注册 OR 绑手机) AND 实名 ≠ 注册 OR (绑手机 AND 实名)"
          noteText="出现多个“且”和“或”混用时，必须拆行或加括号"
          noteDelaySec={14.99}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "用逻辑学里的“且、或、非”画一张图，问题一眼看穿。",
              startMs: 250,
              endMs: 5125,
              timestampMs: 2687,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“且”，是两个圈中间重叠的交集，必须同时满足才过关；",
              startMs: 5425,
              endMs: 9981,
              timestampMs: 7703,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“或”，是把两个圈全包进来，满足任意一个就算过关。",
              startMs: 10231,
              endMs: 14690,
              timestampMs: 12460,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "运营心里要的是“注册或绑手机，且实名”，文字却写成了“注册，或者绑手机且实名”！",
              startMs: 14990,
              endMs: 21859,
              timestampMs: 18424,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 规则写法对比"
          from={40 * fps}
          durationInFrames={19 * fps}
          episodeLabel="EP04"
          sectionTitle="03 · 规则文档前后对比"
          title="用清单把“且”放主干，把“或”关进括号，零歧义"
          badLabel="✖ 长难句连写"
          badSubtitle="且或混杂全靠猜"
          badExample="“新用户注册或老用户绑定手机且实名认证后可领券（异常账号除外）。”"
          badNote="问题：优先级不明确，“且”“或”“除外”极易被误读"
          goodLabel="✔ 逻辑清单写法"
          goodSubtitle="且放主干+或加括号"
          goodExample="“同时满足以下条件才可领券：①（新用户注册 或 老用户绑手机）；② 且 已实名认证；③ 且 非黑名单。”"
          goodNote="亮点：产品、开发、测试三方一眼对齐，零沟通成本"
          goodCardSec={6.85}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "来看改写对比：左边一句话连着写“或、且、除外”，神仙也得猜半天；",
              startMs: 250,
              endMs: 6550,
              timestampMs: 3400,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边直接拆成编号清单，把“且”放主干，把“或”关进括号里，",
              startMs: 6850,
              endMs: 11465,
              timestampMs: 9157,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再用“非”标清排除边界，产品、开发、测试看一眼就能百分百对齐！",
              startMs: 11715,
              endMs: 17573,
              timestampMs: 14644,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={59 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP04"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="“如果接口联调完成【且】测试无 P0 Bug，我们就发版。”——无 P0 Bug 但联调未完，能发吗？"
          answer="答案：不能！因为用了“且（AND）”，必须全部条件同时满足；少一个条件，整个发版条件就不成立。"
          mantra="本集口诀：写规则少用长难句，且放主干或加括号！"
          countdownStartSec={2.5}
          answerSec={5.68}
          mantraSec={11.09}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：接口联调完成“且”无 P0 Bug 才发版，缺一个能发吗？",
              startMs: 250,
              endMs: 5277,
              timestampMs: 2763,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "答案是不能！“且”要求全部条件同时满足，少一个都是假。",
              startMs: 5677,
              endMs: 10690,
              timestampMs: 8183,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：写规则少用长难句，且放主干或加括号！",
              startMs: 11090,
              endMs: 16136,
              timestampMs: 13613,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 歧义现场配音"
          src={staticFile("audio/ep04-scene1.wav")}
          from={0}
          durationInFrames={484}
          volume={1}
        />
        <Audio
          name="02 且或图解配音"
          src={staticFile("audio/ep04-scene2.wav")}
          from={17 * fps}
          durationInFrames={659}
          volume={1}
        />
        <Audio
          name="03 规则对比配音"
          src={staticFile("audio/ep04-scene3.wav")}
          from={40 * fps}
          durationInFrames={530}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep04-scene4.wav")}
          from={59 * fps}
          durationInFrames={488}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 运营发需求"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 测试告警"
          src={staticFile("audio/ui-switch.wav")}
          from={5.29 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.74 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 欧拉图展开"
          src={staticFile("audio/ui-click.wav")}
          from={17.5 * fps}
          durationInFrames={12}
          volume={0.32}
        />
        <Audio
          name="02 底部提示"
          src={staticFile("audio/ui-ding.wav")}
          from={31.99 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 长难句卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={40.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 清单写法"
          src={staticFile("audio/ui-ding.wav")}
          from={46.85 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={61.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={62.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={63.5 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={64.68 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={70.09 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
