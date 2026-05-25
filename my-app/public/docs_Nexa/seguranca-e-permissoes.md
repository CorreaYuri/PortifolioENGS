# Seguranca e Permissoes Nexa

## Objetivo

Este documento define como a Nexa controla autenticacao, autorizacao e separacao entre area interna e portal do cliente.

Ele serve para tres frentes:

- orientar desenvolvimento
- alinhar operacao interna
- reduzir risco de acesso indevido

## Camadas de protecao

Hoje a plataforma trabalha com quatro camadas complementares:

1. sessao autenticada por cookie seguro
2. revalidacao da sessao no banco a cada leitura sensivel do servidor
3. bloqueio de rota entre `/app` e `/portal`
4. autorizacao explicita nas server actions e fluxos criticos

Isso significa que esconder menu ou depender apenas de middleware nao e suficiente. A acao no servidor tambem precisa validar quem pode executa-la.

## Separacao de ambientes

- usuarios internos autenticados usam `/app`
- usuarios com papel `CLIENTE` usam `/portal`
- um usuario desativado ou com papel alterado deixa de ser aceito quando a sessao e revalidada no servidor

## Matriz atual de capacidades

As rotas continuam organizadas por modulo, mas as mutacoes mais importantes agora sao protegidas por capacidades.

### Capacidade `crm.manage`

Pode:

- atualizar lead
- registrar interacao comercial
- converter lead em cliente

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- setor comercial

### Capacidade `proposals.manage`

Pode:

- criar proposta
- alterar status comercial da proposta
- gerar projeto a partir de proposta

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- setor comercial

### Capacidade `clients.manage`

Pode:

- criar e editar cliente
- registrar e editar contrato
- atualizar status contratual

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- `ENGENHARIA`
- setor comercial
- setor engenharia

### Capacidade `clients.lifecycle.manage`

Pode:

- alterar ciclo de vida do cliente

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- setor comercial

### Capacidade `clients.portal_access.manage`

Pode:

- criar acesso de portal
- resetar senha do portal
- ativar, desativar e remover acesso

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- setor comercial

### Capacidade `clients.support.sync`

Pode:

- sincronizar chamados do 1400CR

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- setor comercial
- setor operacoes

### Capacidade `projects.manage`

Pode:

- criar projeto
- gerenciar equipe, etapas, tarefas, riscos, timeline e documentos internos
- solicitar aprovacao de documento ao cliente
- assinar documentos no fluxo interno da empresa
- ajustar preset, pagina e posicao de assinatura nos documentos do projeto

Perfis:

- `ADMIN`
- `GESTOR`
- `COMERCIAL`
- `ENGENHARIA`
- setor comercial
- setor engenharia

### Capacidade `projects.client_documents.respond`

Pode:

- confirmar leitura de documento no portal
- aprovar documento do projeto
- solicitar ajuste em documento do projeto
- cadastrar assinatura visual no proprio acesso
- assinar documento compartilhado no portal

Perfis:

- `CLIENTE`

### Capacidade `collaborators.manage`

Pode:

- cadastrar colaborador
- editar ficha
- gerenciar documentos de RH na ficha
- solicitar assinatura de documentos de RH para o colaborador
- alterar status de acesso interno

Perfis:

- `ADMIN`
- `GESTOR`
- setor RH

### Capacidade `rh.manage`

Pode:

- cadastrar feriados
- cadastrar ausencias
- fechar espelhos
- editar calendario e ausencias

Perfis:

- `ADMIN`
- `GESTOR`
- setor RH

### Capacidade `rh.approve`

Pode:

- revisar ponto
- aprovar fechamento mensal

Perfis:

- `ADMIN`
- `GESTOR`
- setor RH

### Capacidade `administrative.manage`

Pode:

- operar financeiro
- operar fiscal
- operar compras
- operar estoque
- operar ativos
- operar centros de custo

Perfis:

- `ADMIN`
- `GESTOR`
- `FINANCEIRO`
- setor financeiro
- setor administrativo
- setor operacoes

## Regras adicionais importantes

### Meu RH e autosservico

O colaborador autenticado pode operar a propria jornada, foto e senha, mesmo sem permissao ampla de RH.

O sistema valida o vinculo entre o usuario autenticado e o `collaboratorId` alvo antes de aceitar a acao.

No fluxo documental de RH isso significa:

- o colaborador so assina documento vinculado ao proprio cadastro
- documento de outro colaborador retorna bloqueio de acesso
- assinatura exige assinatura visual previamente cadastrada no usuario
- notificacao de assinatura pendente aparece para RH e e encerrada ao assinar
- assinatura concluida gera notificacao operacional informativa para acompanhamento do RH

### Portal do cliente

O cliente so pode agir sobre documentos e dados ligados aos `clientAccesses` do proprio login.

Se um mesmo login estiver vinculado a mais de um cliente, o portal consolida o que pertence a todos esses vinculos.

No fluxo documental isso significa:

- visualizar previa apenas de documento compartilhado
- baixar apenas documento liberado ao proprio cliente
- assinar apenas documento visivel e ligado aos projetos do proprio acesso
- responder aprovacao apenas quando houver solicitacao pendente real

Diretriz de controle:

- a visibilidade documental deve ser definida no interno antes de qualquer exposicao no portal
- assinatura e resposta do cliente nao ampliam acesso; apenas operam dentro do escopo ja liberado

## Diretrizes para novas features

Toda nova acao relevante deve responder estas perguntas antes de entrar em producao:

1. quem pode ver essa tela
2. quem pode executar a mutacao no servidor
3. a regra depende so do modulo ou de uma capacidade mais especifica
4. existe caso de autosservico
5. existe reflexo no portal do cliente

## Painel administrativo

A plataforma agora possui uma area de governanca em `/app/permissoes`.

Ela permite:

- visualizar a matriz de capacidades por papel
- visualizar a matriz de capacidades por setor
- visualizar excecoes por usuario interno
- aplicar override manual por papel
- aplicar override manual por setor
- aplicar override manual por usuario
- voltar uma capacidade ao comportamento padrao
- consultar auditoria recente das alteracoes

Observacao:

- a tela agora cobre papel, setor e usuario
- quando houver conflito, o sistema aplica a regra mais segura: bloqueio explicito vence liberacao explicita
- o nivel de usuario serve para excecoes pontuais e auditaveis, sem substituir a matriz estrutural

## Regra de desenvolvimento

- navegacao nao substitui autorizacao
- middleware nao substitui validacao em server action
- toda mutacao critica deve usar helper central de autorizacao
- toda mudanca de permissao precisa atualizar esta documentacao
