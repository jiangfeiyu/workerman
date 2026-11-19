import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type CrisisMode =
  | "abilene-groupthink"
  | "crisis-response"
  | "blameless-postmortem"
  | "steelman";

type CrisisDiagramProps = {
  readonly mode: CrisisMode;
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

const CrisisDiagramInner: React.FC<CrisisDiagramProps> = ({
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
      {mode === "abilene-groupthink" ? (
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
                translate: `0px ${(1 - s1) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #E43B44",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: "#FDA4AF" }}>
                环 1 · 顺从心理
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
                translate: `0px ${(1 - s2) * 16}px`,
                backgroundColor: "#262B44",
                border: "4px solid #F77622",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: "#FFCD75" }}>
                环 2 · 虚假一致
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {item2Title}
              </div>
              <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item2Body}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div
              style={{
                opacity: s3,
                translate: `0px ${(1 - s3) * 14}px`,
                backgroundColor: "#262B44",
                border: "4px solid #41A6F6",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "20px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: "#73EFF7" }}>
                破局 1 · 规则改写
              </div>
              <div style={{ fontSize: 25, fontWeight: 800, color: "#F4F4F4" }}>
                {item3Title}
              </div>
              <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item3Body}
              </div>
            </div>

            <div
              style={{
                opacity: s4,
                translate: `0px ${(1 - s4) * 14}px`,
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "20px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: "#A7F070" }}>
                破局 2 · 合法挑刺
              </div>
              <div style={{ fontSize: 25, fontWeight: 800, color: "#F4F4F4" }}>
                {item4Title}
              </div>
              <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.5 }}>
                {item4Body}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === "crisis-response" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {[
            {
              op: s1,
              tag: "Step 1 · 0~10 分钟",
              color: "#E43B44",
              tagColor: "#FDA4AF",
              title: item1Title,
              body: item1Body,
            },
            {
              op: s2,
              tag: "Step 2 · 认清影响",
              color: "#F77622",
              tagColor: "#FFCD75",
              title: item2Title,
              body: item2Body,
            },
            {
              op: s3,
              tag: "Step 3 · 确定时间表",
              color: "#41A6F6",
              tagColor: "#73EFF7",
              title: item3Title,
              body: item3Body,
            },
            {
              op: s4,
              tag: "Step 4 · 火灭后再查",
              color: "#38B764",
              tagColor: "#A7F070",
              title: item4Title,
              body: item4Body,
            },
          ].map((step, idx) => (
            <div
              key={idx}
              style={{
                opacity: step.op,
                translate: `0px ${(1 - step.op) * 18}px`,
                backgroundColor: "#262B44",
                border: `4px solid ${step.color}`,
                boxShadow: "8px 8px 0px #0D0E15",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: step.tagColor,
                }}
              >
                {step.tag}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F4F4F4" }}>
                {step.title}
              </div>
              <div style={{ fontSize: 21, color: "#CBD5E1", lineHeight: 1.55 }}>
                {step.body}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {mode === "blameless-postmortem" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              op: s1,
              color: "#41A6F6",
              badgeBg: "#41A6F6",
              title: item1Title,
              body: item1Body,
            },
            {
              op: s2,
              color: "#F77622",
              badgeBg: "#F77622",
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
              border: "3px solid #A7F070",
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
                backgroundColor: "#A7F070",
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

      {mode === "steelman" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            gap: 26,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              backgroundColor: "#1F2235",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 21, fontWeight: 800, color: "#FDA4AF" }}>
              ✖ 低阶打法：稻草人谬误
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, color: "#F4F4F4" }}>
              {item1Title}
            </div>
            <div style={{ fontSize: 22, color: "#CBD5E1", lineHeight: 1.55 }}>
              {item1Body}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                opacity: s2,
                translate: `0px ${(1 - s2) * 14}px`,
                backgroundColor: "#262B44",
                border: "4px solid #41A6F6",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 24px",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
                ✔ Step 1 · {item2Title}
              </div>
              <div style={{ fontSize: 21, color: "#F4F4F4", marginTop: 6 }}>
                {item2Body}
              </div>
            </div>

            <div
              style={{
                opacity: s3,
                translate: `0px ${(1 - s3) * 14}px`,
                backgroundColor: "#262B44",
                border: "4px solid #FFCD75",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 24px",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
                ✔ Step 2 · {item3Title}
              </div>
              <div style={{ fontSize: 21, color: "#F4F4F4", marginTop: 6 }}>
                {item3Body}
              </div>
            </div>

            <div
              style={{
                opacity: s4,
                translate: `0px ${(1 - s4) * 14}px`,
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 24px",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
                ✔ Step 3 · {item4Title}
              </div>
              <div style={{ fontSize: 21, color: "#F4F4F4", marginTop: 6 }}>
                {item4Body}
              </div>
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

const crisisDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "abilene-groupthink",
    description: "Crisis diagram mode",
    variants: {
      "abilene-groupthink": {},
      "crisis-response": {},
      "blameless-postmortem": {},
      steelman: {},
    },
  },
  item1Title: { type: "string", default: "怕当异类", description: "Item 1 title" },
  item1Body: {
    type: "string",
    default: "主管一拍板，大家把顾虑咽回肚子",
    description: "Item 1 body",
  },
  item2Title: { type: "string", default: "误读沉默", description: "Item 2 title" },
  item2Body: {
    type: "string",
    default: "把没人反对当成全票赞成",
    description: "Item 2 body",
  },
  item3Title: { type: "string", default: "匿名写雷区", description: "Item 3 title" },
  item3Body: {
    type: "string",
    default: "先独立匿名打分与写出担忧",
    description: "Item 3 body",
  },
  item4Title: {
    type: "string",
    default: "指定合法反方",
    description: "Item 4 title",
  },
  item4Body: {
    type: "string",
    default: "轮流指派魔鬼代言人专门挑刺",
    description: "Item 4 body",
  },
  summaryCaption: {
    type: "string",
    default: "莫把沉默当赞成，用规则保护真话",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const CrisisDiagram = Interactive.create({
  Component: CrisisDiagramInner,
  layout: "none",
  schema: crisisDiagramSchema,
});
