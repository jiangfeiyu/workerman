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
  NegotiationDiagram,
  type NegotiationMode,
} from "../components/NegotiationDiagram";

type SceneNegotiationProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: NegotiationMode;
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

const DEFAULT_NEGOTIATION_CAPTIONS: Caption[] = [
  {
    text: "穿透表层情绪与立场，用机制与结构化解职场博弈。",
    startMs: 250,
    endMs: 3800,
    timestampMs: 2025,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneNegotiationInner: React.FC<SceneNegotiationProps> = ({
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
            name="Negotiation badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Negotiation title"
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
          <NegotiationDiagram
            name="Negotiation diagram"
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
        name="Negotiation captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_NEGOTIATION_CAPTIONS}
      />
    </>
  );
};

export const SceneNegotiation = Interactive.create({
  Component: SceneNegotiationInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP21", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 四层剥离法",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "别在立场上死磕，往下剥四层直达底层真需求",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "four-layers",
      description: "Negotiation diagram mode",
      variants: {
        "four-layers": {},
        "payoff-matrix": {},
        "bias-anchor": {},
        "upward-grey": {},
      },
    },
    item1Title: { type: "string", default: "① 立场", description: "Item 1 title" },
    item1Body: { type: "string", default: "绝不同意上线！", description: "Item 1 body" },
    item2Title: { type: "string", default: "② 观点", description: "Item 2 title" },
    item2Body: { type: "string", default: "这版本风险太大！", description: "Item 2 body" },
    item3Title: { type: "string", default: "③ 事实", description: "Item 3 title" },
    item3Body: { type: "string", default: "上个月抢上线崩过 2 小时", description: "Item 3 body" },
    item4Title: { type: "string", default: "④ 真需求", description: "Item 4 title" },
    item4Body: { type: "string", default: "怕再出事故背绩效锅，需要安全兜底", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "不要在第一层立场硬碰硬，向下剥到真需求就能共赢",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
