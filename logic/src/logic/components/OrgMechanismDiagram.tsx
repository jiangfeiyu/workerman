import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type OrgMechanismMode =
  | "principal-agent"
  | "lemon-market"
  | "conway-boundary"
  | "two-way-door";

type OrgMechanismDiagramProps = {
  readonly mode: OrgMechanismMode;
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

const OrgMechanismDiagramInner: React.FC<OrgMechanismDiagramProps> = ({
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
      {mode === "principal-agent" ? (
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
              ✖ 激励背道而驰（猫鼠死局）
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
              ⚠ 代价：{item2Title}（{item2Body}）
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
              ✔ 激励相容（顺着人性共赢）
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
              ★ 效果：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "lemon-market" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {[
            { op: s1, tag: "STEP 1 · 信息黑盒", color: "#41A6F6", title: item1Title, body: item1Body },
            { op: s2, tag: "STEP 2 · 廉价伪装", color: "#F77622", title: item2Title, body: item2Body },
            { op: s3, tag: "STEP 3 · 良币出走", color: "#E43B44", title: item3Title, body: item3Body },
            { op: s4, tag: "STEP 4 · 硬核破局", color: "#38B764", title: item4Title, body: item4Body },
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

      {mode === "conway-boundary" ? (
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
              ✖ 按“工种竖井”硬切团队
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
              ⚠ 恶果：{item2Title}（{item2Body}）
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
              ✔ 按“价值闭环 ＋ 标准接口”切分
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
              ★ 解法：{item4Title}（{item4Body}）
            </div>
          </div>
        </div>
      ) : null}

      {mode === "two-way-door" ? (
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
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
                🚪 双扇门（可逆低代价 ➔ 放手快跑）
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
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B6B" }}>
                🔒 单向门（不可逆重后果 ➔ 死守把关）
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
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
                📋 RACI 责任锁死：{item3Title}
              </span>
              <span style={{ fontSize: 22, color: "#F4F4F4", fontWeight: 700 }}>
                {item3Body}
              </span>
            </div>
            <div
              style={{
                minWidth: 340,
                padding: "10px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #FFCD75",
                color: "#FFCD75",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              ✔ {item4Title}：{item4Body}
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

const orgMechanismDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "principal-agent",
    description: "Organization mechanism diagram mode",
    variants: {
      "principal-agent": {},
      "lemon-market": {},
      "conway-boundary": {},
      "two-way-door": {},
    },
  },
  item1Title: { type: "string", default: "按天付死薪水，目标完全打架", description: "Item 1 title" },
  item1Body: { type: "string", default: "拖越久赚越多，省成本反而拿少钱", description: "Item 1 body" },
  item2Title: { type: "string", default: "天天盯梢极度内耗", description: "Item 2 title" },
  item2Body: { type: "string", default: "监工成本比干活工资还贵", description: "Item 2 body" },
  item3Title: { type: "string", default: "总价包干 ＋ 省本提前分红", description: "Item 3 title" },
  item3Body: { type: "string", default: "干得又快又好，对方自己多拿大头奖金", description: "Item 3 body" },
  item4Title: { type: "string", default: "自驱赶进度", description: "Item 4 title" },
  item4Body: { type: "string", default: "不用催就能高效交付", description: "Item 4 body" },
  summaryCaption: {
    type: "string",
    default: "好机制让对方为自己赚钱的同时，刚好把你的事办成",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const OrgMechanismDiagram = Interactive.create({
  Component: OrgMechanismDiagramInner,
  layout: "none",
  schema: orgMechanismDiagramSchema,
});
