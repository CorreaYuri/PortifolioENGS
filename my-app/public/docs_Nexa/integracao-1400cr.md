# Integracao 1400CR

## Objetivo

Integrar o modulo de atendimento do ERP Nexa com o produto `1400CR`, para que os chamados de cada cliente aparecam na ficha:

- `/app/clientes/[id]/atendimento`
- futuramente no portal do cliente

## Estrutura implementada

Arquivos principais:

- `src/lib/integrations/1400cr.ts`
- `src/lib/integrations/1400cr-api.ts`
- `src/app/app/clientes/[id]/atendimento/page.tsx`
- `src/app/app/clientes/client-support-sync-form.tsx`
- `src/app/app/clientes/actions.ts`

Comportamento atual:

- a sincronizacao manual faz `upsert` do cliente no `1400CRM` antes de listar chamados
- a tela de atendimento consulta os chamados do cliente ja vinculado no `1400CRM`
- a abertura de chamado acontece direto na Nexa usando `POST /api/integrations/tickets`
- a abertura de chamado agora usa chave de idempotencia para evitar duplicidade em retentativas
- a acao de sincronizacao registra log em `IntegrationLog`
- a timeline do cliente recebe eventos de sincronizacao
- o historico e a tela de atendimento carregam detalhe sob demanda do ticket via `GET /api/integrations/tickets/{ticketId}`
- o painel de integracoes mostra observabilidade dedicada do circuito `Nexa -> 1400CRM -> webhook -> Nexa`
- se a integracao nao estiver configurada, a tela nao quebra e mostra orientacao

## Variaveis de ambiente

Adicionar no ambiente da aplicacao:

```env
NEXA_APP_BASE_URL=https://nexa.exemplo.com
NEXA_1400CR_BASE_URL=https://seu-1400cr.exemplo.com
NEXA_1400CR_API_TOKEN=seu-token-aqui
NEXA_1400CR_EXTERNAL_SYSTEM=NEXA
NEXA_1400CR_HEALTH_ENDPOINT=/api/integrations/health
NEXA_1400CR_CUSTOMER_UPSERT_ENDPOINT=/api/integrations/customers/upsert
NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT=/api/integrations/customers/lookup
NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE=/api/integrations/customers/{clientId}/tickets
NEXA_1400CR_TICKET_CREATE_ENDPOINT=/api/integrations/tickets
NEXA_1400CR_TICKET_DETAIL_TEMPLATE=/api/integrations/tickets/{ticketId}
NEXA_1400CR_WEBHOOK_SECRET=
```

### Significado

- `NEXA_1400CR_BASE_URL`: URL base do 1400CR
- `NEXA_1400CR_API_TOKEN`: token Bearer usado na autenticacao
- `NEXA_APP_BASE_URL`: URL publica da Nexa para enviar `externalUrl` do cliente
- `NEXA_1400CR_EXTERNAL_SYSTEM`: nome do sistema externo, hoje `NEXA`
- `NEXA_1400CR_HEALTH_ENDPOINT`: rota dedicada para health autenticado do 1400CR
- `NEXA_1400CR_CUSTOMER_UPSERT_ENDPOINT`: rota de criacao/sincronizacao de cliente
- `NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT`: rota de lookup de cliente
- `NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE`: rota de listagem de chamados por cliente
- `NEXA_1400CR_TICKET_CREATE_ENDPOINT`: rota de abertura de chamado
- `NEXA_1400CR_TICKET_DETAIL_TEMPLATE`: rota de detalhe de chamado
- `NEXA_1400CR_WEBHOOK_SECRET`: segredo opcional para validar webhook assinado

O codigo hoje usa como identificador do cliente, nesta ordem:

1. `document`
2. `email`
3. `tradeName`
4. `companyName`

Se o `1400CR` trabalhar com outro identificador, o ideal e no futuro criar um campo proprio no cliente, por exemplo `supportExternalId`.

## Contrato HTTP implementado

Fluxos implementados:

