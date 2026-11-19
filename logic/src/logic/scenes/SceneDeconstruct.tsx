import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { BasicCaptions } from "../components/basic-captions.element";
import { ChapterBadge } from "../components/ChapterBadge";
import { LogicBlock } from "../components/LogicBlock";

type SceneDeconstructProps = {
  readonly title: string;
  readonly premiseText: string;
  readonly noiseText: string;
  readonly hiddenPremiseText: string;
  readonly conclusionText: string;
};

const SceneDeconstructInner: React.FC<SceneDeconstructProps> = ({
  title,
  premiseText,
  noiseText,
  hiddenPremiseText,
  conclusionText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "46px 96px 148px 96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 26,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ChapterBadge
            name="Deconstruct badge"
            premountFor={fps}
            episodeLabel="EP01"
            sectionTitle="02 · 拆出逻辑积木"
            accentColor="#38B764"
          />

          <Interactive.H2
            name="Deconstruct title"
            premountFor={fps}
            style={{
              margin: 0,
              fontSize: 50,
              fontWeight: 800,
              color: "#F4F4F4",
              textShadow: "4px 4px 0px #0D0E15",
              opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {title}
          </Interactive.H2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "stretch",
            minHeight: 220,
          }}
        >
          <LogicBlock
            name="Premise block"
            from={0.8 * fps}
            premountFor={fps}
            badge="前提（客观事实）"
            title="有证据支撑的现状"
            body={premiseText}
            accentColor="#41A6F6"
            strikethrough={false}
          />

          <LogicBlock
            name="Noise block"
            from={4.4 * fps}
            premountFor={fps}
            badge="干扰项（踢出论证）"
            title="与当前结论无关的信息"
            body={noiseText}
            accentColor="#E43B44"
            strikethrough={true}
          />
        </div>

        <Interactive.Div
          name="Reasoning bridge"
          from={8.3 * fps}
          premountFor={fps}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            opacity: interpolate(frame, [8.3 * fps, 9.0 * fps], [0, 1], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [8.3 * fps, 9.1 * fps],
              ["0px 18px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              padding: "14px 28px",
              backgroundColor: "#262B44",
              border: "4px dashed #FFCD75",
              boxShadow: "6px 6px 0px #0D0E15",
              color: "#FFCD75",
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            ＋ 隐含前提：{hiddenPremiseText}
          </div>
          <span
            style={{
              fontSize: 40,
              color: "#38B764",
              fontWeight: 900,
              textShadow: "3px 3px 0px #0D0E15",
            }}
          >
            ▶▶
          </span>
        </Interactive.Div>

        <LogicBlock
          name="Conclusion block"
          from={11.7 * fps}
          premountFor={fps}
          badge="结论（可执行行动）"
          title="对方真正需要拍板的事"
          body={conclusionText}
          accentColor="#38B764"
          strikethrough={false}
        />
      </div>

      <BasicCaptions
        name="Deconstruct captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={[
          {
            text: "一个合格的论证，由前提和结论两块积木组成。",
            startMs: 250,
            endMs: 4132,
            timestampMs: 2191,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "像“竞品上新功能”这类无关信息，要果断划掉。",
            startMs: 4432,
            endMs: 7999,
            timestampMs: 6215,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "还要补上隐含桥梁：不修 Bug 损失更大，",
            startMs: 8299,
            endMs: 11498,
            timestampMs: 9898,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后给出可执行的具体结论，老板才敢拍板。",
            startMs: 11748,
            endMs: 15223,
            timestampMs: 13485,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};

export const SceneDeconstruct = Interactive.create({
  Component: SceneDeconstructInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    title: {
      type: "string",
      default: "一个合格的论证 = 有效前提 + 合理桥梁 ➔ 明确结论",
      description: "Section title",
    },
    premiseText: {
      type: "string",
      default: "“昨晚闪退 2 次” + “用户反馈卡顿” → 需要补充具体崩溃率与受影响人数。",
      description: "Premise text",
    },
    noiseText: {
      type: "string",
      default: "“竞品昨天上了新功能” → 竞品上新不能推导出“我们要修 Bug”，属于干扰项。",
      description: "Noise text",
    },
    hiddenPremiseText: {
      type: "string",
      default: "如果不立刻修 Bug，用户流失损失 > 延期新需求的收益",
      description: "Hidden premise",
    },
    conclusionText: {
      type: "string",
      default: "建议本周抽出 2 名研发用 2 天集中修 P0 闪退，新需求顺延至下周三。",
      description: "Conclusion text",
    },
  } as const satisfies InteractivitySchema,
});
