# Handoff de Producao

## Objetivo

Este documento consolida o pacote final de producao do 1400CRM para a operacao da Nexa e para futuras vendas do produto.

## Posicionamento do produto

- a Nexa e a plataforma operacional principal
- o 1400CRM e o motor especialista de atendimento e chamados
- a combinacao e intencional: a Nexa distribui e usa o produto, enquanto o 1400CRM resolve o dominio de suporte com profundidade

## Arquivos e comandos de referencia

- ambiente de producao: `/.env.production.example`
- go-live: `/docs/production-go-live-checklist.md`
- deploy: `/docs/deploy-guide.md`
- smoke final: `/docs/smoke-test-checklist.md`
- release completo: `npm run release:check`
- relatorio rapido de go-live: `npm run go-live:report`

## Variaveis de producao esperadas

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/crm1400?schema=public"
AUTH_SECRET="UM_SEGREDO_LONGO_UNICO_E_ALEATORIO"
AUTH_COOKIE_SECURE="true"
PLATFORM_ADMIN_EMAILS="admin@empresa.com,operacoes@empresa.com"
APP_URL="https://1400crm.seudominio.com"
ATTACHMENTS_ROOT_DIR="/var/lib/1400graus-crm/anexos"
INTERNAL_CRON_SECRET="UM_TOKEN_INTERNO_LONGO_E_UNICO"
CORS_ALLOWED_ORIGINS="https://nexa.seudominio.com"
RESEND_API_KEY="re_..."
INTEGRATION_CREDENTIALS_JSON='[{"tenantSlug":"demo-1400","name":"Nexa","externalSystem":"NEXA","token":"TOKEN_FORTE_E_LONGO","webhookUrl":"https://nexa.seudominio.com/api/integrations/1400crm/webhook","webhookSecret":"SEGREDO_COMPARTILHADO_FORTE"}]'
```

## Sequencia recomendada de deploy

```bash
npm install
npx prisma migrate deploy
npx prisma generate
npm run release:check
npm run go-live:report
npm run start
```

## Validacoes de subida

Validar apos deploy:

```text
GET /api/health
GET /api/internal/readiness  com Authorization: Bearer INTERNAL_CRON_SECRET
GET /api/integrations/health com Authorization: Bearer TOKEN_DA_NEXA
```

## O que ainda depende da infraestrutura

O repositorio agora esta pronto para producao. O go-live real depende apenas de:

- dominio e HTTPS
- banco PostgreSQL de producao
- volume persistente para anexos
- backup recorrente de banco e anexos
- cron ou scheduler para `/api/internal/notification-jobs/process`
- segredos reais do ambiente

## Decisao final

Pode considerar o 1400CRM pronto para entrar em producao quando:

- `npm run release:check` estiver verde
- `npm run go-live:report` nao apontar pendencias criticas
- `/api/health` responder `200`
- `/api/internal/readiness` responder `200`
- a integracao com a Nexa estiver validada no ambiente publicado
