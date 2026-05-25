# Registro Tecnico 2026-03-20

## Objetivo

Registrar as mudancas tecnicas relevantes consolidadas nesta rodada de trabalho.

---

## 1. Afiliados com catalogo compartilhado

Foi concluido o MVP de leitura herdada de catalogo para afiliados em `shared_catalog`.

Resultado:

- afiliado visualiza catalogo do operador de origem
- afiliado nao consegue editar itens localmente
- backend passou a resolver a loja de leitura por relacionamento ativo

Arquivos centrais:

- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)
- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)
- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)

---

## 2. Afiliado Shopee sem API oficial

Foi implementado o modo de item afiliado externo, pensado para operar sem API oficial da Shopee Afiliados.

Resultado:

- item pode ser marcado como afiliado externo
- item recebe link afiliado e metadados de origem
- vitrine publica abre a oferta externa em vez de seguir para checkout interno

Arquivos centrais:

- [entregoo-web/src/types/catalog.ts](/j:/Projetos/entregoo/entregoo-web/src/types/catalog.ts)
- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-web/src/lib/catalog-to-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-to-menu.ts)
- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)

---

## 3. Importacao em lote para itens afiliados

Foi adicionada importacao assistida por colagem de planilha na listagem do catalogo.

Resultado:

- aceita colagem por `;`, `,` ou tab
- cria itens afiliados externos em lote
- acelera montagem de vitrine afiliada

Arquivo central:

- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)

---

## 4. Shell responsivo do dashboard

Foi reforcado o shell do dashboard para uso melhor em mobile e desktop.

Resultado:

- menu mobile virou botao flutuante com drawer
- sidebar desktop ficou fixa
- header passou a ficar fixo nas telas principais do dashboard
- a rolagem passou a se concentrar no conteudo principal

Arquivos centrais:

- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- [entregoo-web/src/app/dasboard/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/page.tsx)
- [entregoo-web/src/app/dasboard/pedidos/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/pedidos/page.tsx)
- [entregoo-web/src/app/dasboard/relatorios/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/relatorios/page.tsx)

---

## 5. Validacao

Validacoes executadas:

- `npm run build` em `entregoo-web`
- `npm run build` em `entregoo-api`

Ambas passaram.
