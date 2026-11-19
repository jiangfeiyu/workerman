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
  TrendModelDiagram,
  type TrendModelMode,
} from "../components/TrendModelDiagram";

type SceneTrendModelProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: TrendModelMode;
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

const DEFAULT_TREND_CAPTIONS: Caption[] = [
  {
    text: "看懂非线性拐点、相变阈值与信息信噪比，跑赢时代变局。",
    startMs: 250,
    endMs: 3800,
    timestampMs: 2025,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneTrendModelInner: React.FC<SceneTrendModelProps> = ({
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
            name="Trend badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Trend title"
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
          <TrendModelDiagram
            name="Trend diagram"
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
        name="Trend captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_TREND_CAPTIONS}
      />
    </>
  );
};

export const SceneTrendModel = Interactive.create({
  Component: SceneTrendModelInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP57", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · S 曲线拐点",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#41A6F6",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "为什么要在老业务还在赚钱时提前开第二曲线？",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "s-curve",
      description: "Trend model diagram mode",
      variants: {
        "s-curve": {},
        "critical-mass": {},
        "signal-noise": {},
        "jevons-shift": {},
      },
    },
    item1Title: { type: "string", default: "第一曲线爬坡爆发", description: "Item 1 title" },
    item1Body: {
      type: "string",
      default: "主业务进入增长期，现金流充沛",
      description: "Item 1 body",
    },
    item2Title: { type: "string", default: "A 点斜率放缓拐点", description: "Item 2 title" },
    item2Body: {
      type: "string",
      default: "获客成本翻倍，正是启动第二曲线的黄金窗口",
      description: "Item 2 body",
    },
    item3Title: { type: "string", default: "第二曲线无缝接力", description: "Item 3 title" },
    item3Body: {
      type: "string",
      default: "趁老业务还在赚钱时孵化新业务，避免断粮",
      description: "Item 3 body",
    },
    item4Title: { type: "string", default: "核心结论", description: "Item 4 title" },
    item4Body: {
      type: "string",
      default: "死守两端定义权与验收权",
      description: "Item 4 body",
    },
    summaryCaption: {
      type: "string",
      default: "莫等老曲线掉头才转身，在 A 点拐点提前架起第二曲线",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
