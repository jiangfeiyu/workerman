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
  OrgMechanismDiagram,
  type OrgMechanismMode,
} from "../components/OrgMechanismDiagram";

type SceneOrgMechanismProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: OrgMechanismMode;
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

const DEFAULT_ORG_CAPTIONS: Caption[] = [
  {
    text: "带团队、管外包不靠吼和催，靠机制与边界设计自动运转。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneOrgMechanismInner: React.FC<SceneOrgMechanismProps> = ({
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
            name="Org mechanism badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="Org mechanism title"
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
          <OrgMechanismDiagram
            name="Org mechanism diagram"
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
        name="Org mechanism captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_ORG_CAPTIONS}
      />
    </>
  );
};

export const SceneOrgMechanism = Interactive.create({
  Component: SceneOrgMechanismInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP41", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 激励相容设计",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "告别“猫鼠盯梢”：用激励相容把分钱与目标绑在一起",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "principal-agent",
      description: "Organization mechanism diagram mode",
      variants: {
        "principal-agent": {},
        "lemon-market": {},
        "conway-boundary": {},
        "two-way-door": {},
      },
    },
    item1Title: { type: "string", default: "按天付死薪水，目标完全打架", description: "Item 1 title" },
    item1Body: { type: "string", default: "拖越久赚越多，省成本反而拿少钱", description: "Item 1 body" },
    item2Title: { type: "string", default: "天天盯梢极度内耗", description: "Item 2 title" },
    item2Body: { type: "string", default: "监工成本比干活工资还贵", description: "Item 2 body" },
    item3Title: { type: "string", default: "总价包干 ＋ 省本提前分红", description: "Item 3 title" },
    item3Body: { type: "string", default: "干得又快又好，对方自己多拿大头奖金", description: "Item 3 body" },
    item4Title: { type: "string", default: "自驱赶进度", description: "Item 4 title" },
    item4Body: { type: "string", default: "不用催就能高效交付", description: "Item 4 body" },
    summaryCaption: {
      type: "string",
      default: "好机制让对方为自己赚钱的同时，刚好把你的事办成",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
