# Anota AI: Preparacao da Integracao

## Objetivo

Preparar o Entregoo para operar com Anota AI como parceiro de pedidos centralizados, atendimento automatizado e conciliacao com PDV.

Este documento cobre:

- quais configuracoes foram abertas no tenant
- quais endpoints existem para prontidao e webhook
- o que ja esta pronto para implantacao
- o que ainda depende de contrato tecnico do parceiro

---

## O que foi preparado no sistema

### Frontend

- configuracao dedicada em [entregoo-web/src/app/dasboard/configuracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/configuracoes/page.tsx)
- checklist de prontidao em [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- persistencia em [entregoo-web/src/lib/settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)
- tipagem em [entregoo-web/src/types/settings.ts](/j:/Projetos/entregoo/entregoo-web/src/types/settings.ts)

### Backend

- leitura de prontidao em [entregoo-api/src/routes/anota-ai-integration.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/anota-ai-integration.routes.ts)
- controller dedicado em [entregoo-api/src/controllers/anota-ai-integration.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/anota-ai-integration.controller.ts)
- service com validacao basica e assinatura opcional em [entregoo-api/src/services/anota-ai-integration.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/anota-ai-integration.service.ts)

---

## Campos disponiveis no tenant

No dashboard, o bloco `Anota AI via PDV ou Hub` agora aceita:

- `providerMode`
- `workspaceId`
- `storeReferenceId`
- `webhookUrl`
- `webhookSecret`
- `apiToken`
- `notes`

Tambem ficaram disponiveis os toggles:

- `enabled`
- `catalogImportEnabled`
- `orderIngestionEnabled`
- `customerAutomationEnabled`
- `statusSyncEnabled`
- `autoConfirmOrders`

E o toggle operacional agregado:

- `anotaAiEnabled`

---

## Endpoints preparados

### Prontidao

```text
GET /integrations/anota-ai/readiness?storeId=<storeId>&substoreId=<substoreId-opcional>
```

Retorna:

- `ready`
- `checklist`
- `pending`
- `webhookEndpoint`
- `features`

### Webhook

```text
POST /integrations/anota-ai/webhook?storeId=<storeId>&substoreId=<substoreId-opcional>
```

Comportamento atual:

- aceita payload JSON
- valida assinatura HMAC se houver `webhookSecret`
- aceita `x-anota-signature`
- aceita `x-entregoo-signature` como fallback interno para parceiros customizados
- responde `202 Accepted` quando o tenant estiver habilitado

---

## Regra pratica de implantacao

### Via hub Anota AI

Use quando a Anota AI ou parceiro intermediario concentra pedidos e automacoes.

Preencher:

- `workspaceId`
- `storeReferenceId`
- `webhookUrl`
- `apiToken` se o parceiro exigir autenticacao

### Via PDV

Use quando a Anota AI estiver operando junto do PDV e o codigo da loja vier do operador.

Preencher:

- `storeReferenceId`
- `webhookUrl`
- `notes` com nome do parceiro e regras da conciliacao

### Customizado

Use quando o Entregoo precisar assumir parte maior do contrato.

Preencher:

- `workspaceId`
- `storeReferenceId`
- `webhookUrl`
- `webhookSecret`
- `apiToken`

---

## O que ainda nao esta fechado

Esta entrega deixa o sistema pronto para implantacao tecnica, mas ainda nao conclui a operacao ponta a ponta:

- mapear pedido externo da Anota AI para `submitted-orders`
- definir contrato real de itens, status e cancelamentos
- confirmar header oficial de assinatura, se existir um padrao estavel
- registrar logs de integracao e fila de reprocessamento

---

## Fontes usadas e limite da verificacao

Encontrei material oficial/publico da Anota AI confirmando:

- operacao com cardapio digital
- pedidos centralizados
- apoio a PDV
- integracoes com iFood e canais digitais

Fonte:

- https://anota.ai/home/

Inferencia usada:

Como nao encontrei uma documentacao tecnica publica da API com contrato detalhado de webhook, preparei o Entregoo para integracao via hub/parceiro, com assinatura opcional e campos operacionais suficientes para homologacao.
