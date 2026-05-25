# Como Usar o Sistema

## Objetivo

Este guia foi escrito para quem precisa aprender a usar o 1400 Graus CRM no dia a dia.

Aqui voce encontra o fluxo completo:
- como entrar no sistema
- como configurar a base inicial
- como operar chamados
- como administrar usuarios, inboxes e tenant
- como usar portal, relatorios, auditoria e modo suporte

## 1. O que o sistema faz

O produto e uma central multi-tenant de atendimento por chamados.

Ele foi desenhado para operar:
- filas por inbox
- distribuicao de atendimento por equipe
- ownership por atendente
- retornos agendados
- transferencia entre setores
- abertura por portal publico
- auditoria de acoes sensiveis
- gestao de tenants pela equipe da plataforma

O sistema nao e um CRM comercial completo. O cadastro do solicitante existe para dar contexto ao chamado.

## 2. Perfis de acesso

### `ADMIN`

Pode:
- operar qualquer chamado do tenant
- administrar usuarios
- administrar inboxes
- editar configuracoes do tenant
- transferir chamado principal
- abrir chamado filho

### `MANAGER`

Pode:
- operar qualquer chamado do tenant
- administrar usuarios comuns
- administrar inboxes
- consultar relatorios
- consultar auditoria
- transferir chamado principal
- abrir chamado filho

Nao pode:
- administrar outro `ADMIN`

### `AGENT`

Pode:
- operar apenas inboxes em que estiver vinculado
- assumir chamado
- adicionar interacoes
- reagendar retorno
- fechar chamado
- abrir chamado filho
- repassar para integrante elegivel da mesma inbox

Nao pode:
- operar inbox sem membership
- transferir chamado principal entre inboxes
- acessar areas administrativas

## 3. Mapa das telas

### Uso diario

- `/dashboard`: painel operacional com alertas, atividade recente e fila visivel
- `/hoje`: entradas novas do dia e retornos agendados para hoje
- `/tickets`: fila completa de chamados com busca e filtros
- `/tickets/novo`: abertura manual de chamado
- `/tickets/[id]`: detalhe do chamado, timeline e acoes operacionais
- `/agendamentos`: lista de retornos pendentes

### Administracao do tenant

- `/usuarios`: criacao, ativacao, papeis e memberships por inbox
- `/inboxes`: cadastro e manutencao das filas do tenant
- `/configuracoes`: dados do tenant, portal, origens, motivos de encerramento e e-mail
- `/relatorios`: indicadores operacionais do periodo
- `/auditoria`: consulta de eventos sensiveis e administrativos

### Plataforma

- `/cadastro`: onboarding de novo tenant
- `/tenants`: area global da plataforma para entrar em modo suporte

### Portal publico

- `/portal/{slug}`: abertura publica de chamado pelo solicitante

## 4. Primeiro acesso

### Login

1. Abra `/login`.
2. Informe:
- `tenantSlug`
- e-mail
- senha
3. Entre no sistema.

Observacoes:
- o `tenantSlug` identifica qual empresa voce quer acessar
- o login possui protecao contra repeticao de falhas

## 5. Primeira configuracao do tenant

Se o tenant acabou de ser criado, esta e a ordem recomendada.

### Passo 1. Revisar configuracoes gerais

Abra `/configuracoes` e confira:
- nome do tenant
- slug
- logo
- prioridade padrao
- origens permitidas
- motivos de encerramento
- remetente de e-mail

### Passo 2. Revisar usuarios

Abra `/usuarios` e:
- crie usuarios faltantes
- defina o papel de cada pessoa
- revise quem esta ativo ou inativo

### Passo 3. Distribuir usuarios nas inboxes

Ainda em `/usuarios` ou em `/inboxes`, confirme:
- quais setores cada pessoa atende
- se existem usuarios sem inbox
- se algum setor esta sem equipe

### Passo 4. Revisar inboxes

Abra `/inboxes` e confira:
- nome
- codigo
- descricao
- status ativo
- SLA de primeira acao
- SLA de resolucao
- quantidade de membros

### Passo 5. Validar o portal

Em `/configuracoes`, copie ou abra o link do portal.

Confira:
- se a origem `Portal do solicitante` esta habilitada
- se ha pelo menos uma inbox ativa
- se a logo e o nome do tenant aparecem corretamente

### Passo 6. Fazer um teste funcional

1. Crie um chamado em `/tickets/novo`.
2. Abra um chamado publico em `/portal/{slug}`.
3. Assuma um chamado.
4. Adicione interacao.
5. Reagende.
6. Feche.

## 6. Como operar no dia a dia

### 6.1 Acompanhar a operacao em `/dashboard`

Use o dashboard para ter uma visao rapida da fila.

