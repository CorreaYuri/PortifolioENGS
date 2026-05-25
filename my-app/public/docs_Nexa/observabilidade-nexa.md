# Observabilidade Nexa

## Objetivo

Padronizar visibilidade operacional do sistema com:

- rastreio de requisicoes por `x-request-id`
- medicao de latencia por `x-response-time-ms`
- logs estruturados por evento
- monitoramento de queries lentas no Prisma
- endpoint interno de saude de observabilidade
- rate limit para endpoints internos
- rotina de retencao de storage com simulacao e limpeza real

## O que foi ativado

1. Middleware adiciona `x-request-id` e `x-response-time-ms` em `/app`, `/portal` e `/api`.
2. Endpoints API internos agora emitem logs de execucao com status e duracao.
3. Prisma registra alerta de query lenta quando excede limite configurado.
4. Endpoint `/api/internal/observability-health` consolida sinais das ultimas 1h.
5. Middleware aplica rate limit em `/api/internal/*` com resposta `429` e `retry-after`.
6. Endpoint `/api/internal/storage-retention` executa limpeza de arquivos nao referenciados.

## Variaveis de ambiente

- `LOG_LEVEL`:
  - `debug`, `info`, `warn`, `error`
  - padrao: `info`
- `OBS_ENABLE_PRISMA_QUERY_EVENTS`:
  - `true` ou `false`
  - padrao: `true`
- `OBS_SLOW_QUERY_MS`:
  - limiar de query lenta em milissegundos
  - padrao: `750`
- `OBSERVABILITY_HEALTH_TOKEN`:
  - token obrigatorio para consultar o endpoint interno de observabilidade
- `STORAGE_RETENTION_CRON_TOKEN`:
  - token obrigatorio para acionar limpeza de storage via endpoint interno
- `OPS_AUTOMATION_RUNNER_TOKEN`:
  - token obrigatorio para o runner de automacoes agendadas
- `INTERNAL_API_RATE_LIMIT_MAX_REQUESTS`:
  - limite de requisicoes por janela em `/api/internal/*`
  - padrao: `120`
- `INTERNAL_API_RATE_LIMIT_WINDOW_SECONDS`:
  - tamanho da janela de rate limit
  - padrao: `60`

## Endpoint interno

- `GET /api/internal/observability-health`
  - autenticacao: `Authorization: Bearer <OBSERVABILITY_HEALTH_TOKEN>` ou `x-cron-token`
  - retorno: volume de chamadas API, taxa de erro, incidentes runtime e configuracao ativa
- `GET/POST /api/internal/storage-retention?dryRun=true&retentionDays=180`
  - autenticacao: `Authorization: Bearer <STORAGE_RETENTION_CRON_TOKEN>` ou `x-cron-token`
  - por padrao executa em simulacao (`dryRun=true`)
  - retorno: arquivos elegiveis, removidos e volume de bytes
- `GET/POST /api/internal/ops-automation-runner`
  - autenticacao: `Authorization: Bearer <OPS_AUTOMATION_RUNNER_TOKEN>` ou `x-cron-token`
  - executa as automacoes vencidas pelo agendamento salvo no painel
  - opcional: `?force=connectors_health,db_readiness` para execucao forcada

## Checklist operacional

1. validar se `x-request-id` esta presente nas respostas.
2. acompanhar eventos `http.request.completed` e `http.request.failed`.
3. monitorar alertas `prisma.slow_query`.
4. verificar periodicamente `/api/internal/observability-health`.
5. executar retencao de storage (simulacao + execucao real) em `/app/configuracoes/operacao`.
