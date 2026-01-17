import Image from "next/image"
import fotoPerfil from "../assets/fotoPerfil.png"
import MeiaIngrenagem from "../assets/meiaIngrenagem.png"
import fotoMaior from "../assets/IMG_1977 2.png"
import projetoBancoPessoalImg from "../assets/imgbancopessoal.png"
import projetoEcomerceImg from "../assets/imgProjetoE-comerce.png"
import projetoToDoListImg from "../assets/imgtodoList.png"
import Link from "next/link"

const projects = [
  {
    title: "BANCO PESSOAL",
    desc: "Aplicativo de gerenciamento de finanças pessoais.",
    href: "https://github.com/CorreaYuri/AppBancoPessoal",
    img: projetoBancoPessoalImg,
    alt: "Projeto Banco Pessoal",
    imgClass: "w-40",
  },
  {
    title: "Linho e grafite",
    desc: "Loja e-commerce, loja de moda masculina.",
    href: "#",
    img: projetoEcomerceImg,
    alt: "Projeto E-commerce",
    imgClass: "w-28",
  },
  {
    title: "ToDo List",
    desc: "Aplicativo para gerenciamento de tarefas diárias.",
    href: "#",
    img: projetoToDoListImg,
    alt: "Projeto ToDo List",
    imgClass: "w-40",
  },
]

