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
import {
  AgentFlowDiagram,
  type AgentFlowMode,
} from "../components/AgentFlowDiagram";
import { BasicCaptions } from "../components/basic-captions.element";
import { ChapterBadge } from "../components/ChapterBadge";

type SceneAgentFlowProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: AgentFlowMode;
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

const DEFAULT_AGENT_FLOW_CAPTIONS: Caption[] = [
  {
    text: "用确定性铁轨、三权分立隔离与人类卡点闸门，搭建防翻车的智能体流水线。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneAgentFlowInner: React.FC<SceneAgentFlowProps> = ({
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
            name="AgentFlow badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="AgentFlow title"
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
          <AgentFlowDiagram
            name="AgentFlow diagram"
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
        name="AgentFlow captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_AGENT_FLOW_CAPTIONS}
      />
    </>
  );
};

export const SceneAgentFlow = Interactive.create({
  Component: SceneAgentFlowInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP61", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 铁轨 vs 大脑",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "确定性铁轨锁算账，概率性大脑做理解",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "deterministic-probabilistic",
      description: "Agent flow diagram mode",
      variants: {
        "deterministic-probabilistic": {},
        "multi-agent-separation": {},
        "rag-hygiene": {},
        "human-in-the-loop": {},
      },
    },
    item1Title: { type: "string", default: "写死算账与校验", description: "Item 1 title" },
    item1Body: {
      type: "string",
      default: "金额计算、时间比对、格式与权限拦截必须走确定性代码",
      description: "Item 1 body",
    },
    item2Title: { type: "string", default: "释放语义与归纳", description: "Item 2 title" },
    item2Body: {
      type: "string",
      default: "长文摘要、需求拆解、文案起草交由大模型发挥弹性",
      description: "Item 2 body",
    },
    item3Title: { type: "string", default: "混合铁律", description: "Item 3 title" },
    item3Body: {
      type: "string",
      default: "代码铺好铁轨和刹车，大模型只在车厢里提供智能",
      description: "Item 3 body",
    },
    item4Title: { type: "string", default: "防呆原则", description: "Item 4 title" },
    item4Body: {
      type: "string",
      default: "人控最后一公里红灯闸门",
      description: "Item 4 body",
    },
    summaryCaption: {
      type: "string",
      default: "铁轨锁死边界与算账，大模型只负责语义理解与创造",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
