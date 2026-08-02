import { ImageResponse } from "next/og";
import { THEME } from "@/constants/theme";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: THEME.primary,
            fontSize: 20,
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
