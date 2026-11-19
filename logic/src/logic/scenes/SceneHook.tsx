import type { Caption } from "@remotion/captions";
import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { BasicCaptions } from "../components/basic-captions.element";
import { ChapterBadge } from "../components/ChapterBadge";
import { ChatBubble } from "../components/ChatBubble";

type SceneHookProps = {
  readonly episodeLabel?: string;
  readonly sectionTitle?: string;
  readonly headline: string;
  readonly colleagueSender?: string;
  readonly colleagueRole?: string;
  readonly colleagueMessage: string;
  readonly bossSender?: string;
  readonly bossRole?: string;
  readonly bossReply: string;
  readonly takeawayText?: string;
  readonly secondBubbleSec?: number;
  readonly takeawaySec?: number;
  readonly captions?: Caption[];
};

const DEFAULT_HOOK_CAPTIONS: Caption[] = [
  {
    text: "辛辛苦苦在群里打了两百字汇报问题，",
    startMs: 250,
    endMs: 3027,
    timestampMs: 1638,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "老板却只回了一句：所以结论呢？",
    startMs: 3277,
    endMs: 5770,
    timestampMs: 4523,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "问题出在：你发的是流水账，不是论证。",
    startMs: 6070,
    endMs: 9167,
    timestampMs: 7618,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneHookInner: React.FC<SceneHookProps> = ({
  episodeLabel = "EP01",
  sectionTitle = "01 · 职场翻车现场",
  headline,
  colleagueSender = "同事小张",
  colleagueRole = "项目群发言",
  colleagueMessage,
  bossSender = "老板",
  bossRole = "灵魂追问",
  bossReply,
  takeawayText = "⚠ 话很长，但缺少一根“逻辑线”把原因和结论连起来",
  secondBubbleSec = 3.3,
  takeawaySec = 6.1,
  captions,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "48px 96px 148px 96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 28,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <ChapterBadge
            name="Hook badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor="#FFCD75"
          />

          <Interactive.H1
            name="Hook headline"
            premountFor={fps}
            style={{
              margin: 0,
              fontSize: 58,
              fontWeight: 800,
              color: "#F4F4F4",
              lineHeight: 1.25,
              textShadow: "4px 4px 0px #0D0E15",
              opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [0, 0.75 * fps],
                ["0px 18px", "0px 0px"],
                {
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            {headline}
          </Interactive.H1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 28,
            marginTop: 12,
          }}
        >
          <ChatBubble
            name="Colleague message"
            from={0.5 * fps}
            premountFor={fps}
            sender={colleagueSender}
            role={colleagueRole}
            message={colleagueMessage}
            align="left"
            avatarColor="#41A6F6"
            bubbleColor="#262B44"
            textColor="#F4F4F4"
          />

          <ChatBubble
            name="Boss reply"
            from={secondBubbleSec * fps}
            premountFor={fps}
            sender={bossSender}
            role={bossRole}
            message={bossReply}
            align="right"
            avatarColor="#FFCD75"
            bubbleColor="#333C57"
            textColor="#FFCD75"
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 148,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Hook takeaway"
          from={takeawaySec * fps}
          premountFor={fps}
          style={{
            padding: "16px 34px",
            backgroundColor: "#E43B44",
            border: "4px solid #F4F4F4",
            boxShadow: "6px 6px 0px #0D0E15",
            color: "#F4F4F4",
            fontSize: 28,
            fontWeight: 800,
            fontFamily:
              '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
            opacity: interpolate(
              frame,
              [takeawaySec * fps, (takeawaySec + 0.6) * fps],
              [0, 1],
              {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            translate: interpolate(
              frame,
              [takeawaySec * fps, (takeawaySec + 0.8) * fps],
              ["0px 20px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          {takeawayText}
        </Interactive.Div>
      </div>

      <BasicCaptions
        name="Hook captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_HOOK_CAPTIONS}
      />
    </>
  );
};

export const SceneHook = Interactive.create({
  Component: SceneHookInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP01", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "01 · 职场翻车现场",
      description: "Section title",
    },
    headline: {
      type: "string",
      default: "为什么写了 500 字汇报，老板还是问“结论呢”？",
      description: "Headline",
    },
    colleagueSender: {
      type: "string",
      default: "同事小张",
      description: "First sender",
    },
    colleagueRole: {
      type: "string",
      default: "项目群发言",
      description: "First role",
    },
    colleagueMessage: {
      type: "string",
      default:
        "最近大家反馈新版本很卡，我昨晚自己用也闪退了两次，而且竞品昨天刚上了新功能。所以我们这周必须暂停开发新需求，全员修 Bug！",
      description: "Colleague message",
    },
    bossSender: {
      type: "string",
      default: "老板",
      description: "Second sender",
    },
    bossRole: {
      type: "string",
      default: "灵魂追问",
      description: "Second role",
    },
    bossReply: {
      type: "string",
      default: "等等…竞品上新功能和咱们修 Bug 有啥关系？到底多卡？要停几天？",
      description: "Boss reply",
    },
    takeawayText: {
      type: "string",
      default: "⚠ 话很长，但缺少一根“逻辑线”把原因和结论连起来",
      description: "Takeaway banner",
    },
  } as const satisfies InteractivitySchema,
});
