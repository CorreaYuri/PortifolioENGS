import type { CSSProperties } from "react"
import { skillGroups } from "../data/portfolio"
import { Reveal } from "./Reveal"

const groupIcons: Record<string, string> = {
  Linguagens: "fa-solid fa-terminal",
  "Desenvolvimento web": "fa-solid fa-window-restore",
  "Backend e arquitetura": "fa-solid fa-server",
  "Produto e operação": "fa-solid fa-compass-drafting",
}

export function Skills() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {skillGroups.map((group, index) => (
        <Reveal
          key={group.title}
          as="section"
          delay={index * 110}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.06]"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <i className={`${groupIcons[group.title] ?? "fa-solid fa-code"} text-cyan-200/80`} aria-hidden />
              <span>{group.title}</span>
            </h3>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <ul className="space-y-4">
            {group.items.map((it) => (
              <li key={it.name} className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white/82">{it.name}</span>
                  <span className="text-xs tabular-nums text-white/45">{it.level}%</span>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-label={`${it.name} nível`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={it.level}
                >
                  <div
                    className="skill-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200"
                    style={{ "--skill-level": `${it.level}%` } as CSSProperties}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