Voce encontra:
- resumo de chamados ativos
- alertas operacionais
- interacoes recentes
- selecao de um chamado para foco rapido

Sinais de risco usados hoje:
- `Retorno vencido`
- `Urgente sem dono`
- `Fila +SLA`
- `Atendimento parado`

### 6.2 Acompanhar o que vence hoje em `/hoje`

Use a tela `Hoje` para priorizar:
- chamados abertos hoje
- retornos previstos para hoje

Ela ajuda a separar o que entrou agora do que precisa voltar para atendimento.

### 6.3 Buscar e filtrar na fila completa em `/tickets`

Use `/tickets` quando precisar consultar a operacao inteira.

A busca aceita:
- numero do chamado, como `CH-2048`
- apenas o numero
- assunto
- descricao
- nome do solicitante
- e-mail
- telefone

Os filtros ajudam a reduzir por:
- inbox
- prioridade
- responsavel
- status

### 6.4 Abrir um chamado manual em `/tickets/novo`

1. Abra `/tickets/novo`.
2. Preencha:
- solicitante
- e-mail e telefone, se houver
- inbox inicial
- assunto
- descricao
- prioridade
- origem
3. Envie o formulario.

Resultado esperado:
- o chamado recebe numero sequencial por tenant
- entra na fila da inbox escolhida
- ganha historico inicial

### 6.5 Trabalhar dentro do chamado em `/tickets/[id]`

Na tela de detalhe do chamado voce pode:
- assumir o atendimento
- repassar para outro integrante elegivel
- adicionar observacao interna
- registrar mensagem do solicitante
- registrar acordo
- anexar arquivos
- reagendar retorno
- transferir o principal para outra inbox
- abrir chamado filho
- fechar o chamado

### 6.6 Assumir um chamado

Quando voce assume:
- vira responsavel atual
- o status muda para atendimento
- o chamado sai da condicao de fila sem dono

### 6.7 Registrar timeline

Use a timeline para manter contexto claro.

Tipos de registro comuns:
- observacao interna
- mensagem do solicitante
- acordo

Boa pratica:
- registre fatos importantes e proximos passos
- use texto curto e objetivo

### 6.8 Reagendar retorno

Use o reagendamento quando o chamado precisa voltar em outro horario.

Ao reagendar:
- o retorno pendente anterior e cancelado
- um novo agendamento e criado
- o chamado entra em espera de retorno

Depois ele aparece em:
- `/agendamentos`
- `/hoje`, quando o vencimento cair no dia atual

### 6.9 Transferir ou abrir chamado filho

Use transferencia quando:
- o chamado principal precisa trocar de setor

Use chamado filho quando:
- o caso exige apoio de outra area
- mas o contexto do chamado original deve continuar preservado

Regra importante:
- transferencia do principal e restrita a `ADMIN` e `MANAGER`

### 6.10 Fechar um chamado

Para fechar:
1. abra a acao de encerramento
2. escolha um motivo valido do tenant
3. informe resumo, se necessario
4. confirme

Depois disso:
- o chamado sai das listas operacionais
- continua acessivel pela busca
- historico e auditoria permanecem disponiveis

## 7. Como usar o portal do solicitante

O portal publico fica em:
- `/portal/{slug}`

O solicitante pode:
- informar nome
- e-mail
- telefone
- inbox desejada
- assunto
- descricao
- anexos

O portal depende de:
- tenant ativo
- origem `Portal do solicitante` habilitada
- inboxes ativas disponiveis

O portal possui protecao contra abuso e pode responder `429` quando houver excesso de tentativas do mesmo endereco.

## 8. Como usar `Agendamentos`

Abra `/agendamentos` para acompanhar retornos pendentes.

Use essa tela para:
- saber o que esta para vencer
- identificar atrasos
- retomar chamados que estavam aguardando retorno

## 9. Como administrar usuarios

Abra `/usuarios`.

Voce consegue:
- criar usuario
- editar nome, e-mail e papel
- ativar ou inativar
- redefinir senha
- vincular a uma ou varias inboxes

Boas praticas:
- evite deixar `AGENT` sem inbox
- revise usuarios inativos periodicamente
- mantenha `MANAGER` apenas onde houver necessidade real

## 10. Como administrar inboxes

Abra `/inboxes`.

Voce consegue:
- criar nova inbox
- ajustar nome, codigo e descricao
- arquivar inbox
- revisar volume em fila
- ver setores sem equipe
- vincular membros
- ajustar SLAs

Boas praticas:
- mantenha codigos consistentes
- evite inbox ativa sem equipe
- revise SLA conforme a realidade da operacao

## 11. Como usar `Configuracoes`

Abra `/configuracoes`.

Nessa tela voce administra:
- nome do tenant
- slug
- logo
- prioridade padrao
- origens habilitadas
- motivos de encerramento
- nome e e-mail remetente
- link do portal

