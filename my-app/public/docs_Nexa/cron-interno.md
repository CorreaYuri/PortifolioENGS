# Cron Interno da Nexa

Este guia documenta os endpoints internos usados para automacao operacional, health-check e manutencao.

## Autenticacao

Todos os endpoints internos protegidos aceitam um destes formatos:

- header `x-cron-token`
- header `Authorization: Bearer <token>`

Se o token estiver ausente ou incorreto, a resposta esperada e `401`.
Se a variavel de ambiente do token nao estiver configurada, a resposta esperada e `500`.

## Endpoints

### 1. Health-check dos conectores

Rota:
- `GET /api/internal/connectors-health`
- `POST /api/internal/connectors-health`

Token esperado:
- `CONNECTOR_HEALTH_CRON_TOKEN`

Objetivo:
- validar disponibilidade/configuracao dos conectores externos
- registrar logs operacionais de health-check
- sincronizar notificacoes de incidente dos conectores

Exemplo:

```bash
curl -X POST "http://localhost:3000/api/internal/connectors-health" ^
  -H "x-cron-token: nexa-local-connectors-health-token"
```

### 2. Readiness de banco

Rota:
- `GET /api/internal/db-readiness`
- `POST /api/internal/db-readiness`

Token esperado:
- `DB_READINESS_CRON_TOKEN`

Objetivo:
- gerar retrato de prontidao do banco
- registrar pontuacao e status operacional

Exemplo:

```bash
curl -X GET "http://localhost:3000/api/internal/db-readiness" ^
  -H "x-cron-token: nexa-local-db-readiness-token"
```

### 3. Relatorio executivo de auditoria

Rota:
- `GET /api/internal/executive-audit-report`
- `POST /api/internal/executive-audit-report`

Token esperado:
- `EXEC_AUDIT_REPORT_TOKEN`

Objetivo:
- consolidar evidencias operacionais e executivas
- apoiar acompanhamento de go-live e governanca

Exemplo:

```bash
curl -X POST "http://localhost:3000/api/internal/executive-audit-report" ^
  -H "x-cron-token: seu-token-executive-audit"
```

### 4. Saude de observabilidade

Rota:
- `GET /api/internal/observability-health`

Token esperado:
- `OBSERVABILITY_HEALTH_TOKEN`

Objetivo:
- consolidar volume de chamadas internas
- medir erros recentes e incidentes de runtime
- expor configuracao observavel do ambiente

Exemplo:

```bash
curl -X GET "http://localhost:3000/api/internal/observability-health" ^
  -H "x-cron-token: seu-token-observability-health"
```

### 5. Runner de automacoes operacionais

Rota:
- `GET /api/internal/ops-automation-runner`
- `POST /api/internal/ops-automation-runner`

Token esperado:
- `OPS_AUTOMATION_RUNNER_TOKEN`

Objetivo:
- executar automacoes vencidas
- permitir execucao forcada de rotinas especificas

Modo forcado:
- usar query string `?force=connectors_health,db_readiness`

Chaves aceitas atualmente:
- `connectors_health`
- `client_support_1400cr_sync`
- `fiscal_nfe_sync`
- `banking_receipts_sync`
- `signature_reminders`
- `db_readiness`
- `observability_snapshot`
- `storage_retention_dry_run`

Exemplo:

```bash
curl -X POST "http://localhost:3000/api/internal/ops-automation-runner?force=connectors_health,db_readiness" ^
  -H "x-cron-token: nexa-local-ops-runner-token"
```

### 6. Lembretes de assinatura

Rota:
- `GET /api/internal/signature-reminders`
- `POST /api/internal/signature-reminders`

Token esperado:
- `SIGNATURE_REMINDERS_CRON_TOKEN`

Objetivo:
- gerar/atualizar lembretes de assinatura de RH e projetos

Exemplo:

```bash
curl -X POST "http://localhost:3000/api/internal/signature-reminders" ^
  -H "x-cron-token: nexa-local-signature-reminders-token"
```

### 7. Retencao de storage

Rota:
- `GET /api/internal/storage-retention`
- `POST /api/internal/storage-retention`

Token esperado:
- `STORAGE_RETENTION_CRON_TOKEN`

Objetivo:
- simular ou executar limpeza de arquivos elegiveis por retencao

Query params:
- `dryRun=true|false`
- `retentionDays=<numero>`

Comportamento padrao:
- sem `dryRun=false`, a rota executa em modo simulacao

Exemplos:

Simulacao:

```bash
curl -X GET "http://localhost:3000/api/internal/storage-retention?dryRun=true" ^
  -H "x-cron-token: nexa-local-storage-retention-token"
```

Limpeza real:

```bash
curl -X POST "http://localhost:3000/api/internal/storage-retention?dryRun=false&retentionDays=180" ^
  -H "x-cron-token: nexa-local-storage-retention-token"
```

## Sequencia recomendada de validacao manual

Para validar um ambiente novo:

1. `GET /api/internal/db-readiness`
2. `GET /api/internal/observability-health`
3. `POST /api/internal/connectors-health`
4. `POST /api/internal/signature-reminders`
5. `POST /api/internal/ops-automation-runner?force=connectors_health,db_readiness,observability_snapshot`
6. `GET /api/internal/storage-retention?dryRun=true`

## Respostas esperadas

### Sucesso

- status `200`
- corpo com `ok: true`

### Falha de token

- status `401`
- corpo com `ok: false`
- mensagem semelhante a `Token invalido.`

### Falha de configuracao

- status `500`
- corpo com `ok: false`
- mensagem indicando variavel/token ausente

## Variaveis relacionadas

- `CONNECTOR_HEALTH_CRON_TOKEN`
- `DB_READINESS_CRON_TOKEN`
- `EXEC_AUDIT_REPORT_TOKEN`
- `OBSERVABILITY_HEALTH_TOKEN`
- `OPS_AUTOMATION_RUNNER_TOKEN`
- `SIGNATURE_REMINDERS_CRON_TOKEN`
- `STORAGE_RETENTION_CRON_TOKEN`

## Dicas operacionais

- Em ambiente local, use os tokens definidos no `.env`.
- Em homolog e producao, sempre troque todos os tokens por segredos fortes.
- Prefira `POST` para disparos manuais de rotinas.
- Use `dryRun=true` antes de qualquer limpeza real.
- Se uma automacao falhar, revisar os logs em `integrationLog` e no painel de configuracoes operacionais.
