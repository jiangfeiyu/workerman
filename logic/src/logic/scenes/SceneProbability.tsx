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
  ProbabilityDiagram,
  type ProbabilityMode,
} from "../components/ProbabilityDiagram";

type SceneProbabilityProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: ProbabilityMode;
  readonly item1Title: string;
  readonly item1Body: string;
  readonly item2Title: string;
  readonly item2Body: string;
  readonly item3Title: string;
  readonly item3Body: string;
  readonly item4Title: string;
  readonly item4Body: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_PROBABILITY_CAPTIONS: Caption[] = [
  {
    text: "告别非对即错的极端判断，用概率刻度与真实基数看懂商业数据。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneProbabilityInner: React.FC<SceneProbabilityProps> = ({
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
  item4Title,
  item4Body,
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
            name="Probability badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Probability title"
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
          <ProbabilityDiagram
            name="Probability diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            item1Title={item1Title}
            item1Body={item1Body}
            item2Title={item2Title}
            item2Body={item2Body}
            item3Title={item3Title}
            item3Body={item3Body}
            item4Title={item4Title}
            item4Body={item4Body}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Probability captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_PROBABILITY_CAPTIONS}
      />
    </>
  );
};

export const SceneProbability = Interactive.create({
  Component: SceneProbabilityInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP25", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 贝叶斯更新",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#73EFF7",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "把判断变成 0%~100% 滑块：根据新证据权重动态调刻度",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "bayes-update",
      description: "Probability diagram mode",
      variants: {
        "bayes-update": {},
        "simpson-paradox": {},
        "regression-ev": {},
        "base-rate": {},
      },
    },
    item1Title: { type: "string", default: "① 先验基准（Prior）", description: "Item 1 title" },
    item1Body: { type: "string", default: "行业平均成功率 40%，先以此打底", description: "Item 1 body" },
    item2Title: { type: "string", default: "② 检验新证据权重", description: "Item 2 title" },
    item2Body: { type: "string", default: "竞品砍业务是没市场还是缺钱？", description: "Item 2 body" },
    item3Title: { type: "string", default: "③ 动态微调滑块", description: "Item 3 title" },
    item3Body: { type: "string", default: "查实对方缺钱，把握微调至 35%", description: "Item 3 body" },
    item4Title: { type: "string", default: "④ 小步验证再加权", description: "Item 4 title" },
    item4Body: { type: "string", default: "试跑两周拿到转化数据，更新到 62%", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "概率思考不是非黑即白，而是随证据强弱动态调刻度",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