1. `POST /api/integrations/customers/upsert`
2. `GET /api/integrations/customers/lookup?externalSystem=NEXA&externalId={clientId}`
3. `GET /api/integrations/customers/{clientId}/tickets?includeClosed=true&page=1&pageSize=50`
4. `POST /api/integrations/tickets`
5. `GET /api/integrations/tickets/{ticketId}`

## Mapeamento de campos

Campos que o integrador tenta ler dos chamados:

- `ticketId` ou `id` ou `chamadoId`
- `protocol` ou `number` ou `codigo`
- `title` ou `subject` ou `assunto`
- `status` ou `situacao`
- `priority` ou `prioridade`
- `createdAt` ou `dataAbertura`
- `updatedAt` ou `dataAtualizacao`
- `url` ou `link`
- `descriptionSummary`
- `closedAt`
- `lastMovementAt`
- `slaStatus`
- `inbox.code`
- `inbox.name`
- `owner.name`

Se o `1400CR` usar nomes diferentes, ajuste a funcao `normalizeTicket` em `src/lib/integrations/1400cr.ts`.

## Como ativar

1. Configurar as variaveis de ambiente
2. Reiniciar o `npm run dev`
3. Abrir `/app/clientes/[id]/atendimento`
4. Clicar em `Sincronizar cliente e chamados no 1400CRM`
5. Verificar:
   - cliente sincronizado no `1400CRM`
   - chamados carregados na tela
   - log criado em `IntegrationLog`
   - evento criado na timeline do cliente
6. Testar a abertura de chamado com `titulo`, `prioridade`, `inboxCode` e `descricao`

## Fluxo homologado

Fluxo validado ponta a ponta em homologacao local:

1. cliente sincronizado da Nexa localizado no `1400CRM`
2. abertura de chamado pela Nexa com inbox sugerida
3. webhook `ticket.created` recebido pela Nexa
4. snapshot de suporte atualizado automaticamente
5. abertura manual no `1400CRM` para cliente `[Nexa]`
6. agregacao do chamado na ficha do cliente na Nexa

## Comandos de validacao recomendados

```bash
npm run test:behavior
npm run test:smoke
npx tsc --noEmit
npx eslint src/app/app/clientes src/app/api/integrations/1400crm src/lib/integrations
```

## Logs e diagnostico

Cada sincronizacao gera um registro em `IntegrationLog` com:

- `integrationName = "1400CR"`
- `entityType = "CLIENT_SUPPORT_SYNC"`
- `entityId = clientId`
- `payload` com endpoint e identificador usado
- `response` com resposta bruta ou erro

Isso ajuda a diagnosticar:

- token invalido
- endpoint errado
- cliente sem identificador
- retorno inesperado da API

## Alertas operacionais

O modulo agora identifica risco de fila parada a partir da ultima sincronizacao executada manualmente.

Regras atuais:

1. chamado aberto sem atualizacao em `D+3` gera alerta `warning`
2. chamado aberto em `D+5` gera alerta `critical`
3. chamado com prioridade alta/critica em `D+1` sem atualizacao tambem sobe para `critical`

Notificacoes geradas:

- `event:client-support-stale:{clientId}`
- `event:client-support-sla:{clientId}`

Onde aparecem:

- `/app/pendencias`
- filtro `Clientes / Suporte 1400CR`
- pagina `/app/clientes/[id]/atendimento`

## Go-live rapido

Antes de liberar em producao:

1. validar `NEXA_1400CR_BASE_URL`, `NEXA_1400CR_API_TOKEN` e `NEXA_1400CR_WEBHOOK_SECRET`
2. rodar health-check do conector em `/app/configuracoes/integracoes`
3. executar um teste real controlado com um cliente homologado
4. confirmar logs `CLIENT_SUPPORT_TICKET_CREATE`, `CLIENT_SUPPORT_WEBHOOK` e `CLIENT_SUPPORT_SYNC`
5. anexar evidencias no checklist operacional de go-live

Referencia operacional:

- `docs/release-runbook-integracao-1400cr.md`
