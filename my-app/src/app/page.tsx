import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import fotoPerfil from "../assets/fotoPerfil.png"
import MeiaIngrenagem from "../assets/meiaIngrenagem.png"
import fotoMaior from "../assets/IMG_1977 2.png"

import { navItems, site } from "../data/portfolio"
import { SectionTitle } from "../components/SectionTitle"
import { SocialLinks } from "../components/SocialLinks"
import { Skills } from "../components/Skills"
import { Projects } from "../components/Projects"
import { ContactForm } from "../components/ContactForm"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Engenheiro de Software",
    description: site.description,
    homeLocation: site.city,
    email: site.email,
    telephone: site.phoneE164,
    sameAs: navItems.map(() => undefined).filter(Boolean),
  }

  return (
    <main id="home" className="min-h-screen bg-black text-white scroll-smooth">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteúdo
      </a>

      {/* Top button */}
      <div className="fixed bottom-6 right-4 z-50">
        <Link
          href="#home"
          className="text-2xl bg-white/10 backdrop-blur border border-white/10 shadow-xl/30 rounded-full p-4 text-blue-400 flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <i className="fa-regular fa-circle-up" aria-hidden />
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur border-b border-white/10 shadow-xl/30">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                className="w-14 md:w-20 h-auto"
                src={fotoPerfil}
                alt={`Foto de perfil de ${site.name}`}
                priority
                sizes="(max-width: 768px) 56px, 80px"
              />
              <div className="text-xs md:text-sm">
                <p className="md:text-2xl text-blue-200 font-bold leading-none">YURI</p>
                <p className="leading-none md:text-2xl md:pl-5">Corrêa</p>
              </div>
            </div>

            <div className="text-center">
              <p className="opacity-90 text-xs md:text-2xl">Bem-vindo</p>
              <p className="font-semibold tracking-wide text-blue-400 text-xs md:text-2xl">PORTFÓLIO</p>
            </div>

            <a
              href="/curriculo.pdf"
              download="Yuri-Correa-Curriculo.pdf"
              className="text-sm flex items-center gap-2 md:text-2xl pr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Baixar currículo em PDF"
            >
              <span className="float-up-down">
                <i className="fa-solid fa-download text-blue-300" aria-hidden />
              </span>
            </a>
          </div>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex justify-center gap-4 p-4 border-t border-white/10" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-amber-50/10 px-4 py-3 rounded-lg btnoptions flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <i className={item.icon} aria-hidden />
              <span className="text-base">{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      <div id="conteudo" className="[scroll-margin-top:96px]">
        {/* Hero */}
        <section className="min-h-[calc(100vh-96px)] flex items-center">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-10 w-full">
            <div className="flex flex-col items-center text-center gap-10">
              <div className="space-y-2">
                <h1 className="text-blue-500 text-2xl md:text-5xl font-semibold tracking-tight">
                  Engenheiro de Software
                </h1>
                <p className="text-white/80 text-lg md:text-xl">Apaixonado por tecnologia</p>
              </div>

              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Image className="rotate h-14 w-14" src={MeiaIngrenagem} alt="" aria-hidden />
                <Image className="rotate h-28 w-28 opacity-90" src={MeiaIngrenagem} alt="" aria-hidden />
                <Image className="rotate h-10 w-10 opacity-90" src={MeiaIngrenagem} alt="" aria-hidden />
              </div>

              {/* Nav mobile */}
              <nav className="grid md:hidden gap-3 w-full max-w-md" aria-label="Navegação principal mobile">
                {navItems.filter((i) => i.href !== "#home").map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="bg-amber-50/10 w-full px-8 py-3 rounded-lg btnoptions flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <i className={item.icon} aria-hidden />
                    <span className="text-xl">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:96px]">
          <SectionTitle>Sobre mim</SectionTitle>

          <div className="grid gap-10 xl:grid-cols-2 xl:items-center">
            <div className="flex flex-col items-center xl:items-start gap-6">
              <Image
                className="w-64 md:w-96 rounded-lg h-auto"
                src={fotoMaior}
                alt={`Foto de ${site.name}`}
                sizes="(max-width: 768px) 256px, 384px"
              />
              <p className="text-white text-lg md:text-2xl text-center xl:text-left">
                Prazer, sou Yuri Corrêa. Desenvolvedor apaixonado por transformar ideias em soluções inteligentes.
              </p>
              <SocialLinks />
            </div>

            <div className="text-white/90 leading-relaxed text-lg md:text-2xl">
              Moro em Florianópolis. Sou estudante de <span className="text-blue-500">Engenharia de Software</span>.
              Estudo <span className="text-blue-500">POO</span>, desenvolvimento web com{" "}
              <span className="text-blue-500">Next.js e React</span>. Meu objetivo é me tornar um dev completo.
            </div>
          </div>
        </section>

        {/* Habilidades */}
        <section id="habilidade" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:96px]">
          <SectionTitle>Habilidades</SectionTitle>
          <p className="text-center text-white/90 mb-10 text-lg md:text-xl">
            Aqui estão algumas das tecnologias que domino.
          </p>
          <Skills />
        </section>

        {/* Projetos */}
        <section id="projetos" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:96px]">
          <SectionTitle>Projetos</SectionTitle>
          <Projects />
        </section>

        {/* Contato */}
        <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:py-24 [scroll-margin-top:96px]">
          <SectionTitle>Fale comigo</SectionTitle>

          <div className="grid gap-10 xl:grid-cols-2 xl:items-start">
            <div className="text-white/90 space-y-4 text-lg md:text-xl">
              <p>Se você quer conversar sobre oportunidades, projetos ou tecnologia, me chama.</p>
              <p>Estou sempre aberto a novas conexões e colaborações!</p>
              <SocialLinks />
            </div>

            <ContactForm />
          </div>
        </section>

        <footer className="py-10 border-t border-white/10">
          <div className="text-center text-xs text-slate-500">
            <p>Desenvolvido por Yuri Corrêa</p>
            <p>&copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
