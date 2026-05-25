# Ativacao de Integracoes Nexa (Passo a Passo)

## Objetivo

Este guia mostra como ativar as integracoes da Nexa de ponta a ponta, com validacao tecnica e operacional.

Rota central de gestao:

- `/app/configuracoes/integracoes`

Atalho operacional complementar:

- `/app/configuracoes/operacao` (secao `Assistente de Ambiente`)

## Pre-requisitos

Antes de ativar qualquer conector:

1. Aplicacao em execucao (`npm run dev` ou ambiente de homologacao/producao online)
2. Banco acessivel (`DATABASE_URL` valida)
3. Permissao de acesso ao modulo de configuracoes/integracoes
4. Credenciais oficiais da integracao (URL base, token, IDs necessarios)

## Passo 1 - Configurar variaveis de ambiente

Use `.env.example` como referencia e preencha no ambiente correto.

Obrigatorias gerais:

1. `DATABASE_URL`
2. `AUTH_SECRET`
3. `CONNECTOR_HEALTH_CRON_TOKEN`

Obrigatorias da integracao 1400CR:

1. `NEXA_1400CR_BASE_URL`
2. `NEXA_1400CR_API_TOKEN`

Opcionais 1400CR:

1. `NEXA_1400CR_CUSTOMER_LOOKUP_ENDPOINT`
2. `NEXA_1400CR_CUSTOMER_TICKETS_TEMPLATE`
3. `NEXA_1400CR_TICKET_CREATE_ENDPOINT`
4. `NEXA_1400CR_TICKET_DETAIL_TEMPLATE`
5. `NEXA_1400CR_WEBHOOK_SECRET`

Conectores base (quando forem usados):

1. `NEXA_FISCAL_API_BASE_URL`
2. `NEXA_FISCAL_API_TOKEN`
3. `NEXA_FISCAL_COMPANY_TAX_ID`
4. `NEXA_BANK_API_BASE_URL`
5. `NEXA_BANK_API_TOKEN`
6. `NEXA_BANK_ACCOUNT_ID`

## Passo 2 - Reiniciar aplicacao

Sempre que mudar variavel de ambiente:

1. Pare a aplicacao
2. Suba novamente

Comandos:

```bash
npm run dev
```

## Passo 3 - Validar no painel de integracoes

No sistema, acesse:

1. `/app/configuracoes/integracoes`
2. Confira cada card de conector
3. Verifique se o status mudou para `pronto`
4. Se estiver `pendente`, complete as variaveis faltantes listadas no card

## Passo 4 - Rodar health-check remoto

No mesmo painel:

1. Clique em `Health-check remoto` no conector desejado
2. Aguarde mensagem de retorno
3. Confirme atualizacao do ultimo status no card

Para validacao geral:

1. Clique em `Executar health-check de todos`
2. Verifique quais conectores responderam com sucesso

## Passo 4.1 - Marcar checklist de homologacao por conector

No card de cada conector em `/app/configuracoes/integracoes`:

1. atualizar o campo de homologacao para `Nao iniciado`, `Em teste` ou `Aprovado`
2. registrar nota curta de evidencias quando necessario
3. salvar o status para manter rastreabilidade de liberacao por conector
4. quando marcar `Aprovado`, o sistema registra responsavel e data/hora da aprovacao

## Passo 5 - Confirmar trilha de log

Cada execucao gera registro em `IntegrationLog` com `entityType = CONNECTOR_HEALTHCHECK`.

Checklist:

1. Existe log de sucesso recente para cada conector ativo
2. Falhas tem mensagem clara para acao corretiva
3. Time sabe quem aciona suporte externo quando houver erro

## Passo 6 - Ativar automacao de health-check (opcional e recomendado)

Endpoint interno:

- `GET/POST /api/internal/connectors-health`

Protecao:

- header `x-internal-token` com valor de `CONNECTOR_HEALTH_CRON_TOKEN`

Exemplo de chamada:

```bash
curl -X POST "https://seu-dominio/api/internal/connectors-health" \
  -H "x-internal-token: SEU_TOKEN_INTERNO"
```

Recomendacao de agenda:

1. Conectores criticos: a cada 5 ou 10 minutos
2. Conectores administrativos: a cada 30 ou 60 minutos

## Passo 7 - Criterio de ativacao oficial

Considere uma integracao ativa somente quando:

1. Variaveis obrigatorias preenchidas
2. Health-check individual com sucesso
3. Health-check em lote com sucesso
4. Log registrado sem erro critico
5. Responsavel de negocio validou um teste real controlado
6. O painel `Operacao 1400CRM` mostra logs recentes de create, webhook e sync
7. O detalhe sob demanda do chamado abre sem erro na ficha do cliente

## Troubleshooting rapido

Se o conector nao ativar:

1. Verifique URL base (sem espaco extra e com protocolo correto `https://`)
2. Valide token (expiracao, escopo e ambiente correto)
3. Confira firewall/IP allowlist no provedor externo
4. Rode health-check novamente apos ajuste
5. Consulte runbook: `docs/runbook-incidentes-operacionais-nexa.md`

## Referencias

1. `docs/integracoes-conectores-nexa.md`
2. `docs/checklist-go-live-operacao-nexa.md`
3. `.env.example`
