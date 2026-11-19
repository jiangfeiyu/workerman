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
  ExperimentDiagram,
  type ExperimentMode,
} from "../components/ExperimentDiagram";

type SceneExperimentProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: ExperimentMode;
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

const DEFAULT_EXPERIMENT_CAPTIONS: Caption[] = [
  {
    text: "用实证对照思维补齐分母，踢掉伪归因与假显著。",
    startMs: 250,
    endMs: 3800,
    timestampMs: 2025,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneExperimentInner: React.FC<SceneExperimentProps> = ({
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
            name="Experiment badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Experiment title"
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
          <ExperimentDiagram
            name="Experiment diagram"
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
        name="Experiment captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_EXPERIMENT_CAPTIONS}
      />
    </>
  );
};

export const SceneExperiment = Interactive.create({
  Component: SceneExperimentInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP49", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 实证对照图解",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "补齐沉默分母：别把巧合当成成功密码",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "survivor-bias",
      description: "Experiment diagram mode",
      variants: {
        "survivor-bias": {},
        counterfactual: {},
        "ab-traps": {},
        "occam-falsify": {},
      },
    },
    item1Title: {
      type: "string",
      default: "只看存活的 3 家爆款",
      description: "Item 1 title",
    },
    item1Body: {
      type: "string",
      default: "误把共同特征当成必胜密码",
      description: "Item 1 body",
    },
    item2Title: {
      type: "string",
      default: "拉齐 100 家完整分母",
      description: "Item 2 title",
    },
    item2Body: {
      type: "string",
      default: "97 家用同款做法照样亏钱关门",
      description: "Item 2 body",
    },
    item3Title: {
      type: "string",
      default: "真差异过滤",
      description: "Item 3 title",
    },
    item3Body: {
      type: "string",
      default: "找成功组有、失败组没有的核心门槛",
      description: "Item 3 body",
    },
    item4Title: {
      type: "string",
      default: "真实 ROI",
      description: "Item 4 title",
    },
    item4Body: {
      type: "string",
      default: "负收益",
      description: "Item 4 body",
    },
    summaryCaption: {
      type: "string",
      default: "补齐沉默分母与空白对照组，才算看清真实因果",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
