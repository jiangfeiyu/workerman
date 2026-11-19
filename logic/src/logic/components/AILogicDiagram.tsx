import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type AILogicMode =
  | "prompt-logic"
  | "hallucination-check"
  | "red-blue-team"
  | "capstone-workflow";

type AILogicDiagramProps = {
  readonly mode: AILogicMode;
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

const AILogicDiagramInner: React.FC<AILogicDiagramProps> = ({
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
      {mode === "prompt-logic" ? (
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
                step: "Module 1 · 前提约束",
                color: "#41A6F6",
                tagColor: "#73EFF7",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                step: "Module 2 · 布尔边界",
                color: "#F77622",
                tagColor: "#FFCD75",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                step: "Module 3 · 验收标准",
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
                  {card.step}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#F4F4F4",
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 21,
                    color: "#CBD5E1",
                    lineHeight: 1.5,
                  }}
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
              border: "3px solid #73EFF7",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "16px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                minWidth: 180,
                backgroundColor: "#73EFF7",
                color: "#1A1C2C",
                fontSize: 20,
                fontWeight: 800,
                padding: "6px 14px",
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              {item4Title}
            </span>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#F4F4F4" }}>
              {item4Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "hallucination-check" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            {
              op: s1,
              color: "#41A6F6",
              badgeBg: "#41A6F6",
              title: item1Title,
              body: item1Body,
              status: "🔍 口径对齐",
            },
            {
              op: s2,
              color: "#E43B44",
              badgeBg: "#E43B44",
              title: item2Title,
              body: item2Body,
              status: "🚨 溯源核验",
            },
            {
              op: s3,
              color: "#F77622",
              badgeBg: "#F77622",
              title: item3Title,
              body: item3Body,
              status: "⚡ 因果拆解",
            },
          ].map((row, idx) => (
            <div
              key={idx}
              style={{
                opacity: row.op,
                translate: `0px ${(1 - row.op) * 16}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${row.color}`,
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "18px 26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <span
                  style={{
                    minWidth: 230,
                    backgroundColor: row.badgeBg,
                    color: "#F4F4F4",
                    fontSize: 22,
                    fontWeight: 800,
                    padding: "8px 16px",
                    border: "2px solid #0D0E15",
                    textAlign: "center",
                  }}
                >
                  {row.title}
                </span>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#F4F4F4",
                    lineHeight: 1.45,
                  }}
                >
                  {row.body}
                </span>
              </div>
              <span
                style={{
                  minWidth: 150,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FFCD75",
                  backgroundColor: "#1A1C2C",
                  border: "2px solid #FFCD75",
                  padding: "6px 12px",
                }}
              >
                {row.status}
              </span>
            </div>
          ))}

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 12}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #38B764",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "14px 26px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span
              style={{
                minWidth: 180,
                backgroundColor: "#38B764",
                color: "#1A1C2C",
                fontSize: 20,
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

      {mode === "red-blue-team" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr 1fr",
            gap: 24,
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
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              🔵 蓝方 · 初始方案
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
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                opacity: s2,
                translate: `0px ${(1 - s2) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "18px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FDA4AF" }}>
                🔴 {item2Title}
              </div>
              <div style={{ fontSize: 21, color: "#F4F4F4", lineHeight: 1.45 }}>
                {item2Body}
              </div>
            </div>

            <div
              style={{
                opacity: s3,
                translate: `0px ${(1 - s3) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #F77622",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "18px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#FFCD75" }}>
                🔴 {item3Title}
              </div>
              <div style={{ fontSize: 21, color: "#F4F4F4", lineHeight: 1.45 }}>
                {item3Body}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              🛡 蓝方 · 防弹补丁
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
              {item4Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.55 }}>
              {item4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "capstone-workflow" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
          }}
        >
          {[
            {
              op: s1,
              color: "#41A6F6",
              tagColor: "#73EFF7",
              roleTag: "人定方向 · AI 穷举",
              title: item1Title,
              body: item1Body,
            },
            {
              op: s2,
              color: "#FFCD75",
              tagColor: "#FFCD75",
              roleTag: "人卡基准 · AI 测算",
              title: item2Title,
              body: item2Body,
            },
            {
              op: s3,
              color: "#F77622",
              tagColor: "#FDA4AF",
              roleTag: "AI 挑刺 · 人设兜底",
              title: item3Title,
              body: item3Body,
            },
            {
              op: s4,
              color: "#38B764",
              tagColor: "#A7F070",
              roleTag: "AI 起草 · 人做拍板",
              title: item4Title,
              body: item4Body,
            },
          ].map((step, idx) => (
            <div
              key={idx}
              style={{
                opacity: step.op,
                translate: `0px ${(1 - step.op) * 16}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${step.color}`,
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "20px 26px",
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
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 800,
                    color: "#F4F4F4",
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#1A1C2C",
                    backgroundColor: step.tagColor,
                    padding: "4px 12px",
                    border: "2px solid #0D0E15",
                  }}
                >
                  {step.roleTag}
                </span>
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {step.body}
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

const aiLogicDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "prompt-logic",
    description: "AI logic diagram mode",
    variants: {
      "prompt-logic": {},
      "hallucination-check": {},
      "red-blue-team": {},
      "capstone-workflow": {},
    },
  },
  item1Title: {
    type: "string",
    default: "① 锁定前提与角色",
    description: "Item 1 title",
  },
  item1Body: {
    type: "string",
    default: "明确受众、业务目标与客观硬约束（预算、周期、渠道）",
    description: "Item 1 body",
  },
  item2Title: {
    type: "string",
    default: "② 布尔边界（且/或/非）",
    description: "Item 2 title",
  },
  item2Body: {
    type: "string",
    default: "AND 必含表格；OR 二选一路径；NOT 严禁空话与编造",
    description: "Item 2 body",
  },
  item3Title: {
    type: "string",
    default: "③ 客观验收标准",
    description: "Item 3 title",
  },
  item3Body: {
    type: "string",
    default: "规定条数、字数上限与可量化验证指标，不达标直接重做",
    description: "Item 3 body",
  },
  item4Title: {
    type: "string",
    default: "实战模板",
    description: "Item 4 title",
  },
  item4Body: {
    type: "string",
    default: "前提锁死 + 且或非写清 + 验收尺子给到位",
    description: "Item 4 body",
  },
  summaryCaption: {
    type: "string",
    default: "AI 不是许愿池，你把逻辑边界锁死，它才会交出真答案",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const AILogicDiagram = Interactive.create({
  Component: AILogicDiagramInner,
  layout: "none",
  schema: aiLogicDiagramSchema,
});
