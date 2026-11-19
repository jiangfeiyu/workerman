import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDeconstruct } from "./scenes/SceneDeconstruct";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP01Argument: React.FC = () => {
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
      <Track name="EP01 Scenes">
        <SceneHook
          name="01 痛点开场"
          durationInFrames={10 * fps}
          headline="为什么写了 500 字汇报，老板还是问“结论呢”？"
          colleagueMessage="最近大家反馈新版本很卡，我昨晚自己用也闪退了两次，而且竞品昨天刚上了新功能。所以我们这周必须暂停开发新需求，全员修 Bug！"
          bossReply="等等…竞品上新功能和咱们修 Bug 有啥关系？到底多卡？要停几天？"
          style={{ backgroundColor: "transparent" }}
        />
        <SceneDeconstruct
          name="02 拆解积木"
          from={10 * fps}
          durationInFrames={16 * fps}
          title="一个合格的论证 = 有效前提 + 合理桥梁 ➔ 明确结论"
          premiseText="“昨晚闪退 2 次” + “用户反馈卡顿” → 需要补充具体崩溃率与受影响人数。"
          noiseText="“竞品昨天上了新功能” → 竞品上新不能推导出“我们要修 Bug”，属于干扰项。"
          hiddenPremiseText="如果不立刻修 Bug，用户流失损失 > 延期新需求的收益"
          conclusionText="建议本周抽出 2 名研发用 2 天集中修 P0 闪退，新需求顺延至下周三。"
          style={{ backgroundColor: "transparent" }}
        />
        <SceneCompare
          name="03 前后对比"
          from={26 * fps}
          durationInFrames={13 * fps}
          title="同样一件事，换个结构说，通过率直接翻倍"
          badExample="“最近大家反馈新版本很卡，我昨晚也闪退两次，而且竞品昨天刚上新功能。所以我们这周必须暂停开发，全员修 Bug！”"
          goodExample="“【结论】建议抽 2 位开发用 2 天集中修 P0 闪退。【事实】昨日崩溃率从 0.3% 升至 3.2%，已影响 18% 新用户留存。修完后可保住本周转化目标。”"
          style={{ backgroundColor: "transparent" }}
        />
        <SceneQuiz
          name="04 小测与口诀"
          from={39 * fps}
          durationInFrames={14 * fps}
          question="“这个设计稿配色很高级，大厂都在用，所以我建议今天直接定稿上线！”"
          answer="答案：只有“主观感受（高级）+ 诉诸他人（大厂）”，缺少能支撑“上线效果更好”的客观前提（如点击率测试数据、目标用户匹配度）。"
          mantra="本集口诀：结论先行，事实撑腰；情绪和无关项，统统丢掉！"
          style={{ backgroundColor: "transparent" }}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 痛点开场配音"
          src={staticFile("audio/vo-scene1.wav")}
          from={0}
          durationInFrames={280}
          volume={1}
        />
        <Audio
          name="02 拆解积木配音"
          src={staticFile("audio/vo-scene2.wav")}
          from={10 * fps}
          durationInFrames={460}
          volume={1}
        />
        <Audio
          name="03 前后对比配音"
          src={staticFile("audio/vo-scene3.wav")}
          from={26 * fps}
          durationInFrames={365}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/vo-scene4.wav")}
          from={39 * fps}
          durationInFrames={400}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 同事气泡提示"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板追问提示"
          src={staticFile("audio/ui-switch.wav")}
          from={3.3 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示条提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={6.1 * fps}
          durationInFrames={5}
          volume={0.35}
        />

        <Audio
          name="02 前提卡片"
          src={staticFile("audio/ui-click.wav")}
          from={10.8 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="02 划掉干扰项"
          src={staticFile("audio/ui-switch.wav")}
          from={14.4 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="02 隐含前提桥梁"
          src={staticFile("audio/ui-whoosh.wav")}
          from={18.3 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 结论卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={21.7 * fps}
          durationInFrames={42}
          volume={0.3}
        />

        <Audio
          name="03 流水账卡片"
          src={staticFile("audio/ui-switch.wav")}
          from={26.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 论证卡片"
          src={staticFile("audio/ui-ding.wav")}
          from={31.0 * fps}
          durationInFrames={42}
          volume={0.3}
        />

        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={40.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={41.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={42.8 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={43.95 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={47.3 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
