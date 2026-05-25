# Checklist Go-Live de Operacao Nexa

## Objetivo

Este checklist confirma se a plataforma esta pronta para operar em producao com seguranca, previsibilidade e rotina de suporte.

Data da ultima validacao tecnica: 31/03/2026

## Resultado tecnico desta validacao

1. `npm run test:smoke` -> OK
2. `npm run test:smoke:rh` -> OK
3. `npm run lint` -> OK
4. `npm run build` -> OK

Observacao:

- validacao concluida sem alertas bloqueantes de lint e build.

## Checklist de prontidao

### Bloco 1 - Aplicacao

- [x] Build de producao concluido sem erro
- [x] Rotas principais compiladas (interno, portal e publicas)
- [x] Fluxos de smoke check executados com sucesso
- [x] Lint sem erros bloqueantes
- [x] Painel de saude operacional em `/app/configuracoes/operacao`
- [x] Checklist automatico de go-live (infra, seguranca e monitoramento) em `/app/configuracoes/operacao`

### Bloco 2 - Banco e dados

- [ ] Confirmar `DATABASE_URL` de producao apontando para banco oficial
- [ ] Validar politica de backup automatico do banco (diario)
- [ ] Testar restauracao de backup em ambiente de homologacao
- [ ] Definir retencao minima de backup (recomendado: 30 dias)
- [x] Checklist automatica de prontidao de banco em `/api/internal/db-readiness`
- [x] Registro de evidencia operacional em `/app/configuracoes/operacao`

### Bloco 3 - Seguranca e credenciais

- [ ] Definir `AUTH_SECRET` forte e exclusivo em producao
- [ ] Definir `AUTH_COOKIE_SECURE=true` em producao
- [ ] Definir `SIGNATURE_REMINDERS_CRON_TOKEN` para proteger endpoint interno de lembretes
- [ ] Definir `CONNECTOR_HEALTH_CRON_TOKEN` para proteger endpoint interno de health-check de conectores
- [ ] Definir `OBSERVABILITY_HEALTH_TOKEN` para proteger endpoint interno de observabilidade
- [ ] Definir `STORAGE_RETENTION_CRON_TOKEN` para proteger endpoint interno de retencao de storage
- [ ] Definir `OPS_AUTOMATION_RUNNER_TOKEN` para proteger runner de automacoes agendadas
- [ ] Definir `INTERNAL_API_RATE_LIMIT_MAX_REQUESTS` e `INTERNAL_API_RATE_LIMIT_WINDOW_SECONDS`
- [ ] Definir `SECURITY_LOGIN_RATE_LIMIT_MAX_ATTEMPTS`, `SECURITY_LOGIN_RATE_LIMIT_WINDOW_SECONDS` e `SECURITY_LOGIN_BLOCK_SECONDS`
- [ ] Definir `PUBLIC_ESTIMATE_RATE_LIMIT_MAX_ATTEMPTS`, `PUBLIC_ESTIMATE_RATE_LIMIT_WINDOW_SECONDS` e `PUBLIC_ESTIMATE_BLOCK_SECONDS`
- [x] Baseline de seguranca com score no painel de auditoria executiva
- [ ] Ativar `SECURITY_REQUIRE_MFA_ADMIN=true` em producao
- [ ] Ativar `SECURITY_BLOCK_TEST_ACCOUNTS=true` em producao
- [ ] Revisar permissoes por papel/setor/usuario na tela `/app/permissoes`
- [ ] Confirmar que contas de teste nao estao ativas em producao

### Bloco 4 - Integracoes externas

- [x] Painel interno de conectores disponivel em `/app/configuracoes/integracoes`
- [ ] Se a integracao 1400CR estiver ativa, validar:
  - [ ] `NEXA_1400CR_BASE_URL`
  - [ ] `NEXA_1400CR_API_TOKEN`
  - [ ] `NEXA_1400CR_HEALTH_ENDPOINT`
  - [ ] `NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT` (quando customizado)
  - [ ] `NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE` (quando customizado)
  - [ ] `NEXA_1400CR_TICKET_CREATE_ENDPOINT` (quando customizado)
  - [ ] `NEXA_1400CR_TICKET_DETAIL_TEMPLATE` (quando customizado)
  - [ ] `NEXA_1400CR_WEBHOOK_SECRET` (quando houver assinatura)
- [ ] Rodar teste de envio real controlado da integracao
- [ ] Confirmar que a abertura de chamado da Nexa criou log `CLIENT_SUPPORT_TICKET_CREATE`
- [ ] Confirmar que o webhook do 1400CRM gerou log `CLIENT_SUPPORT_WEBHOOK`
- [ ] Confirmar que o snapshot do cliente foi atualizado com log `CLIENT_SUPPORT_SYNC`
- [ ] Validar o bloco `Operacao 1400CRM` em `/app/configuracoes/integracoes`

### Bloco 5 - Operacao diaria

