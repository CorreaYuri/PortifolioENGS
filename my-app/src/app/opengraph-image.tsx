import { ImageResponse } from "next/og"

import { site } from "../data/portfolio"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
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
          color: "white",
          background:
            "radial-gradient(circle at 20% 20%, rgba(103,232,249,0.25), transparent 30%), radial-gradient(circle at 85% 25%, rgba(124,58,237,0.32), transparent 32%), linear-gradient(135deg, #09090b, #111113)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: "linear-gradient(135deg, #67e8f9, #7c3aed)",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            Y
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>{site.name}</span>
            <span style={{ fontSize: 22, color: "rgba(255,255,255,0.65)" }}>Engenharia de Software | Nexa</span>
          </div>
        </div>

        <div>
          <h1 style={{ maxWidth: 880, margin: 0, fontSize: 72, lineHeight: 1.02, letterSpacing: 0, fontWeight: 800 }}>
            Produtos digitais, backend e sistemas para negócios reais.
          </h1>
          <p style={{ maxWidth: 820, marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.72)" }}>
            Portfólio com projetos SaaS, APIs, IA no desenvolvimento, documentação técnica e visão de produto.
          </p>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#a5f3fc" }}>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>APIs</span>
          <span>SaaS</span>
          <span>Nexa</span>
        </div>
      </div>
    ),
    size,
  )
}
