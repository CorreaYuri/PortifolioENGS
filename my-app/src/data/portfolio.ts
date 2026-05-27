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
  email: "fratello.yuri@gmail.com",
  city: "Florianópolis, SC",
  phoneE164: "+5531996210613",
}

export const socials = [
  { href: "https://github.com/CorreaYuri", icon: "fa-brands fa-github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/yuri-corr%C3%AAa-a9944646/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "https://www.instagram.com/yury_correal/", icon: "fa-brands fa-square-instagram", label: "Instagram" },
  { href: "https://wa.me/5531996210613", icon: "fa-brands fa-square-whatsapp", label: "WhatsApp" },
  { href: "mailto:fratello.yuri@gmail.com", icon: "fa-solid fa-envelope", label: "Email" },
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
    title: "NexaClub",
    slug: "nexaclub",
    desc: "Projeto em desenvolvimento para gestão inteligente de casas noturnas, eventos e consumo interno, com dashboard administrativo, pulseiras NFC/RFID, cartão de consumo, controle de caixa, vendas, relatórios e experiência mobile para o usuário.",
    href: "",
    initials: "NC",
    kind: "Em desenvolvimento",
    status: "Em desenvolvimento",
    tags: ["Nexa", "Dashboard", "NFC/RFID", "Mobile", "Vendas", "Gestão de consumo"],
  },
  {
    title: "Nexa Plataforma Operacional",
    slug: "nexa-plataforma-operacional",
    desc: "Empresa e plataforma própria fundada por mim para vender produtos digitais e desenvolver soluções sob demanda. O sistema reúne CRM, clientes, projetos, financeiro, RH, documentos, permissões, auditoria e portal do cliente.",
    href: "",
    initials: "NX",
    kind: "Produto próprio",
    tags: ["ERP", "Backend", "POO", "APIs", "RBAC", "Portal do cliente"],
  },
  {
    title: "Entregoo Plataforma SaaS",
    slug: "entregoo-plataforma-saas",
    desc: "Plataforma multitenant para operação de assinantes, sublojas, pedidos, catálogo, caixa, clientes, portal interno e integrações. O produto evolui de operação food service para uma base modular por segmento, com arquitetura API-first.",
    href: "",
    initials: "EG",
    kind: "SaaS multitenant",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Multi-tenant", "API-first"],
  },
  {
    title: "1400CRM Central de Chamados",
    slug: "1400crm-central-de-chamados",
    desc: "Produto multi-tenant para operação de chamados por inbox, com SLA, timeline, anexos, auditoria, modo suporte da plataforma e gestão de tenants.",
    href: "",
    initials: "CRM",
    kind: "SaaS operacional",
    tags: ["Multi-tenant", "Tickets", "SLA", "Auditoria", "Prisma", "APIs"],
  },
  {
    title: "Integração Nexa x 1400CRM",
    slug: "integracao-nexa-1400crm",
    desc: "Integração entre a plataforma Nexa e o motor de chamados 1400CRM, com sincronização de clientes, abertura e consulta de chamados, webhooks, bearer token, logs e health check.",
    href: "",
    initials: "API",
    kind: "Integração entre sistemas",
    tags: ["REST API", "Webhooks", "Idempotência", "Logs", "Health check"],
  },
  {
    title: "Banco Pessoal",
    slug: "banco-pessoal",
    desc: "Aplicativo de gerenciamento de finanças pessoais, com organização de dados, fluxo de cadastro e lógica de controle financeiro.",
    href: "https://github.com/CorreaYuri/AppBancoPessoal",
    img: projetoBancoPessoalImg,
    alt: "Projeto Banco Pessoal",
    kind: "Aplicativo",
    tags: ["React Native", "Finanças", "POO"],
  },
  {
    title: "Linho e Grafite",
    slug: "linho-e-grafite",
    desc: "Loja e-commerce de moda masculina com foco em catálogo, experiência de navegação e regras de negócio para venda online.",
    href: "",
    img: projetoEcomerceImg,
    alt: "Projeto E-commerce Linho e Grafite",
    kind: "E-commerce",
    tags: ["E-commerce", "Front-end", "Regras de negócio"],
  },
  {
    title: "ToDo List",
    slug: "todo-list",
    desc: "Aplicativo para gerenciamento de tarefas diárias, explorando CRUD, organização de estados e fluxo simples de produtividade.",
    href: "",
    img: projetoToDoListImg,
    alt: "Projeto ToDo List",
    kind: "Aplicativo",
    tags: ["Produtividade", "CRUD", "Organização"],
  },
] as const

