import { ImageResponse } from "next/og";
import { productMarkPaths } from "@/components/marks";
import { siteTagline } from "@/lib/site";

// The link-preview card, drawn by the app in its own look (DEMO-STANDARD.md).
// An image cannot read CSS variables, so these hex values copy app/globals.css.
const paper = "#f6f4ef";
const ink = "#1b1e2c";
const muted = "#5b6070";
const brand = "#2f3f8f";
const coral = "#e8734f";

export const alt = `Win-Back: ${siteTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: paper, color: ink, padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="44" height="44" viewBox="0 0 32 32">
                <path d={productMarkPaths.arrow} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
                <path d={productMarkPaths.head} fill="none" stroke={coral} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Win-Back
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 70, fontWeight: 700, lineHeight: 1.04 }}>
            <span>Bring back the customers</span>
            <span>who stopped calling.</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: muted, maxWidth: 700, fontFamily: "sans-serif" }}>
            Found in your own records. A message to each. You approve every one.
          </div>
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div style={{ display: "flex", padding: "14px 30px", borderRadius: 4, background: brand, color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "sans-serif" }}>
              Try the demo · no signup
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
