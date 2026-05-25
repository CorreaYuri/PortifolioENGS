# Go-Live Producao

## Objetivo

Checklist objetivo para decidir se o 1400CRM pode entrar em producao com baixo risco operacional.

## 1. Infraestrutura

- dominio final definido para o 1400CRM
- HTTPS ativo e validado
- PostgreSQL com backup recorrente
- volume persistente para anexos
- job scheduler ou cron capaz de chamar `/api/internal/notification-jobs/process`

## 2. Configuracao obrigatoria

- `APP_URL` apontando para o dominio real do 1400CRM e sem placeholder
- `AUTH_SECRET` longo, exclusivo do ambiente e sem placeholder
- `AUTH_COOKIE_SECURE="true"`
- `ATTACHMENTS_ROOT_DIR` em volume persistente e sem placeholder
- `PLATFORM_ADMIN_EMAILS` revisado
- `INTERNAL_CRON_SECRET` longo, exclusivo e sem placeholder
- `CORS_ALLOWED_ORIGINS` configurado se houver portal/browser cross-origin
- `RESEND_API_KEY` real se e-mail transacional estiver habilitado
- `INTEGRATION_CREDENTIALS_JSON` validado, com tokens reais e `webhookSecret` quando houver webhook

## 3. Banco e artefatos

- rodar `npx prisma migrate deploy`
- rodar `npx prisma generate`
- rodar `npm run release:check`
- ele sobe uma instancia temporaria de producao para validar o smoke de seguranca

## 4. Health e readiness

- `GET /api/health` retorna `200`
- `GET /api/internal/readiness` com bearer interno retorna `200`
- se readiness retornar `503`, resolver os checks criticos antes do go-live
- revisar warnings de readiness antes da liberacao, especialmente storage persistente, cron interno e integracoes

## 5. Fluxos minimos

- login funcional
- bloqueio anti-abuso do login funcional
- abertura interna de chamado funcional
- portal publico funcional
- bloqueio anti-abuso do portal funcional
- configuracoes do tenant funcionais
- health de integracao funcional para integradores configurados

## 6. Integracoes e notificacoes

- `GET /api/integrations/health` validado para cada integrador
- webhook configurado com `webhookSecret` forte quando aplicavel
- fila de e-mail escoando por cron interno quando habilitada
- auditoria monitorando `INTEGRATION_WEBHOOK_DELIVERY_FAILED`

## 7. Liberacao

Pode considerar o sistema pronto para producao quando:
- infra minima estiver pronta
- configuracao obrigatoria estiver correta
- `npm run release:check` estiver verde
- readiness interno estiver `200`
- smoke funcional estiver aprovado
