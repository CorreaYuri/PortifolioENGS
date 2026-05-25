# Mapa de Manutencao do Sistema

## Objetivo

Este documento existe para responder a pergunta mais pratica do dia a dia:

> "Se eu tiver o problema X, em quais lugares do codigo normalmente preciso mexer?"

Ele nao substitui a leitura da arquitetura.
Ele serve como atalho operacional para manutencao.

---

## 1. Problemas de contexto entre tenants

### Sintoma

- trocar de assinante mistura dados
- abrir vitrine em outra aba derruba o dashboard
- area do cliente abre contexto errado

### Onde olhar

- [entregoo-web/src/lib/saas-clients-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/saas-clients-storage.ts)
- [entregoo-web/src/components/auth/DashboardAccessGate.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/auth/DashboardAccessGate.tsx)
- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)
- [entregoo-web/src/hooks/use-channel-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/hooks/use-channel-menu.ts)
- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)
- [entregoo-web/src/app/loja/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/loja/page.tsx)
- [entregoo-web/src/app/mesa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/mesa/page.tsx)

### Regra pratica

Se a tela nasce por link publico, outra aba ou fluxo paralelo, prefira `subscriberId` por URL em vez de depender do tenant ativo global.

---

## 2. Problemas no kanban de pedidos

### Sintoma

- coluna com nome errado
- botao da etapa errado
- status nao aparece no lugar esperado
- fluxo muda conforme segmento e fica inconsistente

### Onde olhar

- [entregoo-web/src/app/dasboard/pedidos/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/pedidos/page.tsx)
- [entregoo-web/src/lib/order-workflow-labels.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/order-workflow-labels.ts)
- [entregoo-web/src/lib/subscriber-modules.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-modules.ts)
- [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- [entregoo-api/src/services/dashboard-settings.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/dashboard-settings.service.ts)

### Regra pratica

Se o problema for so texto, normalmente mexe no resolver de labels.
Se o problema for persistencia do label, mexe em `settings-storage` e `dashboard-settings.service`.

---

## 3. Problemas no fluxo do pedido

### Sintoma

- pedido some
- pedido nao sincroniza com backend
- status nao atualiza
- conferencia ou entrega nao reflete no kanban

### Onde olhar

- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-web/src/lib/submitted-orders-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-api.ts)
- [entregoo-web/src/app/api/orders/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/orders/route.ts)
- [entregoo-web/src/app/api/orders/[orderId]/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/orders/[orderId]/route.ts)
- [entregoo-api/src/routes/submitted-orders.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/submitted-orders.routes.ts)
- [entregoo-api/src/controllers/submitted-orders.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/submitted-orders.controller.ts)
- [entregoo-api/src/services/submitted-orders.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/submitted-orders.service.ts)

### Regra pratica

Frontend cuida de leitura local, espelho e UX.
Backend cuida da persistencia real e contrato do pedido.

---

## 4. Problemas na vitrine e app mesa

### Sintoma

- vitrine abre produtos errados
- logo, titulo ou meios de pagamento nao batem com a loja
- cliente autenticado na vitrine mistura dados com outra loja

### Onde olhar

- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)
- [entregoo-web/src/hooks/use-channel-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/hooks/use-channel-menu.ts)
- [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-web/src/app/loja/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/loja/page.tsx)
- [entregoo-web/src/app/mesa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/mesa/page.tsx)

### Regra pratica

Primeiro confirme se a URL nasceu com `subscriberId` e `substoreId`.

---

## 5. Problemas na area do cliente

### Sintoma

- cobranca aparece para o assinante errado
- contratos nao aparecem
- area do cliente abre contexto errado em outra aba

### Onde olhar

- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)
- [entregoo-web/src/app/dasboard/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/area-cliente/page.tsx)
- [entregoo-web/src/lib/saas-billing-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/saas-billing-storage.ts)
- [entregoo-web/src/lib/subscriber-billing-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-billing-api.ts)
- [entregoo-web/src/lib/portal-contracts.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/portal-contracts.ts)

### Regra pratica

Se o erro for contexto, revisar `subscriberId` por URL.
Se o erro for cobranca, revisar billing.
Se o erro for contrato, revisar proposals do portal.

---

## 6. Problemas no portal comercial

### Sintoma

- lead nao aparece
- proposta nao muda de status
- onboarding nao inicia
- contrato nao gera link
- filtro por closer nao funciona
- lead editado no detalhe nao salva
- secao de integracao comercial some ou volta aberta no estado errado

### Onde olhar

