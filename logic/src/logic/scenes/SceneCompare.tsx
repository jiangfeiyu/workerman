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

type SceneCompareProps = {
  readonly episodeLabel?: string;
  readonly sectionTitle?: string;
  readonly title: string;
  readonly badLabel?: string;
  readonly badSubtitle?: string;
  readonly badExample: string;
  readonly badNote?: string;
  readonly goodLabel?: string;
  readonly goodSubtitle?: string;
  readonly goodExample: string;
  readonly goodNote?: string;
  readonly goodCardSec?: number;
  readonly captions?: Caption[];
};

const DEFAULT_COMPARE_CAPTIONS: Caption[] = [
  {
    text: "来看改写对比：左边是感受、杂讯和武断结论，",
    startMs: 250,
    endMs: 4710,
    timestampMs: 2480,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "右边只要调个顺序：先亮结论，再给硬事实，",
    startMs: 4960,
    endMs: 8743,
    timestampMs: 6851,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "最后写清收益与代价，老板十秒就能批！",
    startMs: 8993,
    endMs: 12015,
    timestampMs: 10504,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneCompareInner: React.FC<SceneCompareProps> = ({
  episodeLabel = "EP01",
  sectionTitle = "03 · 职场汇报前后对比",
  title,
  badLabel = "✖ 流水账写法",
  badSubtitle = "情绪+杂讯堆砌",
  badExample,
  badNote = "问题：没有硬数据、塞入无关信息、结论模糊",
  goodLabel = "✔ 逻辑论证写法",
  goodSubtitle = "结论先行+数据支撑",
  goodExample,
  goodNote = "亮点：先亮结论 → 给 2 个硬事实 → 明晰代价与边界",
  goodCardSec = 5.0,
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
          gap: 28,
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ChapterBadge
            name="Compare badge"
            premountFor={fps}
            episodeLabel={episodeLabel}
            sectionTitle={sectionTitle}
            accentColor="#F77622"
          />

          <Interactive.H2
            name="Compare title"
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
            gap: 40,
            flex: 1,
          }}
        >
          <Interactive.Div
            name="Bad report card"
            from={0.8 * fps}
            premountFor={fps}
            style={{
              backgroundColor: "#262B44",
              border: "4px solid #E43B44",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              opacity: interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [0.8 * fps, 1.55 * fps],
                ["-26px 0px", "0px 0px"],
                {
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#F4F4F4",
                  backgroundColor: "#E43B44",
                  padding: "6px 16px",
                  border: "2px solid #0D0E15",
                  boxShadow: "3px 3px 0px #0D0E15",
                }}
              >
                {badLabel}
              </span>
              <span style={{ fontSize: 24, color: "#FFCD75", fontWeight: 700 }}>
                {badSubtitle}
              </span>
            </div>

            <div
              style={{
                fontSize: 30,
                lineHeight: 1.6,
                color: "#F4F4F4",
              }}
            >
              {badExample}
            </div>

            <div
              style={{
                marginTop: "auto",
                fontSize: 22,
                fontWeight: 700,
                color: "#F4F4F4",
                backgroundColor: "#B13E53",
                border: "2px solid #0D0E15",
                padding: "14px 18px",
              }}
            >
              {badNote}
            </div>
          </Interactive.Div>

          <Interactive.Div
            name="Good report card"
            from={goodCardSec * fps}
            premountFor={fps}
            style={{
              backgroundColor: "#262B44",
              border: "4px solid #38B764",
              boxShadow: "8px 8px 0px #0D0E15",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              opacity: interpolate(
                frame,
                [goodCardSec * fps, (goodCardSec + 0.5) * fps],
                [0, 1],
                {
                  easing: Easing.out(Easing.cubic),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
              translate: interpolate(
                frame,
                [goodCardSec * fps, (goodCardSec + 0.75) * fps],
                ["26px 0px", "0px 0px"],
                {
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1A1C2C",
                  backgroundColor: "#38B764",
                  padding: "6px 16px",
                  border: "2px solid #0D0E15",
                  boxShadow: "3px 3px 0px #0D0E15",
                }}
              >
                {goodLabel}
              </span>
              <span style={{ fontSize: 24, color: "#A7F070", fontWeight: 700 }}>
                {goodSubtitle}
              </span>
            </div>

            <div
              style={{
                fontSize: 30,
                lineHeight: 1.6,
                color: "#F4F4F4",
                fontWeight: 500,
              }}
            >
              {goodExample}
            </div>

            <div
              style={{
                marginTop: "auto",
                fontSize: 22,
                fontWeight: 700,
                color: "#1A1C2C",
                backgroundColor: "#A7F070",
                border: "2px solid #0D0E15",
                padding: "14px 18px",
              }}
            >
              {goodNote}
            </div>
          </Interactive.Div>
        </div>
      </div>

      <BasicCaptions
        name="Compare captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_COMPARE_CAPTIONS}
      />
    </>
  );
};

export const SceneCompare = Interactive.create({
  Component: SceneCompareInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP01", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "03 · 职场汇报前后对比",
      description: "Section title",
    },
    title: {
      type: "string",
      default: "同样一件事，换个结构说，通过率直接翻倍",
      description: "Compare title",
    },
    badLabel: {
      type: "string",
      default: "✖ 流水账写法",
      description: "Left badge",
    },
    badSubtitle: {
      type: "string",
      default: "情绪+杂讯堆砌",
      description: "Left subtitle",
    },
    badExample: {
      type: "string",
      default:
        "“最近大家反馈新版本很卡，我昨晚也闪退两次，而且竞品昨天刚上新功能。所以我们这周必须暂停开发，全员修 Bug！”",
      description: "Bad example",
    },
    badNote: {
      type: "string",
      default: "问题：没有硬数据、塞入无关信息、结论模糊",
      description: "Left note",
    },
    goodLabel: {
      type: "string",
      default: "✔ 逻辑论证写法",
      description: "Right badge",
    },
    goodSubtitle: {
      type: "string",
      default: "结论先行+数据支撑",
      description: "Right subtitle",
    },
    goodExample: {
      type: "string",
      default:
        "“【结论】建议抽 2 位开发用 2 天集中修 P0 闪退。【事实】昨日崩溃率从 0.3% 升至 3.2%，已影响 18% 新用户留存。修完后可保住本周转化目标。”",
      description: "Good example",
    },
    goodNote: {
      type: "string",
      default: "亮点：先亮结论 → 给 2 个硬事实 → 明晰代价与边界",
      description: "Right note",
    },
  } as const satisfies InteractivitySchema,
});
