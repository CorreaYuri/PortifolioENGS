import projetoBancoPessoalImg from "../assets/imgbancopessoal.png"
import projetoEcomerceImg from "../assets/imgProjetoE-comerce.png"
import projetoToDoListImg from "../assets/imgtodoList.png"

export const site = {
  name: "Yuri Corrêa",
  title: "Yuri Corrêa | Portfólio",
  description:
    "Portfólio de Yuri Corrêa, estudante de Engenharia de Software. Projetos em Next.js, React e desenvolvimento web.",
  url: "https://portifolio-engsoftware.vercel.app/", // troque quando publicar
  locale: "pt_BR",
  email: "yuri@exemplo.com", // troque
  city: "Florianópolis, SC",
  phoneE164: "+5531996210613",
}

export const socials = [
  { href: "https://github.com/CorreaYuri", icon: "fa-brands fa-github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/yuri-corr%C3%AAa-a9944646/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "https://www.instagram.com/yury_correal/", icon: "fa-brands fa-square-instagram", label: "Instagram" },
  { href: "https://wa.me/5531996210613", icon: "fa-brands fa-square-whatsapp", label: "WhatsApp" },
  { href: "mailto:yuri@exemplo.com", icon: "fa-solid fa-envelope", label: "Email" }, // troque
] as const

export const navItems = [
  { href: "#home", label: "Início", icon: "fa-solid fa-house" },
  { href: "#sobre", label: "Sobre", icon: "fa-solid fa-address-card" },
  { href: "#habilidade", label: "Habilidades", icon: "fa-solid fa-brush" },
  { href: "#projetos", label: "Projetos", icon: "fa-solid fa-hammer" },
  { href: "#contato", label: "Contato", icon: "fa-solid fa-id-card" },
] as const

export const projects = [
  {
    title: "Banco Pessoal",
    desc: "Aplicativo de gerenciamento de finanças pessoais.",
    href: "https://github.com/CorreaYuri/AppBancoPessoal",
    img: projetoBancoPessoalImg,
    alt: "Projeto Banco Pessoal",
    tags: ["React Native", "Finanças", "UI"],
  },
  {
    title: "Linho e Grafite",
    desc: "Loja e-commerce de moda masculina.",
    href: "#",
    img: projetoEcomerceImg,
    alt: "Projeto E-commerce Linho e Grafite",
    tags: ["E-commerce", "UI", "Front-end"],
  },
  {
    title: "ToDo List",
    desc: "Aplicativo para gerenciamento de tarefas diárias.",
    href: "#",
    img: projetoToDoListImg,
    alt: "Projeto ToDo List",
    tags: ["Produtividade", "CRUD", "UI"],
  },
] as const

export const skillGroups = [
  {
    title: "Linguagens",
    items: [
      { name: "JavaScript", level: 80 },
      { name: "PHP", level: 55 },
      { name: "Java", level: 65 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind", level: 75 },
      { name: "Bootstrap", level: 35 },
    ],
  },
  {
    title: "Boas práticas",
    items: [
      { name: "Clean Code", level: 60 },
      { name: "UML", level: 55 },
      { name: "Ágil", level: 80 },
      { name: "Git", level: 80 },
    ],
  },
  {
    title: "Soft skills",
    items: [
      { name: "CNV", level: 80 },
      { name: "Oratória", level: 70 },
      { name: "Escrita", level: 80 },
      { name: "Trabalho em equipe", level: 75 },
      { name: "Liderança", level: 72 },
    ],
  },
] as const
