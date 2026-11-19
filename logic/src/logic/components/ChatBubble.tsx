import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { PixelAvatar } from "./PixelAvatar";

type ChatBubbleProps = {
  readonly sender: string;
  readonly role: string;
  readonly message: string;
  readonly align: "left" | "right";
  readonly avatarColor: string;
  readonly bubbleColor: string;
  readonly textColor: string;
  readonly style?: React.CSSProperties;
};

const ChatBubbleInner: React.FC<ChatBubbleProps> = ({
  sender,
  role,
  message,
  align,
  avatarColor,
  bubbleColor,
  textColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isRight = align === "right";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isRight ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 24,
        width: "100%",
        fontFamily:
          '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", monospace',
        opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [0, 0.85 * fps],
          ["0px 24px", "0px 0px"],
          {
            easing: Easing.bezier(0.22, 1, 0.36, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        ...style,
      }}
    >
      <PixelAvatar
        variant={isRight ? "boss" : "colleague"}
        bgColor={avatarColor}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isRight ? "flex-end" : "flex-start",
          maxWidth: 1120,
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexDirection: isRight ? "row-reverse" : "row",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#FFCD75",
              textShadow: "2px 2px 0px #0D0E15",
            }}
          >
            {sender}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1A1C2C",
              backgroundColor: "#73EFF7",
              padding: "2px 12px",
              border: "2px solid #0D0E15",
              boxShadow: "3px 3px 0px #0D0E15",
            }}
          >
            {role}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            backgroundColor: bubbleColor,
            color: textColor,
            padding: "22px 30px",
            fontSize: 30,
            lineHeight: 1.55,
            fontWeight: 600,
            border: "4px solid #F4F4F4",
            boxShadow: "8px 8px 0px #0D0E15",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

const chatBubbleSchema = {
  ...Interactive.baseSchema,
  sender: { type: "string", default: "同事小李", description: "Sender name" },
  role: { type: "string", default: "产品经理", description: "Role tag" },
  message: {
    type: "string",
    default: "最近大家反馈新版本很卡，所以我们这周必须暂停开发，全员修 Bug！",
    description: "Message text",
  },
  align: {
    type: "enum",
    default: "left",
    description: "Bubble alignment",
    variants: {
      left: {},
      right: {},
    },
  },
  avatarColor: {
    type: "color",
    default: "#41A6F6",
    description: "Avatar color",
  },
  bubbleColor: {
    type: "color",
    default: "#262B44",
    description: "Bubble background",
  },
  textColor: {
    type: "color",
    default: "#F4F4F4",
    description: "Message text color",
  },
} as const satisfies InteractivitySchema;

export const ChatBubble = Interactive.create({
  Component: ChatBubbleInner,
  layout: "none",
  schema: chatBubbleSchema,
});
