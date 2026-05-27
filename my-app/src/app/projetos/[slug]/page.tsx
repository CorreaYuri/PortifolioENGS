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

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
              <i className="fa-solid fa-diagram-project" aria-hidden />
              {project.kind}
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">{project.title}</h1>
            <p className="mt-6 text-lg leading-8 text-white/68">{project.desc}</p>

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

          <div className="grid gap-4">
            {[
              { label: "Status", value: status, icon: "fa-solid fa-code" },
              { label: "Meu papel", value: details.role, icon: "fa-solid fa-user-gear" },
              { label: "Problema", value: details.problem, icon: "fa-solid fa-bullseye" },
              { label: "Impacto esperado", value: details.impact, icon: "fa-solid fa-chart-line" },
            ].map((item) => (
              <article key={item.label} className="premium-card rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
                  <i className={item.icon} aria-hidden />
                  {item.label}
                </p>
                <p className="leading-7 text-white/68">{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <section className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-white">
              <i className="fa-solid fa-list-check text-cyan-200" aria-hidden />
              Funcionalidades
            </h2>
            <div className="mt-5 grid gap-3">
              {details.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/40 p-4 text-white/68">
                  <i className="fa-solid fa-check text-emerald-300" aria-hidden />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-white">
              <i className="fa-solid fa-layer-group text-cyan-200" aria-hidden />
              Stack e competências
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {details.stack.map((item) => (
                <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
