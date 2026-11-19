import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type StrategyMode =
  | "leverage-curve"
  | "barbell-strategy"
  | "circle-competence"
  | "strategy-compass";

type StrategyLeverageDiagramProps = {
  readonly mode: StrategyMode;
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

const StrategyLeverageDiagramInner: React.FC<StrategyLeverageDiagramProps> = ({
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
      {mode === "leverage-curve" ? (
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
              border: "4px solid #F77622",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ━ 线性卖时间（1 小时换 1 份钱）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #F77622",
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {item1Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
              ⚠ 天花板：{item2Title}（{item2Body}）
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
              📈 可复制杠杆（零复制成本资产）
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
              ★ 飞跃：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "barbell-strategy" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.7fr 1fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              🏋 左端 80% · 极度稳健压舱石
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
              backgroundColor: "#1A1C2C",
              border: "4px dashed #E43B44",
              padding: "22px 18px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#FF6B6B" }}>
              ✖ 砍掉平庸中间区
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div style={{ fontSize: 19, color: "#CBD5E1", lineHeight: 1.4 }}>
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
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              🚀 右端 20% · 高赔率小试错
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
              {item3Body}
            </div>
            <div
              style={{
                marginTop: 4,
                padding: "8px 12px",
                backgroundColor: "#1A1C2C",
                border: "2px solid #FFCD75",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFCD75",
              }}
            >
              ✔ {item4Title} · {item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "circle-competence" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 22,
          }}
        >
          {[
            { op: s1, tag: "🟢 圈内核心区", color: "#38B764", title: item1Title, body: item1Body },
            { op: s2, tag: "🔴 圈外幻觉区", color: "#E43B44", title: item2Title, body: item2Body },
            { op: s3, tag: "🧭 边界守则", color: "#FFCD75", title: item3Title, body: `${item3Body}（${item4Title}：${item4Body}）` },
          ].map((col, idx) => (
            <div
              key={idx}
              style={{
                opacity: col.op,
                translate: `0px ${(1 - col.op) * 18}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${col.color}`,
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: col.color }}>
                {col.tag}
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {col.title}
              </div>
              <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}>
                {col.body}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {mode === "strategy-compass" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {[
            { op: s1, tag: "① 模块 9 · 系统回路", color: "#73EFF7", title: item1Title, body: item1Body },
            { op: s2, tag: "② 模块 10 · 商业 UE & 现金", color: "#FFCD75", title: item2Title, body: item2Body },
            { op: s3, tag: "③ 模块 11 · 组织机制与边界", color: "#41A6F6", title: item3Title, body: item3Body },
            { op: s4, tag: "④ 模块 12 · 能力圈与杠铃", color: "#38B764", title: item4Title, body: item4Body },
          ].map((quad, idx) => (
            <div
              key={idx}
              style={{
                opacity: quad.op,
                translate: `0px ${(1 - quad.op) * 14}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${quad.color}`,
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 800, color: quad.color }}>
                {quad.tag}
              </span>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {quad.title}
              </span>
              <span style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.45 }}>
                {quad.body}
              </span>
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

const strategyLeverageDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "leverage-curve",
    description: "Strategy and leverage diagram mode",
    variants: {
      "leverage-curve": {},
      "barbell-strategy": {},
      "circle-competence": {},
      "strategy-compass": {},
    },
  },
  item1Title: { type: "string", default: "纯卖体力与小时数", description: "Item 1 title" },
  item1Body: { type: "string", default: "手停产出归零，每天极限只有 24 小时", description: "Item 1 body" },
  item2Title: { type: "string", default: "无法放大十倍", description: "Item 2 title" },
  item2Body: { type: "string", default: "干十年依旧被绑死在眼前杂活里", description: "Item 2 body" },
  item3Title: { type: "string", default: "代码 ＋ SOP ＋ 模板内容", description: "Item 3 title" },
  item3Body: { type: "string", default: "做完一次可以零成本重复交付十万次", description: "Item 3 body" },
  item4Title: { type: "string", default: "复利资产", description: "Item 4 title" },
  item4Body: { type: "string", default: "把一次性苦劳变成长期睡后产出", description: "Item 4 body" },
  summaryCaption: {
    type: "string",
    default: "每次解决完重复痛点，顺手留下一件可复用的杠杆工具",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const StrategyLeverageDiagram = Interactive.create({
  Component: StrategyLeverageDiagramInner,
  layout: "none",
  schema: strategyLeverageDiagramSchema,
});
