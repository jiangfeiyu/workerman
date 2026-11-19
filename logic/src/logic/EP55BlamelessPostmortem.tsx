import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneCrisis } from "./scenes/SceneCrisis";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP55BlamelessPostmortem: React.FC = () => {
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
      <Track name="EP55 Scenes">
        <SceneHook
          name="01 抓替罪羊复盘现场"
          durationInFrames={20 * fps}
          episodeLabel="EP55"
          sectionTitle="01 · 伪复盘抓替罪羊"
          headline="出事只会骂“加强责任心、扣奖金”，为什么半年后换个人照样踩坑？"
          colleagueSender="部门主管"
          colleagueRole="抓替罪羊"
          colleagueMessage="小王，你发券少输一个零亏了二十万，写检讨并扣绩效，以后都长点心！"
          bossSender="运营小王"
          bossRole="系统无防呆"
          bossReply="后台输入框连个折扣校验和确认弹窗都没有，谁能保证一辈子不手滑啊……"
          takeawayText="⚠ 只要“手滑一下”就能捅出大窟窿，那一定是系统流程有漏洞"
          secondBubbleSec={4.98}
          takeawaySec={11.39}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "公司出了事故之后，最常见也最没用的复盘结论只有四个字：",
              startMs: 250,
              endMs: 4732,
              timestampMs: 2491,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "“加强责任心，下不为例！”再顺手把犯错的小倒霉蛋狠狠扣一笔绩效！",
              startMs: 4982,
              endMs: 11091,
              timestampMs: 8037,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "可过不了半年，同一个坑换个新人照样再踩一遍——因为你们只抓了替罪羊，系统漏洞原封未动！",
              startMs: 11391,
              endMs: 18811,
              timestampMs: 15101,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCrisis
          name="02 无指责复盘与防呆卡扣"
          from={20 * fps}
          durationInFrames={34 * fps}
          episodeLabel="EP55"
          sectionTitle="02 · 无指责复盘"
          accentColor="#38B764"
          title="无指责事后分析：把“靠人长点心”改造成“系统硬防呆”"
          mode="blameless-postmortem"
          item1Title="① 拿掉情绪追责"
          item1Body="默认当事人当时想做好，鼓励一线敢把真实操作细节全盘托出"
          item2Title="② 追问系统漏网点"
          item2Body="为什么少输一个零就能打穿审核、直接发给全站十万用户？"
          item3Title="③ 加装硬防呆卡扣"
          item3Body="把“多看三遍”换成代码拦截：折扣超 5 折自动锁死 + 双人复核"
          item4Title="终极效果"
          item4Body="机器不会犯困、不会手滑，新实习生来操作也绝不可能踩同样的坑"
          summaryCaption="人是会累的，只有把防错机制焊进流程与系统才真能下不为例"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "谷歌等顶级团队都用的“无指责复盘”，核心只干一件事：把人祸翻译成系统漏洞。",
              startMs: 250,
              endMs: 6486,
              timestampMs: 3368,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步先拿掉情绪追责：默认当事人当时没想搞破坏，让一线敢把真实操作链条全盘托出；",
              startMs: 6736,
              endMs: 13948,
              timestampMs: 10342,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步追问机制漏洞：为什么少输一个零居然能直接打穿审核、发给全站用户？",
              startMs: 14198,
              endMs: 20334,
              timestampMs: 17266,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步把“靠人长点心”，升级成“系统硬卡扣”：比如折扣超五折自动熔断、高危动作必须双人复核！机器不会犯困，才真能下不为例！",
              startMs: 20584,
              endMs: 32707,
              timestampMs: 26646,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 复盘结论对比"
          from={54 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP55"
          sectionTitle="03 · 复盘整改对比"
          title="扣完奖金大家只会学会瞒报，焊死防呆才能永绝后患"
          badLabel="✖ 问责贴标签"
          badSubtitle="下不为例变成下次瞒报"
          badExample="“因经办人粗心大意导致配置出错，通报批评扣 5000 元；要求全员提高核对意识。”"
          badNote="问题：系统照样裸奔，下次大家出了小错全藏着不敢上报"
          goodLabel="✔ 加装系统防呆卡扣"
          goodSubtitle="用机制消灭人为手滑"
          goodExample="“取消单人直发权限，上线折扣＞50% 自动熔断拦截与 1% 灰度预演，7 日内交付。”"
          goodNote="亮点：从根上封堵同类人为失误，团队敢透明汇报隐患"
          goodCardSec={6.98}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边骂完人扣完钱，大家学到的唯一经验就是“下次出事赶紧藏着别上报”；",
              startMs: 250,
              endMs: 6676,
              timestampMs: 3463,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边直接把漏洞焊死在代码和审批流里，哪怕来个刚入职一天的实习生，也绝不可能再犯同样的错！",
              startMs: 6976,
              endMs: 14341,
              timestampMs: 10659,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={70 * fps}
          durationInFrames={24 * fps}
          episodeLabel="EP55"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="误删生产库后，做了两件事：① 严禁周五操作；② 物理禁用无条件删表权限并加回收站。哪条是真防呆？"
          answer="答案：第②条！口头禁令一遇紧急救火必被打破；只有权限隔离和延迟回收站才是物理级防呆卡扣！"
          mantra="本集口诀：出事别只抓替罪羊，人是会累的；把责任心换成系统防呆卡扣，才叫真复盘！"
          countdownStartSec={4.27}
          answerSec={7.27}
          mantraSec={15.21}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：“严禁周五操作”和“物理禁用无条件删表加回收站”，哪条才是真防呆？",
              startMs: 250,
              endMs: 6869,
              timestampMs: 3560,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！第二条！口头禁令一到紧急救火全失效，只有系统权限锁死才能救命！",
              startMs: 7269,
              endMs: 14806,
              timestampMs: 11038,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：出事别只抓替罪羊，人是会累的；把责任心换成系统防呆卡扣，才叫真复盘！",
              startMs: 15206,
              endMs: 22626,
              timestampMs: 18916,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 替罪羊现场配音"
          src={staticFile("audio/ep55-scene1.wav")}
          from={0}
          durationInFrames={564}
          volume={1}
        />
        <Audio
          name="02 无指责复盘配音"
          src={staticFile("audio/ep55-scene2.wav")}
          from={20 * fps}
          durationInFrames={981}
          volume={1}
        />
        <Audio
          name="03 复盘对比配音"
          src={staticFile("audio/ep55-scene3.wav")}
          from={54 * fps}
          durationInFrames={430}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep55-scene4.wav")}
          from={70 * fps}
          durationInFrames={679}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 扣钱通报"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 员工委屈"
          src={staticFile("audio/ui-switch.wav")}
          from={4.98 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={11.39 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 拿掉追责"
          src={staticFile("audio/ui-click.wav")}
          from={20.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 追问漏洞"
          src={staticFile("audio/ui-switch.wav")}
          from={22.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 防呆卡扣"
          src={staticFile("audio/ui-click.wav")}
          from={25.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 终极效果"
          src={staticFile("audio/ui-ding.wav")}
          from={28.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 问责对比"
          src={staticFile("audio/ui-switch.wav")}
          from={54.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 防呆对比"
          src={staticFile("audio/ui-ding.wav")}
          from={60.98 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={74.27 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={75.27 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={76.27 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={77.27 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={85.21 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
