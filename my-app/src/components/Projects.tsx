import Image from "next/image"
import Link from "next/link"
import { projects } from "../data/portfolio"
import { Reveal } from "./Reveal"

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const hasLink = p.href.length > 0
  const isGithub = p.href.includes("github.com")
  const hasImage = "img" in p
  const status = "status" in p ? p.status : "Em breve"
  const isNexaClub = p.title === "NexaClub"

  return (
    <Reveal
      as="article"
      delay={index * 120}
      className={`premium-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06] ${
        index < 3 ? "md:col-span-1 lg:min-h-[31rem]" : ""
      }`}
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
          <div className={`${isNexaClub ? "nexaclub-gradient" : "project-gradient"} flex h-full flex-col justify-between p-5`}>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                <i className={`${isNexaClub ? "fa-solid fa-wand-magic-sparkles text-fuchsia-200/80" : "fa-solid fa-cube text-cyan-200/70"}`} aria-hidden />
                {p.kind}
              </span>
              <i className={isNexaClub ? "fa-solid fa-chart-line text-fuchsia-200/80" : "fa-solid fa-diagram-project text-cyan-200/80"} aria-hidden />
            </div>
            <div>
              <p className={`text-5xl font-semibold tracking-normal ${isNexaClub ? "text-transparent bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text" : "text-white"}`}>
                {p.initials}
              </p>
              <p className="mt-2 max-w-xs text-sm text-white/55">
                {isNexaClub ? "Gestão inteligente. Experiência única." : "Produto real, regras de negócio e arquitetura aplicada."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            {"kind" in p && hasImage && (
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200/70">
                <i className="fa-solid fa-tag" aria-hidden />
                <span>{p.kind}</span>
              </p>
            )}
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          </div>

          <Link
            href={`/projetos/${p.slug}`}
            className="btn-micro inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            aria-label={`Ver detalhes de ${p.title}`}
          >
            <i className="fa-solid fa-arrow-right" aria-hidden />
          </Link>

          {hasLink ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-micro inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              aria-label={`Abrir repositório de ${p.title}`}
            >
              <i className={isGithub ? "fa-brands fa-github" : "fa-solid fa-arrow-up-right-from-square"} aria-hidden />
            </a>
          ) : null}
          {!hasLink && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
              <i className={status === "Em desenvolvimento" ? "fa-solid fa-code" : "fa-regular fa-clock"} aria-hidden />
              {status}
            </span>
          )}
        </div>

        <p className="mt-3 flex-1 leading-7 text-white/65">{p.desc}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags?.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/50 px-3 py-1 text-xs text-white/60">
              <i className="fa-solid fa-circle text-[0.32rem] text-cyan-200/55" aria-hidden />
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projetos/${p.slug}`}
          className="btn-micro mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          Ver estudo do projeto
          <i className="fa-solid fa-arrow-right" aria-hidden />
        </Link>
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
