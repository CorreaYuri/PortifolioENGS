# Documento Oficial de Integracao

## Integracao Nexa x 1400CRM

Versao: 1.0  
Data: 2026-04-02  
Status: Aprovado para integracao

## 1. Objetivo

Este documento define o contrato especifico de integracao entre a Nexa e o 1400CRM.

A Nexa sera a fonte principal dos dados de clientes. O 1400CRM sera a fonte principal dos chamados de atendimento.

A integracao permite:
- criar ou localizar clientes da Nexa no 1400CRM
- abrir chamados no 1400CRM a partir da Nexa
- consultar chamados vinculados a um cliente
- retornar status, prioridade, protocolo, datas e link do chamado para exibicao na Nexa
- receber atualizacoes automaticas de chamados por webhook

Este documento complementa a API generica do 1400CRM descrita em [integration-api.md](/j:/Projetos/1400Graus_CRM/docs/integration-api.md) e aplica exemplos e convencoes especificas da Nexa.

## 2. Responsabilidades

### Nexa
- manter o cadastro mestre do cliente
- enviar os identificadores externos do cliente para sincronizacao
- armazenar o `clientId`, `identifier` e URLs retornados pelo 1400CRM
- consumir os endpoints de consulta de chamados
- processar os webhooks enviados pelo 1400CRM, quando habilitados

### 1400CRM
- localizar ou criar clientes a partir dos dados enviados pela Nexa
- persistir os identificadores externos do cliente
- criar e atualizar chamados de atendimento
- disponibilizar consulta de chamados por cliente
- devolver payload padronizado para exibicao na Nexa
- emitir webhooks de alteracao de chamado

## 3. Ambiente e Base URL

Base URL da API:

```text
https://seu-dominio.com/api/integrations
```

A URL de producao sera informada pela equipe do 1400CRM no momento da homologacao.

## 4. Autenticacao

A autenticacao e feita por `Bearer Token`.

Headers obrigatorios em todas as requisicoes:

```http
Authorization: Bearer {TOKEN_DA_INTEGRACAO}
Content-Type: application/json
Accept: application/json
```

Exemplo de configuracao no 1400CRM:

```env
INTEGRATION_CREDENTIALS_JSON='[{"tenantSlug":"demo-1400","name":"Nexa","externalSystem":"NEXA","token":"troque-por-token-forte","webhookUrl":"https://nexa.exemplo.com/webhooks/1400","webhookSecret":"opcional"}]'
```

Campos aceitos por credencial:

```json
{
  "tenantSlug": "demo-1400",
  "name": "Nexa",
  "externalSystem": "NEXA",
  "token": "troque-por-token-forte",
  "webhookUrl": "https://nexa.exemplo.com/webhooks/1400",
  "webhookSecret": "opcional"
}
```

## 5. Fluxo de Integracao

1. A Nexa envia os dados do cliente para criacao ou localizacao no 1400CRM.
2. O 1400CRM devolve o `clientId`, `identifier` e URLs do cliente.
3. A Nexa salva esses identificadores em seu cadastro.
4. A Nexa abre chamados usando o `clientId` retornado pelo 1400CRM.
5. A Nexa consulta os chamados por cliente ou por identificador de ticket.
6. O 1400CRM envia webhooks de atualizacao de chamado para a Nexa, quando configurado.

## 6. Cadastro e Sincronizacao de Cliente

### Endpoint

```http
POST /api/integrations/customers/upsert
```

### Objetivo

Criar um cliente novo no 1400CRM ou localizar e atualizar um cliente existente.

### Regras de localizacao

O 1400CRM tenta localizar o cliente nesta ordem:
- `externalSystem + externalId`
- `syncIdentifier`
- `document`
- `email`

Se houver ambiguidade entre clientes elegiveis, a API retorna conflito tratavel.

### Request

```json
{
  "externalSystem": "NEXA",
  "externalId": "cli_987654",
  "syncIdentifier": "nexa:cli_987654",
  "syncEnabled": true,
  "name": "Empresa Exemplo Ltda",
  "tradeName": "Empresa Exemplo",
  "document": "12345678000199",
  "email": "contato@empresa.com.br",
  "phone": "11999999999",
  "externalUrl": "https://nexa.exemplo.com/clientes/987654"
}
```

### Campos obrigatorios

- `externalSystem`
- `externalId`
- `name`

### Campos opcionais

- `syncIdentifier`
- `syncEnabled`
- `tradeName`
- `document`
- `email`
- `phone`
- `externalUrl`
- `metadata`

### Response de sucesso

Status `200` quando localizar e atualizar.  
Status `201` quando criar novo cliente.

```json
{
  "data": {
    "clientId": "clxxxx",
    "identifier": "nexa:cli_987654",
    "externalId": "cli_987654",
    "externalSystem": "NEXA",
    "name": "Empresa Exemplo Ltda",
    "tradeName": "Empresa Exemplo",
    "document": "12345678000199",
    "email": "contato@empresa.com.br",
    "phone": "11999999999",
    "url": "https://seu-dominio.com/clientes/clxxxx",
    "ticketListUrl": "https://seu-dominio.com/clientes/clxxxx",
    "updatedAt": "2026-04-02T18:00:00.000Z"
  }
}
```

