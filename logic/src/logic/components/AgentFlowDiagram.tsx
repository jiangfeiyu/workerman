import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type AgentFlowMode =
  | "deterministic-probabilistic"
  | "multi-agent-separation"
  | "rag-hygiene"
  | "human-in-the-loop";

type AgentFlowDiagramProps = {
  readonly mode: AgentFlowMode;
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

const AgentFlowDiagramInner: React.FC<AgentFlowDiagramProps> = ({
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
      {mode === "deterministic-probabilistic" ? (
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
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#A7F070" }}>
                🛤 确定性铁轨（代码 / 死规则）
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
                border: "4px solid #41A6F6",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 21, fontWeight: 800, color: "#73EFF7" }}>
                🧠 概率性大脑（大模型）
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
            <span style={{ fontSize: 22, fontWeight: 700, color: "#F4F4F4" }}>
              {item3Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "multi-agent-separation" ? (
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
                tag: "Agent 1 · Maker",
                color: "#41A6F6",
                tagColor: "#73EFF7",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                tag: "Agent 2 · Checker",
                color: "#FFCD75",
                tagColor: "#FFCD75",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                tag: "Agent 3 · Auditor",
                color: "#E43B44",
                tagColor: "#FDA4AF",
                title: item3Title,
                body: item3Body,
              },
            ].map((agent, idx) => (
              <div
                key={idx}
                style={{
                  opacity: agent.op,
                  translate: `0px ${(1 - agent.op) * 18}px`,
                  backgroundColor: "#262B44",
                  border: `4px solid ${agent.color}`,
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
                    color: agent.tagColor,
                  }}
                >
                  {agent.tag}
                </div>
                <div
                  style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}
                >
                  {agent.title}
                </div>
                <div
                  style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}
                >
                  {agent.body}
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
                minWidth: 210,
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

      {mode === "rag-hygiene" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              op: s1,
              color: "#E43B44",
              badgeBg: "#E43B44",
              title: item1Title,
              body: item1Body,
            },
            {
              op: s2,
              color: "#41A6F6",
              badgeBg: "#41A6F6",
              title: item2Title,
              body: item2Body,
            },
            {
              op: s3,
              color: "#38B764",
              badgeBg: "#38B764",
              title: item3Title,
              body: item3Body,
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
                gap: 22,
              }}
            >
              <span
                style={{
                  minWidth: 250,
                  backgroundColor: row.badgeBg,
                  color: "#1A1C2C",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "8px 16px",
                  border: "2px solid #0D0E15",
                  textAlign: "center",
                }}
              >
                {row.title}
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#F4F4F4" }}>
                {row.body}
              </span>
            </div>
          ))}

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 12}px`,
              backgroundColor: "#1F2235",
              border: "3px solid #FFCD75",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "14px 26px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span
              style={{
                minWidth: 200,
                backgroundColor: "#FFCD75",
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
            <span style={{ fontSize: 22, fontWeight: 700, color: "#FFCD75" }}>
              {item4Body}
            </span>
          </div>
        </div>
      ) : null}

      {mode === "human-in-the-loop" ? (
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
                tag: "L1 绿灯 · 低风险可逆",
                color: "#38B764",
                tagColor: "#A7F070",
                title: item1Title,
                body: item1Body,
              },
              {
                op: s2,
                tag: "L2 黄灯 · 中风险半可逆",
                color: "#FFCD75",
                tagColor: "#FFCD75",
                title: item2Title,
                body: item2Body,
              },
              {
                op: s3,
                tag: "L3 红灯 · 不可逆单向门",
                color: "#E43B44",
                tagColor: "#FDA4AF",
                title: item3Title,
                body: item3Body,
              },
            ].map((gate, idx) => (
              <div
                key={idx}
                style={{
                  opacity: gate.op,
                  translate: `0px ${(1 - gate.op) * 18}px`,
                  backgroundColor: "#262B44",
                  border: `4px solid ${gate.color}`,
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
                    color: gate.tagColor,
                  }}
                >
                  {gate.tag}
                </div>
                <div
                  style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}
                >
                  {gate.title}
                </div>
                <div
                  style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}
                >
                  {gate.body}
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
                minWidth: 210,
                backgroundColor: "#73EFF7",
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

const agentFlowDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "deterministic-probabilistic",
    description: "Agent flow diagram mode",
    variants: {
      "deterministic-probabilistic": {},
      "multi-agent-separation": {},
      "rag-hygiene": {},
      "human-in-the-loop": {},
    },
  },
  item1Title: { type: "string", default: "写死算账与校验", description: "Item 1 title" },
  item1Body: {
    type: "string",
    default: "金额计算、时间比对、格式与权限拦截必须走确定性代码",
    description: "Item 1 body",
  },
  item2Title: { type: "string", default: "释放语义与归纳", description: "Item 2 title" },
  item2Body: {
    type: "string",
    default: "长文摘要、需求拆解、文案起草交由大模型发挥弹性",
    description: "Item 2 body",
  },
  item3Title: { type: "string", default: "混合铁律", description: "Item 3 title" },
  item3Body: {
    type: "string",
    default: "代码铺好铁轨和刹车，大模型只在车厢里提供智能",
    description: "Item 3 body",
  },
  item4Title: { type: "string", default: "防呆原则", description: "Item 4 title" },
  item4Body: {
    type: "string",
    default: "人控最后一公里红灯闸门",
    description: "Item 4 body",
  },
  summaryCaption: {
    type: "string",
    default: "铁轨锁死边界与算账，大模型只负责语义理解与创造",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const AgentFlowDiagram = Interactive.create({
  Component: AgentFlowDiagramInner,
  layout: "none",
  schema: agentFlowDiagramSchema,
});
