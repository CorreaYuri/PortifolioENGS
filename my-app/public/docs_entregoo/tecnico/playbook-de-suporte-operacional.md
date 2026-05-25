# Playbook de Suporte Operacional

## Objetivo

Este documento existe para triagem rapida.

Ele responde:

> "Aconteceu o problema X. O que eu confiro primeiro, em que ordem, e onde normalmente esta a causa?"

Ele deve ser usado junto com o [Mapa de Manutencao do Sistema](/j:/Projetos/entregoo/docs/tecnico/mapa-de-manutencao-do-sistema.md), mas e mais direto e mais curto.

---

## Regra geral de triagem

Antes de entrar em codigo, sempre confirmar:

1. qual assinante esta ativo
2. qual subloja esta ativa
3. qual usuario esta logado
4. em qual tela o problema aconteceu
5. se o problema apareceu so na UI ou tambem na API

Se essa base estiver errada, o resto da investigacao tende a perder tempo.

---

## 1. Pedido sumiu do kanban

### Conferir em 30 segundos

1. confirmar `subscriberId` e `substoreId` ativos
2. confirmar se o pedido ainda existe no storage local
3. confirmar se o pedido veio da API
4. confirmar se o status atual coloca o pedido em outra coluna
5. confirmar se ele foi ocultado por regra de caixa ou conferencia

### Onde olhar

- [entregoo-web/src/app/dasboard/pedidos/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/pedidos/page.tsx)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-web/src/lib/submitted-orders-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-api.ts)
- [entregoo-api/src/services/submitted-orders.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/submitted-orders.service.ts)

### Causas comuns

- filtro de status ou coluna
- troca de tenant ou subloja
- espelho local divergente da API
- pedido salvo em outra unidade

---

## 2. Pedido nao atualiza status

### Conferir em 30 segundos

1. confirmar se o pedido esta em edicao
2. confirmar se a transicao depende de conferencia
3. confirmar se o `updateSubmittedOrderStatus` ou fluxo equivalente foi chamado
4. confirmar se a API persistiu o novo status
5. confirmar se a tela releu o pedido apos salvar

### Onde olhar

- [entregoo-web/src/app/dasboard/pedidos/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/pedidos/page.tsx)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-web/src/lib/order-workflow-labels.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/order-workflow-labels.ts)
- [entregoo-api/src/services/submitted-orders.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/submitted-orders.service.ts)

### Causas comuns

- transicao bloqueada por regra de fluxo
- pedido em estado de edicao
- persistencia falhando no proxy ou backend

---

## 3. Tenant misturou dados

### Conferir em 30 segundos

1. confirmar qual tenant a tela deveria usar
2. confirmar se a rota usa contexto por URL ou contexto global
3. confirmar qual chave tenant-aware esta sendo lida
4. confirmar se houve troca de tenant em outra aba
5. confirmar se o componente reage a `storage event`

### Onde olhar

- [entregoo-web/src/lib/saas-clients-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/saas-clients-storage.ts)
- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)
- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)
- [entregoo-web/src/app/loja/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/loja/page.tsx)

### Causas comuns

- uso indevido do tenant global
- ausencia de `subscriberId` na URL
- chave de storage sem isolamento por tenant

---

## 4. Catalogo nao aparece ou fica errado

### Conferir em 30 segundos

1. confirmar tenant e subloja ativos
2. confirmar se o item existe no storage ou na API
3. confirmar se o canal correto esta habilitado
4. confirmar se o mapeamento para menu removeu o item
5. confirmar se a tela esta usando fallback local

### Onde olhar

- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-web/src/lib/catalog-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-api.ts)
- [entregoo-web/src/lib/catalog-to-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-to-menu.ts)
- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

### Causas comuns

- item salvo sem contexto correto
- canal desabilitado
- erro no adaptador de catalogo para menu
- afiliado em `shared_catalog` lendo operador diferente do esperado

### Regra rapida para afiliados

Se o tenant for afiliado e estiver em `shared_catalog`, lembrar:

1. ele pode visualizar catalogo herdado
2. ele nao deveria editar item localmente
3. a manutencao correta fica no operador de origem

---

## 5. Vitrine ou app mesa abriu loja errada

### Conferir em 30 segundos

1. confirmar `subscriberId` na URL
2. confirmar `substoreId` na URL, quando a tela depender de unidade
3. confirmar de onde a tela esta derivando configuracoes
4. confirmar de onde a tela esta derivando catalogo
5. confirmar se a sessao do browser foi contaminada por outra aba

### Onde olhar

- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)
- [entregoo-web/src/hooks/use-channel-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/hooks/use-channel-menu.ts)
- [entregoo-web/src/app/loja/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/loja/page.tsx)
- [entregoo-web/src/app/mesa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/mesa/page.tsx)

### Causas comuns

- URL incompleta
- dependencia do tenant ativo global
- leitura de storage sem congelar contexto

---

## 6. Caixa divergiu

### Conferir em 30 segundos

1. confirmar sessao de caixa aberta na unidade certa
2. confirmar se o pedido foi confirmado financeiramente
3. confirmar valor do pedido, desconto, acrescimo e entrega
4. confirmar se a sessao e a confirmacao pertencem ao mesmo tenant
5. confirmar se a tela esta lendo cache local desatualizado

