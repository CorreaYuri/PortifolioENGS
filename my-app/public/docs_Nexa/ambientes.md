# Ambientes da Nexa

Este guia resume como preparar as variaveis de ambiente da aplicacao para `local`, `homolog` e `producao`.

## Arquivos

- `/.env.example`: modelo versionado com todas as variaveis esperadas.
- `/.env`: arquivo local real da maquina de desenvolvimento.

Regra pratica:
- nunca commitar segredos reais
- usar `/.env.example` como contrato do sistema
- preencher `/.env` local copiando do exemplo

## Local

Passos:
1. Copie `/.env.example` para `/.env`.
2. Ajuste `DATABASE_URL` para o seu Postgres local.
3. Mantenha os tokens internos com valores previsiveis de desenvolvimento.
4. Se nao houver provedores externos reais, mantenha os conectores apontando para mocks locais.

Checklist local:
- `DATABASE_URL`
- `AUTH_SECRET`
- `CONNECTOR_HEALTH_CRON_TOKEN`
- `DB_READINESS_CRON_TOKEN`
- `SIGNATURE_REMINDERS_CRON_TOKEN`
- `STORAGE_RETENTION_CRON_TOKEN`
- `OPS_AUTOMATION_RUNNER_TOKEN`

Comando util:

```bash
npm run test:ops
```

Objetivo esperado:
- `score 100%`
- `0 blockers`
- `0 warnings`

## Homolog

Objetivo:
- validar integracoes reais
- validar automacoes internas com tokens dedicados
- testar comportamento mais proximo de producao

Trocar obrigatoriamente:
- `DATABASE_URL`
- `AUTH_SECRET`
- todos os `*_TOKEN` internos
- `NEXA_1400CR_BASE_URL`
- `NEXA_1400CR_API_TOKEN`
- `NEXA_FISCAL_API_BASE_URL`
- `NEXA_FISCAL_API_TOKEN`
- `NEXA_BANK_API_BASE_URL`
- `NEXA_BANK_API_TOKEN`

Recomendado em homolog:
- `INCIDENT_ALERTS_ENABLED=true` apenas se houver canal de teste
- `OBSERVABILITY_EXPORT_ENABLED=true` apenas se houver coletor de homolog
- `LOG_LEVEL=info`

Checklist de homolog:
- rotas `/api/internal/*` respondem com token correto
- conectores respondem ao health-check
- automacoes executam sem erro
- `npm run build` passa
- `npm run test:ops` sem warnings

## Producao

Objetivo:
- operacao segura
- segredos fortes
- integrações reais
- monitoramento ativo

Obrigatorio em producao:
- segredos fortes e exclusivos para `AUTH_SECRET`
- segredos fortes e exclusivos para todos os cron tokens
- URLs reais dos conectores
- tokens reais dos conectores
- banco gerenciado e backup alinhado com a operacao

Recomendado em producao:
- `SECURITY_REQUIRE_MFA_ADMIN=true`
- `SECURITY_BLOCK_TEST_ACCOUNTS=true`
- `INCIDENT_ALERTS_ENABLED=true`
- `OBSERVABILITY_EXPORT_ENABLED=true` se houver stack de observabilidade
- `LOG_LEVEL=info` ou mais restrito

Checklist de producao:
- `DATABASE_URL` nao aponta para localhost
- backups e restore testados
- webhook de incidentes validado
- exportacao de observabilidade validada
- cron/runner interno configurado
- `npm run test:ops` sem warnings no ambiente final

## Variaveis por grupo

### Banco e autenticacao

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_COOKIE_SECURE`
- `SESSION_MAX_DAYS`
- `SECURITY_PASSWORD_MIN_LENGTH`
- `SECURITY_REQUIRE_MFA_ADMIN`
- `SECURITY_BLOCK_TEST_ACCOUNTS`
- `SECURITY_LOGIN_RATE_LIMIT_MAX_ATTEMPTS`
- `SECURITY_LOGIN_RATE_LIMIT_WINDOW_SECONDS`
- `SECURITY_LOGIN_BLOCK_SECONDS`

### Observabilidade

- `LOG_LEVEL`
- `OBS_ENABLE_PRISMA_QUERY_EVENTS`
- `OBS_SLOW_QUERY_MS`
- `OBSERVABILITY_EXPORT_ENABLED`
- `OBSERVABILITY_EXPORT_URL`
- `OBSERVABILITY_EXPORT_TOKEN`

### Alertas

- `INCIDENT_ALERTS_ENABLED`
- `INCIDENT_ALERTS_WEBHOOK_URL`

### Rate limit interno

- `INTERNAL_API_RATE_LIMIT_MAX_REQUESTS`
- `INTERNAL_API_RATE_LIMIT_WINDOW_SECONDS`
- `PUBLIC_ESTIMATE_RATE_LIMIT_MAX_ATTEMPTS`
- `PUBLIC_ESTIMATE_RATE_LIMIT_WINDOW_SECONDS`
- `PUBLIC_ESTIMATE_BLOCK_SECONDS`

### Cron e automacao interna

- `SIGNATURE_REMINDERS_CRON_TOKEN`
- `CONNECTOR_HEALTH_CRON_TOKEN`
- `DB_READINESS_CRON_TOKEN`
- `EXEC_AUDIT_REPORT_TOKEN`
- `OBSERVABILITY_HEALTH_TOKEN`
- `STORAGE_RETENTION_CRON_TOKEN`
- `OPS_AUTOMATION_RUNNER_TOKEN`

### Integracao 1400CR

- `NEXA_1400CR_BASE_URL`
- `NEXA_1400CR_API_TOKEN`
- `NEXA_1400CR_HEALTH_ENDPOINT`
- `NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT`
- `NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE`
- `NEXA_1400CR_TICKET_CREATE_ENDPOINT`
- `NEXA_1400CR_TICKET_DETAIL_TEMPLATE`
- `NEXA_1400CR_WEBHOOK_SECRET`

### Integracao fiscal

- `NEXA_FISCAL_API_BASE_URL`
- `NEXA_FISCAL_API_TOKEN`
- `NEXA_FISCAL_COMPANY_TAX_ID`
- `NEXA_FISCAL_NFE_STATUS_ENDPOINT`

### Integracao bancaria

- `NEXA_BANK_API_BASE_URL`
- `NEXA_BANK_API_TOKEN`
- `NEXA_BANK_ACCOUNT_ID`
- `NEXA_BANK_TRANSACTIONS_ENDPOINT`

## Fluxo recomendado para novo ambiente

1. Copiar `/.env.example`.
2. Preencher banco e autenticacao.
3. Preencher tokens internos.
4. Preencher conectores externos.
5. Rodar `npm run test:ops`.
6. Rodar `npm run build`.
7. Validar health-checks e automacoes internas.

## Comandos uteis

```bash
npm run test:ops
npm run test:behavior
npm run lint
npm run build
```