- [x] Rotina diaria consolidada em `/app/rotina-diaria`
- [x] Fila de triagem comercial em `/app/orcamentos`
- [x] Acao rapida para criar tarefa comercial no lead
- [x] Fluxo RH de assinatura com trilha de auditoria e exportacao
- [x] Escala de plantao por trilha disponivel em `/app/configuracoes/auditoria-executiva`
- [ ] Definir responsavel de plantao para cada trilha (Comercial, RH, Financeiro, Operacao)
- [x] Checklist bloqueante de fechamento mensal (RH + Financeiro + Integracoes)

### Bloco 6 - Monitoramento e suporte

- [x] Endpoint de saude publicado em `/api/health`
- [x] Painel de operacao com bloco de SLA de incidentes em `/app/configuracoes/operacao`
- [x] Captura automatica de erros de runtime em endpoints internos criticos
- [x] Canal de incidente via webhook para alertas criticos (Slack/Teams)
- [x] Export estruturado para observabilidade externa por endpoint HTTP
- [x] SLA formal de incidentes P1/P2/P3 com monitor de violacao
- [x] Export executivo consolidado em `/api/internal/executive-audit-report`
- [x] Endpoint de retencao de storage em `/api/internal/storage-retention`
- [ ] Configurar monitoramento de disponibilidade da aplicacao
- [ ] Configurar ferramenta externa de observabilidade (ex.: Sentry/Datadog) para stacktrace enriquecido
- [ ] Definir canal de incidente (ex.: grupo interno + responsavel de escalacao)
- [ ] Definir SLA de resposta para falhas criticas

## Variaveis de ambiente essenciais

Obrigatorias para operar com seguranca:

1. `DATABASE_URL`
2. `AUTH_SECRET`
3. `AUTH_COOKIE_SECURE`
4. `SIGNATURE_REMINDERS_CRON_TOKEN`
5. `CONNECTOR_HEALTH_CRON_TOKEN`
6. `DB_READINESS_CRON_TOKEN`
7. `EXEC_AUDIT_REPORT_TOKEN`
8. `OBSERVABILITY_HEALTH_TOKEN`
9. `STORAGE_RETENTION_CRON_TOKEN`
10. `INTERNAL_API_RATE_LIMIT_MAX_REQUESTS`
11. `INTERNAL_API_RATE_LIMIT_WINDOW_SECONDS`
12. `SECURITY_LOGIN_RATE_LIMIT_MAX_ATTEMPTS`
13. `SECURITY_LOGIN_RATE_LIMIT_WINDOW_SECONDS`
14. `SECURITY_LOGIN_BLOCK_SECONDS`
15. `PUBLIC_ESTIMATE_RATE_LIMIT_MAX_ATTEMPTS`
16. `PUBLIC_ESTIMATE_RATE_LIMIT_WINDOW_SECONDS`
17. `PUBLIC_ESTIMATE_BLOCK_SECONDS`
18. `OPS_AUTOMATION_RUNNER_TOKEN`

Opcionais por uso de integracao:

1. `NEXA_1400CR_BASE_URL`
2. `NEXA_1400CR_API_TOKEN`
3. `NEXA_1400CR_HEALTH_ENDPOINT`
4. `NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT`
5. `NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE`
6. `NEXA_1400CR_TICKET_CREATE_ENDPOINT`
7. `NEXA_1400CR_TICKET_DETAIL_TEMPLATE`
8. `NEXA_1400CR_WEBHOOK_SECRET`

Referencia:

- arquivo `.env.example` com base de variaveis para homologacao e producao
- arquivo `.env.production.example` como base de handoff final de producao

## Decisao de go-live

Regra recomendada:

- So liberar producao quando todos os itens dos blocos 1, 2 e 3 estiverem marcados.

Bloqueadores atuais para go-live formal:

1. Confirmacao de backup e teste de restore do banco
2. Revisao final de credenciais de producao
3. Monitoramento minimo de runtime/disponibilidade

## Como usar o checklist automatico no sistema

1. abrir `/app/configuracoes/operacao`
2. localizar a secao `Checklist automatico de prontidao`
3. verificar o card `BLOQUEADORES`
4. tratar primeiro os itens marcados como `BLOQUEADOR`
5. para foco total em go-live, usar `Modo producao` em `/app/configuracoes/operacao?mode=prod`
6. validar os blocos:
   - `Infra e Banco`
   - `Seguranca`
   - `Monitoramento`
7. repetir a leitura apos cada ajuste de ambiente/credencial
8. quando precisar compartilhar com diretoria, usar `Exportar diagnostico (CSV)` no mesmo painel
9. para leitura executiva em reuniao, usar `Exportar executivo (PDF)` no mesmo painel
10. acompanhar `Historico de diagnosticos exportados` para auditoria (data, responsavel, modo e resumo)
11. usar filtros de periodo (`7d`, `30d`, `90d`) para leitura por janela
12. aplicar `Limpar historico antigo` com retencao segura quando necessario
13. para limpar, confirmar digitando `LIMPAR` no campo de seguranca
