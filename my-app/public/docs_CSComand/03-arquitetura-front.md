# Arquitetura Frontend

## Stack

- Next.js com App Router.
- React client-side no MVP.
- CSS global com tokens de identidade visual.
- Persistência temporaria em `localStorage`.

## Estrutura atual

```text
app/
  layout.jsx
  page.jsx
  globals.css
docs/
  00-visao-geral.md
  01-requisitos-produto.md
  02-identidade-visual.md
  03-arquitetura-front.md
  04-modelo-dados.md
  05-roadmap.md
```

## Decisao do MVP

A primeira versão usa uma tela client-side única para acelerar validação de fluxo, conteúdo, nomenclatura e identidade visual. Quando os formulários e entidades estiverem aprovados, a aplicação deve evoluir para rotas e componentes separados.

## Próxima organização recomendada

```text
app/
  dashboard/page.jsx
  clientes/page.jsx
  clientes/[id]/page.jsx
  feedbacks/page.jsx
  tickets/page.jsx
  tarefas/page.jsx
  pesquisas/page.jsx
  planos/page.jsx
components/
  app-shell/
  data-table/
  forms/
  metric-card/
  status-badge/
lib/
  constants/
  formatters/
  storage/
```

## Estados de interface

Toda tela operacional deve prever:

- Estado vazio.
- Estado com dados.
- Filtro ou busca.
- Acao principal.
- Status visual.
- Feedback apos salvar ou atualizar.

## Padrões de navegação

- A sidebar deve ficar compacta por padrao, exibindo apenas marca e icones lineares.
- Ao passar o mouse ou focar por teclado, a sidebar expande e revela os nomes dos modulos.
- A tela ativa deve ter destáque azul e indicador lateral.
- O topo da aplicação deve manter busca, contexto do cliente e avatar do usuário.
- Em mobile, a sidebar deixa de ser recolhida para preservar legibilidade.
