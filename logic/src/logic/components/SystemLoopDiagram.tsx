import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type SystemLoopMode =
  | "reinforcing-balancing"
  | "delay-trap"
  | "shifting-burden"
  | "goodhart-kpi";

type SystemLoopDiagramProps = {
  readonly mode: SystemLoopMode;
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

const SystemLoopDiagramInner: React.FC<SystemLoopDiagramProps> = ({
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
      {mode === "reinforcing-balancing" ? (
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
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ↻ 增强回路 R（增长雪球）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
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
              {item1Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ✔ 引擎：{item2Title}（{item2Body}）
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 18}px`,
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
              ⚖ 调节回路 B（隐形天花板）
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F4F4F4" }}>
              {item3Title}
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
              {item3Body}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ★ 破局：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "delay-trap" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {[
            { op: s1, step: "T+0 · 调整参数", color: "#41A6F6", title: item1Title, body: item1Body },
            { op: s2, step: "T+30 · 滞后静默", color: "#FFCD75", title: item2Title, body: item2Body },
            { op: s3, step: "T+45 · 半路猛加码", color: "#F77622", title: item3Title, body: item3Body },
            { op: s4, step: "T+90 · 过冲崩盘", color: "#E43B44", title: item4Title, body: item4Body },
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

      {mode === "shifting-burden" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #F77622",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FFCD75" }}>
                ▲ 上路径：症状止痛药（短期爽、越吃越痛）
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item1Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.45 }}>
                {item1Body}
              </div>
            </div>

            <div
              style={{
                opacity: s2,
                translate: `0px ${(1 - s2) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FF6B6B" }}>
                ⚠ 隐形副作用（掏空造血力）
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.45 }}>
                {item2Body}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 21, fontWeight: 800, color: "#A7F070" }}>
                ▼ 根本解决回路：{item3Title}
              </span>
              <span style={{ fontSize: 22, color: "#F4F4F4", fontWeight: 700 }}>
                {item3Body}
              </span>
            </div>
            <div
              style={{
                minWidth: 340,
                padding: "10px 16px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #38B764",
                color: "#A7F070",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              ✔ {item4Title}：{item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "goodhart-kpi" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
          }}
        >
          {[
            { op: s1, tag: "STEP 1 · 原本合理尺度", color: "#41A6F6", title: item1Title, body: item1Body },
            { op: s2, tag: "STEP 2 · 绑定硬考核后", color: "#F77622", title: item2Title, body: item2Body },
            { op: s3, tag: "STEP 3 · 指标虚高业务垮", color: "#E43B44", title: item3Title, body: item3Body },
            { op: s4, tag: "STEP 4 · 反向护栏制衡", color: "#38B764", title: item4Title, body: item4Body },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                opacity: card.op,
                translate: `0px ${(1 - card.op) * 14}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${card.color}`,
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 800, color: card.color }}>
                {card.tag}
              </span>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {card.title}
              </span>
              <span style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.45 }}>
                {card.body}
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

const systemLoopDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "reinforcing-balancing",
    description: "System loop diagram mode",
    variants: {
      "reinforcing-balancing": {},
      "delay-trap": {},
      "shifting-burden": {},
      "goodhart-kpi": {},
    },
  },
  item1Title: { type: "string", default: "口碑推荐飞轮越转越快", description: "Item 1 title" },
  item1Body: { type: "string", default: "老客推荐新客 ➔ 新客留好评价 ➔ 吸引更多新客", description: "Item 1 body" },
  item2Title: { type: "string", default: "前期增长极猛", description: "Item 2 title" },
  item2Body: { type: "string", default: "每投 1 块都能撬动复利", description: "Item 2 body" },
  item3Title: { type: "string", default: "服务过载拉平增长曲线", description: "Item 3 title" },
  item3Body: { type: "string", default: "客服排队/引导断层 ➔ 退订率飙升 ➔ 净增长停滞", description: "Item 3 body" },
  item4Title: { type: "string", default: "先拆手刹再加油", description: "Item 4 title" },
  item4Body: { type: "string", default: "打通新人引导比硬砸广告更有效", description: "Item 4 body" },
  summaryCaption: {
    type: "string",
    default: "增长撞墙不是油门不够，而是触发了系统调节刹车",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const SystemLoopDiagram = Interactive.create({
  Component: SystemLoopDiagramInner,
  layout: "none",
  schema: systemLoopDiagramSchema,
});
