import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAgentFlow } from "./scenes/SceneAgentFlow";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP63RAGHygiene: React.FC = () => {
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
      <Track name="EP63 Scenes">
        <SceneHook
          name="01 知识库污染翻车现场"
          durationInFrames={20 * fps}
          episodeLabel="EP63"
          sectionTitle="01 · 知识库垃圾进出"
          headline="接了企业全部网盘知识库，为什么 AI 还是张嘴就答错？"
          colleagueSender="业务员工"
          colleagueRole="质疑知识库"
          colleagueMessage="知识库不是全接 AI 了吗？为什么我问今年出差补贴，它按三年前作废旧规给我算？"
          bossSender="知识库运维"
          bossRole="苦笑解释"
          bossReply="网盘里把 2021 草稿、2023 修订和最新版全塞进去了，AI 自己也蒙圈啊！"
          takeawayText="⚠ Garbage In, Garbage Out：旧草稿和冲突口径全塞进去，AI 必胡说"
          secondBubbleSec={6.66}
          takeawaySec={13.51}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "很多公司花大价钱搭完企业知识库，结果用起来发现 AI 还是在胡说八道！",
              startMs: 250,
              endMs: 6414,
              timestampMs: 3332,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "一问报销制度它翻出三年前的作废草稿，一问产品功能它把砍掉的方案吹成现货！",
              startMs: 6664,
              endMs: 13206,
              timestampMs: 9935,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "模型没有偷懒，是因为你往它的脑子里倒了一堆互相打架的过期垃圾！",
              startMs: 13506,
              endMs: 18610,
              timestampMs: 16058,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAgentFlow
          name="02 RAG 逻辑清洗三板斧"
          from={20 * fps}
          durationInFrames={33 * fps}
          episodeLabel="EP63"
          sectionTitle="02 · RAG 逻辑清洗"
          accentColor="#41A6F6"
          title="知识库入库前必过三道清洗槽：清时效 + 统一律 + 锁边界"
          mode="rag-hygiene"
          item1Title="① 砍掉过期与草稿"
          item1Body="只准“正式生效”文件入主库，过期与废案一律踢出或标红作废"
          item2Title="② 同一律消解冲突"
          item2Body="销售和财务对同名指标口径打架时，强制指定唯一权威主源"
          item3Title="③ 切片焊死大前提"
          item3Body="切块（Chunk）必须携带父级标题与适用范围，防断章取义"
          item4Title="清洗铁律"
          item4Body="知识库宁可少而准，绝不大杂烩！每一条切片都要可溯源、无歧义"
          summaryCaption="先把过期件、冲突口径和断章切片洗干净，RAG 才会真正准"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "要治好知识库“垃圾进、垃圾出”的毛病，入库前必须过这三道逻辑清洗槽。",
              startMs: 250,
              endMs: 5938,
              timestampMs: 3094,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一道砍时效：凡是过期的、未定稿的、或者被新文件取代的，统统踢出主库或者打上作废标签；",
              startMs: 6188,
              endMs: 13933,
              timestampMs: 10061,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二道统一律：当销售文档和财务文档对同一个词定义打架时，必须定死唯一权威主源，不能两个都留；",
              startMs: 14183,
              endMs: 22052,
              timestampMs: 18118,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三道锁切块边界：切片时把标题和前提条件死死焊在每一段上面，防止模型把“例外条款”断章取义当成主规则！",
              startMs: 22302,
              endMs: 31806,
              timestampMs: 27054,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 知识库建设对比"
          from={53 * fps}
          durationInFrames={17 * fps}
          episodeLabel="EP63"
          sectionTitle="03 · 知识库建设对比"
          title="少搞“网盘全量一把梭”，多做入库前的口径清洗"
          badLabel="✖ 网盘全量一把梭"
          badSubtitle="新旧草稿混成大杂烩"
          badExample="“把过去 5 年所有 Word、PPT 和群聊天记录全导入知识库，越全越好！”"
          badNote="问题：过期制度和废案不断被搜出，员工根本不敢信 AI 答案"
          goodLabel="✔ 结构化清洗入库"
          goodSubtitle="主源唯一 + 切片带前提"
          goodExample="“只入库已发布生效主文档；标注生效时间与唯一部门口径；切片强制附带上级前提。”"
          goodNote="亮点：每一句检索回答精准可溯源，真正替代人工反复翻制度"
          goodCardSec={7.08}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边贪多求全一股脑全塞进去，知识库直接变成大型噪音垃圾场；",
              startMs: 250,
              endMs: 6778,
              timestampMs: 3514,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边坚持宁缺毋滥，先把作废文件、冲突口径和断章切片洗干净，AI 检索出来的每句话才敢直接当标准用！",
              startMs: 7078,
              endMs: 15991,
              timestampMs: 11535,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={70 * fps}
          durationInFrames={25 * fps}
          episodeLabel="EP63"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="切片时把“【仅限海外区】退货需在 30 天内”从冒号后砍成两块，国内用户提问时 AI 会犯啥错？"
          answer="答案：前提丢失导致规则越界！AI 会拿着“30 天退货”误导国内用户，所以切片必须强制绑定父级大前提！"
          mantra="本集口诀：垃圾进去垃圾出来，入库先清过期件；定死权威主口径，切片别丢大前提！"
          countdownStartSec={4.44}
          answerSec={7.44}
          mantraSec={16.91}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：切片时把“仅限海外区”四个字和后面的退货规则切分开了，会出啥事故？",
              startMs: 250,
              endMs: 7037,
              timestampMs: 3644,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！前提丢了！AI 会拿着海外区的三十天规则去忽悠国内客户！切块时必须带上父级大前提！",
              startMs: 7437,
              endMs: 16507,
              timestampMs: 11972,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：垃圾进去垃圾出来，入库先清过期件；定死权威主口径，切片别丢大前提！",
              startMs: 16907,
              endMs: 23803,
              timestampMs: 20355,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 知识库翻车配音"
          src={staticFile("audio/ep63-scene1.wav")}
          from={0}
          durationInFrames={558}
          volume={1}
        />
        <Audio
          name="02 RAG清洗配音"
          src={staticFile("audio/ep63-scene2.wav")}
          from={20 * fps}
          durationInFrames={954}
          volume={1}
        />
        <Audio
          name="03 建设对比配音"
          src={staticFile("audio/ep63-scene3.wav")}
          from={53 * fps}
          durationInFrames={480}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep63-scene4.wav")}
          from={70 * fps}
          durationInFrames={714}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 员工疑惑"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 运维苦笑"
          src={staticFile("audio/ui-switch.wav")}
          from={6.66 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={13.51 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 砍时效"
          src={staticFile("audio/ui-switch.wav")}
          from={20.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 统一律"
          src={staticFile("audio/ui-click.wav")}
          from={22.7 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 锁切片边界"
          src={staticFile("audio/ui-click.wav")}
          from={25.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 清洗铁律"
          src={staticFile("audio/ui-ding.wav")}
          from={28.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 网盘对比"
          src={staticFile("audio/ui-switch.wav")}
          from={53.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 清洗对比"
          src={staticFile("audio/ui-ding.wav")}
          from={60.08 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={74.44 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={75.44 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={76.44 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={77.44 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={86.91 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
