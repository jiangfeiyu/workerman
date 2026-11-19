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
import { FallacyDiagram, type FallacyMode } from "../components/FallacyDiagram";

type SceneFallacyProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: FallacyMode;
  readonly leftTitle: string;
  readonly leftDetail: string;
  readonly rightTitle: string;
  readonly rightDetail: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_FALLACY_CAPTIONS: Caption[] = [
  {
    text: "用逻辑透镜拆穿常见职场诡辩套路。",
    startMs: 250,
    endMs: 3600,
    timestampMs: 1925,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneFallacyInner: React.FC<SceneFallacyProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
  mode,
  leftTitle,
  leftDetail,
  rightTitle,
  rightDetail,
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
            name="Fallacy badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Fallacy title"
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
          <FallacyDiagram
            name="Fallacy diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            leftTitle={leftTitle}
            leftDetail={leftDetail}
            rightTitle={rightTitle}
            rightDetail={rightDetail}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Fallacy captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_FALLACY_CAPTIONS}
      />
    </>
  );
};

export const SceneFallacy = Interactive.create({
  Component: SceneFallacyInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP05", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 谬误透视镜",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#F77622",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "稻草人 + 滑坡谬误：先歪曲你的话，再用极端后果吓唬你",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "strawman-slippery",
      description: "Fallacy diagram mode",
      variants: {
        "strawman-slippery": {},
        "circle-authority": {},
        "correlation-bias": {},
        spectrum: {},
      },
    },
    leftTitle: {
      type: "string",
      default: "原话：一期先暂缓非核心弹窗",
      description: "Left primary text",
    },
    leftDetail: {
      type: "string",
      default: "假靶子：你根本不管用户转化！",
      description: "Left detail text",
    },
    rightTitle: {
      type: "string",
      default: "砍一个弹窗",
      description: "Right primary text",
    },
    rightDetail: {
      type: "string",
      default: "项目肯定黄了！",
      description: "Right detail text",
    },
    summaryCaption: {
      type: "string",
      default: "核心破局：扶正原话靶子，切断无依据滑坡",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
