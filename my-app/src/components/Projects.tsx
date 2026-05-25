import Image from "next/image"
import { projects } from "../data/portfolio"
import { Reveal } from "./Reveal"

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const hasLink = p.href.length > 0
  const isGithub = p.href.includes("github.com")
  const hasImage = "img" in p

  return (
    <Reveal
      as="article"
      delay={index * 120}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
        {hasImage ? (
          <Image
            className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
            src={p.img}
            alt={p.alt}
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.24),transparent_32%),linear-gradient(135deg,rgba(34,197,94,0.12),rgba(9,9,11,0.95)_48%,rgba(251,191,36,0.14))] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                {p.kind}
              </span>
              <i className="fa-solid fa-diagram-project text-cyan-200/80" aria-hidden />
            </div>
            <div>
              <p className="text-5xl font-semibold tracking-normal text-white">{p.initials}</p>
              <p className="mt-2 max-w-xs text-sm text-white/55">Produto real, regras de negócio e arquitetura aplicada.</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            {"kind" in p && hasImage && <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200/70">{p.kind}</p>}
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          </div>

          {hasLink ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              aria-label={`Abrir ${p.title}`}
            >
              <i className={isGithub ? "fa-brands fa-github" : "fa-solid fa-arrow-up-right-from-square"} aria-hidden />
            </a>
          ) : (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">Em breve</span>
          )}
        </div>

        <p className="mt-3 flex-1 leading-7 text-white/65">{p.desc}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags?.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-zinc-950/50 px-3 py-1 text-xs text-white/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export function Projects() {
  return (
    <>
      <div className="md:hidden snap-x flex overflow-x-auto gap-4 p-1 pb-3 scrollbar-hide">
        {projects.map((p) => (
          <div key={p.title} className="snap-center flex-shrink-0 w-[min(20rem,88vw)]">
            <ProjectCard p={p} index={0} />
          </div>
        ))}
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, index) => (
          <ProjectCard key={p.title} p={p} index={index} />
        ))}
      </div>
    </>
  )
}