- [entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)
- [entregoo-web/src/components/marketing/EntregooCustomerOnboardingPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooCustomerOnboardingPage.tsx)
- [entregoo-web/src/lib/entregoo-portal-ops-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/entregoo-portal-ops-api.ts)
- [entregoo-api/src/routes/entregoo-portal-ops.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/entregoo-portal-ops.routes.ts)
- [entregoo-api/src/controllers/entregoo-portal-ops.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/entregoo-portal-ops.controller.ts)
- [entregoo-api/src/services/entregoo-portal-ops.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-portal-ops.service.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

### Regra extra para CRM externo

Se o problema envolver HubSpot, Pipedrive, RD Station CRM, Salesforce ou middleware comercial,
confirmar primeiro se a divergencia esta no funil interno do portal e nao nas telas do tenant operacional.

Documento de referencia:

- [integracao-comercial-com-crms.md](/j:/Projetos/entregoo/docs/tecnico/integracao-comercial-com-crms.md)

### Regra extra para operacao diaria

Os filtros de closer, o modo `Mostrar meus leads`, a edicao rapida do lead e o painel recolhivel de integracoes comerciais vivem todos em:

- [EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)

---

## 7. Problemas no contrato comercial

### Sintoma

- contrato nao salva nova versao
- link publico nao abre
- cliente assina mas portal nao reflete
- documento baixado sai errado

### Onde olhar

- [entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)
- [entregoo-web/src/app/contrato/[token]/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/contrato/[token]/page.tsx)
- [entregoo-web/src/lib/portal-contracts.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/portal-contracts.ts)
- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)
- [entregoo-web/src/components/marketing/EntregooSubscriberDatabasePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSubscriberDatabasePage.tsx)
- [entregoo-api/src/services/entregoo-portal-ops.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-portal-ops.service.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

---

## 8. Problemas na base de assinantes

### Sintoma

- ficha do assinante nao bate com backend
- acessos nao aparecem
- contrato assinado nao aparece
- timeline interna parece incompleta

### Onde olhar

- [entregoo-web/src/components/marketing/EntregooSubscriberDatabasePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSubscriberDatabasePage.tsx)
- [entregoo-web/src/lib/entregoo-companies-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/entregoo-companies-api.ts)
- [entregoo-web/src/lib/system-users-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/system-users-api.ts)
- [entregoo-web/src/lib/entregoo-portal-ops-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/entregoo-portal-ops-api.ts)
- [entregoo-api/src/services/entregoo-companies.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-companies.service.ts)

---

## 9. Problemas em configuracoes por subloja

### Sintoma

- configuracao nao herda
- subloja usa label errado
- settings somem ou nao mesclam direito

### Onde olhar

- [entregoo-web/src/lib/substores-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/substores-storage.ts)
- [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- [entregoo-web/src/lib/subscriber-modules.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-modules.ts)
- [entregoo-api/src/services/dashboard-settings.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/dashboard-settings.service.ts)
- [entregoo-api/src/controllers/substore.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/substore.controller.ts)

---

## 10. Problemas no catalogo e cardapio

### Sintoma

- item nao aparece no gestor, site ou app mesa
- produto salvo some depois de recarregar
- categoria ou imagem nao reflete
- cardapio muda ao trocar de assinante ou subloja

### Onde olhar

- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)
- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)
- [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-web/src/lib/catalog-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-api.ts)
- [entregoo-web/src/lib/catalog-to-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-to-menu.ts)
- [entregoo-web/src/app/api/catalog/items/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/catalog/items/route.ts)
- [entregoo-web/src/app/api/catalog/items/[itemId]/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/catalog/items/[itemId]/route.ts)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

### Regra pratica

Se o item aparece no storage e nao aparece na UI, revisar mapeamento para menu.
Se nao persiste, revisar proxy Next, service e `storeId` ou `substoreId`.

### Regra extra para afiliados

Se o assinante estiver em `shared_catalog`, primeiro confirmar se ele deveria estar vendo o catalogo do operador de origem.

Arquivos principais da heranca:

- [entregoo-web/src/lib/subscriber-modules.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-modules.ts)
- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)
- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

### Regra extra para marketplace externo

Se a origem do catalogo for Shopee Afiliados ou outro marketplace, nao tratar como `shared_catalog` por padrao.

Arquivos de referencia:

- [shopee-afiliados-cenarios-de-integracao.md](/j:/Projetos/entregoo/docs/tecnico/shopee-afiliados-cenarios-de-integracao.md)
- [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)

---

## 11. Problemas em integracao iFood via PDV

### Sintoma

