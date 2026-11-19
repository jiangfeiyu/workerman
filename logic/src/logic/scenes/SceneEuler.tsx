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
import { EulerDiagram } from "../components/EulerDiagram";

type SceneEulerProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: "subset" | "disjoint" | "overlap";
  readonly outerLabel: string;
  readonly innerLabel: string;
  readonly outerColor: string;
  readonly innerColor: string;
  readonly relationCaption: string;
  readonly noteText: string;
  readonly noteDelaySec?: number;
  readonly captions?: Caption[];
};

const DEFAULT_EULER_CAPTIONS: Caption[] = [
  {
    text: "画两个圈，一秒看清概念之间的逻辑边界。",
    startMs: 250,
    endMs: 3600,
    timestampMs: 1925,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneEulerInner: React.FC<SceneEulerProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
  mode,
  outerLabel,
  innerLabel,
  outerColor,
  innerColor,
  relationCaption,
  noteText,
  noteDelaySec = 6.0,
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
            name="Euler badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Euler title"
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
            marginTop: 4,
          }}
        >
          <EulerDiagram
            name="Euler diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            outerLabel={outerLabel}
            innerLabel={innerLabel}
            outerColor={outerColor}
            innerColor={innerColor}
            relationCaption={relationCaption}
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
          name="Euler note"
          from={noteDelaySec * fps}
          premountFor={fps}
          style={{
            padding: "14px 34px",
            backgroundColor: "#38B764",
            border: "4px solid #F4F4F4",
            boxShadow: "6px 6px 0px #0D0E15",
            color: "#1A1C2C",
            fontSize: 27,
            fontWeight: 800,
            fontFamily:
              '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
            opacity: interpolate(
              frame,
              [noteDelaySec * fps, (noteDelaySec + 0.5) * fps],
              [0, 1],
              {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            translate: interpolate(
              frame,
              [noteDelaySec * fps, (noteDelaySec + 0.7) * fps],
              ["0px 18px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          ★ {noteText}
        </Interactive.Div>
      </div>

      <BasicCaptions
        name="Euler captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_EULER_CAPTIONS}
      />
    </>
  );
};

export const SceneEuler = Interactive.create({
  Component: SceneEulerInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP02", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 欧拉图拆解",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "同一律：同一个词，在同一次对话里只能指同一个意思",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "disjoint",
      description: "Diagram mode",
      variants: {
        subset: {},
        disjoint: {},
        overlap: {},
      },
    },
    outerLabel: {
      type: "string",
      default: "产品说的“优化”：改视觉转化",
      description: "Outer or left label",
    },
    innerLabel: {
      type: "string",
      default: "开发说的“优化”：降接口耗时",
      description: "Inner or right label",
    },
    outerColor: {
      type: "color",
      default: "#41A6F6",
      description: "Outer or left color",
    },
    innerColor: {
      type: "color",
      default: "#38B764",
      description: "Inner or right color",
    },
    relationCaption: {
      type: "string",
      default: "两个不相交的圈，硬用一个词去套，必然鸡同鸭讲",
      description: "Relation caption",
    },
    noteText: {
      type: "string",
      default: "先给模糊词下定义，再讨论怎么做",
      description: "Bottom highlight note",
    },
  } as const satisfies InteractivitySchema,
});
