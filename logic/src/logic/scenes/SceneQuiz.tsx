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

type SceneQuizProps = {
  readonly episodeLabel?: string;
  readonly sectionTitle?: string;
  readonly question: string;
  readonly answer: string;
  readonly mantra: string;
  readonly countdownStartSec?: number;
  readonly answerSec?: number;
  readonly mantraSec?: number;
  readonly captions?: Caption[];
};

const DEFAULT_QUIZ_CAPTIONS: Caption[] = [
  {
    text: "最后三秒自测：同事说配色很高级，大厂都在用，",
    startMs: 250,
    endMs: 4550,
    timestampMs: 2400,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "这里缺的是能证明上线更好的客观数据前提。",
    startMs: 4950,
    endMs: 7899,
    timestampMs: 6424,
    confidence: null,
    pageBreakAfter: true,
  },
  {
    text: "记住口诀：结论先行，事实撑腰，无关项统统丢掉！",
    startMs: 8299,
    endMs: 13116,
    timestampMs: 10707,
    confidence: null,
    pageBreakAfter: true,
  },
];

const SceneQuizInner: React.FC<SceneQuizProps> = ({
  episodeLabel = "EP01",
  sectionTitle = "04 · 3 秒随堂小测 & 口诀",
  question,
  answer,
  mantra,
  countdownStartSec = 1.8,
  answerSec = 4.95,
  mantraSec = 8.3,
  captions,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countdownEndSec = countdownStartSec + 3.0;
  const totalBlocks = 20;
  const filledBlocks = Math.round(
    interpolate(
      frame,
      [countdownStartSec * fps, countdownEndSec * fps],
      [totalBlocks, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const countdownSeconds = Math.max(
    0,
    Math.ceil(
      interpolate(
        frame,
        [countdownStartSec * fps, countdownEndSec * fps],
        [3, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      ),
    ),
  );

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
        <ChapterBadge
          name="Quiz badge"
          premountFor={fps}
          episodeLabel={episodeLabel}
          sectionTitle={sectionTitle}
          accentColor="#A77BCA"
        />

        <Interactive.Div
          name="Quiz prompt card"
          premountFor={fps}
          style={{
            backgroundColor: "#262B44",
            border: "4px solid #A77BCA",
            boxShadow: "8px 8px 0px #0D0E15",
            padding: "30px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#73EFF7",
              }}
            >
              ▶ 考考你：下面这句话里有什么问题？
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#1A1C2C",
                backgroundColor: countdownSeconds > 0 ? "#FFCD75" : "#38B764",
                padding: "4px 16px",
                border: "2px solid #0D0E15",
                boxShadow: "3px 3px 0px #0D0E15",
              }}
            >
              {countdownSeconds > 0
                ? `思考倒计时 ${countdownSeconds}s`
                : "✔ 揭晓答案"}
            </span>
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#F4F4F4",
              lineHeight: 1.45,
            }}
          >
            {question}
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
              padding: 6,
              backgroundColor: "#1A1C2C",
              border: "2px solid #F4F4F4",
            }}
          >
            {Array.from({ length: totalBlocks }).map((_, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: 14,
                  backgroundColor:
                    index < filledBlocks ? "#FFCD75" : "#333C57",
                }}
              />
            ))}
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Quiz answer reveal"
          from={answerSec * fps}
          premountFor={fps}
          style={{
            backgroundColor: "#262B44",
            border: "4px solid #38B764",
            boxShadow: "8px 8px 0px #0D0E15",
            padding: "24px 34px",
            fontSize: 30,
            lineHeight: 1.5,
            color: "#F4F4F4",
            fontWeight: 600,
            opacity: interpolate(
              frame,
              [answerSec * fps, (answerSec + 0.5) * fps],
              [0, 1],
              {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            translate: interpolate(
              frame,
              [answerSec * fps, (answerSec + 0.7) * fps],
              ["0px 20px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          {answer}
        </Interactive.Div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 148,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Takeaway mantra"
          from={mantraSec * fps}
          premountFor={fps}
          style={{
            padding: "18px 44px",
            backgroundColor: "#FFCD75",
            border: "4px solid #F4F4F4",
            boxShadow: "8px 8px 0px #0D0E15",
            color: "#1A1C2C",
            fontSize: 32,
            fontWeight: 800,
            fontFamily:
              '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
            opacity: interpolate(
              frame,
              [mantraSec * fps, (mantraSec + 0.5) * fps],
              [0, 1],
              {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            translate: interpolate(
              frame,
              [mantraSec * fps, (mantraSec + 0.7) * fps],
              ["0px 20px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          ★ {mantra}
        </Interactive.Div>
      </div>

      <BasicCaptions
        name="Quiz captions"
        width={1400}
        combineTokensWithinMilliseconds={100}
        style={{
          position: "absolute",
          bottom: 28,
          translate: "260px 0px",
        }}
        captions={captions ?? DEFAULT_QUIZ_CAPTIONS}
      />
    </>
  );
};

export const SceneQuiz = Interactive.create({
  Component: SceneQuizInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    ...Interactive.captionsSchema,
    episodeLabel: { type: "string", default: "EP01", description: "Episode" },
    sectionTitle: {
      type: "string",
      default: "04 · 3 秒随堂小测 & 口诀",
      description: "Section title",
    },
    question: {
      type: "string",
      default:
        "“这个设计稿配色很高级，大厂都在用，所以我建议今天直接定稿上线！”",
      description: "Quiz question",
    },
    answer: {
      type: "string",
      default:
        "答案：只有“主观感受（高级）+ 诉诸他人（大厂）”，缺少能支撑“上线效果更好”的客观前提（如点击率测试数据、目标用户匹配度）。",
      description: "Quiz answer",
    },
    mantra: {
      type: "string",
      default: "本集口诀：结论先行，事实撑腰；情绪和无关项，统统丢掉！",
      description: "Takeaway mantra",
    },
  } as const satisfies InteractivitySchema,
});