### Onde olhar

- [entregoo-web/src/app/dasboard/caixa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/caixa/page.tsx)
- [entregoo-web/src/lib/cashier-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/cashier-storage.ts)
- [entregoo-web/src/lib/financial-confirmations-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/financial-confirmations-storage.ts)
- [entregoo-api/src/services/cash-sessions.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/cash-sessions.service.ts)
- [entregoo-api/src/services/financial-confirmations.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/financial-confirmations.service.ts)

### Causas comuns

- pedido nao confirmado
- sessao de caixa errada
- divergencia entre pedido, sessao e confirmacao

---

## 7. Usuario ficou sem acesso

### Conferir em 30 segundos

1. confirmar se o login aconteceu de fato
2. confirmar qual papel o usuario recebeu na sessao
3. confirmar se a tela exige permissao ou papel especifico
4. confirmar se o menu lateral foi filtrado corretamente
5. confirmar se a sessao foi restaurada com dados antigos

### Onde olhar

- [entregoo-web/src/lib/auth-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/auth-storage.ts)
- [entregoo-web/src/lib/user-permissions.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/user-permissions.ts)
- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- [entregoo-api/src/services/auth.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/auth.service.ts)
- [entregoo-api/src/services/system-users.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/system-users.service.ts)

### Causas comuns

- papel diferente do esperado
- permissao nao associada ao papel
- sessao local antiga

---

## 8. Cliente nao aparece ou CRM ficou incoerente

### Conferir em 30 segundos

1. confirmar se os pedidos do cliente existem
2. confirmar se a consolidacao a partir dos pedidos rodou
3. confirmar se o perfil persistido foi atualizado
4. confirmar se o tenant atual e o tenant esperado
5. confirmar se a dashboard esta lendo cache ou API

### Onde olhar

- [entregoo-web/src/lib/customers-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/customers-storage.ts)
- [entregoo-web/src/lib/customers-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/customers-api.ts)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-web/src/app/dasboard/clientes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/clientes/page.tsx)
- [entregoo-api/src/services/customer-profiles.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/customer-profiles.service.ts)

### Causas comuns

- historico de pedidos ausente
- consolidacao nao disparada
- leitura de tenant errado

---

## 9. Entrega nao andou

### Conferir em 30 segundos

1. confirmar se o pedido esta pronto para entrar em entrega
2. confirmar se o despacho existe para a unidade correta
3. confirmar se o entregador esta disponivel no contexto certo
4. confirmar se o pedido refletiu o status de entrega
5. confirmar se nao ha divergencia entre fila de entrega e pedido

### Onde olhar

- [entregoo-web/src/app/dasboard/entregas/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/entregas/page.tsx)
- [entregoo-web/src/lib/delivery-dispatch-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/delivery-dispatch-storage.ts)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-api/src/services/delivery-dispatch.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/delivery-dispatch.service.ts)

### Causas comuns

- pedido em etapa anterior
- despachante olhando unidade errada
- sincronizacao parcial entre pedido e entrega

---

## 10. Contrato ou area do cliente nao refletiu

### Conferir em 30 segundos

1. confirmar qual assinante deveria ver o contrato
2. confirmar se o contrato foi salvo ou assinado
3. confirmar se o token publico resolve a proposta correta
4. confirmar se a area do cliente abriu no contexto correto
5. confirmar se o portal interno releu os dados apos a acao

### Onde olhar

- [entregoo-web/src/lib/portal-contracts.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/portal-contracts.ts)
- [entregoo-web/src/app/contrato/[token]/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/contrato/[token]/page.tsx)
- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)
- [entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)
- [entregoo-api/src/services/entregoo-portal-ops.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-portal-ops.service.ts)

### Causas comuns

- contexto errado do assinante
- token ou proposta incorretos
- reflexo parcial entre portal, area do cliente e contrato publico

---

## 11. API parece certa, mas a tela nao

### Conferir em 30 segundos

1. confirmar se a rota interna do Next existe
2. confirmar se o proxy esta passando query e body corretos
3. confirmar se a URL da API backend esta configurada
4. confirmar se a UI esta tratando erro 503 ou fallback local
5. confirmar se a resposta foi normalizada do mesmo jeito na UI

### Onde olhar

- [entregoo-web/src/lib/server-api-proxy.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/server-api-proxy.ts)
- [entregoo-web/src/app/api/orders/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/orders/route.ts)
- [entregoo-web/src/app/api/catalog/items/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/catalog/items/route.ts)
- [entregoo-web/src/app/api/customers/profiles/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/customers/profiles/route.ts)

### Causas comuns

- proxy do Next com contexto errado
- UI usando fallback local sem perceber
- normalizacao diferente entre backend e frontend

---

## 12. Ordem curta de investigacao

Quando nao souber por onde comecar, seguir:

1. contexto
2. estado local
3. proxy Next
4. API Express
5. Prisma e banco

Se o bug for funcional e visual ao mesmo tempo, corrigir primeiro o dado, depois a interface.
