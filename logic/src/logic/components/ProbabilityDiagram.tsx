import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type ProbabilityMode =
  | "bayes-update"
  | "simpson-paradox"
  | "regression-ev"
  | "base-rate";

type ProbabilityDiagramProps = {
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
  readonly style?: React.CSSProperties;
};

const ProbabilityDiagramInner: React.FC<ProbabilityDiagramProps> = ({
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
  const s4 = interpolate(frame, [5.4 * fps, 6.1 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated probability slider / bars for Bayes update (40% -> 35% -> 62%)
  const barWidth = interpolate(
    frame,
    [1.8 * fps, 3.8 * fps, 6.0 * fps],
    [40, 35, 62],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%",
        maxWidth: 1380,
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        ...style,
      }}
    >
      {mode === "bayes-update" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              backgroundColor: "#262B44",
              border: "4px solid #73EFF7",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#73EFF7",
              }}
            >
              <span>把握度动态滑块（非 0 即 100 开关 ➔ 连续概率刻度）</span>
              <span style={{ color: "#FFCD75", fontSize: 26 }}>
                当前信心：{Math.round(barWidth)}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 24,
                backgroundColor: "#1A1C2C",
                border: "3px solid #0D0E15",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: barWidth >= 50 ? "#38B764" : "#F77622",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              { op: s1, color: "#41A6F6", title: item1Title, body: item1Body },
              { op: s2, color: "#FFCD75", title: item2Title, body: item2Body },
              { op: s3, color: "#F77622", title: item3Title, body: item3Body },
              { op: s4, color: "#38B764", title: item4Title, body: item4Body },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  opacity: card.op,
                  translate: `0px ${(1 - card.op) * 14}px`,
                  backgroundColor: "#262B44",
                  border: `4px solid ${card.color}`,
                  boxShadow: "6px 6px 0px #0D0E15",
                  padding: "16px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: card.color,
                  }}
                >
                  {card.title}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F4F4F4",
                    lineHeight: 1.45,
                  }}
                >
                  {card.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "simpson-paradox" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 22,
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
              ↑ 分项 A 在涨
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
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
              ↑ 分项 B 也在涨
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item2Body}
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
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
              ↓ 合并总盘反跌！
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item3Body}
            </div>
            <div
              style={{
                marginTop: 6,
                padding: "8px 12px",
                backgroundColor: "#1A1C2C",
                border: "2px solid #FFCD75",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFCD75",
              }}
            >
              真相：{item4Title} · {item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "regression-ev" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ① 识破运气：均值回归
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #41A6F6",
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {item1Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 铁律：{item2Title}（{item2Body}）
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ② 理性下注：期望值 EV = 概率 × 赔率
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#FF6B6B" }}>
              ✖ {item3Title}
            </div>
            <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.45 }}>
              {item3Body}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                fontSize: 22,
                color: "#A7F070",
                fontWeight: 800,
                lineHeight: 1.5,
              }}
            >
              ✔ {item4Title}：{item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "base-rate" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {[
            { op: s1, step: "STEP 1 · 1000 人总盘", color: "#41A6F6", title: item1Title, body: item1Body },
            { op: s2, step: "STEP 2 · 抓出真坏人", color: "#38B764", title: item2Title, body: item2Body },
            { op: s3, step: "STEP 3 · 1% 误杀好人", color: "#F77622", title: item3Title, body: item3Body },
            { op: s4, step: "STEP 4 · 真实命中率", color: "#E43B44", title: item4Title, body: item4Body },
          ].map((col, idx) => (
            <div
              key={idx}
              style={{
                opacity: col.op,
                translate: `0px ${(1 - col.op) * 18}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${col.color}`,
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: col.color }}>
                {col.step}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {col.title}
              </div>
              <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}>
                {col.body}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        style={{
          opacity: s4,
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

const probabilityDiagramSchema = {
  ...Interactive.baseSchema,
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
} as const satisfies InteractivitySchema;

export const ProbabilityDiagram = Interactive.create({
  Component: ProbabilityDiagramInner,
  layout: "none",
  schema: probabilityDiagramSchema,
});