## 7. Consulta de Cliente

### Localizar cliente

```http
GET /api/integrations/customers/lookup
```

### Query params aceitos

- `externalSystem`
- `externalId`
- `document`
- `email`
- `identifier`

### Exemplo

```http
GET /api/integrations/customers/lookup?externalSystem=NEXA&externalId=cli_987654
```

### Consultar cliente por id

```http
GET /api/integrations/customers/{clientId}
```

## 8. Abertura de Chamado

### Endpoint

```http
POST /api/integrations/tickets
```

### Objetivo

Abrir chamado no 1400CRM a partir de um cliente previamente sincronizado.

### Request

```json
{
  "clientId": "clxxxx",
  "title": "Nao consigo emitir boleto",
  "description": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
  "priority": "HIGH",
  "origin": "NEXA",
  "inboxCode": "FINANCEIRO",
  "metadata": {
    "nexaRequestId": "req_123"
  }
}
```

### Campos obrigatorios

- `clientId`
- `title`
- `description`
- `priority`
- `origin`
- `inboxId` ou `inboxCode`

### Prioridades aceitas

- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

### Response de sucesso

Status `201`.

```json
{
  "data": {
    "ticketId": "cmxxxx",
    "protocol": "CH-2048",
    "status": "QUEUED",
    "priority": "HIGH",
    "title": "Nao consigo emitir boleto",
    "description": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
    "descriptionSummary": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
    "createdAt": "2026-04-02T18:00:00.000Z",
    "updatedAt": "2026-04-02T18:00:00.000Z",
    "closedAt": null,
    "lastMovementAt": "2026-04-02T18:00:00.000Z",
    "slaStatus": "ON_TIME",
    "url": "https://seu-dominio.com/tickets/CH-2048",
    "clientId": "clxxxx",
    "inbox": {
      "id": "cmInbox",
      "code": "FINANCEIRO",
      "name": "Financeiro"
    },
    "owner": null,
    "origin": "API",
    "externalSource": "NEXA"
  }
}
```

## 9. Consulta e Listagem de Chamados

### Listar chamados por cliente

```http
GET /api/integrations/customers/{clientId}/tickets
```

### Query params aceitos

- `status`
- `priority`
- `page`
- `pageSize`
- `updatedAfter`
- `includeClosed`

### Exemplo

```http
GET /api/integrations/customers/clxxxx/tickets?includeClosed=true&page=1&pageSize=20
```

### Response

