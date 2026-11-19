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
  EconomicsDiagram,
  type EconomicsMode,
} from "../components/EconomicsDiagram";

type SceneEconomicsProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: EconomicsMode;
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

const DEFAULT_ECONOMICS_CAPTIONS: Caption[] = [
  {
    text: "看懂商业模式与财务底层逻辑，一眼算穿值不值得跟。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneEconomicsInner: React.FC<SceneEconomicsProps> = ({
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
            name="Economics badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Economics title"
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
          <EconomicsDiagram
            name="Economics diagram"
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
        name="Economics captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_ECONOMICS_CAPTIONS}
      />
    </>
  );
};

export const SceneEconomics = Interactive.create({
  Component: SceneEconomicsInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP37", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 单位经济模型 UE",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#FFCD75",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "把大盘账拆成最小一单：可变成本倒挂必死，单单为正才能放大",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "unit-economics",
      description: "Economics diagram mode",
      variants: {
        "unit-economics": {},
        "cash-vs-profit": {},
        "moat-shields": {},
        "pricing-anchor": {},
      },
    },
    item1Title: { type: "string", default: "卖 30 元，直接成本花 36 元", description: "Item 1 title" },
    item1Body: { type: "string", default: "进货 22 + 配送补贴 14 = 36 > 30 元，单均亏损 -6 元", description: "Item 1 body" },
    item2Title: { type: "string", default: "规模越大死越快", description: "Item 2 title" },
    item2Body: { type: "string", default: "卖 10 万单直接净亏 60 万", description: "Item 2 body" },
    item3Title: { type: "string", default: "卖价 35 元 > 变动成本 25 元", description: "Item 3 title" },
    item3Body: { type: "string", default: "单均毛利 +10 元为正，每卖一单都能往回赚房租和研发工资", description: "Item 3 body" },
    item4Title: { type: "string", default: "摊薄固定成本", description: "Item 4 title" },
    item4Body: { type: "string", default: "销量越过平衡点后净利暴涨", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "先让最小一单赚正毛利，再谈做大规模摊薄固定成本",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
