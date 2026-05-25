# Handoff de Producao - Nexa Platform

## Objetivo

Concentrar o minimo necessario para colocar a `Nexa` em producao com seguranca, previsibilidade e validacao operacional.

Use este documento junto com:

- `/.env.production.example`
- `docs/checklist-go-live-operacao-nexa.md`
- `docs/cron-interno.md`
- `docs/release-runbook-integracao-1400cr.md` quando a integracao com o `1400CRM` fizer parte do release

## Resposta curta

Do lado do software, a `Nexa` esta pronta.

O go-live real depende de:

1. segredos de producao
2. banco oficial com backup e restore testados
3. runner/cron interno configurado
4. validacao final dos conectores ativos
5. smoke operacional apos a subida

## Template de ambiente

Base oficial:

- `/.env.production.example`

Minimo obrigatorio para subir com seguranca:

1. `DATABASE_URL`
2. `AUTH_SECRET`
3. `AUTH_COOKIE_SECURE=true`
4. `SIGNATURE_REMINDERS_CRON_TOKEN`
5. `CONNECTOR_HEALTH_CRON_TOKEN`
6. `DB_READINESS_CRON_TOKEN`
7. `EXEC_AUDIT_REPORT_TOKEN`
8. `OBSERVABILITY_HEALTH_TOKEN`
9. `STORAGE_RETENTION_CRON_TOKEN`
10. `OPS_AUTOMATION_RUNNER_TOKEN`
11. `INTERNAL_API_RATE_LIMIT_MAX_REQUESTS`
12. `INTERNAL_API_RATE_LIMIT_WINDOW_SECONDS`
13. `PUBLIC_ESTIMATE_RATE_LIMIT_MAX_ATTEMPTS`
14. `PUBLIC_ESTIMATE_RATE_LIMIT_WINDOW_SECONDS`
15. `PUBLIC_ESTIMATE_BLOCK_SECONDS`

## Sequencia de deploy recomendada

No ambiente alvo:

```bash
npm install
npx prisma db push
npx prisma generate
npm run test:ops
npm run test:behavior
npm run test:smoke
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

Observacao:

- se houver release coordenado com o `1400CRM`, publicar primeiro o `1400CRM` e depois a `Nexa`
- se a equipe usar PM2, systemd, Docker ou outro supervisor, o importante e subir o `start` com o `.env` final do ambiente

## Validacao pos-subida

### Health publico

Validar:

```bash
GET /api/health
```

Esperado:

- `200` quando app e banco estiverem saudaveis

### Endpoints internos protegidos

Validar com token correto:

```bash
GET /api/internal/db-readiness
GET /api/internal/observability-health
POST /api/internal/connectors-health
POST /api/internal/signature-reminders
POST /api/internal/ops-automation-runner?force=connectors_health,db_readiness,observability_snapshot
GET /api/internal/storage-retention?dryRun=true
GET /api/internal/executive-audit-report
```

Esperado:

- `200` com `ok: true`

### UI operacional

Validar na interface:

1. `/login`
2. `/app`
3. `/portal`
4. `/app/configuracoes/operacao?mode=prod`
5. `/app/configuracoes/integracoes`
6. `/app/orcamentos`
7. `/app/rotina-diaria`

Sinais que precisam estar bons:

1. login funcional
2. redirecionamento correto entre `/app` e `/portal`
3. painel operacional sem bloqueadores inesperados
4. health dos conectores executando
5. formulario publico de orcamento respondendo sem erro

## Validacao da integracao 1400CRM

Se o `1400CRM` estiver ativo neste ambiente, validar:

1. `NEXA_1400CR_BASE_URL`
2. `NEXA_1400CR_API_TOKEN`
3. `NEXA_1400CR_HEALTH_ENDPOINT`
4. webhook da `Nexa`
5. fluxo controlado `Nexa -> 1400CRM -> webhook -> Nexa`

Checklist minimo:

1. abrir um cliente na `Nexa`
2. sincronizar cliente e chamados
3. abrir um chamado pela `Nexa`
4. confirmar logs `CLIENT_SUPPORT_TICKET_CREATE`, `CLIENT_SUPPORT_WEBHOOK` e `CLIENT_SUPPORT_SYNC`
5. abrir um chamado no `1400CRM` para um cliente `[Nexa]`
6. confirmar agregacao na ficha do cliente

## Itens de infraestrutura que nao sao codigo

Antes de liberar:

1. monitor de disponibilidade da aplicacao
2. rotina real de backup do banco
3. teste real de restore
4. canal de incidente configurado
5. observabilidade externa, se a empresa usar stack dedicada
6. responsavel de plantao definido

## Fechamento honesto

O software esta pronto.

O go-live depende agora de executar com cuidado o ambiente real, os segredos e a validacao operacional final.