const socials = [
  { href: "https://github.com/CorreaYuri", icon: "fa-brands fa-github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/yuri-corr%C3%AAa-a9944646/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "https://www.instagram.com/yury_correal/", icon: "fa-brands fa-square-instagram", label: "Instagram" },
  { href: "https://wa.me/5531996210613", icon: "fa-brands fa-square-whatsapp", label: "WhatsApp" },
  { href: "mailto:yuri@exemplo.com", icon: "fa-solid fa-envelope", label: "Email" }, // troque
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed bottom-120 right-5 z-50 text-2xl bg-white/10 backdrop-blur border-b border-white/10 shadow-xl/30 rounded-full">
        <Link href="#home"
          className=" px-4 py-4 text-blue-400 flex items-center justify-center gap-3"
          aria-label="Voltar ao topo da página"
        >
          <i className="fa-regular fa-circle-up"></i>
        </Link>
      </div>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur border-b border-white/10 shadow-xl/30  ">
        <div className="mx-auto max-w-6xl px-4 py-4 ">
          <div className="flex items-center justify-between gap-4">
            {/* perfil */}
            <div className="flex items-center gap-2">
              <Image
                className="w-16 md:w-20"
                src={fotoPerfil}
                alt="Foto Perfil"
                priority
              />
              <div className="text-xs md:text-sm">
                <h2 className="md:text-2xl text-blue-200 font-bold leading-none">YURI</h2>
                <h3 className="leading-none md:text-2xl md:pl-5">Corrêa</h3>
              </div>
            </div>

            {/* centro */}
            <div className="text-center text-xs md:text-base">
              <div className="opacity-90 md:text-2xl">Bem-vindo</div>
              <div className="font-semibold tracking-wide text-blue-400 md:text-2xl ">PORTIFÓLIO</div>
            </div>

            {/* seta */}
            <a
              href="/curriculo.pdf"
              download="Yuri-Correa-Portfolio.pdf"
              className="text-sm flex items-center gap-2 md:text-2xl pr-5"
              aria-label="Ir para opções"
            >
              <span className="float-up-down"><i className="fa-solid fa-download text-blue-300"></i></span>
            </a>
          </div>
        </div>

              <div className=" grid-cols-1  items-center justify-center gap-8 w-full border-2 border-amber-50  md:flex md:flex-row hidden  md:visible p-5 md:px-15"> 
              <Link className="bg-amber-50/10 px-4 py-4 btnoptions flex items-center justify-center gap-3" href="/#">
                <i className="fa-solid fa-house"> </i>
              </Link>
              
              <Link className=" bg-amber-50/10 px-4 py-4 btnoptions flex items-center justify-center gap-3" href="#sobre">
              
                <i className="fa-solid fa-address-card"></i>
                <a className="btnoptions lex  text-2xl md:text-1xl  " href="#sobre">Sobre</a>
              
              </Link>

              <Link className="bg-amber-50/10   px-4 py-2 btnoptions flex items-center justify-center gap-3" href="#habilidade">
              
                <i className="fa-solid fa-brush"></i>
                <a className="btnoptions  text-2xl md:text-1xl " href="#habilidade">Habilidades</a>
              
              </Link>

              <Link className="bg-amber-50/10 px-4 py-2 btnoptions flex items-center justify-center gap-3" href="#projetos">
                <i className="fa-solid fa-hammer"></i>
                <a className="btnoptions  text-2xl md:text-1xl   " href="#projetos">Projetos</a>
              
              </Link>

              <Link className="bg-amber-50/10 px-4 py-2 btnoptions flex items-center justify-center gap-3" href="#contato">

                <i className="fa-solid fa-id-card"></i>
                <a className="btnoptions  text-2xl md:text-1xl  " href="#contato">Contato</a>
              
              </Link>  

            </div>


      </header>

      {/* HERO */}
      <section className="relative h-screen grid grid-cols-1 md:flex  lg:h-[700px] xl:h-[800px] 2xl:h-[900px] md:h-screen">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-5  h-full  justify-center items-center flex md:w-full  ">
          <div className="flex flex-col items-center justify-center text-center gap-6 space-y-4 md:w-full md:h-full md:space-y-50">
           
            <div className="space-y-6  md:visible  ">
              <h1 className="text-blue-500 text-xl md:text-5xl font-semibold tracking-tight">
                ENGENHEIRO DE SOFTWARE
              </h1>
              <p className="text-white/80 text-1xl ">
                Apaixonado por tecnologia
              </p>
            </div>

            <div className="gap-5 flex flex-col p-5 md:flex md:flex-row ">
              <Image className="rotate h-16 w-16 mx-auto " src={MeiaIngrenagem} alt="" aria-hidden />
              <Image className="rotate h-40 w-40 mx-auto mt-2 opacity-90" src={MeiaIngrenagem} alt="" aria-hidden />
              <Image className="rotate h-10 w-10 mx-auto mt-2 opacity-90" src={MeiaIngrenagem} alt="" aria-hidden />

            </div>

            <div className="space-y-2 md:hidden hidden ">
              <h1 className="text-blue-500 text-3xl md:text-4xl font-semibold tracking-tight">
                ENGENHEIRO DE SOFTWARE
              </h1>
              <p className="text-white/80 text-2xl md:text-base">
                Apaixonado por tecnologia
              </p>
            </div>

            <div className="grid-cols-1 grid items-center justify-center gap-3 w-full md:hidden   ">

              <Link href="#sobre">
              <div className="bg-amber-50/10 w-full  px-8 py-2 btnoptions flex items-center justify-center gap-3">
                <i className="fa-solid fa-address-card"></i>
                <a className="btnoptions  text-2xl md:text-base  " href="#sobre">Sobre</a>
              </div>
              </Link>

              <Link href="#habilidade">
              <div className="bg-amber-50/10 w-full  px-8 py-2 btnoptions flex items-center justify-center gap-3">
                <i className="fa-solid fa-brush"></i>
                <a className="btnoptions  text-2xl md:text-base  " href="#habilidade">Habilidades</a>
              </div>
              </Link>

              <Link href="#projetos">
              <div className="bg-amber-50/10 w-full  px-8 py-2 btnoptions flex items-center justify-center gap-3">
                <i className="fa-solid fa-hammer"></i>
                <a className="btnoptions  text-2xl md:text-base  " href="#projetos">Projetos</a>
              </div>
              </Link>

              <Link href="#contato">
              <div className="bg-amber-50/10 w-full  px-8 py-2 btnoptions flex items-center justify-center gap-3">
                <i className="fa-solid fa-id-card"></i>
                <a className="btnoptions  text-2xl md:text-base  " href="#contato">Contato</a>
              </div>
              </Link>


            </div>
          </div>
        </div>

        
        
      </section>



      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 grid grid-cols-1 md:py-24 md:pt-55  max-[600px]:pt-30">
        <h2 className="mb-8 text-center text-3xl text-blue-500 max-[600px]:text-2xl">SOBRE MIM</h2>

        <div className="grid gap-8 xl:grid-cols-2 xl:items-center">
          <div className="flex flex-col items-center xl:items-start gap-6">
            <Image
              className="md:w-96 w-60 rounded-lg"
              src={fotoMaior}
              alt="Foto de Yuri"
              priority={false}
            />

            <p className="text-white text-lg md:text-2xl md:text-center ">
              Prazer, sou Yuri Corrêa. Desenvolvedor apaixonado por transformar ideias em soluções inteligentes.
            </p>

            <div className="containerRedes flex items-center justify-between xl:justify-start gap-3 w-full p-5 ">
              {socials.map((s) => (
                <a className="" key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <i className={`btnoptionsBtn-RedesSociais text-slate-800 ${s.icon} btn-animado p-1 text-lg md:text-4xl `} />
                </a>
              ))}
            </div>
          </div>

          <div className="text-white/90 leading-relaxed text-2xl md:text-3xl md:p-8 max-[600px]:text-1xl">
            Moro em Florianópolis. Sou estudante de <span className="text-blue-500">Engenharia de Software</span> pela Faculdade Anhanguera,
            atualmente cursando o 4º período. Sempre fui apaixonado por <span className="text-blue-500">tecnologia</span>, inovação e por entender como
            as coisas funcionam por trás dos bastidores. Tenho estudado bastante <span className="text-blue-500">POO</span>, desenvolvimento web com{" "}
            <span className="text-blue-500">Next.js e React</span>. Meu <span className="text-blue-500">objetivo</span> é me tornar um dev{" "}
            <span className="text-blue-500">completo</span>. Quando não estou programando, gosto de{" "}
            <span className="text-blue-500">ouvir música</span>, aprender sobre finanças e cuidar da minha gatinha.
          </div>
        </div>
      </section>

      {/* HABILIDADES (mantive seu visual e caixas, só organizei grid/spacing) */}
      <section id="habilidade" className="mx-auto max-w-6xl px-4 py-16 md:py-24 md:pt-55 md:h-screen  max-[600px]:pt-30">
        <div className="text-center space-y-2 mb-10  ">
          <h2 className="text-3xl text-blue-500 max-[600px]:text-2xl">HABILIDADES</h2>
          <p className="md:text-2xl text-white/90 text-lg">
            Aqui estão algumas das minhas habilidades e <span className="text-blue-500">tecnologias que domino.</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2  md:text-lg md:p-10">
          {/* Card 1 */}
          <div>
            <h3 className="text-white ml-2 mb-2 text-lg">Linguagem de Programação</h3>
            <div className="efectScale text-white border border-dashed border-blue-500 p-5 rounded-lg">
              <ul className="space-y-3">
                <li className="flex gap-2 items-center">
                  <span className="w-28">JavaScript</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-40 h-1 bg-green-500 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Php</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-28 h-1 bg-yellow-500 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Java</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-32 h-1 bg-green-500 block" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div>
            <h3 className="text-white ml-2 mb-2 text-lg">Framework</h3>
            <div className="efectScale text-white border border-dashed border-blue-500 p-5 rounded-lg">
              <ul className="space-y-3">
                <li className="flex gap-2 items-center">
                  <span className="w-28">React</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Next.js</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Tailwind</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-45 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Bootstrap</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-15 h-1 bg-red-700 block" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div>
            <h3 className="text-white ml-2 mb-2 text-lg">Boas práticas</h3>
            <div className="efectScale text-white border border-dashed border-blue-500 p-5 rounded-lg">
              <ul className="space-y-3">
                <li className="flex gap-2 items-center">
                  <span className="w-28">Clean code</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-24 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">UML</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-24 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Ágile</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Git</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4 */}
          <div>
            <h3 className="text-white ml-2 mb-2 text-lg">Soft skills</h3>
            <div className="efectScale text-white border border-dashed border-blue-500 p-5 rounded-lg">
              <ul className="space-y-3 ">
                <li className="flex gap-2 items-center">
                  <span className="w-28">CNV</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Oratória</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-45 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center ">
                  <span className="w-28">Escrita</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-52 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Equipe</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-40 h-1 bg-green-700 block" />
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="w-28">Liderança</span>
                  <span className="w-full h-2 border">
                    <span className="nivel w-48 h-1 bg-green-700 block" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:visible h-fit mt-5 max-[600px]:hidden  ">
            <Image className="rotate h-25 w-25 mx-auto -mt-2 opacity-90 " src={MeiaIngrenagem} alt="" aria-hidden />

          </div>
      </section>


      {/* PROJETOS */}
      <section id="projetos" className="mx-auto max-w-6xl px-4 py-16 md:py-24 md:pt-55 md:h-screen  max-[600px]:pt-30">
        <div className="flex justify-center mb-6 ">
          <h2 className="text-3xl text-blue-500 max-[600px]:text-2xl">PROJETOS</h2>
        </div>

        <div className="snap-x containerSlide w-full flex overflow-x-auto space-x-4 p-2 scrollbar-hide md:h-200">
          {projects.map((p) => (
            <div
              key={p.title}
              className="snap-center slide-item flex-shrink-0 text-white border border-blue-500 p-5 rounded-lg w-80 space-y-2"
            >
              <h3 className=" text-blue-400 md:text-2xl">{p.title}</h3>
              <p className="text-lg text-white md:text-xl">{p.desc}</p>

              <a className="text-lg" href={p.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.title}`}>
                <i className=" fa-brands fa-github text-blue-400" />
              </a>

              <div className="flex justify-center mt-2 md:mt-8  md:h-120 md:">
                <Image className={`efectProjetos ${p.imgClass}`} src={p.img} alt={p.alt} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:py-24 md:pt-55 md:h-screen  max-[600px]:pt-30">
        <h2 className="text-3xl text-center text-blue-500 mb-10 max-[600px]:text-2xl">FALE COMIGO</h2>

        <div className="grid gap-10 xl:grid-cols-2 xl:items-star ">
          <div className="text-white/90 space-y-3 md:text-lg text-lg">
            <p className="md:text-3xl">
              Se você está interessado em saber mais sobre mim, discutir oportunidades de trabalho ou apenas bater um papo sobre tecnologia,
              sinta-se à vontade para entrar em contato comigo.
            </p>
            <p className="md:text-3xl">Estou sempre aberto a novas conexões e colaborações!</p>

            <div className="containerRedes flex items-center justify-between xl:justify-start gap-3 w-full p-5 ">
              {socials.map((s) => (
                <a className="" key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <i className={`btnoptionsBtn-RedesSociais text-slate-800 ${s.icon} btn-animado p-1 text-lg md:text-4xl `} />
                </a>
              ))}
            </div>
            </div>

          <form className="w-full max-w-xl mx-auto xl:mx-0 flex flex-col gap-8 md:w-150 md:text-3xl ">
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm md:text-2xl" htmlFor="name">Nome</label>
              <input id="name" className="p-2 rounded-lg bg-slate-800 text-white" type="text" placeholder="Digite seu nome" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm md:text-2xl " htmlFor="email">E-mail</label>
              <input id="email" className="p-2 rounded-lg bg-slate-800 text-white" type="email" placeholder="Digite seu e-mail" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm md:text-2xl" htmlFor="message">Mensagem</label>
              <textarea id="message" className="p-2 rounded-lg bg-slate-800 h-32 text-white" placeholder="Digite sua mensagem" />
            </div>

            <button type="button" className="bg-blue-500 p-2 rounded-lg text-white btn-animado">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="text-center text-xs text-slate-600">
          <p>Desenvolvido por Yuri Corrêa</p>
          <p>&copy; 2025</p>
        </div>
      </footer>
    </main>
  )
}
