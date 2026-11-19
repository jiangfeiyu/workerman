import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

export type FallacyMode =
  | "strawman-slippery"
  | "circle-authority"
  | "correlation-bias"
  | "spectrum";

type FallacyDiagramProps = {
  readonly mode: FallacyMode;
  readonly leftTitle: string;
  readonly leftDetail: string;
  readonly rightTitle: string;
  readonly rightDetail: string;
  readonly summaryCaption: string;
  readonly style?: React.CSSProperties;
};

const FallacyDiagramInner: React.FC<FallacyDiagramProps> = ({
  mode,
  leftTitle,
  leftDetail,
  rightTitle,
  rightDetail,
  summaryCaption,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step2 = interpolate(frame, [1.8 * fps, 2.5 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step3 = interpolate(frame, [3.6 * fps, 4.3 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        width: "100%",
        maxWidth: 1360,
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        ...style,
      }}
    >
      {mode === "strawman-slippery" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "22px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#73EFF7" }}>
                ① 稻草人谬误（歪曲靶子）
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#F4F4F4",
                  marginTop: 6,
                }}
              >
                {leftTitle}
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#E43B44" }}>
              ➔ 歪曲成 ➔
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#1A1C2C",
                border: "3px solid #E43B44",
                padding: "14px 20px",
                fontSize: 26,
                fontWeight: 700,
                color: "#FFCD75",
              }}
            >
              {leftDetail}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #F77622",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "22px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#FFCD75" }}>
              ② 滑坡谬误（虚构多米诺链条）
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#333C57",
                  border: "3px solid #41A6F6",
                  color: "#F4F4F4",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {rightTitle}
              </div>
              <span style={{ fontSize: 24, color: "#E43B44", fontWeight: 900 }}>
                ━ ? ➔
              </span>
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#333C57",
                  border: "3px dashed #F77622",
                  color: "#FFCD75",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                体验骤降？
              </div>
              <span style={{ fontSize: 24, color: "#E43B44", fontWeight: 900 }}>
                ━ ? ➔
              </span>
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#B13E53",
                  border: "3px solid #F4F4F4",
                  color: "#F4F4F4",
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                {rightDetail}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === "circle-authority" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ① 诉诸权威 & 对人不对事
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#F4F4F4",
              }}
            >
              {leftTitle}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #E43B44",
                fontSize: 24,
                color: "#FFCD75",
                fontWeight: 700,
              }}
            >
              {leftDetail}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #F77622",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFCD75" }}>
              ② 循环论证（原地绕圈）
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#F4F4F4",
              }}
            >
              {rightTitle}
            </div>
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#1A1C2C",
                border: "3px dashed #F77622",
                fontSize: 24,
                color: "#E2E8F0",
                fontWeight: 700,
              }}
            >
              ↺ {rightDetail}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "correlation-bias" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #41A6F6",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#73EFF7" }}>
              ① 相关性 ≠ 因果性
            </div>
            <div
              style={{
                padding: "10px 16px",
                backgroundColor: "#FFCD75",
                color: "#1A1C2C",
                fontSize: 24,
                fontWeight: 800,
                border: "2px solid #0D0E15",
                textAlign: "center",
              }}
            >
              隐藏第三变量：{leftTitle}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "#F4F4F4",
                paddingTop: 6,
              }}
            >
              <span>↙ 同时推高</span>
              <span>↘</span>
            </div>
            <div
              style={{
                padding: "14px 16px",
                backgroundColor: "#1A1C2C",
                border: "3px solid #E43B44",
                fontSize: 24,
                color: "#E2E8F0",
                fontWeight: 700,
              }}
            >
              {leftDetail}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #A77BCA",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#DDD6FE" }}>
              ② 幸存者偏差（沉默的大多数）
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 0px",
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: 28,
                    border: "2px solid #0D0E15",
                    backgroundColor: idx < 3 ? "#38B764" : "#333C57",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#A7F070" }}>
              {rightTitle}
            </div>
            <div style={{ fontSize: 23, color: "#94A3B8", fontWeight: 600 }}>
              {rightDetail}
            </div>
          </div>
        </div>
      ) : null}

      {mode === "spectrum" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              opacity: step1,
              translate: `0px ${(1 - step1) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "14px 20px",
                backgroundColor: "#B13E53",
                border: "3px solid #F4F4F4",
                fontSize: 26,
                fontWeight: 800,
                color: "#F4F4F4",
                textAlign: "center",
              }}
            >
              ✖ 死选项 A：{leftTitle}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFCD75" }}>
              非黑即白？
            </div>
            <div
              style={{
                flex: 1,
                padding: "14px 20px",
                backgroundColor: "#B13E53",
                border: "3px solid #F4F4F4",
                fontSize: 26,
                fontWeight: 800,
                color: "#F4F4F4",
                textAlign: "center",
              }}
            >
              ✖ 死选项 B：{leftDetail}
            </div>
          </div>

          <div
            style={{
              opacity: step2,
              translate: `0px ${(1 - step2) * 18}px`,
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "22px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#A7F070" }}>
              ✔ 拉开连续光谱：中间明明还有好几个稳妥方案！
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 18,
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #38B764",
                  color: "#F4F4F4",
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                方案 C1：{rightTitle}
              </div>
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #41A6F6",
                  color: "#F4F4F4",
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                方案 C2：{rightDetail}
              </div>
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "#1A1C2C",
                  border: "3px solid #FFCD75",
                  color: "#FFCD75",
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                方案 C3：灰度分批发布
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          opacity: step3,
          alignSelf: "center",
          padding: "12px 30px",
          backgroundColor: "#1A1C2C",
          border: "3px solid #FFCD75",
          color: "#FFCD75",
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        {summaryCaption}
      </div>
    </div>
  );
};

const fallacyDiagramSchema = {
  ...Interactive.baseSchema,
  mode: {
    type: "enum",
    default: "strawman-slippery",
    description: "Fallacy visualization mode",
    variants: {
      "strawman-slippery": {},
      "circle-authority": {},
      "correlation-bias": {},
      spectrum: {},
    },
  },
  leftTitle: {
    type: "string",
    default: "原话：一期先暂缓非核心弹窗",
    description: "Left primary text",
  },
  leftDetail: {
    type: "string",
    default: "假靶子：你根本不管用户转化！",
    description: "Left detail text",
  },
  rightTitle: {
    type: "string",
    default: "砍一个弹窗",
    description: "Right primary text",
  },
  rightDetail: {
    type: "string",
    default: "项目肯定黄了！",
    description: "Right detail text",
  },
  summaryCaption: {
    type: "string",
    default: "核心破局：扶正原话靶子，切断无依据滑坡",
    description: "Summary caption",
  },
} as const satisfies InteractivitySchema;

export const FallacyDiagram = Interactive.create({
  Component: FallacyDiagramInner,
  layout: "none",
  schema: fallacyDiagramSchema,
});
