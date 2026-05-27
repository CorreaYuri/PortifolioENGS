import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import type { CSSProperties } from "react"

import fotoPerfil from "../assets/fotoPerfil.png"
import fotoMaior from "../assets/IMG_1977 2.png"
import MeiaIngrenagem from "../assets/meiaIngrenagem.png"

import { ActiveNav, MobileNav } from "../components/ActiveNav"
import { ContactForm } from "../components/ContactForm"
import { MouseGlow } from "../components/MouseGlow"
import { Projects } from "../components/Projects"
import { Reveal } from "../components/Reveal"
import { SectionTitle } from "../components/SectionTitle"
import { Skills } from "../components/Skills"
import { SocialLinks } from "../components/SocialLinks"
import { site, socials } from "../data/portfolio"

const highlights = [
  { value: "Fundador", label: "Nexa como empresa de produtos e serviços", icon: "fa-solid fa-rocket" },
  { value: "SaaS", label: "Produtos multitenant e operação real", icon: "fa-solid fa-layer-group" },
  { value: "Backend", label: "APIs, regras de negócio e integrações", icon: "fa-solid fa-code-branch" },
]

const focusAreas = [
  { label: "Nexa", icon: "fa-solid fa-building" },
  { label: "Entregoo", icon: "fa-solid fa-store" },
  { label: "1400CRM", icon: "fa-solid fa-headset" },
  { label: "POO", icon: "fa-solid fa-cubes" },
  { label: "Backend", icon: "fa-solid fa-server" },
  { label: "APIs", icon: "fa-solid fa-plug" },
  { label: "Multi-tenant", icon: "fa-solid fa-network-wired" },
  { label: "RBAC", icon: "fa-solid fa-shield-halved" },
  { label: "TypeScript", icon: "fa-solid fa-code" },
  { label: "Next.js", icon: "fa-brands fa-react" },
  { label: "Prisma", icon: "fa-solid fa-database" },
]

const nexaPillars = [
  { text: "Produtos próprios como Nexa, Entregoo e 1400CRM", icon: "fa-solid fa-boxes-stacked" },
  { text: "Desenvolvimento sob demanda para clientes", icon: "fa-solid fa-screwdriver-wrench" },
  { text: "ERP, SaaS, CRM, portais e integrações", icon: "fa-solid fa-diagram-project" },
  { text: "Documentação técnica, go-live e evolução contínua", icon: "fa-solid fa-file-lines" },
]

const timeline = [
  {
    label: "Base técnica",
    title: "Engenharia de Software",
    text: "Fundamentos de POO, backend, modelagem de domínio e construção de sistemas web completos.",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    label: "Produto",
    title: "Criação da Nexa",
    text: "Empresa para desenvolver produtos próprios e soluções sob demanda para operações reais.",
    icon: "fa-solid fa-building-circle-check",
  },
  {
    label: "Operação",
    title: "SaaS e integrações",
    text: "Entregoo, 1400CRM e integrações entre sistemas com foco em multi-tenant, APIs e governança.",
    icon: "fa-solid fa-network-wired",
  },
  {
    label: "Agora",
    title: "Evolução contínua",
    text: "Aprimorando arquitetura, documentação, experiência do usuário e maturidade dos produtos.",
    icon: "fa-solid fa-arrow-trend-up",
  },
]

const aiWorkflow = [
  {
    title: "Arquitetura e planejamento",
    text: "Uso IA para comparar abordagens, quebrar problemas grandes em etapas e validar decisões antes da implementação.",
    icon: "fa-solid fa-sitemap",
  },
  {
    title: "Desenvolvimento assistido",
    text: "Acelero criação de componentes, APIs, regras de negócio e refatorações mantendo revisão técnica e responsabilidade sobre o código.",
    icon: "fa-solid fa-wand-magic-sparkles",
  },
  {
    title: "Debugging e qualidade",
    text: "Aplico IA para investigar erros, revisar fluxos, encontrar riscos, melhorar testes e tornar entregas mais confiáveis.",
    icon: "fa-solid fa-bug-slash",
  },
  {
    title: "Documentação e produto",
    text: "Transformo regras, decisões e fluxos em documentação clara para manutenção, go-live, suporte e evolução contínua.",
    icon: "fa-solid fa-file-shield",
  },
]

const flexibilityPoints = [
  {
    title: "Adaptação técnica",
    text: "Consigo transitar entre backend, frontend, produto, documentação e operação, escolhendo a abordagem mais adequada para cada entrega.",
    icon: "fa-solid fa-shuffle",
  },
  {
    title: "Comunicação com pessoas",
    text: "Tenho facilidade para entender necessidades, alinhar expectativas e traduzir problemas de negócio em soluções técnicas claras.",
    icon: "fa-solid fa-people-arrows",
  },
  {
    title: "Colaboração prática",
    text: "Gosto de trabalhar próximo de clientes, usuários e times, mantendo abertura para feedbacks e foco no que resolve o problema real.",
    icon: "fa-solid fa-handshake-angle",
  },
]

