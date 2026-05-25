# Release Runbook - Integracao Nexa x 1400CRM

## Objetivo

Padronizar a liberacao de mudancas da integracao `Nexa <-> 1400CRM` com foco em:

- previsibilidade
- reversao rapida
- evidencias de validacao

## Escopo

Usar este runbook sempre que houver mudanca em qualquer um destes grupos:

- contratos HTTP da integracao
- sincronizacao de cliente
- abertura de chamado
- webhook do 1400CRM
- leitura de tickets e snapshots
- UX operacional das telas de atendimento ligadas ao suporte 1400CRM

## Pre-check

Antes do deploy:

1. validar ambiente em ambos os apps
2. confirmar `BASE_URL`, token e segredo de webhook
3. garantir que o `1400CRM` responde no endpoint de integracao
4. garantir que a `Nexa` responde no webhook receptor
5. confirmar que existe pelo menos um cliente homologado para teste

## Validacao tecnica antes do release

### Nexa

```bash
npm run build
npm run test:behavior
npm run test:smoke
npm run test:ops
npx tsc --noEmit
```

### 1400CRM

```bash
npm run build
npm run typecheck:stable
npm run test:integration-smoke
npx eslint .
```

## Sequencia de deploy recomendada

1. publicar primeiro o `1400CRM`
2. validar endpoints de integracao no ambiente alvo
3. publicar a `Nexa`
4. validar o webhook receptor da `Nexa`
5. executar o teste controlado ponta a ponta

Motivo:

- a `Nexa` depende do contrato publicado no `1400CRM`
- o webhook precisa estar alinhado com o payload final do `1400CRM`

## Smoke pos-deploy

Executar com um cliente homologado:

1. abrir a ficha do cliente na `Nexa`
2. sincronizar cliente e chamados
3. abrir um chamado pela `Nexa`
4. confirmar log `CLIENT_SUPPORT_TICKET_CREATE`
5. confirmar log `CLIENT_SUPPORT_WEBHOOK`
6. confirmar log `CLIENT_SUPPORT_SYNC`
7. expandir o chamado e usar `Atualizar do 1400CR`
8. no `1400CRM`, abrir `/tickets/novo`
9. selecionar o cliente `[Nexa]`
10. confirmar inbox sugerida e historico recente
11. abrir um novo chamado no `1400CRM`
12. voltar para a `Nexa` e confirmar agregacao do chamado ao cliente

## Evidencias minimas

Registrar:

1. horario do release
2. commit ou tag dos dois apps
3. resultado dos comandos de validacao
4. protocolo do chamado aberto no teste controlado
5. captura dos logs de `create`, `webhook` e `sync`

## Rollback

Fazer rollback quando ocorrer qualquer uma destas situacoes:

1. cliente deixa de sincronizar
2. abertura de chamado falha para cliente valido
3. webhook nao chega ou nao reconcilia snapshot
4. historico do cliente deixa de refletir os tickets do 1400CRM

Ordem recomendada:

1. pausar novo release
2. reverter primeiro a `Nexa` se a quebra for apenas de leitura ou UX
3. reverter primeiro o `1400CRM` se a quebra for de contrato, payload ou autenticacao
4. repetir o smoke pos-rollback

## Donos da liberacao

- responsavel tecnico Nexa
- responsavel tecnico 1400CRM
- responsavel operacional para validar o teste controlado

## Observacao

Se houver mudanca de payload ou autenticacao, tratar a liberacao como mudanca coordenada entre os dois apps, nunca como deploy isolado.
