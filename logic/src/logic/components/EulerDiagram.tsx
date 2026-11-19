import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

type EulerDiagramProps = {
  readonly mode: "subset" | "disjoint" | "overlap";
  readonly outerLabel: string;
  readonly innerLabel: string;
  readonly outerColor: string;
  readonly innerColor: string;
  readonly relationCaption: string;
  readonly style?: React.CSSProperties;
};

const EulerDiagramInner: React.FC<EulerDiagramProps> = ({
  mode,
  outerLabel,
  innerLabel,
  outerColor,
  innerColor,
  relationCaption,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outerProgress = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const innerProgress = interpolate(frame, [0.45 * fps, 1.15 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [0.9 * fps, 1.4 * fps], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isSubset = mode === "subset";
  const isDisjoint = mode === "disjoint";

  // SVG viewBox 960x380
  const outerCx = isSubset ? 480 : isDisjoint ? 270 : 380;
  const outerCy = 185;
  const outerR = isSubset ? 160 : 135;

  const innerCx = isSubset ? 480 : isDisjoint ? 690 : 580;
  const innerCy = isSubset ? 205 : 185;
  const innerR = isSubset ? 92 : 135;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "24px 36px",
        backgroundColor: "#262B44",
        border: "4px solid #F4F4F4",
        boxShadow: "8px 8px 0px #0D0E15",
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        ...style,
      }}
    >
      <svg width="960" height="360" viewBox="0 0 960 360">
        {/* Outer / Left Set */}
        <g opacity={outerProgress}>
          <circle
            cx={outerCx}
            cy={outerCy}
            r={outerR * (0.85 + 0.15 * outerProgress)}
            fill={outerColor}
            fillOpacity={0.22}
            stroke={outerColor}
            strokeWidth={6}
            strokeDasharray={isDisjoint ? "14 8" : undefined}
          />
          <text
            x={outerCx}
            y={isSubset ? outerCy - outerR + 38 : outerCy - 12}
            textAnchor="middle"
            fill="#F4F4F4"
            fontSize={28}
            fontWeight={800}
          >
            {outerLabel}
          </text>
          {!isSubset ? (
            <text
              x={outerCx}
              y={outerCy + 26}
              textAnchor="middle"
              fill={outerColor}
              fontSize={22}
              fontWeight={700}
            >
              集合 A
            </text>
          ) : null}
        </g>

        {/* Inner / Right Set */}
        <g opacity={innerProgress}>
          <circle
            cx={innerCx}
            cy={innerCy}
            r={innerR * (0.85 + 0.15 * innerProgress)}
            fill={innerColor}
            fillOpacity={0.28}
            stroke={innerColor}
            strokeWidth={6}
          />
          <text
            x={innerCx}
            y={isSubset ? innerCy + 8 : innerCy - 12}
            textAnchor="middle"
            fill="#F4F4F4"
            fontSize={28}
            fontWeight={800}
          >
            {innerLabel}
          </text>
          {!isSubset ? (
            <text
              x={innerCx}
              y={innerCy + 26}
              textAnchor="middle"
              fill={innerColor}
              fontSize={22}
              fontWeight={700}
            >
              集合 B
            </text>
          ) : null}
        </g>

        {/* Mode relation indicator */}
        {isDisjoint ? (
          <g opacity={captionOpacity}>
            <rect
              x={448}
              y={156}
              width={64}
              height={52}
              fill="#E43B44"
              stroke="#F4F4F4"
              strokeWidth={4}
            />
            <text
              x={480}
              y={192}
              textAnchor="middle"
              fill="#F4F4F4"
              fontSize={30}
              fontWeight={900}
            >
              ≠
            </text>
          </g>
        ) : null}

        {mode === "overlap" ? (
          <g opacity={captionOpacity}>
            <rect
              x={426}
              y={266}
              width={108}
              height={40}
              fill="#FFCD75"
              stroke="#0D0E15"
              strokeWidth={3}
            />
            <text
              x={480}
              y={294}
              textAnchor="middle"
              fill="#1A1C2C"
              fontSize={22}
              fontWeight={800}
            >
              A ∩ B 交集
            </text>
          </g>
        ) : null}
      </svg>

      <div
        style={{
          opacity: captionOpacity,
          padding: "10px 28px",
          backgroundColor: "#1A1C2C",
          border: "3px solid #FFCD75",
          color: "#FFCD75",
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        {relationCaption}
      </div>
    </div>
  );
};

const eulerDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "subset",
    description: "Set relation mode",
    variants: {
      subset: {},
      disjoint: {},
      overlap: {},
    },
  },
  outerLabel: {
    type: "string",
    default: "必要条件：项目按时上线",
    description: "Outer or left circle label",
  },
  innerLabel: {
    type: "string",
    default: "充分条件：全员按排期交付",
    description: "Inner or right circle label",
  },
  outerColor: {
    type: "color",
    default: "#41A6F6",
    description: "Outer or left circle color",
  },
  innerColor: {
    type: "color",
    default: "#38B764",
    description: "Inner or right circle color",
  },
  relationCaption: {
    type: "string",
    default: "小圈一定在大圈里：满足 A 就能推出 B（充分条件）",
    description: "Relation explanation",
  },
} as const satisfies InteractivitySchema;

export const EulerDiagram = Interactive.create({
  Component: EulerDiagramInner,
  layout: "none",
  schema: eulerDiagramSchema,
});