const workProcess = [
  { title: "Entendimento", text: "Mapeio o problema, o usuário, as regras de negócio e o resultado esperado.", icon: "fa-solid fa-magnifying-glass-chart" },
  { title: "Modelagem", text: "Organizo entidades, fluxos, permissões, integrações e prioridades antes de construir.", icon: "fa-solid fa-diagram-project" },
  { title: "Implementação", text: "Desenvolvo com atenção a backend, frontend, dados, validações e manutenção futura.", icon: "fa-solid fa-code" },
  { title: "Entrega", text: "Valido, documento, ajusto com feedback e preparo o projeto para evolução contínua.", icon: "fa-solid fa-rocket" },
]

const resumeHighlights = [
  { label: "Formação", value: "Engenharia de Software", icon: "fa-solid fa-graduation-cap" },
  { label: "Foco", value: "Backend, produto e full stack", icon: "fa-solid fa-bullseye" },
  { label: "Empresa", value: "Fundador da Nexa", icon: "fa-solid fa-building" },
  { label: "Stack", value: "Next.js, TypeScript, APIs e Prisma", icon: "fa-solid fa-layer-group" },
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
    <main className="site-shell min-h-screen text-white scroll-smooth">
      <MouseGlow />
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

          <ActiveNav />

          <div className="flex items-center gap-2">
            <a
              href="/curriculo.pdf"
              download="Yuri-Correa-Curriculo.pdf"
              className="btn-micro inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              aria-label="Baixar currículo em PDF"
            >
              <i className="fa-solid fa-download text-cyan-300" aria-hidden />
              <span className="hidden sm:inline">Currículo</span>
            </a>
            <MobileNav />
          </div>
        </div>
      </header>

      <div id="conteudo" className="[scroll-margin-top:88px]">
        <section id="home" className="relative overflow-hidden border-b border-white/10 [scroll-margin-top:88px]">
          <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="hero-copy max-w-3xl">
              <div className="soft-pulse mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <i className="fa-solid fa-sparkles text-emerald-200" aria-hidden />
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
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  Ver produtos e projetos
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
                <Link
                  href="#contato"
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  <i className="fa-solid fa-paper-plane text-cyan-200" aria-hidden />
                  Falar comigo
                </Link>
                <a
                  href={`https://wa.me/${site.phoneE164.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-5 py-3 font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-300/45 hover:bg-emerald-300/15 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden />
                  WhatsApp
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {focusAreas.map((item, index) => (
                  <span
                    key={item.label}
                    className="focus-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-white/70"
                    style={{ "--chip-delay": `${index * 55}ms` } as CSSProperties}
                  >
                    <i className={`${item.icon} text-[0.75rem] text-cyan-200/70`} aria-hidden />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-photo relative mx-auto w-full max-w-md">
              <div className="tech-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30">
                <Image
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                  src={fotoMaior}
                  alt={`Foto de ${site.name}`}
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-zinc-950/82 p-4 backdrop-blur">
                  <p className="inline-flex items-center gap-2 text-sm text-white/55">
                    <i className="fa-solid fa-microchip text-cyan-200/75" aria-hidden />
                    Atuação principal
                  </p>
                  <p className="mt-1 font-semibold text-white">Fundador, backend e desenvolvimento full stack</p>
                </div>
              </div>
              <Image className="float-slow absolute -right-5 -top-5 h-16 w-16 rotate-slow opacity-70" src={MeiaIngrenagem} alt="" aria-hidden />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal
              key={item.value}
              delay={index * 110}
              className="premium-card rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <i className={item.icon} aria-hidden />
              </div>
              <p className="text-2xl font-semibold text-cyan-200">{item.value}</p>
              <p className="mt-2 text-sm text-white/60">{item.label}</p>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="premium-card grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                <i className="fa-solid fa-bolt text-amber-200" aria-hidden />
                Nexa
              </p>
              <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
                Uma empresa de produtos próprios e desenvolvimento para negócios reais.
              </h2>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-cyan-100">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-950/70 text-lg font-semibold">NX</span>
                <div>
                  <p className="text-sm font-semibold">Nexa</p>
                  <p className="text-xs text-cyan-100/60">Produtos digitais, SaaS e sistemas sob demanda</p>
                </div>
              </div>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/72">
              <p>
                A proposta da Nexa é construir produtos digitais próprios, como plataformas operacionais, SaaS
                multitenant e centrais de atendimento, além de desenvolver soluções para empresas que precisam organizar
                operação, atendimento, vendas, documentos, financeiro e relacionamento com clientes.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {nexaPillars.map((item) => (
                  <div key={item.text} className="flex gap-3 rounded-2xl border border-white/10 bg-zinc-950/40 p-4 text-sm text-white/68">
                    <i className={`${item.icon} mt-0.5 text-cyan-200/80`} aria-hidden />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionTitle
            eyebrow="Trajetória"
            icon="fa-solid fa-route"
            description="Linha rápida do caminho que conecta formação, produto, operação e evolução técnica."
          >
            Construindo produtos com visão de engenharia
          </SectionTitle>

          <div className="relative grid gap-4 before:absolute before:left-5 before:top-4 before:hidden before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-cyan-300/0 before:via-cyan-300/35 before:to-cyan-300/0 md:before:block">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 110} className="relative md:pl-14">
                <div className="timeline-dot absolute left-0 top-5 hidden h-10 w-10 place-items-center rounded-full border border-cyan-300/25 bg-zinc-950 text-cyan-200 md:grid">
                  <i className={item.icon} aria-hidden />
                </div>
                <div className="premium-card rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                    <i className={`${item.icon} md:hidden`} aria-hidden />
                    {item.label}
                  </p>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/62">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionTitle
            eyebrow="Processo"
            icon="fa-solid fa-gears"
            description="Meu jeito de transformar uma necessidade em produto ou sistema com clareza técnica e foco no uso real."
          >
            Como eu trabalho
          </SectionTitle>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="premium-card rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <i className={item.icon} aria-hidden />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle
            eyebrow="Perfil"
            icon="fa-solid fa-user-astronaut"
            description="Uma visão rápida sobre formação, empreendedorismo, foco técnico e jeito de trabalhar."
          >
            Sobre mim
          </SectionTitle>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-5">
              <SocialLinks />
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/45">
                  <i className="fa-solid fa-location-dot text-cyan-200/70" aria-hidden />
                  <span>Localização</span>
                </p>
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

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                  <i className="fa-solid fa-users-gear" aria-hidden />
                  Flexibilidade
                </p>
                <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
                  Flexível tecnicamente e próximo das pessoas envolvidas no produto.
                </h2>
                <p className="mt-5 leading-8 text-white/68">
                  Tenho facilidade para me adaptar ao contexto: posso aprofundar na parte técnica, conversar com usuários,
                  organizar requisitos, documentar decisões ou ajustar a solução conforme o negócio precisa evoluir.
                </p>
              </div>

              <div className="grid gap-3">
                {flexibilityPoints.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                      <i className={item.icon} aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/62">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="habilidade" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle
            eyebrow="Competências"
            icon="fa-solid fa-code"
            description="Fundamentos e tecnologias que sustentam meu desenvolvimento de produtos e sistemas full stack."
          >
            Habilidades
          </SectionTitle>
          <Skills />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="premium-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                  <i className="fa-solid fa-id-badge" aria-hidden />
                  Currículo rápido
                </p>
                <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
                  Um resumo direto para recrutadores, parceiros e clientes.
                </h2>
              </div>
              <a
                href="/curriculo.pdf"
                download="Yuri-Correa-Curriculo.pdf"
                className="btn-micro inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              >
                Baixar currículo
                <i className="fa-solid fa-download" aria-hidden />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {resumeHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                  <i className={`${item.icon} mb-4 text-cyan-200`} aria-hidden />
                  <p className="text-xs uppercase tracking-[0.16em] text-white/40">{item.label}</p>
                  <p className="mt-2 font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="premium-card grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                <i className="fa-solid fa-brain" aria-hidden />
                IA no desenvolvimento
              </p>
              <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
                Sei trabalhar com IA como parceira de engenharia, não como atalho sem critério.
              </h2>
              <p className="mt-5 leading-8 text-white/68">
                Uso ferramentas de IA para ganhar velocidade, melhorar análise técnica e documentar decisões, sempre validando
                arquitetura, segurança, regras de negócio e qualidade do código antes de entregar.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {aiWorkflow.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <i className={item.icon} aria-hidden />
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="projetos" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle
            eyebrow="Portfólio"
            icon="fa-solid fa-briefcase"
            description="Produtos e projetos que demonstram arquitetura, backend, SaaS multitenant, operação, integração e visão de negócio."
          >
            Projetos
          </SectionTitle>
          <Projects />
        </section>

        <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:88px]">
          <SectionTitle
            eyebrow="Contato"
            icon="fa-solid fa-comments"
            description="Para oportunidades, parcerias, serviços da Nexa ou conversa técnica."
          >
            Fale comigo
          </SectionTitle>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-6 text-lg leading-8 text-white/72">
              <p>Se você quer conversar sobre oportunidades, projetos, produtos digitais ou tecnologia, me chama.</p>
              <p>Estou aberto a conexões, feedbacks, parcerias e desenvolvimento de soluções sob demanda.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${site.phoneE164.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  Tenho um projeto para desenvolver
                  <i className="fa-brands fa-whatsapp" aria-hidden />
                </a>
                <Link
                  href="#projetos"
                  className="btn-micro inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  Ver meus projetos
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
              </div>
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
