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
  SystemLoopDiagram,
  type SystemLoopMode,
} from "../components/SystemLoopDiagram";

type SceneSystemLoopProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: SystemLoopMode;
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

const DEFAULT_SYSTEM_LOOP_CAPTIONS: Caption[] = [
  {
    text: "从线性因果升级到系统回路，看清动态反馈、滞后效应与指标异化。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneSystemLoopInner: React.FC<SceneSystemLoopProps> = ({
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
            name="System loop badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="System loop title"
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
          <SystemLoopDiagram
            name="System loop diagram"
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
        name="System loop captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_SYSTEM_LOOP_CAPTIONS}
      />
    </>
  );
};

export const SceneSystemLoop = Interactive.create({
  Component: SceneSystemLoopInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP33", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 增强与调节回路",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "越砸钱越不长？因为触发了暗处的“调节刹车”",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "reinforcing-balancing",
      description: "System loop diagram mode",
      variants: {
        "reinforcing-balancing": {},
        "delay-trap": {},
        "shifting-burden": {},
        "goodhart-kpi": {},
      },
    },
    item1Title: { type: "string", default: "口碑推荐飞轮越转越快", description: "Item 1 title" },
    item1Body: { type: "string", default: "老客推荐新客 ➔ 新客留好评价 ➔ 吸引更多新客", description: "Item 1 body" },
    item2Title: { type: "string", default: "前期增长极猛", description: "Item 2 title" },
    item2Body: { type: "string", default: "每投 1 块都能撬动复利", description: "Item 2 body" },
    item3Title: { type: "string", default: "服务过载拉平增长曲线", description: "Item 3 title" },
    item3Body: { type: "string", default: "客服排队/引导断层 ➔ 退订率飙升 ➔ 净增长停滞", description: "Item 3 body" },
    item4Title: { type: "string", default: "先拆手刹再加油", description: "Item 4 title" },
    item4Body: { type: "string", default: "打通新人引导比硬砸广告更有效", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "增长撞墙不是油门不够，而是触发了系统调节刹车",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
