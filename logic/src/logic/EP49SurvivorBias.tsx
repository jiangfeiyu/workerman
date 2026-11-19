import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneExperiment } from "./scenes/SceneExperiment";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP49SurvivorBias: React.FC = () => {
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
      <Track name="EP49 Scenes">
        <SceneHook
          name="01 盲目抄爆款现场"
          durationInFrames={18 * fps}
          episodeLabel="EP49"
          sectionTitle="01 · 抄爆款翻车"
          headline="只盯着行业 Top 1% 抄作业，为什么 90% 会翻车？"
          colleagueSender="同事小陈"
          colleagueRole="盲目抄冠军"
          colleagueMessage="我研究了一周，行业前三的爆款 App 开屏全都用了大红弹窗，咱们明天也全改红弹窗！"
          bossSender="数据分析师"
          bossRole="补齐分母"
          bossReply="可是上季度倒闭的那二十个同类型 App，开屏也全都弹了大红窗……"
          takeawayText="⚠ 只看活着的三家爆款，看不见用同样做法死掉的九十七家"
          secondBubbleSec={5.19}
          takeawaySec={10.88}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "职场做调研最容易踩的坑，就是只盯着活下来的冠军抄作业！",
              startMs: 250,
              endMs: 4936,
              timestampMs: 2593,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你看前三名都在发大红弹窗、都搞半夜发推，就以为找到了流量密码；",
              startMs: 5186,
              endMs: 10580,
              timestampMs: 7883,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "却压根没看：那些早就倒闭下架的失败者，当初干的事跟它们一模一样！",
              startMs: 10880,
              endMs: 16511,
              timestampMs: 13696,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneExperiment
          name="02 幸存者偏差补全漏斗"
          from={18 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP49"
          sectionTitle="02 · 幸存者偏差"
          accentColor="#E43B44"
          title="补齐沉默分母：别把“活着的巧合”当成必胜密码"
          mode="survivor-bias"
          item1Title="只看存活的 3 家爆款"
          item1Body="看见全都在用“开屏大红弹窗”，直接当成 100% 流量密码照抄。"
          item2Title="拉齐 100 家完整分母"
          item2Body="把同期也用红弹窗的失败者拉进来：3 家存活，97 家照样亏到关门！"
          item3Title="真差异过滤"
          item3Body="别找成功者“都有”的动作，要找“成功组有、失败组没有”的核心门槛！"
          item4Title=""
          item4Body=""
          summaryCaption="补齐漏斗里的沉默失败样本，才能算出真正的胜率"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "要破掉幸存者偏差，只需要把漏斗里沉默的分母补齐。",
              startMs: 250,
              endMs: 4168,
              timestampMs: 2209,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边只看活着的三家爆款，很容易把“发弹窗”误判成百分百成功秘籍；",
              startMs: 4418,
              endMs: 9764,
              timestampMs: 7091,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把同期干过同一件事的一百家全部拉进分母：三家活下来，九十七家照样亏到关门！",
              startMs: 10014,
              endMs: 17318,
              timestampMs: 13666,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "真正值钱的不是成功者身上“都有”的共性，而是失败者“没有”的真差异！",
              startMs: 17568,
              endMs: 23186,
              timestampMs: 20377,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 调研思路对比"
          from={43 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP49"
          sectionTitle="03 · 经验复盘对比"
          title="成功案例加失败对照组，一眼筛掉无用巧合"
          badLabel="✖ 只看成功样本"
          badSubtitle="把巧合当必胜秘籍"
          badExample="“扒 5 个爆款案例总结出‘共性清单’，明天全团队照着红弹窗和半夜发推抄！”"
          badNote="问题：分母缺失，把死掉那 97 家也做过的动作当成护身符"
          goodLabel="✔ 成功 vs 失败对照"
          goodSubtitle="补齐分母找真差异"
          goodExample="“拉齐 5 个爆款 + 15 个同期失败案例，专门对比‘只有爆款做到了、失败组没做到’的门槛。”"
          goodNote="亮点：过滤掉表面巧合，直接锁定真正决定生死的核心差异"
          goodCardSec={6.89}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边只盯几个成功样本总结共性，八成总结出来的全是无用巧合；",
              startMs: 250,
              endMs: 6588,
              timestampMs: 3419,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把失败对照组一起摆上桌，专挑成功者独有的门槛，一下就把伪经验全筛干净了！",
              startMs: 6888,
              endMs: 13519,
              timestampMs: 10204,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={58 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP49"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="产品经理只在 VIP 付费铁粉群发问卷，95% 反馈“很好无需大改”。这组数据犯了什么偏差？"
          answer="答案：选择偏差（抽样偏差）！嫌弃体验差的 80% 流失用户早已卸载退群，沉默样本不在群里！"
          mantra="本集口诀：别只盯活着的冠军抄作业，补齐沉默分母才见真因果！"
          countdownStartSec={3.98}
          answerSec={6.98}
          mantraSec={14.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：只在老铁付费群里做满意度调查，九成五夸好用，这犯了什么错？",
              startMs: 250,
              endMs: 6575,
              timestampMs: 3413,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！这就是选择偏差！真正嫌弃你的人早就卸载退群了，根本听不见他们的声音！",
              startMs: 6975,
              endMs: 13799,
              timestampMs: 10387,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：别只盯活着的冠军抄作业，补齐沉默分母才见真因果！",
              startMs: 14199,
              endMs: 19624,
              timestampMs: 16912,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 抄爆款现场配音"
          src={staticFile("audio/ep49-scene1.wav")}
          from={0}
          durationInFrames={495}
          volume={1}
        />
        <Audio
          name="02 幸存者偏差配音"
          src={staticFile("audio/ep49-scene2.wav")}
          from={18 * fps}
          durationInFrames={696}
          volume={1}
        />
        <Audio
          name="03 调研对比配音"
          src={staticFile("audio/ep49-scene3.wav")}
          from={43 * fps}
          durationInFrames={406}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep49-scene4.wav")}
          from={58 * fps}
          durationInFrames={589}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 盲目抄作业"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 补齐失败样本"
          src={staticFile("audio/ui-switch.wav")}
          from={5.19 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.88 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 左卡存活样本"
          src={staticFile("audio/ui-switch.wav")}
          from={18.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 右卡全集分母"
          src={staticFile("audio/ui-click.wav")}
          from={20.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 真差异过滤"
          src={staticFile("audio/ui-ding.wav")}
          from={23.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 成功样本对比"
          src={staticFile("audio/ui-switch.wav")}
          from={43.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 对照组对比"
          src={staticFile("audio/ui-ding.wav")}
          from={49.89 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={61.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={62.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={63.98 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={64.98 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={72.2 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
