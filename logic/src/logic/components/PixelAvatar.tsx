import type React from "react";

type PixelAvatarProps = {
  readonly variant: "colleague" | "boss";
  readonly bgColor: string;
};

/**
 * Crisp 12x12 pixel-art cartoon avatar rendered via SVG.
 */
export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  variant,
  bgColor,
}) => {
  const isBoss = variant === "boss";

  return (
    <div
      style={{
        width: 84,
        height: 84,
        backgroundColor: bgColor,
        border: "4px solid #F4F4F4",
        boxShadow: "6px 6px 0px #0D0E15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 12 12"
        shapeRendering="crispEdges"
      >
        {/* Hair */}
        {isBoss ? (
          <>
            <rect x="3" y="1" width="6" height="1" fill="#333C57" />
            <rect x="2" y="2" width="8" height="2" fill="#333C57" />
          </>
        ) : (
          <>
            <rect x="3" y="1" width="6" height="1" fill="#29366F" />
            <rect x="2" y="2" width="8" height="1" fill="#29366F" />
            <rect x="2" y="3" width="2" height="1" fill="#29366F" />
            <rect x="8" y="3" width="2" height="1" fill="#29366F" />
          </>
        )}

        {/* Face */}
        <rect x="3" y="3" width="6" height="5" fill="#FFCD75" />
        <rect x="2" y="4" width="1" height="3" fill="#FFCD75" />
        <rect x="9" y="4" width="1" height="3" fill="#FFCD75" />

        {/* Blush */}
        <rect x="3" y="6" width="1" height="1" fill="#F77622" />
        <rect x="8" y="6" width="1" height="1" fill="#F77622" />

        {/* Eyes & Glasses */}
        {isBoss ? (
          <>
            {/* Raised eyebrow + expressive eyes */}
            <rect x="4" y="4" width="1" height="1" fill="#1A1C2C" />
            <rect x="7" y="4" width="1" height="1" fill="#1A1C2C" />
            <rect x="4" y="5" width="1" height="1" fill="#1A1C2C" />
            <rect x="7" y="5" width="1" height="1" fill="#1A1C2C" />
            {/* Questioning mouth */}
            <rect x="5" y="7" width="2" height="1" fill="#B13E53" />
          </>
        ) : (
          <>
            {/* Cute pixel glasses */}
            <rect x="3" y="4" width="3" height="2" fill="#1A1C2C" />
            <rect x="6" y="4" width="3" height="2" fill="#1A1C2C" />
            <rect x="4" y="4" width="1" height="1" fill="#73EFF7" />
            <rect x="7" y="4" width="1" height="1" fill="#73EFF7" />
            {/* Smile */}
            <rect x="5" y="7" width="2" height="1" fill="#E43B44" />
          </>
        )}

        {/* Outfit */}
        {isBoss ? (
          <>
            <rect x="2" y="8" width="8" height="3" fill="#262B44" />
            <rect x="5" y="8" width="2" height="1" fill="#F4F4F4" />
            <rect x="5" y="9" width="2" height="2" fill="#E43B44" />
          </>
        ) : (
          <>
            <rect x="2" y="8" width="8" height="3" fill="#3B5DC9" />
            <rect x="5" y="8" width="2" height="3" fill="#73EFF7" />
          </>
        )}
      </svg>
    </div>
  );
};
