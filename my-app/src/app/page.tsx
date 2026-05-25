import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import fotoPerfil from "../assets/fotoPerfil.png"
import fotoMaior from "../assets/IMG_1977 2.png"
import MeiaIngrenagem from "../assets/meiaIngrenagem.png"

import { ContactForm } from "../components/ContactForm"
import { Projects } from "../components/Projects"
import { Reveal } from "../components/Reveal"
import { SectionTitle } from "../components/SectionTitle"
import { Skills } from "../components/Skills"
import { SocialLinks } from "../components/SocialLinks"
import { navItems, site, socials } from "../data/portfolio"

const highlights = [
  { value: "Fundador", label: "Nexa como empresa de produtos e serviços" },
  { value: "SaaS", label: "Produtos multitenant e operação real" },
  { value: "Backend", label: "APIs, regras de negócio e integrações" },
]

const focusAreas = ["Nexa", "Entregoo", "1400CRM", "POO", "Backend", "APIs", "Multi-tenant", "RBAC", "Next.js", "Prisma"]

const nexaPillars = [
  "Produtos próprios como Nexa, Entregoo e 1400CRM",
  "Desenvolvimento sob demanda para clientes",
  "ERP, SaaS, CRM, portais e integrações",
  "Documentação técnica, go-live e evolução contínua",
]

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Engenheiro de Software e fundador da Nexa",
    description: site.description,
    homeLocation: site.city,
    email: site.email,
    telephone: site.phoneE164,
    sameAs: socials.filter((social) => social.href.startsWith("https://")).map((social) => social.href),
  }

  return (
    <main id="home" className="site-shell min-h-screen text-white scroll-smooth">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-zinc-950 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteúdo
      </a>

      <Link
        href="#home"
        className="fixed bottom-5 right-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-zinc-950/80 text-cyan-300 shadow-2xl shadow-black/30 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/50"
        aria-label="Voltar ao topo"
      >
        <i className="fa-regular fa-circle-up" aria-hidden />
      </Link>

      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="#home" className="flex items-center gap-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300">
            <Image
              className="h-11 w-11 rounded-full border border-white/10 object-cover md:h-12 md:w-12"
              src={fotoPerfil}
              alt={`Foto de perfil de ${site.name}`}
              priority
              sizes="48px"
            />
            <div className="leading-tight">
              <p className="font-semibold text-white">Yuri Corrêa</p>
              <p className="text-xs text-white/55">Fundador da Nexa</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {navItems.filter((item) => item.href !== "#home").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href="/curriculo.pdf"
            download="Yuri-Correa-Curriculo.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            aria-label="Baixar currículo em PDF"
          >
            <i className="fa-solid fa-download text-cyan-300" aria-hidden />
            <span className="hidden sm:inline">Currículo</span>
          </a>
        </div>
      </header>

      <div id="conteudo" className="[scroll-margin-top:88px]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Fundador da Nexa | Produtos digitais e software sob demanda
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white md:text-6xl">
                Engenheiro de Software criando produtos próprios e sistemas para empresas que precisam operar melhor.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Sou fundador da Nexa, uma empresa criada para vender produtos digitais próprios e desenvolver soluções
                sob demanda para clientes. Minha atuação une backend, POO, APIs, modelagem de domínio e visão de produto
                para transformar processos reais em sistemas organizados, seguros e evolutivos.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#projetos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  Ver produtos e projetos
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  Falar comigo
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {focusAreas.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-white/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30">
                <Image
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                  src={fotoMaior}
                  alt={`Foto de ${site.name}`}
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-zinc-950/82 p-4 backdrop-blur">
                  <p className="text-sm text-white/55">Atuação principal</p>
                  <p className="mt-1 font-semibold text-white">Fundador, backend e desenvolvimento full stack</p>
                </div>
              </div>
              <Image className="absolute -right-5 -top-5 h-16 w-16 rotate-slow opacity-70" src={MeiaIngrenagem} alt="" aria-hidden />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal
              key={item.value}
              delay={index * 110}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-2xl font-semibold text-cyan-200">{item.value}</p>
              <p className="mt-2 text-sm text-white/60">{item.label}</p>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">Nexa</p>
              <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
                Uma empresa de produtos próprios e desenvolvimento para negócios reais.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/72">
              <p>
                A proposta da Nexa é construir produtos digitais próprios, como plataformas operacionais, SaaS
                multitenant e centrais de atendimento, além de desenvolver soluções para empresas que precisam organizar
                operação, atendimento, vendas, documentos, financeiro e relacionamento com clientes.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {nexaPillars.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 text-sm text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle eyebrow="Perfil" description="Uma visão rápida sobre formação, empreendedorismo, foco técnico e jeito de trabalhar.">
            Sobre mim
          </SectionTitle>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-5">
              <SocialLinks />
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-white/45">Localização</p>
                <p className="mt-2 text-lg font-semibold text-white">{site.city}</p>
              </div>
            </div>

            <div className="space-y-5 text-lg leading-8 text-white/72">
              <p>
                Sou Yuri Corrêa, engenheiro de software e fundador da Nexa. Tenho interesse em construir sistemas
                completos, do desenho da regra de negócio até a entrega da experiência final para o usuário.
              </p>
              <p>
                Meu foco técnico está em Programação Orientada a Objetos, backend, APIs, CRUD, modelagem de domínio,
                integrações e organização de código. Também desenvolvo interfaces com React e Next.js para entregar
                produtos utilizáveis de ponta a ponta.
              </p>
              <p>
                Na Nexa, busco unir visão de produto, execução técnica e entendimento operacional: criar soluções que
                possam virar negócio, atender clientes e evoluir com documentação, governança, integrações e consistência.
              </p>
            </div>
          </div>
        </section>

        <section id="habilidade" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle eyebrow="Competências" description="Fundamentos e tecnologias que sustentam meu desenvolvimento de produtos e sistemas full stack.">
            Habilidades
          </SectionTitle>
          <Skills />
        </section>

        <section id="projetos" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle eyebrow="Portfólio" description="Produtos e projetos que demonstram arquitetura, backend, SaaS multitenant, operação, integração e visão de negócio.">
            Projetos
          </SectionTitle>
          <Projects />
        </section>

        <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle eyebrow="Contato" description="Para oportunidades, parcerias, serviços da Nexa ou conversa técnica.">
            Fale comigo
          </SectionTitle>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-6 text-lg leading-8 text-white/72">
              <p>Se você quer conversar sobre oportunidades, projetos, produtos digitais ou tecnologia, me chama.</p>
              <p>Estou aberto a conexões, feedbacks, parcerias e desenvolvimento de soluções sob demanda.</p>
              <SocialLinks />
            </div>

            <ContactForm />
          </div>
        </section>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-white/45 sm:flex-row">
            <p>Desenvolvido por Yuri Corrêa</p>
            <p>&copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