Impactos importantes:
- trocar o slug afeta login e portal
- desabilitar uma origem bloqueia novas aberturas por aquele canal
- motivos de encerramento afetam a rotina de fechamento

## 12. Como usar `Relatorios`

Abra `/relatorios`.

Essa area permite:
- filtrar por periodo
- exportar CSV
- acompanhar volume total
- comparar periodo atual com anterior
- medir desempenho por inbox
- medir produtividade por atendente
- analisar distribuicao por origem
- analisar distribuicao por prioridade
- acompanhar volume diario

Use essa tela para:
- entender carga operacional
- revisar equilibrio entre setores
- observar peso do portal no volume
- acompanhar tempo medio de resolucao

## 13. Como usar `Auditoria`

Abra `/auditoria`.

Essa tela e indicada para `ADMIN` e `MANAGER`.

Ela permite filtrar eventos por:
- texto livre
- tipo de entidade
- acao
- autor
- periodo

Use a auditoria para investigar:
- transferencias
- fechamentos
- alteracoes sensiveis
- acoes da plataforma em modo suporte

Lembrete:
- auditoria e timeline nao sao a mesma coisa
- timeline conta a historia do chamado
- auditoria registra eventos sensiveis e rastreaveis

## 14. Como funciona o modo suporte da plataforma

Uso exclusivo de usuarios autorizados pela plataforma.

Fluxo:
1. entrar com um e-mail listado em `PLATFORM_ADMIN_EMAILS`
2. abrir `/tenants`
3. localizar o tenant desejado
4. entrar em modo suporte

Ao entrar:
- a sessao muda para o tenant alvo
- o app mostra contexto visual de suporte
- a entrada fica registrada em auditoria

Ao sair:
- a sessao original e restaurada
- a saida tambem fica auditada

## 15. Buscas e atalhos importantes

### Busca global

Fica no sidebar e redireciona para:
- `/tickets?search=...`

### Rotas legadas

Hoje algumas rotas antigas redirecionam para areas novas:
- `/clientes` redireciona para `/tickets`
- `/permissoes` redireciona para `/usuarios`

## 16. Anexos

Os anexos podem ser usados:
- na abertura manual
- na abertura pelo portal
- em interacoes da timeline

Limites atuais:
- ate 5 anexos por envio
- ate 25 MB por arquivo

Os downloads respeitam autenticacao e permissao da sessao.

## 17. E-mail automatico

O sistema pode disparar notificacoes de movimentacao do chamado quando o ambiente e o tenant estiverem configurados.

Requisitos:
- `APP_URL`
- `RESEND_API_KEY`
- `INTERNAL_CRON_SECRET` para processamento autenticado por rota interna
- remetente configurado em `/configuracoes`

Sem isso:
- o sistema continua operando
- apenas o envio automatico fica desabilitado ou limitado

## 18. Rotina recomendada por papel

### Para `AGENT`

1. abrir `/hoje`
2. revisar `/dashboard`
3. assumir itens da propria inbox
4. manter timeline atualizada
5. reagendar quando necessario
6. fechar com motivo correto

### Para `MANAGER`

1. revisar `/dashboard`
2. verificar `/hoje` e `/agendamentos`
3. acompanhar `/tickets`
4. redistribuir carga entre inboxes quando preciso
5. revisar `/usuarios` e `/inboxes`
6. consultar `/relatorios` e `/auditoria`

### Para `ADMIN`

1. revisar configuracoes em `/configuracoes`
2. revisar equipe em `/usuarios`
3. revisar setores em `/inboxes`
4. validar portal
5. acompanhar relatorios
6. acompanhar auditoria

## 19. Problemas comuns

### Nao consigo entrar

Verifique:
- `tenantSlug`
- e-mail e senha
- se o tenant esta ativo

### O agente nao consegue operar

Verifique:
- se ele esta ativo
- se possui membership na inbox
- se o papel esta correto

### O portal nao cria chamado

Verifique:
- tenant ativo
- origem `Portal do solicitante` habilitada
- existencia de inbox ativa
- limite anti-abuso do portal

### O sistema nao envia e-mail

Verifique:
- remetente configurado no tenant
- `APP_URL`
- `RESEND_API_KEY`
- processamento da fila

### O dashboard ou a fila parecem estranhos

Verifique:
- se existem inboxes sem equipe
- se ha usuarios sem inbox
- se os SLAs estao coerentes
- se ha muitos retornos vencidos

## 20. Guias complementares

Para aprofundar:
- [Guia operacional](./operations-guide.md)
- [Como configurar um tenant](./tenant-setup-guide.md)
- [Guia do sistema](./system-guide.md)
- [Arquitetura](./architecture.md)
- [Guia de manutencao](./maintenance-guide.md)
