import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneStrategy } from "./scenes/SceneStrategy";

export const EP48StrategyCompass: React.FC = () => {
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
      <Track name="EP48 Scenes">
        <SceneHook
          name="01 重大抉择犯难"
          durationInFrames={17 * fps}
          episodeLabel="EP48"
          sectionTitle="01 · 第三季终局实战"
          headline="跳槽高薪 Offer 还是留下来做副业？5 分钟用“终局罗盘”扫清！ "
          colleagueSender="迷茫同事"
          colleagueRole="十字路口"
          colleagueMessage="刚收到一家新创业公司翻倍薪资 Offer，手里副业也刚起头，我该押哪边啊？"
          bossSender="资深导师"
          bossRole="全局视角"
          bossReply="别凭一腔热血拍脑门！把第三季四块拼图合起来，拿“四维罗盘”五分钟过一遍！"
          takeawayText="⚠ 系统 × 商业 × 机制 × 杠铃，四盏绿灯全亮才是长期正复利"
          secondBubbleSec={5.22}
          takeawaySec={10.92}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "到了第三季最后一集，面对人生跳槽或重大立项这种大事，",
              startMs: 250,
              endMs: 4967,
              timestampMs: 2608,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "靠单一小技巧已经不够用了，你需要把整套思考框架串成一块仪表盘！",
              startMs: 5217,
              endMs: 10616,
              timestampMs: 7916,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "五分钟过一遍这四个格子，任何复杂局势的好坏当场一目了然！",
              startMs: 10916,
              endMs: 15759,
              timestampMs: 13337,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneStrategy
          name="02 终局四维仪表盘"
          from={17 * fps}
          durationInFrames={39 * fps}
          episodeLabel="EP48"
          sectionTitle="02 · 十年级决策仪表盘"
          accentColor="#38B764"
          title="第三季终局合体：4 格检查灯扫完再拍板，大事永不瞎蒙"
          mode="strategy-compass"
          item1Title="飞轮 vs 止痛药"
          item1Body="查增强/调节回路、时间延迟与指标护栏，分清真增长与吃止痛药虚火"
          item2Title="正 UE ＋ 真现金"
          item2Body="单单毛利必须为正、现金流覆盖账期，拥有真护城河与结果定价权"
          item3Title="相容 ＋ 清边界"
          item3Body="激励顺人性绑在结果上，闭环定接口，80% 双扇门大胆授权"
          item4Title="杠杆 ＋ 80/20"
          item4Body="守住能力圈不爆仓，用可复制杠杆沉淀资产，八成保底两成博十倍"
          summaryCaption="带走这张四维罗盘：看透复杂局势，每一步都走成十年正复利"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "把这四盏检查灯装进脑子，大事决策永不瞎蒙。",
              startMs: 250,
              endMs: 4501,
              timestampMs: 2375,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一格查系统回路：看清这是长期越转越省力的飞轮，还是靠透支和止痛药硬撑的虚火；",
              startMs: 4751,
              endMs: 11448,
              timestampMs: 8099,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二格算商业底层：单单毛利必须为正、现金流撑得住账期，再看有没有护城河和定价权；",
              startMs: 11698,
              endMs: 19477,
              timestampMs: 15587,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三格查组织与机制：看团队激励是否相容、权责边界是否清晰，别在互坑的内耗船上死磕；",
              startMs: 19727,
              endMs: 27261,
              timestampMs: 23494,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第四格定个人杠铃：确认不踩出能力圈爆仓区，再用可复制杠杆积累资产，把八成安全垫和两成高赔率握在自己手里！",
              startMs: 27511,
              endMs: 37201,
              timestampMs: 32356,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 重大决策前后对比"
          from={56 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP48"
          sectionTitle="03 · 盲追标签 vs 罗盘扫描"
          title="少被表面估值、风口和高薪标签晃花眼，底层四灯扫完才算数"
          badLabel="✖ 盯着亮眼标签冲动跳"
          badSubtitle="只看表面忽略底层雷区"
          badExample="“听说这公司估值百亿、薪资直接翻倍，先把高月薪拿到手再说！”"
          badNote="后果：进去半年发现负 UE 烧光钱、团队扯皮内耗，公司倒闭被迫裸辞"
          goodLabel="✔ 四维罗盘扫描 ＋ 杠铃切入"
          goodSubtitle="算清长账与退路再出牌"
          goodExample="“用系统、UE 现金、机制、能力圈扫完四灯全绿，先小步试探再把杠杆资产带进新赛道。”"
          goodNote="亮点：进退自如，既看清表面红利，更避开背后暗雷"
          goodCardSec={6.53}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边只盯着眼前一两个亮眼标签闭眼跳坑，踩雷全靠事后后悔；",
              startMs: 250,
              endMs: 6233,
              timestampMs: 3241,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边四格罗盘扫完一圈再出牌，既看清表面红利，更避开背后暗雷，走每一步都是长期正复利！",
              startMs: 6533,
              endMs: 14193,
              timestampMs: 10363,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与终局口诀"
          from={72 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP48"
          sectionTitle="04 · 第三季收官自测 & 终局口诀"
          question="一个项目流水破亿看着超火，但“单单亏 5 块 ＋ 借钱垫资发工资 ＋ 全员刷假单冲提成”，这船能上吗？"
          answer="答案：绝对不能上！四维罗盘里商业 UE、现金流、组织激励全亮致命红灯，表面流水越狂欢，塌房瞬间越惨烈！"
          mantra="第三季终局口诀：系统看循环，商业算现金；机制顺人性，杠铃保长赢！"
          countdownStartSec={5.79}
          answerSec={8.79}
          mantraSec={15.69}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：流水破亿看着超火，但每单亏五块、垫资借钱、全员刷假单拿提成，这船能上吗？",
              startMs: 250,
              endMs: 8388,
              timestampMs: 4319,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！表面热闹底层全红灯，流水越狂欢塌房越惨烈，千万别碰！",
              startMs: 8788,
              endMs: 15293,
              timestampMs: 12040,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "送你第三季终局口诀：系统看循环，商业算现金；机制顺人性，杠铃保长赢！",
              startMs: 15693,
              endMs: 22933,
              timestampMs: 19313,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 重大抉择配音"
          src={staticFile("audio/ep48-scene1.wav")}
          from={0}
          durationInFrames={473}
          volume={1}
        />
        <Audio
          name="02 四维罗盘配音"
          src={staticFile("audio/ep48-scene2.wav")}
          from={17 * fps}
          durationInFrames={1117}
          volume={1}
        />
        <Audio
          name="03 决策对比配音"
          src={staticFile("audio/ep48-scene3.wav")}
          from={56 * fps}
          durationInFrames={426}
          volume={1}
        />
        <Audio
          name="04 收官自测口诀配音"
          src={staticFile("audio/ep48-scene4.wav")}
          from={72 * fps}
          durationInFrames={688}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 迷茫十字路口"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 导师罗盘"
          src={staticFile("audio/ui-switch.wav")}
          from={5.22 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={10.92 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 第1灯系统"
          src={staticFile("audio/ui-switch.wav")}
          from={17.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 第2灯商业"
          src={staticFile("audio/ui-click.wav")}
          from={19.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第3灯组织"
          src={staticFile("audio/ui-click.wav")}
          from={21.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 第4灯杠铃"
          src={staticFile("audio/ui-ding.wav")}
          from={22.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 盲追标签"
          src={staticFile("audio/ui-switch.wav")}
          from={56.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 罗盘全扫"
          src={staticFile("audio/ui-ding.wav")}
          from={62.53 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={77.79 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={78.79 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={79.79 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={80.79 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 终局口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={87.69 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
