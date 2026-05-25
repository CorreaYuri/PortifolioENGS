# Deploy e Producao

## Objetivo

Guia curto para subir a central de chamados em producao com o minimo de surpresa.

## 1. Requisitos

- Node.js 20+
- PostgreSQL acessivel pela aplicacao
- variaveis de ambiente configuradas
- build do Next concluindo sem erro
- diretorio persistente para anexos
- cron interno ou job scheduler para a fila de notificacoes

## 2. Variaveis obrigatorias

Defina pelo menos:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
AUTH_SECRET="um-segredo-longo-e-unico"
AUTH_COOKIE_SECURE="true"
APP_URL="https://seu-dominio.com"
PLATFORM_ADMIN_EMAILS="voce@empresa.com,equipe@empresa.com"
ATTACHMENTS_ROOT_DIR="/var/lib/1400graus-crm/anexos"
```

Se usar portal publico e integracoes cross-origin:

```env
CORS_ALLOWED_ORIGINS="https://portal-cliente.exemplo.com,https://nexa.exemplo.com"
```

Se quiser readiness interno autenticado, disparo de e-mail e integracao externa:

```env
RESEND_API_KEY="re_..."
INTERNAL_CRON_SECRET="troque-por-um-token-interno-seguro"
INTEGRATION_CREDENTIALS_JSON='[{"tenantSlug":"demo-1400","name":"Nexa","externalSystem":"NEXA","token":"token-forte-e-longo","webhookUrl":"https://nexa.exemplo.com/api/integrations/1400crm/webhook","webhookSecret":"segredo-compartilhado"}]'
```

## 3. Banco de dados

Antes do primeiro deploy:

1. aplicar migrations com `npx prisma migrate deploy`
2. se necessario, executar seed inicial com `npm run db:seed`
3. validar se o tenant inicial consegue autenticar

## 4. Build de validacao

Sempre rode antes de publicar:

```bash
npm run typecheck:stable
npm run lint
npm run build
```

Esperado:
- todos devem concluir sem erro

## 5. Seguranca operacional

O sistema possui endurecimento basico para uso real:
- throttling de falhas no login
- throttling no portal publico de abertura de chamados
- cookie de sessao `httpOnly`
- auditoria de bloqueios de seguranca por tenant quando aplicavel

Em producao:
- usar `AUTH_COOKIE_SECURE="true"`
- servir o sistema sempre em HTTPS
- manter `AUTH_SECRET` exclusivo do ambiente
- limitar quem entra na area `/tenants` por `PLATFORM_ADMIN_EMAILS`
- revisar periodicamente eventos `SECURITY_*` na auditoria

## 6. Anexos em producao

Os anexos ficam em disco local persistente, fora de `public`, usando:

- `ATTACHMENTS_ROOT_DIR` quando configurado
- ou `./storage/tickets` como fallback local

Recomendacao para producao real:
- apontar `ATTACHMENTS_ROOT_DIR` para um volume persistente
- garantir permissao de leitura e escrita para o processo da aplicacao
- manter backup recorrente dessa pasta

Pontos de atencao:
- se a aplicacao rodar em container efemero sem volume, os anexos podem se perder
- se houver multiplas instancias, todas precisam enxergar o mesmo storage
- anexos antigos salvos em `public/uploads/tickets` continuam acessiveis por compatibilidade

## 7. E-mail transacional

Para notificacoes por e-mail funcionarem:

1. configure `RESEND_API_KEY`
2. configure `APP_URL`
3. configure `INTERNAL_CRON_SECRET`
4. em `/configuracoes`, salve nome e e-mail remetente do tenant

Comportamento atual:
- as movimentacoes geram jobs na tabela `NotificationJob`
- o envio usa retry automatico
- falhas definitivas geram auditoria
- existe rota interna protegida para processar a fila: `/api/internal/notification-jobs/process`

Observacao:
- se o provedor falhar, o sistema continua operando
- a falha nao bloqueia o fluxo de chamados
- em producao, vale acionar a rota interna por cron autenticado para escoar a fila continuamente
- o mesmo segredo tambem libera a consulta autenticada de `/api/internal/readiness`

## 8. Integracoes

Antes de habilitar consumo externo:
- valide `INTEGRATION_CREDENTIALS_JSON`
- confirme `APP_URL` correto para links devolvidos ao integrador
- teste `GET /api/integrations/health` com bearer token valido
- revise a auditoria para falhas `INTEGRATION_WEBHOOK_DELIVERY_FAILED`

## 9. Processo sugerido de deploy

1. atualizar codigo da aplicacao
2. instalar dependencias
3. aplicar migrations com `npx prisma migrate deploy`
4. rodar `npm run typecheck:stable`
5. rodar `npm run lint`
6. rodar `npm run build`
7. publicar a nova versao
8. validar login, dashboard, abertura de chamado, anexos e integracao

## 10. Smoke test pos-deploy

Validar no ambiente publicado:

- login pelo `/login`
- bloqueio de rate limit apos repeticao controlada de falha de login
- portal do solicitante
- criacao interna de chamado
- anexo em chamado
- observacao com anexo na timeline
- download autenticado de anexo
- fechamento com motivo
- busca por `CH-...`
- configuracoes do tenant
- modo suporte da plataforma
- `GET /api/integrations/health` com token valido

## 11. Backups

Recomendacao minima:

- backup recorrente do PostgreSQL
- backup recorrente da pasta definida em `ATTACHMENTS_ROOT_DIR`
- restauracao testada em ambiente separado

## 12. Sinais de problema conhecidos

Se algo falhar no deploy, os primeiros pontos a revisar sao:

- `DATABASE_URL`
- `AUTH_SECRET`
- `APP_URL`
- `INTEGRATION_CREDENTIALS_JSON`
- `CORS_ALLOWED_ORIGINS`
- persistencia da pasta de anexos
- permissao de leitura e escrita no diretorio definido por `ATTACHMENTS_ROOT_DIR`
- remetente do tenant, `RESEND_API_KEY` e `INTERNAL_CRON_SECRET`


