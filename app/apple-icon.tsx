import { ImageResponse } from "next/og";
import { productMarkPaths } from "@/components/marks";

// The home-screen icon, drawn from the same mark as app/icon.svg (option A, stand-in).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#2f3f8f" }}>
        <svg width="150" height="150" viewBox="0 0 32 32">
          <path d={productMarkPaths.arrow} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <path d={productMarkPaths.head} fill="none" stroke="#e8734f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
