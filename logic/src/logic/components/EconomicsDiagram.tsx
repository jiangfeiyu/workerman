import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type EconomicsMode =
  | "unit-economics"
  | "cash-vs-profit"
  | "moat-shields"
  | "pricing-anchor";

type EconomicsDiagramProps = {
  readonly mode: EconomicsMode;
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

const EconomicsDiagramInner: React.FC<EconomicsDiagramProps> = ({
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
      {mode === "unit-economics" ? (
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
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
              ✖ 负单位模型（卖一单亏一单）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #E43B44",
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {item1Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
              ⚠ 结果：{item2Title}（{item2Body}）
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
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 正单位模型（单均毛利为正）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {item3Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ★ 规模效应：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "cash-vs-profit" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div
              style={{
                opacity: s1,
                translate: `0px ${(1 - s1) * 18}px`,
                backgroundColor: "#262B44",
                border: "4px solid #FFCD75",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
                📄 账面利润（纸面肌肉分）
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
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
                border: "4px solid #41A6F6",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
                💧 真实现金流（每分钟氧气）
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item2Body}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
                ⚠ 黑字倒闭死穴：{item3Title}
              </span>
              <span style={{ fontSize: 22, color: "#F4F4F4", fontWeight: 700 }}>
                {item3Body}
              </span>
            </div>
            <div
              style={{
                minWidth: 360,
                padding: "10px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                color: "#A7F070",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              ✔ 铁律：{item4Title} · {item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "moat-shields" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {[
            { op: s1, tag: "✖ 纸糊假壁垒", color: "#E43B44", title: item1Title, body: item1Body },
            { op: s2, tag: "🛡 真壁垒 ①", color: "#38B764", title: item2Title, body: item2Body },
            { op: s3, tag: "🛡 真壁垒 ②", color: "#41A6F6", title: item3Title, body: item3Body },
            { op: s4, tag: "🛡 真壁垒 ③", color: "#FFCD75", title: item4Title, body: item4Body },
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
                {col.tag}
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

      {mode === "pricing-anchor" ? (
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
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 21, fontWeight: 800, color: "#FF6B6B" }}>
              阶梯 1 · 成本加成（苦力卷）
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
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
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 21, fontWeight: 800, color: "#73EFF7" }}>
              阶梯 2 · 重构场景（拉开替代差）
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
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
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 21, fontWeight: 800, color: "#A7F070" }}>
              阶梯 3 · 价值结果锚定（强定价权）
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
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
              核心：{item4Title} · {item4Body}
            </div>
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

const economicsDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "unit-economics",
    description: "Economics diagram mode",
    variants: {
      "unit-economics": {},
      "cash-vs-profit": {},
      "moat-shields": {},
      "pricing-anchor": {},
    },
  },
  item1Title: { type: "string", default: "卖 30 元，直接成本花 36 元", description: "Item 1 title" },
  item1Body: { type: "string", default: "进货 22 + 配送补贴 14 = 36 > 30 元，单均亏损 -6 元", description: "Item 1 body" },
  item2Title: { type: "string", default: "规模越大死越快", description: "Item 2 title" },
  item2Body: { type: "string", default: "卖 10 万单直接净亏 60 万", description: "Item 2 body" },
  item3Title: { type: "string", default: "卖价 35 元 > 变动成本 25 元", description: "Item 3 title" },
  item3Body: { type: "string", default: "单均毛利 +10 元为正，每卖一单都能往回赚房租和研发工资", description: "Item 3 body" },
  item4Title: { type: "string", default: "摊薄固定成本", description: "Item 4 title" },
  item4Body: { type: "string", default: "销量越过平衡点后净利暴涨", description: "Item 4 body" },
  summaryCaption: {
    type: "string",
    default: "先让最小一单赚正毛利，再谈做大规模摊薄固定成本",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const EconomicsDiagram = Interactive.create({
  Component: EconomicsDiagramInner,
  layout: "none",
  schema: economicsDiagramSchema,
});
