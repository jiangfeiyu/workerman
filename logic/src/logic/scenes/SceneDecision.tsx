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
  DecisionDiagram,
  type DecisionMode,
} from "../components/DecisionDiagram";

type SceneDecisionProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: DecisionMode;
  readonly block1Title: string;
  readonly block1Body: string;
  readonly block2Title: string;
  readonly block2Body: string;
  readonly block3Title: string;
  readonly block3Body: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_DECISION_CAPTIONS: Caption[] = [
  {
    text: "用逻辑拆解复杂决策，找到最关键的杠杆点。",
    startMs: 250,
    endMs: 3600,
    timestampMs: 1925,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneDecisionInner: React.FC<SceneDecisionProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
  mode,
  block1Title,
  block1Body,
  block2Title,
  block2Body,
  block3Title,
  block3Body,
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
            name="Decision badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Decision title"
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
          <DecisionDiagram
            name="Decision diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            block1Title={block1Title}
            block1Body={block1Body}
            block2Title={block2Title}
            block2Body={block2Body}
            block3Title={block3Title}
            block3Body={block3Body}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Decision captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_DECISION_CAPTIONS}
      />
    </>
  );
};

export const SceneDecision = Interactive.create({
  Component: SceneDecisionInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP17", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 决策逻辑图解",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "第一性原理 vs 类比思维：别只抄别人表面动作",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "first-principles",
      description: "Decision diagram mode",
      variants: {
        "first-principles": {},
        "issue-tree": {},
        "sunk-cost": {},
        "second-order": {},
      },
    },
    block1Title: { type: "string", default: "照抄大厂仪表盘", description: "Block 1 title" },
    block1Body: { type: "string", default: "大厂成功 ≠ 适合咱们小店老板", description: "Block 1 body" },
    block2Title: { type: "string", default: "回到 10 秒算清盈亏", description: "Block 2 title" },
    block2Body: { type: "string", default: "一张今日收支卡片就够，成本降 90%", description: "Block 2 body" },
    block3Title: { type: "string", default: "核心切入点", description: "Block 3 title" },
    block3Body: { type: "string", default: "优先验证最可疑的一枝", description: "Block 3 body" },
    summaryCaption: {
      type: "string",
      default: "剥掉行业惯例，从底层事实重新推导",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