export const projectDetails = {
  nexaclub: {
    problem: "Casas noturnas e eventos precisam controlar consumo, pagamentos, acesso e relatórios sem depender de processos manuais lentos.",
    role: "Produto em desenvolvimento pela Nexa, com foco em experiência mobile, gestão operacional, dashboard administrativo e integrações futuras.",
    features: ["Dashboard de vendas e transações", "Pulseiras NFC/RFID", "Cartão de consumo", "Controle de caixa", "Relatórios operacionais", "Interface mobile para consumo"],
    stack: ["Next.js", "TypeScript", "APIs", "Dashboard", "NFC/RFID", "Design system"],
    impact: "A proposta é reduzir atrito na operação, dar visão em tempo real ao gestor e melhorar a experiência do cliente durante o evento.",
  },
  "nexa-plataforma-operacional": {
    problem: "Empresas precisam centralizar operação, clientes, projetos, financeiro, documentos e atendimento em uma plataforma organizada.",
    role: "Fundador e desenvolvedor responsável por produto, arquitetura, regras de negócio, documentação e evolução técnica.",
    features: ["CRM", "Portal do cliente", "Projetos", "Financeiro", "Permissões", "Auditoria"],
    stack: ["Next.js", "TypeScript", "Prisma", "APIs", "RBAC", "Multi-tenant"],
    impact: "Organiza áreas críticas do negócio em uma base evolutiva, com governança e documentação para manutenção contínua.",
  },
  "entregoo-plataforma-saas": {
    problem: "Operações de delivery e comércio precisam de uma base modular para pedidos, catálogo, assinantes e integrações.",
    role: "Desenvolvimento full stack com foco em arquitetura SaaS, multi-tenant, API-first e evolução de produto.",
    features: ["Assinantes", "Sublojas", "Catálogo", "Pedidos", "Caixa", "Portal interno"],
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL", "Multi-tenant", "API-first"],
    impact: "Cria uma base para operação por segmento, permitindo evolução gradual sem perder separação entre tenants.",
  },
  "1400crm-central-de-chamados": {
    problem: "Times de suporte precisam organizar chamados, SLA, anexos, auditoria e operação multi-tenant com rastreabilidade.",
    role: "Construção do produto com foco em backend, regras de atendimento, segurança por tenant e experiência operacional.",
    features: ["Inbox de chamados", "SLA", "Timeline", "Anexos", "Auditoria", "Gestão de tenants"],
    stack: ["Next.js", "Prisma", "APIs", "RBAC", "Tickets", "Auditoria"],
    impact: "Melhora controle, rastreabilidade e organização de atendimentos em ambientes com múltiplos clientes.",
  },
  "integracao-nexa-1400crm": {
    problem: "A Nexa precisa abrir, consultar e acompanhar chamados no motor 1400CRM mantendo sincronização e segurança.",
    role: "Desenho da integração, contratos de API, webhooks, logs, health check e documentação técnica.",
    features: ["Sincronização de clientes", "Abertura de chamados", "Consulta de status", "Webhooks", "Bearer token", "Logs"],
    stack: ["REST API", "Webhooks", "Idempotência", "Logs", "Health check", "Integrações"],
    impact: "Reduz trabalho manual e conecta operação interna com atendimento de forma mais consistente.",
  },
  "banco-pessoal": {
    problem: "Usuários precisam organizar finanças pessoais com fluxo simples de cadastro e controle.",
    role: "Projeto de estudo aplicado para reforçar lógica, organização de dados e interface mobile.",
    features: ["Cadastro", "Controle financeiro", "Fluxos de navegação", "Organização de dados"],
    stack: ["React Native", "JavaScript", "POO", "CRUD"],
    impact: "Demonstra fundamentos de aplicação mobile, lógica de negócio e estruturação de dados.",
  },
  "linho-e-grafite": {
    problem: "Uma loja online precisa apresentar catálogo e experiência de navegação clara para venda de moda masculina.",
    role: "Desenvolvimento front-end com atenção a catálogo, fluxo de compra e regras de apresentação de produto.",
    features: ["Catálogo", "Vitrine", "Navegação", "Experiência de compra"],
    stack: ["Front-end", "E-commerce", "React", "Regras de negócio"],
    impact: "Explora experiência comercial e organização visual para produtos de varejo.",
  },
  "todo-list": {
    problem: "Usuários precisam controlar tarefas diárias com uma experiência simples e objetiva.",
    role: "Projeto para praticar CRUD, estado, organização de componentes e fluxo de produtividade.",
    features: ["Criar tarefas", "Editar tarefas", "Concluir tarefas", "Organizar estado"],
    stack: ["React", "CRUD", "Estado", "Produtividade"],
    impact: "Consolida fundamentos de front-end, interação e estrutura de componentes.",
  },
} as const

export const skillGroups = [
  {
    title: "Linguagens",
    items: [
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 75 },
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
