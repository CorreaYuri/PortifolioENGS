import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { MouseGlow } from "../../../components/MouseGlow"
import { projectDetails, projects, site } from "../../../data/portfolio"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) return {}

  return {
    title: `${project.title} | Projeto`,
    description: project.desc,
    alternates: {
      canonical: `${site.url}/projetos/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.desc,
      url: `${site.url}/projetos/${project.slug}`,
      type: "article",
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  const details = projectDetails[slug as keyof typeof projectDetails]

  if (!project || !details) notFound()

  const status = "status" in project ? project.status : project.href ? "Publicado" : "Em breve"
  const hasCover = "img" in project

  return (
    <main className="site-shell min-h-screen text-white">
      <MouseGlow />

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <Link
          href="/#projetos"
          className="btn-micro inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <i className="fa-solid fa-arrow-left" aria-hidden />
          Voltar para projetos
        </Link>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <div className="relative min-h-[18rem] overflow-hidden border-b border-white/10 bg-zinc-950 md:min-h-[26rem]">
            {hasCover ? (
              <Image
                src={project.img}
                alt={project.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1120px"
                className="object-cover opacity-85"
              />
            ) : (
              <div className="project-gradient flex min-h-[18rem] items-center justify-center md:min-h-[26rem]">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">{project.kind}</p>
                  <p className="mt-4 text-7xl font-semibold tracking-normal text-white md:text-8xl">{project.initials}</p>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-6 md:p-8">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                <i className="fa-solid fa-image" aria-hidden />
                {hasCover ? "Capa do projeto" : "Capa provisória"}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-6xl">{project.title}</h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                <i className="fa-solid fa-diagram-project" aria-hidden />
                {project.kind}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm text-white/55">
                <i className={status === "Em desenvolvimento" ? "fa-solid fa-code" : "fa-regular fa-clock"} aria-hidden />
                {status}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/50 px-3 py-1 text-xs text-white/62">
                  <i className="fa-solid fa-circle text-[0.32rem] text-cyan-200/55" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  Abrir projeto
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden />
                </a>
              )}
              <a
                href={`https://wa.me/${site.phoneE164.replace("+", "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-micro inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Conversar sobre este projeto
                <i className="fa-brands fa-whatsapp text-cyan-200" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="max-w-3xl space-y-10 text-lg leading-8 text-white/72">
            <section>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                <i className="fa-solid fa-book-open" aria-hidden />
                Estudo do projeto
              </p>
              <p>{project.desc}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Problema</h2>
              <p className="mt-3">{details.problem}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Meu papel</h2>
              <p className="mt-3">{details.role}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Funcionalidades principais</h2>
              <ul className="mt-4 grid gap-3 text-base leading-7 text-white/68 sm:grid-cols-2">
                {details.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <i className="fa-solid fa-check mt-1 text-sm text-emerald-300" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Impacto</h2>
              <p className="mt-3">{details.impact}</p>
            </section>
          </article>

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">Resumo</p>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cyan-200/65">Status</dt>
                <dd className="mt-1 text-sm text-white/70">{status}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cyan-200/65">Tipo</dt>
                <dd className="mt-1 text-sm text-white/70">{project.kind}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cyan-200/65">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {details.stack.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  )
}
