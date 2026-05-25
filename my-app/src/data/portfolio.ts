import projetoBancoPessoalImg from "../assets/imgbancopessoal.png"
import projetoEcomerceImg from "../assets/imgProjetoE-comerce.png"
import projetoToDoListImg from "../assets/imgtodoList.png"

export const site = {
  name: "Yuri Corrêa",
  title: "Yuri Corrêa | Portfólio",
  description:
    "Portfólio de Yuri Corrêa, engenheiro de software e fundador da Nexa, com foco em produtos digitais, backend, APIs, POO e desenvolvimento full stack.",
  url: "https://portifolio-engsoftware.vercel.app/",
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
    title: "Nexa Plataforma Operacional",
    desc: "Empresa e plataforma própria fundada por mim para vender produtos digitais e desenvolver soluções sob demanda. O sistema reúne CRM, clientes, projetos, financeiro, RH, documentos, permissões, auditoria e portal do cliente.",
    href: "",
    initials: "NX",
    kind: "Produto próprio",
    tags: ["ERP", "Backend", "POO", "APIs", "RBAC", "Portal do cliente"],
  },
  {
    title: "Entregoo Plataforma SaaS",
    desc: "Plataforma multitenant para operação de assinantes, sublojas, pedidos, catálogo, caixa, clientes, portal interno e integrações. O produto evolui de operação food service para uma base modular por segmento, com arquitetura API-first.",
    href: "",
    initials: "EG",
    kind: "SaaS multitenant",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Multi-tenant", "API-first"],
  },
  {
    title: "1400CRM Central de Chamados",
    desc: "Produto multi-tenant para operação de chamados por inbox, com SLA, timeline, anexos, auditoria, modo suporte da plataforma e gestão de tenants.",
    href: "",
    initials: "CRM",
    kind: "SaaS operacional",
    tags: ["Multi-tenant", "Tickets", "SLA", "Auditoria", "Prisma", "APIs"],
  },
  {
    title: "Integração Nexa x 1400CRM",
    desc: "Integração entre a plataforma Nexa e o motor de chamados 1400CRM, com sincronização de clientes, abertura e consulta de chamados, webhooks, bearer token, logs e health check.",
    href: "",
    initials: "API",
    kind: "Integração entre sistemas",
    tags: ["REST API", "Webhooks", "Idempotência", "Logs", "Health check"],
  },
  {
    title: "Banco Pessoal",
    desc: "Aplicativo de gerenciamento de finanças pessoais, com organização de dados, fluxo de cadastro e lógica de controle financeiro.",
    href: "https://github.com/CorreaYuri/AppBancoPessoal",
    img: projetoBancoPessoalImg,
    alt: "Projeto Banco Pessoal",
    kind: "Aplicativo",
    tags: ["React Native", "Finanças", "POO"],
  },
  {
    title: "Linho e Grafite",
    desc: "Loja e-commerce de moda masculina com foco em catálogo, experiência de navegação e regras de negócio para venda online.",
    href: "",
    img: projetoEcomerceImg,
    alt: "Projeto E-commerce Linho e Grafite",
    kind: "E-commerce",
    tags: ["E-commerce", "Front-end", "Regras de negócio"],
  },
  {
    title: "ToDo List",
    desc: "Aplicativo para gerenciamento de tarefas diárias, explorando CRUD, organização de estados e fluxo simples de produtividade.",
    href: "",
    img: projetoToDoListImg,
    alt: "Projeto ToDo List",
    kind: "Aplicativo",
    tags: ["Produtividade", "CRUD", "Organização"],
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
    title: "Desenvolvimento web",
    items: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind", level: 75 },
      { name: "Bootstrap", level: 35 },
    ],
  },
  {
    title: "Backend e arquitetura",
    items: [
      { name: "POO", level: 80 },
      { name: "APIs", level: 70 },
      { name: "CRUD", level: 75 },
      { name: "UML", level: 55 },
    ],
  },
  {
    title: "Produto e operação",
    items: [
      { name: "Modelagem de domínio", level: 75 },
      { name: "Integrações", level: 70 },
      { name: "Documentação", level: 80 },
      { name: "Git", level: 80 },
    ],
  },
] as const
