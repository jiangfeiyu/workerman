import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";
import { SceneSystemLoop } from "./scenes/SceneSystemLoop";

export const EP36GoodhartKpi: React.FC = () => {
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
      <Track name="EP36 Scenes">
        <SceneHook
          name="01 指标全绿口碑稀烂"
          durationInFrames={17 * fps}
          episodeLabel="EP36"
          sectionTitle="01 · 刷 KPI 失真现场"
          headline="周报所有 KPI 满分飘红，真实客户却气到退会员——为什么？"
          colleagueSender="客服组长"
          colleagueRole="数字满分"
          colleagueMessage="老板，咱们把“单通电话解决时长”压进 60 秒以内了，全组指标满分飘红！"
          bossSender="客户投诉"
          bossRole="直接退会"
          bossReply="什么破客服，刚讲两句还没解决就借口断线挂电话，气得我直接退会员！"
          takeawayText="⚠ 当一个好指标变成硬考核目标时，它就会被人刷烂（古德哈特定律）"
          secondBubbleSec={3.84}
          takeawaySec={9.09}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "公司管理里最荒诞的一幕每天都在上演：",
              startMs: 250,
              endMs: 3588,
              timestampMs: 1919,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "周报上所有 KPI 全线飘绿达标，真实用户口碑却稀烂无比！",
              startMs: 3838,
              endMs: 8785,
              timestampMs: 6311,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "为什么原本挺好的衡量尺子，一拿去发奖金就彻底失真了？这就是“古德哈特定律”！",
              startMs: 9085,
              endMs: 15686,
              timestampMs: 12385,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneSystemLoop
          name="02 古德哈特定律图解"
          from={17 * fps}
          durationInFrames={30 * fps}
          episodeLabel="EP36"
          sectionTitle="02 · 古德哈特定律"
          accentColor="#E43B44"
          title="凡是“单考一个数字”，员工就会按最低成本去“凑数字”"
          mode="goodhart-kpi"
          item1Title="初衷：观察“单通解决时长”"
          item1Body="原本是个很好的效率参考尺，反映客服熟练度"
          item2Title="异化：跟奖金和末位淘汰强绑定"
          item2Body="人开始用最低成本刷数：故意切碎问题或直接秒挂疑难电话"
          item3Title="反噬：数字满分，用户全跑光"
          item3Body="考代码行数产垃圾代码、考提 Bug 数就专门挑错别字凑水单"
          item4Title="解药：核心指标 ＋ 反向护栏"
          item4Body="考响应速度的同时绑定“一次解决率＋差评红线”，堵死作弊空间"
          summaryCaption="指标永远成对出现：效率指标必须搭配质量护栏，才不会被刷变形"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "任何好指标一旦变成硬考核，都会走完这四步歪路。",
              startMs: 250,
              endMs: 4421,
              timestampMs: 2335,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一步初衷很对：你想用通话时长衡量客服效率；",
              startMs: 4671,
              endMs: 9247,
              timestampMs: 6959,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二步把它绑定奖金后，人自然会挑最省事的路径走——故意把复杂客诉切碎或秒挂电话；",
              startMs: 9497,
              endMs: 16372,
              timestampMs: 12934,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三步数字看着飘红，用户却被逼走，真目标反而塌了；",
              startMs: 16622,
              endMs: 20985,
              timestampMs: 18803,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "唯一解药是“核心指标加反向护栏”：考响应速度的同时，必须把用户好评率作为一票否决护栏！",
              startMs: 21235,
              endMs: 28268,
              timestampMs: 24751,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 考核设计对比"
          from={47 * fps}
          durationInFrames={15 * fps}
          episodeLabel="EP36"
          sectionTitle="03 · 单鞭考核 vs 护栏配对"
          title="定指标就像做天平：左边压速度，右边就必须压质量护栏"
          badLabel="✖ 单一数字硬压"
          badSubtitle="逼出全员刷水造假"
          badExample="“下月研发考代码行数、测试考提单总数、客服考 60 秒内挂机，谁差扣绩效！”"
          badNote="后果：最老实干正事的人吃亏，会刷数字的摸鱼怪拿高分"
          goodLabel="✔ 成果 ＋ 反向护栏制衡"
          goodSubtitle="让投机刷数直接无效"
          goodExample="“客服考响应速度（效率），同步绑定‘一次解决率 ≥ 85% 与零挂断红线（护栏）’，刷挂断直接倒扣！”"
          goodNote="亮点：堵死投机漏洞，让踏实把问题解决好成为唯一高分路线"
          goodCardSec={5.88}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边拿单根鞭子乱抽，聪明员工全去琢磨怎么应付数字；",
              startMs: 250,
              endMs: 5580,
              timestampMs: 2915,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边用一对相互制衡的尺子把守底线，想刷快就过不了质量关，只能老老实实把事办好！",
              startMs: 5880,
              endMs: 13166,
              timestampMs: 9523,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={62 * fps}
          durationInFrames={20 * fps}
          episodeLabel="EP36"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="某公司考核内容运营“每月必须写满 30 篇长文”，结果全员把 1 篇干货拆成 5 篇水文凑数。缺了什么？"
          answer="答案：缺了“阅读完播率、收藏转化率”等质量护栏指标！只数篇数不卡质量，团队必然沦为水文制造机。"
          mantra="本集口诀：单考一数必被刷，配好护栏再发奖！"
          countdownStartSec={4.9}
          answerSec={7.9}
          mantraSec={14.35}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：考核内容运营每月必须写满三十篇，结果全员都在注水拆文，缺了什么？",
              startMs: 250,
              endMs: 7499,
              timestampMs: 3874,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！光考篇数不设阅读完播或转化护栏，逼着大家批量制造垃圾！",
              startMs: 7899,
              endMs: 13952,
              timestampMs: 10925,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：单考一数必被刷，配好护栏再发奖！",
              startMs: 14352,
              endMs: 18234,
              timestampMs: 16293,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 指标失真现场配音"
          src={staticFile("audio/ep36-scene1.wav")}
          from={0}
          durationInFrames={471}
          volume={1}
        />
        <Audio
          name="02 古德哈特定律配音"
          src={staticFile("audio/ep36-scene2.wav")}
          from={17 * fps}
          durationInFrames={849}
          volume={1}
        />
        <Audio
          name="03 考核对比配音"
          src={staticFile("audio/ep36-scene3.wav")}
          from={47 * fps}
          durationInFrames={395}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep36-scene4.wav")}
          from={62 * fps}
          durationInFrames={548}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 组长报喜"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 客户爆怒"
          src={staticFile("audio/ui-switch.wav")}
          from={3.84 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={9.09 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 初衷"
          src={staticFile("audio/ui-switch.wav")}
          from={17.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 动作变形"
          src={staticFile("audio/ui-click.wav")}
          from={19.3 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 真目标塌方"
          src={staticFile("audio/ui-click.wav")}
          from={21.1 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 反向护栏"
          src={staticFile("audio/ui-ding.wav")}
          from={22.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 单鞭考核"
          src={staticFile("audio/ui-switch.wav")}
          from={47.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 护栏制衡"
          src={staticFile("audio/ui-ding.wav")}
          from={52.88 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={66.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={67.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={68.9 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={69.9 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={76.35 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
