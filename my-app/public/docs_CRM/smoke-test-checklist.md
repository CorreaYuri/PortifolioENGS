# Smoke Test Final

## Objetivo

Checklist curto para validar os fluxos mais criticos da central de chamados antes de demo, deploy ou homologacao final.

## Preparacao

- `.env` configurado
- banco acessivel
- tenant demo ou tenant de homologacao existente
- se quiser validar e-mail, configurar `APP_URL`, `RESEND_API_KEY`, `INTERNAL_CRON_SECRET` e remetente do tenant em `/configuracoes`
- se quiser validar integracao, configurar `INTEGRATION_CREDENTIALS_JSON` com token e `webhookSecret` reais

## 1. Validacao tecnica

1. rodar `npm run typecheck:stable`
2. rodar `npm run lint`
3. rodar `npm run build`
4. rodar `npm run release:check`

Esperado:
- todos concluem sem erro

## 2. Login e sessao

1. abrir `/login`
2. entrar com usuario valido do tenant
3. navegar para `/dashboard`

Esperado:
- sessao criada
- sidebar carrega tenant ativo
- sem erro visual ou redirecionamento indevido

## 3. Anti-abuso de login

1. repetir falhas de login controladas com o mesmo email/tenant
2. observar a resposta da API ou da tela

Esperado:
- o sistema passa a responder `429`
- existe tempo de espera para nova tentativa
- o fluxo nao cai em erro 500

## 4. Portal do solicitante

1. abrir `/portal/{slug}`
2. confirmar nome e logo do tenant no topo
3. abrir chamado publico

Esperado:
- formulario carrega
- chamado e criado com protocolo `CH-...`
- inbox destino recebe o chamado

## 5. Anti-abuso do portal

1. repetir varias submisses seguidas para o mesmo portal e IP de teste

Esperado:
- o portal passa a responder `429`
- o bloqueio nao derruba o tenant
- auditoria registra evento `SECURITY_PORTAL_IP_THROTTLED`

## 6. Abertura interna de chamado

1. abrir `/tickets/novo`
2. criar chamado manual
3. abrir detalhe do chamado criado

Esperado:
- chamado criado sem erro
- header, timeline e bloco de registro carregam normalmente

## 7. Tratamento principal

1. assumir o chamado
2. registrar observacao ou acordo
3. reagendar retorno
4. abrir chamado filho
5. transferir o chamado principal se estiver com `MANAGER` ou `ADMIN`

Esperado:
- cada acao retorna sucesso
- timeline atualiza
- chamado filho abre corretamente a partir do pai

## 8. Fechamento

1. abrir chamado em atendimento
2. finalizar com motivo
3. buscar o numero na fila

Esperado:
- chamado fecha sem erro
- sai das listas operacionais
- reaparece apenas na busca

## 9. Dashboard, busca e integracao

1. abrir `/dashboard`
2. verificar fila e detalhe
3. usar busca global do sidebar
4. validar `GET /api/integrations/health` com token valido

Esperado:
- dashboard carrega sem bloco quebrado
- busca encontra por `CH-`, solicitante, email ou telefone
- health de integracao responde com tenant, sistema externo e status

## 10. Tenant e plataforma

1. abrir `/configuracoes`
2. salvar nome, logo ou remetente do tenant
3. se for usuario de plataforma, abrir `/tenants` e entrar em modo suporte
4. sair do modo suporte

Esperado:
- configuracoes salvam sem erro
- modo suporte entra e sai corretamente
- auditoria registra entrada e saida

## 11. Notificacao por e-mail e webhooks

1. garantir remetente configurado no tenant
2. movimentar um chamado com usuarios envolvidos
3. se houver integracao, revisar auditoria apos webhook invalido ou indisponivel
4. validar `GET /api/internal/readiness` com `Bearer INTERNAL_CRON_SECRET`

Esperado:
- sistema continua operando mesmo se o envio externo falhar
- quando o provedor estiver configurado corretamente, e-mail e disparado
- falhas de webhook geram `INTEGRATION_WEBHOOK_DELIVERY_FAILED`
- readiness interno nao aponta falhas criticas

## Criterio rapido de aceite

Considerar o sistema pronto para uso quando:
- build, lint, typecheck estavel e `release:check` passarem
- login e portal aplicarem protecao contra abuso
- portal publico criar chamado
- fluxo principal do chamado completar sem erro
- busca localizar chamados corretamente
- health de integracao responder com sucesso
- readiness interno responder sem falhas criticas
- fechamento remover o chamado das listas operacionais
- configuracoes do tenant e modo suporte funcionarem
