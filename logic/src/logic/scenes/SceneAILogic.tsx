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
  AILogicDiagram,
  type AILogicMode,
} from "../components/AILogicDiagram";
import { BasicCaptions } from "../components/basic-captions.element";
import { ChapterBadge } from "../components/ChapterBadge";

type SceneAILogicProps = {
  readonly episodeLabel: string;
  readonly sectionTitle: string;
  readonly accentColor: string;
  readonly title: string;
  readonly mode: AILogicMode;
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

const DEFAULT_AI_LOGIC_CAPTIONS: Caption[] = [
  {
    text: "把形式逻辑与风控预判装进 AI 工作流，让 AI 成为你的逻辑外脑。",
    startMs: 250,
    endMs: 4200,
    timestampMs: 2225,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneAILogicInner: React.FC<SceneAILogicProps> = ({
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
            name="AI Logic badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor={accentColor}
          />

          <Interactive.H2
            name="AI Logic title"
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
          <AILogicDiagram
            name="AI Logic diagram"
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
        name="AI Logic captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_AI_LOGIC_CAPTIONS}
      />
    </>
  );
};

export const SceneAILogic = Interactive.create({
  Component: SceneAILogicInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP29", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "02 · 形式逻辑 Prompt",
      description: "Section title",
    },
    accentColor: {
      type: "color",
      default: "#38B764",
      description: "Badge color",
    },
    title: {
      type: "string",
      default: "形式逻辑三件套：前提约束 + 布尔边界 + 验收标准",
      description: "Scene title",
    },
    mode: {
      type: "enum",
      default: "prompt-logic",
      description: "AI logic diagram mode",
      variants: {
        "prompt-logic": {},
        "hallucination-check": {},
        "red-blue-team": {},
        "capstone-workflow": {},
      },
    },
    item1Title: {
      type: "string",
      default: "① 锁定前提与角色",
      description: "Item 1 title",
    },
    item1Body: {
      type: "string",
      default: "明确受众、业务目标与客观硬约束（预算、周期、渠道）",
      description: "Item 1 body",
    },
    item2Title: {
      type: "string",
      default: "② 布尔边界（且/或/非）",
      description: "Item 2 title",
    },
    item2Body: {
      type: "string",
      default: "AND 必含表格；OR 二选一路径；NOT 严禁空话与编造",
      description: "Item 2 body",
    },
    item3Title: {
      type: "string",
      default: "③ 客观验收标准",
      description: "Item 3 title",
    },
    item3Body: {
      type: "string",
      default: "规定条数、字数上限与可量化验证指标，不达标直接重做",
      description: "Item 3 body",
    },
    item4Title: {
      type: "string",
      default: "实战模板",
      description: "Item 4 title",
    },
    item4Body: {
      type: "string",
      default: "前提锁死 + 且或非写清 + 验收尺子给到位",
      description: "Item 4 body",
    },
    summaryCaption: {
      type: "string",
      default: "AI 不是许愿池，你把逻辑边界锁死，它才会交出真答案",
      description: "Summary caption",
    },
  } as const satisfies InteractivitySchema,
});
