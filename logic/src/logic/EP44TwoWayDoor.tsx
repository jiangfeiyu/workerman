import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneOrgMechanism } from "./scenes/SceneOrgMechanism";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP44TwoWayDoor: React.FC = () => {
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
      <Track name="EP44 Scenes">
        <SceneHook
          name="01 微操与翻车现场"
          durationInFrames={20 * fps}
          episodeLabel="EP44"
          sectionTitle="01 · 授权两难现场"
          headline="改两个字也要等老板批 3 天，一放权新人却捅出大窟窿——怎么办？"
          colleagueSender="基层同事"
          colleagueRole="审批卡死"
          colleagueMessage="老板，按钮文案就微调两个字，您都在待审批里卡三天了，活动快错过窗口啦！"
          bossSender="部门主管"
          bossRole="一朝被蛇咬"
          bossReply="不是我不放权！上周刚让新人自己配百万补贴，结果输错小数点亏掉八十万啊！"
          takeawayText="⚠ 用“能不能低成本撤销”划开两扇门与单向门，立刻理顺授权尺度"
          secondBubbleSec={3.23}
          takeawaySec={13.07}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "当主管最难拿捏的永远是授权：",
              startMs: 250,
              endMs: 2979,
              timestampMs: 1614,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "管太细吧，连改两个字都要找你签字，一线急死、你自己累瘫；可一放手吧，新人转眼给你捅出个无法挽回的大窟窿！",
              startMs: 3229,
              endMs: 12773,
              timestampMs: 8001,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "到底什么事能放手、什么事必须死守？看清“两扇门”和“单向门”！",
              startMs: 13073,
              endMs: 18233,
              timestampMs: 15653,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneOrgMechanism
          name="02 双扇门与单向门"
          from={20 * fps}
          durationInFrames={38 * fps}
          episodeLabel="EP44"
          sectionTitle="02 · 科学授权：双扇门法则"
          accentColor="#38B764"
          title="看清“可不可逆”再放权：小错秒过快跑，大事三重复核死锁"
          mode="two-way-door"
          item1Title="可逆试错 ➔ 一分钟全放权"
          item1Body="如改按钮文案、10% 流量测新页面：效果不好随时推门撤回，不准层层审批拖死业务"
          item2Title="不可逆重后果 ➔ 必须亲自死守"
          item2Body="如全量涨价、删历史数据、签大额赔款合同：一旦走出去再难回头，必须主管把关"
          item3Title="每件事明确唯一执行人 R 与拍板兜底人 A"
          item3Body="双扇门让一线同时担任 R 与 A；单向门由最终担责高管锁定 A 位签字"
          item4Title="速度与安全兼得"
          item4Body="一线快跑不添乱，核心红线绝不穿"
          summaryCaption="把 80% 可逆小事彻底下放，只留 20% 致命单向门亲自卡死"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "聪明团队授权只靠这一条分界线：区分决策能不能后悔。",
              startMs: 250,
              endMs: 4979,
              timestampMs: 2614,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "左边叫“双扇门决策”：比如改个界面文案、拿一成流量跑三天测试，就算做错了随时推门退回来，损失几乎为零！这种事全部一分钟放行，让一线自己拍板；",
              startMs: 5229,
              endMs: 18232,
              timestampMs: 11730,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边叫“单向门决策”：比如调整核心定价、动全量资金开关、签重大赔偿合同，一旦做错几乎不可逆转！这类门必须死守；",
              startMs: 18482,
              endMs: 28979,
              timestampMs: 23730,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "再配上 RACI 责任清单锁死谁干活、谁拍板兜底，既有火箭速度，又绝不踩爆大雷！",
              startMs: 29229,
              endMs: 36165,
              timestampMs: 32697,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 授权机制对比"
          from={58 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP44"
          sectionTitle="03 · 一刀切审批 vs 分门分级"
          title="别拿同一条笨流程卡住所有创新，按“后悔代价”分流跑得更快"
          badLabel="✖ 一刀切卡死或放养"
          badSubtitle="要么慢死、要么爆雷"
          badExample="“所有变更不论大小全走 5 级审批！” 或 “完全不管，搞砸自己背！”"
          badNote="后果：好创意全被流程磨死，资金配置大雷照样炸响"
          goodLabel="✔ 双扇门放行 ＋ 单向门锁死"
          goodSubtitle="把重型锁只装在重要门上"
          goodExample="“主图 A/B 测试、文案迭代一线秒批秒上；涉及资金总额、删库等单向门进三重复核。”"
          goodNote="亮点：一线敢冲敢试，核心底线稳如泰山"
          goodCardSec={6.84}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿同一套死板流程管所有事，不是慢成蜗牛就是险象环生；",
              startMs: 250,
              endMs: 6542,
              timestampMs: 3396,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边把轻量试错放进快车道、把不可逆大事锁进安全门，一线跑得欢、老板睡得着！",
              startMs: 6842,
              endMs: 13538,
              timestampMs: 10190,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={73 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP44"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="A. 公众号配图换个字体；B. 删除老用户全部历史订单表。哪一个是绝不能随便下放的单向门？"
          answer="答案：B！删除不可逆的核心数据表是致命单向门，必须双人复核＋备份卡死；换字体随时可改回，大胆放权试！"
          mantra="本集口诀：小错可退大胆放，大事难回死把关！"
          countdownStartSec={4.26}
          answerSec={7.26}
          mantraSec={14.64}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：换海报字体和删除历史订单表，哪一个是绝对不能随便放权的“单向门”？",
              startMs: 250,
              endMs: 6856,
              timestampMs: 3553,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！删库不可逆就是致命单向门必须死卡，换字体随时能改回来，放心让新人干！",
              startMs: 7256,
              endMs: 14238,
              timestampMs: 10747,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：小错可退大胆放，大事难回死把关！",
              startMs: 14638,
              endMs: 18814,
              timestampMs: 16726,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 授权两难配音"
          src={staticFile("audio/ep44-scene1.wav")}
          from={0}
          durationInFrames={547}
          volume={1}
        />
        <Audio
          name="02 双扇门图解配音"
          src={staticFile("audio/ep44-scene2.wav")}
          from={20 * fps}
          durationInFrames={1085}
          volume={1}
        />
        <Audio
          name="03 授权对比配音"
          src={staticFile("audio/ep44-scene3.wav")}
          from={58 * fps}
          durationInFrames={407}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep44-scene4.wav")}
          from={73 * fps}
          durationInFrames={565}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 一线抱怨"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 老板后怕"
          src={staticFile("audio/ui-switch.wav")}
          from={3.23 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={13.07 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 双扇门"
          src={staticFile("audio/ui-switch.wav")}
          from={20.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 单向门"
          src={staticFile("audio/ui-click.wav")}
          from={22.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 RACI锁死"
          src={staticFile("audio/ui-ding.wav")}
          from={24.1 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 一刀切审批"
          src={staticFile("audio/ui-switch.wav")}
          from={58.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 分级跑道"
          src={staticFile("audio/ui-ding.wav")}
          from={64.84 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={77.26 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={78.26 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={79.26 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={80.26 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={87.64 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
