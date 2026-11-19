import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

type LogicBlockProps = {
  readonly badge: string;
  readonly title: string;
  readonly body: string;
  readonly accentColor: string;
  readonly strikethrough: boolean;
  readonly style?: React.CSSProperties;
};

const LogicBlockInner: React.FC<LogicBlockProps> = ({
  badge,
  title,
  body,
  accentColor,
  strikethrough,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "24px 28px",
        backgroundColor: strikethrough ? "#1F2235" : "#262B44",
        border: `4px solid ${accentColor}`,
        boxShadow: "8px 8px 0px #0D0E15",
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        opacity: interpolate(
          frame,
          [0, 0.5 * fps],
          [0, strikethrough ? 0.72 : 1],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        translate: interpolate(
          frame,
          [0, 0.75 * fps],
          ["0px 22px", "0px 0px"],
          {
            easing: Easing.bezier(0.22, 1, 0.36, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#1A1C2C",
            backgroundColor: accentColor,
            padding: "4px 14px",
            border: "2px solid #0D0E15",
            boxShadow: "3px 3px 0px #0D0E15",
          }}
        >
          {badge}
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#F4F4F4",
            textDecoration: strikethrough ? "line-through" : "none",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          fontSize: 25,
          lineHeight: 1.5,
          color: strikethrough ? "#94A3B8" : "#E2E8F0",
          textDecoration: strikethrough ? "line-through" : "none",
        }}
      >
        {body}
      </div>
    </div>
  );
};

const logicBlockSchema = {
  ...Interactive.baseSchema,
  badge: { type: "string", default: "前提（事实）", description: "Block badge" },
  title: { type: "string", default: "客观数据支撑", description: "Block title" },
  body: {
    type: "string",
    default: "本周线上崩溃率上升至 3.2%，客服收到 48 起卡顿工单。",
    description: "Block content",
  },
  accentColor: {
    type: "color",
    default: "#41A6F6",
    description: "Accent color",
  },
  strikethrough: {
    type: "boolean",
    default: false,
    description: "Cross out as noise",
  },
} as const satisfies InteractivitySchema;

export const LogicBlock = Interactive.create({
  Component: LogicBlockInner,
  layout: "none",
  schema: logicBlockSchema,
});
