import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type NegotiationMode =
  | "four-layers"
  | "payoff-matrix"
  | "bias-anchor"
  | "upward-grey";

type NegotiationDiagramProps = {
  readonly mode: NegotiationMode;
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

const NegotiationDiagramInner: React.FC<NegotiationDiagramProps> = ({
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
  const s2 = interpolate(frame, [1.6 * fps, 2.3 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3 = interpolate(frame, [3.2 * fps, 3.9 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4 = interpolate(frame, [4.8 * fps, 5.5 * fps], [0, 1], {
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
      {mode === "four-layers" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { op: s1, color: "#E43B44", title: item1Title, body: item1Body },
            { op: s2, color: "#F77622", title: item2Title, body: item2Body },
            { op: s3, color: "#41A6F6", title: item3Title, body: item3Body },
            { op: s4, color: "#38B764", title: item4Title, body: item4Body },
          ].map((row, idx) => (
            <div
              key={idx}
              style={{
                opacity: row.op,
                translate: `0px ${(1 - row.op) * 14}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${row.color}`,
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "14px 26px",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <span
                style={{
                  minWidth: 230,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1A1C2C",
                  backgroundColor: row.color,
                  padding: "6px 16px",
                  border: "2px solid #0D0E15",
                  textAlign: "center",
                }}
              >
                {row.title}
              </span>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#F4F4F4",
                }}
              >
                {row.body}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {mode === "payoff-matrix" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 双赢合作区（+8, +8）
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div style={{ fontSize: 23, color: "#CBD5E1" }}>{item1Body}</div>
          </div>

          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #64748B",
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ⚠ 单方吃亏区（+2, +9）
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item2Title}
            </div>
            <div style={{ fontSize: 23, color: "#94A3B8" }}>{item2Body}</div>
          </div>

          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #64748B",
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ⚠ 互相防备区（+9, +2）
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div style={{ fontSize: 23, color: "#94A3B8" }}>{item3Body}</div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FDA4AF" }}>
              ✖ 囚徒困境全输区（+1, +1）
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item4Title}
            </div>
            <div style={{ fontSize: 23, color: "#FDA4AF" }}>{item4Body}</div>
          </div>
        </div>
      ) : null}

      {mode === "bias-anchor" ? (
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
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "28px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ① 确认偏误（思维漏斗）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #41A6F6",
                fontSize: 24,
                color: "#CBD5E1",
                lineHeight: 1.5,
              }}
            >
              {item1Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 解药：{item2Title}（{item2Body}）
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "28px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ② 锚定效应（第一组数字）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
            </div>
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #FFCD75",
                fontSize: 24,
                color: "#F4F4F4",
                lineHeight: 1.5,
              }}
            >
              {item3Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 技巧：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "upward-grey" ? (
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
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              Step 1 · 接住大目标
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
              Step 2 · 风险算成账
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
              Step 3 · 最小试错包
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

const negotiationDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "four-layers",
    description: "Negotiation diagram mode",
    variants: {
      "four-layers": {},
      "payoff-matrix": {},
      "bias-anchor": {},
      "upward-grey": {},
    },
  },
  item1Title: { type: "string", default: "① 立场", description: "Item 1 title" },
  item1Body: { type: "string", default: "绝不同意上线！", description: "Item 1 body" },
  item2Title: { type: "string", default: "② 观点", description: "Item 2 title" },
  item2Body: { type: "string", default: "这版本风险太大！", description: "Item 2 body" },
  item3Title: { type: "string", default: "③ 事实", description: "Item 3 title" },
  item3Body: { type: "string", default: "上个月抢上线崩过 2 小时", description: "Item 3 body" },
  item4Title: { type: "string", default: "④ 真需求", description: "Item 4 title" },
  item4Body: { type: "string", default: "怕再出事故背绩效锅，需要安全兜底", description: "Item 4 body" },
  summaryCaption: {
    type: "string",
    default: "不要在第一层立场硬碰硬，向下剥到真需求就能共赢",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const NegotiationDiagram = Interactive.create({
  Component: NegotiationDiagramInner,
  layout: "none",
  schema: negotiationDiagramSchema,
});
