import { ImageResponse } from "next/og";
import { COMPANY } from "@/constants/config";
import { THEME } from "@/constants/theme";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${THEME.dark} 0%, ${THEME.darker} 100%)`,
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 6,
              color: THEME.primary,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {COMPANY.tagline}
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: THEME.white,
              fontFamily: "serif",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {COMPANY.name}
          </span>
          <span
            style={{
              marginTop: 32,
              fontSize: 30,
              color: "rgba(255,255,255,0.75)",
              textAlign: "center",
            }}
          >
            Certified Guides &middot; Safety-First Gear &middot; Ganga Rapids
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
