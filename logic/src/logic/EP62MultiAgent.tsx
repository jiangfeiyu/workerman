import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, Track, useVideoConfig } from "remotion";
import { PixelProgressBar } from "./components/PixelProgressBar";
import { SceneAgentFlow } from "./scenes/SceneAgentFlow";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneHook } from "./scenes/SceneHook";
import { SceneQuiz } from "./scenes/SceneQuiz";

export const EP62MultiAgent: React.FC = () => {
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
      <Track name="EP62 Scenes">
        <SceneHook
          name="01 AI 自问自答放水现场"
          durationInFrames={21 * fps}
          episodeLabel="EP62"
          sectionTitle="01 · 同框自审放水"
          headline="同一个 AI 又写方案又做质检，为什么经常给自己打出满分？"
          colleagueSender="同事小吴"
          colleagueRole="同框自查"
          colleagueMessage="我刚在同一个对话里让 AI 写完方案，又让它自己检查一遍，它说“逻辑满分没毛病”！"
          bossSender="法务总监"
          bossRole="抓出漏洞"
          bossReply="没毛病？第三页编了一条不存在的法规，第五页预算加起来多了二十万！"
          takeawayText="⚠ 同框上下文会让模型顺着自己编的假设继续圆谎"
          secondBubbleSec={6.83}
          takeawaySec={13.66}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "用 AI 审材料最常见的一个低级失误，叫“让同一个人既当运动员又当裁判员”！",
              startMs: 250,
              endMs: 6576,
              timestampMs: 3413,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "你在同一个窗口让它写完方案，顺嘴问一句“帮我看看有没有错”，它大概率夸自己逻辑完美！",
              startMs: 6826,
              endMs: 13357,
              timestampMs: 10092,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "因为模型会顺着刚才自己编的思路继续圆谎——要抓出真漏洞，必须把角色彻底隔离开！",
              startMs: 13657,
              endMs: 20036,
              timestampMs: 16847,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneAgentFlow
          name="02 多智能体三权分立"
          from={21 * fps}
          durationInFrames={31 * fps}
          episodeLabel="EP62"
          sectionTitle="02 · 多智能体三权分立"
          accentColor="#FFCD75"
          title="角色隔离三权分立：生成者 + 无记忆校验者 + 红队审查官"
          mode="multi-agent-separation"
          item1Title="① 生成者（Maker）"
          item1Body="专心结合业务前提产出完整初稿，不管审核只管把框架搭丰满。"
          item2Title="② 校验者（Checker）"
          item2Body="彻底清空对话记忆，只拿事实源和验收清单冷酷打勾，缺一条直接打回。"
          item3Title="③ 红队（Auditor）"
          item3Body="分饰挑刺老板与法务，不找出至少 3 个致命风险绝不放行。"
          item4Title="隔离核心"
          item4Body="生成与审查绝不共享同一段聊天历史，彻底消灭“左手审右手”！"
          summaryCaption="清空历史上下文做角色隔离，隐蔽错误率直接砍掉九成"
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "搭建靠谱的多智能体流水线，核心秘诀就四个字：三权分立。",
              startMs: 250,
              endMs: 5310,
              timestampMs: 2780,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第一号角色叫“生成者”：只负责根据前提拼命产出初稿；",
              startMs: 5560,
              endMs: 9905,
              timestampMs: 7733,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第二号角色叫“校验者”：彻底清空刚才的聊天记忆，只拿事实来源和验收清单冷酷打勾，缺一条直接打回；",
              startMs: 10155,
              endMs: 18022,
              timestampMs: 14089,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "第三号角色叫“红队审查官”：专门扮演挑刺老板和敌对法务，不找出三个硬伤不准下班！三方互不包庇，错误率直接砍掉九成！",
              startMs: 18272,
              endMs: 29309,
              timestampMs: 23791,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneCompare
          name="03 智能体审查对比"
          from={52 * fps}
          durationInFrames={16 * fps}
          episodeLabel="EP62"
          sectionTitle="03 · AI 质检对比"
          title="同一聊天框自审必放水，清空记忆独立审查才抓硬伤"
          badLabel="✖ 同窗口自产自销"
          badSubtitle="上下文惯性互相包庇"
          badExample="“在刚才写方案的同一对话框里继续输入：请帮我检查一下有没有遗漏或错误？”"
          badNote="问题：被刚生成的历史文字锚定，AI 顺着惯性替自己打圆场"
          goodLabel="✔ 独立会话三权分立"
          goodSubtitle="无记忆隔离冷酷复核"
          goodExample="“新开零历史独立窗口，仅喂入成品正文 + 验收红线清单，命令红队 Agent 逐条找茬。”"
          goodNote="亮点：脱离生成惯性，假法条、算错数和前提漏项瞬间暴露"
          goodCardSec={7.2}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "看对比：左边看似问了一句检查，其实被同一段对话记忆锁死了视角，等于左手审右手；",
              startMs: 250,
              endMs: 6901,
              timestampMs: 3576,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "右边通过清空上下文做角色隔离，让冷酷校验官只认标准不认人，隐藏漏洞一下全被揪了出来！",
              startMs: 7201,
              endMs: 14971,
              timestampMs: 11086,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />

        <SceneQuiz
          name="04 小测与口诀"
          from={68 * fps}
          durationInFrames={21 * fps}
          episodeLabel="EP62"
          sectionTitle="04 · 3 秒随堂小测 & 口诀"
          question="手里只有一个大模型账号或接口，怎么低成本实现“生成者与校验者隔离”，防止自审放水？"
          answer="答案：发起一次全新、不带生成阶段聊天历史的独立对话/API 调用，只传入成品文本 + 独立验收清单冷酷复核！"
          mantra="本集口诀：同框自审必放水，生成校验要分家；清空记忆换视角，三权分立抓硬伤！"
          countdownStartSec={2.06}
          answerSec={5.06}
          mantraSec={12.28}
          style={{ backgroundColor: "transparent" }}
          captions={[
            {
              text: "三秒自测：只用同一个模型，怎么低成本做到“不给自己放水”？",
              startMs: 250,
              endMs: 4660,
              timestampMs: 2455,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "对！新开一条完全不带历史聊天的独立会话，只把成品和硬标准喂给它冷酷复核！",
              startMs: 5060,
              endMs: 11879,
              timestampMs: 8470,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "记住口诀：同框自审必放水，生成校验要分家；清空记忆换视角，三权分立抓硬伤！",
              startMs: 12279,
              endMs: 19622,
              timestampMs: 15951,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
        />
      </Track>

      <Track name="Voiceover">
        <Audio
          name="01 自审放水配音"
          src={staticFile("audio/ep62-scene1.wav")}
          from={0}
          durationInFrames={601}
          volume={1}
        />
        <Audio
          name="02 三权分立配音"
          src={staticFile("audio/ep62-scene2.wav")}
          from={21 * fps}
          durationInFrames={879}
          volume={1}
        />
        <Audio
          name="03 质检对比配音"
          src={staticFile("audio/ep62-scene3.wav")}
          from={52 * fps}
          durationInFrames={449}
          volume={1}
        />
        <Audio
          name="04 小测口诀配音"
          src={staticFile("audio/ep62-scene4.wav")}
          from={68 * fps}
          durationInFrames={589}
          volume={1}
        />
      </Track>

      <Track name="SFX">
        <Audio
          name="01 自信满分"
          src={staticFile("audio/ui-click.wav")}
          from={0.5 * fps}
          durationInFrames={12}
          volume={0.35}
        />
        <Audio
          name="01 法务打脸"
          src={staticFile("audio/ui-switch.wav")}
          from={6.83 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="01 警示提示"
          src={staticFile("audio/ui-whoosh.wav")}
          from={13.66 * fps}
          durationInFrames={5}
          volume={0.35}
        />
        <Audio
          name="02 生成者"
          src={staticFile("audio/ui-click.wav")}
          from={21.5 * fps}
          durationInFrames={12}
          volume={0.3}
        />
        <Audio
          name="02 校验者"
          src={staticFile("audio/ui-switch.wav")}
          from={23.7 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 红队审查官"
          src={staticFile("audio/ui-switch.wav")}
          from={26.5 * fps}
          durationInFrames={10}
          volume={0.3}
        />
        <Audio
          name="02 隔离核心"
          src={staticFile("audio/ui-ding.wav")}
          from={29.5 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="03 同框对比"
          src={staticFile("audio/ui-switch.wav")}
          from={52.8 * fps}
          durationInFrames={10}
          volume={0.35}
        />
        <Audio
          name="03 隔离对比"
          src={staticFile("audio/ui-ding.wav")}
          from={59.2 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 倒计时 3"
          src={staticFile("audio/ui-click.wav")}
          from={70.06 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 2"
          src={staticFile("audio/ui-click.wav")}
          from={71.06 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 倒计时 1"
          src={staticFile("audio/ui-click.wav")}
          from={72.06 * fps}
          durationInFrames={12}
          volume={0.28}
        />
        <Audio
          name="04 揭晓答案"
          src={staticFile("audio/ui-ding.wav")}
          from={73.06 * fps}
          durationInFrames={42}
          volume={0.3}
        />
        <Audio
          name="04 金句口诀"
          src={staticFile("audio/ui-ding.wav")}
          from={80.28 * fps}
          durationInFrames={42}
          volume={0.32}
        />
      </Track>

      <PixelProgressBar />
    </AbsoluteFill>
  );
};
