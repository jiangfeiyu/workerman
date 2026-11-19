import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type ExperimentMode =
  | "survivor-bias"
  | "counterfactual"
  | "ab-traps"
  | "occam-falsify";

type ExperimentDiagramProps = {
  readonly mode: ExperimentMode;
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

const ExperimentDiagramInner: React.FC<ExperimentDiagramProps> = ({
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
      {mode === "survivor-bias" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FDA4AF" }}>
                ✖ 盲区视图：只看幸存分子
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item1Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item1Body}
              </div>
              <div
                style={{
                  marginTop: 6,
                  padding: "10px 14px",
                  backgroundColor: "#1A1C2C",
                  border: "2px solid #E43B44",
                  fontSize: 21,
                  fontWeight: 800,
                  color: "#FDA4AF",
                }}
              >
                样本：仅 3 家存活爆款 ➔ 误判胜率 100%
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
                ✔ 全集视图：补齐沉默分母
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item2Body}
              </div>
              <div
                style={{
                  marginTop: 6,
                  padding: "10px 14px",
                  backgroundColor: "#1A1C2C",
                  border: "2px solid #38B764",
                  fontSize: 21,
                  fontWeight: 800,
                  color: "#A7F070",
                }}
              >
                样本：3 家活 + 97 家阵亡 ➔ 真实胜率仅 3%
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
            <span style={{ fontSize: 23, fontWeight: 700, color: "#F4F4F4" }}>
              {item3Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "counterfactual" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "20px 28px",
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
              }}
            >
              <span style={{ fontSize: 25, fontWeight: 800, color: "#73EFF7" }}>
                {item1Title}
              </span>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                总成交 500 万
              </span>
            </div>
            <div style={{ fontSize: 21, color: "#CBD5E1" }}>{item1Body}</div>
            <div
              style={{
                height: 22,
                width: "100%",
                backgroundColor: "#1A1C2C",
                border: "2px solid #0D0E15",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "90%",
                  backgroundColor: "#64748B",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: "10%",
                  backgroundColor: "#38B764",
                  height: "100%",
                }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "20px 28px",
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
              }}
            >
              <span style={{ fontSize: 25, fontWeight: 800, color: "#FFCD75" }}>
                {item2Title}
              </span>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#FFCD75" }}>
                自然成交 450 万
              </span>
            </div>
            <div style={{ fontSize: 21, color: "#CBD5E1" }}>{item2Body}</div>
            <div
              style={{
                height: 22,
                width: "100%",
                backgroundColor: "#1A1C2C",
                border: "2px solid #0D0E15",
              }}
            >
              <div
                style={{
                  width: "90%",
                  backgroundColor: "#64748B",
                  height: "100%",
                }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 25, fontWeight: 800, color: "#FDA4AF" }}>
                {item3Title}
              </div>
              <div style={{ fontSize: 22, color: "#F4F4F4", marginTop: 4 }}>
                {item3Body}
              </div>
            </div>
            <div
              style={{
                minWidth: 260,
                backgroundColor: "#E43B44",
                color: "#F4F4F4",
                fontSize: 22,
                fontWeight: 800,
                padding: "10px 18px",
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              {item4Title}：{item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "ab-traps" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24,
            }}
          >
            {[
              {
                op: s1,
                tag: "陷阱 1 · Peeking",
                color: "#E43B44",
                tagColor: "#FDA4AF",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                tag: "陷阱 2 · Spillover",
                color: "#F77622",
                tagColor: "#FFCD75",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                tag: "陷阱 3 · p-hacking",
                color: "#41A6F6",
                tagColor: "#73EFF7",
                title: item3Title,
                body: item3Body,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  opacity: card.op,
                  translate: `0px ${(1 - card.op) * 18}px`,
                  backgroundColor: "#262B44",
                  border: `4px solid ${card.color}`,
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
                    color: card.tagColor,
                  }}
                >
                  {card.tag}
                </div>
                <div
                  style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}
                >
                  {card.title}
                </div>
                <div
                  style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}
                >
                  {card.body}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 14}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #38B764",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 190,
                backgroundColor: "#38B764",
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
            <span style={{ fontSize: 22, fontWeight: 700, color: "#A7F070" }}>
              {item4Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "occam-falsify" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #41A6F6",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#73EFF7" }}>
                ✂ 第一把剪刀 · 波普尔边界
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
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
                border: "4px solid #F77622",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FFCD75" }}>
                ✂ 第二把剪刀 · 最简假设
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.55 }}>
                {item2Body}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 14}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #38B764",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 190,
                backgroundColor: "#38B764",
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
            <span style={{ fontSize: 22, fontWeight: 700, color: "#A7F070" }}>
              {item3Body}
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

const experimentDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "survivor-bias",
    description: "Experiment diagram mode",
    variants: {
      "survivor-bias": {},
      counterfactual: {},
      "ab-traps": {},
      "occam-falsify": {},
    },
  },
  item1Title: {
    type: "string",
    default: "只看存活的 3 家爆款",
    description: "Item 1 title",
  },
  item1Body: {
    type: "string",
    default: "误把共同特征当成必胜密码",
    description: "Item 1 body",
  },
  item2Title: {
    type: "string",
    default: "拉齐 100 家完整分母",
    description: "Item 2 title",
  },
  item2Body: {
    type: "string",
    default: "97 家用同款做法照样亏钱关门",
    description: "Item 2 body",
  },
  item3Title: {
    type: "string",
    default: "真差异过滤",
    description: "Item 3 title",
  },
  item3Body: {
    type: "string",
    default: "找成功组有、失败组没有的核心门槛",
    description: "Item 3 body",
  },
  item4Title: {
    type: "string",
    default: "真实 ROI",
    description: "Item 4 title",
  },
  item4Body: {
    type: "string",
    default: "负收益",
    description: "Item 4 body",
  },
  summaryCaption: {
    type: "string",
    default: "补齐沉默分母与空白对照组，才算看清真实因果",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const ExperimentDiagram = Interactive.create({
  Component: ExperimentDiagramInner,
  layout: "none",
  schema: experimentDiagramSchema,
});
