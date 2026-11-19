import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type DecisionMode =
  | "first-principles"
  | "issue-tree"
  | "sunk-cost"
  | "second-order";

type DecisionDiagramProps = {
  readonly mode: DecisionMode;
  readonly block1Title: string;
  readonly block1Body: string;
  readonly block2Title: string;
  readonly block2Body: string;
  readonly block3Title: string;
  readonly block3Body: string;
  readonly summaryCaption: string;
  readonly style?: React.CSSProperties;
};

const DecisionDiagramInner: React.FC<DecisionDiagramProps> = ({
  mode,
  block1Title,
  block1Body,
  block2Title,
  block2Body,
  block3Title,
  block3Body,
  summaryCaption,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2 = interpolate(frame, [1.8 * fps, 2.5 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3 = interpolate(frame, [3.6 * fps, 4.3 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        width: "100%",
        maxWidth: 1380,
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        ...style,
      }}
    >
      {mode === "first-principles" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FDA4AF" }}>
              ✖ 类比思维（照抄表象）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {block1Title}
            </div>
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #E43B44",
                fontSize: 24,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {block1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
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
              ✔ 第一性原理（剥到原点重建）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {block2Title}
            </div>
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                fontSize: 24,
                color: "#F4F4F4",
                lineHeight: 1.5,
              }}
            >
              {block2Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "issue-tree" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              opacity: s1,
              padding: "14px 36px",
              backgroundColor: "#E43B44",
              border: "4px solid #F4F4F4",
              boxShadow: "6px 6px 0px #0D0E15",
              fontSize: 28,
              fontWeight: 800,
              color: "#F4F4F4",
            }}
          >
            核心异常：{block1Title}（{block1Body}）
          </div>

          <div
            style={{
              opacity: s2,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24,
            }}
          >
            <div
              style={{
                backgroundColor: "#1F2235",
                border: "3px dashed #64748B",
                padding: "22px 20px",
                opacity: 0.65,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8" }}>
                ✂ 已剪枝 · 流量正常
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#CBD5E1",
                  textDecoration: "line-through",
                }}
              >
                {block2Title}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
                🔥 优先深挖 · 暴跌 28%
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {block3Title}
              </div>
              <div style={{ fontSize: 22, color: "#FFCD75", fontWeight: 700 }}>
                {block3Body}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#1F2235",
                border: "3px dashed #64748B",
                padding: "22px 20px",
                opacity: 0.65,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8" }}>
                ✂ 已剪枝 · 客单价正常
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#CBD5E1",
                  textDecoration: "line-through",
                }}
              >
                {block2Body}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === "sunk-cost" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: s1 * 0.72,
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#1F2235",
              border: "4px dashed #64748B",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8" }}>
              ◀ 今天之前：沉没成本（清零不看）
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#CBD5E1",
                textDecoration: "line-through",
              }}
            >
              {block1Title}
            </div>
            <div style={{ fontSize: 23, color: "#94A3B8", lineHeight: 1.5 }}>
              {block1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ▶ 今天之后：机会成本（只比未来增量）
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#FDA4AF" }}>
              {block2Title}（{block2Body}）
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                fontSize: 26,
                fontWeight: 800,
                color: "#FFCD75",
              }}
            >
              ✔ {block3Title}：{block3Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "second-order" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              第 1 阶 · 眼前收益
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {block1Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {block1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #F77622",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              第 2 阶 · 群体反应
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {block2Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {block2Body}
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FDA4AF" }}>
              第 3 阶 · 长期反噬
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {block3Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {block3Body}
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          opacity: s3,
          alignSelf: "center",
          padding: "12px 32px",
          backgroundColor: "#1A1C2C",
          border: "3px solid #FFCD75",
          color: "#FFCD75",
          fontSize: 25,
          fontWeight: 800,
        }}
      >
        ★ {summaryCaption}
      </div>
    </div>
  );
};

const decisionDiagramSchema = {
  ...Interactive.baseSchema,
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
} as const satisfies InteractivitySchema;

export const DecisionDiagram = Interactive.create({
  Component: DecisionDiagramInner,
  layout: "none",
  schema: decisionDiagramSchema,
});
