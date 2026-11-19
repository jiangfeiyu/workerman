import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneTrendModel } from "./scenes/SceneTrendModel";

export const EP60JevonsShift: React.FC = () => {
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
      <Track name="EP60 Scenes">
        <SceneHook
          name="01 AI 越快人越卷现场"
          durationInFrames={15 * fps}
          episodeLabel="EP60"
          sectionTitle="01 · 杰文斯效率陷阱"
          headline="AI 让写方案快了 10 倍，为什么打工人反而更卷更累了？"
          colleagueSender="同事小唐"
          colleagueRole="炫耀工具提效"
          colleagueMessage="老板，我用 AI 后以前两小时写一份方案，现在五分钟就能吐出三份！"
          bossSender="老板"
          bossRole="需求暴涨 20 倍"
          bossReply="太好了！那以后客户提案每家配十套备选方案，顺便把下个月的五十份一起赶出来吧！"
          takeawayText="⚠ 生产初稿的成本越接近零，社会要求的数量反而暴涨"
          secondBubbleSec={3.55}
          takeawaySec={7.32}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "AI 时代最让打工人哭笑不得的怪现象：",
              startMs: 250,
              endMs: 3298,
              timestampMs: 1774,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "本以为工具效率翻十倍，自己就能准点下班摸鱼；",
              startMs: 3548,
              endMs: 7020,
              timestampMs: 5284,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "结果“写初稿”变便宜之后，老板和客户要的版本数量直接暴涨二十倍，反倒加班加到凌晨！",
              startMs: 7320,
              endMs: 13979,
              timestampMs: 10650,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneTrendModel
          name="02 杰文斯悖论与价值转移"
          from={15 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP60"
          sectionTitle="02 · 杰文斯价值转移"
          accentColor="#FFCD75"
          title="杰文斯悖论：中游执行价格归零，高价值全涌向两端"
          mode="jevons-shift"
          item1Title="① 上游：问题定义权"
          item1Body="搞清“到底做什么、给谁解决什么真痛点”，AI 无法替你拍业务方向。"
          item2Title="② 中游：批量初稿（贬值）"
          item2Body="快速写文案、铺界面、出草图成本趋近于零，只拼数量迟早被卷死。"
          item3Title="③ 下游：逻辑验收与担责"
          item3Body="抓出 AI 幻觉漏洞、决定上线阈值并替最终商业结果签字担责。"
          item4Title="卡位铁律"
          item4Body="把“批量执行”丢给 AI 流水线，牢牢抢占上游定义权与下游验收权！"
          summaryCaption="工具越便宜，高质量判断力与担责能力就越稀缺值钱"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "这个现象一百多年前就被经济学家预言过，叫“杰文斯悖论”。",
              startMs: 250,
              endMs: 4987,
              timestampMs: 2619,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "当一项资源的单次使用成本暴跌，它的总消耗量不会减少，反而会井喷式暴涨！",
              startMs: 5237,
              endMs: 10708,
              timestampMs: 7973,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "放在 AI 职场里：中间“快速出初稿、写代码片段”的边际价格正迅速跌向零；如果你还死磕在中间层拼手速，只会被十倍需求卷死；",
              startMs: 10958,
              endMs: 21310,
              timestampMs: 16134,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真正稀缺并疯狂涨价的价值，全转移到了两端：上游的“定义真问题”，和下游的“逻辑验收与最终担责”！",
              startMs: 21560,
              endMs: 29874,
              timestampMs: 25717,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 职场卡位对比"
          from={46 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP60"
          sectionTitle="03 · 职场卡位对比"
          title="别跟模型在中间层拼打字手速，抢占定义与验收两端"
          badLabel="✖ 中间层拼高产手速"
          badSubtitle="陷入廉价返工泥潭"
          badExample="“我用 AI 每天能生成 30 份 PPT 和 5000 字方案，产量直接拉满！”"
          badNote="问题：干的是趋近零成本的体力活，随时被更便宜工具替代"
          goodLabel="✔ 抢占定义与验收两端"
          goodSubtitle="拿商业 ROI 拿高溢价"
          goodExample="“我用问题树定清业务真需求，再用防幻觉逻辑验收 AI 产出，只对转化结果负责。”"
          goodNote="亮点：不可替代的核心判断力，AI 越快你的杠杆率越高"
          goodCardSec={8.3}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拼命用 AI 当高产打字机，看似很忙，其实随时能被更便宜的新工具替掉；",
              startMs: 250,
              endMs: 7999,
              timestampMs: 4125,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把体力执行全交给模型，自己牢牢守住“定义问题”和“逻辑把关”这两头，身价反而水涨船高！",
              startMs: 8299,
              endMs: 15792,
              timestampMs: 12046,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={63 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP60"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="当 AI 写代码、写文案的成本都几乎归零之后，职场里什么能力反而会变得更值钱？"
          answer="答案：精准定义业务问题、拆解跨部门逻辑边界、抓出 AI 隐蔽错误并对最终结果拍板担责的能力！"
          mantra="本集口诀：执行成本越归零，需求总量越暴涨；别在中间拼手速，死守定义与把关！"
          countdownStartSec={3.24}
          answerSec={6.24}
          mantraSec={12.31}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：当 AI 写初稿几乎零成本之后，什么能力反而会变得更值钱？",
              startMs: 250,
              endMs: 5842,
              timestampMs: 3046,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！精准定义问题的能力、验收纠偏的能力和最终担责的判断力！",
              startMs: 6242,
              endMs: 11914,
              timestampMs: 9078,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：执行成本越归零，需求总量越暴涨；别在中间拼手速，死守定义与把关！",
              startMs: 12314,
              endMs: 19474,
              timestampMs: 15894,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 越快越卷配音"
          src={staticFile("audio/ep60-scene1.wav")}
          from={0}
          durationInFrames={419}
          volume={1}
        />
        <Audio
          name="02 杰文斯悖论配音"
          src={staticFile("audio/ep60-scene2.wav")}
          from={15 * fps}
          durationInFrames={896}
          volume={1}
        />
        <Audio
          name="03 卡位对比配音"
          src={staticFile("audio/ep60-scene3.wav")}
          from={46 * fps}
          durationInFrames={474}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep60-scene4.wav")}
          from={63 * fps}
          durationInFrames={584}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 炫耀AI快"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 需求暴涨20倍"
          src={staticFile("audio/ui-switch.wav")}
          from={3.55 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={7.32 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 上游定义权"
          src={staticFile("audio/ui-click.wav")}
          from={15.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 中游贬值"
          src={staticFile("audio/ui-switch.wav")}
          from={17.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 下游验收权"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 卡位铁律"
          src={staticFile("audio/ui-ding.wav")}
          from={23.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 手速对比"
          src={staticFile("audio/ui-switch.wav")}
          from={46.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 两端卡位对比"
          src={staticFile("audio/ui-ding.wav")}
          from={54.3 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={66.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={67.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={68.24 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={69.24 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={75.31 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
