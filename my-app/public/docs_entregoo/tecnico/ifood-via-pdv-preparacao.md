# iFood via PDV: Preparacao da Integracao

## Objetivo

Preparar o Entregoo para integrar com o iFood em um fluxo mediado por PDV, middleware ou hub parceiro, sem prometer ainda a conciliacao completa de pedidos dentro do kanban.

Este documento cobre:

- quais dados precisam existir no tenant
- quais telas foram preparadas
- quais endpoints de backend podem ser usados na homologacao
- como validar se a loja esta pronta para subir

---

## O que ficou pronto no sistema

### Frontend

- bloco dedicado de configuracao iFood em [entregoo-web/src/app/dasboard/configuracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/configuracoes/page.tsx)
- checklist de prontidao em [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- persistencia das configuracoes em [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- tipagem da integracao em [entregoo-web/src/types/settings.ts](/j:/Projetos/entregoo/entregoo-web/src/types/settings.ts)

### Backend

- leitura de prontidao por tenant em [entregoo-api/src/routes/ifood-integration.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/ifood-integration.routes.ts)
- controller dedicado em [entregoo-api/src/controllers/ifood-integration.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/ifood-integration.controller.ts)
- service com validacao basica e assinatura em [entregoo-api/src/services/ifood-integration.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/ifood-integration.service.ts)
- captura do `rawBody` para conferencia de assinatura em [entregoo-api/src/server.ts](/j:/Projetos/entregoo/entregoo-api/src/server.ts)

---

## Campos que o tenant precisa preencher

No dashboard, em configuracoes, o bloco `iFood via PDV` agora aceita:

- `providerMode`
- `merchantId`
- `merchantName`
- `externalStoreId`
- `webhookUrl`
- `webhookSecret`
- `clientId`
- `clientSecret`
- `eventsPollingIntervalSeconds`
- `notes`

Tambem ficaram disponiveis os toggles:

- `enabled`
- `catalogSyncEnabled`
- `orderIngestionEnabled`
- `statusPollingEnabled`
- `autoAcceptOrders`
- `printWithPdvCode`

Esses campos convivem com os toggles operacionais mais antigos:

- `pdvSyncEnabled`
- `ifoodEnabled`
- `webhookUrl`

---

## Como ficou o fluxo de homologacao

### 1. Preparar o tenant

- ativar `Sincronizacao com PDV`
- ativar `Integracao com iFood`
- preencher `merchantId`
- preencher `externalStoreId`
- configurar `webhookUrl`
- preencher `webhookSecret` se o parceiro usar assinatura
- revisar se o catalogo tem `pdvCode` em produto, tamanho, sabor e adicional

### 2. Conferir prontidao

Endpoint:

```text
GET /integrations/ifood/readiness?storeId=<storeId>&substoreId=<substoreId-opcional>
```

Resposta esperada:

- `ready`
- `checklist`
- `pending`
- `webhookEndpoint`
- `features`

Se `ready = false`, o campo `pending` mostra o que ainda falta.

### 3. Configurar entrega de eventos

Endpoint preparado no backend:

```text
POST /integrations/ifood/webhook?storeId=<storeId>&substoreId=<substoreId-opcional>
```

Uso atual:

- recebe eventos em JSON
- valida `X-IFood-Signature` quando houver `webhookSecret`
- responde `202` para `KEEPALIVE`
- responde `202` para outros eventos aceitos

Observacao importante:

O endpoint atual foi preparado para homologacao e recepcao segura do evento.
Ele ainda nao transforma o pedido do iFood em pedido interno do Entregoo. Essa proxima etapa precisa mapear payload, itens e status.

---

## Regra pratica de configuracao por cenario

### Via PDV puro

Use quando o proprio PDV ou conector do PDV faz autenticacao e roteamento.

Preencher obrigatoriamente:

- `merchantId`
- `externalStoreId`
- `webhookUrl`
- `webhookSecret` se o parceiro assinar requests

`clientId` e `clientSecret` podem ficar vazios se a autenticacao estiver toda no parceiro.

### Via middleware

Use quando existe um hub entre iFood e Entregoo.

Preencher obrigatoriamente:

- `merchantId`
- `externalStoreId`
- `webhookUrl`
- `notes` com nome do middleware e URL de homologacao

### Customizado

Use quando o Entregoo vai assumir mais responsabilidade no fluxo.

Preencher obrigatoriamente:

- `merchantId`
- `externalStoreId`
- `webhookUrl`
- `clientId`
- `clientSecret`
- `webhookSecret`

---

## O que falta para a integracao completa

Esta entrega deixa o sistema pronto para implantacao e homologacao tecnica, mas ainda faltam etapas para dizer que o iFood esta operando ponta a ponta:

- mapear o payload oficial de pedido para `submitted-orders`
- traduzir cancelamento, confirmacao e mudancas de status
- conciliar itens do payload com `pdvCode`
- gravar logs de integracao e fila de reprocessamento
- decidir se a operacao sera via webhook, polling ou ambos

---

## Referencias operacionais

- iFood docs sobre webhook e heartbeat: https://developer.ifood.com.br/en-US/docs/guides/order/events/delivery-methods/webhook/presence

Inferencia usada aqui:

O Entregoo foi preparado para o modelo em que o iFood ou middleware envia eventos para um endpoint HTTP e espera confirmacao `202 Accepted` em fluxos de `KEEPALIVE` e eventos operacionais.
