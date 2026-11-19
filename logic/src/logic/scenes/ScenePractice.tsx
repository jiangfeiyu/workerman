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
import {
  PracticeDiagram,
  type PracticeMode,
} from "../components/PracticeDiagram";

type ScenePracticeProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: PracticeMode;
  readonly slot1Title: string;
  readonly slot1Body: string;
  readonly slot2Title: string;
  readonly slot2Body: string;
  readonly slot3Title: string;
  readonly slot3Body: string;
  readonly slot4Title: string;
  readonly slot4Body: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_PRACTICE_CAPTIONS: Caption[] = [
  {
    text: "把逻辑工具直接放进高频职场实战场景。",
    startMs: 250,
    endMs: 3600,
    timestampMs: 1925,
    confidence: null,
    pageBreakAfter: true,
  },
];

const ScenePracticeInner: React.FC<ScenePracticeProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
  mode,
  slot1Title,
  slot1Body,
  slot2Title,
  slot2Body,
  slot3Title,
  slot3Body,
  slot4Title,
  slot4Body,
  summaryCaption,
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
          padding: "46px 96px 148px 96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 22,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ChapterBadge
            name="Practice badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Practice title"
            premountFor={fps}
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 800,
              color: "#F4F4F4",
              textShadow: "4px 4px 0px #0D0E15",
              opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {title}
          </Interactive.H2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <PracticeDiagram
            name="Practice diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            slot1Title={slot1Title}
            slot1Body={slot1Body}
            slot2Title={slot2Title}
            slot2Body={slot2Body}
            slot3Title={slot3Title}
            slot3Body={slot3Body}
            slot4Title={slot4Title}
            slot4Body={slot4Body}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Practice captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_PRACTICE_CAPTIONS}
      />
    </>
  );
};

export const ScenePractice = Interactive.create({
  Component: ScenePracticeInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP13", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 实战模型图解",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#FFCD75",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "图尔敏论证四宫格：主张 + 数据 + 依据 + 反驳预判",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "toulmin",
      description: "Practice diagram mode",
      variants: {
        toulmin: {},
        pyramid: {},
        "star-causal": {},
        "meeting-warroom": {},
      },
    },
    slot1Title: { type: "string", default: "① 主张", description: "Slot 1 title" },
    slot1Body: { type: "string", default: "申请 1 名中级测试", description: "Slot 1 body" },
    slot2Title: { type: "string", default: "② 数据", description: "Slot 2 title" },
    slot2Body: { type: "string", default: "上季漏测致损 18 万", description: "Slot 2 body" },
    slot3Title: { type: "string", default: "③ 依据", description: "Slot 3 title" },
    slot3Body: { type: "string", default: "提速 40%，3 个月回本", description: "Slot 3 body" },
    slot4Title: { type: "string", default: "④ 堵反驳", description: "Slot 4 title" },
    slot4Body: { type: "string", default: "已用脚本覆盖 60% 用例", description: "Slot 4 body" },
    summaryCaption: {
      type: "string",
      default: "把成本申请变成帮老板减损赚钱的投资案",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