- tenant marcado como iFood mas nao homologou
- webhook responde erro ou assinatura invalida
- parceiro PDV pergunta qual URL usar
- dashboard diz que a loja esta pronta, mas faltam codigos PDV

### Onde olhar

- [entregoo-web/src/app/dasboard/configuracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/configuracoes/page.tsx)
- [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- [entregoo-web/src/types/settings.ts](/j:/Projetos/entregoo/entregoo-web/src/types/settings.ts)
- [entregoo-api/src/routes/ifood-integration.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/ifood-integration.routes.ts)
- [entregoo-api/src/controllers/ifood-integration.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/ifood-integration.controller.ts)
- [entregoo-api/src/services/ifood-integration.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/ifood-integration.service.ts)
- [ifood-via-pdv-preparacao.md](/j:/Projetos/entregoo/docs/tecnico/ifood-via-pdv-preparacao.md)

### Regra pratica

Se o problema for de implantacao, comece pelo endpoint de `readiness`.
Se o problema for assinatura, valide `rawBody`, `webhookSecret` e o header `X-IFood-Signature`.
Se o problema for conciliacao de item, confirme antes se todos os produtos e variacoes tem `pdvCode`.

---

## 12. Problemas em integracao com Anota AI

### Sintoma

- tenant marcado como Anota AI mas ainda nao esta implantavel
- parceiro pede URL de webhook e nao sabemos qual expor
- automacao de atendimento nao conversa com a operacao
- pedido chega no hub, mas nao entra no fluxo do Entregoo

### Onde olhar

- [entregoo-web/src/app/dasboard/configuracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/configuracoes/page.tsx)
- [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- [entregoo-web/src/types/settings.ts](/j:/Projetos/entregoo/entregoo-web/src/types/settings.ts)
- [entregoo-api/src/routes/anota-ai-integration.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/anota-ai-integration.routes.ts)
- [entregoo-api/src/controllers/anota-ai-integration.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/anota-ai-integration.controller.ts)
- [entregoo-api/src/services/anota-ai-integration.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/anota-ai-integration.service.ts)
- [anota-ai-preparacao-da-integracao.md](/j:/Projetos/entregoo/docs/tecnico/anota-ai-preparacao-da-integracao.md)

### Regra pratica

Se o problema for implantacao, comece pelo endpoint de `readiness`.
Se o problema for webhook, confirme se o parceiro manda `x-anota-signature` ou se vamos usar o fallback interno.
Se o problema for pedido nao entrar no kanban, lembre que a transformacao ponta a ponta ainda depende do payload real do parceiro.
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

---

## 11. Problemas em clientes e CRM

### Sintoma

- cliente nao consolida historico
- perfil nao atualiza a partir dos pedidos
- feedback, follow-up ou risco fica incoerente
- dashboard mostra base de clientes errada

### Onde olhar

- [entregoo-web/src/app/dasboard/clientes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/clientes/page.tsx)
- [entregoo-web/src/lib/customers-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/customers-storage.ts)
- [entregoo-web/src/lib/customers-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/customers-api.ts)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)
- [entregoo-web/src/app/api/customers/profiles/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/customers/profiles/route.ts)
- [entregoo-api/src/services/customer-profiles.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/customer-profiles.service.ts)

### Regra pratica

Primeiro decidir se o erro esta na consolidacao derivada do pedido ou no perfil persistido do cliente.

---

## 12. Problemas em caixa e confirmacao financeira

### Sintoma

- sessao de caixa nao abre ou nao fecha
- pedido pago nao aparece como confirmado
- valores esperados e recebidos divergem
- tela mostra sessao de outra unidade

### Onde olhar

- [entregoo-web/src/app/dasboard/caixa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/caixa/page.tsx)
- [entregoo-web/src/app/dasboard/conferencia/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/conferencia/page.tsx)
- [entregoo-web/src/lib/cashier-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/cashier-storage.ts)
- [entregoo-web/src/lib/financial-confirmations-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/financial-confirmations-storage.ts)
- [entregoo-web/src/lib/cashier-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/cashier-api.ts)
- [entregoo-web/src/lib/financial-confirmations-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/financial-confirmations-api.ts)
- [entregoo-api/src/services/cash-sessions.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/cash-sessions.service.ts)
- [entregoo-api/src/services/financial-confirmations.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/financial-confirmations.service.ts)

### Regra pratica

Se a divergencia for de valor, comparar pedido, sessao e confirmacao financeira.
Se a divergencia for de contexto, validar `storeId` e `substoreId` antes de qualquer regra de totalizacao.

---

## 13. Problemas em entregas e despacho

### Sintoma

- entregador nao aparece disponivel
- pedido nao entra ou nao sai da fila de entrega
- status da rota nao reflete no pedido
- operador de entrega enxerga fila errada

### Onde olhar

- [entregoo-web/src/app/dasboard/entregas/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/entregas/page.tsx)
- [entregoo-web/src/lib/delivery-dispatch-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/delivery-dispatch-storage.ts)
- [entregoo-web/src/lib/delivery-dispatch-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/delivery-dispatch-api.ts)
- [entregoo-api/src/services/delivery-dispatch.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/delivery-dispatch.service.ts)
- [entregoo-web/src/lib/submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)

### Regra pratica

Quando entrega parece errada, quase sempre vale revisar junto o pedido, porque o despacho e o pedido se espelham.

---

## 14. Problemas em usuarios, login e permissao

### Sintoma

- usuario nao consegue entrar
- menu lateral some ou aparece item indevido
- papel do usuario nao reflete na interface
- sessao restaura contexto errado

### Onde olhar

- [entregoo-web/src/app/login/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/login/page.tsx)
- [entregoo-web/src/lib/auth-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/auth-storage.ts)
- [entregoo-web/src/lib/user-permissions.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/user-permissions.ts)
- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- [entregoo-web/src/components/auth/DashboardAccessGate.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/auth/DashboardAccessGate.tsx)
- [entregoo-api/src/services/auth.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/auth.service.ts)
- [entregoo-api/src/services/system-users.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/system-users.service.ts)

### Regra pratica

Se o problema e login, começar por autenticacao.
Se o problema e menu ou acesso, revisar sessao restaurada, papel e permissao calculada.

---

## 15. Problemas em proxies internos do Next

### Sintoma

- frontend quebra sem erro claro de backend
- a API real responde, mas a tela nao
- comportamento difere entre browser e chamada direta ao Express
- erro 503 intermitente com mensagem de API offline

### Onde olhar

- [entregoo-web/src/lib/server-api-proxy.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/server-api-proxy.ts)
- [entregoo-web/src/app/api/orders/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/orders/route.ts)
- [entregoo-web/src/app/api/catalog/items/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/catalog/items/route.ts)
- [entregoo-web/src/app/api/customers/profiles/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/customers/profiles/route.ts)
- [entregoo-web/src/app/api/dashboard-settings/route.ts](/j:/Projetos/entregoo/entregoo-web/src/app/api/dashboard-settings/route.ts)

### Regra pratica

Quando a UI falha e o backend parece certo, verificar primeiro a rota interna do Next antes de mexer no service da API.

---

## 16. Problemas em build ou rota Next

### Sintoma

- erro de prerender
- `useSearchParams` quebrando build
- rota publica abre, mas build falha

### Onde olhar

- [entregoo-web/src/app/layout.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/layout.tsx)
- [entregoo-web/src/components/ui/PageTransitionShell.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/ui/PageTransitionShell.tsx)
- paginas que usam `useSearchParams`, `useParams` ou client-only hooks

---

## 17. Problemas de shell e responsividade no dashboard

### Sintoma

- sidebar some no mobile
- header do dashboard nao fica preso no topo
- pagina inteira rola quando o esperado era rolar so o conteudo
- botao de menu some atras da tela

### Onde olhar

- [entregoo-web/src/components/dashboard/DashboardSidebar.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/dashboard/DashboardSidebar.tsx)
- paginas em `entregoo-web/src/app/dasboard/*/page.tsx`

### Regra pratica

No desktop, o shell precisa combinar:

- container externo com `lg:h-screen`
- coluna central com `min-h-0`
- header com `sticky top-0`
- area principal com `overflow-y-auto`

No mobile, o menu deve ser flutuante e nao reservar coluna fixa.

---

## 18. Sequencia recomendada de verificacao

Quando aparecer um bug novo, usar esta ordem:

1. Confirmar o contexto: `subscriberId`, `substoreId`, sessao e rota atual.
2. Confirmar a leitura local: `storage`, estado em memoria e chaves tenant-aware.
3. Confirmar o cliente de API ou proxy interno do Next.
4. Confirmar controller ou service da API Express.
5. Confirmar persistencia, filtro e schema no Prisma.

Essa ordem evita corrigir sintoma em vez de causa.

---

## 19. Regra de manutencao

Antes de corrigir um bug, sempre responder:

1. o problema e de contexto?
2. o problema e de leitura local?
3. o problema e de proxy Next?
4. o problema e de backend?
5. o problema e de banco ou schema?

Se essa ordem for respeitada, a chance de corrigir no lugar certo aumenta muito.
