# Modulo de Lembretes de Assinatura Nexa

## Objetivo

Este modulo garante acompanhamento automatico de documentos pendentes de assinatura para evitar atraso operacional.

Ele cobre dois contextos:

1. RH: documentos de colaborador que exigem assinatura.
2. Projetos: documentos de cliente com aprovacao/assinatura solicitada.

## Regras de escalonamento

Padrao atual de lembretes:

1. D+1: lembrete informativo (`info`).
2. D+3: item entra em risco de atraso (`warning`).
3. D+7: escalonamento critico para tratativa de gestor (`critical`).

Interpretacao:

- D+N e contado a partir da data de solicitacao de assinatura.
- no RH, usa `signatureRequestedAt` (ou `createdAt` quando nao houver data de solicitacao).
- em Projetos, usa `requestedAt` da solicitacao de aprovacao do cliente.

## Como usar no dia a dia (operacao)

Ponto principal:

- abrir `/app/pendencias`.

Onde olhar:

1. secao `RH`:
   - bucket `Assinaturas em risco (RH)`.
2. secao `Projetos`:
   - bucket `Assinaturas em risco (cliente)`.
3. secao `Notificacoes dirigidas`:
   - filtro `RH / Lembretes de assinatura`.
   - filtro `Projetos / Lembretes de assinatura`.

Ritual recomendado:

1. tratar itens `critical` primeiro.
2. depois tratar itens `warning`.
3. registrar retorno no fluxo de origem (documento RH ou documentos do projeto).

## Como usar no tecnico (execucao agendada)

Existe uma rota interna para sincronizar os lembretes sem depender da abertura da tela:

- `GET /api/internal/signature-reminders`
- `POST /api/internal/signature-reminders`

Autenticacao:

- enviar `Authorization: Bearer <token>`, ou
- enviar header `x-cron-token: <token>`.

Variavel obrigatoria:

- `SIGNATURE_REMINDERS_CRON_TOKEN`

Resposta:

- a rota retorna resumo com total processado e total ativo em RH e Projetos.

## Exemplo de chamada

```bash
curl -X POST "https://SEU-DOMINIO/api/internal/signature-reminders" \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Agendamento sugerido

Recomendacao inicial:

1. rodar de hora em hora (`0 * * * *`) para manter notificacoes atualizadas.
2. se o volume crescer, reduzir para cada 15 minutos.

## Arquivos do modulo

- `src/lib/signature-reminders.ts`
- `src/lib/pending-center.ts`
- `src/app/app/pendencias/page.tsx`
- `src/app/api/internal/signature-reminders/route.ts`

## Boas praticas

1. nao alterar os marcos D+1/D+3/D+7 sem atualizar a documentacao.
2. qualquer novo canal de assinatura deve integrar neste modulo.
3. toda mudanca de regra deve refletir no guia operacional e no indice mestre.
