import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

type ChapterBadgeProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

const ChapterBadgeInner: React.FC<ChapterBadgeProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 14,
        padding: "10px 22px 10px 12px",
        backgroundColor: "#262B44",
        border: "3px solid #F4F4F4",
        boxShadow: "6px 6px 0px #0D0E15",
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [0, 0.65 * fps],
          ["-20px 0px", "0px 0px"],
          {
            easing: Easing.bezier(0.22, 1, 0.36, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        ...style,
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#1A1C2C",
          backgroundColor: accentColor,
          padding: "4px 14px",
          border: "2px solid #1A1C2C",
          letterSpacing: 1,
        }}
      >
        ★ {episodeLabel}
      </span>
      <span
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#F4F4F4",
          letterSpacing: 0.5,
        }}
      >
        {sectionTitle}
      </span>
    </div>
  );
};

const chapterBadgeSchema = {
  ...Interactive.baseSchema,
  episodeLabel: {
    type: "string",
    default: "EP01",
    description: "Episode badge",
  },
  sectionTitle: {
    type: "string",
    default: "01 · 痛点开场",
    description: "Section title",
  },
  accentColor: {
    type: "color",
    default: "#FFCD75",
    description: "Accent color",
  },
} as const satisfies InteractivitySchema;

export const ChapterBadge = Interactive.create({
  Component: ChapterBadgeInner,
  layout: "none",
  schema: chapterBadgeSchema,
});
