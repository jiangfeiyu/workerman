import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type ReasoningMode =
  | "mece-tree"
  | "two-locks"
  | "three-inferences"
  | "reductio";

type ReasoningDiagramProps = {
  readonly mode: ReasoningMode;
  readonly item1Title: string;
  readonly item1Body: string;
  readonly item2Title: string;
  readonly item2Body: string;
  readonly item3Title: string;
  readonly item3Body: string;
  readonly summaryCaption: string;
  readonly style?: React.CSSProperties;
};

const ReasoningDiagramInner: React.FC<ReasoningDiagramProps> = ({
  mode,
  item1Title,
  item1Body,
  item2Title,
  item2Body,
  item3Title,
  item3Body,
  summaryCaption,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step2 = interpolate(frame, [1.8 * fps, 2.5 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step3 = interpolate(frame, [3.6 * fps, 4.3 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        width: "100%",
        maxWidth: 1380,
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        ...style,
      }}
    >
      {mode === "mece-tree" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ① ME：相互独立（不重叠）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  flex: 1,
                  padding: "14px 12px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #41A6F6",
                  color: "#F4F4F4",
                  fontSize: 22,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                区块 A
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "14px 12px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #38B764",
                  color: "#F4F4F4",
                  fontSize: 22,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                区块 B
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "14px 12px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #FFCD75",
                  color: "#F4F4F4",
                  fontSize: 22,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                区块 C
              </div>
            </div>
            <div style={{ fontSize: 23, color: "#CBD5E1", fontWeight: 600 }}>
              {item1Body}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ② CE：完全穷尽（不遗漏）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#1A1C2C",
                border: "3px solid #F4F4F4",
                padding: 6,
                gap: 4,
              }}
            >
              <div
                style={{
                  flex: 4,
                  height: 36,
                  backgroundColor: "#41A6F6",
                  color: "#1A1C2C",
                  fontSize: 20,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                40%
              </div>
              <div
                style={{
                  flex: 3.5,
                  height: 36,
                  backgroundColor: "#38B764",
                  color: "#1A1C2C",
                  fontSize: 20,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                35%
              </div>
              <div
                style={{
                  flex: 2.5,
                  height: 36,
                  backgroundColor: "#FFCD75",
                  color: "#1A1C2C",
                  fontSize: 20,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                25% = 100%
              </div>
            </div>
            <div style={{ fontSize: 23, color: "#CBD5E1", fontWeight: 600 }}>
              {item2Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "two-locks" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 36,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "30px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              🔒 第一把锁：有效（Valid）
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                padding: "16px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #41A6F6",
                fontSize: 24,
                color: "#E2E8F0",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {item1Body}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "30px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              🔒 第二把锁：真实（Sound）
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div
              style={{
                padding: "16px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                fontSize: 24,
                color: "#E2E8F0",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {item2Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "three-inferences" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                fontWeight: 800,
                color: "#1A1C2C",
                backgroundColor: "#41A6F6",
                padding: "4px 12px",
                border: "2px solid #0D0E15",
              }}
            >
              ① 演绎推理
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
                fontWeight: 600,
              }}
            >
              {item1Body}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                fontWeight: 800,
                color: "#1A1C2C",
                backgroundColor: "#38B764",
                padding: "4px 12px",
                border: "2px solid #0D0E15",
              }}
            >
              ② 归纳推理
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
                fontWeight: 600,
              }}
            >
              {item2Body}
            </div>
          </div>

          <div
            style={{
              opacity: step3,
              translate: `0px ${(1 - step3) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #F77622",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                fontWeight: 800,
                color: "#1A1C2C",
                backgroundColor: "#F77622",
                padding: "4px 12px",
                border: "2px solid #0D0E15",
              }}
            >
              ③ 溯因推理
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
                fontWeight: 600,
              }}
            >
              {item3Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "reductio" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              Step 1 · 先假设对方对
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item1Body}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              Step 2 · 顺推到极限
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item2Body}
            </div>
          </div>

          <div
            style={{
              opacity: step3,
              translate: `0px ${(1 - step3) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FDA4AF" }}>
              Step 3 · 矛盾自动现形
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item3Body}
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          opacity: step3,
          alignSelf: "center",
          padding: "14px 32px",
          backgroundColor: "#1A1C2C",
          border: "3px solid #FFCD75",
          color: "#FFCD75",
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        ★ {summaryCaption}
      </div>
    </div>
  );
};

const reasoningDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "mece-tree",
    description: "Reasoning diagram mode",
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
} as const satisfies InteractivitySchema;

export const ReasoningDiagram = Interactive.create({
  Component: ReasoningDiagramInner,
  layout: "none",
  schema: reasoningDiagramSchema,
});
