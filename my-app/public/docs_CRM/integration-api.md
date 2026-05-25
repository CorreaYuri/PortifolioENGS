# API de Integracao do 1400CRM

Versao: 1.0  
Data: 2026-04-02  
Status: Disponivel para integracoes externas

## 1. Objetivo

Este documento descreve a API padrao de integracao do 1400CRM para sistemas externos.

A API foi desenhada para permitir que ERPs, CRMs, portais, aplicativos e outros sistemas:
- sincronizem clientes com o 1400CRM
- abram chamados no 1400CRM
- consultem chamados por cliente
- consultem detalhes de um chamado especifico
- recebam notificacoes automaticas de alteracao por webhook

Este documento e generico e serve como base para qualquer parceiro integrador. Documentos especificos por parceiro podem complementar este contrato com exemplos e credenciais particulares.

## 2. Modelo de Integracao

O 1400CRM opera com o seguinte modelo:
- o sistema externo e a fonte mestra do cadastro de clientes
- o 1400CRM e a fonte mestra dos chamados de atendimento
- o vinculo entre os sistemas acontece por identidade externa do cliente

Cada integrador deve utilizar:
- `externalSystem`: identificador do sistema de origem
- `externalId`: identificador do cliente nesse sistema
- `syncIdentifier`: identificador opcional consolidado de sincronizacao

Exemplos de `externalSystem`:
- `NEXA`
- `SAP`
- `TOTVS`
- `OMNIE`
- `PORTAL`
- `APP`

## 3. Autenticacao

A autenticacao e feita por `Bearer Token`.

Headers obrigatorios:

```http
Authorization: Bearer {TOKEN_DA_INTEGRACAO}
Content-Type: application/json
Accept: application/json
```

No 1400CRM, cada integrador possui uma credencial configurada em ambiente.

Exemplo:

```env
INTEGRATION_CREDENTIALS_JSON='[
  {"tenantSlug":"acme","name":"Nexa","externalSystem":"NEXA","token":"token-nexa","webhookUrl":"https://nexa.exemplo.com/webhooks/1400"},
  {"tenantSlug":"acme","name":"SAP","externalSystem":"SAP","token":"token-sap","webhookUrl":"https://sap.exemplo.com/api/webhooks/1400"}
]'
```

Campos aceitos por credencial:

```json
{
  "tenantSlug": "acme",
  "name": "Nome do integrador",
  "externalSystem": "CODIGO_DO_SISTEMA",
  "token": "token-seguro",
  "webhookUrl": "https://integrador.exemplo.com/webhooks/1400",
  "webhookSecret": "opcional"
}
```

## 4. Base URL

```text
https://seu-dominio.com/api/integrations
```

## 5. Endpoints Disponiveis

### 5.1 Criar ou sincronizar cliente

```http
POST /api/integrations/customers/upsert
```

Objetivo:
- criar um cliente no 1400CRM quando ele ainda nao existir
- localizar e atualizar um cliente ja existente

Payload base:

```json
{
  "externalSystem": "SAP",
  "externalId": "cli_123",
  "syncIdentifier": "sap:cli_123",
  "syncEnabled": true,
  "name": "Empresa Exemplo Ltda",
  "tradeName": "Empresa Exemplo",
  "document": "12345678000199",
  "email": "contato@empresa.com.br",
  "phone": "11999999999",
  "externalUrl": "https://sap.exemplo.com/clientes/123"
}
```

Campos obrigatorios:
- `externalSystem`
- `externalId`
- `name`

Campos opcionais:
- `syncIdentifier`
- `syncEnabled`
- `tradeName`
- `document`
- `email`
- `phone`
- `externalUrl`
- `metadata`

Regras de localizacao do cliente:
- `externalSystem + externalId`
- `syncIdentifier`
- `document`
- `email`

Response de sucesso:
- `200` cliente localizado e atualizado
- `201` cliente criado

