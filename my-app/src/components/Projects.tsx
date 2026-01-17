import Image from "next/image"
import { projects } from "../data/portfolio"

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const isGithub = p.href.includes("github.com")

  return (
    <article className="text-white border border-blue-500 p-5 rounded-lg space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-blue-400 text-xl">{p.title}</h3>

        <a
          href={p.href}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Abrir ${p.title}`}
        >
          <i className={isGithub ? "fa-brands fa-github" : "fa-solid fa-arrow-up-right-from-square"} aria-hidden />
          <span className="text-sm">Abrir</span>
        </a>
      </div>

      <p className="text-white/90">{p.desc}</p>

      <div className="flex flex-wrap gap-2">
        {p.tags?.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">
            {t}
          </span>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Image className="h-auto w-40" src={p.img} alt={p.alt} sizes="160px" />
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <>
      {/* Mobile: carrossel */}
      <div className="md:hidden snap-x flex overflow-x-auto gap-4 p-2 scrollbar-hide">
        {projects.map((p) => (
          <div key={p.title} className="snap-center flex-shrink-0 w-80">
            <ProjectCard p={p} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </>
  )
}
