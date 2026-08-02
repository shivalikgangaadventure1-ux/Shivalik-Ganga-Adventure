import { ImageResponse } from "next/og";
import { THEME } from "@/constants/theme";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: THEME.dark,
        }}
      >
        <span
          style={{
            color: THEME.primary,
            fontSize: 96,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
