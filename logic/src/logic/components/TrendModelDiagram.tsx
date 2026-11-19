import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type TrendModelMode =
  | "s-curve"
  | "critical-mass"
  | "signal-noise"
  | "jevons-shift";

type TrendModelDiagramProps = {
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
  readonly style?: React.CSSProperties;
};

const TrendModelDiagramInner: React.FC<TrendModelDiagramProps> = ({
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
  const s2 = interpolate(frame, [2.2 * fps, 2.9 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3 = interpolate(frame, [5.0 * fps, 5.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4 = interpolate(frame, [8.0 * fps, 8.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boilProgress = interpolate(frame, [2.0 * fps, 6.0 * fps], [20, 100], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {mode === "s-curve" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 26,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              opacity: s1,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              📈 双 S 曲线接力图（A 点斜率放缓即启动）
            </div>
            <svg width="100%" height="230" viewBox="0 0 600 230">
              <line
                x1="30"
                y1="200"
                x2="570"
                y2="200"
                stroke="#64748B"
                strokeWidth="3"
              />
              <line
                x1="30"
                y1="20"
                x2="30"
                y2="200"
                stroke="#64748B"
                strokeWidth="3"
              />
              <path
                d="M 40 190 C 140 190, 160 65, 310 60 C 390 58, 430 85, 490 120"
                fill="none"
                stroke="#41A6F6"
                strokeWidth="6"
              />
              <path
                d="M 250 192 C 330 192, 360 80, 540 30"
                fill="none"
                stroke="#38B764"
                strokeWidth="6"
                strokeDasharray={s3 > 0.1 ? "none" : "10 8"}
                opacity={s2}
              />
              <circle
                cx="275"
                cy="66"
                r="11"
                fill="#FFCD75"
                stroke="#0D0E15"
                strokeWidth="3"
              />
              <text
                x="245"
                y="42"
                fill="#FFCD75"
                fontSize="20"
                fontWeight="800"
              >
                A 点拐点（尚在盈利）
              </text>
              <text
                x="415"
                y="148"
                fill="#FDA4AF"
                fontSize="18"
                fontWeight="800"
              >
                第一曲线下滑
              </text>
              <text
                x="410"
                y="26"
                fill="#A7F070"
                fontSize="19"
                fontWeight="800"
              >
                第二曲线接棒跃升
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                op: s1,
                color: "#41A6F6",
                tagColor: "#73EFF7",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                color: "#FFCD75",
                tagColor: "#FFCD75",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                color: "#38B764",
                tagColor: "#A7F070",
                title: item3Title,
                body: item3Body,
              },
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
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontSize: 23,
                    fontWeight: 800,
                    color: card.tagColor,
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: 20, color: "#F4F4F4", lineHeight: 1.45 }}>
                  {card.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "critical-mass" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 26,
            }}
          >
            <div
              style={{
                opacity: s1,
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#1F2235",
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FDA4AF" }}>
                ✖ 撒胡椒面：30 城各烧到 20°C
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item1Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item1Body}
              </div>
              <div
                style={{
                  height: 24,
                  width: "100%",
                  backgroundColor: "#1A1C2C",
                  border: "2px solid #0D0E15",
                }}
              >
                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    backgroundColor: "#E43B44",
                  }}
                />
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#FDA4AF" }}>
                低于临界密度 ➔ 全部冷水沉没
              </div>
            </div>

            <div
              style={{
                opacity: s2,
                translate: `0px ${(1 - s2) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#A7F070" }}>
                ✔ 单点集中：1 个核心区冲破 100°C
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item2Body}
              </div>
              <div
                style={{
                  height: 24,
                  width: "100%",
                  backgroundColor: "#1A1C2C",
                  border: "2px solid #0D0E15",
                }}
              >
                <div
                  style={{
                    width: `${Math.round(boilProgress)}%`,
                    height: "100%",
                    backgroundColor:
                      boilProgress >= 98 ? "#38B764" : "#FFCD75",
                  }}
                />
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#A7F070" }}>
                达到 {Math.round(boilProgress)}°C ➔ 供需自循环沸腾！
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #41A6F6",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 210,
                backgroundColor: "#41A6F6",
                color: "#1A1C2C",
                fontSize: 21,
                fontWeight: 800,
                padding: "6px 14px",
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              {item3Title}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#F4F4F4" }}>
              {item3Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "signal-noise" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 26,
            }}
          >
            <div
              style={{
                opacity: s1,
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#1F2235",
                border: "4px solid #64748B",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#94A3B8" }}>
                🗑 噪音层（过滤折叠 90%）
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {item1Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.55 }}>
                {item1Body}
              </div>
            </div>

            <div
              style={{
                opacity: s2,
                translate: `0px ${(1 - s2) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#A7F070" }}>
                📡 信号层（置顶直达拍板）
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#F4F4F4", lineHeight: 1.55 }}>
                {item2Body}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "18px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 210,
                backgroundColor: "#FFCD75",
                color: "#1A1C2C",
                fontSize: 21,
                fontWeight: 800,
                padding: "6px 14px",
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              {item3Title}
            </span>
            <span style={{ fontSize: 23, fontWeight: 700, color: "#F4F4F4" }}>
              {item3Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "jevons-shift" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 22,
            }}
          >
            {[
              {
                op: s1,
                tag: "上游 · 高价值涨价",
                color: "#38B764",
                tagColor: "#A7F070",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                tag: "中游 · 价格趋近于零",
                color: "#E43B44",
                tagColor: "#FDA4AF",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                tag: "下游 · 高价值涨价",
                color: "#41A6F6",
                tagColor: "#73EFF7",
                title: item3Title,
                body: item3Body,
              },
            ].map((col, idx) => (
              <div
                key={idx}
                style={{
                  opacity: col.op,
                  translate: `0px ${(1 - col.op) * 18}px`,
                  backgroundColor: "#262B44",
                  border: `4px solid ${col.color}`,
                  boxShadow: "8px 8px 0px #0D0E15",
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: col.tagColor,
                  }}
                >
                  {col.tag}
                </div>
                <div
                  style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}
                >
                  {col.title}
                </div>
                <div
                  style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}
                >
                  {col.body}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 14}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #FFCD75",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 200,
                backgroundColor: "#FFCD75",
                color: "#1A1C2C",
                fontSize: 21,
                fontWeight: 800,
                padding: "6px 14px",
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              {item4Title}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#F4F4F4" }}>
              {item4Body}
            </span>
          </div>
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

const trendModelDiagramSchema = {
  ...Interactive.baseSchema,
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
} as const satisfies InteractivitySchema;

export const TrendModelDiagram = Interactive.create({
  Component: TrendModelDiagramInner,
  layout: "none",
  schema: trendModelDiagramSchema,
});
