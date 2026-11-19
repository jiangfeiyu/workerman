import type { Caption } from "@remotion/captions";
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
import {
  StrategyLeverageDiagram,
  type StrategyMode,
} from "../components/StrategyLeverageDiagram";

type SceneStrategyProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: StrategyMode;
  readonly item1Title: string;
  readonly item1Body: string;
  readonly item2Title: string;
  readonly item2Body: string;
  readonly item3Title: string;
  readonly item3Body: string;
  readonly item4Title: string;
  readonly item4Body: string;
  readonly summaryCaption: string;
  readonly captions?: Caption[];
};

const DEFAULT_STRATEGY_CAPTIONS: Caption[] = [
  {
    text: "告别线性卖时间，用杠杆、杠铃与能力圈罗盘构建十年护城河。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneStrategyInner: React.FC<SceneStrategyProps> = ({
  episodeLabel,
  sectionTitle,
  accentColor,
  title,
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
  captions,
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
          gap: 22,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ChapterBadge
            name="Strategy badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Strategy title"
            premountFor={fps}
            style={{
              margin: 0,
              fontSize: 48,
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <StrategyLeverageDiagram
            name="Strategy diagram"
            from={0.5 * fps}
            premountFor={fps}
            mode={mode}
            item1Title={item1Title}
            item1Body={item1Body}
            item2Title={item2Title}
            item2Body={item2Body}
            item3Title={item3Title}
            item3Body={item3Body}
            item4Title={item4Title}
            item4Body={item4Body}
            summaryCaption={summaryCaption}
          />
        </div>
      </div>

      <BasicCaptions
        name="Strategy captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_STRATEGY_CAPTIONS}
      />
    </>
  );
};

export const SceneStrategy = Interactive.create({
  Component: SceneStrategyInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP45", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 个人可复制杠杆",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#A7F070",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "同样一天 24 小时，靠三类零成本复制杠杆拉出百倍差距",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "leverage-curve",
      description: "Strategy diagram mode",
      variants: {
        "leverage-curve": {},
        "barbell-strategy": {},
        "circle-competence": {},
        "strategy-compass": {},
      },
    },
    item1Title: { type: "string", default: "纯卖体力与小时数", description: "Item 1 title" },
    item1Body: { type: "string", default: "手停产出归零，每天极限只有 24 小时", description: "Item 1 body" },
    item2Title: { type: "string", default: "无法放大十倍", description: "Item 2 title" },
    item2Body: { type: "string", default: "干十年依旧被绑死在眼前杂活里", description: "Item 2 body" },
    item3Title: { type: "string", default: "代码 ＋ SOP ＋ 模板内容", description: "Item 3 title" },
    item3Body: { type: "string", default: "做完一次可以零成本重复交付十万次", description: "Item 3 body" },
    item4Title: { type: "string", default: "复利资产", description: "Item 4 title" },
    item4Body: { type: "string", default: "把一次性苦劳变成长期睡后产出", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "每次解决完重复痛点，顺手留下一件可复用的杠杆工具",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
