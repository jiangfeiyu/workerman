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
import { CrisisDiagram, type CrisisMode } from "../components/CrisisDiagram";

type SceneCrisisProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
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
  readonly captions?: Caption[];
};

const DEFAULT_CRISIS_CAPTIONS: Caption[] = [
  {
    text: "打破群体迷思与危机混乱，用系统防呆与钢人论证破局。",
    startMs: 250,
    endMs: 3800,
    timestampMs: 2025,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneCrisisInner: React.FC<SceneCrisisProps> = ({
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
            name="Crisis badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Crisis title"
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
          <CrisisDiagram
            name="Crisis diagram"
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
        name="Crisis captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_CRISIS_CAPTIONS}
      />
    </>
  );
};

export const SceneCrisis = Interactive.create({
  Component: SceneCrisisInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP53", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 群体迷思破冰",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#E43B44",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "打破阿比林悖论：先匿名写雷区，再指定合法反方",
      description: "Scene title",
    },
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
  } as const satisfies InteractivitySchema,
});