```json
{
  "data": {
    "clientId": "clxxxx",
    "identifier": "sap:cli_123",
    "externalId": "cli_123",
    "externalSystem": "SAP",
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

### 5.2 Localizar cliente

```http
GET /api/integrations/customers/lookup
```

Query params aceitos:
- `externalSystem`
- `externalId`
- `document`
- `email`
- `identifier`

Exemplo:

```http
GET /api/integrations/customers/lookup?externalSystem=SAP&externalId=cli_123
```

### 5.3 Consultar cliente por id

```http
GET /api/integrations/customers/{clientId}
```

### 5.4 Abrir chamado

```http
POST /api/integrations/tickets
```

Payload base:

```json
{
  "clientId": "clxxxx",
  "title": "Nao consigo emitir boleto",
  "description": "Cliente informou erro ao tentar emitir o boleto no portal financeiro.",
  "priority": "HIGH",
  "origin": "SAP",
  "inboxCode": "FINANCEIRO",
  "metadata": {
    "requestId": "req_123"
  }
}
```

Campos obrigatorios:
- `clientId`
- `title`
- `description`
- `priority`
- `origin`
- `inboxId` ou `inboxCode`

Prioridades aceitas:
- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

Response de sucesso:
- `201`

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
    "externalSource": "SAP"
  }
}
```

### 5.5 Listar chamados por cliente

```http
GET /api/integrations/customers/{clientId}/tickets
```

Query params aceitos:
- `status`
- `priority`
- `page`
- `pageSize`
- `updatedAfter`
- `includeClosed`

### 5.6 Consultar detalhes de um chamado

```http
GET /api/integrations/tickets/{ticketId}
```

## 6. Campos Retornados no Chamado

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

## 7. Status e SLA

Status possiveis:
- `NEW`
- `QUEUED`
- `IN_PROGRESS`
- `WAITING_RETURN`
- `WAITING_OTHER_TEAM`
- `CLOSED`
- `CANCELED`

Campo de SLA:
- `slaStatus`

Valores possiveis:
- `ON_TIME`
- `AT_RISK`
- `OVERDUE`

## 8. Webhooks

Quando `webhookUrl` estiver configurado para a credencial do integrador, o 1400CRM envia `POST` automatico para o sistema externo nos eventos:
- `ticket.created`
- `ticket.updated`
- `ticket.closed`

Headers enviados:

```http
Content-Type: application/json
X-Webhook-Event: ticket.updated
X-Webhook-Signature: {sha256_hex_opcional}
```

Payload exemplo:

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
    "externalSource": "SAP"
  }
}
```

## 9. Padrao de Erros

Formato:

```json
{
  "error": {
    "code": "CUSTOMER_NOT_FOUND",
    "message": "Cliente nao encontrado."
  }
}
```

Codigos possiveis:
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

HTTP status esperados:
- `200`
- `201`
- `400`
- `401`
- `403`
- `404`
- `409`
- `422`

## 10. Boas Praticas para Integradores

- cada parceiro deve usar um `externalSystem` proprio e estavel
- o parceiro deve salvar o `clientId` retornado pelo 1400CRM
- a localizacao de cliente nao deve depender apenas de nome
- webhook deve ser usado como complemento ao polling, nao como dependencia unica
- `metadata` pode ser usada para correlacionar ids e eventos internos do parceiro

## 11. Evolucao Recomendada da Plataforma

Melhorias futuras recomendadas para maturidade da API:
- versionamento da API, por exemplo `/api/integrations/v1`
- `Idempotency-Key` para evitar duplicidade de abertura
- logs de integracao por credencial
- historico e retentativa de webhook
- rate limit por token
- endpoint de saude da integracao

## 12. Documentos Relacionados

Documento generico da API:
- [integration-api.md](/j:/Projetos/1400Graus_CRM/docs/integration-api.md)

Checklist de onboarding de parceiros:
- [partner-onboarding-checklist.md](/j:/Projetos/1400Graus_CRM/docs/partner-onboarding-checklist.md)

Documento especifico da Nexa:
- [nexa-integration-spec.md](/j:/Projetos/1400Graus_CRM/docs/nexa-integration-spec.md)
