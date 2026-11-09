import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "PeachTech LLC — AI software development agency, hiring software engineers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/logo-label.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FCE8D4 0%, #FFF1E4 55%, #FBC7AD 100%)",
          color: "#2A1812",
        }}
      >
        <img src={logoSrc} height={110} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            AI-first software development agency
          </div>
          <div style={{ marginTop: 22, fontSize: 32, color: "#75594D" }}>
            Intelligent web services · Now hiring software & AI engineers
          </div>
        </div>
      </div>
    ),
    size,
  );
}
