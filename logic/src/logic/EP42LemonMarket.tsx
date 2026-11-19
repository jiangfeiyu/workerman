import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneOrgMechanism } from "./scenes/SceneOrgMechanism";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP42LemonMarket: React.FC = () => {
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
      <Track name="EP42 Scenes">
        <SceneHook
          name="01 劣币驱逐良币现场"
          durationInFrames={17 * fps}
          episodeLabel="EP42"
          sectionTitle="01 · 柠檬市场现场"
          headline="老实啃硬活的人拿 C 走人，会吹 PPT 的水货却年年拿 A？"
          colleagueSender="老实员工"
          colleagueRole="苦干吃亏"
          colleagueMessage="这季度稳定性全是我半夜蹲守拉起来的，怎么晋升却给了天天写大词 PPT 的小李？"
          bossSender="旁观同事"
          bossRole="点破黑盒"
          bossReply="老板开会就看那十分钟 PPT，实际干多少看不见，谁包装响亮谁就拿 A 呗！"
          takeawayText="⚠ 当“便宜假包装”和“真干活”无法区分时，真高手会率先离场"
          secondBubbleSec={3.91}
          takeawaySec={9.99}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "团队里最寒人心、也最毁掉战斗力的一幕就是：",
              startMs: 250,
              endMs: 3655,
              timestampMs: 1952,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "老实啃硬骨头的人默默背锅拿 C，最会造新词做 PPT 的人年年晋升拿 A！",
              startMs: 3905,
              endMs: 9691,
              timestampMs: 6798,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "久而久之高手全跑了、只剩水货留下来，这就是经济学著名的“柠檬市场”！",
              startMs: 9991,
              endMs: 15998,
              timestampMs: 12994,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneOrgMechanism
          name="02 柠檬市场与硬信号"
          from={17 * fps}
          durationInFrames={32 * fps}
          episodeLabel="EP42"
          sectionTitle="02 · 信息不对称 & 硬信号"
          accentColor="#F77622"
          title="打破逆向选择只有一招：用“造假成本极高”的硬信号验真"
          mode="lemon-market"
          item1Title="真实贡献看不见"
          item1Body="上级只看表面汇报话术，无法分辨谁真的扛了硬活"
          item2Title="PPT 演员低本伪装"
          item2Body="造新词、改排版一晚就能学会，水货与高手看着一样"
          item3Title="真高手嫌亏主动离场"
          item3Body="良币留不住纷纷跳槽，全组最后只剩一帮PPT水货"
          item4Title="高造假成本硬信号"
          item4Body="直接看线上故障记录、真实产出与客户原始反馈，水货演不出来"
          summaryCaption="选人选伙伴别看一晚就能伪造的“廉价信号”，必须验“水货演不起的硬信号”"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "为什么真金白银会被水货逼走？问题全出在“信息不对称”上。",
              startMs: 250,
              endMs: 5131,
              timestampMs: 2690,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "当上级看不见真实工作量、只看几页漂亮的汇报话术时，水货和高手看起来一模一样；",
              startMs: 5381,
              endMs: 11794,
              timestampMs: 8587,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "既然干真活和做假包装拿同一种低评价，聪明但真正有本事的人只能跳槽离开，留下全是不敢动真格的水货；",
              startMs: 12044,
              endMs: 20351,
              timestampMs: 16197,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "打破逆向选择的唯一解药叫“高造假成本硬信号”：直接查真实可验证的战果记录、线上崩溃率、客户原始评价，水货根本演不出来！",
              startMs: 20601,
              endMs: 30710,
              timestampMs: 25655,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 选拔标准对比"
          from={49 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP42"
          sectionTitle="03 · 廉价包装 vs 硬核验真"
          title="好不好看 10 分钟汇报，不如验 2 个水货编不出的真实细节"
          badLabel="✖ 看廉价汇报信号"
          badSubtitle="比谁造词更高大上"
          badExample="“晋升只听每人 10 分钟总结 PPT，谁讲得最前沿、气场最强就过！”"
          badNote="后果：逼出全员花八成精力排版背稿，真干活的吃哑巴亏"
          goodLabel="✔ 硬产出 ＋ 现场实操验真"
          goodSubtitle="让造假代价极高"
          goodExample="“述职先交 3 项可核查交付记录与业务数据，现场再随机拆解 2 个故障现场细节！”"
          goodNote="亮点：吹牛选手三句话就卡壳，老实扛活的人终于发光"
          goodCardSec={7.04}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边用一页纸就能伪造的“便宜信号”选拔人，最后只招来一堆PPT演员；",
              startMs: 250,
              endMs: 6741,
              timestampMs: 3495,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把门槛换成水货造假成本极高的硬产出和细节追问，老实干实事的人终于能亮出真本事！",
              startMs: 7041,
              endMs: 14575,
              timestampMs: 10808,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={65 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP42"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="采购要从两家云厂商选一家，销售顾问嘴上都保证“绝不断网”。怎么用低成本逼出真信号？"
          answer="答案：把超标断网高额违约金写进合同，外加两周小流量真实压测！嘴上吹牛的水货一听赔钱当场露馅！"
          mantra="本集口诀：嘴上包装不算数，硬核验真筛良币！"
          countdownStartSec={4.84}
          answerSec={7.84}
          mantraSec={15.34}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：两家供应商嘴上都吹自己“绝不断网”，用什么低成本动作能立刻筛出假吹牛？",
              startMs: 250,
              endMs: 7439,
              timestampMs: 3844,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！把超标断网高额赔付写进合同外加两周小流压测，水货当场打退堂鼓！",
              startMs: 7839,
              endMs: 14936,
              timestampMs: 11387,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：嘴上包装不算数，硬核验真筛良币！",
              startMs: 15336,
              endMs: 19371,
              timestampMs: 17353,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 柠檬市场现场配音"
          src={staticFile("audio/ep42-scene1.wav")}
          from={0}
          durationInFrames={480}
          volume={1}
        />
        <Audio
          name="02 硬信号图解配音"
          src={staticFile("audio/ep42-scene2.wav")}
          from={17 * fps}
          durationInFrames={922}
          volume={1}
        />
        <Audio
          name="03 选拔对比配音"
          src={staticFile("audio/ep42-scene3.wav")}
          from={49 * fps}
          durationInFrames={438}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep42-scene4.wav")}
          from={65 * fps}
          durationInFrames={582}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 员工困惑"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 点破黑盒"
          src={staticFile("audio/ui-switch.wav")}
          from={3.91 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.99 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 信息黑盒"
          src={staticFile("audio/ui-switch.wav")}
          from={17.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 廉价伪装"
          src={staticFile("audio/ui-click.wav")}
          from={19.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 良币出走"
          src={staticFile("audio/ui-click.wav")}
          from={21.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 硬核验真"
          src={staticFile("audio/ui-ding.wav")}
          from={22.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 廉价包装"
          src={staticFile("audio/ui-switch.wav")}
          from={49.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 硬核产出"
          src={staticFile("audio/ui-ding.wav")}
          from={56.04 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={69.84 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={70.84 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={71.84 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={72.84 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.34 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
