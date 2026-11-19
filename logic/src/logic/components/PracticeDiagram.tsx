import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type PracticeMode =
  | "toulmin"
  | "pyramid"
  | "star-causal"
  | "meeting-warroom";

type PracticeDiagramProps = {
  readonly mode: PracticeMode;
  readonly slot1Title: string;
  readonly slot1Body: string;
  readonly slot2Title: string;
  readonly slot2Body: string;
  readonly slot3Title: string;
  readonly slot3Body: string;
  readonly slot4Title: string;
  readonly slot4Body: string;
  readonly summaryCaption: string;
  readonly style?: React.CSSProperties;
};

const PracticeDiagramInner: React.FC<PracticeDiagramProps> = ({
  mode,
  slot1Title,
  slot1Body,
  slot2Title,
  slot2Body,
  slot3Title,
  slot3Body,
  slot4Title,
  slot4Body,
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
      {mode === "toulmin" || mode === "meeting-warroom" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              {slot1Title}
            </div>
            <div style={{ fontSize: 24, color: "#F4F4F4", lineHeight: 1.45 }}>
              {slot1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              {slot2Title}
            </div>
            <div style={{ fontSize: 24, color: "#F4F4F4", lineHeight: 1.45 }}>
              {slot2Body}
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #FFCD75",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              {slot3Title}
            </div>
            <div style={{ fontSize: 24, color: "#F4F4F4", lineHeight: 1.45 }}>
              {slot3Body}
            </div>
          </div>

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #A77BCA",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#DDD6FE" }}>
              {slot4Title}
            </div>
            <div style={{ fontSize: 24, color: "#F4F4F4", lineHeight: 1.45 }}>
              {slot4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "pyramid" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              width: "56%",
              backgroundColor: "#FFCD75",
              border: "4px solid #F4F4F4",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "16px 26px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1C2C" }}>
              {slot1Title}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#1A1C2C" }}>
              {slot1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 16}px`,
              width: "82%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            <div
              style={{
                backgroundColor: "#262B44",
                border: "4px solid #41A6F6",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
                {slot2Title}
              </div>
              <div style={{ fontSize: 22, color: "#F4F4F4", marginTop: 6 }}>
                {slot2Body}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#262B44",
                border: "4px solid #38B764",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
                {slot3Title}
              </div>
              <div style={{ fontSize: 22, color: "#F4F4F4", marginTop: 6 }}>
                {slot3Body}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#262B44",
                border: "4px solid #F77622",
                boxShadow: "6px 6px 0px #0D0E15",
                padding: "16px 18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
                支柱 3 · 兜底方案
              </div>
              <div style={{ fontSize: 22, color: "#F4F4F4", marginTop: 6 }}>
                回滚与应急预案就绪
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 16}px`,
              width: "100%",
              backgroundColor: "#1F2235",
              border: "4px solid #94A3B8",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "16px 26px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#CBD5E1" }}>
              {slot4Title}：{slot4Body}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "star-causal" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 18,
          }}
        >
          <div
            style={{
              opacity: s1,
              translate: `0px ${(1 - s1) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              {slot1Title}
            </div>
            <div style={{ fontSize: 23, color: "#F4F4F4", lineHeight: 1.5 }}>
              {slot1Body}
            </div>
          </div>

          <div
            style={{
              opacity: s2,
              translate: `0px ${(1 - s2) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #F77622",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              {slot2Title}
            </div>
            <div style={{ fontSize: 23, color: "#F4F4F4", lineHeight: 1.5 }}>
              {slot2Body}
            </div>
          </div>

          <div
            style={{
              opacity: s3,
              translate: `0px ${(1 - s3) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #A77BCA",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#DDD6FE" }}>
              {slot3Title}
            </div>
            <div style={{ fontSize: 23, color: "#F4F4F4", lineHeight: 1.5 }}>
              {slot3Body}
            </div>
          </div>

          <div
            style={{
              opacity: s4,
              translate: `0px ${(1 - s4) * 16}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "6px 6px 0px #0D0E15",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              {slot4Title}
            </div>
            <div style={{ fontSize: 23, color: "#F4F4F4", lineHeight: 1.5 }}>
              {slot4Body}
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

const practiceDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "toulmin",
    description: "Practice diagram mode",
    variants: {
      toulmin: {},
      pyramid: {},
      "star-causal": {},
      "meeting-warroom": {},
    },
  },
  slot1Title: { type: "string", default: "① 主张", description: "Slot 1 title" },
  slot1Body: { type: "string", default: "申请 1 名中级测试", description: "Slot 1 body" },
  slot2Title: { type: "string", default: "② 数据", description: "Slot 2 title" },
  slot2Body: { type: "string", default: "上季漏测导致线上损失 18 万", description: "Slot 2 body" },
  slot3Title: { type: "string", default: "③ 依据", description: "Slot 3 title" },
  slot3Body: { type: "string", default: "补人后回归提速 40%，3 个月回本", description: "Slot 3 body" },
  slot4Title: { type: "string", default: "④ 堵反驳", description: "Slot 4 title" },
  slot4Body: { type: "string", default: "已用自动化覆盖 60% 用例", description: "Slot 4 body" },
  summaryCaption: {
    type: "string",
    default: "把成本申请变成帮老板减损赚钱的投资案",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const PracticeDiagram = Interactive.create({
  Component: PracticeDiagramInner,
  layout: "none",
  schema: practiceDiagramSchema,
});