```json
{
  "data": [
    {
      "ticketId": "cmxxxx",
      "protocol": "CH-2048",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "title": "Nao consigo emitir boleto",
      "description": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
      "descriptionSummary": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
      "createdAt": "2026-04-02T18:00:00.000Z",
      "updatedAt": "2026-04-02T18:05:00.000Z",
      "closedAt": null,
      "lastMovementAt": "2026-04-02T18:05:00.000Z",
      "slaStatus": "AT_RISK",
      "url": "https://seu-dominio.com/tickets/CH-2048",
      "clientId": "clxxxx",
      "inbox": {
        "id": "cmInbox",
        "code": "FINANCEIRO",
        "name": "Financeiro"
      },
      "owner": {
        "id": "cmUser",
        "name": "Camila Souza"
      },
      "origin": "API",
      "externalSource": "NEXA"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Consultar detalhes de um chamado

```http
GET /api/integrations/tickets/{ticketId}
```

## 10. Campos Retornados nos Chamados

- `ticketId`
- `protocol`
- `status`
- `priority`
- `title`
- `description`
- `descriptionSummary`
- `createdAt`
- `updatedAt`
- `closedAt`
- `lastMovementAt`
- `slaStatus`
- `url`
- `clientId`
- `inbox`
- `owner`
- `origin`
- `externalSource`

## 11. Status e SLA

### Status possiveis

- `NEW`
- `QUEUED`
- `IN_PROGRESS`
- `WAITING_RETURN`
- `WAITING_OTHER_TEAM`
- `CLOSED`
- `CANCELED`

### Campo de SLA

Campo retornado: `slaStatus`

Valores possiveis:
- `ON_TIME`
- `AT_RISK`
- `OVERDUE`

## 12. Health de Integracao`r`n`r`n### Endpoint`r`n`r`n```http`r`nGET /api/integrations/health`r`n``` `r`n`r`n### Objetivo`r`n`r`nValidar bearer token, tenant resolvido e presenca de configuracao de webhook.`r`n`r`n### Response de sucesso`r`n`r`n```json`r`n{`r`n  "data": {`r`n    "ok": true,`r`n    "tenantSlug": "demo-1400",`r`n    "integrationName": "Nexa",`r`n    "externalSystem": "NEXA",`r`n    "webhookConfigured": true,`r`n    "checkedAt": "2026-04-02T18:00:00.000Z"`r`n  }`r`n}`r`n``` `r`n`r`n## 13. Webhooks

Quando `webhookUrl` estiver configurado na credencial da integracao, o 1400CRM envia `POST` automatico para a Nexa nos eventos:
- `ticket.created`
- `ticket.updated`
- `ticket.closed`

### Headers enviados

```http
Content-Type: application/json
X-Webhook-Event: ticket.updated
X-Webhook-Signature: {sha256_hex_opcional}
```

### Payload exemplo

```json
{
  "event": "ticket.updated",
  "occurredAt": "2026-04-02T18:05:00.000Z",
  "data": {
    "ticketId": "cmxxxx",
    "protocol": "CH-2048",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "title": "Nao consigo emitir boleto",
    "description": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
    "descriptionSummary": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
    "createdAt": "2026-04-02T18:00:00.000Z",
    "updatedAt": "2026-04-02T18:05:00.000Z",
    "closedAt": null,
    "lastMovementAt": "2026-04-02T18:05:00.000Z",
    "slaStatus": "AT_RISK",
    "url": "https://seu-dominio.com/tickets/CH-2048",
    "clientId": "clxxxx",
    "inbox": {
      "id": "cmInbox",
      "code": "FINANCEIRO",
      "name": "Financeiro"
    },
    "owner": {
      "id": "cmUser",
      "name": "Camila Souza"
    },
    "origin": "API",
    "externalSource": "NEXA"
  }
}
```

## 14. Padrao de Erros

### Formato

```json
{
  "error": {
    "code": "CUSTOMER_NOT_FOUND",
    "message": "Cliente nao encontrado."
  }
}
```

### Codigos possiveis

- `INVALID_INTEGRATION_TOKEN`
- `INTEGRATION_TENANT_UNAVAILABLE`
- `INVALID_JSON`
- `INVALID_PAYLOAD`
- `CUSTOMER_NOT_FOUND`
- `CUSTOMER_DUPLICATE`
- `INBOX_NOT_FOUND`
- `TICKET_NOT_FOUND`
- `API_ORIGIN_DISABLED`
- `NO_ACTIVE_OPERATOR`

### HTTP status esperados

- `200` consulta ou atualizacao realizada com sucesso
- `201` recurso criado com sucesso
- `400` JSON invalido ou payload invalido
- `401` token ausente ou invalido
- `403` tenant da integracao indisponivel
- `404` recurso nao encontrado
- `409` duplicidade tratavel
- `422` regra de negocio impeditiva

## 15. Checklist de Homologacao

### Checklist 1400CRM

- configurar `APP_URL` corretamente para o dominio real do 1400CRM
- configurar `INTEGRATION_CREDENTIALS_JSON` com token da Nexa
- configurar `webhookUrl` e `webhookSecret`, se aplicavel`r`n- validar `GET /api/integrations/health` antes de abrir chamados
- validar tenant ativo e origem `API` habilitada
- garantir pelo menos uma inbox ativa para abertura de chamados
- validar a abertura manual em `/tickets/novo` para cliente marcado como `[Nexa]`
- validar busca remota de cliente, inbox sugerida e historico recente no novo chamado

### Checklist Nexa

- implementar `POST /customers/upsert`
- salvar `clientId`, `identifier`, `url` e `ticketListUrl`
- implementar `POST /tickets`
- implementar `GET /customers/{clientId}/tickets`
- implementar `GET /tickets/{ticketId}`
- implementar endpoint receptor de webhook, se aplicavel
- validar reconciliacao de status e SLA no front da Nexa

### Testes minimos sugeridos

1. enviar cliente novo e validar retorno `201`
2. reenviar o mesmo cliente e validar retorno `200`
3. abrir chamado com `clientId` valido e validar protocolo
4. listar chamados do cliente e validar paginação
5. consultar detalhe do chamado e validar campos de status
6. atualizar o chamado no 1400CRM e validar recebimento do webhook na Nexa
7. testar erros de token invalido, cliente inexistente e inbox inexistente

### Smoke tecnico recomendado

No 1400CRM:

```bash
npx tsc --noEmit
npx eslint src/modules/customers/server/customer-service.ts src/modules/tickets/components/create-ticket-form.tsx src/app/api/customers/search/route.ts src/app/api/customers/[customerId]/ticket-context/route.ts
npm run test:integration-smoke
```

## 16. Contato Tecnico

Equipe responsavel pelo 1400CRM: preencher no handoff final.  
Equipe responsavel pela Nexa: preencher no handoff final.

## 17. Referencia Tecnica Interna

Implementacao e contrato tecnico no projeto:
- [integration-api.md](/j:/Projetos/1400Graus_CRM/docs/integration-api.md)
- [nexa-integration-spec.md](/j:/Projetos/1400Graus_CRM/docs/nexa-integration-spec.md)
- [release-runbook-integracao-1400cr.md](/j:/Projetos/Nexa/my-app/docs/release-runbook-integracao-1400cr.md)
- [integration-service.ts](/j:/Projetos/1400Graus_CRM/src/modules/integrations/server/integration-service.ts)
- [integration.ts](/j:/Projetos/1400Graus_CRM/src/server/auth/integration.ts)
- [integration-webhooks.ts](/j:/Projetos/1400Graus_CRM/src/modules/integrations/server/integration-webhooks.ts)




