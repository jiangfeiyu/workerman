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
  ReasoningDiagram,
  type ReasoningMode,
} from "../components/ReasoningDiagram";

type SceneReasoningProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: ReasoningMode;
  readonly item1Title: string;
  readonly item1Body: string;
  readonly item2Title: string;
  readonly item2Body: string;
  readonly item3Title: string;
  readonly item3Body: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_REASONING_CAPTIONS: Caption[] = [
  {
    text: "结构化拆解让汇报和反驳都有理有据。",
    startMs: 250,
    endMs: 3600,
    timestampMs: 1925,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneReasoningInner: React.FC<SceneReasoningProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
  mode,
  item1Title,
  item1Body,
  item2Title,
  item2Body,
  item3Title,
  item3Body,
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
          gap: 24,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ChapterBadge
            name="Reasoning badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Reasoning title"
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
            marginTop: 12,
          }}
        >
          <ReasoningDiagram
            name="Reasoning diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            item1Title={item1Title}
            item1Body={item1Body}
            item2Title={item2Title}
            item2Body={item2Body}
            item3Title={item3Title}
            item3Body={item3Body}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Reasoning captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_REASONING_CAPTIONS}
      />
    </>
  );
};

export const SceneReasoning = Interactive.create({
  Component: SceneReasoningInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP09", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 结构化逻辑图解",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "MECE 原则：相互独立 + 完全穷尽",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "mece-tree",
      description: "Diagram mode",
      variants: {
        "mece-tree": {},
        "two-locks": {},
        "three-inferences": {},
        reductio: {},
      },
    },
    item1Title: {
      type: "string",
      default: "同层级只用一把尺",
      description: "Card 1 title",
    },
    item1Body: {
      type: "string",
      default: "不要把“设备系统”和“用户身份”混在同一层",
      description: "Card 1 body",
    },
    item2Title: {
      type: "string",
      default: "拼起来严丝合缝 100%",
      description: "Card 2 title",
    },
    item2Body: {
      type: "string",
      default: "加上“其他渠道”，所有分支总和正好等于全集",
      description: "Card 2 body",
    },
    item3Title: {
      type: "string",
      default: "补充维度",
      description: "Card 3 title",
    },
    item3Body: {
      type: "string",
      default: "用于三列推理或归谬第三步",
      description: "Card 3 body",
    },
    summaryCaption: {
      type: "string",
      default: "核心原则：不重叠、不遗漏，汇报结构一眼清晰",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
